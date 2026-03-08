import { Server, Socket } from 'socket.io';
import prisma from '../config/prisma';
import redis from '../config/redis';
import { verifyAccessToken, TokenPayload } from '../services/jwtService';
import { setNotificationIO } from '../services/notificationService';
import { filterMessage } from './chatFilter';

// Allowed reaction emojis
const ALLOWED_REACTIONS = ['❤️', '🔥', '😂', '💯', '👏'];

// Reaction rate limit: 2 per second per user (server-side authoritative)
const REACTION_WINDOW_MS = 1000;
const REACTION_MAX_PER_WINDOW = 2;
const reactionCounts = new Map<string, { count: number; resetAt: number }>();

// Sprint 3: Raid state (in-memory, ephemeral)
interface RaidState {
    fromStreamId: string;
    toStreamId: string;
    initiatorId: string;
    initiatorName: string;
    viewerCount: number;
    timestamp: number;
}
const activeRaids = new Map<string, RaidState>(); // key = fromStreamId
const raidCooldowns = new Map<string, number>(); // key = userId, value = timestamp

// Sprint 3: Poll state (in-memory, ephemeral)
interface PollState {
    id: string;
    streamId: string;
    question: string;
    options: string[];
    votes: Map<string, number>; // userId -> optionIndex
    creatorId: string;
    endsAt: number;
    timer?: ReturnType<typeof setTimeout>;
}
const activePolls = new Map<string, PollState>(); // key = streamId (1 poll per stream)

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

// Banned/timed out users per stream — Redis-backed with in-memory fallback
const streamBansMemory = new Map<string, Map<string, number>>(); // fallback if Redis is down

// Redis key: stream:bans:{streamId} — hash field: userId — value: expiresAt timestamp
const setBan = async (streamId: string, userId: string, expiresAt: number): Promise<void> => {
    // Always set in memory (fast path + fallback)
    if (!streamBansMemory.has(streamId)) {
        streamBansMemory.set(streamId, new Map());
    }
    streamBansMemory.get(streamId)!.set(userId, expiresAt);

    // Persist to Redis (survives restart)
    try {
        if (redis.isOpen) {
            const ttlSeconds = Math.ceil((expiresAt - Date.now()) / 1000);
            if (ttlSeconds > 0) {
                const key = `stream:bans:${streamId}`;
                await redis.hSet(key, userId, expiresAt.toString());
                // Set TTL on the hash to auto-cleanup after the longest ban
                const currentTTL = await redis.ttl(key);
                if (currentTTL < ttlSeconds) {
                    await redis.expire(key, ttlSeconds + 60); // +60s buffer
                }
            }
        }
    } catch {
        // Redis unavailable — in-memory ban still active
    }
};

const isUserBanned = async (streamId: string, userId: string): Promise<{ banned: boolean; remaining: number }> => {
    const now = Date.now();

    // Try Redis first (authoritative, survives restart)
    try {
        if (redis.isOpen) {
            const expiry = await redis.hGet(`stream:bans:${streamId}`, userId);
            if (expiry) {
                const expiresAt = parseInt(expiry, 10);
                if (expiresAt > now) {
                    return { banned: true, remaining: Math.ceil((expiresAt - now) / 1000) };
                }
                // Expired — clean up
                await redis.hDel(`stream:bans:${streamId}`, userId);
            }
            return { banned: false, remaining: 0 };
        }
    } catch {
        // Redis unavailable, fall through to memory
    }

    // Fallback: in-memory
    const banExpiry = streamBansMemory.get(streamId)?.get(userId);
    if (banExpiry && banExpiry > now) {
        return { banned: true, remaining: Math.ceil((banExpiry - now) / 1000) };
    }
    return { banned: false, remaining: 0 };
};

export const setupChatService = (io: Server) => {
    // Register IO for notification push
    setNotificationIO(io);

    // Periodic viewer count broadcast (every 10s, in-memory only)
    setInterval(() => {
        const rooms = io.sockets.adapter.rooms;
        rooms.forEach((sockets, roomName) => {
            if (roomName.startsWith('stream:')) {
                const streamId = roomName.replace('stream:', '');
                io.to(roomName).emit('viewer:count', {
                    streamId,
                    count: sockets.size,
                });
            }
        });
    }, 10_000);

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
        const isReadOnly = !user; // Visitors can watch chat but not participate

        console.log(`[Chat] ${user?.displayName || 'Visitante'} connected (${socket.id})${isReadOnly ? ' [READ-ONLY]' : ''}`);

        // Join personal notification room (for real-time notification push)
        if (user) {
            socket.join(`user:${user.id}`);
        }

        // Join stream room — viewer count is in-memory (socket room size)
        socket.on('join-stream', async (streamId: string) => {
            socket.join(`stream:${streamId}`);
            socket.join(`chat:${streamId}`);

            // Emit current viewer count from room size (no DB write)
            const room = io.sockets.adapter.rooms.get(`stream:${streamId}`);
            const count = room?.size || 1;

            io.to(`stream:${streamId}`).emit('viewer:count', {
                streamId,
                count,
            });

            console.log(`[Chat] ${user?.displayName || 'Anonymous'} joined stream ${streamId} (viewers: ${count})`);
        });

        // Leave stream room — in-memory viewer count
        socket.on('leave-stream', async (streamId: string) => {
            socket.leave(`stream:${streamId}`);
            socket.leave(`chat:${streamId}`);

            // Emit updated count from room size (no DB write)
            const room = io.sockets.adapter.rooms.get(`stream:${streamId}`);
            const count = room?.size || 0;

            io.to(`stream:${streamId}`).emit('viewer:count', {
                streamId,
                count,
            });
        });

        // ============== Reactions ==============
        socket.on('reaction', async (data: { streamId: string; emoji: string }) => {
            if (isReadOnly) {
                socket.emit('error', { message: 'Faça login para reagir no chat', code: 'AUTH_REQUIRED' });
                return;
            }
            if (!user) return;

            const { streamId, emoji } = data;

            // Validate emoji
            if (!ALLOWED_REACTIONS.includes(emoji)) {
                socket.emit('error', { message: 'Invalid reaction' });
                return;
            }

            // Server-side rate limit: 2/second per user per stream
            const rateKey = `${user.id}:${streamId}`;
            const now = Date.now();
            const entry = reactionCounts.get(rateKey);

            if (entry) {
                if (now < entry.resetAt) {
                    if (entry.count >= REACTION_MAX_PER_WINDOW) {
                        return; // silently drop, don't spam error
                    }
                    entry.count++;
                } else {
                    entry.count = 1;
                    entry.resetAt = now + REACTION_WINDOW_MS;
                }
            } else {
                reactionCounts.set(rateKey, { count: 1, resetAt: now + REACTION_WINDOW_MS });
            }

            // Also check Redis-backed IP rate limit if Redis available
            try {
                if (redis.isOpen) {
                    const ipKey = `reaction:ip:${socket.handshake.address}:${streamId}`;
                    const ipCount = await redis.incr(ipKey);
                    if (ipCount === 1) await redis.expire(ipKey, 1); // 1s window
                    if (ipCount > 5) return; // 5/s per IP hard limit
                }
            } catch {
                // Redis not available, rely on in-memory limit
            }

            // Broadcast reaction to all viewers in stream
            io.to(`stream:${streamId}`).emit('reaction:broadcast', {
                userId: user.id,
                username: user.username || user.displayName || 'user',
                emoji,
            });
        });

        // Chat message
        socket.on('chat-message', async (data: { streamId: string; message: string }) => {
            if (isReadOnly) {
                socket.emit('error', { message: 'Faça login para participar no chat', code: 'AUTH_REQUIRED' });
                return;
            }
            if (!user) return;

            const { streamId, message } = data;

            // Check if user is banned (Redis-backed, survives restart)
            const banStatus = await isUserBanned(streamId, user.id);
            if (banStatus.banned) {
                socket.emit('error', { message: `You are timed out for ${banStatus.remaining} seconds` });
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

            // Content moderation filter — load per-channel AutoMod config
            let customBannedWords: string[] | undefined;
            let autoModEnabled = true;
            try {
                // Get the stream's streamer to check their AutoMod settings
                const stream = await prisma.stream.findUnique({
                    where: { id: streamId },
                    include: { streamer: { select: { autoModEnabled: true, customBannedWords: true } } },
                });
                if (stream?.streamer) {
                    autoModEnabled = stream.streamer.autoModEnabled;
                    customBannedWords = stream.streamer.customBannedWords;
                }
            } catch {
                // If DB lookup fails, use global filter only
            }

            if (autoModEnabled) {
                const filterResult = filterMessage(message, customBannedWords);
                if (!filterResult.allowed) {
                    socket.emit('error', { message: filterResult.reason || 'Mensagem bloqueada' });
                    return;
                }
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
                badges: await buildBadges(user, streamId),
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

        // Donation message (special chat message) + Sprint 3: donation:alert
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

            // Broadcast chat message
            io.to(`chat:${data.streamId}`).emit('donation', {
                ...donationMessage,
                saloType: data.saloType,
                amount: data.amount,
            });

            // Sprint 3: Dedicated alert overlay event (for OBS/stream overlay)
            io.to(`stream:${data.streamId}`).emit('donation:alert', {
                saloType: data.saloType,
                amount: data.amount,
                senderName: user.displayName || user.username || 'Anônimo',
                senderAvatar: user.avatarUrl,
                message: data.message || '',
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

            // Add timeout (Redis-backed)
            await setBan(streamId, targetUserId, Date.now() + duration * 1000);

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

            // Permanent ban (24 hours, Redis-backed)
            await setBan(streamId, targetUserId, Date.now() + 24 * 60 * 60 * 1000);

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

        // ============== Sprint 3: Raid / Host ==============
        socket.on('raid:initiate', async (data: { fromStreamId: string; toStreamId: string }) => {
            if (!user || (user.role !== 'STREAMER' && user.role !== 'ADMIN')) {
                socket.emit('error', { message: 'Apenas streamers podem iniciar raids' });
                return;
            }

            const { fromStreamId, toStreamId } = data;
            if (fromStreamId === toStreamId) {
                socket.emit('error', { message: 'Não podes fazer raid a ti próprio' });
                return;
            }

            // Cooldown: 10 min
            const lastRaid = raidCooldowns.get(user.id);
            if (lastRaid && Date.now() - lastRaid < 600_000) {
                const remaining = Math.ceil((600_000 - (Date.now() - lastRaid)) / 1000);
                socket.emit('error', { message: `Espera ${remaining}s para fazer outro raid` });
                return;
            }

            // Get viewer count of source stream
            const room = io.sockets.adapter.rooms.get(`stream:${fromStreamId}`);
            const viewerCount = room?.size || 0;

            const raidState: RaidState = {
                fromStreamId,
                toStreamId,
                initiatorId: user.id,
                initiatorName: user.displayName || user.username || 'Streamer',
                viewerCount,
                timestamp: Date.now(),
            };

            activeRaids.set(fromStreamId, raidState);
            raidCooldowns.set(user.id, Date.now());

            // Notify source stream viewers
            io.to(`stream:${fromStreamId}`).emit('raid:outgoing', {
                toStreamId,
                viewerCount,
                initiatorName: raidState.initiatorName,
            });

            // Notify target stream
            io.to(`stream:${toStreamId}`).emit('raid:incoming', {
                fromStreamId,
                viewerCount,
                raidedBy: raidState.initiatorName,
            });

            console.log(`[Raid] ${raidState.initiatorName} raided stream ${toStreamId} with ${viewerCount} viewers`);
        });

        socket.on('raid:cancel', (data: { fromStreamId: string }) => {
            if (!user) return;
            const raid = activeRaids.get(data.fromStreamId);
            if (raid && raid.initiatorId === user.id) {
                activeRaids.delete(data.fromStreamId);
                io.to(`stream:${data.fromStreamId}`).emit('raid:cancelled');
            }
        });

        // ============== Sprint 3: Chat Polls ==============
        socket.on('poll:create', (data: { streamId: string; question: string; options: string[]; durationSeconds: number }) => {
            if (!user || (user.role !== 'STREAMER' && user.role !== 'ADMIN')) {
                socket.emit('error', { message: 'Apenas streamers podem criar polls' });
                return;
            }

            const { streamId, question, options, durationSeconds } = data;

            if (!question || question.length > 200) {
                socket.emit('error', { message: 'Pergunta inválida (max 200 chars)' });
                return;
            }
            if (!options || options.length < 2 || options.length > 4) {
                socket.emit('error', { message: 'Polls devem ter 2 a 4 opções' });
                return;
            }
            const duration = Math.min(Math.max(durationSeconds || 60, 15), 300); // 15s–5min

            if (activePolls.has(streamId)) {
                socket.emit('error', { message: 'Já existe um poll activo nesta stream' });
                return;
            }

            const pollId = `poll-${Date.now()}-${streamId}`;
            const endsAt = Date.now() + duration * 1000;

            const poll: PollState = {
                id: pollId,
                streamId,
                question,
                options,
                votes: new Map(),
                creatorId: user.id,
                endsAt,
            };

            // Auto-end timer
            poll.timer = setTimeout(() => {
                endPoll(io, streamId);
            }, duration * 1000);

            activePolls.set(streamId, poll);

            io.to(`stream:${streamId}`).emit('poll:started', {
                id: pollId,
                question,
                options,
                endsAt,
                results: options.map(() => 0),
                totalVotes: 0,
            });

            console.log(`[Poll] Created in stream ${streamId}: "${question}"`);
        });

        socket.on('poll:vote', (data: { streamId: string; optionIndex: number }) => {
            if (!user) {
                socket.emit('error', { message: 'Faça login para votar' });
                return;
            }

            const poll = activePolls.get(data.streamId);
            if (!poll) {
                socket.emit('error', { message: 'Nenhum poll activo' });
                return;
            }

            if (data.optionIndex < 0 || data.optionIndex >= poll.options.length) {
                socket.emit('error', { message: 'Opção inválida' });
                return;
            }

            // Record vote (overwrites previous vote from same user)
            poll.votes.set(user.id, data.optionIndex);

            // Broadcast updated results
            broadcastPollResults(io, poll);
        });

        socket.on('poll:end', (data: { streamId: string }) => {
            if (!user || (user.role !== 'STREAMER' && user.role !== 'ADMIN')) return;
            endPoll(io, data.streamId);
        });

        // Disconnect — snapshot viewer counts for rooms this socket was in
        socket.on('disconnect', () => {
            console.log(`[Chat] ${user?.displayName || 'Visitante'} disconnected`);

            // Broadcast updated viewer count for any stream rooms
            // (socket has already left, so room size is already decremented)
        });
    });

    // Clean up stale reaction rate limit entries every 30s
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of reactionCounts) {
            if (now > entry.resetAt + 5000) {
                reactionCounts.delete(key);
            }
        }
    }, 30_000);

    console.log('[Chat] Chat service initialized (reactions, raids, polls, donation alerts)');
};

// ============== Sprint 3: Helper Functions ==============

/**
 * Build badge list for a chat user (role + subscription)
 */
async function buildBadges(user: ChatUser, streamId: string): Promise<string[]> {
    const badges: string[] = [];

    // Role badges
    if (user.role === 'ADMIN') badges.push('admin');
    if (user.role === 'STREAMER') badges.push('streamer');

    // Subscription badge — check if user has active sub to this stream's creator
    try {
        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: { streamerId: true },
        });

        if (stream && stream.streamerId !== user.id) {
            const sub = await prisma.subscription.findUnique({
                where: {
                    subscriberId_creatorId: {
                        subscriberId: user.id,
                        creatorId: stream.streamerId,
                    },
                },
                select: { active: true, tier: true, expiresAt: true },
            });

            if (sub?.active && (!sub.expiresAt || sub.expiresAt > new Date())) {
                badges.push('subscriber');
                if (sub.tier === 'VIP') badges.push('vip');
            }
        }
    } catch {
        // DB lookup failed, skip sub badge
    }

    return badges;
}

/**
 * Broadcast current poll results to all stream viewers
 */
function broadcastPollResults(io: Server, poll: PollState): void {
    const results = poll.options.map((_, i) => {
        let count = 0;
        for (const optIdx of poll.votes.values()) {
            if (optIdx === i) count++;
        }
        return count;
    });

    io.to(`stream:${poll.streamId}`).emit('poll:update', {
        id: poll.id,
        question: poll.question,
        options: poll.options,
        results,
        totalVotes: poll.votes.size,
        endsAt: poll.endsAt,
    });
}

/**
 * End a poll — broadcast final results and clean up
 */
function endPoll(io: Server, streamId: string): void {
    const poll = activePolls.get(streamId);
    if (!poll) return;

    // Clear auto-end timer
    if (poll.timer) clearTimeout(poll.timer);

    // Calculate final results
    const results = poll.options.map((_, i) => {
        let count = 0;
        for (const optIdx of poll.votes.values()) {
            if (optIdx === i) count++;
        }
        return count;
    });

    // Broadcast final results
    io.to(`stream:${streamId}`).emit('poll:ended', {
        id: poll.id,
        question: poll.question,
        options: poll.options,
        results,
        totalVotes: poll.votes.size,
        winner: results.indexOf(Math.max(...results)),
    });

    // Clean up
    activePolls.delete(streamId);
    console.log(`[Poll] Ended in stream ${streamId}: "${poll.question}" (${poll.votes.size} votes)`);
}
