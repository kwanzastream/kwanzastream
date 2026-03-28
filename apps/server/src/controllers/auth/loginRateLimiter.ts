/**
 * Login Rate Limiter — Blocks account after 5 consecutive failed login attempts
 * FIX: Bloqueio após 5 falhas de login consecutivas — TestSprite #M1
 * 
 * Uses Redis if available, falls back to in-memory Map with TTL cleanup.
 */

import redis from '../../config/redis';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_SECS = 15 * 60; // 15 minutes in seconds (for Redis TTL)

// In-memory fallback when Redis is unavailable
const memoryStore = new Map<string, { attempts: number; lockedUntil: number | null }>();

// Cleanup stale entries periodically (every 5 min)
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of memoryStore) {
        if (value.lockedUntil && value.lockedUntil < now) {
            memoryStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

function isRedisAvailable(): boolean {
    return redis.isOpen;
}

/**
 * Check if an identifier (email/phone/username) is currently locked out.
 * Returns { locked: true, remainingMs } or { locked: false }.
 */
export async function checkLoginLockout(identifier: string): Promise<{ locked: boolean; remainingMs?: number }> {
    const key = `login_lockout:${identifier.toLowerCase()}`;

    try {
        if (isRedisAvailable()) {
            const lockData = await redis.get(key);
            if (lockData) {
                const parsed = JSON.parse(lockData);
                if (parsed.lockedUntil) {
                    const remaining = parsed.lockedUntil - Date.now();
                    if (remaining > 0) {
                        return { locked: true, remainingMs: remaining };
                    }
                    // Lock expired, clean up
                    await redis.del(key);
                }
            }
        } else {
            const entry = memoryStore.get(key);
            if (entry?.lockedUntil) {
                const remaining = entry.lockedUntil - Date.now();
                if (remaining > 0) {
                    return { locked: true, remainingMs: remaining };
                }
                memoryStore.delete(key);
            }
        }
    } catch (err) {
        console.warn('Login lockout check failed (continuing):', err);
    }

    return { locked: false };
}

/**
 * Record a failed login attempt. After MAX_ATTEMPTS, locks the account for LOCKOUT_DURATION.
 */
export async function recordLoginFailure(identifier: string): Promise<void> {
    const key = `login_lockout:${identifier.toLowerCase()}`;

    try {
        if (isRedisAvailable()) {
            const existing = await redis.get(key);
            let attempts = 1;

            if (existing) {
                const parsed = JSON.parse(existing);
                attempts = (parsed.attempts || 0) + 1;
            }

            const data: { attempts: number; lockedUntil: number | null } = {
                attempts,
                lockedUntil: attempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : null,
            };

            await redis.set(key, JSON.stringify(data), { EX: LOCKOUT_DURATION_SECS });
        } else {
            const entry = memoryStore.get(key) || { attempts: 0, lockedUntil: null };
            entry.attempts += 1;

            if (entry.attempts >= MAX_ATTEMPTS) {
                entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
            }

            memoryStore.set(key, entry);
        }
    } catch (err) {
        console.warn('Login failure recording failed:', err);
    }
}

/**
 * Reset login failure counter after successful login.
 */
export async function resetLoginFailures(identifier: string): Promise<void> {
    const key = `login_lockout:${identifier.toLowerCase()}`;

    try {
        if (isRedisAvailable()) {
            await redis.del(key);
        } else {
            memoryStore.delete(key);
        }
    } catch (err) {
        console.warn('Login failure reset failed:', err);
    }
}
