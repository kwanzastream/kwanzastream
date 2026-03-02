import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Controllers ==============

// GET /api/favorites/creators
export const getFavoriteCreators = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const favorites = await prisma.favoriteCreator.findMany({
            where: { userId },
            include: {
                // We can't include 'creator' directly since it's not a relation
                // Instead, we'll fetch creator data separately
            },
            orderBy: { createdAt: 'desc' },
        });

        // Fetch creator profiles
        const creatorIds = favorites.map(f => f.creatorId);
        const creators = await prisma.user.findMany({
            where: { id: { in: creatorIds } },
            select: {
                id: true,
                displayName: true,
                username: true,
                avatarUrl: true,
                bio: true,
                isVerified: true,
            },
        });

        const creatorsMap = new Map(creators.map(c => [c.id, c]));

        res.json({
            favorites: favorites.map(f => ({
                id: f.id,
                createdAt: f.createdAt,
                creator: creatorsMap.get(f.creatorId) || null,
            })),
        });
    } catch (error) {
        console.error('Get favorite creators error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /api/favorites/creators/:id
export const addFavoriteCreator = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: creatorId } = req.params;

        // Can't favorite yourself
        if (userId === creatorId) {
            return res.status(400).json({ error: 'Não podes adicionar-te aos favoritos' });
        }

        // Check creator exists
        const creator = await prisma.user.findUnique({ where: { id: creatorId } });
        if (!creator) {
            return res.status(404).json({ error: 'Utilizador não encontrado' });
        }

        const favorite = await prisma.favoriteCreator.upsert({
            where: {
                userId_creatorId: { userId, creatorId },
            },
            create: { userId, creatorId },
            update: {}, // already exists, no-op
        });

        res.status(201).json({ success: true, favorite });
    } catch (error) {
        console.error('Add favorite creator error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /api/favorites/creators/:id
export const removeFavoriteCreator = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: creatorId } = req.params;

        await prisma.favoriteCreator.deleteMany({
            where: { userId, creatorId },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Remove favorite creator error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /api/favorites/creators/:id/check
export const checkFavoriteCreator = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: creatorId } = req.params;

        const exists = await prisma.favoriteCreator.findUnique({
            where: { userId_creatorId: { userId, creatorId } },
        });

        res.json({ isFavorited: !!exists });
    } catch (error) {
        console.error('Check favorite creator error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Stream Favorites ==============

// GET /api/favorites/streams
export const getFavoriteStreams = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const favorites = await prisma.favoriteStream.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        const streamIds = favorites.map(f => f.streamId);
        const streams = await prisma.stream.findMany({
            where: { id: { in: streamIds } },
            include: {
                streamer: {
                    select: { id: true, displayName: true, username: true, avatarUrl: true },
                },
            },
        });

        const streamsMap = new Map(streams.map(s => [s.id, s]));

        res.json({
            favorites: favorites.map(f => ({
                id: f.id,
                createdAt: f.createdAt,
                stream: streamsMap.get(f.streamId) || null,
            })),
        });
    } catch (error) {
        console.error('Get favorite streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /api/favorites/streams/:id
export const addFavoriteStream = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: streamId } = req.params;

        const stream = await prisma.stream.findUnique({ where: { id: streamId } });
        if (!stream) {
            return res.status(404).json({ error: 'Stream não encontrada' });
        }

        const favorite = await prisma.favoriteStream.upsert({
            where: {
                userId_streamId: { userId, streamId },
            },
            create: { userId, streamId },
            update: {},
        });

        res.status(201).json({ success: true, favorite });
    } catch (error) {
        console.error('Add favorite stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /api/favorites/streams/:id
export const removeFavoriteStream = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: streamId } = req.params;

        await prisma.favoriteStream.deleteMany({
            where: { userId, streamId },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Remove favorite stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
