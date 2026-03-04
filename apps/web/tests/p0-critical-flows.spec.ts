import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';
const API_URL = process.env.E2E_API_URL || 'http://localhost:5000';

// ============================================================
// P0 E2E Tests — Critical Financial & Security Flows
// Covers: Admin RBAC, KYC tiers, webhook security, explore,
//         search, streams, mobile viewport, notifications
// ============================================================

// ============== Admin RBAC Tests ==============

test.describe('Admin RBAC Protection', () => {
    test('should reject admin stats without authentication', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/stats`);
        expect(response.status()).toBe(401);
    });

    test('should reject admin users list without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/users`);
        expect(response.status()).toBe(401);
    });

    test('should reject admin transactions list without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/transactions`);
        expect(response.status()).toBe(401);
    });

    test('should reject ledger reconciliation without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/ledger/reconcile`);
        expect(response.status()).toBe(401);
    });

    test('should reject audit logs access without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/audit-logs`);
        expect(response.status()).toBe(401);
    });

    test('should reject audit log CSV export without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/admin/audit-logs/export`);
        expect(response.status()).toBe(401);
    });
});

// ============== KYC Tier Tests ==============

test.describe('KYC Tier Endpoint', () => {
    test('should reject KYC tiers without authentication', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/wallet/kyc-tiers`);
        expect(response.status()).toBe(401);
    });
});

// ============== Webhook Security Tests ==============

test.describe('Webhook Security', () => {
    test('should reject webhook without HMAC signature', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/webhooks/multicaixa`, {
            data: {
                transaction_id: 'TEST-001',
                reference: 'DEP-FAKE',
                status: 'COMPLETED',
                amount: 10000,
            },
        });
        // Should reject: 401 (invalid signature) or 500 (no middleware secret)
        expect([401, 403, 500]).toContain(response.status());
    });

    test('webhook health check should respond', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/webhooks/health`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('ok');
    });

    test('should return supported banks', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/webhooks/banks`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.banks).toBeDefined();
        expect(Array.isArray(body.banks)).toBe(true);
    });
});

// ============== Stream API Tests ==============

test.describe('Stream API', () => {
    test('should list streams without auth (public)', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/streams`);
        expect([200, 304]).toContain(response.status());
    });

    test('should reject stream creation without auth', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/streams`, {
            data: {
                title: 'Test Stream',
                category: 'Gaming',
            },
        });
        expect(response.status()).toBe(401);
    });
});

// ============== Search API Tests ==============

test.describe('Search API', () => {
    test('should return search results for valid query', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/search?q=test`);
        expect([200, 304]).toContain(response.status());
    });

    test('should handle empty search query', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/search?q=`);
        // Should return 400 (validation) or 200 (empty results)
        expect([200, 400]).toContain(response.status());
    });
});

// ============== Explore Page Tests ==============

test.describe('Explore Page', () => {
    test('should load explore page', async ({ page }) => {
        await page.goto(`${BASE_URL}/explore`);
        // Should have category pills
        await expect(page.locator('text=/Todos|Música|Gaming/i').first()).toBeVisible({ timeout: 10000 });
    });

    test('should have category filter buttons', async ({ page }) => {
        await page.goto(`${BASE_URL}/explore`);
        // Should have multiple category buttons
        const categoryButtons = page.locator('button:has-text("Música"), button:has-text("Gaming"), button:has-text("Culinária")');
        await expect(categoryButtons.first()).toBeVisible({ timeout: 10000 });
    });

    test('should have trending section', async ({ page }) => {
        await page.goto(`${BASE_URL}/explore`);
        // Should have trending hashtags
        await expect(page.locator('text=/Tendências|trending/i').first()).toBeVisible({ timeout: 10000 });
    });
});

// ============== Feed Page Tests ==============

test.describe('Feed Page', () => {
    test('should load feed page', async ({ page }) => {
        await page.goto(`${BASE_URL}/feed`);
        await expect(page).toHaveTitle(/Kwanza/i);
    });
});

// ============== Mobile Viewport Tests ==============

test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

    test('should show mobile bottom nav on mobile viewport', async ({ page }) => {
        await page.goto(`${BASE_URL}/feed`);
        // Mobile nav should be visible (hidden on md+)
        const mobileNav = page.locator('nav.fixed.bottom-0');
        await expect(mobileNav.first()).toBeVisible({ timeout: 10000 });
    });

    test('should have 5 navigation items in mobile nav', async ({ page }) => {
        await page.goto(`${BASE_URL}/feed`);
        // Should have 5 nav buttons
        const navButtons = page.locator('nav.fixed.bottom-0 button');
        await expect(navButtons).toHaveCount(5, { timeout: 10000 });
    });

    test('should navigate to explore via mobile nav', async ({ page }) => {
        await page.goto(`${BASE_URL}/feed`);
        // Click the Explore button
        const exploreBtn = page.locator('nav.fixed.bottom-0 button[aria-label="Explorar"]');
        await exploreBtn.click();
        await page.waitForURL('**/explore', { timeout: 10000 });
    });
});

// ============== Notification API Tests ==============

test.describe('Notification API', () => {
    test('should reject notifications without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/notifications`);
        expect(response.status()).toBe(401);
    });

    test('should reject unread count without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/notifications/unread-count`);
        expect(response.status()).toBe(401);
    });
});

// ============== Rate Limiting Tests ==============

test.describe('Rate Limiting', () => {
    test('should enforce rate limiting on auth endpoints', async ({ request }) => {
        // Send 12 rapid requests (limit is 10/15min)
        const responses = [];
        for (let i = 0; i < 12; i++) {
            const response = await request.post(`${API_URL}/api/auth/request-otp`, {
                data: { phone: `+244923${String(i).padStart(6, '0')}` },
            });
            responses.push(response.status());
        }
        // At least one should be rate limited (429)
        expect(responses).toContain(429);
    });
});
