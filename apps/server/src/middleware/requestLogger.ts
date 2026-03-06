/**
 * Request Logger Middleware — Observability (Mindset 5 CTO)
 * 
 * Logs: method, path, status, duration, IP.
 * Skips health checks to avoid noise.
 * Format: structured for easy grep/analysis.
 */

import { Request, Response, NextFunction } from 'express';

const SKIP_PATHS = ['/api/health', '/health', '/'];

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Skip health checks and static files
    if (SKIP_PATHS.some(p => req.path === p) || req.path.startsWith('/uploads')) {
        return next();
    }

    const start = Date.now();

    // Override end to capture after response
    const originalEnd = res.end;
    res.end = function (this: Response, ...args: Parameters<Response['end']>) {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const ip = req.ip || req.socket.remoteAddress || '?';

        // Color-code by status for dev readability
        const statusIcon = status >= 500 ? '🔴' : status >= 400 ? '🟡' : '🟢';

        console.log(
            `${statusIcon} ${req.method} ${req.path} → ${status} (${duration}ms) [${ip}]`
        );

        // Log slow requests (> 2s) as warnings
        if (duration > 2000) {
            console.warn(`⚠️  SLOW REQUEST: ${req.method} ${req.path} took ${duration}ms`);
        }

        return originalEnd.apply(this, args);
    } as any;

    next();
};
