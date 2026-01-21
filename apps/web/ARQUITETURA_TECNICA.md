# Arquitetura Técnica - Kwanza Stream

## Diagrama de Arquitetura (4 Fases)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FASE 1: AUTENTICAÇÃO & BACKEND                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Frontend (Next.js)                Backend (Node.js/Express)                 │
│  ┌──────────────────┐             ┌──────────────────────────┐              │
│  │ Login/Signup UI  │────────────>│ Auth Routes              │              │
│  │ (Já implementado)│ HTTP/HTTPS  │ - POST /auth/signup      │              │
│  └──────────────────┘             │ - POST /auth/login       │              │
│                                   │ - POST /auth/verify-otp  │              │
│  User Auth Flow                   └──────────────────────────┘              │
│  1. Telefone + OTP                                                           │
│  2. JWT token gerado               ┌──────────────────────────┐              │
│  3. Armazenado em localStorage     │ User Routes              │              │
│                                    │ - GET /users/:id         │              │
│                                    │ - PUT /users/:id/profile │              │
│                                    │ - GET /users/:id/balance │              │
│                                    └──────────────────────────┘              │
│                                                                               │
│                          PostgreSQL Database                                │
│                    ┌────────────────────────────────┐                       │
│                    │ users table                    │                       │
│                    │ - id, phone, email, password   │                       │
│                    │ - balance, status, created_at  │                       │
│                    │ - profile_data (JSON)          │                       │
│                    └────────────────────────────────┘                       │
│                                                                               │
│                    ┌────────────────────────────────┐                       │
│                    │ JWT Secret (Redis)             │                       │
│                    │ Session management             │                       │
│                    └────────────────────────────────┘                       │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

INTEGRAÇÃO: Twilio/Afrika's Talking (SMS OTP)
```

---

## Diagrama de Arquitetura (Fase 2: Usuarios & Wallet)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              FASE 2: USUÁRIOS, WALLET & SISTEMA SALO                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Frontend (Next.js)              Backend (Node.js/Express)                   │
│  ┌─────────────────────┐        ┌──────────────────────────────────┐       │
│  │ Feed Social         │        │ User Service                     │       │
│  │ - Posts             │──────> │ - POST /users/:id/follow         │       │
│  │ - Followers         │ API    │ - GET /users/:id/followers       │       │
│  │ - Create Post       │        │ - DELETE /users/:id/follow/:id   │       │
│  └─────────────────────┘        └──────────────────────────────────┘       │
│                                                                               │
│  ┌─────────────────────┐        ┌──────────────────────────────────┐       │
│  │ Wallet Section      │        │ Wallet Service                   │       │
│  │ - Balance           │──────> │ - GET /wallet/balance            │       │
│  │ - Send Salo         │ API    │ - POST /wallet/send-salo         │       │
│  │ - History           │        │ - GET /wallet/transactions       │       │
│  │ - Deposit/Withdraw  │        │ - POST /wallet/deposit (MCX prep)│       │
│  └─────────────────────┘        └──────────────────────────────────┘       │
│                                                                               │
│  ┌─────────────────────┐        ┌──────────────────────────────────┐       │
│  │ Salo System UI      │        │ Gamification Service             │       │
│  │ - Gift buttons      │──────> │ - POST /salo/send                │       │
│  │ - Leaderboard       │ API    │ - GET /salo/leaderboard          │       │
│  │ - Badges            │        │ - GET /salo/user-stats           │       │
│  └─────────────────────┘        │ - POST /salo/claim-badge         │       │
│                                 └──────────────────────────────────┘       │
│                                                                               │
│                         Database & Cache Layer                              │
│     ┌──────────────────────────────┐   ┌──────────────────────────┐       │
│     │ PostgreSQL                   │   │ Redis (Cache & Real-time)│       │
│     │ - users                      │   │ - leaderboards:salo      │       │
│     │ - followers                  │   │ - user:balance           │       │
│     │ - transactions               │   │ - sessions               │       │
│     │ - salo_history               │   │ - badge_cache            │       │
│     │ - user_badges                │   │ - notifications:queue    │       │
│     └──────────────────────────────┘   └──────────────────────────┘       │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

INTEGRAÇÕES: AWS S3 (Profile pics), Email service
```

---

## Diagrama de Arquitetura (Fase 3: Streaming & Chat)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│           FASE 3: STREAMING AO VIVO & CHAT EM TEMPO REAL                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  INGESTÃO DE STREAM                                                          │
│  ┌────────────────┐        ┌─────────────────┐        ┌──────────────┐    │
│  │ Creator        │ RTMP   │ Nginx + FFmpeg  │ HLS    │ Cloudflare   │    │
│  │ OBS/Streamlabs │──────> │ (Transcodificar)│──────> │ Stream/Mux   │    │
│  │                │        │                 │        │ (CDN Global) │    │
│  └────────────────┘        └─────────────────┘        └──────────────┘    │
│                                                              │               │
│                                                              │ HLS/DASH      │
│  VIEWERS (Frontend)                                          │               │
│  ┌────────────────┐                                          │               │
│  │ Player Video   │<─────────────────────────────────────────┘               │
│  │ - Playback     │                                                          │
│  │ - Quality pick │                                                          │
│  │ - Fullscreen   │                                                          │
│  └────────────────┘                                                          │
│                                                                               │
│  ┌────────────────┐        ┌──────────────────────────────┐                │
│  │ Chat Widget    │        │ WebSocket Server (Socket.io) │                │
│  │ - Send message │────────│ - Real-time message relay    │                │
│  │ - User list    │ WS     │ - Moderation                 │                │
│  │ - Badges       │        │ - Spam detection             │                │
│  └────────────────┘        └──────────────────────────────┘                │
│                                                │                             │
│  ┌────────────────┐                          │                             │
│  │ Viewer Counter │<─────────────────────────┘                             │
│  │ - Live count   │ WS Events                                               │
│  │ - Peak history │                                                         │
│  └────────────────┘                                                         │
│                                                                               │
│                           Chat & Streaming API                              │
│            ┌────────────────────────────────────────────┐                  │
│            │ POST /stream/start                         │                  │
│            │ POST /stream/end                           │                  │
│            │ GET /stream/:id (metadata, viewers)        │                  │
│            │ POST /chat/message                         │                  │
│            │ WebSocket /chat/:stream-id                 │                  │
│            │ GET /stream/:id/viewers/count              │                  │
│            └────────────────────────────────────────────┘                  │
│                                                                               │
│                         Database & Cache                                    │
│   ┌─────────────────────┐  ┌──────────────────────────┐                   │
│   │ PostgreSQL          │  │ Redis                    │                   │
│   │ - stream_sessions   │  │ - active:viewers:count   │                   │
│   │ - chat_messages     │  │ - chat:messages:queue    │                   │
│   │ - stream_metadata   │  │ - leaderboard:live       │                   │
│   │ - dvr (recordings)  │  │ - notifications:realtime │                   │
│   └─────────────────────┘  └──────────────────────────┘                   │
│                                                                               │
│  MODO RÁDIO: Apenas áudio (MP3/AAC via HLS)                                │
│  DVR: Recordings automáticos em AWS S3                                      │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

INTEGRAÇÕES: Cloudflare Stream/Mux, Firebase (push notifications), AWS S3
```

---

## Diagrama de Arquitetura (Fase 4: Pagamentos & Admin)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│         FASE 4: PAGAMENTOS, ANALYTICS & OPERAÇÕES EM PRODUÇÃO               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  PAYMENT GATEWAY                                                             │
│  ┌─────────────────────┐                                                    │
│  │ Frontend Wallet     │                                                    │
│  │ - Deposit MCX       │     ┌──────────────────────────────────┐          │
│  │ - Deposit USSD      │────>│ Payment Service                  │          │
│  │ - Withdraw request  │ API │ - Validate transaction           │          │
│  │ - Balance           │     │ - Generate USSD codes            │          │
│  └─────────────────────┘     │ - Webhook handlers               │          │
│                              └──────────────────────────────────┘          │
│                                      │                                      │
│      ┌────────────────────────────────┼────────────────────────────┐       │
│      │                                │                            │       │
│      ▼                                ▼                            ▼       │
│  ┌─────────────┐            ┌─────────────────┐         ┌──────────────┐ │
│  │ Multicaixa  │            │ USSD Gateway    │         │ Bank Transfer│ │
│  │ API         │            │ (Unitel Money)  │         │ API          │ │
│  │ - Debit     │            │                 │         │              │ │
│  │ - Express   │            │ SMS/USSD codes  │         └──────────────┘ │
│  └─────────────┘            └─────────────────┘                          │
│                                                                             │
│  TRANSACTION LEDGER (Auditável)                                            │
│  ┌──────────────────────────────────────────────┐                         │
│  │ PostgreSQL: transactions table                │                        │
│  │ - All payments: deposit, withdraw, salo      │                        │
│  │ - Status: pending, completed, failed         │                        │
│  │ - Timestamp + user + amount + reference      │                        │
│  │ - IMMUTABLE (append-only)                    │                        │
│  └──────────────────────────────────────────────┘                        │
│                                                                             │
│  ADMIN DASHBOARD                                                           │
│  ┌─────────────────────────────────────────────┐                         │
│  │ Admin Panel (Web UI)                         │                        │
│  │ - User management                            │                        │
│  │ - Approve/reject withdrawals                 │                        │
│  │ - Moderation queue                           │                        │
│  │ - Ban/suspend users                          │                        │
│  │ - Revenue reports                            │                        │
│  │ - KPIs dashboard                             │                        │
│  └─────────────────────────────────────────────┘                         │
│              │                                                             │
│              ▼                                                             │
│  ┌────────────────────────────────┐                                       │
│  │ Admin API Routes               │                                       │
│  │ - POST /admin/users/:id/ban    │                                       │
│  │ - POST /admin/withdraw/:id/approve  │                                  │
│  │ - GET /admin/reports/revenue   │                                       │
│  │ - POST /admin/moderation/review│                                       │
│  └────────────────────────────────┘                                       │
│                                                                             │
│  ANALYTICS & MONITORING                                                    │
│  ┌────────────────────────────────┐  ┌──────────────────────────┐        │
│  │ Prometheus + Grafana           │  │ Sentry (Error Tracking)  │        │
│  │ - DAU, MAU, ARPU               │  │ - Runtime errors         │        │
│  │ - Churn rate                   │  │ - Performance issues     │        │
│  │ - Revenue trends               │  │ - Stack traces           │        │
│  │ - Server health                │  │ - Release tracking       │        │
│  │ - API latency                  │  └──────────────────────────┘        │
│  └────────────────────────────────┘                                       │
│                                                                             │
│  SECURITY & COMPLIANCE                                                     │
│  ┌────────────────────────────────────────────────┐                      │
│  │ - Rate limiting per user/IP                    │                      │
│  │ - Anti-fraud rules engine                      │                      │
│  │ - Audit logs (PostgreSQL)                      │                      │
│  │ - Data encryption at rest (PII)                │                      │
│  │ - HTTPS/TLS for all connections                │                      │
│  │ - KYC verification for large withdrawals       │                      │
│  └────────────────────────────────────────────────┘                      │
│                                                                             │
│  DEVOPS & PRODUCTION                                                       │
│  ┌────────────────────────────────────────────────┐                      │
│  │ Deployment Pipeline                            │                      │
│  │ GitHub → CI/CD (GitHub Actions) → Staging → Prod │                   │
│  │                                                │                      │
│  │ Infrastructure                                 │                      │
│  │ - Docker containers (API, worker, scheduler)  │                      │
│  │ - Load balancer (nginx)                        │                      │
│  │ - Database backup (AWS RDS)                    │                      │
│  │ - Redis persistence                            │                      │
│  │ - CDN (Cloudflare)                             │                      │
│  └────────────────────────────────────────────────┘                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

INTEGRAÇÕES: Multicaixa, USSD Gateway, Sentry, Prometheus, Firebase
```

---

## Fluxo de Dados - Exemplo Completo (Viewer envia Salo)

```
1. VIEWER ABRE APP
   ├─> Frontend carrega (Next.js)
   ├─> Check localStorage para JWT
   └─> Se válido, fetch /users/me

2. VIEWER ASSISTE LIVE
   ├─> Frontend -> GET /stream/:id (metadata)
   ├─> HLS stream via CDN Cloudflare
   ├─> WebSocket conecta ao /chat/:stream-id
   └─> Vê contador de viewers em tempo real (Redis)

3. VIEWER ENVIA SALO
   ├─> Frontend: POST /salo/send
   │   {
   │     "to_creator_id": "...",
   │     "stream_id": "...",
   │     "salo_type": "pãozinho", // 50 Kz
   │     "quantity": 5
   │   }
   │
   ├─> Backend validações:
   │   ├─ User possui 250 Kz? (5 x 50)
   │   ├─ Creator existe?
   │   ├─ Stream ativo?
   │   └─ Não é self-salo?
   │
   ├─> Database transação:
   │   ├─ INSERT transactions table (ledger auditável)
   │   ├─ UPDATE users SET balance = balance - 250 (viewer)
   │   ├─ UPDATE users SET balance = balance + 235 (creator) [15 taxa plataforma]
   │   └─ INSERT salo_history
   │
   ├─> Redis updates:
   │   ├─ leaderboard:live:salo +250
   │   ├─ user:balance:cached atualizado
   │   └─ notifications:queue <- novo evento
   │
   ├─> WebSocket broadcast:
   │   ├─ Todos viewers veem "João enviou 5x Pãozinho!"
   │   ├─ Som/animação de Salo
   │   ├─ Creator recebe notificação
   │   └─ Leaderboard atualiza em tempo real
   │
   ├─> Firebase Push Notification:
   │   └─ Creator recebe: "João enviou 5x Pãozinho! +235 Kz"
   │
   └─> Response ao viewer: "Salo enviado! Obrigado!"

4. CREATOR VÊ NO DASHBOARD
   ├─> GET /dashboard/earnings (últimas 24h)
   ├─> Vê +235 Kz de ganho
   ├─> Vê "Top Doadores" com João em 1º lugar
   └─> Pode sacar em tempo real via MCX/USSD

LATÊNCIA ESPERADA: <200ms do clique ao aparecimento na tela
```

---

## Stack Técnico Final

### Frontend
```
Next.js 16
React 19
TypeScript
Tailwind CSS v4
Shadcn/UI (50+ components)
Socket.io-client (WebSocket)
SWR (Data fetching)
```

### Backend
```
Node.js 20
Express.js
TypeScript
PostgreSQL 15
Redis 7
JWT (jsonwebtoken)
Bcrypt (password hashing)
Socket.io (WebSocket)
Agenda (Job scheduling)
```

### Infraestrutura
```
Docker / Docker Compose
GitHub Actions (CI/CD)
AWS (S3, RDS, ElastiCache)
Cloudflare (CDN, Stream)
Nginx (Load balancer)
Prometheus + Grafana (Monitoring)
Sentry (Error tracking)
```

### Integrações Externas
```
Twilio/Afrika's Talking (SMS OTP)
Multicaixa API (Payments)
USSD Gateway (Payments)
Firebase Cloud Messaging (Push)
Cloudflare Stream OR Mux (Video delivery)
AWS S3 (File storage)
```

---

## Conclusão

Esta arquitetura é:
- **Escalável:** Microservices-ready com Redis caching
- **Segura:** JWT + OTP + audit logs + rate limiting
- **Resiliente:** Database replication, CDN, redundancy
- **Performante:** <2s latência, WebSocket real-time
- **Monitorável:** Prometheus, Grafana, Sentry
- **Operacional:** Docker, CI/CD, auto-backups

Pronta para suportar 10K+ viewers simultâneos.
