---
description: Workflow para auditoria e refatoração de todos os workflows em .agents/workflows/ garantindo alinhamento com a stack HyperFrames (HTML/CSS/GSAP, bun, npx hyperframes CLI, ElevenLabs, Gemini) e governança do Antigravity.
---

# Workflow: /workflows-refresh — Refatoração de Workflows no Antigravity

> **Slash Command:** `/workflows-refresh`  
> **Propósito:** Auditar e refatorar todos os workflows do projeto para conformidade com a stack real (HyperFrames, bun, GSAP, ElevenLabs, Gemini) e regras do Swarm de Agentes.  
> **Agente Responsável:** `@orchestrator`  
> **Skills de Referência:**
> - `.agents/skills/caveman/SKILL.md`
> - `.agents/skills/superpower/writing-plans/SKILL.md`
> - `.agents/skills/hyperframes-cli/SKILL.md`
> - `.agents/skills/hyperframes-core/SKILL.md`

> **MCP Obrigatório:** Use `context7` (`/heygen-com/hyperframes`) para validar comandos CLI atualizados antes de reescrever workflows que referenciam `npx hyperframes`.

---

## PASSO 1: Leitura de Contexto e Descoberta

1. Leia `AGENTS.md` — governança do Swarm, personas, fluxo 7-Step Master Flow.
2. Leia `.context/project-context.md` — mapa estrutural e contrato de composição HyperFrames.
3. Leia `.context/conventions.md` — bun como package manager, oxlint, oxfmt, Conventional Commits.
4. Liste todos os arquivos Markdown em `.agents/workflows/` e leia cada um.

```bash
ls .agents/workflows/
```

**Stack de referência para auditoria:**

| Componente | Tecnologia Real |
| :--- | :--- |
| Package Manager | `bun` (nunca `npm` ou `pnpm`) |
| CLI de vídeo | `npx hyperframes` |
| Animações | GSAP paused timelines em `window.__timelines` |
| TTS | ElevenLabs via `npx hyperframes tts` |
| IA/LLM | Gemini (`GEMINI_API_KEY`), OpenRouter (`OPENROUTER_API_KEY`) |
| Linting | `npx hyperframes lint` + `oxlint` |
| Render | `npx hyperframes render` (Docker/FFmpeg) |
| Preview | `npx hyperframes preview` |

---

## PASSO 2: Auditoria dos Workflows Atuais

Analise cada workflow com os seguintes critérios:

### Critérios Obrigatórios

- [ ] **Frontmatter YAML**: Possui `description:` no topo com contexto preciso?
- [ ] **Agente correto**: Referencia persona do Swarm real (`@orchestrator`, `@hf-designer`, `@hf-builder`, `@hf-qa`)?
- [ ] **Skills corretas**: Skills referenciadas existem em `.agents/skills/`?
- [ ] **Stack alinhada**: Comandos usam `bun` (não `npm`), `npx hyperframes` (não `turbo`)?
- [ ] **Sem referências órfãs**: Não menciona `backend/`, `PROXY_HEADER`, `frontend React/TS`, `Vertex AI` como obrigatório, `turbo`?
- [ ] **Gates de qualidade**: Workflows de build/render incluem `lint` → `validate` → `snapshot` antes de `render`?
- [ ] **MCP context7**: Workflows que operam com CLI sugerem consultar `context7` para docs atualizadas?
- [ ] **Passos acionáveis**: Cada passo é numerado, tem objetivo claro e comando executável?

### Padrões a Eliminar (Legado WEBAPP-AGENT-TUTORIAL)

- ❌ `// turbo` como marcador de auto-execução (não existe neste projeto)
- ❌ `npm install` / `npm run` (substituir por `bun install` / `bun run`)
- ❌ `cd frontend && npx tsc --noEmit` (sem frontend TypeScript)
- ❌ `backend/.env.local` / `PROXY_HEADER` / `GOOGLE_CLOUD_PROJECT` obrigatórios
- ❌ `@ai-pipeline-architect` / `@frontend-specialist` / `@backend-proxy-engineer` (personas erradas)
- ❌ Referências a `vertex-ai-integration/SKILL.md` / `backend-proxy-security/SKILL.md` / `react-component-patterns/SKILL.md` (não existem)

---

## PASSO 3: Refatoração e Implementação

Para cada workflow com falhas ou desalinhamento:

1. **Reescreva o `.md`** em `.agents/workflows/` mantendo o mesmo nome de arquivo.
2. Atualize o `description:` no frontmatter para refletir o contexto HyperFrames real.
3. Corrija personas: use exclusivamente `@orchestrator`, `@hf-designer`, `@hf-builder`, `@hf-qa`.
4. Corrija skills: verifique se o path existe em `.agents/skills/` antes de referenciar.
5. Substitua comandos legados pelos comandos corretos da stack:
   - `npm install` → `bun install`
   - `// turbo <cmd>` → comando direto sem prefixo
   - `cd frontend && npx tsc` → `npx hyperframes lint`
6. Adicione bloco de referência MCP em workflows que usam CLI HyperFrames:
   ```
   > **MCP Recomendado:** Use `context7` (`/heygen-com/hyperframes`) para docs atualizadas.
   ```
7. Se identificar lacunas (workflows faltantes), crie novos arquivos complementares em `.agents/workflows/`.

---

## PASSO 4: Validação Pós-Refatoração

Após reescrever todos os workflows:

```bash
grep -rL "description:" .agents/workflows/
```

> Qualquer arquivo sem `description:` no frontmatter YAML deve ser corrigido.

```bash
grep -rn "npm install\|// turbo\|backend/.env\|PROXY_HEADER\|@ai-pipeline-architect\|@frontend-specialist" .agents/workflows/
```

> Resultado vazio = sem referências legadas órfãs. ✅

---

## ENTREGÁVEIS

1. Arquivos `.md` atualizados diretamente em `.agents/workflows/`.
2. Relatório no chat com:
   - Lista de workflows corrigidos e o que foi alterado.
   - Referências legadas removidas.
   - Novos workflows criados (se houver).
   - Confirmação de que nenhum arquivo ficou sem frontmatter `description:`.
