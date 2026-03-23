// ============== SENTRY (must be first) ==============
import * as Sentry from '@sentry/node';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
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
import { connectRedis, pubClient, subClient } from './config/redis';
import { createAdapter } from '@socket.io/redis-adapter';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import donationRoutes from './routes/donationRoutes';
import walletRoutes from './routes/walletRoutes';
import streamRoutes from './routes/streamRoutes';
import adminRoutes_old from './admin/adminRoutes';
import webhookRoutes from './payments/webhookRoutes';

const app = express();
const httpServer = createServer(app);

// ============== SENTRY INIT ==============
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
        release: `kwanza-stream@${process.env.npm_package_version || '1.0.0'}`,
    });
    console.log('✅ Sentry initialized');
} else {
    console.warn('⚠️  SENTRY_DSN not set — error tracking disabled');
}

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
app.use(compression()); // gzip/brotli — Africa-first: saves mobile data
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// XSS protection — strip HTML from all inputs
import { sanitizeMiddleware } from './middleware/sanitizeMiddleware';
app.use(sanitizeMiddleware);

// Request logging — observability
import { requestLogger } from './middleware/requestLogger';
app.use(requestLogger);

// ============== RATE LIMITING ==============
// Auth endpoints: strict limit to prevent OTP/login brute-force
// Skips /me and /refresh since those are session-check endpoints called on every page load
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // 10 attempts per 15 min
    message: { error: 'Muitas tentativas. Aguarda 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, ip: false },
    skip: (req) => {
        // Don't rate-limit session checks and token refreshes
        const path = req.path;
        return path === '/me' || path === '/refresh' || path === '/google' || path === '/google/callback';
    },
    keyGenerator: (req) => {
        // Combine IP + userId (if present) for shared networks
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        const userId = (req.body as any)?.phone || (req.body as any)?.identifier || '';
        return `${ip}:${userId}`;
    },
});

// Moderate limit for financial endpoints (wallet, donations)
const financialLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30,                  // 30 requests per minute
    message: { error: 'Too many financial requests. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Reports: anti-spam
const reportLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: { error: 'Muitos relatórios. Aguarda 1 minuto.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Search: anti-scraping
const searchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: { error: 'Muitas pesquisas. Aguarda um momento.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stream creation
const streamCreateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: { error: 'Too many stream requests.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API limit — 100 req/min per IP
const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: { error: 'Demasiados pedidos. Tenta novamente em breve.' },
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

// Detailed health endpoint
import healthRoutes from './routes/healthRoutes';
app.use('/api/health', healthRoutes);

// ============== API ROUTES ==============
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', financialLimiter, donationRoutes);
app.use('/api/wallet', financialLimiter, walletRoutes);
app.use('/api/streams', streamCreateLimiter, streamRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhooks', webhookRoutes); // Webhooks have their own HMAC auth

// Phase 1: Upload routes + static file serving
import uploadRoutes from './routes/uploadRoutes';
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

// Phase 2: Notification + Favorite routes
import notificationRoutes from './routes/notificationRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
app.use('/api/notifications', notificationRoutes);
app.use('/api/favorites', favoriteRoutes);

// Phase 5: Report routes
import reportRoutes from './routes/reportRoutes';
app.use('/api/reports', reportLimiter, reportRoutes);

// Phase 7: Search routes
import searchRoutes from './routes/searchRoutes';
app.use('/api/search', searchLimiter, searchRoutes);

// P1: Creator Studio + Clips
import creatorRoutes from './routes/creatorRoutes';
import clipsRoutes from './routes/clipsRoutes';
app.use('/api/creator', creatorRoutes);
app.use('/api/clips', clipsRoutes);

// P2: Events
import eventsRoutes from './routes/eventsRoutes';
app.use('/api/events', eventsRoutes);

// P2: Web Push Notifications
import pushRoutes from './routes/pushRoutes';
app.use('/api/push', pushRoutes);

// P4: Direct Messages
import messageRoutes from './routes/messageRoutes';
app.use('/api/messages', messageRoutes);

// Sprint 3: Subscriptions & VODs
import subscriptionRoutes from './routes/subscriptionRoutes';
import vodRoutes from './routes/vodRoutes';
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/vods', vodRoutes);

// Sprint 4: Watch History & Recommendations
import watchHistoryRoutes from './routes/watchHistoryRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
app.use('/api/watch-history', watchHistoryRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Sprint 5: Analytics
import analyticsRoutes from './routes/analyticsRoutes';
app.use('/api/analytics', analyticsRoutes);

// Grupo 38: Kwanza Camp
import campRoutes from './routes/campRoutes';
app.use('/api/camp', campRoutes);

// Grupo 39: Ads & Marcas
import adsRoutes from './routes/adsRoutes';
app.use('/api/ads', adsRoutes);

// Grupo 40: Developers
import developerRoutes from './routes/developerRoutes';
app.use('/api/developer', developerRoutes);

// Grupo 41: Angola-First
import angolaRoutes from './routes/angolaRoutes';
app.use('/api', angolaRoutes);

// Grupo 42: Admin Panel
import adminRoutes from './routes/adminRoutes';
app.use('/api/admin', adminRoutes);

// Grupo 43: Legais & Suporte
import supportRoutes from './routes/supportRoutes';
app.use('/api/support', supportRoutes);

// Grupo 45: Histórico
import historyRoutes from './routes/historyRoutes';
app.use('/api/history', historyRoutes);

// Grupo 46: Guardados & Favoritos
import savedRoutes from './routes/savedRoutes';
app.use('/api', savedRoutes);

// Grupo 47: Watch Party
import watchPartyRoutes from './routes/watchPartyRoutes';
app.use('/api/watch-parties', watchPartyRoutes);

// Grupo 48: Referral
import referralRoutes from './routes/referralRoutes';
app.use('/api/referral', referralRoutes);

// Sentry test endpoint (dev/staging only)
if (process.env.NODE_ENV !== 'production') {
    app.get('/api/debug-sentry', (_req, _res) => {
        throw new Error('Sentry test error — if you see this in Sentry, it works! 🎉');
    });
}

// Import streaming services
import { startMediaServer } from './streaming/mediaServer';
import { setupChatService } from './streaming/chatService';
import { registerModerationHandlers } from './streaming/chatModerationController';

// Setup chat service
setupChatService(io);

// P0: Register chat moderation handlers for each new connection
io.on('connection', (socket) => {
    registerModerationHandlers(io, socket);
});

// Sentry error handler — must be before custom error handler
if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
}

// Error handling middleware
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler as express.ErrorRequestHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to Redis (optional, continues if fails)
        try {
            await connectRedis();
            // Enable Socket.io Redis adapter for multi-pod chat scalability
            if (pubClient.isOpen && subClient.isOpen) {
                io.adapter(createAdapter(pubClient, subClient));
                console.log('✅ Socket.io Redis adapter enabled (multi-pod chat ready)');
            }
        } catch (err) {
            console.warn('Redis connection failed, continuing without Redis (in-memory adapter)');
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

// ============== GRACEFUL SHUTDOWN ==============
const shutdown = async (signal: string) => {
    console.log(`\n${signal} received — shutting down gracefully...`);
    httpServer.close(() => console.log('✅ HTTP server closed'));
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    if (process.env.SENTRY_DSN) Sentry.captureException(reason);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (process.env.SENTRY_DSN) Sentry.captureException(error);
    process.exit(1);
});

export { io };
