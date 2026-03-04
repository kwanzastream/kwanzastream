// ============================================================
// ledgerService.ts — Double-Entry Ledger for Kwanza Stream
// P0 Financial Safety: Every monetary operation creates paired
// debit/credit entries for full auditability and reconciliation.
// ============================================================

import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

// ============== Types ==============

export interface LedgerEntryInput {
    accountId: string;
    accountType: 'user' | 'platform' | 'escrow';
    debit: bigint;
    credit: bigint;
    description?: string;
}

export const PLATFORM_ACCOUNT_ID = 'PLATFORM';

// ============== Core Service ==============

/**
 * Record paired ledger entries within an existing Prisma transaction.
 * Every call MUST create entries that balance: sum(debits) === sum(credits).
 *
 * @param tx - Prisma transaction client (from $transaction)
 * @param transactionId - The Transaction.id this entry belongs to
 * @param entries - Array of debit/credit entries (must balance)
 */
export async function recordLedgerEntries(
    tx: Prisma.TransactionClient,
    transactionId: string,
    entries: LedgerEntryInput[]
): Promise<void> {
    // Invariant: entries must balance
    const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0n);
    const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0n);

    if (totalDebit !== totalCredit) {
        throw new Error(
            `Ledger imbalance: debit=${totalDebit} credit=${totalCredit} for tx=${transactionId}`
        );
    }

    // Insert all entries with running balance calculation
    for (const entry of entries) {
        // Get current running balance for this account
        const lastEntry = await tx.ledgerEntry.findFirst({
            where: { accountId: entry.accountId },
            orderBy: { createdAt: 'desc' },
            select: { balance: true },
        });

        const previousBalance = lastEntry?.balance ?? 0n;
        // Balance = previous + credits - debits
        const newBalance = previousBalance + entry.credit - entry.debit;

        await tx.ledgerEntry.create({
            data: {
                transactionId,
                accountId: entry.accountId,
                accountType: entry.accountType,
                debit: entry.debit,
                credit: entry.credit,
                balance: newBalance,
                description: entry.description,
            },
        });
    }
}

/**
 * Get the ledger-computed balance for an account.
 * This should match User.balance for user accounts.
 */
export async function getLedgerBalance(accountId: string): Promise<bigint> {
    const lastEntry = await prisma.ledgerEntry.findFirst({
        where: { accountId },
        orderBy: { createdAt: 'desc' },
        select: { balance: true },
    });
    return lastEntry?.balance ?? 0n;
}

/**
 * Reconcile: compare User.balance vs ledger-computed balance.
 * Returns discrepancies for admin investigation.
 */
export async function reconcileAllAccounts(): Promise<{
    ok: boolean;
    discrepancies: Array<{
        accountId: string;
        walletBalance: bigint;
        ledgerBalance: bigint;
        diff: bigint;
    }>;
}> {
    // Get all users with non-zero balance
    const users = await prisma.user.findMany({
        where: { balance: { not: 0n } },
        select: { id: true, balance: true },
    });

    const discrepancies: Array<{
        accountId: string;
        walletBalance: bigint;
        ledgerBalance: bigint;
        diff: bigint;
    }> = [];

    for (const user of users) {
        const ledgerBalance = await getLedgerBalance(user.id);
        if (user.balance !== ledgerBalance) {
            discrepancies.push({
                accountId: user.id,
                walletBalance: user.balance,
                ledgerBalance,
                diff: user.balance - ledgerBalance,
            });
        }
    }

    return {
        ok: discrepancies.length === 0,
        discrepancies,
    };
}

/**
 * Get ledger entries for an account (paginated).
 */
export async function getAccountLedger(
    accountId: string,
    page: number = 1,
    limit: number = 50
): Promise<{ entries: any[]; total: number }> {
    const [entries, total] = await Promise.all([
        prisma.ledgerEntry.findMany({
            where: { accountId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                transaction: {
                    select: { type: true, status: true, description: true },
                },
            },
        }),
        prisma.ledgerEntry.count({ where: { accountId } }),
    ]);

    return { entries, total };
}

// ============== Ledger Entry Helpers for Common Operations ==============

/**
 * Create ledger entries for a deposit:
 *   DEBIT: platform (money in from external)
 *   CREDIT: user (balance increases)
 */
export function depositEntries(userId: string, amount: bigint): LedgerEntryInput[] {
    return [
        {
            accountId: PLATFORM_ACCOUNT_ID,
            accountType: 'platform',
            debit: amount,
            credit: 0n,
            description: 'Depósito recebido via gateway',
        },
        {
            accountId: userId,
            accountType: 'user',
            debit: 0n,
            credit: amount,
            description: 'Depósito creditado na wallet',
        },
    ];
}

/**
 * Create ledger entries for a withdrawal:
 *   DEBIT: user (balance decreases)
 *   CREDIT: platform (money out to external)
 */
export function withdrawalEntries(userId: string, amount: bigint): LedgerEntryInput[] {
    return [
        {
            accountId: userId,
            accountType: 'user',
            debit: amount,
            credit: 0n,
            description: 'Levantamento solicitado',
        },
        {
            accountId: PLATFORM_ACCOUNT_ID,
            accountType: 'platform',
            debit: 0n,
            credit: amount,
            description: 'Levantamento processado',
        },
    ];
}

/**
 * Create ledger entries for a donation:
 *   DEBIT: sender (balance decreases by full amount)
 *   CREDIT: receiver (balance increases by amount - fee)
 *   CREDIT: platform (receives the fee)
 */
export function donationEntries(
    senderId: string,
    receiverId: string,
    totalAmount: bigint,
    receiverAmount: bigint
): LedgerEntryInput[] {
    const platformFee = totalAmount - receiverAmount;
    return [
        {
            accountId: senderId,
            accountType: 'user',
            debit: totalAmount,
            credit: 0n,
            description: 'Salo enviado',
        },
        {
            accountId: receiverId,
            accountType: 'user',
            debit: 0n,
            credit: receiverAmount,
            description: 'Salo recebido',
        },
        {
            accountId: PLATFORM_ACCOUNT_ID,
            accountType: 'platform',
            debit: 0n,
            credit: platformFee,
            description: 'Taxa plataforma (20%)',
        },
    ];
}

/**
 * Create ledger entries for a refund:
 *   DEBIT: platform (giving money back)
 *   CREDIT: user (balance restored)
 */
export function refundEntries(userId: string, amount: bigint): LedgerEntryInput[] {
    return [
        {
            accountId: PLATFORM_ACCOUNT_ID,
            accountType: 'platform',
            debit: amount,
            credit: 0n,
            description: 'Reembolso processado',
        },
        {
            accountId: userId,
            accountType: 'user',
            debit: 0n,
            credit: amount,
            description: 'Reembolso creditado',
        },
    ];
}
