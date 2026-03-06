/**
 * Auth Helpers — Shared cookie management, schemas, and constants
 * Extracted from authController.ts for modularity
 */

import { Response } from 'express';
import { z } from 'zod';

// ============== Cookie Configuration ==============
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Cross-domain deployments (Vercel frontend + Render API) require:
// - sameSite: 'none' (allow cross-origin cookie sending)
// - secure: true (required when sameSite is 'none')
const COOKIE_SAME_SITE: 'lax' | 'none' = IS_DEVELOPMENT ? 'lax' : 'none';
const COOKIE_SECURE = !IS_DEVELOPMENT;

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
    });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/auth',
    });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/api/auth' });
};

// ============== Validation Schemas ==============
export const requestOtpSchema = z.object({
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/, 'Invalid phone number'),
    termsAccepted: z.boolean().optional(),
    ageConfirmed: z.boolean().optional(),
});

export const verifyOtpSchema = z.object({
    phone: z.string().min(9).max(15),
    code: z.string().length(6),
    deviceInfo: z.object({
        platform: z.string().optional(),
        deviceId: z.string().optional(),
    }).optional(),
});

export const registerSchema = z.object({
    displayName: z.string().min(1, 'Nome é obrigatório').max(50),
    username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e _'),
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/, 'Número de telefone inválido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').max(128),
    termsAccepted: z.literal(true, { errorMap: () => ({ message: 'Deves aceitar os Termos de Serviço' }) }),
    ageConfirmed: z.literal(true, { errorMap: () => ({ message: 'Deves confirmar a idade mínima' }) }),
});

export const loginSchema = z.object({
    identifier: z.string().min(1, 'Telefone, email ou username é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

export const SALT_ROUNDS = 12;
