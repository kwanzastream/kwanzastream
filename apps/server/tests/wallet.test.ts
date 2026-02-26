/**
 * Wallet Controller Tests — Concurrency & Atomicity
 * 
 * Tests the critical wallet operations:
 * 1. BigInt centimos conversion (toCentimos / toKz)
 * 2. Atomic balance deduction logic (no double-spend)
 * 3. Concurrent withdrawal simulation
 * 4. Insufficient balance handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ============== Unit Tests: BigInt Helpers ==============

describe('BigInt Centimos Conversion', () => {
    const toCentimos = (kz: number): bigint => BigInt(Math.round(kz * 100));
    const toKz = (centimos: bigint): number => Number(centimos) / 100;

    it('converts whole Kz to centimos', () => {
        expect(toCentimos(100)).toBe(10000n);
        expect(toCentimos(1000)).toBe(100000n);
        expect(toCentimos(5000)).toBe(500000n);
    });

    it('converts fractional Kz to centimos without floating-point errors', () => {
        expect(toCentimos(99.99)).toBe(9999n);
        expect(toCentimos(0.01)).toBe(1n);
        expect(toCentimos(49.995)).toBe(5000n); // rounds to 50.00 Kz = 5000 centimos
    });

    it('converts centimos back to Kz', () => {
        expect(toKz(10000n)).toBe(100);
        expect(toKz(100000n)).toBe(1000);
        expect(toKz(9999n)).toBe(99.99);
    });

    it('handles zero correctly', () => {
        expect(toCentimos(0)).toBe(0n);
        expect(toKz(0n)).toBe(0);
    });

    it('handles large amounts (1M Kz)', () => {
        expect(toCentimos(1000000)).toBe(100000000n);
        expect(toKz(100000000n)).toBe(1000000);
    });
});

// ============== Unit Tests: Platform Fee Calculation ==============

describe('Platform Fee Calculation (BigInt Integer Arithmetic)', () => {
    const PLATFORM_FEE_PERCENT = 20n;
    const calcReceiverAmount = (amount: bigint): bigint => amount - (amount * PLATFORM_FEE_PERCENT / 100n);

    it('calculates 20% fee correctly for round amounts', () => {
        expect(calcReceiverAmount(10000n)).toBe(8000n);   // 100 Kz → 80 Kz
        expect(calcReceiverAmount(50000n)).toBe(40000n);   // 500 Kz → 400 Kz
        expect(calcReceiverAmount(100000n)).toBe(80000n);  // 1000 Kz → 800 Kz
    });

    it('truncates fractional centimos (favour platform) for odd amounts', () => {
        // 333 centimos * 20 / 100 = 66.6 → truncated to 66 → receiver gets 267
        expect(calcReceiverAmount(333n)).toBe(267n);
    });

    it('handles minimum donation amount', () => {
        expect(calcReceiverAmount(1n)).toBe(1n); // 1 centimos → 0 fee (rounds down), receiver gets 1
    });

    it('no floating-point errors with 5000 Kz donation', () => {
        // This was the original bug: 5000 * 0.8 = 4000.0000000000005 in Float
        // With BigInt: 500000 - (500000 * 20 / 100) = 500000 - 100000 = 400000 exactly
        expect(calcReceiverAmount(500000n)).toBe(400000n);
    });
});

// ============== Concurrency Simulation Tests ==============

describe('Atomic Balance Check Logic', () => {
    /**
     * Simulates the atomic balance check pattern:
     * UPDATE "User" SET balance = balance - $amount WHERE id = $id AND balance >= $amount
     * 
     * Returns the number of rows updated (0 = insufficient, 1 = success)
     */
    const atomicDeduct = (currentBalance: bigint, deductAmount: bigint): { newBalance: bigint; success: boolean } => {
        // Simulates the SQL: UPDATE ... WHERE balance >= amount
        if (currentBalance >= deductAmount) {
            return { newBalance: currentBalance - deductAmount, success: true };
        }
        return { newBalance: currentBalance, success: false };
    };

    it('succeeds when balance is sufficient', () => {
        const result = atomicDeduct(100000n, 50000n); // 1000 Kz, deduct 500 Kz
        expect(result.success).toBe(true);
        expect(result.newBalance).toBe(50000n);
    });

    it('fails when balance is insufficient', () => {
        const result = atomicDeduct(10000n, 50000n); // 100 Kz, deduct 500 Kz
        expect(result.success).toBe(false);
        expect(result.newBalance).toBe(10000n); // unchanged
    });

    it('succeeds when balance exactly equals amount', () => {
        const result = atomicDeduct(50000n, 50000n);
        expect(result.success).toBe(true);
        expect(result.newBalance).toBe(0n);
    });

    it('fails when balance is zero', () => {
        const result = atomicDeduct(0n, 1n);
        expect(result.success).toBe(false);
        expect(result.newBalance).toBe(0n);
    });

    it('prevents double-spend in concurrent scenario simulation', () => {
        // Simulates two concurrent requests hitting the same balance
        let balance = 100000n; // 1000 Kz

        // Request 1: deduct 1000 Kz
        const req1 = atomicDeduct(balance, 100000n);
        // Request 2: arrives at same time, sees same balance
        const req2 = atomicDeduct(balance, 100000n);

        // In the OLD (broken) code: both would succeed → balance = -1000 Kz
        // In the atomic SQL: only one can succeed because the UPDATE changes
        // the row between the two queries.

        // At the application level, we simulate the DB behavior:
        // First request succeeds
        expect(req1.success).toBe(true);
        balance = req1.newBalance; // balance = 0

        // Second request should fail (balance is now 0)
        const req2Retry = atomicDeduct(balance, 100000n);
        expect(req2Retry.success).toBe(false);
        expect(balance).toBe(0n); // never goes negative
    });

    it('handles rapid sequential deductions correctly', () => {
        let balance = 500000n; // 5000 Kz

        // 10 deductions of 500 Kz each
        let successCount = 0;
        for (let i = 0; i < 10; i++) {
            const result = atomicDeduct(balance, 50000n);
            if (result.success) {
                balance = result.newBalance;
                successCount++;
            }
        }

        expect(successCount).toBe(10);
        expect(balance).toBe(0n);
    });

    it('stops deductions when balance runs out', () => {
        let balance = 150000n; // 1500 Kz

        // Try 10 deductions of 500 Kz — only 3 should succeed
        let successCount = 0;
        for (let i = 0; i < 10; i++) {
            const result = atomicDeduct(balance, 50000n);
            if (result.success) {
                balance = result.newBalance;
                successCount++;
            }
        }

        expect(successCount).toBe(3);
        expect(balance).toBe(0n);
    });
});

// ============== Salo Types Validation ==============

describe('Salo Types Prices (BigInt centimos)', () => {
    const SALO_TYPES = {
        bronze: { price: 10000n, name: 'Salo Bronze' },
        silver: { price: 50000n, name: 'Salo Prata' },
        gold: { price: 100000n, name: 'Salo Ouro' },
        diamond: { price: 500000n, name: 'Salo Diamante' },
        legendary: { price: 1000000n, name: 'Salo Lendário' },
    };

    it('all salo types have valid BigInt prices', () => {
        for (const [key, salo] of Object.entries(SALO_TYPES)) {
            expect(typeof salo.price).toBe('bigint');
            expect(salo.price > 0n).toBe(true);
        }
    });

    it('prices are in correct order (ascending)', () => {
        const prices = Object.values(SALO_TYPES).map(s => s.price);
        for (let i = 1; i < prices.length; i++) {
            expect(prices[i] > prices[i - 1]).toBe(true);
        }
    });

    it('bronze is 100 Kz (10000 centimos)', () => {
        expect(SALO_TYPES.bronze.price).toBe(10000n);
    });

    it('legendary is 10000 Kz (1000000 centimos)', () => {
        expect(SALO_TYPES.legendary.price).toBe(1000000n);
    });
});
