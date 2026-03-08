/**
 * vodController.ts — Sprint 3: VOD / Replay Management
 * CRUD for Video On Demand (stream recordings)
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Validation ==============

const createVodSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    thumbnailUrl: z.string().url().optional(),
    videoUrl: z.string().url(),
    duration: z.number().int().min(0).default(0),
    streamId: z.string().uuid().optional(),
    isPublic: z.boolean().default(true),
});

const updateVodSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional(),
    thumbnailUrl: z.string().url().optional().nullable(),
    isPublic: z.boolean().optional(),
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// ============== Controllers ==============

/**
 * Create a VOD (from stream recording or manual upload)
 * POST /api/vods
 */
export const createVod = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const data = createVodSchema.parse(req.body);

        const vod = await prisma.vod.create({
            data: {
                ...data,
                creatorId: userId,
            },
        });

        res.status(201).json({ vod });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Create VOD error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * List public VODs (by creator or all, paginated)
 * GET /api/vods?creatorId=xxx&page=1&limit=20
 */
export const getVods = async (req: Request, res: Response) => {
    try {
        const { page, limit } = paginationSchema.parse(req.query);
        const { creatorId } = req.query;

        const where: any = { isPublic: true };
        if (creatorId && typeof creatorId === 'string') {
            where.creatorId = creatorId;
        }

        const [vods, total] = await Promise.all([
            prisma.vod.findMany({
                where,
                include: {
                    creator: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.vod.count({ where }),
        ]);

        res.json({
            vods,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Get VODs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get single VOD detail + increment view count
 * GET /api/vods/:id
 */
export const getVod = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const vod = await prisma.vod.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
            include: {
                creator: {
                    select: { id: true, username: true, displayName: true, avatarUrl: true },
                },
                stream: {
                    select: { id: true, title: true, category: true },
                },
            },
        });

        res.json({ vod });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'VOD não encontrado' });
        }
        console.error('Get VOD error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update VOD (title, description, visibility) — creator only
 * PUT /api/vods/:id
 */
export const updateVod = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id } = req.params;
        const data = updateVodSchema.parse(req.body);

        // Verify ownership
        const existing = await prisma.vod.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: 'VOD não encontrado' });
        if (existing.creatorId !== userId) return res.status(403).json({ error: 'Sem permissão' });

        const vod = await prisma.vod.update({
            where: { id },
            data,
        });

        res.json({ vod });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Update VOD error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete VOD — creator only
 * DELETE /api/vods/:id
 */
export const deleteVod = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id } = req.params;

        const existing = await prisma.vod.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: 'VOD não encontrado' });
        if (existing.creatorId !== userId) return res.status(403).json({ error: 'Sem permissão' });

        await prisma.vod.delete({ where: { id } });

        res.json({ success: true, message: 'VOD eliminado' });
    } catch (error) {
        console.error('Delete VOD error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get creator's own VODs (including private ones)
 * GET /api/vods/me
 */
export const getMyVods = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { page, limit } = paginationSchema.parse(req.query);

        const [vods, total] = await Promise.all([
            prisma.vod.findMany({
                where: { creatorId: userId },
                include: {
                    stream: { select: { id: true, title: true, category: true } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.vod.count({ where: { creatorId: userId } }),
        ]);

        res.json({
            vods,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Get my VODs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
