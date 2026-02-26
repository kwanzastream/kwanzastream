/**
 * Webhook HMAC & Idempotency Tests
 *
 * Tests the security of the webhook verification:
 * 1. HMAC-SHA256 signature generation and verification
 * 2. Timing-safe comparison
 * 3. Rejection of invalid/missing signatures
 * 4. Idempotency logic (no double-crediting)
 */

import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

const TEST_WEBHOOK_SECRET = 'test-webhook-secret-for-unit-tests';

// ============== HMAC Signature Verification ==============

describe('Webhook HMAC-SHA256 Signature', () => {
    /** Replicate the verifySignature logic from webhookRoutes.ts */
    const createSignature = (payload: string, secret: string): string => {
        return crypto.createHmac('sha256', secret).update(payload).digest('hex');
    };

    const verifySignature = (payload: string, signature: string, secret: string): boolean => {
        if (!secret || !signature) return false;

        const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

        try {
            return crypto.timingSafeEqual(
                Buffer.from(signature, 'utf8'),
                Buffer.from(expected, 'utf8')
            );
        } catch {
            return false;
        }
    };

    it('generates deterministic signatures', () => {
        const payload = '{"reference":"DEP-ABC","status":"COMPLETED"}';
        const sig1 = createSignature(payload, TEST_WEBHOOK_SECRET);
        const sig2 = createSignature(payload, TEST_WEBHOOK_SECRET);
        expect(sig1).toBe(sig2);
    });

    it('generates different signatures for different payloads', () => {
        const sig1 = createSignature('{"a":1}', TEST_WEBHOOK_SECRET);
        const sig2 = createSignature('{"a":2}', TEST_WEBHOOK_SECRET);
        expect(sig1).not.toBe(sig2);
    });

    it('generates different signatures for different secrets', () => {
        const payload = '{"reference":"DEP-ABC"}';
        const sig1 = createSignature(payload, 'secret-1');
        const sig2 = createSignature(payload, 'secret-2');
        expect(sig1).not.toBe(sig2);
    });

    it('verifies a valid signature', () => {
        const payload = '{"reference":"DEP-ABC","status":"COMPLETED","amount":1000}';
        const signature = createSignature(payload, TEST_WEBHOOK_SECRET);
        expect(verifySignature(payload, signature, TEST_WEBHOOK_SECRET)).toBe(true);
    });

    it('rejects an incorrect signature', () => {
        const payload = '{"reference":"DEP-ABC"}';
        expect(verifySignature(payload, 'invalid-signature', TEST_WEBHOOK_SECRET)).toBe(false);
    });

    it('rejects an empty signature', () => {
        const payload = '{"reference":"DEP-ABC"}';
        expect(verifySignature(payload, '', TEST_WEBHOOK_SECRET)).toBe(false);
    });

    it('rejects when secret is empty', () => {
        const payload = '{"reference":"DEP-ABC"}';
        const signature = createSignature(payload, TEST_WEBHOOK_SECRET);
        expect(verifySignature(payload, signature, '')).toBe(false);
    });

    it('rejects when payload is tampered', () => {
        const originalPayload = '{"reference":"DEP-ABC","amount":1000}';
        const signature = createSignature(originalPayload, TEST_WEBHOOK_SECRET);

        // Attacker modifies the amount
        const tamperedPayload = '{"reference":"DEP-ABC","amount":999999}';
        expect(verifySignature(tamperedPayload, signature, TEST_WEBHOOK_SECRET)).toBe(false);
    });

    it('rejects signatures of different lengths (timing-safe)', () => {
        const payload = '{"test":true}';
        // Short signature should not crash, just return false
        expect(verifySignature(payload, 'abc', TEST_WEBHOOK_SECRET)).toBe(false);
    });

    it('signature is hex encoded (64 chars for SHA-256)', () => {
        const sig = createSignature('test', TEST_WEBHOOK_SECRET);
        expect(sig).toMatch(/^[0-9a-f]{64}$/);
    });
});

// ============== Idempotency Logic ==============

describe('Webhook Idempotency', () => {
    /** Simulates the processWebhook idempotency check */
    type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    interface MockTransaction {
        id: string;
        reference: string;
        status: TransactionStatus;
        amount: bigint;
        userId: string;
    }

    const shouldProcessWebhook = (transaction: MockTransaction | null, webhookStatus: string): {
        shouldProcess: boolean;
        reason: string;
    } => {
        if (!transaction) {
            return { shouldProcess: false, reason: 'Transaction not found' };
        }

        // Already processed — idempotent skip
        if (transaction.status === 'COMPLETED') {
            return { shouldProcess: false, reason: 'Already completed (idempotent)' };
        }

        if (transaction.status === 'FAILED' || transaction.status === 'CANCELLED') {
            return { shouldProcess: false, reason: 'Already in terminal state' };
        }

        if (webhookStatus === 'COMPLETED' || webhookStatus === 'PAID') {
            return { shouldProcess: true, reason: 'Ready to complete' };
        }

        if (webhookStatus === 'FAILED' || webhookStatus === 'CANCELLED') {
            return { shouldProcess: true, reason: 'Ready to mark as failed' };
        }

        return { shouldProcess: false, reason: 'Unknown webhook status' };
    };

    const pendingTx: MockTransaction = {
        id: 'tx-1',
        reference: 'DEP-ABC',
        status: 'PENDING',
        amount: 100000n,
        userId: 'user-1',
    };

    it('processes a PENDING transaction with COMPLETED webhook', () => {
        const result = shouldProcessWebhook(pendingTx, 'COMPLETED');
        expect(result.shouldProcess).toBe(true);
    });

    it('processes a PENDING transaction with PAID webhook', () => {
        const result = shouldProcessWebhook(pendingTx, 'PAID');
        expect(result.shouldProcess).toBe(true);
    });

    it('skips an already COMPLETED transaction (idempotent)', () => {
        const completedTx = { ...pendingTx, status: 'COMPLETED' as const };
        const result = shouldProcessWebhook(completedTx, 'COMPLETED');
        expect(result.shouldProcess).toBe(false);
        expect(result.reason).toContain('idempotent');
    });

    it('skips a FAILED transaction', () => {
        const failedTx = { ...pendingTx, status: 'FAILED' as const };
        const result = shouldProcessWebhook(failedTx, 'COMPLETED');
        expect(result.shouldProcess).toBe(false);
        expect(result.reason).toContain('terminal');
    });

    it('skips a CANCELLED transaction', () => {
        const cancelledTx = { ...pendingTx, status: 'CANCELLED' as const };
        const result = shouldProcessWebhook(cancelledTx, 'COMPLETED');
        expect(result.shouldProcess).toBe(false);
    });

    it('rejects when transaction not found', () => {
        const result = shouldProcessWebhook(null, 'COMPLETED');
        expect(result.shouldProcess).toBe(false);
        expect(result.reason).toContain('not found');
    });

    it('processes PENDING + FAILED webhook (marks as failed)', () => {
        const result = shouldProcessWebhook(pendingTx, 'FAILED');
        expect(result.shouldProcess).toBe(true);
    });

    it('rejects unknown webhook statuses', () => {
        const result = shouldProcessWebhook(pendingTx, 'UNKNOWN_STATUS');
        expect(result.shouldProcess).toBe(false);
    });

    it('duplicate COMPLETED webhooks do NOT double-credit', () => {
        // First call: should process
        const first = shouldProcessWebhook(pendingTx, 'COMPLETED');
        expect(first.shouldProcess).toBe(true);

        // After first processing, status becomes COMPLETED
        const afterFirstProcess = { ...pendingTx, status: 'COMPLETED' as const };

        // Second call (duplicate webhook): should skip
        const second = shouldProcessWebhook(afterFirstProcess, 'COMPLETED');
        expect(second.shouldProcess).toBe(false);

        // Third call (triple duplicate): still skip
        const third = shouldProcessWebhook(afterFirstProcess, 'COMPLETED');
        expect(third.shouldProcess).toBe(false);
    });
});
