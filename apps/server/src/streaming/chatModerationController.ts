// ============================================================
// chatModerationController.ts — Server-Side Chat Moderation
// P0: Timeout, ban, slow mode for stream chat
// ============================================================

import { Server, Socket } from 'socket.io';
import prisma from '../config/prisma';

interface ModerationState {
    slowMode: {
        enabled: boolean;
        intervalSeconds: number;
    };
    bannedUsers: Set<string>;
    timedOutUsers: Map<string, number>; // userId -> expiry timestamp
}

// Per-stream moderation state (in-memory, backed by DB for bans)
const streamStates = new Map<string, ModerationState>();

function getStreamState(streamId: string): ModerationState {
    if (!streamStates.has(streamId)) {
        streamStates.set(streamId, {
            slowMode: { enabled: false, intervalSeconds: 0 },
            bannedUsers: new Set(),
            timedOutUsers: new Map(),
        });
    }
    return streamStates.get(streamId)!;
}

/**
 * Register chat moderation Socket.io event handlers.
 * Called during Socket.io setup in index.ts.
 */
export function registerModerationHandlers(io: Server, socket: Socket): void {
    // ============== Slow Mode ==============
    socket.on('chat:slow_mode', async (data: { streamId: string; enabled: boolean; intervalSeconds: number }) => {
        const { streamId, enabled, intervalSeconds } = data;

        // Verify user is streamer or moderator
        const userId = (socket as any).userId;
        if (!userId) return;

        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: { streamerId: true },
        });

        if (!stream || stream.streamerId !== userId) {
            socket.emit('error', { code: 'UNAUTHORIZED', message: 'Apenas o streamer pode moderar' });
            return;
        }

        const state = getStreamState(streamId);
        state.slowMode = { enabled, intervalSeconds };

        // Broadcast to all viewers
        io.to(`stream:${streamId}`).emit('chat:slow_mode', {
            streamId,
            enabled,
            intervalSeconds,
        });

        console.log(`[Mod] Slow mode ${enabled ? `ON (${intervalSeconds}s)` : 'OFF'} for stream ${streamId}`);
    });

    // ============== Timeout User ==============
    socket.on('chat:timeout_user', async (data: {
        streamId: string;
        userId: string;
        durationSeconds: number;
        reason?: string;
    }) => {
        const { streamId, userId: targetUserId, durationSeconds, reason } = data;
        const moderatorId = (socket as any).userId;
        if (!moderatorId) return;

        // Verify moderator permission
        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: { streamerId: true },
        });

        if (!stream || stream.streamerId !== moderatorId) {
            socket.emit('error', { code: 'UNAUTHORIZED', message: 'Sem permissão para moderar' });
            return;
        }

        const state = getStreamState(streamId);
        const expiresAt = Date.now() + durationSeconds * 1000;
        state.timedOutUsers.set(targetUserId, expiresAt);

        // Notify the stream
        io.to(`stream:${streamId}`).emit('chat:user_timeout', {
            streamId,
            userId: targetUserId,
            durationSeconds,
            reason: reason || 'Timeout pelo streamer',
        });

        // Auto-remove timeout
        setTimeout(() => {
            state.timedOutUsers.delete(targetUserId);
        }, durationSeconds * 1000);

        // Audit log
        await prisma.auditLog.create({
            data: {
                adminId: moderatorId,
                action: 'CHAT_TIMEOUT',
                targetId: targetUserId,
                targetType: 'User',
                details: { streamId, durationSeconds, reason },
            },
        }).catch(console.error);

        console.log(`[Mod] Timeout: ${targetUserId} for ${durationSeconds}s in ${streamId}`);
    });

    // ============== Ban User ==============
    socket.on('chat:ban_user', async (data: {
        streamId: string;
        userId: string;
        permanent: boolean;
        reason?: string;
    }) => {
        const { streamId, userId: targetUserId, permanent, reason } = data;
        const moderatorId = (socket as any).userId;
        if (!moderatorId) return;

        // Verify moderator permission
        const stream = await prisma.stream.findUnique({
            where: { id: streamId },
            select: { streamerId: true },
        });

        if (!stream || stream.streamerId !== moderatorId) {
            socket.emit('error', { code: 'UNAUTHORIZED', message: 'Sem permissão para moderar' });
            return;
        }

        const state = getStreamState(streamId);
        state.bannedUsers.add(targetUserId);

        // Notify the stream
        io.to(`stream:${streamId}`).emit('chat:user_banned', {
            streamId,
            userId: targetUserId,
            reason: reason || 'Banido pelo streamer',
            permanent,
        });

        // Audit log
        await prisma.auditLog.create({
            data: {
                adminId: moderatorId,
                action: 'CHAT_BAN',
                targetId: targetUserId,
                targetType: 'User',
                details: { streamId, permanent, reason },
            },
        }).catch(console.error);

        console.log(`[Mod] Ban: ${targetUserId} in ${streamId} (permanent: ${permanent})`);
    });
}

/**
 * Check if a user can send a message in a stream.
 * Returns null if allowed, or an error message if blocked.
 */
export function canSendMessage(streamId: string, userId: string): string | null {
    const state = streamStates.get(streamId);
    if (!state) return null;

    // Check ban
    if (state.bannedUsers.has(userId)) {
        return 'Estás banido deste chat';
    }

    // Check timeout
    const timeoutExpiry = state.timedOutUsers.get(userId);
    if (timeoutExpiry && timeoutExpiry > Date.now()) {
        const remaining = Math.ceil((timeoutExpiry - Date.now()) / 1000);
        return `Timeout activo (${remaining}s restantes)`;
    }

    // Clean expired timeout
    if (timeoutExpiry) {
        state.timedOutUsers.delete(userId);
    }

    return null;
}

/**
 * Get slow mode config for a stream.
 */
export function getSlowModeConfig(streamId: string): { enabled: boolean; intervalSeconds: number } {
    const state = streamStates.get(streamId);
    return state?.slowMode || { enabled: false, intervalSeconds: 0 };
}

/**
 * Cleanup stream state when stream ends.
 */
export function cleanupStreamState(streamId: string): void {
    streamStates.delete(streamId);
}
