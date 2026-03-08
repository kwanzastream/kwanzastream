/**
 * watchHistoryController.ts — Sprint 4: Watch History
 * Tracks which streams a user has watched. Uses existing WatchHistory schema.
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

/**
 * Record or update a watch entry (upsert)
 * POST /api/watch-history
 */
export const recordWatch = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { streamId, duration } = z.object({
            streamId: z.string().uuid(),
            duration: z.number().int().min(0).default(0),
        }).parse(req.body);

        // Verify stream exists
        const stream = await prisma.stream.findUnique({ where: { id: streamId } });
        if (!stream) return res.status(404).json({ error: 'Stream não encontrada' });

        // Upsert — update duration if already watched, create if new
        const entry = await prisma.watchHistory.upsert({
            where: { userId_streamId: { userId, streamId } },
            update: {
                watchedAt: new Date(),
                duration: { increment: duration },
            },
            create: {
                userId,
                streamId,
                duration,
            },
        });

        res.json({ success: true, entry });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Record watch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get user's watch history (paginated, most recent first)
 * GET /api/watch-history
 */
export const getWatchHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { page, limit } = paginationSchema.parse(req.query);

        const [entries, total] = await Promise.all([
            prisma.watchHistory.findMany({
                where: { userId },
                include: {
                    stream: {
                        select: {
                            id: true,
                            title: true,
                            category: true,
                            thumbnailUrl: true,
                            status: true,
                            viewerCount: true,
                            startedAt: true,
                            streamer: {
                                select: { id: true, username: true, displayName: true, avatarUrl: true },
                            },
                        },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { watchedAt: 'desc' },
            }),
            prisma.watchHistory.count({ where: { userId } }),
        ]);

        res.json({
            history: entries,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Get watch history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Clear all watch history
 * DELETE /api/watch-history
 */
export const clearHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { count } = await prisma.watchHistory.deleteMany({ where: { userId } });

        res.json({ success: true, deletedCount: count });
    } catch (error) {
        console.error('Clear history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
