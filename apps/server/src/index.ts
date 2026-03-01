import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

// Load env vars FIRST
dotenv.config();

// ============== ENV VALIDATION (fail-fast) ==============
const REQUIRED_ENVS = [
    'DATABASE_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
];

const RECOMMENDED_ENVS = [
    'FRONTEND_URL',
    'RTMP_SECRET',
];

for (const envName of REQUIRED_ENVS) {
    if (!process.env[envName]) {
        console.error(`\n❌ FATAL: Missing required environment variable: ${envName}`);
        console.error(`   Please set it in your .env file or environment.\n`);
        process.exit(1);
    }
}

for (const envName of RECOMMENDED_ENVS) {
    if (!process.env[envName]) {
        console.warn(`⚠️  WARNING: Missing recommended env var: ${envName} (using fallback)`);
    }
}

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

// ============== SECURITY MIDDLEWARE ==============
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"], // Required for inline styles in UI components
            imgSrc: ["'self'", "data:", "blob:", "https:"],
            connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3000'],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            mediaSrc: ["'self'", "blob:"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        },
    },
    crossOriginEmbedderPolicy: false, // Required for cross-origin media loading
}));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// ============== RATE LIMITING ==============
// Strict limit for auth endpoints (OTP brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // 10 requests per window
    message: { error: 'Too many authentication attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Moderate limit for financial endpoints (wallet, donations)
const financialLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30,                  // 30 requests per minute
    message: { error: 'Too many financial requests. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API limit
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,                  // 200 requests per window
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply general limiter to all API routes
app.use('/api/', generalLimiter);

// ============== HEALTH CHECKS ==============
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

// ============== API ROUTES (with rate limiters) ==============
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', financialLimiter, donationRoutes);
app.use('/api/wallet', financialLimiter, walletRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhooks', webhookRoutes); // Webhooks have their own HMAC auth

// Import streaming services
import { startMediaServer } from './streaming/mediaServer';
import { setupChatService } from './streaming/chatService';

// Setup chat service
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
        console.log('✅ Database connected');

        // Start RTMP media server (optional, may fail if ffmpeg not installed)
        try {
            startMediaServer();
        } catch (err) {
            console.warn('⚠️  RTMP server failed to start (FFmpeg may not be installed)');
        }

        httpServer.listen(PORT, () => {
            console.log(`
🚀 Kwanza Stream API Server
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Health: http://localhost:${PORT}/health
🔐 Auth: http://localhost:${PORT}/api/auth (rate limited: 10/15min)
💰 Wallet: http://localhost:${PORT}/api/wallet (rate limited: 30/min)
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
