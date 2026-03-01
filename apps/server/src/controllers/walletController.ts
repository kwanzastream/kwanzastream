import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

// ============== Helpers ==============
/** Convert a user-facing Kz amount to centimos (BigInt) */
const toCentimos = (kz: number): bigint => BigInt(Math.round(kz * 100));

/** Convert centimos (BigInt) back to Kz for API responses */
const toKz = (centimos: bigint): number => Number(centimos) / 100;

/** Serialize BigInt fields for JSON responses */
const serializeTransaction = (tx: any) => ({
    ...tx,
    amount: typeof tx.amount === 'bigint' ? toKz(tx.amount) : tx.amount,
    user: tx.user ? tx.user : undefined,
});

const serializeUser = (user: any) => ({
    ...user,
    balance: toKz(user.balance),
});

// ============== Validation schemas ==============
const depositSchema = z.object({
    amount: z.number().min(100).max(1000000), // Min 100 Kz, Max 1M Kz
    paymentMethod: z.enum(['multicaixa', 'unitel_money', 'bank_transfer']),
    idempotencyKey: z.string().uuid().optional(), // Prevents double-credit on retry
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

// ============== Controllers ==============

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
            .reduce((sum, s) => sum + Math.abs(Number(s._sum.amount ?? 0n)), 0);

        const totalSpent = stats
            .filter((s) => s.type === 'DONATION_SENT' || s.type === 'WITHDRAWAL')
            .reduce((sum, s) => sum + Math.abs(Number(s._sum.amount ?? 0n)), 0);

        res.json({
            balance: user ? toKz(user.balance as unknown as bigint) : 0,
            stats: {
                totalEarned: totalEarned / 100, // Convert centimos back to Kz
                totalSpent: totalSpent / 100,
            },
            recentTransactions: recentTransactions.map(serializeTransaction),
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

        const { amount, paymentMethod, idempotencyKey } = depositSchema.parse(req.body);

        // IDEMPOTENCY CHECK: if key provided, return existing transaction if found
        if (idempotencyKey) {
            const existing = await prisma.transaction.findUnique({
                where: { idempotencyKey },
            });
            if (existing) {
                return res.json({
                    success: true,
                    message: 'Deposit already processed (idempotent)',
                    transaction: serializeTransaction(existing),
                });
            }
        }

        const amountCentimos = toCentimos(amount);
        const reference = `DEP-${uuidv4().slice(0, 8).toUpperCase()}`;

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                amount: amountCentimos,
                type: 'DEPOSIT',
                status: 'PENDING',
                reference,
                idempotencyKey,
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
                    data: { balance: { increment: amountCentimos } },
                }),
            ]);

            return res.json({
                success: true,
                message: 'Deposit completed (dev mode)',
                transaction: serializeTransaction({ ...transaction, status: 'COMPLETED' }),
            });
        }

        res.json({
            success: true,
            message: 'Deposit request created',
            transaction: serializeTransaction(transaction),
            paymentInstructions: {
                reference,
                amount,
                paymentMethod,
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

// Request a withdrawal — ATOMIC: check-and-deduct in one operation
export const requestWithdrawal = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { amount, bankAccount } = withdrawSchema.parse(req.body);
        const amountCentimos = toCentimos(amount);
        const reference = `WIT-${uuidv4().slice(0, 8).toUpperCase()}`;

        // ATOMIC: check balance AND deduct in a single transaction
        // Uses interactive transaction with raw SQL for conditional update
        const result = await prisma.$transaction(async (tx) => {
            // Conditional update: only succeeds if balance >= amount
            const updated = await tx.$executeRaw`
                UPDATE "User"
                SET "balance" = "balance" - ${amountCentimos}::bigint,
                    "updatedAt" = NOW()
                WHERE "id" = ${userId}
                AND "balance" >= ${amountCentimos}::bigint
            `;

            if (updated === 0) {
                throw new Error('INSUFFICIENT_BALANCE');
            }

            // Create withdrawal transaction record
            const transaction = await tx.transaction.create({
                data: {
                    userId,
                    amount: -amountCentimos,
                    type: 'WITHDRAWAL',
                    status: 'PENDING',
                    reference,
                    description: `Saque para ${bankAccount.bank}`,
                    metadata: { bankAccount },
                },
            });

            return transaction;
        });

        res.json({
            success: true,
            message: 'Withdrawal request created',
            transaction: serializeTransaction(result),
            estimatedProcessingTime: '1-3 business days',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        if (error instanceof Error && error.message === 'INSUFFICIENT_BALANCE') {
            return res.status(400).json({ error: 'Insufficient balance' });
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
            transactions: transactions.map(serializeTransaction),
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
