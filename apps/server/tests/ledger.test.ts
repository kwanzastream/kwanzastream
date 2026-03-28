// ============================================================
// ledger.test.ts — Unit Tests for Double-Entry Ledger
// Tests: balanced entries, reconciliation, imbalance rejection
// ============================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';

// FIX: Usar vi.hoisted para garantir que mockPrisma existe quando vi.mock executa — TestSprite #B2
const { mockPrisma } = vi.hoisted(() => {
    return {
        mockPrisma: {
            ledgerEntry: {
                findFirst: vi.fn(),
                create: vi.fn(),
                findMany: vi.fn(),
                count: vi.fn(),
            },
            user: {
                findMany: vi.fn(),
            },
        },
    };
});

vi.mock('../src/config/prisma', () => ({ default: mockPrisma }));

import {
    depositEntries,
    withdrawalEntries,
    donationEntries,
    refundEntries,
    recordLedgerEntries,
    PLATFORM_ACCOUNT_ID,
} from '../src/services/ledgerService';

describe('Ledger Entry Helpers', () => {
    it('depositEntries: creates balanced debit/credit pair', () => {
        const entries = depositEntries('user-123', 100_000n); // 1000 Kz
        expect(entries).toHaveLength(2);

        const totalDebit = entries.reduce((s, e) => s + e.debit, 0n);
        const totalCredit = entries.reduce((s, e) => s + e.credit, 0n);
        expect(totalDebit).toBe(totalCredit);

        // Platform is debited (money in from external)
        const platformEntry = entries.find(e => e.accountId === PLATFORM_ACCOUNT_ID);
        expect(platformEntry?.debit).toBe(100_000n);

        // User is credited (balance increases)
        const userEntry = entries.find(e => e.accountId === 'user-123');
        expect(userEntry?.credit).toBe(100_000n);
    });

    it('withdrawalEntries: creates balanced debit/credit pair', () => {
        const entries = withdrawalEntries('user-456', 50_000n);
        expect(entries).toHaveLength(2);

        const totalDebit = entries.reduce((s, e) => s + e.debit, 0n);
        const totalCredit = entries.reduce((s, e) => s + e.credit, 0n);
        expect(totalDebit).toBe(totalCredit);

        // User is debited
        const userEntry = entries.find(e => e.accountId === 'user-456');
        expect(userEntry?.debit).toBe(50_000n);
    });

    it('donationEntries: splits amount between receiver and platform fee', () => {
        const totalAmount = 100_000n;       // 1000 Kz total
        const receiverAmount = 80_000n;     // 800 Kz (80%)
        const entries = donationEntries('sender-1', 'receiver-1', totalAmount, receiverAmount);

        expect(entries).toHaveLength(3);

        const totalDebit = entries.reduce((s, e) => s + e.debit, 0n);
        const totalCredit = entries.reduce((s, e) => s + e.credit, 0n);
        expect(totalDebit).toBe(totalCredit);

        // Sender debited full amount
        const senderEntry = entries.find(e => e.accountId === 'sender-1');
        expect(senderEntry?.debit).toBe(100_000n);

        // Receiver credited 80%
        const receiverEntry = entries.find(e => e.accountId === 'receiver-1');
        expect(receiverEntry?.credit).toBe(80_000n);

        // Platform credited 20%
        const platformEntry = entries.find(e => e.accountId === PLATFORM_ACCOUNT_ID);
        expect(platformEntry?.credit).toBe(20_000n);
    });

    it('refundEntries: creates balanced pair', () => {
        const entries = refundEntries('user-789', 25_000n);
        expect(entries).toHaveLength(2);

        const totalDebit = entries.reduce((s, e) => s + e.debit, 0n);
        const totalCredit = entries.reduce((s, e) => s + e.credit, 0n);
        expect(totalDebit).toBe(totalCredit);
    });
});

describe('recordLedgerEntries', () => {
    const mockTx = {
        ledgerEntry: {
            findFirst: vi.fn(),
            create: vi.fn(),
        },
    } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('rejects imbalanced entries', async () => {
        const badEntries = [
            { accountId: 'a', accountType: 'user' as const, debit: 100n, credit: 0n },
            { accountId: 'b', accountType: 'user' as const, debit: 0n, credit: 50n }, // imbalanced!
        ];

        await expect(
            recordLedgerEntries(mockTx, 'tx-1', badEntries)
        ).rejects.toThrow('Ledger imbalance');
    });

    it('creates entries with running balance', async () => {
        mockTx.ledgerEntry.findFirst.mockResolvedValue(null); // no previous entries
        mockTx.ledgerEntry.create.mockResolvedValue({ id: 'entry-1' });

        const entries = depositEntries('user-1', 100_000n);
        await recordLedgerEntries(mockTx, 'tx-1', entries);

        expect(mockTx.ledgerEntry.create).toHaveBeenCalledTimes(2);

        // Check the user entry was created with correct balance
        const userCreateCall = mockTx.ledgerEntry.create.mock.calls.find(
            (call: any) => call[0].data.accountId === 'user-1'
        );
        expect(userCreateCall[0].data.balance).toBe(100_000n);
    });

    it('accumulates running balance from previous entries', async () => {
        // Previous user balance: 50_000n
        mockTx.ledgerEntry.findFirst.mockImplementation(({ where }: any) => {
            if (where.accountId === 'user-1') return { balance: 50_000n };
            return null;
        });
        mockTx.ledgerEntry.create.mockResolvedValue({ id: 'entry-2' });

        const entries = depositEntries('user-1', 30_000n);
        await recordLedgerEntries(mockTx, 'tx-2', entries);

        const userCreateCall = mockTx.ledgerEntry.create.mock.calls.find(
            (call: any) => call[0].data.accountId === 'user-1'
        );
        // Previous 50k + credit 30k = 80k
        expect(userCreateCall[0].data.balance).toBe(80_000n);
    });
});
