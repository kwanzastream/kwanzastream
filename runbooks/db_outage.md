# Runbook: Incidente de Base de Dados

> **Severidade:** CRÍTICA  
> **On-call:** DevOps / Super Admin  
> **SLA:** Resolução em 1h

---

## Sintomas
- `GET /api/health` retorna `database: "unhealthy"`
- Aplicação retorna 500 em todos os endpoints
- Logs: `PrismaClientKnownRequestError: Can't reach database server`

## Diagnóstico Imediato

### 1. Verificar conectividade
```bash
# Se Neon:
curl https://console.neon.tech/api/v2/projects/<project_id>/endpoints \
  -H "Authorization: Bearer $NEON_API_KEY"

# Se PostgreSQL directo:
psql $DATABASE_URL -c "SELECT 1;"
```

### 2. Verificar health do serviço
```bash
curl https://api.kwanzastream.com/api/health/detailed
```

Resposta esperada (problema):
```json
{
  "status": "degraded",
  "database": "unhealthy",
  "redis": "healthy",
  "uptime": "2h 34m"
}
```

### 3. Verificar logs do servidor
```bash
# Railway
railway logs --project kwanza-stream --service api

# Docker
docker logs kwanza-api --since 30m --tail 200
```

## Resolução por Cenário

### A: Provider temporariamente indisponível (Neon outage)
1. Verificar [Neon Status Page](https://neonstatus.com)
2. Se outage confirmado → activar **modo manutenção**:
   ```bash
   # Definir variável de ambiente
   railway variables set MAINTENANCE_MODE=true
   ```
3. Aguardar resolução do provider
4. Após recovery: desactivar manutenção e verificar dados

### B: Connection pool esgotado
```sql
-- Verificar conexões activas
SELECT count(*) FROM pg_stat_activity WHERE datname = 'kwanza_stream';

-- Matar conexões idle há mais de 10 min
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'kwanza_stream'
  AND state = 'idle'
  AND state_change < NOW() - INTERVAL '10 minutes';
```

### C: Disco cheio / Storage limit
```sql
SELECT pg_size_pretty(pg_database_size('kwanza_stream'));
```

Se >80% do limite:
1. Limpar registos antigos de `OtpCode` (> 24h):
   ```sql
   DELETE FROM "OtpCode" WHERE "createdAt" < NOW() - INTERVAL '24 hours';
   ```
2. Limpar `WebhookEventLog` processados (> 90 dias):
   ```sql
   DELETE FROM "WebhookEventLog" WHERE processed = true AND "createdAt" < NOW() - INTERVAL '90 days';
   ```

### D: Migração falhada
```bash
cd apps/server
npx prisma migrate status
npx prisma migrate resolve --rolled-back <migration_name>
npx prisma migrate deploy
```

## Recuperação de Backup
```bash
# Neon: point-in-time restore via console
# Manual:
pg_restore --dbname=$DATABASE_URL --clean --if-exists backup.dump
```

## Pós-Incidente
- [ ] Confirmar integridade dos dados (reconciliação ledger)
- [ ] Rever logs de transações durante o downtime
- [ ] Documentar root cause no sistema de incidentes
- [ ] Agendar post-mortem se downtime > 30min
