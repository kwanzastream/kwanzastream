// ============================================================
// webhook-hmac.test.ts — Unit Tests for HMAC Webhook Verification
// Tests: valid signatures, invalid signatures, idempotency
// ============================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';

// FIX: Usar vi.hoisted para garantir que mockPrisma existe quando vi.mock executa — TestSprite #B2
const { mockPrisma } = vi.hoisted(() => {
    return {
        mockPrisma: {
            webhookEventLog: {
                findUnique: vi.fn(),
                create: vi.fn(),
                update: vi.fn(),
                updateMany: vi.fn(),
            },
        },
    };
});

vi.mock('../src/config/prisma', () => ({ default: mockPrisma }));

// Set test env
process.env.MULTICAIXA_WEBHOOK_SECRET = 'test-secret-key-12345';

import { hmacVerify, logWebhookEvent, markWebhookProcessed } from '../src/middleware/hmacVerify';

describe('HMAC Webhook Verification', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    const testSecret = 'test-secret-key-12345';

    beforeEach(() => {
        vi.clearAllMocks();
        mockReq = {
            headers: {},
            body: {},
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        mockNext = vi.fn();
    });

    it('rejects requests without signature header', async () => {
        const middleware = hmacVerify('multicaixa');
        mockReq.body = { transactionId: 'tx-1', amount: 1000 };

        mockPrisma.webhookEventLog.create.mockResolvedValue({ id: 'log-1' });

        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ error: 'Missing webhook signature' })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('rejects requests with invalid signature', async () => {
        const middleware = hmacVerify('multicaixa');
        mockReq.body = { transactionId: 'tx-1', amount: 1000 };
        mockReq.headers['x-multicaixa-signature'] = 'a'.repeat(64); // wrong signature (valid hex length)

        mockPrisma.webhookEventLog.create.mockResolvedValue({ id: 'log-1' });

        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('accepts requests with valid HMAC-SHA256 signature', async () => {
        const middleware = hmacVerify('multicaixa');
        const body = { transactionId: 'tx-1', amount: 1000 };
        mockReq.body = body;

        // Compute valid signature
        const rawBody = JSON.stringify(body);
        const validSig = crypto.createHmac('sha256', testSecret).update(rawBody, 'utf8').digest('hex');
        mockReq.headers['x-multicaixa-signature'] = validSig;

        // No existing webhook
        mockPrisma.webhookEventLog.findUnique.mockResolvedValue(null);

        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('rejects duplicate webhooks (idempotency)', async () => {
        const middleware = hmacVerify('multicaixa');
        const body = { transactionId: 'tx-1', amount: 1000, id: 'evt-123' };
        mockReq.body = body;

        // Valid signature
        const rawBody = JSON.stringify(body);
        const validSig = crypto.createHmac('sha256', testSecret).update(rawBody, 'utf8').digest('hex');
        mockReq.headers['x-multicaixa-signature'] = validSig;

        // Already processed webhook
        mockPrisma.webhookEventLog.findUnique.mockResolvedValue({
            id: 'log-1',
            processed: true,
            idempotencyKey: 'multicaixa:evt-123',
        });

        await middleware(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ status: 'already_processed' })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });
});

describe('logWebhookEvent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates a webhook event log entry', async () => {
        mockPrisma.webhookEventLog.create.mockResolvedValue({ id: 'log-1' });

        const id = await logWebhookEvent(
            'multicaixa',
            'payment.completed',
            { amount: 1000 },
            'sig-abc',
            true,
            undefined,
            200
        );

        expect(id).toBe('log-1');
        expect(mockPrisma.webhookEventLog.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                provider: 'multicaixa',
                eventType: 'payment.completed',
                processed: true,
                httpStatus: 200,
            }),
        });
    });
});

describe('markWebhookProcessed', () => {
    it('updates webhook log as processed', async () => {
        mockPrisma.webhookEventLog.updateMany.mockResolvedValue({ count: 1 });

        await markWebhookProcessed('multicaixa:evt-123');

        expect(mockPrisma.webhookEventLog.updateMany).toHaveBeenCalledWith({
            where: { idempotencyKey: 'multicaixa:evt-123' },
            data: { processed: true, processingError: null, httpStatus: 200 },
        });
    });

    it('does nothing for empty idempotency key', async () => {
        await markWebhookProcessed('');
        expect(mockPrisma.webhookEventLog.updateMany).not.toHaveBeenCalled();
    });
});
