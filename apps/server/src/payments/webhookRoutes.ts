// ============================================================
// webhookRoutes.ts — Payment Gateway Webhook Endpoints
// P0 Financial Safety: HMAC-verified, idempotent, ledger-integrated
// ============================================================

import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { processWebhook, ANGOLA_BANKS } from './multicaixa';
import { hmacVerify, logWebhookEvent, markWebhookProcessed } from '../middleware/hmacVerify';
import { recordLedgerEntries, depositEntries } from '../services/ledgerService';
import { updateDailyTransacted } from '../middleware/kycGate';
import prisma from '../config/prisma';

const router = Router();

const MULTICAIXA_WEBHOOK_SECRET = process.env.MULTICAIXA_WEBHOOK_SECRET || '';

/**
 * Multicaixa payment webhook — HMAC verified + idempotent + ledger integrated
 *
 * Flow:
 *   1. hmacVerify middleware: validates HMAC-SHA256 + checks idempotency
 *   2. Find pending deposit by reference
 *   3. Atomically: mark COMPLETED + credit user + create ledger entries
 *   4. Mark webhook as processed in WebhookEventLog
 *   5. Track daily transacted for KYC
 */
router.post('/multicaixa', hmacVerify('multicaixa'), async (req: Request, res: Response) => {
    const idempotencyKey = (req as any).webhookIdempotencyKey;

    try {
        const { status, reference, transaction_id } = req.body;

        if (status === 'COMPLETED' || status === 'completed') {
            // Find the pending deposit by reference
            const pendingTx = await prisma.transaction.findFirst({
                where: {
                    reference: reference || transaction_id,
                    status: 'PENDING',
                    type: 'DEPOSIT',
                },
            });

            if (!pendingTx) {
                await logWebhookEvent('multicaixa', 'payment.completed', req.body, null, false, 'No pending transaction found', 200);
                return res.json({ status: 'ignored', reason: 'no_pending_tx' });
            }

            // Atomic: complete deposit + credit user + record ledger
            await prisma.$transaction(async (tx) => {
                await tx.transaction.update({
                    where: { id: pendingTx.id },
                    data: { status: 'COMPLETED' },
                });

                const absAmount = pendingTx.amount > 0n ? pendingTx.amount : -pendingTx.amount;

                await tx.user.update({
                    where: { id: pendingTx.userId },
                    data: { balance: { increment: absAmount } },
                });

                // P0: Double-entry ledger
                await recordLedgerEntries(tx, pendingTx.id, depositEntries(pendingTx.userId, absAmount));
            });

            // Track daily transacted for KYC
            const absAmount = pendingTx.amount > 0n ? pendingTx.amount : -pendingTx.amount;
            await updateDailyTransacted(pendingTx.userId, absAmount);

            // Mark webhook processed
            await markWebhookProcessed(idempotencyKey);

            // Also call legacy processWebhook for backward compat
            await processWebhook(req.body).catch(() => { });

            return res.json({ status: 'completed', transactionId: pendingTx.id });

        } else if (status === 'FAILED' || status === 'failed') {
            const pendingTx = await prisma.transaction.findFirst({
                where: {
                    reference: reference || transaction_id,
                    status: 'PENDING',
                    type: 'DEPOSIT',
                },
            });

            if (pendingTx) {
                await prisma.transaction.update({
                    where: { id: pendingTx.id },
                    data: { status: 'FAILED' },
                });
            }

            await markWebhookProcessed(idempotencyKey);
            return res.json({ status: 'failed_recorded' });
        }

        // Unknown status — acknowledge
        return res.json({ status: 'acknowledged', eventStatus: status });

    } catch (error) {
        console.error('[Webhook] Multicaixa processing error:', error);
        await logWebhookEvent('multicaixa', 'processing_error', req.body, null, false, (error as Error).message, 500);
        return res.status(500).json({ status: 'error' });
    }
});

// Get list of supported banks
router.get('/banks', (_req: Request, res: Response) => {
    res.json({ banks: ANGOLA_BANKS });
});

// Health check for webhook endpoint (payment providers verify this)
router.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Signed test webhook for development
if (process.env.NODE_ENV === 'development') {
    router.post('/multicaixa/test', async (req: Request, res: Response) => {
        const { reference, status = 'COMPLETED' } = req.body;

        if (!reference) {
            return res.status(400).json({ error: 'Reference required' });
        }

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

        const result = await processWebhook(payload);

        res.json({
            processed: result,
            testSignature: signature,
            note: 'Use this signature in x-multicaixa-signature header for manual testing',
        });
    });
}

export default router;
