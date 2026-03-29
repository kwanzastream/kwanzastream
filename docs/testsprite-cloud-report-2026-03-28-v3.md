# Relatório TestSprite cloud v3 — Kwanza Stream

**Data do relatório:** 2026-03-29 (execução local dos TC\*.py; tentativa cloud na mesma sessão)

## Objectivo

Reexecutar o ciclo cloud TestSprite com os **16 ficheiros `TC*.py` corrigidos**, backend em **http://localhost:5000** e frontend em **http://localhost:3000**, e obter **16/16** no cloud como em local.

---

## 1. Estado da infraestrutura

| Serviço | URL | Verificação |
|---------|-----|-------------|
| API Express | `http://127.0.0.1:5000` | `GET /api/health` → **200** |
| Next.js | `http://127.0.0.1:3000` | **200** |

A configuração em `testsprite_tests/tmp/config.json` foi actualizada para:

- `localEndpoint`: `http://localhost:5000`
- `executionArgs.envs.API_KEY`: placeholder (ver secção cloud abaixo)

---

## 2. Execução cloud TestSprite (CLI)

Comando utilizado:

```bash
npx @testsprite/testsprite-mcp@latest generateCodeAndExecute
```

### Resultado cloud

**Não concluída.** O túnel TestSprite devolveu:

```text
McpTunnelError: Failed to set up testing tunnel: Request failed: 401 Unauthorized
```

**Causa:** autenticação na API TestSprite — é necessária uma **`API_KEY` válida** (variável de ambiente ou entrada em `executionArgs.envs` no `config.json`). Na sessão actual não havia `API_KEY` / `TESTSPRITE_API_KEY` definidas no ambiente do terminal, e a chave foi removida do `config.json` por segurança (não versionar segredos).

**Correcção para uma próxima tentativa cloud:**

1. Obter a chave em [TestSprite Dashboard → API Keys](https://www.testsprite.com/dashboard/settings/apikey).
2. No PowerShell, antes do comando:

   ```powershell
   $env:API_KEY = "sua-chave-aqui"
   cd c:\Users\MSI\kwanza-stream
   npx @testsprite/testsprite-mcp@latest generateCodeAndExecute
   ```

   Ou preencher `testsprite_tests/tmp/config.json` → `executionArgs.envs.API_KEY` **localmente** (e não fazer commit da chave).

3. Garantir que a API e o Next continuam acessíveis nas portas **5000** e **3000** durante todo o ciclo (10–15+ minutos).

**Nota:** Na primeira tentativa após remover `envs`, o CLI falhou com `TypeError: Cannot convert undefined or null to object` — foi necessário repor **`executionArgs.envs`** (com `API_KEY` vazio ou válido) para o comando avançar até ao túnel.

---

## 3. Validação local equivalente (16/16)

Com os mesmos testes commitados em `testsprite_tests/`, foi executada uma bateria **local** contra a API em execução:

```powershell
$env:API_URL = "http://127.0.0.1:5000"
# cada ficheiro TC*.py
```

| Resultado | Detalhe |
|-----------|---------|
| **16 / 16** | **PASS** |
| Duração total | ~29 s |
| Ficheiros | `TC001_postapiauthregisterwithvaliddata.py` … `TC016_getapisearchnoresults.py` |

Isto confirma que os **`TC*.py` corrigidos** estão alinhados com o backend na porta **5000** no ambiente actual.

---

## 4. Dashboard TestSprite (cloud)

**Não aplicável** nesta v3 — a execução cloud não chegou a criar uma nova corrida com resultados na plataforma (falha 401 no túnel).

Quando a cloud correr com sucesso, o link típico tem o formato:

`https://www.testsprite.com/dashboard/mcp/tests/<projectId>`

---

## 5. Conclusão

| Métrica | Cloud | Local (API :5000) |
|---------|-------|-------------------|
| Testes TC001–TC016 | **Não executados** (401 túnel) | **16/16 passaram** |

O objectivo **16/16 no cloud** depende de **configurar `API_KEY` válida** para o TestSprite e voltar a executar `generateCodeAndExecute`. O comportamento dos testes em si foi **validado localmente a 100%** na mesma configuração de portas pedida (backend **5000**; frontend **3000** disponível para fluxos que o browser possa usar).

---

*Artefactos úteis: `testsprite_tests/tmp/config.json`, `testsprite_tests/TC*.py`, `testsprite_tests/tmp/test_results.json` (será actualizado após uma cloud bem-sucedida).*
