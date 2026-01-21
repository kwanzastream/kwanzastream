import { Server, Socket } from 'socket.io';
import prisma from '../config/prisma';
import redis from '../config/redis';
import { verifyAccessToken, TokenPayload } from '../services/jwtService';

interface ChatMessage {
    id: string;
    streamId: string;
    userId: string;
    username: string;
    displayName?: string;
    avatarUrl?: string;
    message: string;
    type: 'chat' | 'donation' | 'system';
    timestamp: Date;
    badges?: string[];
}

interface ChatUser {
    id: string;
    username?: string;
    displayName?: string;
    avatarUrl?: string;
    role: string;
}

// Rate limiting: messages per minute per user
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 1000; // 1 minute

const userMessageCounts = new Map<string, { count: number; resetAt: number }>();

// Banned/timed out users per stream
const streamBans = new Map<string, Map<string, number>>(); // streamId -> (userId -> expiresAt)

export const setupChatService = (io: Server) => {
    // Authentication middleware
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;

        if (token) {
            const payload = verifyAccessToken(token);
            if (payload) {
                const user = await prisma.user.findUnique({
                    where: { id: payload.userId },
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        role: true,
                    },
                });
                if (user) {
                    (socket as any).user = user;
                }
            }
        }

        next();
    });

    io.on('connection', (socket: Socket) => {
        const user = (socket as any).user as ChatUser | undefined;

        console.log(`[Chat] ${user?.displayName || 'Anonymous'} connected (${socket.id})`);

        // Join stream room
        socket.on('join-stream', async (streamId: string) => {
            socket.join(`stream:${streamId}`);
            socket.join(`chat:${streamId}`);

            // Increment viewer count
            await prisma.stream.update({
                where: { id: streamId },
                data: { viewerCount: { increment: 1 } },
            }).catch(() => { });

            // Get current viewer count
            const stream = await prisma.stream.findUnique({
                where: { id: streamId },
                select: { viewerCount: true },
            });

            io.to(`stream:${streamId}`).emit('viewer-count', {
                streamId,
                count: stream?.viewerCount || 0
            });

            console.log(`[Chat] ${user?.displayName || 'Anonymous'} joined stream ${streamId}`);
        });

        // Leave stream room
        socket.on('leave-stream', async (streamId: string) => {
            socket.leave(`stream:${streamId}`);
            socket.leave(`chat:${streamId}`);

            // Decrement viewer count
            await prisma.stream.update({
                where: { id: streamId },
                data: { viewerCount: { decrement: 1 } },
            }).catch(() => { });

            const stream = await prisma.stream.findUnique({
                where: { id: streamId },
                select: { viewerCount: true },
            });

            io.to(`stream:${streamId}`).emit('viewer-count', {
                streamId,
                count: Math.max(0, stream?.viewerCount || 0)
            });
        });

        // Chat message
        socket.on('chat-message', async (data: { streamId: string; message: string }) => {
            if (!user) {
                socket.emit('error', { message: 'Authentication required to chat' });
                return;
            }

            const { streamId, message } = data;

            // Check if user is banned
            const banExpiry = streamBans.get(streamId)?.get(user.id);
            if (banExpiry && banExpiry > Date.now()) {
                const remaining = Math.ceil((banExpiry - Date.now()) / 1000);
                socket.emit('error', { message: `You are timed out for ${remaining} seconds` });
                return;
            }

            // Rate limiting
            const now = Date.now();
            const userLimit = userMessageCounts.get(user.id);

            if (userLimit) {
                if (now < userLimit.resetAt) {
                    if (userLimit.count >= RATE_LIMIT) {
                        socket.emit('error', { message: 'Slow down! Too many messages.' });
                        return;
                    }
                    userLimit.count++;
                } else {
                    userLimit.count = 1;
                    userLimit.resetAt = now + RATE_WINDOW;
                }
            } else {
                userMessageCounts.set(user.id, { count: 1, resetAt: now + RATE_WINDOW });
            }

            // Validate message
            if (!message || message.trim().length === 0 || message.length > 500) {
                socket.emit('error', { message: 'Invalid message' });
                return;
            }

            const chatMessage: ChatMessage = {
                id: `${Date.now()}-${user.id}`,
                streamId,
                userId: user.id,
                username: user.username || 'user',
                displayName: user.displayName,
                avatarUrl: user.avatarUrl,
                message: message.trim(),
                type: 'chat',
                timestamp: new Date(),
                badges: user.role === 'STREAMER' ? ['streamer'] : user.role === 'ADMIN' ? ['admin'] : [],
            };

            // Broadcast to stream chat
            io.to(`chat:${streamId}`).emit('chat-message', chatMessage);

            // Store in Redis for recent messages (optional)
            try {
                if (redis.isOpen) {
                    await redis.lPush(`chat:${streamId}:messages`, JSON.stringify(chatMessage));
                    await redis.lTrim(`chat:${streamId}:messages`, 0, 99); // Keep last 100 messages
                    await redis.expire(`chat:${streamId}:messages`, 3600); // 1 hour TTL
                }
            } catch {
                // Redis not available, continue without storage
            }
        });

        // Donation message (special chat message)
        socket.on('donation', (data: { streamId: string; saloType: string; amount: number; message?: string }) => {
            if (!user) return;

            const donationMessage: ChatMessage = {
                id: `donation-${Date.now()}-${user.id}`,
                streamId: data.streamId,
                userId: user.id,
                username: user.username || 'user',
                displayName: user.displayName,
                avatarUrl: user.avatarUrl,
                message: data.message || '',
                type: 'donation',
                timestamp: new Date(),
                badges: [],
            };

            io.to(`chat:${data.streamId}`).emit('donation', {
                ...donationMessage,
                saloType: data.saloType,
                amount: data.amount,
            });
        });

        // Moderation: Timeout user
        socket.on('mod-timeout', async (data: { streamId: string; targetUserId: string; duration: number }) => {
            if (!user || (user.role !== 'STREAMER' && user.role !== 'ADMIN')) {
                socket.emit('error', { message: 'Not authorized' });
                return;
            }

            const { streamId, targetUserId, duration } = data;

            // Check if user is the streamer of this stream
            const stream = await prisma.stream.findUnique({
                where: { id: streamId },
            });

            if (!stream || (stream.streamerId !== user.id && user.role !== 'ADMIN')) {
                socket.emit('error', { message: 'Not authorized for this stream' });
                return;
            }

            // Add timeout
            if (!streamBans.has(streamId)) {
                streamBans.set(streamId, new Map());
            }
            streamBans.get(streamId)!.set(targetUserId, Date.now() + duration * 1000);

            io.to(`chat:${streamId}`).emit('user-timeout', {
                userId: targetUserId,
                duration,
                moderator: user.displayName || user.username,
            });
        });

        // Moderation: Ban user from stream
        socket.on('mod-ban', async (data: { streamId: string; targetUserId: string }) => {
            if (!user || (user.role !== 'STREAMER' && user.role !== 'ADMIN')) {
                socket.emit('error', { message: 'Not authorized' });
                return;
            }

            const { streamId, targetUserId } = data;

            // Permanent ban (24 hours)
            if (!streamBans.has(streamId)) {
                streamBans.set(streamId, new Map());
            }
            streamBans.get(streamId)!.set(targetUserId, Date.now() + 24 * 60 * 60 * 1000);

            io.to(`chat:${streamId}`).emit('user-banned', {
                userId: targetUserId,
                moderator: user.displayName || user.username,
            });
        });

        // Get recent chat messages
        socket.on('get-recent-messages', async (streamId: string) => {
            try {
                if (redis.isOpen) {
                    const messages = await redis.lRange(`chat:${streamId}:messages`, 0, 49);
                    socket.emit('recent-messages', messages.map((m) => JSON.parse(m)).reverse());
                } else {
                    socket.emit('recent-messages', []);
                }
            } catch {
                socket.emit('recent-messages', []);
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`[Chat] ${user?.displayName || 'Anonymous'} disconnected`);
        });
    });

    console.log('[Chat] Chat service initialized');
};
