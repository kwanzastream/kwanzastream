/**
 * subscriptionController.ts — Sprint 3: Channel Subscriptions
 * Tiers: SUPPORTER (500 Kz/month), VIP (2000 Kz/month)
 * Debits wallet balance atomically on subscribe.
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Pricing in centimos (BigInt)
const TIER_PRICES: Record<string, bigint> = {
    SUPPORTER: 50000n,  // 500 Kz
    VIP: 200000n,       // 2000 Kz
};

const toCentimos = (kz: number): bigint => BigInt(Math.round(kz * 100));
const toKz = (centimos: bigint): number => Number(centimos) / 100;

// ============== Validation ==============

const subscribeSchema = z.object({
    creatorId: z.string().uuid(),
    tier: z.enum(['SUPPORTER', 'VIP']),
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// ============== Controllers ==============

/**
 * Subscribe to a creator — debits wallet atomically
 * POST /api/subscriptions
 */
export const subscribe = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { creatorId, tier } = subscribeSchema.parse(req.body);

        if (userId === creatorId) {
            return res.status(400).json({ error: 'Não podes subscrever a ti próprio' });
        }

        // Check creator exists
        const creator = await prisma.user.findUnique({ where: { id: creatorId } });
        if (!creator) return res.status(404).json({ error: 'Creator não encontrado' });

        // Check for existing active subscription
        const existing = await prisma.subscription.findUnique({
            where: { subscriberId_creatorId: { subscriberId: userId, creatorId } },
        });
        if (existing?.active) {
            return res.status(400).json({ error: 'Já tens subscrição activa neste canal' });
        }

        const price = TIER_PRICES[tier];
        if (!price) return res.status(400).json({ error: 'Tier inválido' });

        // Atomic: check balance + debit + create subscription
        const result = await prisma.$transaction(async (tx) => {
            const subscriber = await tx.user.findUnique({
                where: { id: userId },
                select: { balance: true },
            });

            if (!subscriber || subscriber.balance < price) {
                throw new Error('INSUFFICIENT_BALANCE');
            }

            // Debit subscriber
            await tx.user.update({
                where: { id: userId },
                data: { balance: { decrement: price } },
            });

            // Credit creator (80% — 20% platform fee)
            const creatorAmount = price * 80n / 100n;
            await tx.user.update({
                where: { id: creatorId },
                data: { balance: { increment: creatorAmount } },
            });

            // Create or update subscription
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30); // 30-day sub

            const subscription = existing
                ? await tx.subscription.update({
                    where: { id: existing.id },
                    data: {
                        tier,
                        active: true,
                        startedAt: new Date(),
                        expiresAt,
                        amount: price,
                    },
                })
                : await tx.subscription.create({
                    data: {
                        subscriberId: userId,
                        creatorId,
                        tier,
                        active: true,
                        expiresAt,
                        amount: price,
                    },
                });

            // Create transaction records
            await tx.transaction.create({
                data: {
                    userId,
                    amount: price,
                    type: 'DONATION_SENT', // Reuse type for sub payment
                    status: 'COMPLETED',
                    description: `Subscrição ${tier} — @${creator.username || creator.displayName}`,
                },
            });

            return subscription;
        });

        res.status(201).json({
            success: true,
            subscription: {
                id: result.id,
                tier: result.tier,
                active: result.active,
                expiresAt: result.expiresAt,
                amount: toKz(result.amount),
                creatorId,
            },
        });
    } catch (error: any) {
        if (error.message === 'INSUFFICIENT_BALANCE') {
            return res.status(400).json({ error: 'Saldo insuficiente para subscrever' });
        }
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Subscribe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Cancel subscription
 * DELETE /api/subscriptions/:id
 */
export const cancelSubscription = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id } = req.params;

        const sub = await prisma.subscription.findUnique({ where: { id } });
        if (!sub) return res.status(404).json({ error: 'Subscrição não encontrada' });
        if (sub.subscriberId !== userId) return res.status(403).json({ error: 'Sem permissão' });

        await prisma.subscription.update({
            where: { id },
            data: { active: false, autoRenew: false },
        });

        res.json({ success: true, message: 'Subscrição cancelada. Acesso válido até ao fim do período.' });
    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get my subscriptions
 * GET /api/subscriptions/me
 */
export const getMySubscriptions = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { page, limit } = paginationSchema.parse(req.query);

        const [subscriptions, total] = await Promise.all([
            prisma.subscription.findMany({
                where: { subscriberId: userId, active: true },
                include: {
                    creator: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { startedAt: 'desc' },
            }),
            prisma.subscription.count({ where: { subscriberId: userId, active: true } }),
        ]);

        res.json({
            subscriptions: subscriptions.map(s => ({
                ...s,
                amount: toKz(s.amount),
            })),
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Get my subscriptions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get a creator's subscribers
 * GET /api/subscriptions/creator/:id
 */
export const getCreatorSubscribers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id: creatorId } = req.params;
        const { page, limit } = paginationSchema.parse(req.query);

        const [subscriptions, total] = await Promise.all([
            prisma.subscription.findMany({
                where: { creatorId, active: true },
                include: {
                    subscriber: {
                        select: { id: true, username: true, displayName: true, avatarUrl: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { startedAt: 'desc' },
            }),
            prisma.subscription.count({ where: { creatorId, active: true } }),
        ]);

        res.json({
            subscribers: subscriptions.map(s => ({
                id: s.id,
                tier: s.tier,
                subscriber: s.subscriber,
                startedAt: s.startedAt,
            })),
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Get creator subscribers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Check if user is subscribed to a creator
 * GET /api/subscriptions/check/:creatorId
 */
export const checkSubscription = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { creatorId } = req.params;

        const sub = await prisma.subscription.findUnique({
            where: { subscriberId_creatorId: { subscriberId: userId, creatorId } },
        });

        const isActive = sub?.active && (!sub.expiresAt || sub.expiresAt > new Date());

        res.json({
            subscribed: !!isActive,
            tier: isActive ? sub!.tier : null,
            expiresAt: isActive ? sub!.expiresAt : null,
        });
    } catch (error) {
        console.error('Check subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
