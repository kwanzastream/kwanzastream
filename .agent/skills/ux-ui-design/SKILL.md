---
name: UX/UI Design Sénior — Kwanza Stream 2026
description: Agente orquestrador de UX/UI Design Sénior para a plataforma Kwanza Stream. Cobre análise completa, plano de execução e implementação profissional para 4 contextos (Visitante, Autenticado, Creator Studio, Admin Panel).
---

# 🎨 UX/UI Design Sénior — Kwanza Stream 2026

> **Missão**: Criar, manter e evoluir o sistema de design e todas as experiências de UI da plataforma Kwanza Stream — a primeira plataforma angolana de live streaming, construída com Next.js, React 19, Tailwind CSS 4, shadcn/ui, Express, Prisma e PostgreSQL.

---

## FASE 1 — ANÁLISE COMPLETA DA PLATAFORMA

### A) Mapeamento de Páginas por Contexto

#### 1. VISITANTE (não autenticado)

| Rota | Estado | Descrição |
|------|--------|-----------|
| `/` | ✅ Existe | Landing page com hero, live feed, features, Salo showcase, CTA, footer |
| `/auth` | ✅ Existe | Página unificada de login/registro (32KB, completa) |
| `/auth/login` | ✅ Existe | Login separado |
| `/auth/registro` | ✅ Existe | Registro separado |
| `/auth/recuperar` | ✅ Existe | Recuperação de password |
| `/auth/verificar-email` | ✅ Existe | Verificação de email |
| `/explore` | ✅ Existe | Explorar streams e creators |
| `/watch` | ✅ Existe | Página de assistir stream (player + chat read-only) |
| `/watch/[id]` | ✅ Existe | Stream específica |
| `/u/[username]` | ✅ Existe | Perfil público do creator |
| `/categories` | ✅ Existe | Categorias de streams |
| `/categories/[slug]` | ✅ Existe | Streams por categoria |
| `/help` | ✅ Existe | Centro de ajuda |
| `/ajuda` | ✅ Existe | Ajuda em português |
| `/terms` | ✅ Existe | Termos de uso |
| `/legal` | ✅ Existe | Páginas legais |
| `/lite` | ✅ Existe | Versão lite (baixa largura de banda) |
| `/status` | ✅ Existe | Status da plataforma |
| `/creator/[username]` | ❌ Em Falta | Perfil público expandido do creator (VODs, schedule, redes sociais) |
| `/streams` | ❌ Em Falta | Grid de streams ao vivo com filtros por categoria |

#### 2. AUTENTICADO

| Rota | Estado | Descrição |
|------|--------|-----------|
| `/feed` | ✅ Existe | Feed personalizado com streams dos seguidos + recomendações |
| `/explore` | ✅ Existe | Explorar por categoria, trending, novos creators |
| `/watch/[id]` | ✅ Existe | Player completo, chat interativo |
| `/notifications` | ✅ Existe | Notificações em tempo real |
| `/wallet` | ✅ Existe | Saldo, histórico de transações |
| `/settings` | ✅ Existe | Perfil, preferências, segurança |
| `/search` | ✅ Existe | Pesquisa de creators, streams, categorias |
| `/profile` | ✅ Existe | Perfil do utilizador |
| `/messages` | ✅ Existe | Mensagens diretas |
| `/subscriptions` | ✅ Existe | Subscrições |
| `/leaderboard` | ✅ Existe | Ranking |
| `/clips` | ✅ Existe | Clips |
| `/vods` | ✅ Existe | VODs |
| `/eventos` | ✅ Existe | Eventos |
| `/report` | ✅ Existe | Reportar conteúdo |
| `/convites` | ✅ Existe | Convites |
| `/onboarding` | ✅ Existe | Onboarding de novos utilizadores |
| `/browse` | ❌ Em Falta | Explorar por categoria com UI dedicada (diferente de /explore) |
| `/home` | ❌ Em Falta | Alias para /feed com recomendações personalizadas |

#### 3. CREATOR STUDIO (`/studio`)

| Rota | Estado | Descrição |
|------|--------|-----------|
| `/studio` | ✅ Existe | Dashboard principal (14.8KB — stats, gráficos, resumo) |
| `/studio/live` | ✅ Existe | Configurações de stream ao vivo |
| `/studio/lives` | ✅ Existe | Histórico de lives |
| `/studio/ganhos` | ✅ Existe | Ganhos e receitas |
| `/studio/comunidade` | ✅ Existe | Gestão de comunidade |
| `/studio/configuracoes` | ✅ Existe | Configurações do canal |
| `/studio/eventos` | ✅ Existe | Eventos do creator |
| `/studio/analytics` | ❌ Em Falta | Analytics detalhado (viewers, horas, crescimento) |
| `/studio/salos` | ❌ Em Falta | Histórico de doações, top donors, gestão de alertas |
| `/studio/wallet` | ❌ Em Falta | Saldo, saques, histórico financeiro, KYC |
| `/studio/channel` | ❌ Em Falta | Personalização do canal (banner, bio, schedule) |
| `/studio/kyc` | ❌ Em Falta | Upload de documentos, status de verificação |
| `/studio/stream` | ❌ Em Falta | Configuração detalhada (chave RTMP, título, categoria, thumbnail) |

#### 4. ADMIN PANEL (`/admin`)

| Rota | Estado | Descrição |
|------|--------|-----------|
| `/admin` | ✅ Existe | Overview dashboard (15.3KB — DAU, streams, volume financeiro) |
| `/admin/financeiro` | ✅ Existe | Relatórios financeiros |
| `/admin/moderacao` | ✅ Existe | Moderação de conteúdo |
| `/admin/sistema` | ✅ Existe | Configurações do sistema |
| `/admin/users` | ❌ Em Falta | Gestão de utilizadores (lista, filtros, ban/suspend) |
| `/admin/streams` | ❌ Em Falta | Gestão de streams ao vivo + histórico |
| `/admin/kyc` | ❌ Em Falta | Queue de KYC para aprovar/rejeitar |
| `/admin/settings` | ❌ Em Falta | Feature flags, tiers de Salos, taxas |

---

### B) Design System — Estado Atual e Definições

#### Paleta de Cores (oklch — já implementada em `globals.css`)

```
CORE:
  --background:    oklch(0.07 0.005 260)   → #0A0A0F (dark base)
  --foreground:    oklch(0.97 0 0)          → quase branco
  --primary:       oklch(0.63 0.26 25)      → Vermelho vibrante (bandeira Angola)
  --secondary:     oklch(0.85 0.18 85)      → Dourado/Amarelo (bandeira Angola)
  --accent:        oklch(0.55 0.2 250)      → Azul cool
  --success:       oklch(0.65 0.25 142)     → Verde (live indicators)
  --destructive:   oklch(0.5 0.2 25)        → Vermelho escuro (erros)
  --muted:         oklch(0.22 0.005 260)    → Cinza escuro
  --border:        oklch(0.18 0.005 260)    → Bordo subtil

SUPERFÍCIES (hierarquia de profundidade):
  --surface-0: oklch(0.07 ...) → Fundo de página
  --surface-1: oklch(0.10 ...) → Cards, painéis
  --surface-2: oklch(0.13 ...) → Cards elevados, sidebars
  --surface-3: oklch(0.16 ...) → Hover states, cards ativos
  --surface-4: oklch(0.20 ...) → Inputs, superfícies interativas
```

#### Tipografia (já configurada)
- **Sans**: Inter, Geist, system-ui (definido em `@theme inline`)
- **Mono**: Geist Mono
- **Headings**: tracking negativo progressivo (h1: -0.025em, h2: -0.02em, h3: -0.015em)
- **Font features**: cv02, cv03, cv04, cv11

#### O que FALTA no Design System

1. **Display Font**: Falta uma font expressiva para títulos hero (recomendação: **Syne** ou **Plus Jakarta Sans** via Google Fonts)
2. **Escala tipográfica formal**: Não há escala definida (xs, sm, base, lg, xl, 2xl, etc.) com line-heights optimizados para pt-AO
3. **Tokens de espaçamento**: Falta sistema 4px/8px documentado
4. **Variantes por contexto**:
   - Visitante: paleta mais "marketing" (gradients mais vibrantes, cores quentes)
   - Creator Studio: paleta mais "ferramenta profissional" (surfaces neutras, accent menos intenso)
   - Admin: paleta funcional, informação densa
5. **Componentes de estado missing**:
   - Empty states: existe `empty-state.tsx` mas falta padronização
   - Error boundaries: existe `error.tsx` e `global-error.tsx` mas falta componente de erro inline
   - Success feedback: falta padrão de sucesso (toast existe mas falta inline)

#### Componentes Existentes (57 primitivos shadcn/ui + 24 custom)

**Primitivos shadcn/ui** (todos customizados para dark theme):
accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button-group, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input-group, input-otp, input, item, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip, use-mobile, use-toast

**Custom Components**:
beta-feedback, chat-moderation-panel, chat-reactions, cookie-consent, creator-dashboard, creator-revenue, donation-alert-overlay, empty-state, error-toast, feed-components, hls-player, language-switcher, live-feed, loading-skeleton, mobile-nav, native-app-init, navbar, notification-bell, offline-banner, otp-cooldown-timer, salo-alert-overlay, salo-system, theme-provider, wallet-section

---

### C) Problemas Críticos de UX Identificados

#### 1. First-Time User Experience (FTUE)
- **Problema**: Landing page vai direto ao conteúdo sem explicar o valor único da plataforma para novos visitantes angolanos
- **Solução**: Adicionar hero interativo com preview de streams ao vivo, testimonials de creators angolanos, e "3-step value proposition" antes do CTA
- **Prioridade**: P0

#### 2. Navegação Inconsistente
- **Problema**: Mobile nav aponta para `/stream` (Criar) mas não há fluxo claro de "começar a streamer"
- **Problema**: Sidebar desktop não existe — apenas navbar top + mobile bottom nav
- **Solução**: Implementar sidebar colapsável no desktop para contextos autenticados, manter bottom nav no mobile
- **Prioridade**: P1

#### 3. Fluxo de Doação "Salos" — Fricção
- **Problema**: `salo-system.tsx` (8.4KB) existe mas aparece apenas na landing page como showcase, não integrado no stream player
- **Solução**: Integrar Salo widget no chat do stream com botão flutuante, seleção rápida de tier, e confirmação em 1 tap
- **Prioridade**: P0

#### 4. Chat em Tempo Real
- **Problema**: Hook `use-chat.ts` (3.1KB) existe mas latência percebida não é tratada (no optimistic updates visíveis)
- **Solução**: Implementar optimistic UI para mensagens de chat, skeleton para conexão, auto-scroll com "new messages" indicator
- **Prioridade**: P1

#### 5. Onboarding de Streamers
- **Problema**: Falta fluxo guiado para converter utilizador em streamer (KYC, configuração de chave RTMP, teste de stream)
- **Solução**: Wizard de 4 passos: Configurar Perfil → Upload KYC → Testar Stream → Go Live
- **Prioridade**: P2

#### 6. Studio Dashboard — Incompleto
- **Problema**: Faltam 5 sub-páginas do Creator Studio (analytics, salos, wallet, channel, kyc)
- **Solução**: Implementar todas as páginas com dados reais do backend que já tem rotas (wallet, donations, streams)
- **Prioridade**: P2

#### 7. Admin Panel — Mínimo
- **Problema**: Admin só tem 3 sub-páginas funcionais, falta gestão de users, streams, KYC queue
- **Solução**: Expandir com componentes de tabela, filtros, ações em massa
- **Prioridade**: P3

#### 8. Copyright e Branding
- **Problema**: Footer diz "© 2025" — deve ser "© 2026"
- **Prioridade**: Trivial

---

## FASE 2 — PLANO DE EXECUÇÃO DETALHADO

### 1. Design System Foundation

#### 1.1 Tokens Adicionais (adicionar a `globals.css`)

```css
:root {
  /* ============== TYPOGRAPHY SCALE (pt-AO optimized) ============== */
  --text-xs:    0.75rem;    /* 12px — captions, badges */
  --text-sm:    0.875rem;   /* 14px — secondary text, labels */
  --text-base:  1rem;       /* 16px — body text */
  --text-lg:    1.125rem;   /* 18px — emphasized body */
  --text-xl:    1.25rem;    /* 20px — card titles */
  --text-2xl:   1.5rem;     /* 24px — section titles */
  --text-3xl:   1.875rem;   /* 30px — page titles */
  --text-4xl:   2.25rem;    /* 36px — hero subtitles */
  --text-5xl:   3rem;       /* 48px — hero titles */
  --text-6xl:   3.75rem;    /* 60px — landing hero */
  --text-7xl:   4.5rem;     /* 72px — landing hero desktop */
  --text-8xl:   6rem;       /* 96px — display */

  /* Line heights optimized for Portuguese text (longer words) */
  --leading-tight:    1.2;
  --leading-snug:     1.35;
  --leading-normal:   1.5;
  --leading-relaxed:  1.625;
  --leading-loose:    1.8;

  /* ============== SPACING (4px base) ============== */
  --space-0:  0;
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* ============== CONTEXT ACCENTS ============== */
  --studio-accent: oklch(0.55 0.18 250);  /* Azul profissional para Creator Studio */
  --admin-accent:  oklch(0.6 0.15 280);   /* Purple para Admin Panel */
  --live-indicator: oklch(0.65 0.25 142);  /* Verde vibrante para LIVE */
  --salo-bronze:   oklch(0.65 0.12 60);   /* 50 Kz */
  --salo-silver:   oklch(0.75 0.02 0);    /* 200 Kz */
  --salo-gold:     oklch(0.85 0.18 85);   /* 1.000 Kz */
  --salo-diamond:  oklch(0.6 0.2 250);    /* 5.000 Kz */
  --salo-legend:   oklch(0.63 0.26 25);   /* 10.000 Kz */
  
  /* ============== ANIMATION ============== */
  --duration-fast:    150ms;
  --duration-normal:  200ms;
  --duration-slow:    300ms;
  --duration-slower:  500ms;
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

  /* ============== Z-INDEX SCALE ============== */
  --z-base:     0;
  --z-dropdown: 10;
  --z-sticky:   20;
  --z-overlay:  30;
  --z-modal:    40;
  --z-toast:    50;
  --z-tooltip:  60;
}
```

#### 1.2 Componentes Primitivos a Criar/Melhorar

| Componente | Estado | Acção |
|------------|--------|-------|
| StreamCard | ❌ Novo | Card de stream com thumbnail, live badge, viewer count, creator avatar |
| CategoryPill | ❌ Novo | Pill/chip para categorias com ícone (gaming, música, futebol, etc.) |
| CreatorAvatar | ❌ Novo | Avatar com ring colorido quando ao vivo, badge de KYC tier |
| SaloButton | ❌ Novo | Botão flutuante para enviar Salos com seleção rápida de tier |
| LiveBadge | ❌ Novo | Badge pulsante de "AO VIVO" com dot animado |
| StatCard | ❌ Novo | Card de estatística com ícone, label, valor, e trend arrow |
| EmptyState | ✅ Melhorar | Adicionar variantes por contexto (sem streams, sem seguidores, etc.) |
| SearchBar | ❌ Novo | Componente de pesquisa com autocomplete, filtros por tipo |
| SidebarNav | ❌ Novo | Sidebar colapsável para desktop (studio + admin contextos) |
| BottomSheet | ❌ Novo | Sheet mobile-native para ações (enviar Salo, opções de stream) |
| KYCBadge | ❌ Novo | Badge de tier de verificação (0/1/2) com cores distintas |
| WalletCard | ❌ Novo | Card de saldo com ações rápidas (carregar, sacar) |

---

### 2. Estrutura de Páginas — Especificações Detalhadas

#### VISITANTE

**`/` — Landing Page** (EXISTENTE — melhorar)
- Hero: stream em destaque com preview ao vivo (não apenas gradient estático)
- Top creators carousel com scroll horizontal
- Categorias: Gaming 🎮, Música 🎵, Futebol ⚽, Kuduro 💃, Comédia 😂
- Social proof: contadores reais da API (não mock)
- CTA: "Começar Agora" → `/auth`

**`/streams` — Grid de Streams** (NOVO)
- Grid responsivo (1 col mobile, 2 tablet, 3-4 desktop)
- Filtros: categoria, idioma, viewer count
- Ordenar por: viewers, mais recentes, trending
- Live badge com viewer count
- Lazy load com skeleton cards

**`/stream/[username]` — Stream Page Pública** (EXISTENTE — renomear de `/watch`)
- Player HLS com controles customizados
- Chat read-only para visitantes com CTA "Criar conta para interagir"
- Info do canal: avatar, nome, categoria, viewer count, followers
- Barra lateral: streams relacionadas
- CTA flutuante no mobile: "Criar Conta Grátis"

**`/creator/[username]` — Perfil Público** (NOVO)
- Header: banner + avatar + nome + bio + botão seguir (disabled para visitantes)
- Tabs: Ao Vivo | VODs | Schedule | Sobre
- Grid de VODs com thumbnails
- Schedule semanal
- Links de redes sociais
- CTA: "Criar conta para seguir"

**`/login` — Login** (EXISTENTE em `/auth`)
- OTP por telefone (primário para Angola)
- Email como fallback
- "Entrar com..." → futuro OAuth

**`/register` — Registro** (EXISTENTE em `/auth`)
- Escolha de username
- Tipo de conta (viewer vs. creator)
- Termos de uso
- OTP verificação

#### AUTENTICADO

**`/home` ou `/feed` — Feed Personalizado** (EXISTENTE)
- Secção "A seguir — Ao Vivo Agora" (horizontal scroll)
- Feed vertical de streams recomendadas
- Quick actions: carregar wallet, ver notificações
- Pull-to-refresh no mobile

**`/browse` ou `/explore` — Explorar** (EXISTENTE)
- Categorias em grid com ícones
- Trending streams
- Novos creators com "follow" rápido
- Filtro por idioma (pt-AO, en)

**`/stream/[username]` — Stream Completa** (MELHORAR)
- Player com controles completos (qualidade, PiP, fullscreen)
- Chat interativo com emojis, stickers, Salos
- Botão Salo flutuante com dropdown de tiers
- Painel de info do streamer (follow, subscribe, share)
- Tab de "Top Supporters" com ranking

**`/notifications` — Notificações** (EXISTENTE)
- Tabs: Todos | Streams | Salos | Sistema
- Mark as read
- Deep links para streams/perfis
- Real-time via Socket.io

**`/wallet` — Carteira** (EXISTENTE)
- Saldo em Kwanzas (grande, visível)
- Ações: Carregar (Multicaixa Express, e-Kwanza) | Sacar
- Histórico de transações com filtros
- Mini gráfico de gastos

**`/settings` — Definições** (EXISTENTE)
- Perfil: foto, nome, bio, links
- Preferências: idioma, notificações, tema
- Segurança: mudar password, 2FA
- Privacidade: visibilidade do perfil, bloquear
- Conta: tipo, dados, apagar conta

#### CREATOR STUDIO (`/studio`)

**`/studio` — Dashboard** (EXISTENTE — melhorar)
- KPIs: viewers ao vivo, Salos de hoje, followers, horas assistidas
- Mini gráfico de rendimento (últimos 7 dias)
- Quick actions: Iniciar Stream, Ver Analytics, Gerir Salos
- Últimas doações / top donors
- Status do stream (LIVE / OFFLINE)

**`/studio/stream` — Stream Config** (NOVO)
- Chave RTMP com botão copiar
- URL do servidor RTMP
- Título da stream (editável)
- Categoria (dropdown com ícones)
- Thumbnail (upload com preview)
- Botão "Iniciar Stream" / "Parar Stream"
- Preview do chat

**`/studio/analytics` — Analytics** (NOVO)
- Gráfico de viewers (últimos 7/30/90 dias)
- Horas totais assistidas
- Pico de viewers por stream
- Crescimento de followers
- Top categorias por performance
- Comparação período anterior

**`/studio/salos` — Doações** (NOVO)
- Total recebido (por período)
- Lista de doações com donor, valor, mensagem
- Top donors (leaderboard)
- Gestão de alertas de Salo (ativar/desativar, customizar)
- Exportar para CSV

**`/studio/wallet` — Wallet do Creator** (NOVO)
- Saldo disponível para saque
- Saldo pendente (a processar)
- Comissão da plataforma (20%)
- Botão "Sacar" → fluxo KYC se tier insuficiente
- Histórico de saques
- Documentos KYC enviados

**`/studio/channel` — Personalização** (NOVO)
- Banner do canal (upload com crop)
- Bio / descrição
- Links de redes sociais
- Schedule (editor semanal drag-and-drop)
- Cores do canal (accent personalizado)

**`/studio/kyc` — Verificação** (NOVO)
- Status atual: Tier 0 (não verificado) / Tier 1 (básico) / Tier 2 (completo)
- Upload de documentos (BI, passaporte, comprovativo de morada)
- Status de verificação por documento
- Limites por tier:
  - Tier 0: não pode sacar
  - Tier 1: saque até 50.000 Kz/mês
  - Tier 2: sem limite

**`/studio/settings` — Config do Canal** (EXISTENTE como `/studio/configuracoes`)
- Moderadores (adicionar/remover)
- Palavras banidas
- Modo lento (slow mode) — ex: 1 msg / 30s
- Chat subscriber-only
- Alertas de Salo (sons, animações)

#### ADMIN PANEL (`/admin`)

**`/admin` — Overview** (EXISTENTE)
- DAU / MAU
- Streams ao vivo agora
- Volume financeiro total
- Reports pendentes
- KYC pendentes
- Quick alerts (problemas)

**`/admin/users` — Gestão de Utilizadores** (NOVO)
- Tabela com search, filtros (role, status, KYC tier, data)
- Actions: ver perfil, ban, suspend, promover a admin
- Bulk actions
- User detail drawer

**`/admin/streams` — Streams** (NOVO)
- Streams ao vivo (com preview)
- Histórico de streams
- Forçar encerrar stream
- Logs de eventos

**`/admin/finance` — Financeiro** (EXISTENTE como `/admin/financeiro`)
- Volume total de Salos
- Comissões ganhas (20%)
- Saques pendentes (aprovar/rejeitar)
- Relatórios exportáveis
- Breakdown por período

**`/admin/kyc` — KYC Queue** (NOVO)
- Queue de pendentes com documentos
- Preview de documentos
- Aprovar / Rejeitar com razão
- Histórico de decisões
- Stats de aprovação

**`/admin/moderation` — Moderação** (EXISTENTE como `/admin/moderacao`)
- Reports de conteúdo/utilizadores
- Queue de moderação
- Ações: remover, avisar, ban
- Logs de ação com admin ID

**`/admin/settings` — Configurações** (NOVO)
- Feature flags (toggle features)
- Tiers de Salos (valores em Kz)
- Taxa da plataforma (%)
- Manutenção (ativar/desativar)
- Anúncios globais

---

### 3. Prioridade de Implementação (Beta Fechado — Março 2026)

```
P0 — CRÍTICO (Semana 1-2):
├── Design System: tokens de tipografia e espaçamento → globals.css
├── Componentes: StreamCard, LiveBadge, CategoryPill, CreatorAvatar
├── Landing page melhorada: hero interativo, contadores reais
├── Stream page (visitante): player + chat read-only + CTA
├── Login/Register: fluxo OTP mobile-first
└── Fix: copyright 2025 → 2026

P1 — IMPORTANTE (Semana 3-4):
├── Feed personalizado: melhorar com A Seguir Ao Vivo + recomendações
├── Browse/Explore: categorias com ícones, trending
├── Stream page (autenticado): chat interativo + Salos integrado
├── SaloButton + BottomSheet: fluxo de doação em 2 taps
├── Notification center: tabs + real-time
└── Sidebar desktop para contextos autenticados

P2 — VALIOSO (Semana 5-6):
├── Creator Studio: dashboard + stream config + analytics
├── Studio analytics: gráficos interativos
├── Studio salos: gestão de doações
├── Studio KYC: upload e verificação
├── Creator public profile: /creator/[username]
└── Onboarding wizard para novos streamers

P3 — NICE TO HAVE (Semana 7-8):
├── Wallet completo: Multicaixa Express, e-Kwanza
├── Admin: users, streams, KYC queue
├── Admin settings: feature flags, taxas
├── Dark/Light mode toggle (dark é default)
└── PWA offline improvements
```

---

## FASE 3 — REGRAS DE IMPLEMENTAÇÃO

### Identidade Visual Kwanza Stream

```
PALETA:
  Dark Background:  #0A0A0F (oklch 0.07)
  Primary:          Vermelho Angola (oklch 0.63 0.26 25)
  Secondary:        Dourado Angola (oklch 0.85 0.18 85)
  Accent:           Azul cool (oklch 0.55 0.2 250)
  Live:             Verde vibrante (oklch 0.65 0.25 142)
  Text:             Branco/Cinza (oklch 0.97 / 0.58)

TIPOGRAFIA:
  Display:          Plus Jakarta Sans ou Syne (hero, títulos grandes)
  Body:             Inter, Geist (texto corrido, UI)
  Mono:             Geist Mono (código, chaves RTMP)

ESTÉTICA:
  "Lagos meets Seoul meets São Paulo" — energia digital africana moderna
  NÃO: padrões tribais, máscaras, estereótipos folclóricos
  SIM: cores vibrantes da bandeira, geometria moderna, glows subtis

MICRO-INTERAÇÕES:
  - Hover: bg-color transition 200ms, scale ×1.02 para cards
  - Loading: skeleton shimmer (já implementado), NÃO spinners
  - Transições: 200-300ms com ease-out-expo
  - Button press: scale(0.97) em 100ms (já implementado)
  - Live badge: pulse animation (já implementado)
  - Salo donation: partículas/confetti para tiers altos
```

### Regras Técnicas

```
FRAMEWORK:
  - Next.js 15+ com App Router
  - Server Components por padrão
  - Client Components ("use client") apenas para: hooks, interatividade, event handlers
  - Tailwind CSS 4 com CSS variables para tokens
  - shadcn/ui como base, customizado para Kwanza Stream

TIPAGEM:
  - TypeScript strict mode
  - Interfaces para props de componentes
  - Types em packages/shared-types para partilhar com backend

ACESSIBILIDADE (WCAG 2.1 AA):
  - aria-labels em todos os elementos interativos
  - focus-visible com ring de 2px em primary color
  - Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande
  - Touch targets mínimo 44×44px no mobile
  - Skip navigation link
  - Semantic HTML: nav, main, section, article, aside, header, footer

PERFORMANCE:
  - Imagens: next/image com sizes, priority para above-fold
  - Lazy loading: Intersection Observer para componentes pesados
  - Skeleton states: sempre antes de dados reais (nunca tela em branco)
  - Bundle: dynamic import para componentes grandes (charts, player)
  - Fonts: display=swap, preconnect para Google Fonts

MOBILE-FIRST:
  - Bottom navigation (5 items): Início, Explorar, Criar, Alertas, Perfil
  - Touch targets: mínimo 44px
  - Scroll horizontal para listas de creators/categorias
  - Pull-to-refresh no feed
  - Safe area padding para notch/Dynamic Island
  - Prevent zoom on input focus (font-size >= 16px)

i18n:
  - pt-AO como idioma padrão
  - Todas as strings de UI via t() hook (useTranslation)
  - Chaves em locales/pt-AO.json e locales/en.json
  - HTML lang="pt-AO"
  - Formatação de moeda: Kz (ex: "1.500 Kz")
```

### Template de Implementação por Componente

Para cada componente ou página, seguir esta checklist:

```
1. ANÁLISE
   □ Qual contexto? (visitante / autenticado / studio / admin)
   □ Quais dados da API são necessários?
   □ Qual é a hierarquia de informação?
   □ Qual é o fluxo do utilizador? (de onde vem, para onde vai)

2. DESIGN
   □ Mobile-first wireframe mental
   □ Definir estados: loading, empty, error, success, data
   □ Identificar componentes reutilizáveis vs. específicos
   □ Dark mode (default) funciona corretamente?

3. IMPLEMENTAÇÃO
   □ Server Component ou Client Component?
   □ Tipagem TypeScript completa
   □ Tailwind classes com tokens do design system
   □ aria-labels e acessibilidade
   □ Responsive: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
   □ Skeleton loading state
   □ Error boundary / fallback
   □ Comentários em português nos pontos críticos

4. QUALIDADE
   □ i18n: strings extraídas para locales
   □ Performance: lazy loading onde necessário
   □ Touch targets ≥ 44px no mobile
   □ Contraste de cores OK
   □ Testar com leitor de ecrã (tab order, aria)
```

---

## Diretórios e Ficheiros de Referência

```
apps/web/
├── app/                     ← Páginas (App Router)
│   ├── globals.css          ← Design tokens (CSS variables + Tailwind)
│   ├── layout.tsx           ← Root layout (AuthProvider, I18n, MobileNav)
│   ├── page.tsx             ← Landing page
│   ├── admin/               ← Admin panel
│   ├── auth/                ← Login/Registro
│   ├── feed/                ← Feed personalizado
│   ├── explore/             ← Explorar streams
│   ├── studio/              ← Creator Studio
│   ├── watch/               ← Assistir stream
│   └── wallet/              ← Carteira
├── components/              ← Componentes reutilizáveis
│   ├── ui/                  ← shadcn/ui primitivos (57 ficheiros)
│   ├── navbar.tsx           ← Navbar principal
│   ├── mobile-nav.tsx       ← Bottom nav mobile
│   ├── salo-system.tsx      ← Sistema de doações Salos
│   ├── hls-player.tsx       ← Player de vídeo HLS
│   └── ...                  ← 24 custom components
├── hooks/                   ← React hooks (chat, mobile, push, toast)
├── lib/                     ← Utilidades (api, auth, i18n, socket, services)
├── locales/                 ← i18n (pt-AO.json, en.json)
├── styles/                  ← CSS adicional
└── public/                  ← Assets estáticos

apps/server/
├── src/
│   ├── routes/              ← 16 ficheiros de rotas API
│   ├── controllers/         ← 19 controllers
│   ├── services/            ← 6 serviços de negócio
│   ├── middleware/           ← 6 middlewares (auth, rate-limit, etc.)
│   └── streaming/           ← 4 módulos de streaming (RTMP, HLS)
├── prisma/
│   └── schema.prisma        ← 16+ modelos (User, Stream, Donation, etc.)
└── tests/

packages/shared-types/       ← Types partilhados frontend/backend
```

---

## Salo Tiers Reference

| Tier | Nome | Valor | Cor Token | Animação |
|------|------|-------|-----------|----------|
| 1 | Bronze | 50 Kz | `--salo-bronze` | Sparkle subtil |
| 2 | Prata | 200 Kz | `--salo-silver` | Shimmer |
| 3 | Ouro | 1.000 Kz | `--salo-gold` | Rain dourada |
| 4 | Diamante | 5.000 Kz | `--salo-diamond` | Explosão azul |
| 5 | Lendário | 10.000 Kz | `--salo-legend` | Confetti + som |

---

## Backend Routes Disponíveis (para uso em UI)

| Módulo | Rota Base | Endpoints |
|--------|-----------|-----------|
| Auth | `/api/auth` | login, register, verify OTP, refresh token |
| Users | `/api/users` | profile, update, follow/unfollow |
| Streams | `/api/streams` | create, update, start/stop, get live |
| Donations | `/api/donations` | send Salo, history, leaderboard |
| Wallet | `/api/wallet` | balance, deposit, withdraw, transactions |
| Notifications | `/api/notifications` | list, mark read, unread count |
| Search | `/api/search` | query (users + streams) |
| Messages | `/api/messages` | conversations, send, read |
| Reports | `/api/reports` | create, list (admin) |
| Clips | `/api/clips` | create, list, popular |
| Events | `/api/events` | create, list, RSVP |
| Upload | `/api/upload` | image, avatar, banner |
| Creator | `/api/creator` | stats, revenue, analytics |
| Health | `/api/health` | status, version |
| Push | `/api/push` | register device, send |
| Favorites | `/api/favorites` | add, remove, list |

---

## Checklist Rápido por Contexto

### Visitante — O que mostrar
- [x] Landing page atrativa
- [x] Grid de streams ao vivo
- [x] Player com chat (read-only)
- [ ] Perfil público do creator
- [x] CTA para criar conta em TODOS os pontos de interação
- [x] Categorias exploráveis
- [x] Sem sidebar/nav complexa — navbar limpa

### Autenticado — O que mostrar
- [x] Feed com streams dos seguidos
- [x] Explorar/Browse
- [x] Stream com chat interativo + Salos
- [x] Wallet com saldo
- [x] Notificações em tempo real
- [x] Perfil editável
- [x] Bottom nav mobile (Início, Explorar, Criar, Alertas, Perfil)

### Creator Studio — O que mostrar
- [x] Dashboard com KPIs
- [ ] Stream config (chave RTMP, título, categoria)
- [ ] Analytics (gráficos de viewers, receita)
- [ ] Gestão de Salos (doações recebidas, alertas)
- [ ] Wallet creator (saldo, saques, KYC)
- [ ] Canal (banner, bio, schedule)
- [ ] KYC (upload, status, tiers)
- [x] Sidebar lateral no desktop
- [x] Bottom nav adaptado no mobile

### Admin Panel — O que mostrar
- [x] Overview com métricas globais
- [x] Financeiro (volume, comissões)
- [x] Moderação (reports, ações)
- [ ] Gestão de utilizadores
- [ ] Gestão de streams
- [ ] KYC queue
- [ ] Configurações globais
- [x] Layout tipo dashboard admin (sidebar + content area)
