# Kwanza Stream — PRD para TestSprite

## Stack
Next.js 14 App Router | Express + TypeScript | Prisma 5 + PostgreSQL
Socket.io | Redis | JWT Auth | Tailwind + shadcn/ui | PT-AO | WAT (UTC+1)

## Fluxos a Testar (por prioridade)

### PRIORIDADE 1 — Autenticação (CRÍTICA)
- Registo com email + password válidos
- Registo com email já existente → erro PT-AO
- Registo com password fraca → erro PT-AO
- Login com credenciais correctas → JWT devolvido
- Login com credenciais erradas → erro PT-AO
- Logout → sessão invalidada
- Refresh token automático antes de expirar
- Acesso a rota protegida sem token → 401 + redirect login
- Bloqueio após 5 tentativas falhadas consecutivas
- Reset de password via email

### PRIORIDADE 2 — Perfil e Onboarding
- Criar perfil após registo (username, bio, avatar)
- Editar perfil existente
- Upload de avatar: JPG/PNG válido → aceite
- Upload de avatar: PDF ou EXE → rejeitado com erro PT-AO
- Upload de avatar: ficheiro > 5MB → rejeitado com erro PT-AO
- Seleccionar província angolana (validar as 21 províncias disponíveis)
- Username duplicado → erro PT-AO
- Username com caracteres inválidos → erro PT-AO

### PRIORIDADE 3 — Descoberta de Conteúdo
- Página inicial carrega streams ao vivo
- Filtro por categoria: Gaming, Música, Futebol, Comédia, Kuduro
- Pesquisa por nome de canal → resultados correctos
- Pesquisa sem resultados → mensagem PT-AO "Nenhum resultado encontrado"
- Página de canal de streamer carrega correctamente
- Lista de VODs de um canal

### PRIORIDADE 4 — Chat
- Enviar mensagem no chat de uma stream
- Mensagem vazia → bloqueada
- Mensagem com 500+ caracteres → bloqueada ou truncada
- Mensagem com emojis e caracteres especiais PT-AO (ã, ç, ê) → funciona
- Rate limiting: 10 mensagens em 5 segundos → throttle activado
- Slow mode: mensagem antes do timer → bloqueada com countdown PT-AO

### PRIORIDADE 5 — Salos (Moeda Virtual)
- Ver saldo de Salos no perfil
- Enviar Salos a streamer → saldo decrementado correctamente
- Comissão 20% da plataforma aplicada na transacção
- Tentativa de enviar mais Salos do que o saldo → erro PT-AO
- Tentativa de enviar 0 ou valor negativo → bloqueada
- Histórico de transacções correcto e ordenado por data

### PRIORIDADE 6 — Creator Studio
- Acesso ao Creator Studio com conta streamer → permitido
- Acesso ao Creator Studio com conta normal → negado
- Ver estatísticas: seguidores, visualizações, receita
- Editar título e categoria do stream
- Obter/regenerar stream key RTMP
- Adicionar moderador ao canal
- Remover moderador do canal

### PRIORIDADE 7 — Seguimento
- Seguir um canal → contador incrementa
- Deixar de seguir → contador decrementa
- Não é possível seguir o próprio canal → bloqueado
- Feed "Canais que sigo" mostra streams ao vivo em primeiro lugar

### PRIORIDADE 8 — Painel de Admin
- Login com conta @ks-admin → acesso ao painel
- Login com conta normal → acesso negado ao painel (403)
- Ver lista de todos os utilizadores
- Suspender conta de utilizador
- Ver relatório de receitas

## Edge Cases de Segurança
- SQL injection no campo de pesquisa → sanitizado, sem erro 500
- XSS em mensagem de chat → escapado, não executa script
- JWT manipulado manualmente → rejeitado (401)
- Acesso directo a /admin sem autenticação → redirect login
- CSRF em formulários críticos → protegido

## Requisitos de Performance
- Página inicial: < 3s em ligação 3G simulada
- Endpoints de API: < 500ms em condições normais
- Chat: sem lag visível com 50 utilizadores simultâneos
