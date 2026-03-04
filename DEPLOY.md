# 🚀 Deploy Guide — Kwanza Stream

## Opção A: Vercel (Frontend) + Render/Railway (Backend)

### 1. Frontend → Vercel

```bash
# No diretório apps/web
npx vercel --prod
```

**Configuração no Vercel Dashboard:**
- Root Directory: `apps/web`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

**Variáveis de ambiente (Vercel → Settings → Environment Variables):**
```
NEXT_PUBLIC_API_URL=https://kwanza-stream-api.onrender.com
```

> O `vercel.json` já reescreve `/api/*` para o backend.

### 2. Backend → Render

**Criar Web Service no Render:**
- Root Directory: `apps/server`
- Dockerfile Path: `./Dockerfile`
- Instance Type: Starter ($7/mês)

**Variáveis de ambiente (Render Dashboard):**
```
DATABASE_URL=postgresql://...  (Render Postgres)
REDIS_URL=rediss://...         (Upstash Redis)
JWT_ACCESS_SECRET=<gerar>
JWT_REFRESH_SECRET=<gerar>
FRONTEND_URL=https://kwanza-stream.vercel.app
MULTICAIXA_WEBHOOK_SECRET=<do Multicaixa>
NODE_ENV=production
PORT=5000
```

**Gerar secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Database → Render Postgres

- **Plano**: Starter ($7/mês)
- Copiar `Internal Database URL` para `DATABASE_URL` no API service

**Aplicar migrations:**
```bash
# No Render Shell ou localmente apontando para DB remoto
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### 4. Redis → Upstash

- Criar conta em upstash.com
- Criar database Redis (free tier: 10K commands/dia)
- Copiar `UPSTASH_REDIS_REST_URL` como `REDIS_URL`

---

## Opção B: Docker Compose (VPS)

Para servers próprios (Hetzner, DigitalOcean, etc.):

```bash
# 1. Copiar .env.staging.example → .env
cp .env.staging.example .env
# Preencher com valores reais

# 2. Subir tudo
docker compose -f docker-compose.staging.yml up -d

# 3. Aplicar migrations
docker exec kwanza-api-staging npx prisma migrate deploy

# 4. Verificar
curl http://localhost:5000/api/health
curl http://localhost:3000
```

**Requisitos do server:**
- 2 vCPU, 2GB RAM mínimo
- Ubuntu 22.04+ com Docker instalado
- Portas: 80, 443 (nginx), 1935 (RTMP)

---

## Checklist Pré-Deploy

- [ ] Gerar JWT secrets (2x)
- [ ] Configurar DATABASE_URL
- [ ] Configurar REDIS_URL (Upstash ou local)
- [ ] Configurar FRONTEND_URL
- [ ] Configurar MULTICAIXA_WEBHOOK_SECRET
- [ ] Aplicar `prisma migrate deploy`
- [ ] Verificar health endpoint: `/api/health`
- [ ] Testar login flow
- [ ] Testar página de leaderboard
- [ ] Verificar rate limiting funciona

## Custos Estimados (Staging)

| Serviço | Provider | Custo |
|---------|----------|-------|
| Frontend | Vercel (free) | $0 |
| Backend | Render Starter | $7/mês |
| Database | Render Postgres | $7/mês |
| Redis | Upstash Free | $0 |
| **Total** | | **$14/mês** |
