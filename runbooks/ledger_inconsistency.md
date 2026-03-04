# Runbook: Inconsistência no Ledger

> **Severidade:** CRÍTICA  
> **On-call:** Financial Admin / Super Admin  
> **SLA:** Resolução em 2h

---

## Sintomas
- Dashboard financeiro mostra totais que não batem
- `GET /api/admin/ledger/reconcile` retorna `ok: false`
- Utilizador reporta saldo errado

## Diagnóstico

### 1. Verificar reconciliação
```bash
curl -X GET https://api.kwanzastream.com/api/admin/ledger/reconcile \
  -H "Cookie: access_token=$TOKEN"
```

**Resposta esperada (problema):**
```json
{
  "ok": false,
  "discrepancies": [
    {
      "accountId": "user-uuid-123",
      "walletBalance": 500000,
      "ledgerBalance": 450000,
      "diff": 50000
    }
  ]
}
```

### 2. Investigar transações do utilizador
```sql
-- Últimas 20 transações do utilizador
SELECT id, type, status, amount, "createdAt"
FROM "Transaction"
WHERE "userId" = 'user-uuid-123'
ORDER BY "createdAt" DESC
LIMIT 20;

-- Entradas de ledger correspondentes
SELECT le.id, le."transactionId", le.debit, le.credit, le.balance, le.description
FROM "LedgerEntry" le
WHERE le."accountId" = 'user-uuid-123'
ORDER BY le."createdAt" DESC
LIMIT 20;
```

### 3. Verificar transações sem ledger entries
```sql
-- Transações COMPLETED sem entradas de ledger (pré-migração)
SELECT t.id, t.type, t.amount, t."createdAt"
FROM "Transaction" t
LEFT JOIN "LedgerEntry" le ON le."transactionId" = t.id
WHERE t.status = 'COMPLETED'
  AND le.id IS NULL
ORDER BY t."createdAt" DESC;
```

## Resolução

### Cenário A: Transações pré-migração sem ledger entries
```bash
# Executar script de backfill (cria ledger entries retroactivas)
node scripts/backfill-ledger.mjs
```

### Cenário B: Transação falhada que atualizou saldo mas não criou ledger
```sql
-- Corrigir saldo manualmente (APENAS com aprovação de 2 admins)
BEGIN;
  UPDATE "User" SET balance = <ledger_balance> WHERE id = '<userId>';
  -- Registar a correção no audit log
  INSERT INTO "AuditLog" ("id", "adminId", "action", "targetId", "targetType", "details", "createdAt")
  VALUES (gen_random_uuid(), '<admin_id>', 'APPROVE_WITHDRAWAL', '<userId>', 'User',
    '{"correction": "balance_adjustment", "oldBalance": <old>, "newBalance": <new>}'::jsonb, NOW());
COMMIT;
```

### Cenário C: Double-spend detectado
1. **Bloquear** a conta imediatamente: `POST /api/admin/users/{id}/ban`
2. **Exportar** transações da conta: `GET /api/admin/transactions?userId={id}&format=csv`
3. **Reportar** ao Compliance Officer
4. **Documentar** no sistema de incidentes

## Prevenção
- Monitorizar o endpoint de reconciliação a cada 6h (cron job)
- Alertar no Grafana se `discrepancies.length > 0`
- Rever código de transações atómicas em cada PR que toque no wallet
