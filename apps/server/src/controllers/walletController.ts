import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

// Validation schemas
const depositSchema = z.object({
    amount: z.number().min(100).max(1000000), // Min 100 Kz, Max 1M Kz
    paymentMethod: z.enum(['multicaixa', 'unitel_money', 'bank_transfer']),
});

const withdrawSchema = z.object({
    amount: z.number().min(1000).max(500000), // Min 1000 Kz, Max 500K Kz
    bankAccount: z.object({
        bank: z.string(),
        accountNumber: z.string(),
        accountName: z.string(),
    }),
});

const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(20),
});

// Get wallet balance and recent transactions
export const getWallet = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { balance: true },
        });

        const recentTransactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        // Calculate stats
        const stats = await prisma.transaction.groupBy({
            by: ['type'],
            where: { userId, status: 'COMPLETED' },
            _sum: { amount: true },
        });

        const totalEarned = stats
            .filter((s) => s.type === 'DONATION_RECEIVED' || s.type === 'DEPOSIT')
            .reduce((sum, s) => sum + Math.abs(s._sum.amount || 0), 0);

        const totalSpent = stats
            .filter((s) => s.type === 'DONATION_SENT' || s.type === 'WITHDRAWAL')
            .reduce((sum, s) => sum + Math.abs(s._sum.amount || 0), 0);

        res.json({
            balance: user?.balance || 0,
            stats: {
                totalEarned,
                totalSpent,
            },
            recentTransactions,
        });
    } catch (error) {
        console.error('Get wallet error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Request a deposit
export const requestDeposit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { amount, paymentMethod } = depositSchema.parse(req.body);
        const reference = `DEP-${uuidv4().slice(0, 8).toUpperCase()}`;

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                amount,
                type: 'DEPOSIT',
                status: 'PENDING',
                reference,
                description: `Depósito via ${paymentMethod}`,
                metadata: { paymentMethod },
            },
        });

        // In production, integrate with actual payment provider here
        // For now, simulate instant confirmation in dev mode
        if (process.env.NODE_ENV === 'development') {
            await prisma.$transaction([
                prisma.transaction.update({
                    where: { id: transaction.id },
                    data: { status: 'COMPLETED' },
                }),
                prisma.user.update({
                    where: { id: userId },
                    data: { balance: { increment: amount } },
                }),
            ]);

            return res.json({
                success: true,
                message: 'Deposit completed (dev mode)',
                transaction: { ...transaction, status: 'COMPLETED' },
            });
        }

        res.json({
            success: true,
            message: 'Deposit request created',
            transaction,
            paymentInstructions: {
                reference,
                amount,
                paymentMethod,
                // Add payment provider specific instructions here
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Request deposit error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Request a withdrawal
export const requestWithdrawal = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { amount, bankAccount } = withdrawSchema.parse(req.body);

        // Check balance
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.balance < amount) {
            return res.status(400).json({
                error: 'Insufficient balance',
                required: amount,
                current: user?.balance || 0,
            });
        }

        const reference = `WIT-${uuidv4().slice(0, 8).toUpperCase()}`;

        // Create withdrawal and deduct balance atomically
        const [transaction] = await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    userId,
                    amount: -amount,
                    type: 'WITHDRAWAL',
                    status: 'PENDING',
                    reference,
                    description: `Saque para ${bankAccount.bank}`,
                    metadata: { bankAccount },
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: { balance: { decrement: amount } },
            }),
        ]);

        res.json({
            success: true,
            message: 'Withdrawal request created',
            transaction,
            estimatedProcessingTime: '1-3 business days',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Request withdrawal error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get transaction history
export const getTransactionHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { page, limit } = paginationSchema.parse(req.query);
        const { type, status } = req.query;

        const where: any = { userId };
        if (type) where.type = type;
        if (status) where.status = status;

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.transaction.count({ where }),
        ]);

        res.json({
            transactions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get transaction history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
