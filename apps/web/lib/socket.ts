import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './api';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            autoConnect: false,
            auth: {
                token: getAccessToken(),
            },
            transports: ['websocket', 'polling'],
        });
    }
    return socket;
};

export const connectSocket = (): Socket => {
    const s = getSocket();
    // Update auth token before connecting
    s.auth = { token: getAccessToken() };
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
