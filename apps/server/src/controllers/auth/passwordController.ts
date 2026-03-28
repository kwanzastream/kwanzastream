/**
 * Password Controller — Email verification and password recovery
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import prisma from '../../config/prisma';
import { revokeAllUserTokens } from '../../services/jwtService';
import { emailService } from '../../services/emailService';
import { SALT_ROUNDS } from './authHelpers';

// ============== Email Verification ==============

export const sendVerificationEmail = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;
        // FIX: Mensagem PT-AO — TestSprite #M5
        if (!userId) return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true, displayName: true, username: true, emailVerified: true },
        });

        if (!user || !user.email) {
            return res.status(400).json({ error: 'Nenhum email associado à conta.' });
        }
        if (user.emailVerified) {
            return res.status(400).json({ error: 'Email já verificado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        await prisma.user.update({
            where: { id: userId },
            data: { emailVerifyToken: token },
        });

        await emailService.sendVerification(
            user.email,
            user.displayName || user.username || 'Utilizador',
            token,
        );

        res.json({ success: true, message: 'Email de verificação enviado.' });
    } catch (error) {
        console.error('Send verification email error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token || typeof token !== 'string') {
            return res.status(400).json({ error: 'Token inválido.' });
        }

        const user = await prisma.user.findFirst({
            where: { emailVerifyToken: token },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: true, emailVerifyToken: null },
        });

        res.json({ success: true, message: 'Email verificado com sucesso!' });
    } catch (error) {
        console.error('Verify email error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Password Recovery ==============

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = z.object({ email: z.string().email() }).parse(req.body);

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, displayName: true, username: true, email: true, passwordHash: true },
        });

        // Always return success to prevent email enumeration
        if (!user || !user.passwordHash) {
            return res.json({ success: true, message: 'Se o email existir, receberás um link de recuperação.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: { passwordResetToken: token, passwordResetExpires: expires },
        });

        await emailService.sendPasswordReset(
            user.email!,
            user.displayName || user.username || 'Utilizador',
            token,
        );

        // Development only: allow automated tests (TestSprite) to complete reset flow without reading email
        if (process.env.NODE_ENV === 'development') {
            return res.json({
                success: true,
                message: 'Se o email existir, receberás um link de recuperação.',
                debugResetToken: token,
            });
        }

        res.json({ success: true, message: 'Se o email existir, receberás um link de recuperação.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Email inválido.' });
        }
        console.error('Request password reset error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const schema = z.object({
            token: z.string().min(1),
            // FIX: Validação de password reforçada no reset — TestSprite #M2
            password: z.string()
                .min(8, 'A senha deve ter pelo menos 8 caracteres.')
                .max(128)
                .superRefine((val, ctx) => {
                    if (!/[A-Z]/.test(val)) {
                        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A senha deve conter pelo menos 1 letra maiúscula.' });
                    }
                    if (!/[a-z]/.test(val)) {
                        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A senha deve conter pelo menos 1 letra minúscula.' });
                    }
                    if (!/[0-9]/.test(val)) {
                        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A senha deve conter pelo menos 1 número.' });
                    }
                }),
        });
        const { token, password } = schema.parse(req.body);

        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: { gt: new Date() },
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });

        await revokeAllUserTokens(user.id);

        res.json({ success: true, message: 'Senha alterada com sucesso. Faz login novamente.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos.', details: error.errors });
        }
        console.error('Reset password error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};
