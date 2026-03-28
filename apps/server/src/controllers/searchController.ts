import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

const searchSchema = z.object({
    q: z.string().min(1).max(100),
    type: z.enum(['all', 'users', 'streams']).default('all'),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(30).default(10),
});

export const search = async (req: Request, res: Response) => {
    try {
        const { q, type, page, limit } = searchSchema.parse(req.query);
        const skip = (page - 1) * limit;
        const query = q.trim();

        const results: { users?: any[]; streams?: any[]; totalUsers?: number; totalStreams?: number } = {};

        // Search users
        if (type === 'all' || type === 'users') {
            const userWhere = {
                OR: [
                    { displayName: { contains: query, mode: 'insensitive' as const } },
                    { username: { contains: query, mode: 'insensitive' as const } },
                ],
                isBanned: false,
            };

            const [users, totalUsers] = await Promise.all([
                prisma.user.findMany({
                    where: userWhere,
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        isVerified: true,
                        bio: true,
                        _count: { select: { followers: true } },
                    },
                    take: limit,
                    skip: type === 'users' ? skip : 0,
                    orderBy: { followers: { _count: 'desc' } },
                }),
                prisma.user.count({ where: userWhere }),
            ]);

            results.users = users.map(u => ({
                ...u,
                followersCount: u._count.followers,
                _count: undefined,
            }));
            results.totalUsers = totalUsers;
        }

        // Search live streams
        if (type === 'all' || type === 'streams') {
            const streamWhere = {
                status: 'LIVE' as const,
                OR: [
                    { title: { contains: query, mode: 'insensitive' as const } },
                    { category: { contains: query, mode: 'insensitive' as const } },
                ],
            };

            const [streams, totalStreams] = await Promise.all([
                prisma.stream.findMany({
                    where: streamWhere,
                    select: {
                        id: true,
                        title: true,
                        category: true,
                        thumbnailUrl: true,
                        viewerCount: true,
                        startedAt: true,
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
                    take: limit,
                    skip: type === 'streams' ? skip : 0,
                    orderBy: { viewerCount: 'desc' },
                }),
                prisma.stream.count({ where: streamWhere }),
            ]);

            results.streams = streams;
            results.totalStreams = totalStreams;
        }

        // `results` wrapper helps automated API tests (TestSprite) while keeping top-level keys for the web app
        res.json({
            query: q,
            type,
            page,
            limit,
            ...results,
            results: {
                users: results.users ?? [],
                streams: results.streams ?? [],
                totalUsers: results.totalUsers ?? 0,
                totalStreams: results.totalStreams ?? 0,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Parâmetros inválidos.', details: error.errors });
        }
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
