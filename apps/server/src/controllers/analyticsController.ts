/**
 * analyticsController.ts — Sprint 5: Platform & Creator Analytics
 * Provides time-series and aggregate analytics for admin dashboard and creator studio.
 */

import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const toKz = (centimos: bigint): number => Number(centimos) / 100;

// ============== Admin: Platform Analytics ==============

/**
 * Platform-wide analytics — user growth, stream volume, revenue
 * GET /api/analytics/platform?days=30
 * Admin only
 */
export const getPlatformAnalytics = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const days = Math.min(parseInt(req.query.days as string) || 30, 90);
        const since = new Date();
        since.setDate(since.getDate() - days);

        // Parallel queries for all platform metrics
        const [
            totalUsers,
            newUsers,
            totalStreams,
            liveNow,
            totalDonations,
            donationVolume,
            totalTransactions,
            pendingWithdrawals,
            activeSubscriptions,
            dailyUserGrowth,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { createdAt: { gte: since } } }),
            prisma.stream.count({ where: { createdAt: { gte: since } } }),
            prisma.stream.count({ where: { status: 'LIVE' } }),
            prisma.donation.count({ where: { createdAt: { gte: since } } }),
            prisma.donation.aggregate({ _sum: { amount: true }, where: { createdAt: { gte: since } } }),
            prisma.transaction.count({ where: { createdAt: { gte: since } } }),
            prisma.transaction.count({ where: { status: 'PENDING', type: 'WITHDRAWAL' } }),
            prisma.subscription.count({ where: { active: true } }),
            // Daily user registrations for chart
            prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
                `SELECT DATE("createdAt") as date, COUNT(*)::bigint as count
                 FROM "User"
                 WHERE "createdAt" >= $1
                 GROUP BY DATE("createdAt")
                 ORDER BY date ASC`,
                since
            ),
        ]);

        const platformFees = donationVolume._sum.amount
            ? toKz(donationVolume._sum.amount * 20n / 100n)
            : 0;

        res.json({
            period: { days, since },
            users: {
                total: totalUsers,
                new: newUsers,
                dailyGrowth: dailyUserGrowth.map(d => ({
                    date: d.date,
                    count: Number(d.count),
                })),
            },
            streams: {
                total: totalStreams,
                liveNow,
            },
            financial: {
                totalDonations,
                donationVolume: toKz(donationVolume._sum.amount || 0n),
                platformFees,
                totalTransactions,
                pendingWithdrawals,
                activeSubscriptions,
            },
        });
    } catch (error) {
        console.error('Platform analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Admin revenue report — breakdown by type over time
 * GET /api/analytics/revenue?days=30
 */
export const getRevenueReport = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const days = Math.min(parseInt(req.query.days as string) || 30, 90);
        const since = new Date();
        since.setDate(since.getDate() - days);

        const [donationsByDay, transactionsByType] = await Promise.all([
            prisma.$queryRawUnsafe<{ date: string; total: bigint; count: bigint }[]>(
                `SELECT DATE("createdAt") as date, SUM("amount")::bigint as total, COUNT(*)::bigint as count
                 FROM "Donation"
                 WHERE "createdAt" >= $1
                 GROUP BY DATE("createdAt")
                 ORDER BY date ASC`,
                since
            ),
            prisma.transaction.groupBy({
                by: ['type'],
                _sum: { amount: true },
                _count: true,
                where: {
                    createdAt: { gte: since },
                    status: 'COMPLETED',
                },
            }),
        ]);

        res.json({
            period: { days, since },
            donationsByDay: donationsByDay.map(d => ({
                date: d.date,
                total: toKz(d.total),
                count: Number(d.count),
            })),
            transactionsByType: transactionsByType.map(t => ({
                type: t.type,
                total: toKz(t._sum.amount || 0n),
                count: t._count,
            })),
        });
    } catch (error) {
        console.error('Revenue report error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Creator: Per-Stream Analytics ==============

/**
 * Detailed analytics for a specific stream
 * GET /api/creator/streams/:id/analytics
 */
export const getStreamAnalytics = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id: streamId } = req.params;

        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: {
                id: true,
                title: true,
                category: true,
                status: true,
                viewerCount: true,
                peakViewers: true,
                startedAt: true,
                endedAt: true,
                streamerId: true,
            },
        });

        if (!stream) return res.status(404).json({ error: 'Stream não encontrada' });
        if (stream.streamerId !== userId) return res.status(403).json({ error: 'Sem permissão' });

        // Get stream donations + watch time
        const [donations, watchTime, clipCount] = await Promise.all([
            prisma.donation.aggregate({
                _sum: { amount: true },
                _count: true,
                where: { streamId },
            }),
            prisma.watchHistory.aggregate({
                _sum: { duration: true },
                _count: true,
                where: { streamId },
            }),
            prisma.clip.count({ where: { streamId } }),
        ]);

        const durationSec = stream.startedAt && stream.endedAt
            ? Math.floor((new Date(stream.endedAt).getTime() - new Date(stream.startedAt).getTime()) / 1000)
            : stream.startedAt
                ? Math.floor((Date.now() - new Date(stream.startedAt).getTime()) / 1000)
                : 0;

        res.json({
            stream: {
                id: stream.id,
                title: stream.title,
                category: stream.category,
                status: stream.status,
                durationSeconds: durationSec,
                peakViewers: stream.peakViewers,
                currentViewers: stream.viewerCount,
            },
            donations: {
                total: toKz(donations._sum.amount || 0n),
                count: donations._count,
            },
            engagement: {
                uniqueViewers: watchTime._count,
                totalWatchTimeSeconds: watchTime._sum.duration || 0,
                avgWatchTimeSeconds: watchTime._count > 0
                    ? Math.round((watchTime._sum.duration || 0) / watchTime._count)
                    : 0,
                clips: clipCount,
            },
        });
    } catch (error) {
        console.error('Stream analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Creator: Subscriber Analytics ==============

/**
 * Subscriber analytics — tier breakdown, revenue, growth
 * GET /api/creator/subscribers/analytics
 */
export const getSubscriberAnalytics = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const [activeSubs, tierBreakdown, totalRevenue, recentSubs] = await Promise.all([
            prisma.subscription.count({ where: { creatorId: userId, active: true } }),
            prisma.subscription.groupBy({
                by: ['tier'],
                _count: true,
                where: { creatorId: userId, active: true },
            }),
            prisma.subscription.aggregate({
                _sum: { amount: true },
                where: { creatorId: userId },
            }),
            prisma.subscription.findMany({
                where: { creatorId: userId, active: true },
                include: {
                    subscriber: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                },
                orderBy: { startedAt: 'desc' },
                take: 10,
            }),
        ]);

        res.json({
            totalActive: activeSubs,
            tierBreakdown: tierBreakdown.map(t => ({
                tier: t.tier,
                count: t._count,
            })),
            totalRevenue: toKz(totalRevenue._sum.amount || 0n),
            // Creator receives 80% of sub revenue
            creatorRevenue: toKz((totalRevenue._sum.amount || 0n) * 80n / 100n),
            recentSubscribers: recentSubs.map(s => ({
                id: s.id,
                tier: s.tier,
                subscriber: s.subscriber,
                startedAt: s.startedAt,
                amount: toKz(s.amount),
            })),
        });
    } catch (error) {
        console.error('Subscriber analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== Creator: Follower Growth ==============

/**
 * Follower growth over time — daily new followers for last N days
 * GET /api/creator/followers/growth?days=30
 */
export const getFollowerGrowth = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const days = Math.min(parseInt(req.query.days as string) || 30, 90);
        const since = new Date();
        since.setDate(since.getDate() - days);

        const [totalFollowers, dailyGrowth] = await Promise.all([
            prisma.follow.count({ where: { followingId: userId } }),
            prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
                `SELECT DATE("createdAt") as date, COUNT(*)::bigint as count
                 FROM "Follow"
                 WHERE "followingId" = $1 AND "createdAt" >= $2
                 GROUP BY DATE("createdAt")
                 ORDER BY date ASC`,
                userId,
                since
            ),
        ]);

        res.json({
            totalFollowers,
            period: { days, since },
            dailyGrowth: dailyGrowth.map(d => ({
                date: d.date,
                newFollowers: Number(d.count),
            })),
        });
    } catch (error) {
        console.error('Follower growth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
