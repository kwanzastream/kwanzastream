// ============================================================
// kycGate.ts — KYC/AML Tier Enforcement Middleware
// P0 Compliance: BNA requires transaction limits based on
// identity verification level. This middleware blocks operations
// that exceed the user's tier limits.
// ============================================================

import { Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from './authMiddleware';

// ============== Tier Limits (in centimos) ==============
// Tier 0: Phone verified only        → 5.000 Kz/dia  (500.000 centimos)
// Tier 1: Phone + selfie/NIF         → 50.000 Kz/dia (5.000.000 centimos)
// Tier 2: Full ID (BI) + comprovativo → 500.000 Kz/dia (50.000.000 centimos)

interface TierConfig {
    dailyLimit: bigint;
    canWithdraw: boolean;
    canDeposit: boolean;
    maxSingleTx: bigint;
    label: string;
}

const TIER_LIMITS: Record<number, TierConfig> = {
    0: {
        dailyLimit: 500_000n,        // 5.000 Kz
        canWithdraw: false,
        canDeposit: true,
        maxSingleTx: 200_000n,      // 2.000 Kz
        label: 'Básico (sem verificação)',
    },
    1: {
        dailyLimit: 5_000_000n,      // 50.000 Kz
        canWithdraw: true,
        canDeposit: true,
        maxSingleTx: 2_000_000n,    // 20.000 Kz
        label: 'Verificado (NIF/Selfie)',
    },
    2: {
        dailyLimit: 50_000_000n,     // 500.000 Kz
        canWithdraw: true,
        canDeposit: true,
        maxSingleTx: 20_000_000n,   // 200.000 Kz
        label: 'Totalmente Verificado (BI)',
    },
};

// ============== Middleware Factory ==============

/**
 * KYC gate middleware — checks if user's tier allows the requested operation.
 *
 * Usage:
 *   router.post('/deposit', kycGate('deposit'), depositHandler);
 *   router.post('/withdraw', kycGate('withdraw'), withdrawHandler);
 *   router.post('/donate', kycGate('donate'), donateHandler);
 */
export function kycGate(operation: 'deposit' | 'withdraw' | 'donate') {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Não autenticado' });
                return;
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    kycTier: true,
                    dailyTransacted: true,
                    lastTransactedDate: true,
                },
            });

            if (!user) {
                res.status(404).json({ error: 'Utilizador não encontrado' });
                return;
            }

            const tier = user.kycTier ?? 0;
            const config = TIER_LIMITS[tier] || TIER_LIMITS[0];

            // Check operation permission
            if (operation === 'withdraw' && !config.canWithdraw) {
                res.status(403).json({
                    error: 'Verifica a tua identidade para fazer levantamentos',
                    code: 'KYC_REQUIRED',
                    requiredTier: 1,
                    currentTier: tier,
                });
                return;
            }

            if (operation === 'deposit' && !config.canDeposit) {
                res.status(403).json({
                    error: 'Depósitos não permitidos neste nível',
                    code: 'KYC_REQUIRED',
                    requiredTier: 1,
                    currentTier: tier,
                });
                return;
            }

            // Parse amount from request body (in Kz — converted to centimos)
            const amountKz = req.body?.amount;
            if (amountKz && typeof amountKz === 'number') {
                const amountCentimos = BigInt(Math.round(amountKz * 100));

                // Check single transaction limit
                if (amountCentimos > config.maxSingleTx) {
                    const maxKz = Number(config.maxSingleTx) / 100;
                    res.status(403).json({
                        error: `Valor máximo por transação para o teu nível: ${maxKz.toLocaleString('pt-AO')} Kz`,
                        code: 'TX_LIMIT_EXCEEDED',
                        maxAmount: maxKz,
                        currentTier: tier,
                    });
                    return;
                }

                // Check daily limit (reset if new day)
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                let dailyTotal = user.dailyTransacted ?? 0n;

                // Reset daily counter if last transaction was on a different day
                if (!user.lastTransactedDate || new Date(user.lastTransactedDate) < today) {
                    dailyTotal = 0n;
                }

                if (dailyTotal + amountCentimos > config.dailyLimit) {
                    const remainingCentimos = config.dailyLimit - dailyTotal;
                    const remainingKz = Number(remainingCentimos > 0n ? remainingCentimos : 0n) / 100;
                    const dailyLimitKz = Number(config.dailyLimit) / 100;
                    res.status(403).json({
                        error: `Limite diário atingido. Restam ${remainingKz.toLocaleString('pt-AO')} Kz (limite: ${dailyLimitKz.toLocaleString('pt-AO')} Kz/dia)`,
                        code: 'DAILY_LIMIT_EXCEEDED',
                        dailyLimit: dailyLimitKz,
                        remaining: remainingKz,
                        currentTier: tier,
                    });
                    return;
                }

                // Attach parsed amount for downstream use
                (req as any).amountCentimos = amountCentimos;
                (req as any).dailyTotalAfter = dailyTotal + amountCentimos;
            }

            // Attach tier info for downstream use
            (req as any).kycTier = tier;
            (req as any).tierConfig = config;

            next();
        } catch (error) {
            console.error('[KYC Gate] Error:', error);
            res.status(500).json({ error: 'Erro interno na verificação KYC' });
        }
    };
}

/**
 * Update daily transacted amount after a successful transaction.
 * Call this AFTER the transaction is committed.
 */
export async function updateDailyTransacted(userId: string, amountCentimos: bigint): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { dailyTransacted: true, lastTransactedDate: true },
    });

    if (!user) return;

    // Reset if new day
    const isNewDay = !user.lastTransactedDate || new Date(user.lastTransactedDate) < today;
    const currentDaily = isNewDay ? 0n : (user.dailyTransacted ?? 0n);

    await prisma.user.update({
        where: { id: userId },
        data: {
            dailyTransacted: currentDaily + amountCentimos,
            lastTransactedDate: new Date(),
        },
    });
}

/**
 * Get KYC tier limits info for frontend display.
 */
export function getTierLimits(): Record<number, { dailyLimitKz: number; canWithdraw: boolean; maxSingleTxKz: number; label: string }> {
    const result: any = {};
    for (const [tier, config] of Object.entries(TIER_LIMITS)) {
        result[tier] = {
            dailyLimitKz: Number(config.dailyLimit) / 100,
            canWithdraw: config.canWithdraw,
            maxSingleTxKz: Number(config.maxSingleTx) / 100,
            label: config.label,
        };
    }
    return result;
}
