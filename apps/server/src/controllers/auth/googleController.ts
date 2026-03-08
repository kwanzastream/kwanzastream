/**
 * Google OAuth Controller — Sprint 2
 * 
 * Handles Google OAuth2 authentication flow.
 * Requires: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL in .env
 */

import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import { generateTokenPair } from '../../services/jwtService';
import { setAuthCookies } from './authHelpers';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

/**
 * Step 1: Redirect to Google consent screen
 * GET /api/auth/google
 */
export const initiateGoogleAuth = (_req: Request, res: Response) => {
    if (!GOOGLE_CLIENT_ID) {
        return res.status(503).json({ error: 'Google OAuth not configured' });
    }

    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_CALLBACK_URL,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    });

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};

/**
 * Step 2: Handle Google callback — exchange code for tokens, create/link user
 * GET /api/auth/google/callback?code=...
 */
export const handleGoogleCallback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query;

        if (!code || typeof code !== 'string') {
            return res.status(400).json({ error: 'Missing authorization code' });
        }

        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
            return res.status(503).json({ error: 'Google OAuth not configured' });
        }

        // Exchange code for tokens
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok || !tokenData.access_token) {
            console.error('Google token exchange failed:', tokenData);
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?error=google_failed`);
        }

        // Get user info from Google
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const googleUser = await userInfoRes.json() as {
            id: string;
            email: string;
            name: string;
            picture: string;
        };

        if (!googleUser.id || !googleUser.email) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?error=google_failed`);
        }

        // Find or create user
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { googleId: googleUser.id },
                    { email: googleUser.email },
                ],
            },
        });

        if (user) {
            // Link Google ID if not already linked
            if (!user.googleId) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: googleUser.id, emailVerified: true },
                });
            }
            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });
        } else {
            // Create new user from Google profile
            user = await prisma.user.create({
                data: {
                    googleId: googleUser.id,
                    email: googleUser.email,
                    emailVerified: true,
                    displayName: googleUser.name,
                    avatarUrl: googleUser.picture,
                    phone: `google_${googleUser.id}`, // Placeholder — user must add phone later
                    isVerified: true,
                    termsAcceptedAt: new Date(),
                },
            });
        }

        // Generate JWT tokens
        const tokens = await generateTokenPair(user.id, user.role);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        // Redirect to frontend
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const redirectPath = user.onboardingCompleted ? '/feed' : '/onboarding';
        res.redirect(`${frontendUrl}${redirectPath}`);

    } catch (error) {
        console.error('Google OAuth callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?error=google_failed`);
    }
};
