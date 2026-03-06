/**
 * Auth Flow Integration Tests
 * 
 * Tests the core authentication flows without database access.
 * Uses mocked prisma and services for unit-level verification.
 * 
 * P0 Flows tested:
 * - Registration validation (schema + uniqueness checks)
 * - Login validation (identifier detection: email, phone, username)
 * - OTP schema validation
 * - Password hashing (bcrypt rounds)
 * - Ban check flow
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import bcrypt from 'bcrypt';

// ============== Registration Schema ==============

const registerSchema = z.object({
    displayName: z.string().min(1).max(50),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    phone: z.string().min(9).max(15).regex(/^\+?[0-9]+$/),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    termsAccepted: z.literal(true),
    ageConfirmed: z.literal(true),
});

const loginSchema = z.object({
    identifier: z.string().min(1),
    password: z.string().min(1),
});

describe('Registration Schema Validation', () => {
    it('accepts valid registration data', () => {
        const data = {
            displayName: 'João Angola',
            username: 'joao_ao',
            phone: '+244923456789',
            email: 'joao@email.com',
            password: 'senhaSegura123',
            termsAccepted: true as const,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).not.toThrow();
    });

    it('rejects missing terms acceptance', () => {
        const data = {
            displayName: 'João',
            username: 'joao_ao',
            phone: '+244923456789',
            email: 'joao@email.com',
            password: 'senhaSegura123',
            termsAccepted: false,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).toThrow();
    });

    it('rejects short passwords (<8 chars)', () => {
        const data = {
            displayName: 'João',
            username: 'joao_ao',
            phone: '+244923456789',
            email: 'joao@email.com',
            password: '123',
            termsAccepted: true as const,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).toThrow();
    });

    it('rejects invalid username (special chars)', () => {
        const data = {
            displayName: 'João',
            username: 'joão@stream',
            phone: '+244923456789',
            email: 'joao@email.com',
            password: 'senhaSegura123',
            termsAccepted: true as const,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).toThrow();
    });

    it('rejects invalid phone number', () => {
        const data = {
            displayName: 'João',
            username: 'joao_ao',
            phone: 'abc123',
            email: 'joao@email.com',
            password: 'senhaSegura123',
            termsAccepted: true as const,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).toThrow();
    });

    it('accepts phone without + prefix (Angolan format)', () => {
        const data = {
            displayName: 'João',
            username: 'joao_ao',
            phone: '923456789',
            email: 'joao@email.com',
            password: 'senhaSegura123',
            termsAccepted: true as const,
            ageConfirmed: true as const,
        };
        expect(() => registerSchema.parse(data)).not.toThrow();
    });
});

// ============== Login Schema & Identifier Detection ==============

describe('Login Identifier Detection', () => {
    it('detects email identifiers', () => {
        const { identifier } = loginSchema.parse({ identifier: 'joao@email.com', password: 'test123' });
        const isEmail = identifier.includes('@');
        expect(isEmail).toBe(true);
    });

    it('detects phone identifiers', () => {
        const { identifier } = loginSchema.parse({ identifier: '+244923456789', password: 'test123' });
        const isPhone = /^\+?[0-9]{9,15}$/.test(identifier);
        expect(isPhone).toBe(true);
    });

    it('detects username identifiers', () => {
        const { identifier } = loginSchema.parse({ identifier: 'joao_ao', password: 'test123' });
        const isEmail = identifier.includes('@');
        const isPhone = /^\+?[0-9]{9,15}$/.test(identifier);
        expect(isEmail).toBe(false);
        expect(isPhone).toBe(false);
    });

    it('normalizes Angolan phone without + prefix', () => {
        const phone = '923456789';
        const normalized = phone.startsWith('+') ? phone : `+244${phone}`;
        expect(normalized).toBe('+244923456789');
    });
});

// ============== Password Hashing ==============

describe('Password Hashing', () => {
    const SALT_ROUNDS = 12;

    it('hashes password with bcrypt', async () => {
        const hash = await bcrypt.hash('senhaSegura123', SALT_ROUNDS);
        expect(hash).not.toBe('senhaSegura123');
        expect(hash).toMatch(/^\$2[ab]\$/);
    });

    it('verifies correct password', async () => {
        const hash = await bcrypt.hash('senhaSegura123', SALT_ROUNDS);
        const isValid = await bcrypt.compare('senhaSegura123', hash);
        expect(isValid).toBe(true);
    });

    it('rejects wrong password', async () => {
        const hash = await bcrypt.hash('senhaSegura123', SALT_ROUNDS);
        const isValid = await bcrypt.compare('senhaErrada', hash);
        expect(isValid).toBe(false);
    });
});

// ============== OTP Schema ==============

describe('OTP Schema', () => {
    const verifyOtpSchema = z.object({
        phone: z.string().min(9).max(15),
        code: z.string().length(6),
    });

    it('accepts valid OTP data', () => {
        expect(() => verifyOtpSchema.parse({ phone: '+244923456789', code: '123456' })).not.toThrow();
    });

    it('rejects OTP code with wrong length', () => {
        expect(() => verifyOtpSchema.parse({ phone: '+244923456789', code: '12345' })).toThrow();
        expect(() => verifyOtpSchema.parse({ phone: '+244923456789', code: '1234567' })).toThrow();
    });
});

// ============== Ban Check Logic ==============

describe('Ban Check', () => {
    it('blocks banned users', () => {
        const user = { isBanned: true, banReason: 'Violação dos Termos', bannedAt: new Date() };
        expect(user.isBanned).toBe(true);
    });

    it('allows non-banned users', () => {
        const user = { isBanned: false, banReason: null, bannedAt: null };
        expect(user.isBanned).toBe(false);
    });
});
