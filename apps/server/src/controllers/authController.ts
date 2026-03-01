import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { createOtp, verifyOtp, incrementOtpAttempts } from '../services/otpService';
import { sendOtpSms } from '../services/smsService';
import { generateTokenPair, verifyRefreshToken, revokeRefreshToken, revokeAllUserTokens } from '../services/jwtService';

// ============== Cookie Configuration ==============
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
    });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'lax',
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

// Controller functions
export const requestOtp = async (req: Request, res: Response) => {
    try {
        const { phone } = requestOtpSchema.parse(req.body);

        // Find or prepare to create user
        let user = await prisma.user.findUnique({ where: { phone } });

        // Generate OTP
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
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Request OTP error:', error);
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

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    phone,
                    isVerified: true,
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
                balance: user.balance,
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
                balance: true,
                streamKey: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
