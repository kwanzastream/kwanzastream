# Relatório TestSprite — Kwanza Stream (2026-03-28)

## 1. Configuração MCP

### Estado
- Foi criado `c:\Users\MSI\kwanza-stream\.cursor\mcp.json` com o servidor `testsprite`.
- **Correção necessária:** o pacote indicado no pedido original (`@testsprite/mcp`) **não existe no registo npm** (erro 404). A documentação oficial do TestSprite usa **`@testsprite/testsprite-mcp@latest`**.
- A documentação oficial expõe a variável de ambiente **`API_KEY`**. Foi adicionado também **`TESTSPRITE_API_KEY`** (vazio) para alinhar com o teu `.env`; o servidor MCP lê tipicamente `API_KEY` — **coloca o mesmo valor da tua chave em `API_KEY`** (e opcionalmente em `TESTSPRITE_API_KEY` se o pacote suportar ambos).

### Como activar no Cursor
1. Abre `.cursor/mcp.json` e preenche `API_KEY` com o valor de `TESTSPRITE_API_KEY` do teu ambiente.
2. Reinicia o Cursor (ou recarrega janela) para o MCP aparecer com ponto verde.
3. Em **Chat → Auto-Run**, usa "Ask Everytime" ou "Run Everything" para o TestSprite não ficar limitado pelo sandbox (recomendação oficial).

### Verificação nesta sessão
- Invocação ao servidor MCP `testsprite` falhou: **"MCP server does not exist: testsprite"** — apenas `cursor-ide-browser` estava registado. Isto é esperado até o Cursor recarregar a configuração com a chave válida.
- **Não foi possível** executar `testsprite_bootstrap_tests`, `testsprite_generate_code_and_execute`, etc., neste ambiente sem o MCP activo e sem API key no ficheiro.

---

## 2. PRD

- **Path:** `c:\Users\MSI\kwanza-stream\docs\testsprite-prd.md`

---

## 3. Resumo dos testes executados

| Origem | Resultado |
|--------|-----------|
| **TestSprite (cloud / MCP)** | Não executado — MCP `testsprite` indisponível nesta sessão; requer reinício do Cursor + `API_KEY` válida. |
| **Vitest (`apps/server`)** | **94 testes passaram** em 6 ficheiros; **3 suites falharam ao importar** (`kyc-gate.test.ts`, `ledger.test.ts`, `webhook-hmac.test.ts`) por `ReferenceError: Cannot access 'mockPrisma' before initialization` (hoisting de `vi.mock`). |
| **Análise estática (código vs PRD P1 + P2)** | Ver secção 4 — substitui o ciclo TestSprite pedido quando o MCP não corre. |

**Total de testes automatizados locais reportados:** 94 passaram (com 3 suites com erro de configuração de mocks).

---

## 4. Bugs e discrepâncias (PRD Prioridade 1 e 2)

### Severidade: crítico

| # | Bug | Comportamento esperado (PRD / front) | Comportamento actual | Ficheiro(s) / linha(s) | Sugestão |
|---|-----|--------------------------------------|----------------------|-------------------------|----------|
| C1 | Resposta de login/registo/OTP **não inclui `accessToken` no JSON**; o refresh **não devolve `accessToken` no corpo**. | Login correcto → JWT devolvido ao cliente; refresh deve fornecer novo access token ao SPA. | `loginWithPassword`, `register`, `verifyOtpAndLogin` devolvem só `user` (e `success`); `refreshAccessToken` devolve `{ success: true }`. O `auth-context` e o interceptor Axios esperam `res.data.accessToken`. | `apps/server/src/controllers/auth/loginController.ts` ~52-65, ~118-132, ~170`; `apps/server/src/controllers/auth/otpController.ts` ~110-123`; `apps/web/lib/auth-context.tsx` ~125-147`; `apps/web/lib/api.ts` ~66-71 | Incluir `accessToken` (e opcionalmente `refreshToken` se aplicável ao fluxo) nas respostas JSON dos endpoints usados pelo web, **ou** alinhar o front para obter token apenas de cookies com mesmo site/origem documentado. Corrigir `/api/auth/refresh` para devolver `accessToken` no corpo para o interceptor em `api.ts`. |

### Severidade: médio

| # | Bug | Comportamento esperado | Comportamento actual | Ficheiro(s) / linha(s) | Sugestão |
|---|-----|------------------------|----------------------|-------------------------|----------|
| M1 | **Bloqueio após 5 tentativas falhadas** (password) | Contador por IP/conta e bloqueio temporário. | Não há lógica de lockout após falhas de password em `loginWithPassword` (só falha genérica 401). | `apps/server/src/controllers/auth/loginController.ts` ~76-108 | Implementar contagem (Redis ou DB) e bloqueio após 5 falhas consecutivas, com mensagem PT-AO. |
| M2 | **Password fraca** | Rejeitar passwords fracas com erro PT-AO. | `registerSchema`: apenas `min(8)` e `max(128)` — ex. `"12345678"` é aceite. | `apps/server/src/controllers/auth/authHelpers.ts` ~56-64 | Adicionar regras (maiúsculas, dígitos, lista comum) e mensagens em PT-AO. |
| M3 | **Tamanho máximo de avatar PRD vs API** | PRD: rejeitar > **5MB** com erro PT-AO. | Limite **2MB**; mensagens em inglês. | `apps/server/src/controllers/uploadController.ts` ~10, ~45-47, ~38-41`; PRD em `docs/testsprite-prd.md` | Alinhar limite a 5MB no servidor e no front (`registar/interesses/page.tsx` ~120) ou actualizar o PRD; traduzir erros para PT-AO. |
| M4 | **Província no perfil / onboarding** | Seleccionar e validar uma das **21** províncias. | Modelo `User` no Prisma **não tem campo de província**; `onboardingSchema` não inclui província. | `apps/server/prisma/schema.prisma` (model `User`); `apps/server/src/controllers/userController.ts` ~17-22, ~360-405 | Adicionar campo (ex. `provinceSlug`) validado contra `ANGOLA_PROVINCES` / lista de 21 slugs. |
| M5 | **Mensagens de perfil / auth nem sempre PT-AO** | Erros PT-AO. | Várias respostas em inglês: "Authentication required", "Username already taken", "Internal server error", mensagens de refresh, upload. | `apps/server/src/controllers/userController.ts` ~103, ~114, ~153`; `loginController.ts` ~148-162, ~189-207`; `uploadController.ts` ~34-47 | Unificar cópias em português (PT-AO) conforme guia de produto. |

### Severidade: baixo

| # | Bug | Nota | Ficheiro(s) |
|---|-----|------|-------------|
| B1 | Mensagens genéricas "Internal server error" em falhas 500 | Preferir mensagem segura PT-AO em produção. | Vários controladores |
| B2 | Testes Vitest: 3 suites com mock Prisma mal inicializado | Corrigir factories `vi.mock` para não referenciar variáveis antes da inicialização. | `tests/kyc-gate.test.ts`, `tests/ledger.test.ts`, `tests/webhook-hmac.test.ts` |

---

## 5. Screenshots / logs de falhas

- **TestSprite:** não há capturas — o ciclo cloud **não foi executado** (MCP não registado nesta sessão).
- **Vitest:** log relevante (resumo):
  - `FAIL tests/kyc-gate.test.ts` — `Cannot access 'mockPrisma' before initialization`
  - `FAIL tests/ledger.test.ts` — idem
  - `FAIL tests/webhook-hmac.test.ts` — idem
- **Análise estática:** não gera screenshot; referências de código estão na tabela acima.

---

## 6. Totals (análise estática + Vitest)

| Métrica | Valor |
|---------|--------|
| Testes Vitest passados | 94 |
| Suites Vitest com falha de import/mock | 3 |
| Bugs listados (crítico / médio / baixo) | 1 / 5 / 2 |

---

*Relatório gerado por análise de código e testes locais; reexecutar com TestSprite MCP activo e `API_KEY` válida para relatório cloud com `TestSprite_MCP_Test_Report.md` e `testsprite_tests/` conforme documentação oficial.*
