import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Default Redis client — used for general operations (OTP, bans, cache)
export const redis = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: false, // Don't auto-reconnect — Redis is optional for dev
    },
});

// Socket.io Redis Adapter clients — pub/sub pair for multi-pod chat scalability
export const pubClient = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: false,
    },
});
export const subClient = pubClient.duplicate();

redis.on('error', (err) => {
    // Only log once, not spam
    if (!redis.isOpen) return;
    console.warn('⚠️  Redis error (optional, platform works without it):', err.message);
});
redis.on('connect', () => console.log('✅ Redis connected'));

pubClient.on('error', () => { }); // Silence pub/sub errors (handled by adapter)
subClient.on('error', () => { });

export const connectRedis = async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect();
        }
        // Connect pub/sub clients for Socket.io adapter
        if (!pubClient.isOpen) await pubClient.connect();
        if (!subClient.isOpen) await subClient.connect();
        console.log('✅ Redis pub/sub clients connected (Socket.io adapter ready)');
    } catch (err) {
        console.warn('⚠️  Redis not available — continuing without caching (this is fine for dev)');
    }
};

export default redis;

