# Deploy & Rollback Runbook — Kwanza Stream

## Environments

| Env | Backend | Frontend | DB |
|-----|---------|----------|----|
| **Staging** | Render (kwanza-stream-api) | Vercel (staging branch) | Render Postgres |
| **Production** | Render / Railway | Vercel (main branch) | Managed Postgres |

---

## Staging Deploy

### 1. Push to `main` (auto-deploys via Render)

```bash
git push origin main
```

Render auto-deploys when `apps/server/**` changes. `start.sh` runs `prisma migrate deploy` on startup.

### 2. Manual Deploy (if auto-deploy disabled)

```bash
# On Render dashboard → Manual Deploy → "Deploy latest commit"
# Or via Render CLI:
render deploys create --service kwanza-stream-api
```

### 3. Frontend Staging Deploy

```bash
# Push to staging branch → Vercel auto-deploys
git push origin main:staging
```

---

## Canary Deploy

### 1. Tag the Release

```bash
git tag v0.8.0-beta
git push origin v0.8.0-beta
```

### 2. Promote Staging to Canary

- If using Render: create a second service `kwanza-stream-canary` pointing to the tag
- If using Railway: promote staging → canary via environment clone

### 3. Canary Validation (1-4 hours)

```bash
# Health check
curl https://canary-api.kwanzastream.ao/api/health

# Monitor Sentry for new errors
# Check Render metrics dashboard for CPU/memory
```

---

## Production Deploy

### Prerequisites

- [ ] Canary stable for 24h
- [ ] No P0 Sentry errors
- [ ] All E2E tests pass against canary

### Steps

```bash
# 1. Tag production release
git tag v1.0.0
git push origin v1.0.0

# 2. Render: promote canary to production
# Or: update production service to point to v1.0.0 tag

# 3. Verify
curl https://api.kwanzastream.ao/api/health
```

---

## Rollback Procedures

### Backend Rollback (Render)

```bash
# Option 1: Render Dashboard → Deploys → "Rollback to previous deploy"

# Option 2: Git revert + push
git revert HEAD
git push origin main
```

### Frontend Rollback (Vercel)

```bash
# Vercel Dashboard → Deployments → Previous deploy → "Promote to Production"
```

### Database Rollback (CAUTION)

> ⚠️ Prisma migrations are **forward-only**. To undo a migration:

```bash
# 1. Create a NEW migration that reverts the changes
npx prisma migrate dev --name revert_<migration_name>

# 2. Or restore from backup (see backup-restore-runbook.md)
pg_restore -h <host> -U <user> -d <db> backup_file.dump
```

### Emergency: Full Rollback

```bash
# 1. Scale backend to 0
render services scale kwanza-stream-api --instances 0

# 2. Restore DB from backup
pg_restore -h <host> -U <user> -d <db> --clean latest_backup.dump

# 3. Deploy known-good commit
git checkout v0.7.0  # last known good tag
git push -f origin main

# 4. Scale back up
render services scale kwanza-stream-api --instances 1
```

---

## GitHub Actions Workflows

| Workflow | File | Trigger | What it does |
|----------|------|---------|--------------|
| CI — Server Tests | `.github/workflows/test.yml` | Push/PR to main/staging | Lint + Vitest + Migration check |

### Adding CD (future)

To add continuous deployment, create `.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy Staging
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Render
        run: |
          curl -X POST "$RENDER_DEPLOY_HOOK"
        env:
          RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK }}
```
