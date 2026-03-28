/**
 * OTP Controller — Request and verify OTP codes
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import { createOtp, verifyOtp, incrementOtpAttempts, OtpCooldownError } from '../../services/otpService';
import { sendOtpSms } from '../../services/smsService';
import { generateTokenPair } from '../../services/jwtService';
import { requestOtpSchema, verifyOtpSchema, completePhoneRegSchema, setAuthCookies } from './authHelpers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const requestOtp = async (req: Request, res: Response) => {
    try {
        const { phone, termsAccepted, ageConfirmed } = requestOtpSchema.parse(req.body);

        let user = await prisma.user.findUnique({ where: { phone } });

        if (!user) {
            if (!termsAccepted) {
                return res.status(400).json({ error: 'Deves aceitar os Termos de Serviço para continuar.' });
            }
            if (!ageConfirmed) {
                return res.status(400).json({ error: 'Deves confirmar que tens 13 anos ou mais.' });
            }
        }

        if (user?.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        const code = await createOtp(phone, user?.id);
        const smsResult = await sendOtpSms(phone, code);

        if (!smsResult.success) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(500).json({ success: false, message: 'Falha ao enviar OTP.', details: smsResult.error });
        }

        res.json({
            success: true,
            // FIX: Mensagem PT-AO — TestSprite #M5
            message: 'Código OTP enviado com sucesso.',
            isNewUser: !user,
            ...(process.env.NODE_ENV === 'development' && { code }),
        });
    } catch (error) {
        if (error instanceof OtpCooldownError) {
            return res.status(429).json({
                error: `Aguarde ${error.remainingSeconds} segundos para reenviar o código.`,
                cooldownRemaining: error.remainingSeconds,
            });
        }
        if (error instanceof z.ZodError) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Request OTP error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const verifyOtpAndLogin = async (req: Request, res: Response) => {
    try {
        const { phone, code, deviceInfo } = verifyOtpSchema.parse(req.body);

        const otpResult = await verifyOtp(phone, code);

        if (!otpResult.valid) {
            await incrementOtpAttempts(phone);
            return res.status(400).json({ error: otpResult.error });
        }

        let user = await prisma.user.findUnique({ where: { phone } });

        if (user?.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        if (!user) {
            // New user — don't create yet, require email first
            const tempToken = jwt.sign({ phone, purpose: 'phone-reg' }, JWT_SECRET, { expiresIn: '10m' });
            return res.json({
                success: true,
                requiresEmail: true,
                tempToken,
            });
        }

        // Existing user — login normally
        await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLoginAt: new Date(),
                isVerified: true,
            },
        });

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // FIX: Incluir accessToken e refreshToken na resposta OTP — TestSprite #C1
        res.json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user: {
                    id: user.id,
                    phone: user.phone,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                    avatarUrl: user.avatarUrl,
                    role: user.role,
                    isVerified: user.isVerified,
                    balance: Number(user.balance),
                },
            },
            message: 'Login efectuado com sucesso.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Verify OTP error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

/**
 * Complete phone registration — creates user with phone + email
 * Called after OTP verification for new users
 */
export const completePhoneRegistration = async (req: Request, res: Response) => {
    try {
        const { tempToken, email } = completePhoneRegSchema.parse(req.body);

        // Verify temp token
        let payload: any;
        try {
            payload = jwt.verify(tempToken, JWT_SECRET);
        } catch {
            return res.status(401).json({ error: 'Token expirado. Recomeça o registo.' });
        }

        if (payload.purpose !== 'phone-reg' || !payload.phone) {
            return res.status(400).json({ error: 'Token inválido.' });
        }

        const phone = payload.phone;

        // Check phone not already taken (race condition guard)
        const existingByPhone = await prisma.user.findUnique({ where: { phone } });
        if (existingByPhone) {
            return res.status(400).json({ error: 'Este número já está registado.' });
        }

        // Check email not already taken
        const existingByEmail = await prisma.user.findUnique({ where: { email } });
        if (existingByEmail) {
            return res.status(400).json({ error: 'Este email já está registado.' });
        }

        // Create user with phone + email
        const user = await prisma.user.create({
            data: {
                phone,
                email,
                isVerified: true,
                termsAcceptedAt: new Date(),
                minAgeConfirmedAt: new Date(),
            },
        });

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // FIX: Incluir accessToken e refreshToken na resposta de registo por telefone — TestSprite #C1
        res.status(201).json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user: {
                    id: user.id,
                    phone: user.phone,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                    avatarUrl: user.avatarUrl,
                    role: user.role,
                    isVerified: user.isVerified,
                    balance: Number(user.balance),
                },
            },
            message: 'Registo efectuado com sucesso.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Erro de validação', details: error.errors });
        }
        console.error('Complete phone registration error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};
