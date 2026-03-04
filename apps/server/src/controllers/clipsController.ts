// ============================================================
// clipsController.ts — Clips CRUD API
// P1: Create, list, view, delete clips from streams
// ============================================================

import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Validation ==============

const createClipSchema = z.object({
    streamId: z.string().uuid(),
    title: z.string().min(1).max(100),
    startTime: z.number().int().min(0),
    endTime: z.number().int().min(1),
}).refine(data => data.endTime > data.startTime, {
    message: 'endTime must be greater than startTime',
}).refine(data => (data.endTime - data.startTime) <= 60, {
    message: 'Clip duration cannot exceed 60 seconds',
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// ============== Controllers ==============

// Create a clip from a stream
export const createClip = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { streamId, title, startTime, endTime } = createClipSchema.parse(req.body);

        // Verify stream exists
        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: { id: true, title: true, streamerId: true },
        });

        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

        const clip = await prisma.clip.create({
            data: {
                title,
                startTime,
                endTime,
                duration: endTime - startTime,
                creatorId: userId,
                streamId,
                // videoUrl will be set async when clip is processed
            },
            include: {
                creator: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
            },
        });

        res.status(201).json({
            clip: {
                ...clip,
                streamTitle: stream.title,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Create clip error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get trending clips (most viewed)
export const getTrendingClips = async (req: Request, res: Response) => {
    try {
        const { limit } = paginationSchema.parse(req.query);

        const clips = await prisma.clip.findMany({
            orderBy: { viewCount: 'desc' },
            take: limit,
            include: {
                creator: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                stream: { select: { id: true, title: true, category: true } },
            },
        });

        res.json({ clips });
    } catch (error) {
        console.error('Trending clips error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get clips for a specific stream
export const getStreamClips = async (req: Request, res: Response) => {
    try {
        const { streamId } = req.params;
        const { page, limit } = paginationSchema.parse(req.query);

        const [clips, total] = await Promise.all([
            prisma.clip.findMany({
                where: { streamId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    creator: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                },
            }),
            prisma.clip.count({ where: { streamId } }),
        ]);

        res.json({
            clips,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Stream clips error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get clips by user
export const getUserClips = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { page, limit } = paginationSchema.parse(req.query);

        const [clips, total] = await Promise.all([
            prisma.clip.findMany({
                where: { creatorId: userId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    stream: { select: { id: true, title: true, category: true } },
                },
            }),
            prisma.clip.count({ where: { creatorId: userId } }),
        ]);

        res.json({
            clips,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('User clips error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View a clip (increment view count)
export const viewClip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const clip = await prisma.clip.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
            include: {
                creator: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                stream: { select: { id: true, title: true, category: true, streamerId: true } },
            },
        });

        res.json({ clip });
    } catch (error) {
        console.error('View clip error:', error);
        res.status(404).json({ error: 'Clip not found' });
    }
};

// Delete a clip (creator only)
export const deleteClip = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id } = req.params;

        const clip = await prisma.clip.findUnique({
            where: { id },
            select: { creatorId: true },
        });

        if (!clip) {
            return res.status(404).json({ error: 'Clip not found' });
        }

        if (clip.creatorId !== userId) {
            return res.status(403).json({ error: 'Only the clip creator can delete it' });
        }

        await prisma.clip.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('Delete clip error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
