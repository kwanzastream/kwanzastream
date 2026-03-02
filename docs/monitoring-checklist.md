# Monitoring Checklist — 24h Staging Stability

## Overview

After deploying to staging, monitor the system for **24 hours** with no code changes. This validates that the platform is stable under normal conditions before tagging a beta release.

---

## What to Monitor

### 1. Error Tracking (Sentry)

| Check | Expected | P0 if |
|-------|----------|-------|
| New errors in last 24h | 0 unresolved | Any unhandled exception |
| Error rate | < 0.1% of requests | > 1% of requests |
| Error types | No new error types | New crash-level error |

**How:** Sentry Dashboard → Issues → Filter: `is:unresolved environment:staging`

### 2. Health Endpoint

```bash
# Run every 5 minutes (or use UptimeRobot / Better Uptime)
curl -s https://staging-api.example.com/api/health | jq .

# Expected response:
# { "status": "ok", "uptime": ..., "database": { "status": "connected" }, "redis": { "status": "connected" } }
```

| Check | Expected | P0 if |
|-------|----------|-------|
| Status | `ok` | `degraded` for > 5 min |
| DB latency | < 50ms | > 500ms |
| Redis status | `connected` | `error` for > 2 min |

### 3. Resource Usage (Render / Railway Dashboard)

| Metric | Expected | P0 if |
|--------|----------|-------|
| CPU usage | < 50% average | > 80% sustained |
| Memory (RSS) | < 256MB | > 512MB (memory leak) |
| Response time (P95) | < 500ms | > 2000ms |
| Restart count | 0 | Any unexpected restart |

### 4. Database Connections

```sql
-- Check active connections (run via psql or DB dashboard)
SELECT count(*) FROM pg_stat_activity WHERE datname = 'kwanza_staging';
```

| Check | Expected | P0 if |
|-------|----------|-------|
| Active connections | < 20 | > 50 (connection leak) |
| Idle connections | < 10 | > 30 |

### 5. Logs

```bash
# Check for error patterns in last 24h
# On Render: Dashboard → Service → Logs
# Look for:
grep -i "error\|fatal\|unhandled\|crash" logs.txt
```

| Pattern | Expected | P0 if |
|---------|----------|-------|
| `FATAL` | 0 | Any occurrence |
| `Unhandled Rejection` | 0 | Any occurrence |
| `SIGTERM` / `SIGINT` | Only during deploys | Outside of deploys |
| `Database error` | 0 | Recurring pattern |

---

## 24h Timeline

| Hour | Action |
|------|--------|
| 0 | Deploy to staging, verify `/api/health` returns 200 |
| 0.5 | Run E2E tests (`npx playwright test`) |
| 1 | Check Sentry for any immediate errors |
| 4 | Check resource metrics (CPU/memory) |
| 8 | Midday check: Sentry + health + metrics |
| 12 | Check DB connections + Redis status |
| 18 | Evening check: full dashboard review |
| 24 | **Final review — if all green, create beta tag** |

---

## Go / No-Go Criteria

### ✅ GO (create beta tag)

- [ ] Health endpoint: 200 for 24h continuous
- [ ] Sentry: 0 unresolved P0 errors
- [ ] CPU/Memory: within thresholds
- [ ] DB connections: no leaks
- [ ] No unexpected restarts
- [ ] E2E tests pass

### ❌ NO-GO (fix before re-attempting)

- Any P0 error in Sentry
- Health endpoint returning 503
- Memory usage > 512MB (indicates leak)
- DB connection count growing over time
- Any data inconsistency found

---

## After 24h — Create Beta Tag

```bash
# Only if ALL go criteria pass
git tag v0.8.0-beta
git push origin v0.8.0-beta

echo "🎉 Beta tag created! Ready for closed beta."
```
