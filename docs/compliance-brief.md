# Compliance Brief — Kwanza Stream (BNA / EMIS)

> **Classificação:** CONFIDENCIAL — Uso interno  
> **Última atualização:** 2026-03-04  
> **Responsável:** CTO / Compliance Officer

---

## 1. KYC — Recolha de Dados por Tier

### Tier 0 — Básico (Registo Inicial)
| Campo | Obrigatório | Formato |
|-------|-------------|---------|
| Número de telefone (AO) | ✅ | +244 9XX XXX XXX |
| Código OTP verificado | ✅ | 6 dígitos |

**Limites:** 5.000 Kz/dia, máx 2.000 Kz por transação, sem levantamentos.

### Tier 1 — Verificado (NIF + Selfie)
| Campo | Obrigatório | Formato |
|-------|-------------|---------|
| Tudo do Tier 0 | ✅ | — |
| Nome completo | ✅ | Texto livre |
| NIF (Número de Identificação Fiscal) | ✅ | 10 dígitos |
| Selfie com documento | ✅ | JPEG/PNG, max 5MB |
| Data de nascimento | ✅ | DD/MM/AAAA (≥18 anos) |

**Limites:** 50.000 Kz/dia, máx 20.000 Kz por transação, levantamentos permitidos.

### Tier 2 — Totalmente Verificado (BI)
| Campo | Obrigatório | Formato |
|-------|-------------|---------|
| Tudo do Tier 1 | ✅ | — |
| Bilhete de Identidade (frente + verso) | ✅ | JPEG/PNG, max 5MB cada |
| Comprovativo de residência | ✅ | PDF/JPEG, max 10MB |
| Endereço completo | ✅ | Texto livre |

**Limites:** 500.000 Kz/dia, máx 200.000 Kz por transação, acesso total.

---

## 2. AML — Red Flags & Monitorização

### Bandeiras Vermelhas Automáticas
| Trigger | Acção | Gravidade |
|---------|-------|-----------|
| >10 transações/hora para mesma conta | Bloquear + notificar admin | ALTA |
| Depósito + levantamento imediato (< 5 min) | Flag para revisão manual | MÉDIA |
| Volume diário >80% do limite do tier | Alerta preventivo | BAIXA |
| Múltiplas contas com mesmo IP + device | Flag + investigação | ALTA |
| Padrão de "smurfing" (múltiplas tx < limite) | Algoritmo de detecção | ALTA |
| Transação de/para conta banida | Bloquear automaticamente | CRÍTICA |

### Processo de Escalação
1. **Automático:** Sistema flagra transação → cria entrada na tabela `AuditLog`
2. **Revisão L1:** Support Agent verifica detalhes básicos (< 24h)
3. **Revisão L2:** Financial Admin decide (bloquear/aprovar) (< 48h)
4. **Escalação:** Super Admin + Compliance Officer para casos complexos
5. **Reporte:** Transações suspeitas reportadas ao BNA conforme regulação

---

## 3. Política de Retenção de Dados

| Tipo de Dado | Retenção | Base Legal |
|-------------|----------|------------|
| Transações financeiras | **7 anos** | Lei BNA / AML |
| Audit logs (admin) | **7 anos** | Compliance |
| Dados KYC (documentos) | **5 anos** após encerramento de conta | RGPD-AO equivalente |
| Logs de acesso (auth) | **2 anos** | Segurança |
| Chat messages | **1 ano** | Operacional |
| Webhook event logs | **3 anos** | Reconciliação |

### Eliminação
- Dados pessoais: eliminados após período de retenção via job agendado
- Documentos KYC: encriptados em repouso (AES-256), eliminados com shredding
- Direito ao esquecimento: suportado para dados não-financeiros (financeiros retidos por lei)

---

## 4. Formato de Exportação para BNA

### Exportação de Audit Logs
```
Endpoint: GET /api/admin/audit-logs/export?from=2026-01-01&to=2026-03-31&format=csv
Autenticação: FINANCIAL_ADMIN ou SUPER_ADMIN
```

**Campos CSV:**
```
id,timestamp,admin_id,admin_name,action,target_id,target_type,details,ip_address
```

### Exportação de Transações
```
Endpoint: GET /api/admin/transactions/export?from=2026-01-01&to=2026-03-31&format=csv
```

**Campos CSV:**
```
id,timestamp,user_id,user_phone,type,amount_kz,status,reference,idempotency_key,description
```

### Exportação de Ledger
```
Endpoint: GET /api/admin/ledger/export?from=2026-01-01&to=2026-03-31
```

**Campos CSV:**
```
id,timestamp,transaction_id,account_id,account_type,debit_kz,credit_kz,balance_kz,description
```

---

## 5. Segurança de Cookies, CORS, CSP

### Cookies
| Cookie | Flags | Duração |
|--------|-------|---------|
| `access_token` | `httpOnly`, `secure`, `sameSite=strict`, `path=/` | 15 min |
| `refresh_token` | `httpOnly`, `secure`, `sameSite=strict`, `path=/api/auth` | 7 dias |

### CORS
```
Allowed Origins: FRONTEND_URL (nenhum wildcard em produção)
Credentials: true
Methods: GET, POST, PUT, PATCH, DELETE
```

### CSP (Content Security Policy)
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
connect-src 'self' FRONTEND_URL SOCKET_URL;
font-src 'self' https://fonts.gstatic.com;
media-src 'self' blob:;
object-src 'none';
frame-ancestors 'none';
upgrade-insecure-requests (produção);
```

---

## 6. Rotação de Secrets

| Secret | Rotação | Método |
|--------|---------|--------|
| `JWT_ACCESS_SECRET` | 90 dias | Regenerar + invalidar tokens activos |
| `JWT_REFRESH_SECRET` | 90 dias | Regenerar + forçar re-login |
| `MULTICAIXA_WEBHOOK_SECRET` | 180 dias | Coordenar com EMIS |
| `DATABASE_URL` | 180 dias | Rotação via provider (Neon) |
| `SENTRY_DSN` | Não rotacionar | Estático por projeto |

### Procedimento de Rotação
1. Gerar novo secret
2. Atualizar em GitHub Secrets / env vars do provider
3. Deploy novo código
4. Verificar health check
5. Invalidar secret anterior (após grace period de 24h)

---

## 7. Checklist Pré-Produção

### Obrigatório (P0)
- [ ] Double-entry ledger activado e testado
- [ ] HMAC webhook verification activo para Multicaixa
- [ ] KYC Tier 0 limites enforced
- [ ] Admin RBAC com separação de funções
- [ ] Audit logs exportáveis (CSV)
- [ ] Sentry error tracking activo
- [ ] Backups automáticos da DB (diários)
- [ ] HTTPS obrigatório (sem HTTP)
- [ ] Rate limiting testado com carga
- [ ] Secrets rotacionados (não usar defaults de desenvolvimento)

### Recomendado (P1)
- [ ] Web push notifications activas
- [ ] Monitorização de transações suspeitas (AML flags)
- [ ] Dashboards Grafana com alertas
- [ ] Processo de KYC Tier 1 implementado
- [ ] Documentação de incidentes preparada
