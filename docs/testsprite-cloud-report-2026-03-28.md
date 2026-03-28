# Relatório cloud TestSprite — Kwanza Stream (2026-03-28)

## Registo do projecto (MCP)

| Campo | Valor |
|--------|--------|
| **Nome** | Kwanza Stream |
| **Frontend URL** | http://localhost:3000 |
| **Backend URL** | http://localhost:3001 |
| **Stack** | Next.js 14 + Express + TypeScript + Prisma + PostgreSQL |
| **PRD de referência** | `docs/testsprite-prd.md` (cópia em `testsprite_tests/tmp/prd_files/testsprite-prd.md`) |
| **Project ID (TestSprite)** | `29f834d9-2188-4b30-9ba3-dde500e82327` |

---

## Resumo da execução

| Métrica | Valor |
|---------|--------|
| **Total de testes executados** | **10** |
| **Passaram** | **1** |
| **Falharam** | **9** |
| **Modo servidor** | `development` (túnel TestSprite → localhost) |

---

## Dashboard TestSprite (resultados completos)

**Dashboard do projecto (visão geral e lista de execuções):**

https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327

Cada caso tem visualização individual; exemplos (do relatório bruto):

- TC001: https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/b4e2437a-7a21-43f2-a2df-b1009e7b8884  
- TC002: https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/1aaebe6d-4eb5-4748-a08d-0a9c24b95cf0  
- TC005 (passou): https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/8c9fffb6-db1c-4ca1-846f-268925f6a127  

*(Os restantes IDs estão em `testsprite_tests/tmp/raw_report.md` e `testsprite_tests/tmp/test_results.json`.)*

---

## Artefactos gerados

- Relatório bruto: `testsprite_tests/tmp/raw_report.md`
- Resultados JSON: `testsprite_tests/tmp/test_results.json`
- Casos Python: `testsprite_tests/TC001_*.py` … `TC010_*.py`
- Plano backend: `testsprite_tests/testsprite_backend_test_plan.json`
- Plano frontend: `testsprite_tests/testsprite_frontend_test_plan.json` (vazio nesta corrida)

---

## Bugs e causas (com severidade)

> **Nota:** A maioria das falhas **não** prova defeito na API Kwanza Stream: os testes gerados pelo TestSprite usam **payloads de `/api/auth/register` incompletos** em relação ao schema real (`registerSchema` em `apps/server/src/controllers/auth/authHelpers.ts`), que exige `displayName`, `termsAccepted: true` e `ageConfirmed: true`. Os testes enviam apenas `email`, `phone`, `username`, `password`, o que produz **400 Erro de validação** por desenho.

### Crítico — harness / alinhamento API vs testes gerados

| ID | Problema | Comportamento esperado pelo teste | Comportamento actual | Onde | Sugestão |
|----|-----------|-----------------------------------|----------------------|------|----------|
| H1 | Payload de registo incompleto nos testes gerados | 201 no registo | 400 validação (faltam campos obrigatórios) | Testes TC001, TC003, TC004, TC006, TC007, TC008, TC009 (código em `testsprite_tests/TC*.py`) | Regenerar testes com `displayName`, `termsAccepted`, `ageConfirmed`, e telefone Angolano válido (`+244…`). Actualizar `code_summary.yaml` / PRD standard com o contract exacto do `registerSchema`. |

### Médio — credenciais e cookies

| ID | Problema | Detalhe | Onde | Sugestão |
|----|-----------|---------|------|----------|
| H2 | Login com utilizador inexistente | TC002 usa `testuser@example.com` / password fixa → **401** | `testsprite_tests` TC002 | Usar utilizador criado no mesmo teste após registo válido ou fixture de seed. |
| H3 | Asserções de cookie incorrectas | Teste procura cookies `jwt`/`token`; a API usa `access_token` e `refresh_token` (httpOnly) | TC002 | Ajustar asserções ao nome real dos cookies ou validar `Authorization` Bearer se o cliente usar header. |

### Médio — ambiente / túnel

| ID | Problema | Detalhe | Onde | Sugestão |
|----|-----------|---------|------|----------|
| H4 | Erro de proxy no registo (TC010) | `500` com mensagem "Proxy server error" (túnel instável ou timeout) | TC010 | Reexecutar com rede estável; confirmar API acessível pelo túnel TestSprite na porta 3001. |

### Baixo — único teste que passou sem dependência de registo completo

| ID | Teste | Nota |
|----|--------|------|
| OK1 | TC005 `POST /api/auth/request-password-reset` | Passou com email genérico (comportamento típico: resposta genérica 200). |

---

## Observações sobre o código da API (para próxima iteração de testes)

Estas observações ajudam a alinhar **PRD** e **testes**, mas não foram introduzidas como regressões confirmadas por esta corrida (os testes falharam sobretudo por payload incompleto).

1. **`registerSchema`** — `apps/server/src/controllers/auth/authHelpers.ts` (aprox. linhas 56–64): campos obrigatórios alinhados com o registo real na web.
2. **`loginWithPassword`** — `apps/server/src/controllers/auth/loginController.ts`: resposta JSON pode não incluir `accessToken` no corpo; clientes usam cookies + `localStorage` conforme `apps/web/lib/auth-context.tsx`.
3. **Upload de avatar** — `apps/server/src/controllers/uploadController.ts`: limite **2MB** e tipos JPEG/PNG/WebP; PRD fala em **5MB** — discrepância de requisito, não coberta por TC010 (que falhou antes por registo).

---

## Conclusão

O ciclo **TestSprite `generateCodeAndExecute`** concluiu com **10 testes** na cloud; **1 passou** e **9 falharam**. As falhas dominantes vêm de **testes gerados desalinhados com o contract real de registo** e de **dados/cookies de asserção**, não de uma lista verificada de bugs de produto nesta execução.

**Próximo passo recomendado:** actualizar o resumo de código / PRD standard para o TestSprite reflectir o body exacto de `POST /api/auth/register`, voltar a gerar o plano e reexecutar; opcionalmente usar `testIds` para validar primeiro só auth após correcção dos geradores.

---

*Relatório produzido após execução local de `npx @testsprite/testsprite-mcp@latest generateCodeAndExecute` com API em `http://localhost:3001` e frontend disponível em `http://localhost:3000`.*
