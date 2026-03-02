import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { io } from '../index';

// Validation schemas
const createStreamSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    category: z.string().optional(),
    thumbnailUrl: z.string().url().optional(),
});

const updateStreamSchema = createStreamSchema.partial();

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// Get live streams — supports ?filter=following for logged-in users
export const getLiveStreams = async (req: Request, res: Response) => {
    try {
        const { page, limit } = paginationSchema.parse(req.query);
        const { category, filter } = req.query;

        const where: any = { status: 'LIVE' };
        if (category) where.category = category;

        // Filter by followed creators if requested
        if (filter === 'following') {
            const userId = (req as any).user?.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Authentication required for following filter' });
            }

            const follows = await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
            });

            where.streamerId = { in: follows.map(f => f.followingId) };
        }

        const [streams, total] = await Promise.all([
            prisma.stream.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { viewerCount: 'desc' },
                include: {
                    streamer: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatarUrl: true,
                            isVerified: true,
                        },
                    },
                },
            }),
            prisma.stream.count({ where }),
        ]);

        res.json({
            streams,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get live streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get stream by ID
export const getStream = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const stream = await prisma.stream.findUnique({
            where: { id },
            include: {
                streamer: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        bio: true,
                        isVerified: true,
                        _count: {
                            select: { followers: true },
                        },
                    },
                },
            },
        });

        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

        res.json({ stream });
    } catch (error) {
        console.error('Get stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new stream (go live setup)
export const createStream = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const data = createStreamSchema.parse(req.body);

        // Check if user has a stream key
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user?.streamKey) {
            return res.status(400).json({
                error: 'No stream key found. Generate one first.',
                action: 'POST /api/users/me/stream-key',
            });
        }

        // End any existing live streams for this user
        await prisma.stream.updateMany({
            where: { streamerId: userId, status: 'LIVE' },
            data: { status: 'ENDED', endedAt: new Date() },
        });

        const stream = await prisma.stream.create({
            data: {
                ...data,
                streamerId: userId,
                status: 'OFFLINE', // Will be set to LIVE when RTMP connects
            },
        });

        res.status(201).json({
            stream,
            streamKey: user.streamKey,
            rtmpUrl: 'rtmp://localhost:1935/live', // Replace with actual RTMP URL
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Create stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update stream info
export const updateStream = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const stream = await prisma.stream.findUnique({
            where: { id },
        });

        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

        if (stream.streamerId !== userId) {
            return res.status(403).json({ error: 'Not your stream' });
        }

        const data = updateStreamSchema.parse(req.body);

        const updatedStream = await prisma.stream.update({
            where: { id },
            data,
        });

        res.json({ stream: updatedStream });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Update stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// End a stream
export const endStream = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const stream = await prisma.stream.findUnique({
            where: { id },
        });

        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

        if (stream.streamerId !== userId) {
            return res.status(403).json({ error: 'Not your stream' });
        }

        const updatedStream = await prisma.stream.update({
            where: { id },
            data: {
                status: 'ENDED',
                endedAt: new Date(),
            },
        });

        // Notify viewers via WebSocket
        io.to(`stream:${id}`).emit('stream-ended', { streamId: id });

        res.json({ stream: updatedStream });
    } catch (error) {
        console.error('End stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user's stream history
export const getUserStreams = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { page, limit } = paginationSchema.parse(req.query);

        const user = await prisma.user.findFirst({
            where: { OR: [{ id }, { username: id }] },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const [streams, total] = await Promise.all([
            prisma.stream.findMany({
                where: { streamerId: user.id },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.stream.count({ where: { streamerId: user.id } }),
        ]);

        res.json({
            streams,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get user streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// RTMP callback when stream goes live (called by media server)
export const onStreamPublish = async (req: Request, res: Response) => {
    try {
        const { streamKey, name } = req.body;

        if (!streamKey) {
            return res.status(400).json({ error: 'Stream key required' });
        }

        // Find user by stream key
        const user = await prisma.user.findUnique({
            where: { streamKey },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid stream key' });
        }

        // Find user's pending stream and set it to LIVE
        const stream = await prisma.stream.findFirst({
            where: { streamerId: user.id, status: 'OFFLINE' },
            orderBy: { createdAt: 'desc' },
        });

        if (stream) {
            await prisma.stream.update({
                where: { id: stream.id },
                data: {
                    status: 'LIVE',
                    startedAt: new Date(),
                },
            });

            // Notify via WebSocket
            io.emit('stream-live', { streamId: stream.id, streamer: user });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('On stream publish error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// RTMP callback when stream ends
export const onStreamUnpublish = async (req: Request, res: Response) => {
    try {
        const { streamKey } = req.body;

        if (!streamKey) {
            return res.status(400).json({ error: 'Stream key required' });
        }

        const user = await prisma.user.findUnique({
            where: { streamKey },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid stream key' });
        }

        // End user's live stream
        const stream = await prisma.stream.findFirst({
            where: { streamerId: user.id, status: 'LIVE' },
        });

        if (stream) {
            await prisma.stream.update({
                where: { id: stream.id },
                data: {
                    status: 'ENDED',
                    endedAt: new Date(),
                },
            });

            io.to(`stream:${stream.id}`).emit('stream-ended', { streamId: stream.id });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('On stream unpublish error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
