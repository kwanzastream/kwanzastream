# Backup & Restore Runbook — Kwanza Stream

## Backup Strategy

| Component | Method | Frequency | Retention |
|-----------|--------|-----------|-----------|
| **Postgres DB** | Automated managed backups | Daily | 14 days |
| **Redis** | AOF persistence + snapshots | Continuous | 7 days |
| **Media uploads** | Object storage (future) | On upload | Indefinite |

---

## Postgres Backups

### Managed Provider (Render / Railway)

Both Render and Railway provide automatic daily backups with point-in-time recovery.

**Render:**
- Dashboard → Database → Backups tab
- Automatic daily snapshots with 14-day retention
- Manual backup: click "Create Backup"

**Railway:**
- Dashboard → Database → Backups
- Automatic daily snapshots with 7-day retention

### Manual Backup (if self-hosted)

```bash
# Full backup (custom format, compressed)
pg_dump -h <host> -U <user> -d kwanza_staging \
  --format=custom --compress=9 \
  --file="backup_$(date +%Y%m%d_%H%M%S).dump"

# Schema only (useful for migration debugging)
pg_dump -h <host> -U <user> -d kwanza_staging \
  --schema-only --file="schema_$(date +%Y%m%d).sql"
```

### Automated Cron (if self-hosted)

```bash
# /etc/cron.d/kwanza-backup
# Daily at 03:00 UTC
0 3 * * * postgres pg_dump -h localhost -U kwanza -d kwanza_stream \
  --format=custom --compress=9 \
  --file=/backups/kwanza_$(date +\%Y\%m\%d).dump

# Cleanup backups older than 14 days
0 4 * * * find /backups/ -name "kwanza_*.dump" -mtime +14 -delete
```

---

## Restore Procedures

### Restore from Managed Provider

**Render:** Dashboard → Database → Backups → Select backup → "Restore"

**Railway:** Dashboard → Database → Backups → Select point → "Restore"

### Manual Restore

```bash
# 1. Stop the API server first
render services scale kwanza-stream-api --instances 0

# 2. Restore (--clean drops existing tables first)
pg_restore -h <host> -U <user> -d kwanza_staging \
  --clean --if-exists --no-owner \
  backup_20260302.dump

# 3. Verify schema matches Prisma expectations
npx prisma migrate status

# 4. Restart API
render services scale kwanza-stream-api --instances 1

# 5. Test health endpoint
curl https://staging-api.example.com/api/health
```

### Restore Validation Checklist

- [ ] `/api/health` returns 200 with `database: connected`
- [ ] User count matches expected (query: `SELECT COUNT(*) FROM "User"`)
- [ ] No pending migrations (`npx prisma migrate status`)
- [ ] Transactions table has no orphaned records
- [ ] Auth flow works (login → token → /me)

---

## Redis Backups

Redis is configured with AOF persistence (`--appendonly yes` in docker-compose).

### Managed Provider

- Render/Railway Redis includes automatic persistence
- Data survives restarts automatically

### Manual Redis Backup

```bash
# Trigger manual RDB snapshot
redis-cli -h <host> -a <password> BGSAVE

# Copy RDB file
scp user@server:/data/dump.rdb ./redis_backup_$(date +%Y%m%d).rdb
```

### Redis Restore

```bash
# Stop Redis
redis-cli -h <host> SHUTDOWN NOSAVE

# Replace RDB file
cp redis_backup.rdb /data/dump.rdb

# Restart Redis
redis-server --appendonly yes
```

---

## Disaster Recovery

| Scenario | RTO | RPO | Procedure |
|----------|-----|-----|-----------|
| DB corruption | 30 min | Up to 24h | Restore from last daily backup |
| Accidental data deletion | 15 min | Up to 24h | Restore from backup + selective query |
| Full infrastructure failure | 2 hours | Up to 24h | Re-deploy via `render.yaml` + restore DB |
| Redis data loss | 5 min | Minutes | Redis auto-recovers from AOF; if lost, app regenerates cache |
