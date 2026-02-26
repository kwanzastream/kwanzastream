'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import type { Socket } from 'socket.io-client';

export interface ChatMessage {
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
    amount?: number;
    saloType?: string;
}

interface UseChatOptions {
    streamId: string;
    enabled?: boolean;
}

export function useChat({ streamId, enabled = true }: UseChatOptions) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [viewerCount, setViewerCount] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!enabled || !streamId) return;

        const socket = connectSocket();
        socketRef.current = socket;

        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('join-stream', { streamId });
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('chat-message', (msg: ChatMessage) => {
            setMessages(prev => [...prev.slice(-200), msg]);
        });

        socket.on('donation', (msg: ChatMessage) => {
            setMessages(prev => [...prev.slice(-200), { ...msg, type: 'donation' }]);
        });

        socket.on('system-message', (msg: ChatMessage) => {
            setMessages(prev => [...prev.slice(-200), { ...msg, type: 'system' }]);
        });

        socket.on('viewer-count', (data: { count: number }) => {
            setViewerCount(data.count);
        });

        socket.on('stream-ended', () => {
            setMessages(prev => [
                ...prev,
                {
                    id: `system-${Date.now()}`,
                    streamId,
                    userId: 'system',
                    username: 'Sistema',
                    message: 'A transmissão terminou.',
                    type: 'system',
                    timestamp: new Date(),
                },
            ]);
        });

        return () => {
            socket.emit('leave-stream', { streamId });
            socket.off('chat-message');
            socket.off('donation');
            socket.off('system-message');
            socket.off('viewer-count');
            socket.off('stream-ended');
            disconnectSocket();
            socketRef.current = null;
        };
    }, [streamId, enabled]);

    const sendMessage = useCallback(
        (message: string) => {
            if (!socketRef.current?.connected || !message.trim()) return;
            socketRef.current.emit('chat-message', {
                streamId,
                message: message.trim(),
            });
        },
        [streamId]
    );

    return {
        messages,
        viewerCount,
        isConnected,
        sendMessage,
    };
}
