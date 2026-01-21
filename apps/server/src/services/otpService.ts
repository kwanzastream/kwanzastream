import prisma from '../config/prisma';
import redis from '../config/redis';

const OTP_EXPIRES_MINUTES = parseInt(process.env.OTP_EXPIRES_IN_MINUTES || '5');
const OTP_MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '3');

export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createOtp = async (phone: string, userId?: string): Promise<string> => {
    // Invalidate any existing OTPs for this phone
    await prisma.otpCode.updateMany({
        where: { phone, used: false },
        data: { used: true },
    });

    const code = generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRES_MINUTES);

    await prisma.otpCode.create({
        data: {
            code,
            phone,
            userId,
            expiresAt,
        },
    });

    // Store in Redis for faster lookup (optional but recommended)
    try {
        if (redis.isOpen) {
            await redis.setEx(`otp:${phone}`, OTP_EXPIRES_MINUTES * 60, code);
        }
    } catch (err) {
        console.warn('Redis not available, using DB only for OTP');
    }

    return code;
};

export const verifyOtp = async (phone: string, code: string): Promise<{ valid: boolean; userId?: string; error?: string }> => {
    const otpRecord = await prisma.otpCode.findFirst({
        where: {
            phone,
            code,
            used: false,
        },
        orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
        return { valid: false, error: 'Invalid OTP code' };
    }

    if (otpRecord.expiresAt < new Date()) {
        return { valid: false, error: 'OTP code has expired' };
    }

    if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
        return { valid: false, error: 'Maximum attempts exceeded' };
    }

    // Mark as used
    await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { used: true },
    });

    // Clear from Redis
    try {
        if (redis.isOpen) {
            await redis.del(`otp:${phone}`);
        }
    } catch {
        // Ignore Redis errors
    }

    return { valid: true, userId: otpRecord.userId || undefined };
};

export const incrementOtpAttempts = async (phone: string): Promise<void> => {
    const otpRecord = await prisma.otpCode.findFirst({
        where: { phone, used: false },
        orderBy: { createdAt: 'desc' },
    });

    if (otpRecord) {
        await prisma.otpCode.update({
            where: { id: otpRecord.id },
            data: { attempts: otpRecord.attempts + 1 },
        });
    }
};
