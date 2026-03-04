// ============================================================
// creatorController.ts — Creator Studio Dashboard API
// P1: Earnings, stats, stream history for content creators
// ============================================================

import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

/** Convert centimos (BigInt) to Kz for API responses */
const toKz = (centimos: bigint): number => Number(centimos) / 100;

// ============== Creator Stats ==============

export const getCreatorStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        // Parallel queries for maximum speed
        const [
            user,
            totalStreams,
            liveStream,
            followerCount,
            totalDonationsReceived,
            topDonations,
            recentTransactions,
        ] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { balance: true, displayName: true, username: true, avatarUrl: true, kycTier: true },
            }),
            prisma.stream.count({ where: { streamerId: userId } }),
            prisma.stream.findFirst({
                where: { streamerId: userId, status: 'LIVE' },
                select: { id: true, title: true, viewerCount: true, startedAt: true },
            }),
            prisma.follow.count({ where: { followingId: userId } }),
            prisma.donation.aggregate({
                where: { receiverId: userId },
                _sum: { amount: true },
                _count: true,
            }),
            prisma.donation.findMany({
                where: { receiverId: userId },
                orderBy: { amount: 'desc' },
                take: 5,
                include: {
                    sender: { select: { displayName: true, username: true, avatarUrl: true } },
                },
            }),
            prisma.transaction.findMany({
                where: { userId, status: 'COMPLETED' },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
        ]);

        // Calculate earnings by period
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const [monthlyEarnings, weeklyEarnings, totalViews] = await Promise.all([
            prisma.donation.aggregate({
                where: { receiverId: userId, createdAt: { gte: thirtyDaysAgo } },
                _sum: { amount: true },
            }),
            prisma.donation.aggregate({
                where: { receiverId: userId, createdAt: { gte: sevenDaysAgo } },
                _sum: { amount: true },
            }),
            prisma.stream.aggregate({
                where: { streamerId: userId },
                _sum: { peakViewers: true },
            }),
        ]);

        // Platform fee deduction (20%)
        const totalGross = totalDonationsReceived._sum.amount ?? 0n;
        const platformFee = totalGross * 20n / 100n;
        const totalNet = totalGross - platformFee;

        res.json({
            profile: {
                displayName: user?.displayName,
                username: user?.username,
                avatarUrl: user?.avatarUrl,
                kycTier: user?.kycTier ?? 0,
            },
            balance: toKz(user?.balance ?? 0n),
            earnings: {
                total: toKz(totalNet),
                thisMonth: toKz((monthlyEarnings._sum.amount ?? 0n) * 80n / 100n),
                thisWeek: toKz((weeklyEarnings._sum.amount ?? 0n) * 80n / 100n),
                platformFeePercent: 20,
            },
            stats: {
                totalStreams,
                totalViewers: totalViews._sum.peakViewers ?? 0,
                followers: followerCount,
                totalDonations: totalDonationsReceived._count,
            },
            liveStream: liveStream ? {
                ...liveStream,
                startedAt: liveStream.startedAt?.toISOString(),
            } : null,
            topDonations: topDonations.map(d => ({
                id: d.id,
                amount: toKz(d.amount),
                saloType: d.saloType,
                message: d.message,
                sender: d.sender,
                createdAt: d.createdAt.toISOString(),
            })),
            recentTransactions: recentTransactions.map(t => ({
                id: t.id,
                amount: toKz(t.amount),
                type: t.type,
                description: t.description,
                createdAt: t.createdAt.toISOString(),
            })),
        });
    } catch (error) {
        console.error('Creator stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Creator Stream History ==============

export const getCreatorStreams = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

        const [streams, total] = await Promise.all([
            prisma.stream.findMany({
                where: { streamerId: userId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    _count: { select: { donations: true, clips: true } },
                },
            }),
            prisma.stream.count({ where: { streamerId: userId } }),
        ]);

        res.json({
            streams: streams.map(s => ({
                id: s.id,
                title: s.title,
                category: s.category,
                status: s.status,
                viewerCount: s.viewerCount,
                peakViewers: s.peakViewers,
                donationCount: s._count.donations,
                clipCount: s._count.clips,
                startedAt: s.startedAt?.toISOString(),
                endedAt: s.endedAt?.toISOString(),
                createdAt: s.createdAt.toISOString(),
            })),
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Creator streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Creator Earnings Chart Data ==============

export const getEarningsChart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const days = Math.min(parseInt(req.query.days as string) || 30, 90);

        // Get daily earnings for the last N days
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        const donations = await prisma.donation.findMany({
            where: {
                receiverId: userId,
                createdAt: { gte: startDate },
            },
            select: { amount: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
        });

        // Group by day
        const dailyMap = new Map<string, bigint>();
        for (let i = 0; i < days; i++) {
            const date = new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000);
            dailyMap.set(date.toISOString().split('T')[0], 0n);
        }

        for (const d of donations) {
            const day = d.createdAt.toISOString().split('T')[0];
            const current = dailyMap.get(day) ?? 0n;
            // Net after 20% platform fee
            dailyMap.set(day, current + (d.amount * 80n / 100n));
        }

        const chartData = Array.from(dailyMap.entries()).map(([date, amount]) => ({
            date,
            earnings: toKz(amount),
        }));

        res.json({ chartData, days });
    } catch (error) {
        console.error('Earnings chart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
