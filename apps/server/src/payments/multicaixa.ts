/**
 * Multicaixa Express Payment Service
 * 
 * Mock implementation for development, real API integration scaffolded.
 * 
 * Changes from audit:
 * - F-009: Added idempotency check in processWebhook to prevent double-crediting
 * - Amounts are now in centimos (BigInt) after schema migration
 */

import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma';

const MULTICAIXA_API_URL = process.env.MULTICAIXA_API_URL || 'https://api.multicaixa.co.ao';
const MULTICAIXA_MERCHANT_ID = process.env.MULTICAIXA_MERCHANT_ID || '';
const MULTICAIXA_API_KEY = process.env.MULTICAIXA_API_KEY || '';
const IS_MOCK = process.env.NODE_ENV === 'development' || !MULTICAIXA_API_KEY;

export interface PaymentRequest {
    amount: number;       // In Kz (API-facing)
    reference: string;
    description: string;
    phoneNumber?: string;
    callbackUrl: string;
}

export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    paymentUrl?: string;
    qrCode?: string;
    error?: string;
}

export interface WithdrawalRequest {
    amount: number;
    reference: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
}

export interface WithdrawalResponse {
    success: boolean;
    transactionId?: string;
    estimatedTime?: string;
    error?: string;
}

// Create a payment request (deposit)
export const createPayment = async (request: PaymentRequest): Promise<PaymentResponse> => {
    if (IS_MOCK) {
        console.log('[Multicaixa MOCK] Creating payment:', request);

        const transactionId = `MCX-${uuidv4().slice(0, 8).toUpperCase()}`;

        return {
            success: true,
            transactionId,
            paymentUrl: `https://pay.multicaixa.co.ao/mock/${transactionId}`,
            qrCode: `data:image/png;base64,MOCK_QR_CODE_${transactionId}`,
        };
    }

    try {
        const response = await fetch(`${MULTICAIXA_API_URL}/v1/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MULTICAIXA_API_KEY}`,
                'X-Merchant-ID': MULTICAIXA_MERCHANT_ID,
            },
            body: JSON.stringify({
                amount: request.amount,
                currency: 'AOA',
                reference: request.reference,
                description: request.description,
                phone: request.phoneNumber,
                callback_url: request.callbackUrl,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Payment creation failed' };
        }

        return {
            success: true,
            transactionId: data.transaction_id,
            paymentUrl: data.payment_url,
            qrCode: data.qr_code,
        };
    } catch (error: any) {
        console.error('[Multicaixa] Payment creation error:', error);
        return { success: false, error: error.message };
    }
};

// Process withdrawal (payout to bank account)
export const createWithdrawal = async (request: WithdrawalRequest): Promise<WithdrawalResponse> => {
    if (IS_MOCK) {
        console.log('[Multicaixa MOCK] Creating withdrawal:', request);

        const transactionId = `WIT-${uuidv4().slice(0, 8).toUpperCase()}`;

        return {
            success: true,
            transactionId,
            estimatedTime: '1-3 business days',
        };
    }

    try {
        const response = await fetch(`${MULTICAIXA_API_URL}/v1/payouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MULTICAIXA_API_KEY}`,
                'X-Merchant-ID': MULTICAIXA_MERCHANT_ID,
            },
            body: JSON.stringify({
                amount: request.amount,
                currency: 'AOA',
                reference: request.reference,
                bank_code: request.bankCode,
                account_number: request.accountNumber,
                account_name: request.accountName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Withdrawal creation failed' };
        }

        return {
            success: true,
            transactionId: data.transaction_id,
            estimatedTime: data.estimated_time || '1-3 business days',
        };
    } catch (error: any) {
        console.error('[Multicaixa] Withdrawal creation error:', error);
        return { success: false, error: error.message };
    }
};

// Verify payment status
export const verifyPayment = async (transactionId: string): Promise<{ status: string; paid: boolean }> => {
    if (IS_MOCK) {
        return { status: 'COMPLETED', paid: true };
    }

    try {
        const response = await fetch(`${MULTICAIXA_API_URL}/v1/payments/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${MULTICAIXA_API_KEY}`,
                'X-Merchant-ID': MULTICAIXA_MERCHANT_ID,
            },
        });

        const data = await response.json();

        return {
            status: data.status,
            paid: data.status === 'COMPLETED' || data.status === 'PAID',
        };
    } catch (error) {
        console.error('[Multicaixa] Payment verification error:', error);
        return { status: 'ERROR', paid: false };
    }
};

/**
 * Process webhook from Multicaixa — IDEMPOTENT (F-009 fix)
 * 
 * This function is safe to call multiple times with the same payload.
 * If a transaction is already COMPLETED, it will return true without
 * re-crediting the user's balance.
 */
export const processWebhook = async (payload: any): Promise<boolean> => {
    const { transaction_id, status, reference, amount } = payload;

    console.log('[Multicaixa] Webhook received:', { transaction_id, status, reference });

    // Find the transaction in our database
    const transaction = await prisma.transaction.findUnique({
        where: { reference },
    });

    if (!transaction) {
        console.error('[Multicaixa] Transaction not found:', reference);
        return false;
    }

    // IDEMPOTENCY CHECK (F-009): If already processed, don't double-credit
    if (transaction.status === 'COMPLETED') {
        console.log('[Multicaixa] Transaction already completed (idempotent skip):', reference);
        return true;
    }

    if (transaction.status === 'FAILED' || transaction.status === 'CANCELLED') {
        console.log('[Multicaixa] Transaction already in terminal state:', transaction.status);
        return true;
    }

    if (status === 'COMPLETED' || status === 'PAID') {
        // Update transaction status and credit user balance ATOMICALLY
        // Using the absolute value of amount since deposits are stored as positive
        const creditAmount = transaction.amount < 0n ? -transaction.amount : transaction.amount;

        await prisma.$transaction([
            prisma.transaction.update({
                where: { id: transaction.id },
                data: {
                    status: 'COMPLETED',
                    metadata: { ...(transaction.metadata as object || {}), multicaixa_id: transaction_id },
                },
            }),
            prisma.user.update({
                where: { id: transaction.userId },
                data: { balance: { increment: creditAmount } },
            }),
        ]);

        console.log('[Multicaixa] Payment completed for user:', transaction.userId);
        return true;
    }

    if (status === 'FAILED' || status === 'CANCELLED') {
        await prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: 'FAILED' },
        });

        console.log('[Multicaixa] Payment failed:', reference);
        return true;
    }

    return true;
};

// Angolan bank codes for reference
export const ANGOLA_BANKS = [
    { code: 'BAI', name: 'Banco Angolano de Investimentos' },
    { code: 'BFA', name: 'Banco de Fomento Angola' },
    { code: 'BIC', name: 'Banco BIC' },
    { code: 'BPC', name: 'Banco de Poupança e Crédito' },
    { code: 'BMA', name: 'Banco Millennium Atlântico' },
    { code: 'SOL', name: 'Banco Sol' },
    { code: 'BNI', name: 'Banco de Negócios Internacional' },
    { code: 'KEVE', name: 'Banco Keve' },
    { code: 'VTB', name: 'Banco VTB África' },
    { code: 'YETU', name: 'Banco Yetu' },
];
