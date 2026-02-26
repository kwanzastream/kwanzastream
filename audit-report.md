# 🔍 AUDIT REPORT — KWANZA STREAM

**Date:** 22 February 2026
**Auditor:** Antigravity (CTO-mode)
**Scope:** Full backend + frontend monorepo `kwanza-stream`
**Commit:** Based on current `main` branch state

---

## EXECUTIVE SUMMARY

The Kwanza Stream platform has a **well-structured modular backend** (Express + Prisma + TypeScript) with proper separation of concerns, Zod validation on all endpoints, and a functional JWT+OTP auth flow. The frontend (Next.js 16, shadcn/ui) is feature-complete for MVP with a services layer, protected routes, and real-time chat.

However, **the platform is NOT safe for production deployment.** There are 3 CRITICAL and 4 HIGH severity findings that must be resolved before accepting real money from users. The wallet system has a **double-spend race condition** exploitable by concurrent requests. Payments (Multicaixa Express) and SMS are **100% mock implementations** — no real transactions or OTP delivery occur. JWT secrets have hardcoded fallbacks that are **committed to git history**. There is **zero automated test coverage** and **no rate limiting** on HTTP endpoints, making the system vulnerable to brute-force and abuse.

**Immediate action required:** Fix wallet atomicity (PR #1), remove hardcoded secrets + add rate limits (PR #2), fix webhook signature verification (PR #3), and integrate a real SMS provider (PR #4). Estimated total effort for P0 fixes: **3-4 days** with focused development.

---

## FINDINGS SUMMARY

| ID | Severity | Category | Finding | File(s) | Effort |
|----|----------|----------|---------|---------|--------|
| F-001 | **CRITICAL** | Wallet | Double-spend race condition (TOCTOU) | `walletController.ts:149-180`, `donationController.ts:46-60` | 4h |
| F-002 | **CRITICAL** | Schema | Balance stored as `Float` (floating-point money) | `schema.prisma:55,133,153` | 4h |
| F-003 | **CRITICAL** | Payments | Multicaixa Express is 100% mock | `multicaixa.ts` (entire file) | 16-40h† |
| F-004 | **HIGH** | Security | JWT secrets hardcoded with dev fallbacks | `jwtService.ts:5-6` | 1h |
| F-005 | **HIGH** | Security | `.env` committed to git history | commit `805d40a` | 2h |
| F-006 | **HIGH** | Security | No HTTP rate limiting on any endpoint | `index.ts` | 2h |
| F-007 | **HIGH** | SMS | SMS service is console.log only (mock) | `smsService.ts` (entire file) | 4-8h† |
| F-008 | MEDIUM | Webhook | HMAC signature verification bypassed in dev | `webhookRoutes.ts:11` | 2h |
| F-009 | MEDIUM | Webhook | No idempotency handling (double-processing risk) | `multicaixa.ts:179-225` | 3h |
| F-010 | MEDIUM | Admin | `updateUser` can set `balance` directly without audit trail | `adminController.ts:116-141` | 3h |
| F-011 | MEDIUM | Auth | OTP uses `Math.random()` (not crypto-secure) | `otpService.ts:8` | 0.5h |
| F-012 | MEDIUM | Streaming | `allow_origin: '*'` on media server HTTP | `mediaServer.ts:16` | 0.5h |
| F-013 | MEDIUM | Streaming | `node-media-server` is single-instance, no CDN/VOD | `mediaServer.ts` | 40h+ |
| F-014 | MEDIUM | Testing | Zero automated test coverage | — | 24h |
| F-015 | LOW | Performance | N+1 queries in leaderboard | `donationController.ts:164-181` | 2h |
| F-016 | LOW | Security | Stream keys are static (never expire/rotate) | `schema.prisma:52` | 2h |
| F-017 | LOW | Performance | Chat bans stored in-memory (lost on restart) | `chatService.ts` | 3h |
| F-018 | LOW | Observability | All logging is `console.log/error` (no structured logging) | All files | 4h |
| F-019 | LOW | Config | RTMP secret has hardcoded fallback | `mediaServer.ts:36` | 0.5h |
| F-020 | LOW | Frontend | No consistent error boundaries / loading states | `apps/web/` | 8h |

*† Effort depends on sandbox credential availability*

---

## DETAILED FINDINGS

### F-001 — CRITICAL: Double-Spend Race Condition (TOCTOU)

**Description:** In both `walletController.ts` (withdrawal) and `donationController.ts` (send donation), the user's balance is checked in a separate query BEFORE the transactional deduction. Two concurrent requests can both pass the balance check and result in double-spending.

**Evidence:**

`walletController.ts:149-165`:
```typescript
// CHECK (outside transaction)
const user = await prisma.user.findUnique({ where: { id: userId } });
if (!user || user.balance < amount) { return res.status(400)... }

// 10-20ms gap: another request can pass the check above

// DEDUCT (inside transaction, but check already passed)
const [transaction] = await prisma.$transaction([
    prisma.transaction.create({ ... }),
    prisma.user.update({ where: { id: userId }, data: { balance: { decrement: amount } } }),
]);
```

`donationController.ts:46-60`:
```typescript
// Same pattern: check balance → gap → deduct
const sender = await prisma.user.findUnique({ where: { id: senderId } });
if (sender.balance < amount) { ... }
// ... later ...
await prisma.$transaction([
    // deduct without re-checking
]);
```

**Impact:** An attacker can drain their wallet below zero by sending multiple concurrent requests. With a balance of 1000 Kz, firing 10 simultaneous 1000 Kz withdrawal requests could result in -9000 Kz balance.

**Remediation:** Use `UPDATE ... WHERE balance >= amount` inside the `$transaction` as an atomic check-and-deduct. See PR #1.

**Effort:** 4 hours

---

### F-002 — CRITICAL: Balance Stored as Float

**Description:** The `balance` field on `User`, `amount` on `Donation`, and `amount` on `Transaction` are all `Float` in the Prisma schema. Floating-point arithmetic is fundamentally unsuitable for financial data.

**Evidence:**

`schema.prisma:55`:
```prisma
balance Float @default(0.0)
```

`donationController.ts:92`:
```typescript
data: { balance: { increment: amount * 0.8 } },
// 5000 * 0.8 = 4000.0000000000005 in IEEE 754
```

**Impact:** Accumulated floating-point errors lead to balance discrepancies. Example: after 1000 donations of 5000 Kz with 20% fee, the receiver's balance could be off by several Kz.

**Remediation:** Migrate to `BigInt` storing centimos (1 Kz = 100 centimos). See PR #1.

**Effort:** 4 hours (including migration + backfill)

---

### F-003 — CRITICAL: Payments Are 100% Mock

**Description:** The entire Multicaixa Express integration is a mock. When `NODE_ENV === 'development'` OR no `MULTICAIXA_API_KEY` is set, all payment functions return fake success responses. Unitel Money is referenced in the enum but has zero implementation.

**Evidence:**

`multicaixa.ts:17`:
```typescript
const IS_MOCK = process.env.NODE_ENV === 'development' || !MULTICAIXA_API_KEY;
```

`multicaixa.ts:52-64`:
```typescript
if (IS_MOCK) {
    // Returns fake transactionId and mock payment URL
    return { success: true, transactionId: `MCX-${uuidv4()...}`, ... };
}
```

**Impact:** No real money flows through the platform. Users cannot deposit or withdraw real Kwanzas. The platform cannot generate revenue.

**Remediation:** Obtain sandbox credentials from Multicaixa Express, implement real API calls, verify with end-to-end tests. See implementation plan.

**Effort:** 16-40 hours depending on API complexity and credential access

---

### F-004 — HIGH: JWT Secrets Hardcoded

**Evidence — `jwtService.ts:5-6`:**
```typescript
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
```

**Also — `.env:3-4`:**
```
JWT_SECRET=kwanza-stream-jwt-secret-dev-2024
JWT_REFRESH_SECRET=kwanza-stream-refresh-secret-dev-2024
```

**Impact:** If env vars are ever missing, the server silently falls back to publicly-known secrets. Attackers can forge valid JWTs.

**Remediation:** Remove fallbacks, add fail-fast env validation. See PR #2.

---

### F-005 — HIGH: `.env` Committed to Git History

**Evidence:**
```
git log --all --diff-filter=A -- "*.env"
→ commit 805d40a: initial commit including .env
```

**Impact:** Anyone with repo access (past or present) can see DB credentials, JWT secrets, and RTMP secret from the git history, even though `.gitignore` now excludes `.env`.

**Remediation:**
1. Rotate ALL secrets immediately
2. Run `git filter-repo --path apps/server/.env --invert-paths` to purge from history
3. Force-push the cleaned history
4. Install `git-secrets` pre-commit hook

---

### F-006 — HIGH: No HTTP Rate Limiting

**Evidence — `index.ts:62-69`:**
```typescript
app.use('/api/auth', authRoutes);        // No rate limit
app.use('/api/wallet', walletRoutes);     // No rate limit
app.use('/api/donations', donationRoutes); // No rate limit
```

**Impact:**
- OTP endpoint: 6-digit code can be brute-forced in ~1M requests (no rate limit, no CAPTCHA)
- Wallet endpoints: rapid-fire abuse
- Auth endpoints: credential stuffing

**Remediation:** Add `express-rate-limit` with tiered limits. See PR #2.

---

### F-007 — HIGH: SMS Service is Console.log Only

**Evidence — `smsService.ts:10-16`:**
```typescript
export const sendSms = async (phone: string, message: string) => {
    console.log(`📱 SMS para: ${phone}`);
    console.log(`📱 Mensagem: ${message}`);
    return { success: true, messageId: `dev-${Date.now()}` };
};
```

**Impact:** Real users will never receive OTP codes. Authentication is impossible in production without a real SMS provider.

**Remediation:** Integrate Africa's Talking or Twilio in sandbox mode. See PR #4.

---

### F-008 — MEDIUM: Webhook Signature Bypass in Dev

**Evidence — `webhookRoutes.ts:10-11`:**
```typescript
const verifySignature = (payload: string, signature: string): boolean => {
    if (process.env.NODE_ENV === 'development') return true; // BYPASS
```

**Impact:** In development mode, any unsigned request is accepted as a valid webhook. If `NODE_ENV` is accidentally left as `development` in production, the webhook is completely unprotected.

**Remediation:** Remove the bypass. Use a test webhook secret for dev. See PR #3.

---

### F-009 — MEDIUM: No Webhook Idempotency

**Evidence — `multicaixa.ts:179-225`:** The `processWebhook` function processes every webhook call without checking if the transaction was already completed. A retried webhook from Multicaixa would credit the user's balance multiple times.

**Remediation:** Check `Transaction.status` before processing. Add `idempotencyKey` field. See PR #3.

---

### F-010 — MEDIUM: Admin Can Set Balance Without Audit Trail

**Evidence — `adminController.ts:116-121`:**
```typescript
const { role, isVerified, balance } = req.body;
const updateData: any = {};
if (balance !== undefined) updateData.balance = balance;
// No logging, no audit record, no validation
```

**Impact:** An admin can silently set any user's balance to any value. No record of who made the change, from what value, or why.

**Remediation:** Remove direct `balance` setting from `updateUser`. Create separate audit-logged endpoint for balance adjustments.

---

### F-011 — MEDIUM: OTP Uses `Math.random()`

**Evidence — `otpService.ts:8`:**
```typescript
return Math.floor(100000 + Math.random() * 900000).toString();
```

**Impact:** `Math.random()` is not cryptographically secure. In theory, an attacker who knows the V8 engine state could predict OTP codes.

**Remediation:** Use `crypto.randomInt(100000, 999999)`.

---

### F-015 — LOW: N+1 Queries in Leaderboard

**Evidence — `donationController.ts:164-181`:**
```typescript
const donorsWithDetails = await Promise.all(
    topDonors.map(async (donor) => {
        const user = await prisma.user.findUnique({ where: { id: donor.senderId } });
        return { ... };
    })
);
```

**Impact:** For a leaderboard of 20 donors, this makes 21 DB queries (1 groupBy + 20 individual). Slow under load.

**Remediation:** Use `WHERE id IN (...)` single query instead of N individual lookups.

---

## SPRINT ROADMAP

### Sprint 1 — P0 Blockers (Week 1-2)

| Task | Effort | PR |
|------|--------|----|
| Fix wallet race condition + Float→BigInt migration | 8h | #1 |
| Remove hardcoded secrets + env validation | 2h | #2 |
| Add HTTP rate limiting | 2h | #2 |
| Fix webhook HMAC + idempotency | 5h | #3 |
| Install Vitest + write wallet/auth tests | 8h | #1, #2 |
| Set up CI pipeline (GitHub Actions) | 2h | #1 |
| **Subtotal** | **27h** | |

### Sprint 2 — P1 Security & SMS (Week 3-4)

| Task | Effort | PR |
|------|--------|----|
| SMS provider integration (sandbox) | 8h | #4 |
| Admin audit trail for balance changes | 3h | — |
| Purge `.env` from git history | 2h | — |
| `git-secrets` pre-commit hook | 1h | — |
| OTP crypto-secure random | 0.5h | #4 |
| Expand test coverage (donations, auth) | 8h | — |
| **Subtotal** | **22.5h** | |

### Sprint 3 — P2 Payments & Infra (Week 5-6)

| Task | Effort | PR |
|------|--------|----|
| Multicaixa Express real integration (sandbox) | 16-24h | — |
| Unitel Money integration research | 8h | — |
| Structured logging (Pino) | 4h | — |
| Sentry error tracking | 2h | — |
| **Subtotal** | **30-38h** | |

### Sprint 4 — P2 Streaming & Polish (Week 7-8)

| Task | Effort | PR |
|------|--------|----|
| Streaming CDN evaluation + PoC | 16h | — |
| VOD/replay storage | 8h | — |
| Frontend error boundaries | 8h | — |
| N+1 query fixes | 2h | — |
| Performance monitoring | 4h | — |
| **Subtotal** | **38h** | |

### Total Estimated Effort: **117-125 hours** (~3 weeks full-time, 1 dev)

---

## ENV VARS AUDIT

Current `.env` key names (values redacted):

| Variable | Present | Required for Production |
|----------|---------|------------------------|
| `DATABASE_URL` | ✅ | ✅ |
| `REDIS_URL` | ✅ | ⚠️ Optional |
| `JWT_SECRET` | ✅ (wrong name) | ✅ (should be `JWT_ACCESS_SECRET`) |
| `JWT_REFRESH_SECRET` | ✅ | ✅ |
| `FRONTEND_URL` | ✅ | ✅ |
| `PORT` | ✅ | ✅ |
| `NODE_ENV` | ✅ | ✅ |
| `RTMP_SECRET` | ✅ | ✅ |
| `FFMPEG_PATH` | ✅ | ✅ |
| `MULTICAIXA_API_URL` | ❌ | ✅ |
| `MULTICAIXA_MERCHANT_ID` | ❌ | ✅ |
| `MULTICAIXA_API_KEY` | ❌ | ✅ |
| `MULTICAIXA_WEBHOOK_SECRET` | ❌ | ✅ |
| `SMS_PROVIDER_KEY` | ❌ | ✅ |
| `SENTRY_DSN` | ❌ | ⚠️ Recommended |

> **Note:** `JWT_SECRET` in `.env` doesn't match the code which looks for `JWT_ACCESS_SECRET`. This means the code always falls back to `'dev-access-secret'`.

---

*End of audit report. See `audit-report.json` for machine-readable version.*
