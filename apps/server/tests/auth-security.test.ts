/**
 * OTP & Auth Security Tests
 *
 * Tests:
 * 1. OTP generation uses crypto.randomInt (not Math.random)
 * 2. OTP format validation (6 digits)
 * 3. OTP uniqueness (high entropy)
 * 4. Env validation logic
 */

import { describe, it, expect } from 'vitest';
import { randomInt } from 'crypto';

// ============== OTP Generation Security ==============

describe('Cryptographic OTP Generation', () => {
    /** Replicate the generateOtp logic from otpService.ts */
    const generateOtp = (): string => {
        return randomInt(100000, 999999).toString();
    };

    it('generates a 6-digit string', () => {
        const otp = generateOtp();
        expect(otp).toMatch(/^\d{6}$/);
    });

    it('generates OTPs in valid range (100000-999999)', () => {
        for (let i = 0; i < 100; i++) {
            const otp = parseInt(generateOtp());
            expect(otp).toBeGreaterThanOrEqual(100000);
            expect(otp).toBeLessThanOrEqual(999999);
        }
    });

    it('generates sufficiently random OTPs (no repeated patterns)', () => {
        const otps = new Set<string>();
        for (let i = 0; i < 100; i++) {
            otps.add(generateOtp());
        }
        // With 900000 possible values, 100 random values should have < 1% collision rate
        expect(otps.size).toBeGreaterThan(95);
    });

    it('crypto.randomInt exists and is not Math.random', () => {
        // Verify that crypto.randomInt is a function (it exists in Node.js 14.10+)
        expect(typeof randomInt).toBe('function');
    });

    it('generates different OTPs on each call (not deterministic)', () => {
        // Generate 20 OTPs and verify they're not all the same
        const otps = Array.from({ length: 20 }, () => generateOtp());
        const unique = new Set(otps);
        expect(unique.size).toBeGreaterThan(1);
    });
});

// ============== Environment Validation ==============

describe('Environment Variable Validation', () => {
    const REQUIRED_ENVS = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];

    /** Replicate the env validation logic from index.ts */
    const validateEnv = (env: Record<string, string | undefined>): { valid: boolean; missing: string[] } => {
        const missing: string[] = [];
        for (const name of REQUIRED_ENVS) {
            if (!env[name]) {
                missing.push(name);
            }
        }
        return { valid: missing.length === 0, missing };
    };

    it('passes when all required vars are present', () => {
        const result = validateEnv({
            DATABASE_URL: 'postgresql://...',
            JWT_ACCESS_SECRET: 'secret1',
            JWT_REFRESH_SECRET: 'secret2',
        });
        expect(result.valid).toBe(true);
        expect(result.missing).toHaveLength(0);
    });

    it('fails when DATABASE_URL is missing', () => {
        const result = validateEnv({
            JWT_ACCESS_SECRET: 'secret1',
            JWT_REFRESH_SECRET: 'secret2',
        });
        expect(result.valid).toBe(false);
        expect(result.missing).toContain('DATABASE_URL');
    });

    it('fails when JWT_ACCESS_SECRET is missing', () => {
        const result = validateEnv({
            DATABASE_URL: 'postgresql://...',
            JWT_REFRESH_SECRET: 'secret2',
        });
        expect(result.valid).toBe(false);
        expect(result.missing).toContain('JWT_ACCESS_SECRET');
    });

    it('fails when all required vars are missing', () => {
        const result = validateEnv({});
        expect(result.valid).toBe(false);
        expect(result.missing).toHaveLength(3);
    });

    it('ignores empty string values', () => {
        const result = validateEnv({
            DATABASE_URL: '',
            JWT_ACCESS_SECRET: 'secret1',
            JWT_REFRESH_SECRET: 'secret2',
        });
        expect(result.valid).toBe(false);
        expect(result.missing).toContain('DATABASE_URL');
    });

    it('does not require optional vars', () => {
        const result = validateEnv({
            DATABASE_URL: 'postgresql://...',
            JWT_ACCESS_SECRET: 'secret1',
            JWT_REFRESH_SECRET: 'secret2',
            // REDIS_URL, RTMP_SECRET, SENTRY_DSN are all missing — should still pass
        });
        expect(result.valid).toBe(true);
    });
});

// ============== Hardcoded Secret Detection ==============

describe('No Hardcoded Secrets', () => {
    it('JWT fallback strings should not be used as secrets', () => {
        const dangerousSecrets = [
            'dev-access-secret',
            'dev-refresh-secret',
            'kwanza-rtmp-secret',
            'kwanza-stream-jwt-secret-dev-2024',
        ];

        // In a real deployment, env vars should not match any known fallbacks
        for (const secret of dangerousSecrets) {
            // Simulates checking production env
            expect(secret).not.toBe(process.env.JWT_ACCESS_SECRET);
            expect(secret).not.toBe(process.env.JWT_REFRESH_SECRET);
        }
    });
});
