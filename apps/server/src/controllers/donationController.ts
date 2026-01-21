import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Salo types with their values in Kwanzas
const SALO_TYPES = {
    bronze: { price: 100, name: 'Salo Bronze', emoji: '🥉' },
    silver: { price: 500, name: 'Salo Prata', emoji: '🥈' },
    gold: { price: 1000, name: 'Salo Ouro', emoji: '🥇' },
    diamond: { price: 5000, name: 'Salo Diamante', emoji: '💎' },
    legendary: { price: 10000, name: 'Salo Lendário', emoji: '👑' },
} as const;

// Validation schemas
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

// Send a Salo donation
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
        const amount = salo.price;

        // Get sender and check balance
        const sender = await prisma.user.findUnique({
            where: { id: senderId },
        });

        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({
                error: 'Insufficient balance',
                required: amount,
                current: sender.balance,
            });
        }

        // Check receiver exists
        const receiver = await prisma.user.findUnique({
            where: { id: receiverId },
        });

        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        // Perform transaction atomically
        const [donation] = await prisma.$transaction([
            // Create donation record
            prisma.donation.create({
                data: {
                    senderId,
                    receiverId,
                    amount,
                    saloType,
                    message,
                    streamId,
                },
            }),
            // Deduct from sender
            prisma.user.update({
                where: { id: senderId },
                data: { balance: { decrement: amount } },
            }),
            // Add to receiver (platform takes 20% fee)
            prisma.user.update({
                where: { id: receiverId },
                data: { balance: { increment: amount * 0.8 } },
            }),
            // Create transaction records
            prisma.transaction.create({
                data: {
                    userId: senderId,
                    amount: -amount,
                    type: 'DONATION_SENT',
                    status: 'COMPLETED',
                    description: `${salo.name} para ${receiver.displayName || receiver.username || 'usuário'}`,
                },
            }),
            prisma.transaction.create({
                data: {
                    userId: receiverId,
                    amount: amount * 0.8,
                    type: 'DONATION_RECEIVED',
                    status: 'COMPLETED',
                    description: `${salo.name} de ${sender.displayName || sender.username || 'usuário'}`,
                },
            }),
        ]);

        res.json({
            success: true,
            donation: {
                id: donation.id,
                saloType,
                saloName: salo.name,
                saloEmoji: salo.emoji,
                amount,
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
        console.error('Send donation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Salo types and prices
export const getSaloTypes = async (req: Request, res: Response) => {
    res.json({ saloTypes: SALO_TYPES });
};

// Get donation leaderboard for a stream or user
export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const { streamId, receiverId } = req.query;
        const { limit } = paginationSchema.parse(req.query);

        const where: any = {};
        if (streamId) where.streamId = streamId;
        if (receiverId) where.receiverId = receiverId;

        const topDonors = await prisma.donation.groupBy({
            by: ['senderId'],
            where,
            _sum: { amount: true },
            orderBy: { _sum: { amount: 'desc' } },
            take: limit,
        });

        // Get user details for each donor
        const donorsWithDetails = await Promise.all(
            topDonors.map(async (donor, index) => {
                const user = await prisma.user.findUnique({
                    where: { id: donor.senderId },
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                    },
                });
                return {
                    rank: index + 1,
                    user,
                    totalAmount: donor._sum.amount || 0,
                };
            })
        );

        res.json({ leaderboard: donorsWithDetails });
    } catch (error) {
        console.error('Get leaderboard error:', error);
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
                saloInfo: SALO_TYPES[d.saloType as keyof typeof SALO_TYPES],
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
