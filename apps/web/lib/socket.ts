import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            autoConnect: false,
            // Use cookies for auth — httpOnly cookies are sent automatically
            withCredentials: true,
            transports: ['websocket', 'polling'],
            // Africa-first: robust reconnection for unstable mobile networks
            reconnection: true,
            reconnectionAttempts: 15,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            randomizationFactor: 0.5,
            timeout: 20000,
        });

        // Log reconnection events in development
        if (process.env.NODE_ENV === 'development') {
            socket.on('reconnect_attempt', (attempt) => {
                console.log(`[Socket] Reconnecting... attempt ${attempt}`);
            });
            socket.on('reconnect', () => {
                console.log('[Socket] Reconnected successfully');
            });
            socket.on('reconnect_failed', () => {
                console.warn('[Socket] Reconnection failed after max attempts');
            });
        }
    }
    return socket;
};

export const connectSocket = (): Socket => {
    const s = getSocket();
    if (!s.connected) {
        s.connect();
    }
    return s;
};

export const disconnectSocket = () => {
    if (socket?.connected) {
        socket.disconnect();
    }
};

export default getSocket;
