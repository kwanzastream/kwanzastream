// ============================================================
// verify_project_state.mjs — Automated Project Health Check
// Run: node scripts/verify_project_state.mjs
// Returns JSON report of missing/problematic items.
// ============================================================

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const SERVER = join(ROOT, 'apps', 'server');
const WEB = join(ROOT, 'apps', 'web');

const results = {
    timestamp: new Date().toISOString(),
    checks: [],
    missing: [],
    warnings: [],
    errors: [],
    summary: { pass: 0, fail: 0, warn: 0 },
};

function check(name, fn) {
    try {
        const result = fn();
        if (result.ok) {
            results.checks.push({ name, status: 'PASS', detail: result.detail });
            results.summary.pass++;
        } else {
            results.checks.push({ name, status: 'FAIL', detail: result.detail });
            results.missing.push({ name, detail: result.detail });
            results.summary.fail++;
        }
    } catch (err) {
        results.checks.push({ name, status: 'ERROR', detail: err.message });
        results.errors.push({ name, error: err.message });
        results.summary.fail++;
    }
}

function warn(name, detail) {
    results.checks.push({ name, status: 'WARN', detail });
    results.warnings.push({ name, detail });
    results.summary.warn++;
}

// ============== File Existence Checks ==============

const REQUIRED_FILES = [
    // P0 Financial
    ['apps/server/src/services/ledgerService.ts', 'Double-entry ledger service'],
    ['apps/server/src/middleware/hmacVerify.ts', 'HMAC webhook verification'],
    ['apps/server/src/middleware/kycGate.ts', 'KYC/AML tier enforcement'],
    ['apps/server/src/middleware/rbacMiddleware.ts', 'Admin RBAC middleware'],
    ['docs/compliance-brief.md', 'BNA compliance documentation'],

    // Models & Schema
    ['apps/server/prisma/schema.prisma', 'Prisma schema'],

    // Tests
    ['apps/server/tests/ledger.test.ts', 'Ledger unit tests'],
    ['apps/server/tests/webhook-hmac.test.ts', 'Webhook HMAC tests'],
    ['apps/server/tests/kyc-gate.test.ts', 'KYC gate tests'],
    ['apps/server/tests/wallet.test.ts', 'Wallet unit tests'],
    ['apps/server/tests/webhook.test.ts', 'Webhook integration tests'],
    ['apps/web/tests/kwanza-e2e.spec.ts', 'E2E test spec'],

    // Runbooks
    ['runbooks/ledger_inconsistency.md', 'Ledger inconsistency runbook'],
    ['runbooks/db_outage.md', 'Database outage runbook'],
    ['runbooks/stream_degradation.md', 'Stream degradation runbook'],

    // Infra
    ['.github/workflows/test.yml', 'CI workflow'],
    ['.github/workflows/deploy-staging.yml', 'Staging deploy workflow'],
    ['CHECKLIST-PRODUCTION.md', 'Production go-live checklist'],

    // PWA
    ['apps/web/app/manifest.ts', 'PWA manifest'],

    // Realtime
    ['packages/shared-types/events.ts', 'Socket.io event schemas'],
    ['docs/realtime.md', 'Realtime contract docs'],
];

for (const [file, desc] of REQUIRED_FILES) {
    check(`File: ${desc}`, () => {
        const exists = existsSync(join(ROOT, file));
        return { ok: exists, detail: exists ? file : `Missing: ${file}` };
    });
}

// ============== Schema Checks ==============

check('Prisma: LedgerEntry model', () => {
    const schema = readFileSync(join(SERVER, 'prisma', 'schema.prisma'), 'utf-8');
    const hasLedger = schema.includes('model LedgerEntry');
    return { ok: hasLedger, detail: hasLedger ? 'LedgerEntry model present' : 'LedgerEntry model MISSING from schema' };
});

check('Prisma: WebhookEventLog model', () => {
    const schema = readFileSync(join(SERVER, 'prisma', 'schema.prisma'), 'utf-8');
    const hasWebhook = schema.includes('model WebhookEventLog');
    return { ok: hasWebhook, detail: hasWebhook ? 'WebhookEventLog model present' : 'WebhookEventLog model MISSING' };
});

check('Prisma: AdminRole enum', () => {
    const schema = readFileSync(join(SERVER, 'prisma', 'schema.prisma'), 'utf-8');
    const hasRole = schema.includes('enum AdminRole');
    return { ok: hasRole, detail: hasRole ? 'AdminRole enum present' : 'AdminRole enum MISSING' };
});

check('Prisma: KYC fields on User', () => {
    const schema = readFileSync(join(SERVER, 'prisma', 'schema.prisma'), 'utf-8');
    const hasKyc = schema.includes('kycTier');
    return { ok: hasKyc, detail: hasKyc ? 'kycTier field present on User' : 'kycTier field MISSING from User' };
});

// ============== Security Pattern Checks ==============

check('Security: No ignoreBuildErrors', () => {
    const configPath = join(WEB, 'next.config.mjs');
    if (!existsSync(configPath)) return { ok: false, detail: 'next.config.mjs not found' };
    const content = readFileSync(configPath, 'utf-8');
    const dangerous = content.includes('ignoreBuildErrors');
    return { ok: !dangerous, detail: dangerous ? '❌ ignoreBuildErrors found in next.config' : 'Clean' };
});

check('Security: No localStorage refresh tokens', () => {
    try {
        const output = execSync('grep -r "localStorage.*refresh" apps/web/lib/ apps/web/hooks/ 2>/dev/null || true', { cwd: ROOT, encoding: 'utf-8' });
        const found = output.trim().length > 0;
        return { ok: !found, detail: found ? `❌ Found: ${output.trim()}` : 'Clean — httpOnly cookies only' };
    } catch {
        return { ok: true, detail: 'Clean (grep returned no results)' };
    }
});

check('PWA: manifest.json exists', () => {
    const hasManifestTs = existsSync(join(WEB, 'app', 'manifest.ts'));
    const hasManifestJson = existsSync(join(WEB, 'public', 'manifest.json'));
    return { ok: hasManifestTs || hasManifestJson, detail: `manifest.ts: ${hasManifestTs}, manifest.json: ${hasManifestJson}` };
});

// ============== Build Checks ==============

check('Server: TypeScript compiles', () => {
    try {
        execSync('npx tsc --noEmit', { cwd: SERVER, encoding: 'utf-8', stdio: 'pipe' });
        return { ok: true, detail: 'tsc --noEmit passed' };
    } catch (err) {
        return { ok: false, detail: `TypeScript errors: ${err.stderr?.substring(0, 500) || err.message}` };
    }
});

// ============== Env Var Template Check ==============

check('Env: .env.example exists', () => {
    const exists = existsSync(join(SERVER, '.env.example'));
    return { ok: exists, detail: exists ? '.env.example present' : '.env.example MISSING' };
});

check('Env: Required vars in .env.example', () => {
    const envPath = join(SERVER, '.env.example');
    if (!existsSync(envPath)) return { ok: false, detail: '.env.example not found' };
    const content = readFileSync(envPath, 'utf-8');
    const required = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
    const missing = required.filter(v => !content.includes(v));
    return { ok: missing.length === 0, detail: missing.length ? `Missing vars: ${missing.join(', ')}` : 'All required vars documented' };
});

// ============== Report ==============

console.log(JSON.stringify(results, null, 2));

// Exit code based on failures
if (results.summary.fail > 0) {
    console.error(`\n❌ ${results.summary.fail} checks failed, ${results.summary.pass} passed, ${results.summary.warn} warnings`);
    process.exit(1);
} else {
    console.log(`\n✅ All ${results.summary.pass} checks passed (${results.summary.warn} warnings)`);
}
