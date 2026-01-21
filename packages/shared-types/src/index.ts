// Shared types between web and server
// Add your shared interfaces here

export interface User {
    id: string;
    email: string;
    username: string;
    displayName?: string;
    avatarUrl?: string;
    isStreamer: boolean;
    createdAt: Date;
}

export interface Stream {
    id: string;
    title: string;
    description?: string;
    streamerId: string;
    streamerName: string;
    thumbnailUrl?: string;
    viewerCount: number;
    isLive: boolean;
    category?: string;
    startedAt?: Date;
}

export interface Donation {
    id: string;
    amount: number;
    message?: string;
    senderId: string;
    receiverId: string;
    streamId?: string;
    createdAt: Date;
}
