import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma';
import { createOtp, verifyOtp, incrementOtpAttempts, OtpCooldownError } from '../services/otpService';
import { sendOtpSms } from '../services/smsService';
import { generateTokenPair, verifyRefreshToken, revokeRefreshToken, revokeAllUserTokens } from '../services/jwtService';
import { emailService } from '../services/emailService';
import crypto from 'crypto';

// ============== Cookie Configuration ==============
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Cross-domain deployments (Vercel frontend + Render API) require:
// - sameSite: 'none' (allow cross-origin cookie sending)
// - secure: true (required when sameSite is 'none')
// In local dev, use sameSite: 'lax' + secure: false
const COOKIE_SAME_SITE: 'lax' | 'none' = IS_DEVELOPMENT ? 'lax' : 'none';
const COOKIE_SECURE = !IS_DEVELOPMENT; // true for staging + production

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
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
        path: '/api/auth', // Only sent to auth endpoints
    });
};

const clearAuthCookies = (res: Response) => {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/api/auth' });
};

// Validation schemas
const requestOtpSchema = z.object({
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/, 'Invalid phone number'),
    termsAccepted: z.boolean().optional(),
    ageConfirmed: z.boolean().optional(),
});

const verifyOtpSchema = z.object({
    phone: z.string().min(9).max(15),
    code: z.string().length(6),
    deviceInfo: z.object({
        platform: z.string().optional(),
        deviceId: z.string().optional(),
    }).optional(),
});

const refreshTokenSchema = z.object({
    refreshToken: z.string().uuid(),
});

// ============== Password Auth Schemas ==============
const registerSchema = z.object({
    displayName: z.string().min(1, 'Nome é obrigatório').max(50),
    username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e _'),
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/, 'Número de telefone inválido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').max(128),
    termsAccepted: z.literal(true, { errorMap: () => ({ message: 'Deves aceitar os Termos de Serviço' }) }),
    ageConfirmed: z.literal(true, { errorMap: () => ({ message: 'Deves confirmar a idade mínima' }) }),
});

const loginSchema = z.object({
    identifier: z.string().min(1, 'Telefone, email ou username é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

const SALT_ROUNDS = 12;

// Controller functions
export const requestOtp = async (req: Request, res: Response) => {
    try {
        const { phone, termsAccepted, ageConfirmed } = requestOtpSchema.parse(req.body);

        // Find or prepare to create user
        let user = await prisma.user.findUnique({ where: { phone } });

        // For new users, require terms and age confirmation
        if (!user) {
            if (!termsAccepted) {
                return res.status(400).json({ error: 'Deves aceitar os Termos de Serviço para continuar.' });
            }
            if (!ageConfirmed) {
                return res.status(400).json({ error: 'Deves confirmar que tens 13 anos ou mais.' });
            }
        }

        // Check if user is banned
        if (user?.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        // Generate OTP (enforces 60s cooldown)
        const code = await createOtp(phone, user?.id);

        // Send SMS
        const smsResult = await sendOtpSms(phone, code);

        if (!smsResult.success) {
            return res.status(500).json({ error: 'Failed to send OTP', details: smsResult.error });
        }

        res.json({
            success: true,
            message: 'OTP sent successfully',
            isNewUser: !user,
            // Only include code in development for testing
            ...(process.env.NODE_ENV === 'development' && { code }),
        });
    } catch (error) {
        // Handle OTP cooldown error — return remaining seconds for frontend timer
        if (error instanceof OtpCooldownError) {
            return res.status(429).json({
                error: `Aguarde ${error.remainingSeconds} segundos para reenviar o código.`,
                cooldownRemaining: error.remainingSeconds,
            });
        }
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Request OTP error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Password-Based Registration ==============
export const register = async (req: Request, res: Response) => {
    try {
        const data = registerSchema.parse(req.body);

        // Normalize phone
        const phone = data.phone.startsWith('+') ? data.phone : `+244${data.phone}`;
        const username = data.username.toLowerCase();

        // Check uniqueness: phone, email, username
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

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        // Create user
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

        // Generate tokens
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

        // Find user by phone, email, or username
        const isEmail = identifier.includes('@');
        const isPhone = /^\+?[0-9]{9,15}$/.test(identifier);
        let user;

        if (isEmail) {
            user = await prisma.user.findUnique({ where: { email: identifier } });
        } else if (isPhone) {
            const phone = identifier.startsWith('+') ? identifier : `+244${identifier}`;
            user = await prisma.user.findUnique({ where: { phone } });
        } else {
            // Treat as username
            user = await prisma.user.findUnique({ where: { username: identifier.toLowerCase() } });
        }

        if (!user || !user.passwordHash) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Check if banned
        if (user.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate tokens
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

export const verifyOtpAndLogin = async (req: Request, res: Response) => {
    try {
        const { phone, code, deviceInfo } = verifyOtpSchema.parse(req.body);

        // Verify OTP
        const otpResult = await verifyOtp(phone, code);

        if (!otpResult.valid) {
            await incrementOtpAttempts(phone);
            return res.status(400).json({ error: otpResult.error });
        }

        // Find or create user
        let user = await prisma.user.findUnique({ where: { phone } });

        // Check if banned
        if (user?.isBanned) {
            return res.status(403).json({
                error: 'Conta suspensa',
                reason: user.banReason || 'Violação dos Termos de Serviço',
                bannedAt: user.bannedAt,
            });
        }

        if (!user) {
            // Create new user with legal compliance timestamps
            user = await prisma.user.create({
                data: {
                    phone,
                    isVerified: true,
                    termsAcceptedAt: new Date(),
                    minAgeConfirmedAt: new Date(),
                },
            });
        } else {
            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    lastLoginAt: new Date(),
                    isVerified: true,
                },
            });
        }

        // Generate tokens
        const tokens = await generateTokenPair(user.id, user.role);

        // Set httpOnly cookies (tokens NEVER exposed to JavaScript)
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
            },
            // Tokens are in httpOnly cookies, not in response body
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Verify OTP error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        // Read refresh token from cookie (fallback to body for backward compat)
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

        // Revoke old refresh token
        await revokeRefreshToken(refreshToken);

        // Generate new token pair and set cookies
        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        res.json({
            success: true,
        });
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
        // Read refresh token from cookie (fallback to body)
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

// ============== Email Verification ==============

export const sendVerificationEmail = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

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
        res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error' });
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

        res.json({ success: true, message: 'Se o email existir, receberás um link de recuperação.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Email inválido.' });
        }
        console.error('Request password reset error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const schema = z.object({
            token: z.string().min(1),
            password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').max(128),
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

        // Revoke all tokens for security
        await revokeAllUserTokens(user.id);

        res.json({ success: true, message: 'Senha alterada com sucesso. Faz login novamente.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos.', details: error.errors });
        }
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
