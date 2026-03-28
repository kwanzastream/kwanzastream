/**
 * Login Controller — Password login, token refresh, logout, getMe
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../../config/prisma';
import { generateTokenPair, verifyRefreshToken, revokeRefreshToken, revokeAllUserTokens } from '../../services/jwtService';
import { loginSchema, registerSchema, SALT_ROUNDS, setAuthCookies, clearAuthCookies } from './authHelpers';
// FIX: Bloqueio após 5 falhas de login consecutivas — TestSprite #M1
import { checkLoginLockout, recordLoginFailure, resetLoginFailures } from './loginRateLimiter';

// ============== Password-Based Registration ==============
export const register = async (req: Request, res: Response) => {
    try {
        const data = registerSchema.parse(req.body);

        const phone = data.phone.startsWith('+') ? data.phone : `+244${data.phone}`;
        const username = data.username.toLowerCase();

        const existingByPhone = await prisma.user.findUnique({ where: { phone } });
        if (existingByPhone) {
            return res.status(400).json({ error: 'Este número de telefone já está registado.' });
        }

        const existingByEmail = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingByEmail) {
            return res.status(400).json({ error: 'Este email já está registado.' });
        }

        const existingByUsername = await prisma.user.findUnique({ where: { username } });
        if (existingByUsername) {
            return res.status(400).json({ error: 'Este nome de utilizador já está em uso.' });
        }

        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                phone,
                email: data.email,
                username,
                displayName: data.displayName,
                passwordHash,
                termsAcceptedAt: new Date(),
                minAgeConfirmedAt: new Date(),
            },
        });

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // FIX: Incluir accessToken e refreshToken na resposta — TestSprite #C1
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
                    isVerified: false,
                    balance: Number(user.balance),
                },
            },
            message: 'Registo efectuado com sucesso.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Erro de validação', details: error.errors });
        }
        console.error('Register error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Password-Based Login ==============
export const loginWithPassword = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = loginSchema.parse(req.body);

        // FIX: Verificar bloqueio por excesso de tentativas — TestSprite #M1
        const lockout = await checkLoginLockout(identifier);
        if (lockout.locked) {
            const remainingMin = Math.ceil((lockout.remainingMs || 0) / 60000);
            return res.status(429).json({
                success: false,
                message: `Conta temporariamente bloqueada por excesso de tentativas. Tenta novamente em ${remainingMin} minutos.`,
            });
        }

        const isEmail = identifier.includes('@');
        const isPhone = /^\+?[0-9]{9,15}$/.test(identifier);
        let user;

        if (isEmail) {
            user = await prisma.user.findUnique({ where: { email: identifier } });
        } else if (isPhone) {
            const phone = identifier.startsWith('+') ? identifier : `+244${identifier}`;
            user = await prisma.user.findUnique({ where: { phone } });
        } else {
            user = await prisma.user.findUnique({ where: { username: identifier.toLowerCase() } });
        }

        if (!user || !user.passwordHash) {
            // FIX: Registar falha de login — TestSprite #M1
            await recordLoginFailure(identifier);
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }

        if (user.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            // FIX: Registar falha de login — TestSprite #M1
            await recordLoginFailure(identifier);
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }

        // FIX: Reset do contador após login bem-sucedido — TestSprite #M1
        await resetLoginFailures(identifier);

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // FIX: Incluir accessToken e refreshToken na resposta — TestSprite #C1
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
                    onboardingCompleted: user.onboardingCompleted,
                },
            },
            message: 'Login efectuado com sucesso.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Erro de validação', details: error.errors });
        }
        console.error('Login error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Token Management ==============
export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        // FIX: Nomes de cookies standardizados — TestSprite cloud (com fallback)
        const refreshToken = req.cookies?.refreshToken || req.cookies?.refresh_token || req.body?.refreshToken;

        if (!refreshToken) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Token de actualização não fornecido.' });
        }

        const userId = await verifyRefreshToken(refreshToken);

        if (!userId) {
            clearAuthCookies(res);
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Token de actualização inválido ou expirado.' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            clearAuthCookies(res);
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        await revokeRefreshToken(refreshToken);

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // FIX: Incluir accessToken e refreshToken na resposta do refresh — TestSprite #C1
        res.json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
            message: 'Token actualizado com sucesso.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Refresh token error:', error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // FIX: Nomes de cookies standardizados — TestSprite cloud (com fallback)
        const refreshToken = req.cookies?.refreshToken || req.cookies?.refresh_token || req.body?.refreshToken;

        if (refreshToken) {
            await revokeRefreshToken(refreshToken);
        }

        clearAuthCookies(res);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.json({ success: true, message: 'Sessão terminada com sucesso.' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const logoutAll = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        await revokeAllUserTokens(userId);
        clearAuthCookies(res);

        // FIX: Mensagem PT-AO — TestSprite #M5
        res.json({ success: true, message: 'Sessão terminada em todos os dispositivos.' });
    } catch (error) {
        console.error('Logout all error:', error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                phone: true,
                email: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                role: true,
                isVerified: true,
                isBanned: true,
                banReason: true,
                emailVerified: true,
                onboardingCompleted: true,
                balance: true,
                streamKey: true,
                createdAt: true,
            },
        });

        if (!user) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        res.json({ user: { ...user, balance: Number(user.balance) } });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};
