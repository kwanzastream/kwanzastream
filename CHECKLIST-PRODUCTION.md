# CHECKLIST-PRODUCTION.md — Kwanza Stream Go-Live Gates

> **Última atualização:** 2026-03-04  
> **Não lançar produção com items P0 em aberto.**

---

## P0 — Obrigatório para Dinheiro Real

### 🔐 Segurança Financeira
- [ ] Double-entry ledger activado → `npx prisma migrate deploy`
- [ ] Reconciliação ledger returns `ok: true` → `GET /api/admin/ledger/reconcile`
- [ ] HMAC webhook verification activo para Multicaixa → verificar `MULTICAIXA_WEBHOOK_SECRET` definido
- [ ] Idempotency de webhooks testada (enviar mesmo webhook 2x → segunda retorna `already_processed`)
- [ ] Transações atómicas: correr `npm test` (wallet.test.ts PASS)

### 👤 KYC/AML
- [ ] KYC Tier 0 limites activos (5000 Kz/dia, sem levantamentos)
- [ ] KYC gate testes passam → `npx vitest run tests/kyc-gate.test.ts`
- [ ] Endpoint de limites por tier funcional → `GET /api/kyc/tiers`

### 🛡️ Admin & Auditoria
- [ ] Admin RBAC activo (4 roles com permissões granulares)
- [ ] Audit logs exportáveis → `GET /api/admin/audit-logs/export?format=csv`
- [ ] Separação de funções: FINANCIAL_ADMIN não pode banir users

### 📱 Experiência Core
- [ ] Mobile bottom nav com 5 tabs + badge de notificações
- [ ] Donation overlay ligado ao Socket.io → enviar salo e ver animação
- [ ] Chat funcional com rate limiting → enviar >20 msg/min e verificar bloqueio

### 🧪 Testes & Staging
- [ ] Staging environment provisionado e acessível
- [ ] `npm run build` passa sem erros (server + web)
- [ ] Testes unitários: `npx vitest run` → todos PASS
- [ ] Playwright E2E: top 10 fluxos cobertos → `npx playwright test`
- [ ] Sentry recebe erros → trigger `GET /api/debug-sentry` no staging

### 🏗️ Infra & Segurança
- [ ] HTTPS obrigatório (sem HTTP)
- [ ] Cookies: `httpOnly`, `secure`, `sameSite=strict`
- [ ] Secrets rotacionados (JWT_ACCESS_SECRET ≠ default dev)
- [ ] `DATABASE_URL` não contém localhost em produção
- [ ] Backups automáticos configurados (Neon PITR ou pg_dump cron)
- [ ] Rate limiting testado (10 req auth/15min, 30 req financial/min)

---

## Comandos de Verificação

```bash
# 1. Build completo
cd apps/server && npx tsc --noEmit && echo "✅ Server OK"
cd apps/web && npm run build && echo "✅ Web OK"

# 2. Testes unitários
cd apps/server && npx vitest run

# 3. Migration status
cd apps/server && npx prisma migrate status

# 4. Verificar variáveis de ambiente
node -e "
  const required = ['DATABASE_URL','JWT_ACCESS_SECRET','JWT_REFRESH_SECRET','MULTICAIXA_WEBHOOK_SECRET','FRONTEND_URL','SENTRY_DSN'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) { console.error('❌ Missing:', missing); process.exit(1); }
  else console.log('✅ All env vars set');
"

# 5. Health check
curl -f https://api.kwanzastream.com/api/health/detailed || echo "❌ Health check failed"

# 6. Security scan rápido
grep -r "ignoreBuildErrors" apps/web/next.config* && echo "❌ DANGER" || echo "✅ No ignoreBuildErrors"
grep -r "localStorage.*refresh" apps/web/lib/ && echo "❌ DANGER" || echo "✅ No localStorage tokens"

# 7. Ledger reconciliação (após staging deploy)
curl -X GET https://staging-api.kwanzastream.com/api/admin/ledger/reconcile \
  -H "Cookie: access_token=$ADMIN_TOKEN"
```

---

## P1 — Recomendado antes de Beta Público
- [ ] Clips system implementado
- [ ] Web push notifications activas
- [ ] Chat moderation UI completa
- [ ] Explore page com trending
- [ ] Creator studio com analytics
- [ ] OpenAPI spec publicada

## P2 — Nice-to-have
- [ ] Direct messaging
- [ ] Events system
- [ ] Multi-language
