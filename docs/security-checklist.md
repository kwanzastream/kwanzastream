# 🔐 Security Checklist — Kwanza Stream

**Last updated:** 26 February 2026

## ✅ Completed (via PRs)

- [x] **F-001**: Wallet race condition fixed — atomic `UPDATE WHERE balance >= amount`
- [x] **F-002**: Balance migrated from `Float` → `BigInt` centimos
- [x] **F-004**: JWT hardcoded fallbacks removed — fail-fast env validation
- [x] **F-006**: HTTP rate limiting added (auth: 10/15min, financial: 30/min, general: 200/15min)
- [x] **F-008**: Webhook HMAC verification — dev bypass removed
- [x] **F-009**: Webhook idempotency — duplicate processing prevented
- [x] **F-010**: Admin `updateUser` can no longer set `balance` directly
- [x] **F-011**: OTP uses `crypto.randomInt()` instead of `Math.random()`
- [x] **F-019**: RTMP hardcoded secret fallback removed

## 🚨 Immediate Actions Required (Manual)

### 1. Purge `.env` from Git History
```bash
# Install git-filter-repo (pip install git-filter-repo)
git filter-repo --path apps/server/.env --invert-paths --force
git push --force-with-lease --all
```

### 2. Rotate ALL Secrets
```bash
# Generate new secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Update in .env: JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
# Update in .env: RTMP_SECRET, MULTICAIXA_WEBHOOK_SECRET
```

### 3. Install `git-secrets` Pre-Commit Hook
```bash
# Install git-secrets
git secrets --install
git secrets --register-aws  # catches AWS keys pattern
# Add custom patterns
git secrets --add 'kwanza.*secret'
git secrets --add 'password\s*='
```

### 4. Enforce HTTPS
- Configure reverse proxy (nginx/Caddy) with TLS
- Add `Strict-Transport-Security` header (already via Helmet, but needs HTTPS first)

### 5. Add Audit Trail for Admin Actions
- Create `AuditLog` model in Prisma schema
- Log all admin actions (updateUser, banUser, approveWithdrawal, etc.)
- Include: adminId, action, targetId, before/after values, timestamp, IP

### 6. Stream Key Rotation
- Add API endpoint: `POST /api/users/rotate-stream-key`
- Auto-rotate on security events (password reset, suspicious activity)
