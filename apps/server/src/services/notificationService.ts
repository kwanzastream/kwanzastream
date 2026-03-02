import prisma from '../config/prisma';
import { NotificationType } from '@prisma/client';
import { Server } from 'socket.io';

// ============== Singleton IO reference ==============
let io: Server | null = null;

export const setNotificationIO = (socketIO: Server) => {
    io = socketIO;
};

// ============== Core: Create Notification ==============
interface CreateNotificationOpts {
    imageUrl?: string;
    linkUrl?: string;
    eventId?: string; // idempotency key
}

export const createNotification = async (
    userId: string,
    type: NotificationType,
    title: string,
    body: string,
    opts: CreateNotificationOpts = {}
) => {
    // Idempotency: if eventId provided and already exists, skip
    if (opts.eventId) {
        const existing = await prisma.notification.findUnique({
            where: { eventId: opts.eventId },
        });
        if (existing) return existing;
    }

    const notification = await prisma.notification.create({
        data: {
            userId,
            type,
            title,
            body,
            imageUrl: opts.imageUrl,
            linkUrl: opts.linkUrl,
            eventId: opts.eventId,
        },
    });

    // Push via Socket.io to user's personal room
    if (io) {
        io.to(`user:${userId}`).emit('notification:new', notification);
    }

    return notification;
};

// ============== Batch: Notify All Followers ==============
const BATCH_SIZE = 500;

export const notifyFollowersAsync = async (
    streamerId: string,
    type: NotificationType,
    title: string,
    body: string,
    opts: CreateNotificationOpts = {}
) => {
    // Run in background — do NOT await at call site to avoid blocking request
    setImmediate(async () => {
        try {
            let cursor: string | undefined;
            let hasMore = true;

            while (hasMore) {
                const follows = await prisma.follow.findMany({
                    where: { followingId: streamerId },
                    select: { followerId: true, id: true },
                    take: BATCH_SIZE,
                    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
                    orderBy: { id: 'asc' },
                });

                if (follows.length === 0) {
                    hasMore = false;
                    break;
                }

                // Batch insert notifications via createMany
                const eventPrefix = opts.eventId || `${type}:${streamerId}:${Date.now()}`;
                await prisma.notification.createMany({
                    data: follows.map((f, i) => ({
                        userId: f.followerId,
                        type,
                        title,
                        body,
                        imageUrl: opts.imageUrl,
                        linkUrl: opts.linkUrl,
                        eventId: `${eventPrefix}:${f.followerId}`,
                    })),
                    skipDuplicates: true, // idempotency via unique eventId
                });

                // Push Socket.io events to each follower
                if (io) {
                    for (const f of follows) {
                        io.to(`user:${f.followerId}`).emit('notification:new', {
                            type,
                            title,
                            body,
                            imageUrl: opts.imageUrl,
                            linkUrl: opts.linkUrl,
                            createdAt: new Date().toISOString(),
                        });
                    }
                }

                cursor = follows[follows.length - 1].id;
                hasMore = follows.length === BATCH_SIZE;
            }
        } catch (error) {
            console.error('notifyFollowersAsync error:', error);
        }
    });
};
