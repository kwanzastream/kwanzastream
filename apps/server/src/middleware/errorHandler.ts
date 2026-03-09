import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

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
            error: err.message,
            statusCode: err.statusCode
        });
    }

    // Zod Validation Errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Erro de Validação',
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
                error: 'Registo duplicado ou já existente',
                target: (err.meta?.target as string[])?.join(', ') || 'unknown'
            });
        }
        if (err.code === 'P2025') { // Record not found
            return res.status(404).json({
                error: 'Registo não encontrado'
            });
        }
    }

    // JWT Errors are typically handled closely in authMiddleware, but as a fallback
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Token inválido' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado' });
    }

    // Default 500
    console.error(`[Global Error] ${req.method} ${req.url}:`, err);

    const isProduction = process.env.NODE_ENV === 'production';
    res.status(500).json({
        error: isProduction ? 'Ocorreu um erro interno no servidor.' : err.message,
        stack: isProduction ? undefined : err.stack
    });
};
