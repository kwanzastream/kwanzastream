import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load env vars
dotenv.config();

// Import configs
import prisma from './config/prisma';
import { connectRedis } from './config/redis';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import donationRoutes from './routes/donationRoutes';
import walletRoutes from './routes/walletRoutes';
import streamRoutes from './routes/streamRoutes';
import adminRoutes from './admin/adminRoutes';
import webhookRoutes from './payments/webhookRoutes';

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'Kwanza Stream API is running 🚀',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'healthy', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
    }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhooks', webhookRoutes);

// Import streaming services
import { startMediaServer } from './streaming/mediaServer';
import { setupChatService } from './streaming/chatService';

// Setup chat service (replaces basic socket handlers)
setupChatService(io);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to Redis (optional, continues if fails)
        try {
            await connectRedis();
        } catch (err) {
            console.warn('Redis connection failed, continuing without Redis');
        }

        // Verify database connection
        await prisma.$connect();
        console.log('Database connected');

        // Start RTMP media server (optional, may fail if ffmpeg not installed)
        try {
            startMediaServer();
        } catch (err) {
            console.warn('RTMP server failed to start (FFmpeg may not be installed)');
        }

        httpServer.listen(PORT, () => {
            console.log(`
🚀 Kwanza Stream API Server
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Health: http://localhost:${PORT}/health
🔐 Auth: http://localhost:${PORT}/api/auth
👥 Users: http://localhost:${PORT}/api/users
💰 Wallet: http://localhost:${PORT}/api/wallet
🎬 Streams: http://localhost:${PORT}/api/streams
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export { io };
