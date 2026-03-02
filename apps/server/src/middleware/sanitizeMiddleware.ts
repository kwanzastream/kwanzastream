import { Request, Response, NextFunction } from 'express';

/**
 * Sanitize middleware — strips HTML tags from all string values in request body.
 * Prevents XSS injection attacks via API inputs.
 */
const stripHtml = (value: string): string => {
    return value
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/<[^>]*>/g, '') // Second pass after entity decode
        .trim();
};

const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
        return stripHtml(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
    }
    if (obj && typeof obj === 'object') {
        const sanitized: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            sanitized[key] = sanitizeObject(value);
        }
        return sanitized;
    }
    return obj;
};

export const sanitizeMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }
    if (req.query && typeof req.query === 'object') {
        for (const [key, value] of Object.entries(req.query)) {
            if (typeof value === 'string') {
                (req.query as any)[key] = stripHtml(value);
            }
        }
    }
    next();
};
