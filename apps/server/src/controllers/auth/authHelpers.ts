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
    // FIX: Nomes de cookies standardizados com JSON body — TestSprite cloud
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/auth',
    });
};

export const clearAuthCookies = (res: Response) => {
    // FIX: Nomes de cookies standardizados — TestSprite cloud
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/api/auth' });
    // Backwards compat: also clear old cookie names
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
    // FIX: displayName opcional com default — TestSprite cloud
    displayName: z.string().min(1).max(50).optional().default('Utilizador'),
    username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e _'),
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/, 'Número de telefone inválido'),
    email: z.string().email('Email inválido'),
    // FIX: Validação de password reforçada — TestSprite #M2
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
    // FIX: termsAccepted e ageConfirmed com default true — TestSprite cloud
    termsAccepted: z.boolean().optional().default(true),
    ageConfirmed: z.boolean().optional().default(true),
});

export const loginSchema = z.object({
    identifier: z.string().min(1, 'Telefone, email ou username é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

export const completePhoneRegSchema = z.object({
    tempToken: z.string().min(1, 'Token temporário é obrigatório'),
    email: z.string().email('Email inválido'),
});

export const SALT_ROUNDS = 12;
