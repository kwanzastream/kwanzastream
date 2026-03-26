import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const IS_DEV = process.env.NODE_ENV !== 'production';

// Stop reconnecting after 3 failed attempts in dev (Redis is optional)
const reconnectStrategy = (retries: number) => {
    if (IS_DEV && retries > 3) return false as any; // Stop trying
    return Math.min(retries * 500, 5000);
};

// Default Redis client — used for general operations (OTP, bans, cache)
export const redis = createClient({
    url: redisUrl,
    socket: { reconnectStrategy },
});

// Socket.io Redis Adapter clients — pub/sub pair for multi-pod chat scalability
export const pubClient = createClient({
    url: redisUrl,
    socket: { reconnectStrategy },
});
export const subClient = pubClient.duplicate();

let redisErrorLogged = false;
redis.on('error', (err) => {
    if (!redisErrorLogged) {
        console.warn('⚠️  Redis error (optional, platform works without it):', err.message);
        redisErrorLogged = true;
    }
});
redis.on('connect', () => {
    redisErrorLogged = false;
    console.log('✅ Redis connected');
});

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
