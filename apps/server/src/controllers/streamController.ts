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
    contentClassification: z.enum(['EVERYONE', 'TEEN', 'MATURE']).default('EVERYONE'),
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
        const filter = req.query.filter as string | undefined;

        // Try getting from cache if it's a generic public request (no fancy filters other than pagination)
        const isPublicCacheable = !filter && page === 1; // Simplification: cache the first page for homepage loads
        let cacheKey = '';

        if (isPublicCacheable) {
            cacheKey = `streams:live:p${page}:l${limit}`;
            try {
                const { redis } = await import('../config/redis');
                if (redis.isOpen) {
                    const cached = await redis.get(cacheKey);
                    if (cached) return res.json(JSON.parse(cached));
                }
            } catch (redisError) {
                // ignore cache errors
            }
        }

        let whereClause: any = { status: 'LIVE' };

        // Handle "following" filter for authenticated users
        if (filter === 'following') {
            const authReq = req as AuthenticatedRequest;
            if (!authReq.user) {
                return res.status(401).json({ error: 'Login required for this filter' });
            }

            const following = await prisma.follow.findMany({
                where: { followerId: authReq.user.userId },
                select: { followingId: true },
            });

            if (following.length === 0) {
                return res.json({ streams: [], total: 0, pages: 0, currentPage: page }); // No active following
            }

            whereClause.streamerId = { in: following.map(f => f.followingId) };
        }

        const [streams, total] = await Promise.all([
            prisma.stream.findMany({
                where: whereClause,
                include: {
                    streamer: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatarUrl: true,
                            isVerified: true,
                            bio: true,
                        },
                    },
                },
                orderBy: { viewerCount: 'desc' }, // the hottest streams first
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.stream.count({ where: whereClause }),
        ]);

        const result = {
            streams,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page,
        };

        // If public cacheable, store it in redis
        if (isPublicCacheable) {
            try {
                const { redis } = await import('../config/redis');
                if (redis.isOpen) {
                    await redis.setEx(cacheKey, 15, JSON.stringify(result)); // Cache for 15s to smooth out microbursts
                }
            } catch (e) {
                // Ignore cache set error
            }
        }

        res.json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Parâmetros inválidos.', details: error.errors });
        }
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
            rtmpUrl: process.env.RTMP_URL || 'rtmp://localhost:1935/live',
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

            // Sprint 4: Notify all followers
            try {
                const followers = await prisma.follow.findMany({
                    where: { followingId: user.id },
                    select: { followerId: true },
                });
                if (followers.length > 0) {
                    const displayName = user.displayName || user.username || 'Streamer';
                    await prisma.notification.createMany({
                        data: followers.map(f => ({
                            type: 'LIVE_STARTED' as const,
                            title: `${displayName} está em directo!`,
                            body: stream.title || 'Vem assistir agora',
                            imageUrl: user.avatarUrl,
                            linkUrl: `/stream/${stream.id}`,
                            userId: f.followerId,
                            eventId: `live-${stream.id}-${f.followerId}`,
                        })),
                        skipDuplicates: true,
                    });
                    for (const f of followers) {
                        io.to(`user:${f.followerId}`).emit('notification', {
                            type: 'LIVE_STARTED',
                            title: `${displayName} está em directo!`,
                            streamId: stream.id,
                        });
                    }
                    console.log(`[Stream] Notified ${followers.length} followers of ${displayName}`);
                }
            } catch (notifErr) {
                console.error('Follower notification error:', notifErr);
            }
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

// Regenerate stream key — used when key is compromised
export const regenerateStreamKey = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { randomUUID } = await import('crypto');
        const newStreamKey = `kwz_${randomUUID().replace(/-/g, '').slice(0, 24)}`;

        await prisma.user.update({
            where: { id: userId },
            data: { streamKey: newStreamKey },
        });

        res.json({
            success: true,
            streamKey: newStreamKey,
            rtmpUrl: process.env.RTMP_URL || 'rtmp://localhost:1935/live',
            message: 'Stream key regenerated. Update your OBS/streaming software.',
        });
    } catch (error) {
        console.error('Regenerate stream key error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get stream health — real-time status for the stream manager
export const getStreamHealth = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const stream = await prisma.stream.findUnique({
            where: { id },
            include: {
                streamer: {
                    select: { streamKey: true },
                },
            },
        });

        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

        // Get viewer count from Socket.io room
        const room = io.sockets.adapter.rooms.get(`stream:${stream.id}`);
        const viewerCount = room?.size || 0;

        // Calculate duration if live
        const duration = stream.status === 'LIVE' && stream.startedAt
            ? Math.round((Date.now() - stream.startedAt.getTime()) / 1000)
            : 0;

        // Build HLS URL
        const cdnUrl = process.env.STREAM_CDN_URL || 'http://localhost:8000';
        const hlsUrl = stream.status === 'LIVE' && stream.streamer.streamKey
            ? `${cdnUrl}/live/${stream.streamer.streamKey}/index.m3u8`
            : null;

        res.json({
            streamId: stream.id,
            status: stream.status,
            viewerCount,
            peakViewers: stream.peakViewers,
            durationSeconds: duration,
            hlsUrl,
            startedAt: stream.startedAt,
            endedAt: stream.endedAt,
        });
    } catch (error) {
        console.error('Get stream health error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Sprint 4: Categories & Featured ==============

/**
 * Get live categories with stream counts
 * GET /api/streams/categories
 */
export const getCategories = async (_req: Request, res: Response) => {
    try {
        const cacheKey = 'streams:categories';
        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                const cached = await redis.get(cacheKey);
                if (cached) return res.json(JSON.parse(cached));
            }
        } catch (e) {
            // ignore
        }

        const streams = await prisma.stream.findMany({
            where: { status: 'LIVE', category: { not: null } },
            select: { category: true, viewerCount: true, thumbnailUrl: true },
        });

        const categoryMap = new Map<string, { liveCount: number; totalViewers: number; thumbnailUrl: string | null }>();
        for (const s of streams) {
            if (!s.category) continue;
            const existing = categoryMap.get(s.category);
            if (existing) {
                existing.liveCount++;
                existing.totalViewers += s.viewerCount;
            } else {
                categoryMap.set(s.category, { liveCount: 1, totalViewers: s.viewerCount, thumbnailUrl: s.thumbnailUrl });
            }
        }

        const categories = Array.from(categoryMap.entries())
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.totalViewers - a.totalViewers);

        const result = { categories, total: categories.length };

        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                await redis.setEx(cacheKey, 60, JSON.stringify(result)); // Cache for 60s
            }
        } catch (e) { }

        res.json(result);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get featured/trending live streams (top by viewers)
 * GET /api/streams/featured
 */
export const getFeaturedStreams = async (_req: Request, res: Response) => {
    try {
        const cacheKey = 'streams:featured';
        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                const cached = await redis.get(cacheKey);
                if (cached) return res.json(JSON.parse(cached));
            }
        } catch (e) { }

        const streams = await prisma.stream.findMany({
            where: { status: 'LIVE' },
            include: {
                streamer: {
                    select: { id: true, username: true, displayName: true, avatarUrl: true, isVerified: true },
                },
            },
            orderBy: { viewerCount: 'desc' },
            take: 5,
        });

        const result = { featured: streams };

        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                await redis.setEx(cacheKey, 30, JSON.stringify(result)); // Cache for 30s
            }
        } catch (e) { }

        res.json(result);
    } catch (error) {
        console.error('Get featured streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

