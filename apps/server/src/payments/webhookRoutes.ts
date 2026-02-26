import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { processWebhook, ANGOLA_BANKS } from './multicaixa';

const router = Router();

// Webhook secret — required for production HMAC verification
const MULTICAIXA_WEBHOOK_SECRET = process.env.MULTICAIXA_WEBHOOK_SECRET || '';

/**
 * Verify HMAC-SHA256 webhook signature.
 * ALWAYS verified, even in development (no more dev bypass — F-008 fix).
 * For local testing, use the /multicaixa/test endpoint with a known secret.
 */
const verifySignature = (rawBody: string, signature: string): boolean => {
    if (!MULTICAIXA_WEBHOOK_SECRET) {
        console.error('[Webhook] MULTICAIXA_WEBHOOK_SECRET not set — rejecting all webhooks');
        return false;
    }

    if (!signature) {
        return false;
    }

    const expectedSignature = crypto
        .createHmac('sha256', MULTICAIXA_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

    // Constant-time comparison to prevent timing attacks
    try {
        return crypto.timingSafeEqual(
            Buffer.from(signature, 'utf8'),
            Buffer.from(expectedSignature, 'utf8')
        );
    } catch {
        // Buffers of different length
        return false;
    }
};

// Multicaixa payment webhook — HMAC verified, idempotent
router.post('/multicaixa', async (req: Request, res: Response) => {
    try {
        const signature = req.headers['x-multicaixa-signature'] as string;
        const rawBody = JSON.stringify(req.body);

        // ALWAYS verify signature (F-008: removed dev bypass)
        if (!verifySignature(rawBody, signature || '')) {
            console.error('[Webhook] Invalid or missing signature');
            return res.status(401).json({ error: 'Invalid signature' });
        }

        const result = await processWebhook(req.body);

        if (result) {
            res.json({ received: true });
        } else {
            res.status(400).json({ error: 'Failed to process webhook' });
        }
    } catch (error) {
        console.error('[Webhook] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get list of supported banks
router.get('/banks', (req: Request, res: Response) => {
    res.json({ banks: ANGOLA_BANKS });
});

// Signed test webhook for development — uses HMAC so tests validate the full flow
if (process.env.NODE_ENV === 'development') {
    router.post('/multicaixa/test', async (req: Request, res: Response) => {
        const { reference, status = 'COMPLETED' } = req.body;

        if (!reference) {
            return res.status(400).json({ error: 'Reference required' });
        }

        // Generate a properly signed payload for testing
        const payload = {
            transaction_id: `TEST-${Date.now()}`,
            reference,
            status,
            amount: 0,
        };

        const rawBody = JSON.stringify(payload);
        const signature = crypto
            .createHmac('sha256', MULTICAIXA_WEBHOOK_SECRET)
            .update(rawBody)
            .digest('hex');

        console.log('[Webhook Test] Generated signature:', signature);
        console.log('[Webhook Test] Payload:', rawBody);

        const result = await processWebhook(payload);

        res.json({
            processed: result,
            testSignature: signature,
            note: 'Use this signature in x-multicaixa-signature header for manual testing',
        });
    });
}

export default router;
