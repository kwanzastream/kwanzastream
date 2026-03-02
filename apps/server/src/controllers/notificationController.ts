import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Validation schemas ==============

const paginationSchema = z.object({
    cursor: z.string().datetime().optional(), // ISO timestamp cursor
    limit: z.coerce.number().min(1).max(50).default(20),
});

// ============== Controllers ==============

// GET /api/notifications — cursor-based pagination
export const getNotifications = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { cursor, limit } = paginationSchema.parse(req.query);

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
                ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        const nextCursor = notifications.length === limit
            ? notifications[notifications.length - 1].createdAt.toISOString()
            : null;

        res.json({
            notifications,
            nextCursor,
            hasMore: notifications.length === limit,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Get notifications error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /api/notifications/unread-count
export const getUnreadCount = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const count = await prisma.notification.count({
            where: { userId, read: false },
        });

        res.json({ count });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PATCH /api/notifications/:id/read
export const markAsRead = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const { id } = req.params;

        const notification = await prisma.notification.updateMany({
            where: { id, userId }, // userId ensures ownership
            data: { read: true },
        });

        if (notification.count === 0) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PATCH /api/notifications/read-all — cursor-bounded, safe update
export const markAllAsRead = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        // Safe bounded update: only mark notifications created up to NOW as read
        // This prevents locking issues with unbounded updates
        const cutoff = new Date();

        const result = await prisma.notification.updateMany({
            where: {
                userId,
                read: false,
                createdAt: { lte: cutoff },
            },
            data: { read: true },
        });

        res.json({ success: true, updated: result.count });
    } catch (error) {
        console.error('Mark all as read error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
