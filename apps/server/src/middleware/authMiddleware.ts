import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../services/jwtService';

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Read token from httpOnly cookie first, then Authorization header (for API clients/mobile)
    let token: string | undefined;

    // FIX: Nomes de cookies standardizados — TestSprite cloud (com fallback para nomes antigos)
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    } else if (req.cookies?.access_token) {
        token = req.cookies.access_token;
    } else {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido.' });
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
        return res.status(401).json({ success: false, message: 'Token inválido ou expirado.' });
    }

    req.user = payload;
    next();
};

export const optionalAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // FIX: Nomes de cookies standardizados — TestSprite cloud (com fallback para nomes antigos)
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    } else if (req.cookies?.access_token) {
        token = req.cookies.access_token;
    } else {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (token) {
        const payload = verifyAccessToken(token);
        if (payload) {
            req.user = payload;
        }
    }

    next();
};

export const requireRole = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Permissões insuficientes.' });
        }

        next();
    };
};
