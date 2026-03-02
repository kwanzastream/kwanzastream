import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import redis from '../config/redis';

const router = Router();
const startTime = Date.now();

router.get('/', async (_req: Request, res: Response) => {
    const checks: Record<string, any> = {
        status: 'ok',
        uptime: Math.floor((Date.now() - startTime) / 1000),
        timestamp: new Date().toISOString(),
    };

    // Memory
    const mem = process.memoryUsage();
    checks.memory = {
        heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
        rssMB: Math.round(mem.rss / 1024 / 1024),
    };

    // Database latency
    try {
        const dbStart = performance.now();
        await prisma.$queryRaw`SELECT 1`;
        checks.database = {
            status: 'connected',
            latencyMs: Math.round((performance.now() - dbStart) * 100) / 100,
        };
    } catch (err: any) {
        checks.database = { status: 'error', error: err.message };
        checks.status = 'degraded';
    }

    // Redis latency
    try {
        if (redis.isOpen) {
            const redisStart = performance.now();
            await redis.ping();
            checks.redis = {
                status: 'connected',
                latencyMs: Math.round((performance.now() - redisStart) * 100) / 100,
            };
        } else {
            checks.redis = { status: 'not_connected' };
        }
    } catch (err: any) {
        checks.redis = { status: 'error', error: err.message };
        checks.status = 'degraded';
    }

    const httpStatus = checks.status === 'ok' ? 200 : 503;
    res.status(httpStatus).json(checks);
});

export default router;
