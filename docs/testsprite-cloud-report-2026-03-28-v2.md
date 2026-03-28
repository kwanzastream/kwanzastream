# Relatório cloud TestSprite v2 — Kwanza Stream (2026-03-28)

## Contexto

- **Pedido:** Reexecutar o ciclo TestSprite após correcções (registo com defaults, cookies `accessToken`/`refreshToken`, tokens no JSON, onboarding províncias, avatar 5MB) e alargar o âmbito às **PRIORIDADES 3 e 4** do `docs/testsprite-prd.md`.
- **MCP:** Os descritores de ferramentas TestSprite não estavam disponíveis nesta sessão; o ciclo foi corrido via CLI oficial:  
  `npx @testsprite/testsprite-mcp@latest generateCodeAndExecute`  
  com `testsprite_tests/testsprite_backend_test_plan.json` e `testsprite_tests/testsprite_frontend_test_plan.json` actualizados localmente.
- **Serviços locais:** API em `http://localhost:3001`, Next.js em `http://localhost:3000` (arrancados antes da execução).

## Registo / configuração

| Campo | Valor |
|--------|--------|
| Project ID (TestSprite) | `0f2cd640-f07e-4205-be5d-7523f7940c8b` |
| Backend | `http://localhost:3001` |
| Frontend | `http://localhost:3000` |
| Plano backend | TC001–TC016 (10 originais alinhados ao contract + 6 para P3) |
| Plano frontend | FT001–FT008 (P3 + P4 UI / chat) |

**Dashboard (execução v2):**  
https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b

## Resultados globais

| Métrica | Valor |
|---------|--------|
| **Testes backend executados** | **16** (TC001–TC016) |
| **Passaram** | **3** |
| **Falharam** | **13** |
| **Meta 10/10 (bloco original)** | **Não atingida** |
| **Testes frontend (FT001–FT008)** | **Não constam** em `testsprite_tests/tmp/test_results.json` (o runner desta corrida gravou apenas casos `BACKEND`; possível limite de tempo / fila). |
| **Infra** | Aviso no CLI: `Timeout waiting for message` numa ligação do túnel; execução terminou mesmo assim com resultados parciais. |

### Por teste (backend)

| ID | Título | Estado |
|----|--------|--------|
| TC001 | Registo válido | Falhou — telefone fixo `+244912345678` já existente na BD |
| TC002 | Login válido | Falhou — registo 400 (colisão de dados) + **código gerado exige ausência de `accessToken` no JSON**, o que **contradiz** a API actual (tokens no body) |
| TC003 | Refresh | Falhou — resposta de registo sem `user` (400) |
| TC004 | Logout + refresh 401 | Falhou — registo fixo duplicado |
| TC005 | Pedido reset password | **Passou** |
| TC006 | Reset com token | Falhou — registo 400 ou **`debugResetToken`**: o script Python usa `os.getenv("NODE_ENV")` (ambiente **Lambda**, não o servidor Node) em vez de confiar só no JSON |
| TC007 | GET /me | Falhou — registo (ex.: regex de telefone) |
| TC008 | PUT /users/me | Falhou — registo |
| TC009 | Onboarding | Falhou — registo |
| TC010 | Upload avatar | Falhou — **SyntaxError** no JPEG gerado (bytes mal escapados no Python) |
| TC011 | Streams ao vivo | Falhou — URL incorrecta gerada (`/api/streams?status=live` → **401** em vez de **`/api/streams/live`**) |
| TC012 | Categorias streams | **Passou** |
| TC013 | Pesquisa | Falhou — esperava `results` como **lista**; a API devolve `users`/`streams` no topo (o gerador não seguiu o contract) |
| TC014 | Lista VODs | **Passou** |
| TC015 | Streams por utilizador | Falhou — registo com email/telefone/username fixos duplicados |
| TC016 | Pesquisa sem resultados | Falhou — mesmo problema de formato `results` na versão gerada antes do patch local em `searchController` |

## Alterações feitas no repositório durante esta tarefa

1. **`request-password-reset` (development):** resposta JSON passa a incluir `debugResetToken` quando `NODE_ENV === 'development'`, para permitir fluxo E2E de reset sem ler email (apenas dev).
2. **`GET /api/search`:** foi adicionado um campo **`results`** (objecto com `users`, `streams`, `totalUsers`, `totalStreams`) **em adição** às chaves já existentes, para alinhar com testes que esperam `results.*` (útil para reexecuções futuras; o frontend continua a usar `res.data.users` / `res.data.streams`).

## Análise: correccões do produto vs falhas do harness

| Severidade | Problema | Onde | Sugestão |
|------------|----------|------|----------|
| **Alto** | Testes gerados **contradizem** o PRD/plano (ex.: TC002 a exigir que **não** exista `accessToken` no login) | Código Python em `testsprite_tests/tmp/test_results.json` | Fixar prompts/plano ou **committar** testes Python revisados manualmente e desactivar regeneração agressiva para auth. |
| **Alto** | Dados **não únicos** (telefones/emails fixos) em ambiente com BD persistente | TC001, TC004, TC015 | Todo registo deve usar `uuid` em email, telefone **+244** + 9 dígitos aleatórios, username único. |
| **Médio** | TC006 usa `NODE_ENV` no **processo Python** | Teste gerado | Exigir no plano: “usar apenas `debugResetToken` do JSON; nunca `os.environ`”. |
| **Médio** | TC011 path errado | Gerador | Reforçar no plano: path exacto **`/api/streams/live`** (público). |
| **Médio** | TC010 JPEG inválido / string corrupta | Gerador | Usar `BytesIO` com bytes mínimos válidos ou ficheiro fixture. |
| **Baixo** | Túnel TestSprite instável | CLI | Repetir execução com rede estável; garantir API acessível durante toda a janela. |
| **Baixo** | FT001–FT008 não executados ou não reportados | Runner | Confirmar na documentação TestSprite se `generateCodeAndExecute` executa frontend e backend na mesma corrida; pode ser necessário comando separado ou plano unificado. |

## Conclusão

As correcções no **código da Kwanza Stream** (defaults de registo, cookies, tokens no JSON, limites de avatar, etc.) **não se traduziram em 10/10** nesta execução porque o **TestSprite voltou a gerar clientes de teste incorrectos ou frágeis** (assertivas erradas, URLs erradas, dados duplicados, bug de sintaxe em TC010, confusão `NODE_ENV` no harness).

**Passos recomendados antes de v3:**

1. Regenerar ou **editar manualmente** os `TC*.py` com base em `test_results.json` (corrigir TC002, TC006, TC010, TC011, TC013/TC016).
2. Garantir **unicidade** em todos os fluxos que criam utilizador.
3. Reexecutar `generateCodeAndExecute` **ou** correr os `.py` localmente contra `localhost:3001` após revisão.
4. Validar separadamente os cenários **FT*** (P3/P4) com Playwright/Cursor browser se o runner cloud não os incluir.

---

*Artefactos: `testsprite_tests/tmp/raw_report.md`, `testsprite_tests/tmp/test_results.json`, ficheiros `TC*_*.py` na pasta `testsprite_tests/`.*
