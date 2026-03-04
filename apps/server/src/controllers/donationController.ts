import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { io } from '../index';
import { recordLedgerEntries, donationEntries } from '../services/ledgerService';
import { updateDailyTransacted } from '../middleware/kycGate';

// ============== Constants ==============

// Salo types with their values in centimos (1 Kz = 100 centimos)
const SALO_TYPES = {
    bronze: { price: 10000n, name: 'Salo Bronze', emoji: '🥉' },    // 100 Kz
    silver: { price: 50000n, name: 'Salo Prata', emoji: '🥈' },    // 500 Kz
    gold: { price: 100000n, name: 'Salo Ouro', emoji: '🥇' },    // 1000 Kz
    diamond: { price: 500000n, name: 'Salo Diamante', emoji: '💎' },    // 5000 Kz
    legendary: { price: 1000000n, name: 'Salo Lendário', emoji: '👑' },    // 10000 Kz
} as const;

type SaloType = keyof typeof SALO_TYPES;

// Platform fee: 20% (calculated as integer division to avoid float)
const PLATFORM_FEE_PERCENT = 20n;
const calcReceiverAmount = (amount: bigint): bigint => amount - (amount * PLATFORM_FEE_PERCENT / 100n);

/** Convert centimos (BigInt) to Kz for API responses */
const toKz = (centimos: bigint): number => Number(centimos) / 100;

// ============== Validation schemas ==============

const sendDonationSchema = z.object({
    receiverId: z.string().uuid(),
    saloType: z.enum(['bronze', 'silver', 'gold', 'diamond', 'legendary']),
    message: z.string().max(200).optional(),
    streamId: z.string().uuid().optional(),
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// ============== Controllers ==============

// Send a Salo donation — ATOMIC: no double-spend possible
export const sendDonation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const senderId = req.user?.userId;
        if (!senderId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { receiverId, saloType, message, streamId } = sendDonationSchema.parse(req.body);

        if (senderId === receiverId) {
            return res.status(400).json({ error: 'Cannot donate to yourself' });
        }

        const salo = SALO_TYPES[saloType];
        const amountCentimos = salo.price;
        const receiverAmount = calcReceiverAmount(amountCentimos);

        // Check receiver exists before entering the transaction
        const receiver = await prisma.user.findUnique({
            where: { id: receiverId },
            select: { id: true, displayName: true, username: true },
        });

        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        // ATOMIC transaction: check-and-deduct sender, credit receiver, create records
        const donation = await prisma.$transaction(async (tx) => {
            // Step 1: Atomic conditional deduct from sender
            // This UPDATE only succeeds if balance >= amountCentimos
            const senderUpdated = await tx.$executeRaw`
                UPDATE "User"
                SET "balance" = "balance" - ${amountCentimos}::bigint,
                    "updatedAt" = NOW()
                WHERE "id" = ${senderId}
                AND "balance" >= ${amountCentimos}::bigint
            `;

            if (senderUpdated === 0) {
                throw new Error('INSUFFICIENT_BALANCE');
            }

            // Step 2: Credit receiver (platform takes 20% fee)
            await tx.$executeRaw`
                UPDATE "User"
                SET "balance" = "balance" + ${receiverAmount}::bigint,
                    "updatedAt" = NOW()
                WHERE "id" = ${receiverId}
            `;

            // Step 3: Get sender info for transaction description
            const sender = await tx.user.findUnique({
                where: { id: senderId },
                select: { displayName: true, username: true },
            });

            // Step 4: Create donation record
            const don = await tx.donation.create({
                data: {
                    senderId,
                    receiverId,
                    amount: amountCentimos,
                    saloType,
                    message,
                    streamId,
                },
            });

            // Step 5: Create transaction records for both parties
            const txRecords = await tx.transaction.createManyAndReturn({
                data: [
                    {
                        userId: senderId,
                        amount: -amountCentimos,
                        type: 'DONATION_SENT',
                        status: 'COMPLETED',
                        description: `${salo.name} para ${receiver.displayName || receiver.username || 'usuário'}`,
                    },
                    {
                        userId: receiverId,
                        amount: receiverAmount,
                        type: 'DONATION_RECEIVED',
                        status: 'COMPLETED',
                        description: `${salo.name} de ${sender?.displayName || sender?.username || 'usuário'}`,
                    },
                ],
            });

            // P0: Record ledger entries (double-entry: sender→debit, receiver→credit, platform→fee)
            // Use the sender's transaction ID as the ledger reference
            if (txRecords && txRecords.length > 0) {
                await recordLedgerEntries(
                    tx,
                    txRecords[0].id,
                    donationEntries(senderId, receiverId, amountCentimos, receiverAmount)
                );
            }

            return don;
        });

        // P0: Update daily transacted for KYC tracking
        await updateDailyTransacted(senderId, amountCentimos);

        // Emit real-time donation alert to streamer via Socket.io
        const senderInfo = await prisma.user.findUnique({
            where: { id: senderId },
            select: { displayName: true, username: true, avatarUrl: true },
        });

        const alertPayload = {
            senderName: senderInfo?.displayName || senderInfo?.username || 'Anónimo',
            senderAvatar: senderInfo?.avatarUrl || null,
            saloEmoji: salo.emoji,
            saloName: salo.name,
            amount: toKz(amountCentimos),
            message: message || null,
        };

        if (streamId) {
            io.to(`stream:${streamId}`).emit('donation:received', alertPayload);
        }
        io.to(`user:${receiverId}`).emit('donation:received', alertPayload);

        res.json({
            success: true,
            donation: {
                id: donation.id,
                saloType,
                saloName: salo.name,
                saloEmoji: salo.emoji,
                amount: toKz(amountCentimos),
                message,
                receiver: {
                    id: receiver.id,
                    displayName: receiver.displayName,
                    username: receiver.username,
                },
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        if (error instanceof Error && error.message === 'INSUFFICIENT_BALANCE') {
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        console.error('Send donation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Salo types and prices (returned in Kz for API consumers)
export const getSaloTypes = async (req: Request, res: Response) => {
    const types = Object.fromEntries(
        Object.entries(SALO_TYPES).map(([key, val]) => [
            key,
            { price: toKz(val.price), name: val.name, emoji: val.emoji },
        ])
    );
    res.json({ saloTypes: types });
};

// Get donation leaderboard for a stream or user
// P1 UPGRADE: Period filtering (all/month/week/today) + Redis caching (60s TTL)
export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const { streamId, receiverId, period } = req.query;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

        // Period date ranges
        const now = new Date();
        const periodDates: Record<string, Date | undefined> = {
            today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            month: new Date(now.getFullYear(), now.getMonth(), 1),
            all: undefined,
        };
        const fromDate = periodDates[period as string] ?? undefined;

        // Cache key
        const cacheKey = `lb:donors:${streamId || 'global'}:${receiverId || 'all'}:${period || 'all'}:${limit}`;

        // Try Redis cache first (60s TTL)
        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    return res.json(JSON.parse(cached));
                }
            }
        } catch { /* Redis unavailable — skip cache */ }

        const where: any = {};
        if (streamId) where.streamId = streamId;
        if (receiverId) where.receiverId = receiverId;
        if (fromDate) where.createdAt = { gte: fromDate };

        const topDonors = await prisma.donation.groupBy({
            by: ['senderId'],
            where,
            _sum: { amount: true },
            _count: true,
            orderBy: { _sum: { amount: 'desc' } },
            take: limit,
        });

        // Single IN query for all donor details
        const senderIds = topDonors.map((d) => d.senderId);
        const users = await prisma.user.findMany({
            where: { id: { in: senderIds } },
            select: { id: true, username: true, displayName: true, avatarUrl: true },
        });
        const userMap = new Map(users.map((u) => [u.id, u]));

        const result = {
            leaderboard: topDonors.map((donor, index) => ({
                rank: index + 1,
                user: userMap.get(donor.senderId) || null,
                totalAmount: toKz(donor._sum.amount ?? 0n),
                donationCount: donor._count,
            })),
            period: period || 'all',
        };

        // Cache result (60s)
        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                await redis.setEx(cacheKey, 60, JSON.stringify(result));
            }
        } catch { /* skip cache write */ }

        res.json(result);
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// P1: Top creators (receivers) ranked by total earnings
export const getTopCreators = async (req: Request, res: Response) => {
    try {
        const { period } = req.query;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

        const now = new Date();
        const periodDates: Record<string, Date | undefined> = {
            today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            month: new Date(now.getFullYear(), now.getMonth(), 1),
            all: undefined,
        };
        const fromDate = periodDates[period as string] ?? undefined;

        const cacheKey = `lb:creators:${period || 'all'}:${limit}`;

        // Try cache
        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) {
                const cached = await redis.get(cacheKey);
                if (cached) return res.json(JSON.parse(cached));
            }
        } catch { }

        const where: any = {};
        if (fromDate) where.createdAt = { gte: fromDate };

        const topCreators = await prisma.donation.groupBy({
            by: ['receiverId'],
            where,
            _sum: { amount: true },
            _count: true,
            orderBy: { _sum: { amount: 'desc' } },
            take: limit,
        });

        const receiverIds = topCreators.map(d => d.receiverId);
        const users = await prisma.user.findMany({
            where: { id: { in: receiverIds } },
            select: { id: true, username: true, displayName: true, avatarUrl: true },
        });
        const userMap = new Map(users.map(u => [u.id, u]));

        const result = {
            creators: topCreators.map((c, index) => ({
                rank: index + 1,
                user: userMap.get(c.receiverId) || null,
                totalEarnings: toKz(c._sum.amount ?? 0n),
                donationCount: c._count,
            })),
            period: period || 'all',
        };

        try {
            const { redis } = await import('../config/redis');
            if (redis.isOpen) await redis.setEx(cacheKey, 60, JSON.stringify(result));
        } catch { }

        res.json(result);
    } catch (error) {
        console.error('Get top creators error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user's donation history
export const getDonationHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { page, limit } = paginationSchema.parse(req.query);
        const { type } = req.query; // 'sent' or 'received'

        const where = type === 'received'
            ? { receiverId: userId }
            : type === 'sent'
                ? { senderId: userId }
                : { OR: [{ senderId: userId }, { receiverId: userId }] };

        const [donations, total] = await Promise.all([
            prisma.donation.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    sender: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                    receiver: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                },
            }),
            prisma.donation.count({ where }),
        ]);

        res.json({
            donations: donations.map((d) => ({
                ...d,
                amount: toKz(d.amount),
                saloInfo: SALO_TYPES[d.saloType as SaloType]
                    ? {
                        price: toKz(SALO_TYPES[d.saloType as SaloType].price),
                        name: SALO_TYPES[d.saloType as SaloType].name,
                        emoji: SALO_TYPES[d.saloType as SaloType].emoji,
                    }
                    : undefined,
            })),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get donation history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
