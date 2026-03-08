/**
 * recommendationController.ts — Sprint 4: Discovery & Recommendations
 * Recommends live streams and creators based on user interests, follows, and watch history.
 */

import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

/**
 * Get recommended live streams for the authenticated user.
 * Priority: 1) Followed creators, 2) Matching interests, 3) Popular streams
 * GET /api/recommendations/streams
 */
export const getRecommendedStreams = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

        // Get all live streams with streamer info
        const liveStreams = await prisma.stream.findMany({
            where: { status: 'LIVE' },
            include: {
                streamer: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        isVerified: true,
                        interests: true,
                    },
                },
            },
            orderBy: { viewerCount: 'desc' },
            take: 100, // Get top 100 live, then rank
        });

        if (!userId) {
            // Unauthenticated: return by viewer count
            return res.json({ streams: liveStreams.slice(0, limit), algorithm: 'popular' });
        }

        // Get user data for personalization
        const [user, followedIds, watchedStreamIds] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { interests: true },
            }),
            prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
            }).then(f => new Set(f.map(x => x.followingId))),
            prisma.watchHistory.findMany({
                where: { userId },
                select: { streamId: true },
                orderBy: { watchedAt: 'desc' },
                take: 50,
            }).then(w => new Set(w.map(x => x.streamId))),
        ]);

        const userInterests = new Set(user?.interests || []);

        // Score each stream
        const scored = liveStreams.map(stream => {
            let score = 0;

            // Followed creator: +100
            if (followedIds.has(stream.streamerId)) score += 100;

            // Matching category with user interests: +50
            if (stream.category && userInterests.has(stream.category)) score += 50;

            // Streamer shares interests: +20 per match
            const streamerInterests = stream.streamer.interests || [];
            for (const interest of streamerInterests) {
                if (userInterests.has(interest)) score += 20;
            }

            // Already watched (re-visit): +10
            if (watchedStreamIds.has(stream.id)) score += 10;

            // Viewer count bonus (log scale)
            score += Math.log2(Math.max(stream.viewerCount, 1)) * 5;

            // Verified creator bonus
            if (stream.streamer.isVerified) score += 15;

            return { ...stream, _score: score };
        });

        // Sort by score descending
        scored.sort((a, b) => b._score - a._score);

        // Remove internal score from response
        const result = scored.slice(0, limit).map(({ _score, ...s }) => s);

        res.json({ streams: result, algorithm: 'personalized' });
    } catch (error) {
        console.error('Get recommended streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get suggested creators to follow.
 * Returns creators the user doesn't follow yet, ranked by popularity + shared interests.
 * GET /api/recommendations/creators
 */
export const getSuggestedCreators = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const limit = Math.min(parseInt(req.query.limit as string) || 10, 30);

        // Get user interests + current follows
        const [user, followedIds] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { interests: true },
            }),
            prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
            }).then(f => new Set(f.map(x => x.followingId))),
        ]);

        const userInterests = new Set(user?.interests || []);

        // Get popular creators (streamers) not yet followed
        const creators = await prisma.user.findMany({
            where: {
                id: { notIn: [userId, ...followedIds] },
                role: { in: ['STREAMER', 'ADMIN'] },
                isBanned: false,
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                isVerified: true,
                interests: true,
                _count: { select: { followers: true, streams: true } },
            },
            orderBy: { followers: { _count: 'desc' } },
            take: 50,
        });

        // Score by shared interests + follower count
        const scored = creators.map(c => {
            let score = 0;
            const creatorInterests = c.interests || [];
            for (const interest of creatorInterests) {
                if (userInterests.has(interest)) score += 30;
            }
            score += Math.log2(Math.max(c._count.followers, 1)) * 10;
            if (c.isVerified) score += 20;
            if (c._count.streams > 0) score += 15;

            return {
                id: c.id,
                username: c.username,
                displayName: c.displayName,
                avatarUrl: c.avatarUrl,
                bio: c.bio,
                isVerified: c.isVerified,
                followersCount: c._count.followers,
                streamsCount: c._count.streams,
                sharedInterests: creatorInterests.filter(i => userInterests.has(i)),
                _score: score,
            };
        });

        scored.sort((a, b) => b._score - a._score);
        const result = scored.slice(0, limit).map(({ _score, ...c }) => c);

        res.json({ creators: result });
    } catch (error) {
        console.error('Get suggested creators error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
