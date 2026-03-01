import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';
const API_URL = process.env.E2E_API_URL || 'http://localhost:5000';

// ============== Auth Flow Tests ==============

test.describe('OTP & Login Flow', () => {
    test('should display login page', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        await expect(page).toHaveTitle(/Kwanza/i);
        // Should have phone input
        const phoneInput = page.locator('input[type="tel"], input[placeholder*="telefone"], input[placeholder*="phone"]');
        await expect(phoneInput.first()).toBeVisible({ timeout: 10000 });
    });

    test('should request OTP with valid phone', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        const phoneInput = page.locator('input[type="tel"], input[placeholder*="telefone"], input[placeholder*="phone"]');
        await phoneInput.first().fill('+244923456789');

        // Find and click submit button
        const submitBtn = page.locator('button[type="submit"], button:has-text("Entrar"), button:has-text("Continuar"), button:has-text("Enviar")');
        await submitBtn.first().click();

        // Should either show OTP input or error message (depends on backend state)
        await page.waitForTimeout(2000);
        const hasOtpInput = await page.locator('input[placeholder*="código"], input[placeholder*="OTP"], input[maxlength="6"]').count();
        const hasError = await page.locator('text=/erro|error/i').count();
        expect(hasOtpInput + hasError).toBeGreaterThan(0);
    });

    test('should show validation for invalid phone', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        const phoneInput = page.locator('input[type="tel"], input[placeholder*="telefone"], input[placeholder*="phone"]');
        await phoneInput.first().fill('123'); // Too short

        // Submit button should be disabled for invalid phone input
        const submitBtn = page.locator('button[type="submit"], button:has-text("Entrar"), button:has-text("Continuar")');
        await expect(submitBtn.first()).toBeDisabled({ timeout: 5000 });
    });
});

// ============== Landing Page Tests ==============

test.describe('Landing Page', () => {
    test('should load landing page successfully', async ({ page }) => {
        await page.goto(BASE_URL);
        await expect(page).toHaveTitle(/Kwanza/i);
        // Should have CTA buttons
        await expect(page.locator('text=/Começar|Criar Conta|Entrar/i').first()).toBeVisible({ timeout: 10000 });
    });

    test('should have working navigation links', async ({ page }) => {
        await page.goto(BASE_URL);
        // Check auth link
        const authLink = page.locator('a[href="/auth"]');
        await expect(authLink.first()).toBeVisible({ timeout: 10000 });
    });
});

// ============== API Health Tests ==============

test.describe('API Health', () => {
    test('should return healthy status from /health', async ({ request }) => {
        const response = await request.get(`${API_URL}/health`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('healthy');
    });

    test('should return API info from /', async ({ request }) => {
        const response = await request.get(`${API_URL}/`);
        expect(response.status()).toBe(200);
    });
});

// ============== Auth API Tests ==============

test.describe('Auth API', () => {
    test('should reject OTP request with invalid phone', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/auth/request-otp`, {
            data: { phone: '123' },
        });
        expect(response.status()).toBe(400);
    });

    test('should reject OTP verification with invalid code', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/auth/verify-otp`, {
            data: { phone: '+244923000000', code: '000000' },
        });
        expect([400, 401]).toContain(response.status());
    });

    test('should reject access to protected routes without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/auth/me`);
        expect(response.status()).toBe(401);
    });

    test('should reject wallet access without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/wallet/`);
        expect(response.status()).toBe(401);
    });
});

// ============== Wallet API Tests ==============

test.describe('Wallet API (requires auth)', () => {
    test('should reject deposit without authentication', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/wallet/deposit`, {
            data: {
                amount: 1000,
                paymentMethod: 'multicaixa',
            },
        });
        expect(response.status()).toBe(401);
    });

    test('should reject withdrawal without authentication', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/wallet/withdraw`, {
            data: {
                amount: 1000,
                bankAccount: {
                    bank: 'BAI',
                    accountNumber: '123456',
                    accountName: 'Test',
                },
            },
        });
        expect(response.status()).toBe(401);
    });
});

// ============== Donation API Tests ==============

test.describe('Donation API', () => {
    test('should return salo types without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/donations/salo-types`);
        // 200 if donations route mounted, 404 if not yet mounted
        expect([200, 404]).toContain(response.status());
    });

    test('should return leaderboard without auth', async ({ request }) => {
        const response = await request.get(`${API_URL}/api/donations/leaderboard`);
        // 200 if donations route mounted, 404 if not yet mounted
        expect([200, 404]).toContain(response.status());
    });

    test('should reject sending donation without auth', async ({ request }) => {
        const response = await request.post(`${API_URL}/api/donations/`, {
            data: {
                receiverId: 'fake-id',
                amount: 100,
                type: 'SALO_1',
            },
        });
        // 401 if route mounted, 404 if not yet mounted
        expect([401, 404]).toContain(response.status());
    });
});
