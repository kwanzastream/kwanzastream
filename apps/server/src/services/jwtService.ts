import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES as jwt.SignOptions['expiresIn']
    });
};

export const generateRefreshToken = async (userId: string): Promise<string> => {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
        data: {
            token,
            userId,
            expiresAt,
        },
    });

    return token;
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    } catch {
        return null;
    }
};

export const verifyRefreshToken = async (token: string): Promise<string | null> => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
    });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
        return null;
    }

    return storedToken.userId;
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
    await prisma.refreshToken.update({
        where: { token },
        data: { revoked: true },
    });
};

export const revokeAllUserTokens = async (userId: string): Promise<void> => {
    await prisma.refreshToken.updateMany({
        where: { userId },
        data: { revoked: true },
    });
};

export const generateTokenPair = async (userId: string, role: string) => {
    const accessToken = generateAccessToken({ userId, role });
    const refreshToken = await generateRefreshToken(userId);

    return { accessToken, refreshToken };
};
