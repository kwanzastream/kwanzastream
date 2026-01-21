import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { processWebhook, ANGOLA_BANKS } from './multicaixa';

const router = Router();

const MULTICAIXA_WEBHOOK_SECRET = process.env.MULTICAIXA_WEBHOOK_SECRET || 'dev-webhook-secret';

// Verify webhook signature
const verifySignature = (payload: string, signature: string): boolean => {
    if (process.env.NODE_ENV === 'development') return true;

    const expectedSignature = crypto
        .createHmac('sha256', MULTICAIXA_WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
};

// Multicaixa payment webhook
router.post('/multicaixa', async (req: Request, res: Response) => {
    try {
        const signature = req.headers['x-multicaixa-signature'] as string;
        const rawBody = JSON.stringify(req.body);

        // Verify signature in production
        if (process.env.NODE_ENV !== 'development' && !verifySignature(rawBody, signature || '')) {
            console.error('[Webhook] Invalid signature');
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

// Mock webhook for testing (development only)
if (process.env.NODE_ENV === 'development') {
    router.post('/multicaixa/test', async (req: Request, res: Response) => {
        const { reference, status = 'COMPLETED' } = req.body;

        if (!reference) {
            return res.status(400).json({ error: 'Reference required' });
        }

        const result = await processWebhook({
            transaction_id: `TEST-${Date.now()}`,
            reference,
            status,
            amount: 0,
        });

        res.json({ processed: result });
    });
}

export default router;
