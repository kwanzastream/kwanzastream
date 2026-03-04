// ============================================================
// hmacVerify.ts — HMAC-SHA256 Webhook Signature Verification
// P0 Financial Safety: Prevents forged payment webhooks.
// Used as middleware on payment webhook routes.
// ============================================================

import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import prisma from '../config/prisma';

// ============== Configuration ==============

const WEBHOOK_SECRETS: Record<string, string | undefined> = {
    multicaixa: process.env.MULTICAIXA_WEBHOOK_SECRET,
    emis: process.env.EMIS_WEBHOOK_SECRET,
    unitel_money: process.env.UNITEL_MONEY_WEBHOOK_SECRET,
};

// Header names per provider (configurable)
const SIGNATURE_HEADERS: Record<string, string> = {
    multicaixa: 'x-multicaixa-signature',
    emis: 'x-emis-signature',
    unitel_money: 'x-unitel-signature',
};

// ============== Middleware ==============

/**
 * Factory: creates HMAC verification middleware for a specific provider.
 *
 * Usage:
 *   router.post('/multicaixa', hmacVerify('multicaixa'), webhookHandler);
 */
export function hmacVerify(provider: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const secret = WEBHOOK_SECRETS[provider];

        if (!secret) {
            console.error(`[HMAC] No webhook secret configured for provider: ${provider}`);
            res.status(500).json({ error: 'Webhook not configured' });
            return;
        }

        // Get signature from header
        const headerName = SIGNATURE_HEADERS[provider] || 'x-signature';
        const receivedSignature = req.headers[headerName] as string | undefined;

        if (!receivedSignature) {
            await logWebhookEvent(provider, 'missing_signature', req.body, null, false, 'Missing signature header', 401);
            res.status(401).json({ error: 'Missing webhook signature' });
            return;
        }

        // Compute expected HMAC-SHA256
        const rawBody = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody, 'utf8')
            .digest('hex');

        // Timing-safe comparison to prevent timing attacks
        const isValid = receivedSignature.length === expectedSignature.length &&
            crypto.timingSafeEqual(
                Buffer.from(receivedSignature, 'hex'),
                Buffer.from(expectedSignature, 'hex')
            );

        if (!isValid) {
            await logWebhookEvent(provider, 'invalid_signature', req.body, receivedSignature, false, 'Signature mismatch', 401);
            console.warn(`[HMAC] Invalid signature from ${provider}: ${receivedSignature.substring(0, 16)}...`);
            res.status(401).json({ error: 'Invalid webhook signature' });
            return;
        }

        // Check idempotency — reject duplicate webhooks
        const idempotencyKey = extractIdempotencyKey(req.body, provider);
        if (idempotencyKey) {
            const existing = await prisma.webhookEventLog.findUnique({
                where: { idempotencyKey },
            });

            if (existing?.processed) {
                // Already processed — return 200 to prevent retries, but don't process again
                res.status(200).json({ status: 'already_processed', id: existing.id });
                return;
            }
        }

        // Attach provider and idempotency info to request for handler use
        (req as any).webhookProvider = provider;
        (req as any).webhookIdempotencyKey = idempotencyKey;

        next();
    };
}

// ============== Helpers ==============

/**
 * Extract idempotency key from webhook payload.
 * Each provider may use a different field name.
 */
function extractIdempotencyKey(body: any, provider: string): string | null {
    // Common patterns across payment providers
    return (
        body?.idempotencyKey ||
        body?.idempotency_key ||
        body?.event_id ||
        body?.transactionId ||
        body?.transaction_id ||
        (provider && body?.id ? `${provider}:${body.id}` : null)
    );
}

/**
 * Log a webhook event for debugging and audit trail.
 */
export async function logWebhookEvent(
    provider: string,
    eventType: string,
    payload: any,
    signature: string | null,
    processed: boolean,
    error?: string,
    httpStatus?: number
): Promise<string> {
    const idempotencyKey = extractIdempotencyKey(payload, provider);

    try {
        const log = await prisma.webhookEventLog.create({
            data: {
                provider,
                eventType,
                payload,
                signature,
                processed,
                processingError: error || null,
                idempotencyKey,
                httpStatus: httpStatus || null,
            },
        });
        return log.id;
    } catch (err: any) {
        // If idempotencyKey duplicate, update instead
        if (err.code === 'P2002' && idempotencyKey) {
            await prisma.webhookEventLog.update({
                where: { idempotencyKey },
                data: { processed, processingError: error, httpStatus },
            });
            return idempotencyKey;
        }
        console.error('[WebhookLog] Failed to log event:', err);
        return '';
    }
}

/**
 * Mark a webhook as successfully processed.
 */
export async function markWebhookProcessed(idempotencyKey: string): Promise<void> {
    if (!idempotencyKey) return;

    await prisma.webhookEventLog.updateMany({
        where: { idempotencyKey },
        data: { processed: true, processingError: null, httpStatus: 200 },
    });
}
