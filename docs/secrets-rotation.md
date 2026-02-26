# 🔑 Secrets Rotation Guide — Kwanza Stream

## Secret Inventory

| Secret | Env Var | Rotation Impact |
|--------|---------|-----------------|
| JWT Access Secret | `JWT_ACCESS_SECRET` | All active sessions invalidated (users must re-login) |
| JWT Refresh Secret | `JWT_REFRESH_SECRET` | All refresh tokens invalidated |
| RTMP Secret | `RTMP_SECRET` | Active streams disconnected |
| Multicaixa Webhook Secret | `MULTICAIXA_WEBHOOK_SECRET` | Must update at MCX dashboard too |
| Database URL | `DATABASE_URL` | Requires DB password reset + deployment |
| Redis URL | `REDIS_URL` | Requires Redis AUTH reset |

## How to Rotate

### JWT Secrets (recommended: every 90 days)

```bash
# 1. Generate new secrets
NEW_ACCESS=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
NEW_REFRESH=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# 2. Update .env on server
echo "JWT_ACCESS_SECRET=$NEW_ACCESS" >> .env.new
echo "JWT_REFRESH_SECRET=$NEW_REFRESH" >> .env.new

# 3. Invalidate all existing refresh tokens (DB cleanup)
psql $DATABASE_URL -c "UPDATE \"RefreshToken\" SET \"revoked\" = true WHERE \"revoked\" = false;"

# 4. Deploy new .env and restart server
# (all users will need to re-login on next request)
```

### RTMP Secret

```bash
# 1. Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Update .env: RTMP_SECRET=<new value>
# 3. Restart server (active streams will disconnect, streamers must reconnect)
```

### Multicaixa Webhook Secret

```bash
# 1. Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Update .env: MULTICAIXA_WEBHOOK_SECRET=<new value>
# 3. Update the same secret in Multicaixa Express merchant dashboard
# 4. Restart server
```

## Schedule

| Frequency | Secrets |
|-----------|---------|
| Every 90 days | JWT_ACCESS_SECRET, JWT_REFRESH_SECRET |
| Every 180 days | RTMP_SECRET |
| On incident | ALL secrets |
| On team member departure | ALL secrets |
