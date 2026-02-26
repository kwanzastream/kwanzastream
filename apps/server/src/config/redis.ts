import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: false, // Don't auto-reconnect — Redis is optional for dev
    },
});

redis.on('error', (err) => {
    // Only log once, not spam
    if (!redis.isOpen) return;
    console.warn('⚠️  Redis error (optional, platform works without it):', err.message);
});
redis.on('connect', () => console.log('✅ Redis connected'));

export const connectRedis = async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect();
        }
    } catch (err) {
        console.warn('⚠️  Redis not available — continuing without caching (this is fine for dev)');
    }
};

export default redis;

