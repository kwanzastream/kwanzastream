import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

/** Convert centimos (BigInt) to Kz for API responses */
const toKz = (centimos: bigint | number): number => Number(centimos) / 100;

/** Create an audit log entry for admin operations */
const createAuditLog = async (opts: {
    adminId: string;
    action: string;
    targetId: string;
    targetType: string;
    details?: Record<string, any>;
    ipAddress?: string;
}) => {
    try {
        await prisma.auditLog.create({
            data: {
                adminId: opts.adminId,
                action: opts.action as any,
                targetId: opts.targetId,
                targetType: opts.targetType,
                details: opts.details ? JSON.parse(JSON.stringify(opts.details)) : undefined,
                ipAddress: opts.ipAddress,
            },
        });
    } catch (error) {
        // Audit log failure should not break the operation
        console.error('Failed to create audit log:', error);
    }
};


const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
});

// Dashboard stats
export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const [
            totalUsers,
            totalStreamers,
            activeStreams,
            totalDonations,
            totalTransactions,
            recentUsers,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: 'STREAMER' } }),
            prisma.stream.count({ where: { status: 'LIVE' } }),
            prisma.donation.aggregate({ _sum: { amount: true } }),
            prisma.transaction.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true }
            }),
            prisma.user.count({
                where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
            }),
        ]);

        // Revenue calculation (platform takes 20% of donations)
        const totalDonationsAmount = totalDonations._sum.amount ?? 0n;
        const platformRevenue = Number(totalDonationsAmount) / 100 * 0.2;

        res.json({
            stats: {
                totalUsers,
                totalStreamers,
                activeStreams,
                totalDonationsAmount: toKz(totalDonations._sum.amount ?? 0n),
                platformRevenue,
                newUsersThisWeek: recentUsers,
            },
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List all users with filters
export const listUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit } = paginationSchema.parse(req.query);
        const { role, search, verified } = req.query;

        const where: any = {};
        if (role) where.role = role;
        if (verified !== undefined) where.isVerified = verified === 'true';
        if (search) {
            where.OR = [
                { username: { contains: search as string, mode: 'insensitive' } },
                { displayName: { contains: search as string, mode: 'insensitive' } },
                { phone: { contains: search as string } },
                { email: { contains: search as string, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    phone: true,
                    email: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                    role: true,
                    isVerified: true,
                    balance: true,
                    createdAt: true,
                    lastLoginAt: true,
                    _count: {
                        select: {
                            streams: true,
                            donationsSent: true,
                            donationsReceived: true,
                        },
                    },
                },
            }),
            prisma.user.count({ where }),
        ]);

        // Serialize BigInt balance for JSON
        const serializedUsers = users.map((u) => ({ ...u, balance: toKz(u.balance) }));

        res.json({
            users: serializedUsers,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('List users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user (admin actions)
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role, isVerified } = req.body;

        // NOTE: Direct balance setting removed for security (F-010).
        // Use a separate audit-logged endpoint for balance adjustments.
        const updateData: any = {};
        if (role) updateData.role = role;
        if (isVerified !== undefined) updateData.isVerified = isVerified;

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                isVerified: true,
                balance: true,
            },
        });

        res.json({ user: { ...user, balance: toKz(user.balance) } });

        // Audit log (fire-and-forget)
        const adminId = (req as AuthenticatedRequest).user?.userId;
        if (adminId && role) {
            createAuditLog({
                adminId,
                action: 'UPDATE_USER_ROLE',
                targetId: id,
                targetType: 'User',
                details: { newRole: role, isVerified },
                ipAddress: req.ip,
            });
        }
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Ban/suspend user
export const banUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        // In production, you'd want a separate "banned" field and ban history
        // For now, we'll just revoke all their tokens
        await prisma.refreshToken.updateMany({
            where: { userId: id },
            data: { revoked: true },
        });

        // End any active streams
        await prisma.stream.updateMany({
            where: { streamerId: id, status: 'LIVE' },
            data: { status: 'ENDED', endedAt: new Date() },
        });

        res.json({ success: true, message: 'User banned', reason });

        // Audit log (fire-and-forget)
        const adminId = (req as AuthenticatedRequest).user?.userId;
        if (adminId) {
            createAuditLog({
                adminId,
                action: 'BAN_USER',
                targetId: id,
                targetType: 'User',
                details: { reason },
                ipAddress: req.ip,
            });
        }
    } catch (error) {
        console.error('Ban user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List all streams with filters
export const listStreams = async (req: Request, res: Response) => {
    try {
        const { page, limit } = paginationSchema.parse(req.query);
        const { status } = req.query;

        const where: any = {};
        if (status) where.status = status;

        const [streams, total] = await Promise.all([
            prisma.stream.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    streamer: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatarUrl: true,
                        },
                    },
                    _count: {
                        select: { donations: true },
                    },
                },
            }),
            prisma.stream.count({ where }),
        ]);

        res.json({
            streams,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('List streams error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Force end a stream (moderation)
export const forceEndStream = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const stream = await prisma.stream.update({
            where: { id },
            data: {
                status: 'ENDED',
                endedAt: new Date(),
                description: `[ENDED BY ADMIN] ${reason || 'Violation of terms'}`,
            },
        });

        res.json({ stream, message: 'Stream ended by admin' });
    } catch (error) {
        console.error('Force end stream error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List transactions with filters
export const listTransactions = async (req: Request, res: Response) => {
    try {
        const { page, limit } = paginationSchema.parse(req.query);
        const { type, status, userId } = req.query;

        const where: any = {};
        if (type) where.type = type;
        if (status) where.status = status;
        if (userId) where.userId = userId;

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                },
            }),
            prisma.transaction.count({ where }),
        ]);

        res.json({
            transactions,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('List transactions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Approve pending withdrawal — ATOMIC: prevents double-approval race condition
export const approveWithdrawal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // ATOMIC: check-and-update in a single transaction
        await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findUnique({
                where: { id },
            });

            if (!transaction) {
                throw new Error('NOT_FOUND');
            }

            if (transaction.type !== 'WITHDRAWAL' || transaction.status !== 'PENDING') {
                throw new Error('INVALID_STATE');
            }

            await tx.transaction.update({
                where: { id },
                data: { status: 'COMPLETED' },
            });
        });

        res.json({ success: true, message: 'Withdrawal approved' });

        // Audit log (fire-and-forget)
        const adminId = (req as AuthenticatedRequest).user?.userId;
        if (adminId) {
            createAuditLog({
                adminId,
                action: 'APPROVE_WITHDRAWAL',
                targetId: id,
                targetType: 'Transaction',
                ipAddress: req.ip,
            });
        }
    } catch (error) {
        if (error instanceof Error && error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        if (error instanceof Error && error.message === 'INVALID_STATE') {
            return res.status(400).json({ error: 'Invalid transaction or already processed' });
        }
        console.error('Approve withdrawal error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Reject pending withdrawal (refund to wallet)
export const rejectWithdrawal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const transaction = await prisma.transaction.findUnique({
            where: { id },
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.type !== 'WITHDRAWAL' || transaction.status !== 'PENDING') {
            return res.status(400).json({ error: 'Invalid transaction' });
        }

        // Refund to user's wallet
        await prisma.$transaction([
            prisma.transaction.update({
                where: { id },
                data: {
                    status: 'CANCELLED',
                    description: `[REJECTED] ${reason || 'Rejection reason not provided'}`,
                },
            }),
            prisma.user.update({
                where: { id: transaction.userId },
                data: { balance: { increment: transaction.amount < 0n ? -transaction.amount : transaction.amount } },
            }),
        ]);

        res.json({ success: true, message: 'Withdrawal rejected, funds refunded' });

        // Audit log (fire-and-forget)
        const adminId = (req as AuthenticatedRequest).user?.userId;
        if (adminId) {
            createAuditLog({
                adminId,
                action: 'REJECT_WITHDRAWAL',
                targetId: id,
                targetType: 'Transaction',
                details: { reason, refundAmount: Number(transaction.amount) },
                ipAddress: req.ip,
            });
        }
    } catch (error) {
        console.error('Reject withdrawal error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
