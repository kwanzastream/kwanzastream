// ============================================================
// Socket.io Event Schemas — Kwanza Stream Realtime Contract
// Central source of truth for all Socket.io events, room names,
// and payload schemas used across server and client.
// ============================================================

// ============== Room Naming Convention ==============

/** Room for a specific stream's chat, reactions, donations */
export const streamRoom = (streamId: string) => `stream:${streamId}`;

/** Room for a specific user's notifications */
export const userRoom = (userId: string) => `user:${userId}`;

/** Global room for platform-wide events (stream start/end) */
export const GLOBAL_ROOM = 'global';

// ============== Event Names ==============

export const EVENTS = {
    // Chat
    CHAT_MESSAGE: 'chat:message',
    CHAT_REACTION: 'chat:reaction',
    CHAT_TYPING: 'chat:typing',
    CHAT_SLOW_MODE: 'chat:slow_mode',
    CHAT_USER_BANNED: 'chat:user_banned',
    CHAT_USER_TIMEOUT: 'chat:user_timeout',

    // Donations
    DONATION_ALERT: 'donation:alert',
    DONATION_LEADERBOARD_UPDATE: 'donation:leaderboard_update',

    // Viewers
    VIEWER_COUNT: 'viewer:count',
    VIEWER_JOIN: 'viewer:join',
    VIEWER_LEAVE: 'viewer:leave',

    // Notifications
    NOTIFICATION_NEW: 'notification:new',
    NOTIFICATION_COUNT: 'notification:count',

    // Streams
    STREAM_START: 'stream:start',
    STREAM_END: 'stream:end',
    STREAM_UPDATE: 'stream:update',

    // System
    ERROR: 'error',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
} as const;

// ============== Payload Types ==============

export interface ChatMessagePayload {
    id: string;
    streamId: string;
    userId: string;
    username: string;
    displayName?: string;
    avatarUrl?: string;
    message: string;
    type: 'chat' | 'donation' | 'system';
    timestamp: string; // ISO 8601
    badges?: string[]; // e.g. ['streamer', 'moderator', 'subscriber']
}

export interface ChatReactionPayload {
    streamId: string;
    userId: string;
    emoji: string; // '🔥', '❤️', '😂', '👏', '💯'
    timestamp: string;
}

export interface ChatTypingPayload {
    streamId: string;
    userId: string;
    username: string;
}

export interface DonationAlertPayload {
    id: string;
    streamId: string;
    sender: {
        id: string;
        username: string;
        displayName?: string;
        avatarUrl?: string;
    };
    receiver: {
        id: string;
        username: string;
    };
    saloType: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
    amountKz: number;
    message?: string;
    timestamp: string;
}

export interface ViewerCountPayload {
    streamId: string;
    count: number;
    peakCount: number;
}

export interface NotificationPayload {
    id: string;
    type: 'LIVE_STARTED' | 'DONATION_RECEIVED' | 'NEW_FOLLOWER' | 'SYSTEM';
    title: string;
    body: string;
    imageUrl?: string;
    linkUrl?: string;
    timestamp: string;
}

export interface NotificationCountPayload {
    unreadCount: number;
}

export interface StreamStartPayload {
    streamId: string;
    streamerId: string;
    streamerUsername: string;
    streamerDisplayName?: string;
    title: string;
    category?: string;
    thumbnailUrl?: string;
}

export interface StreamEndPayload {
    streamId: string;
    streamerId: string;
    duration: number; // seconds
    peakViewers: number;
    totalDonationsKz: number;
}

export interface SlowModePayload {
    streamId: string;
    enabled: boolean;
    intervalSeconds: number; // e.g. 5 = 1 message per 5 seconds
}

export interface UserBannedPayload {
    streamId: string;
    userId: string;
    reason?: string;
    permanent: boolean;
}

export interface UserTimeoutPayload {
    streamId: string;
    userId: string;
    durationSeconds: number;
    reason?: string;
}

// ============== Rate Limits ==============

export const RATE_LIMITS = {
    /** Chat messages: max per minute per user */
    CHAT_MESSAGES_PER_MINUTE: 20,

    /** Reactions: max per second per user */
    REACTIONS_PER_SECOND: 2,

    /** Typing indicators: max per 3 seconds per user */
    TYPING_PER_3_SECONDS: 1,

    /** Donation alerts: no client-side limit (server enforces via wallet balance) */
    DONATIONS: Infinity,
} as const;

// ============== Validation Helpers ==============

export function isValidEmoji(emoji: string): boolean {
    const ALLOWED_EMOJIS = ['🔥', '❤️', '😂', '👏', '💯', '😮', '🎉', '💎', '👑', '🇦🇴'];
    return ALLOWED_EMOJIS.includes(emoji);
}

export function isValidChatMessage(message: string): boolean {
    return message.length > 0 && message.length <= 500;
}

export function sanitizeChatMessage(message: string): string {
    return message
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim()
        .substring(0, 500);
}
