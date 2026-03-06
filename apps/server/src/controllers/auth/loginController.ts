/**
 * Login Controller — Password login, token refresh, logout, getMe
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../../config/prisma';
import { generateTokenPair, verifyRefreshToken, revokeRefreshToken, revokeAllUserTokens } from '../../services/jwtService';
import { loginSchema, registerSchema, SALT_ROUNDS, setAuthCookies, clearAuthCookies } from './authHelpers';

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

        res.status(201).json({
            success: true,
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
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Erro de validação', details: error.errors });
        }
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Password-Based Login ==============
export const loginWithPassword = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = loginSchema.parse(req.body);

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
            return res.status(401).json({ error: 'Credenciais inválidas.' });
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
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        res.json({
            success: true,
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
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Erro de validação', details: error.errors });
        }
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Token Management ==============
export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        const userId = await verifyRefreshToken(refreshToken);

        if (!userId) {
            clearAuthCookies(res);
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            clearAuthCookies(res);
            return res.status(401).json({ error: 'User not found' });
        }

        await revokeRefreshToken(refreshToken);

        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        res.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Refresh token error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;

        if (refreshToken) {
            await revokeRefreshToken(refreshToken);
        }

        clearAuthCookies(res);
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logoutAll = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        await revokeAllUserTokens(userId);
        clearAuthCookies(res);

        res.json({ success: true, message: 'Logged out from all devices' });
    } catch (error) {
        console.error('Logout all error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
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
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: { ...user, balance: Number(user.balance) } });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
