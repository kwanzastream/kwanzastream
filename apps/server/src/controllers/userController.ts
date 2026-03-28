import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

// Validation schemas
const updateProfileSchema = z.object({
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional(),
    displayName: z.string().min(1).max(50).optional(),
    email: z.string().email().optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional(),
    bannerUrl: z.string().url().optional().nullable(),
});

const onboardingSchema = z.object({
    displayName: z.string().min(1).max(50),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e _'),
    bio: z.string().max(500).optional().default(''),
    interests: z.array(z.string()).min(1).max(20),
    // FIX: Campo de província opcional no onboarding — TestSprite #M4
    province: z.string().max(50).optional(),
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// Get user profile by ID or username
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const currentUserId = (req as AuthenticatedRequest).user?.userId;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { id },
                    { username: id },
                ],
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bannerUrl: true,
                bio: true,
                role: true,
                isVerified: true,
                interests: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        streams: true,
                        donationsReceived: true,
                    },
                },
            },
        });

        if (!user) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        // Check if current user is following this user
        let isFollowing = false;
        if (currentUserId && currentUserId !== user.id) {
            const follow = await prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: currentUserId,
                        followingId: user.id,
                    },
                },
            });
            isFollowing = !!follow;
        }

        res.json({
            user: {
                ...user,
                followersCount: user._count.followers,
                followingCount: user._count.following,
                streamsCount: user._count.streams,
                donationsReceivedCount: user._count.donationsReceived,
                isFollowing,
            },
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Update current user's profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const data = updateProfileSchema.parse(req.body);

        // Check username uniqueness if being updated
        if (data.username) {
            const existing = await prisma.user.findUnique({
                where: { username: data.username },
            });
            if (existing && existing.id !== userId) {
                // FIX: Mensagem PT-AO — TestSprite #M5
                return res.status(400).json({ success: false, message: 'Este nome de utilizador já está em uso.' });
            }
        }

        // Check email uniqueness if being updated
        if (data.email) {
            const existing = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existing && existing.id !== userId) {
                // FIX: Mensagem PT-AO — TestSprite #M5
                return res.status(400).json({ success: false, message: 'Este email já está registado.' });
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                phone: true,
                email: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bannerUrl: true,
                bio: true,
                role: true,
                isVerified: true,
                balance: true,
                interests: true,
            },
        });

        // FIX: BigInt (balance) não é serializável em JSON — converter para Number
        res.json({ user: { ...user, balance: user.balance ? Number(user.balance) : 0 } });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Update profile error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Follow a user
export const followUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const { id: targetUserId } = req.params;

        if (userId === targetUserId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Não podes seguir-te a ti próprio.' });
        }

        // Check if target user exists
        const targetUser = await prisma.user.findUnique({
            where: { id: targetUserId },
        });

        if (!targetUser) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        // Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Já estás a seguir este utilizador.' });
        }

        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: targetUserId,
            },
        });

        res.json({ success: true, message: 'A seguir o utilizador.' });
    } catch (error) {
        console.error('Follow user error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Unfollow a user
export const unfollowUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const { id: targetUserId } = req.params;

        await prisma.follow.deleteMany({
            where: {
                followerId: userId,
                followingId: targetUserId,
            },
        });

        res.json({ success: true, message: 'Deixaste de seguir o utilizador.' });
    } catch (error) {
        console.error('Unfollow user error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Get user's followers
export const getFollowers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { page, limit } = paginationSchema.parse(req.query);

        const user = await prisma.user.findFirst({
            where: { OR: [{ id }, { username: id }] },
        });

        if (!user) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        const [followers, total] = await Promise.all([
            prisma.follow.findMany({
                where: { followingId: user.id },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    follower: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatarUrl: true,
                            isVerified: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.follow.count({ where: { followingId: user.id } }),
        ]);

        res.json({
            followers: followers.map((f) => f.follower),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get followers error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Get users that a user is following
export const getFollowing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { page, limit } = paginationSchema.parse(req.query);

        const user = await prisma.user.findFirst({
            where: { OR: [{ id }, { username: id }] },
        });

        if (!user) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
        }

        const [following, total] = await Promise.all([
            prisma.follow.findMany({
                where: { followerId: user.id },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    following: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatarUrl: true,
                            isVerified: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.follow.count({ where: { followerId: user.id } }),
        ]);

        res.json({
            following: following.map((f) => f.following),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get following error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Generate stream key for user
export const generateStreamKey = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const streamKey = `sk_${uuidv4().replace(/-/g, '')}`;

        await prisma.user.update({
            where: { id: userId },
            data: {
                streamKey,
                role: 'STREAMER', // Upgrade to streamer role
            },
        });

        res.json({ streamKey });
    } catch (error) {
        console.error('Generate stream key error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Phase 1: Onboarding Persistence ==============

// Complete onboarding (persists profile + interests)
export const completeOnboarding = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const data = onboardingSchema.parse(req.body);

        // Check username availability
        const existingUser = await prisma.user.findUnique({
            where: { username: data.username },
        });
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({ error: 'Username já está em uso.' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                displayName: data.displayName,
                username: data.username,
                bio: data.bio || '',
                interests: data.interests,
                // FIX: Guardar província no onboarding — TestSprite #M4
                ...(data.province && { province: data.province }),
                onboardingCompleted: true,
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                bio: true,
                interests: true,
                onboardingCompleted: true,
                avatarUrl: true,
            },
        });

        res.json({ success: true, user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Complete onboarding error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Check username availability (real-time)
export const checkUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        if (!username || username.length < 3) {
            return res.json({ available: false, reason: 'Username deve ter pelo menos 3 caracteres.' });
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.json({ available: false, reason: 'Username deve conter apenas letras, números e _.' });
        }

        const existing = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
        });

        // Optionally check current user (skip if it's their own username)
        const currentUserId = (req as AuthenticatedRequest).user?.userId;
        if (existing && existing.id === currentUserId) {
            return res.json({ available: true });
        }

        res.json({
            available: !existing,
            reason: existing ? 'Username já está em uso.' : undefined,
        });
    } catch (error) {
        console.error('Check username error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Sprint 2: AutoMod Settings ==============

const autoModSchema = z.object({
    enabled: z.boolean(),
    customWords: z.array(z.string().min(1).max(50)).max(200).optional(),
});

// Get AutoMod settings for current user
export const getAutoModSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { autoModEnabled: true, customBannedWords: true },
        });

        if (!user) return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });

        res.json({
            autoModEnabled: user.autoModEnabled,
            customBannedWords: user.customBannedWords,
        });
    } catch (error) {
        console.error('Get AutoMod settings error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// Update AutoMod settings for current user's channel
export const updateAutoModSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });

        const data = autoModSchema.parse(req.body);

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                autoModEnabled: data.enabled,
                ...(data.customWords !== undefined && { customBannedWords: data.customWords }),
            },
            select: { autoModEnabled: true, customBannedWords: true },
        });

        res.json({
            success: true,
            autoModEnabled: user.autoModEnabled,
            customBannedWords: user.customBannedWords,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Erro de validação', details: error.errors });
        }
        console.error('Update AutoMod settings error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};
