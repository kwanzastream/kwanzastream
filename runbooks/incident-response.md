# 🚨 Incident Response Runbook — Kwanza Stream

## Contactos de Emergência

| Pessoa | Role | Contacto |
|--------|------|----------|
| [TEU NOME] | Founder / Lead Dev | [TEU TELEFONE] |

## Severidades

| Nível | Descrição | Tempo de Resposta |
|-------|-----------|-------------------|
| **P0 — Crítico** | Plataforma down, perda de dados, falha de pagamentos | < 30 min |
| **P1 — Alto** | Feature principal não funciona (streams, chat, auth) | < 2 horas |
| **P2 — Médio** | Bug que afecta UX mas tem workaround | < 24 horas |
| **P3 — Baixo** | Bug cosmético, melhoria | Próximo sprint |

## Checklist de Incidente

### 1. Detectar
- [ ] Verificar Sentry: `https://sentry.io/organizations/kwanza-stream/`
- [ ] Verificar Render logs: Dashboard → Service → Events/Logs
- [ ] Verificar health: `curl https://kwanza-stream-api.onrender.com/api/health/detailed`

### 2. Diagnosticar
```powershell
# Ver logs do último deploy
# Render Dashboard → Service → Events

# Verificar DB
# Render Dashboard → Database → Metrics

# Verificar Redis
# Render Dashboard → Redis → Metrics
```

### 3. Mitigar

**Rollback rápido (< 5 min):**
```powershell
# Reverter para o último commit funcional
git revert HEAD
git push origin main
# Render auto-deploya em ~2 min
```

**Modo manutenção (< 1 min):**
- Render Dashboard → Service → Suspend (desliga o servidor)
- O frontend mostra a página de manutenção automaticamente

### 4. Resolver
```powershell
# Criar branch de hotfix
git checkout -b hotfix/nome-do-bug
# Fix, test, push
git push origin hotfix/nome-do-bug
# Merge via PR (ou directo se P0)
git checkout main
git merge hotfix/nome-do-bug
git push origin main
```

### 5. Post-Mortem

Template (escrever em 24h):
```
## Incidente: [Título]
- **Data:** [quando]
- **Duração:** [quanto tempo]
- **Impacto:** [quantos users afectados]
- **Root cause:** [o quê]
- **Fix:** [como resolvemos]
- **Prevenção:** [o que mudamos para não repetir]
```

## Cenários Comuns

### Base de dados não responde
1. Render Dashboard → Database → verificar se está running
2. Se limite de conexões excedido → restart do service API
3. Se DB crashed → contactar Render support

### Deploy falha
1. Verificar build logs no Render
2. `git log -1` — verificar último commit
3. Reverter se necessário: `git revert HEAD && git push`

### Pagamento não credita
1. Verificar logs: `[Multicaixa] Webhook received`
2. Verificar transacção no DB: `SELECT * FROM "Transaction" WHERE reference = 'XXX'`
3. Se status stuck em PENDING → investigar webhook, fix manual se necessário
4. **NUNCA** creditar manualmente sem LedgerEntry correspondente

### WebSocket disconnects em massa
1. Verificar se o servidor reiniciou (Render auto-restart)
2. Os clients reconnectam automaticamente (15 tentativas, backoff)
3. Se persistir → verificar Redis connection
