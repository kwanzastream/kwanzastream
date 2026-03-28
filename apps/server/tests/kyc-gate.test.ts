// ============================================================
// kyc-gate.test.ts — Unit Tests for KYC/AML Tier Enforcement
// Tests: tier limits, operation blocking, daily counter reset
// ============================================================
import { describe, it, expect, vi, beforeEach } from 'vitest';

// FIX: Usar vi.hoisted para garantir que mockPrisma existe quando vi.mock executa — TestSprite #B2
const { mockPrisma } = vi.hoisted(() => {
    return {
        mockPrisma: {
            user: {
                findUnique: vi.fn(),
                update: vi.fn(),
            },
        },
    };
});

vi.mock('../src/config/prisma', () => ({ default: mockPrisma }));

import { kycGate, updateDailyTransacted, getTierLimits } from '../src/middleware/kycGate';

describe('KYC Gate Middleware', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockReq = {
            user: { userId: 'user-1' },
            body: {},
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        mockNext = vi.fn();
    });

    it('blocks withdrawal for Tier 0 users', async () => {
        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 0,
            dailyTransacted: 0n,
            lastTransactedDate: null,
        });

        const middleware = kycGate('withdraw');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'KYC_REQUIRED', requiredTier: 1 })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('allows deposit for Tier 0 within limits', async () => {
        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 0,
            dailyTransacted: 0n,
            lastTransactedDate: null,
        });

        mockReq.body = { amount: 1000 }; // 1000 Kz = 100000 centimos, within 2000 Kz single tx limit

        const middleware = kycGate('deposit');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('blocks single transaction exceeding tier limit', async () => {
        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 0,
            dailyTransacted: 0n,
            lastTransactedDate: null,
        });

        mockReq.body = { amount: 3000 }; // 3000 Kz > 2000 Kz Tier 0 single tx limit

        const middleware = kycGate('deposit');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'TX_LIMIT_EXCEEDED' })
        );
    });

    it('blocks when daily limit exceeded', async () => {
        const today = new Date();
        today.setHours(12, 0, 0, 0); // same day

        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 0,
            dailyTransacted: 400_000n, // 4000 Kz already transacted today
            lastTransactedDate: today,
        });

        mockReq.body = { amount: 1500 }; // 1500 Kz → total would be 5500 Kz > 5000 Kz limit

        const middleware = kycGate('deposit');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'DAILY_LIMIT_EXCEEDED' })
        );
    });

    it('resets daily counter on new day', async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 0,
            dailyTransacted: 400_000n, // had 4000 Kz yesterday
            lastTransactedDate: yesterday,
        });

        mockReq.body = { amount: 1000 }; // 1000 Kz — should be ok since counter resets

        const middleware = kycGate('deposit');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('Tier 1 allows withdrawal', async () => {
        mockPrisma.user.findUnique.mockResolvedValue({
            kycTier: 1,
            dailyTransacted: 0n,
            lastTransactedDate: null,
        });

        mockReq.body = { amount: 5000 }; // 5000 Kz — within Tier 1 single tx limit (20000 Kz)

        const middleware = kycGate('withdraw');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('rejects unauthenticated requests', async () => {
        mockReq.user = null;

        const middleware = kycGate('deposit');
        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
    });
});

describe('updateDailyTransacted', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('updates daily transacted amount', async () => {
        mockPrisma.user.findUnique.mockResolvedValue({
            dailyTransacted: 100_000n,
            lastTransactedDate: new Date(),
        });
        mockPrisma.user.update.mockResolvedValue({});

        await updateDailyTransacted('user-1', 50_000n);

        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { id: 'user-1' },
            data: expect.objectContaining({
                dailyTransacted: 150_000n,
            }),
        });
    });
});

describe('getTierLimits', () => {
    it('returns all tier configs with Kz values', () => {
        const limits = getTierLimits();
        expect(limits[0].dailyLimitKz).toBe(5000);
        expect(limits[0].canWithdraw).toBe(false);
        expect(limits[1].dailyLimitKz).toBe(50000);
        expect(limits[1].canWithdraw).toBe(true);
        expect(limits[2].dailyLimitKz).toBe(500000);
    });
});
