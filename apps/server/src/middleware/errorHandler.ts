// FIX: Error handler global melhorado — TestSprite #B1
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/node';

export class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Custom AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Zod Validation Errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Erro de validação.',
            details: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }))
        });
    }

    // Prisma Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') { // Unique constraint violation
            return res.status(409).json({
                success: false,
                message: 'Registo duplicado ou já existente.',
            });
        }
        if (err.code === 'P2025') { // Record not found
            return res.status(404).json({
                success: false,
                message: 'Registo não encontrado.',
            });
        }
    }

    // JWT Errors are typically handled closely in authMiddleware, but as a fallback
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Token inválido.' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expirado.' });
    }

    // FIX: Logar para Sentry com contexto: userId, endpoint, stack trace — TestSprite #B1
    const userId = (req as any).user?.userId;
    console.error(`[Global Error] ${req.method} ${req.url} (userId: ${userId || 'anonymous'}):`, err);

    // Send to Sentry with rich context
    if (process.env.SENTRY_DSN) {
        Sentry.withScope((scope) => {
            scope.setTag('endpoint', `${req.method} ${req.url}`);
            scope.setTag('statusCode', '500');
            if (userId) {
                scope.setUser({ id: userId });
            }
            scope.setContext('request', {
                method: req.method,
                url: req.url,
                params: req.params,
                query: req.query,
                ip: req.ip,
                userAgent: req.get('user-agent'),
            });
            Sentry.captureException(err);
        });
    }

    // FIX: NUNCA expor stack trace ao cliente — TestSprite #B1
    // Devolve apenas mensagem segura PT-AO em todos os ambientes
    res.status(500).json({
        success: false,
        message: 'Ocorreu um erro interno. Tenta novamente.',
    });
};
