---
description: Workflow de descoberta e calibração de ambiente HyperFrames (HTML/CSS/GSAP, bun, npx hyperframes CLI, ElevenLabs, Gemini). Use ao iniciar uma sessão de trabalho ou ao executar /calibragem-descoberta.
---

# 🔄 WORKFLOW: Calibragem e Validação de Contexto (Project Boot)

**Gatilho:** `/calibragem-descoberta` ou `init_session`  
**Agentes Responsáveis:** `@orchestrator`  
**Skills de Referência:**

- `.agents/skills/caveman/SKILL.md`
- `.agents/skills/superpower/writing-plans/SKILL.md`

> **MCP Recomendado:** Use `context7` para consultar documentação atualizada de comandos CLI antes de executar qualquer gate de qualidade.

---

## 1. Contexto do Projeto

Este repositório é um **HyperFrames Video Agent Starter Kit** — produção de vídeos MP4 determinísticos via HTML, CSS e GSAP renderizados por Chrome Headless + FFmpeg.

**Stack:**

- Runtime: `bun` (package manager obrigatório) + `node`
- CLI: `npx hyperframes` (`@hyperframes/core`, `engine`, `player`, `producer`, `studio`)
- Animações: GSAP (timelines `paused`, registradas em `window.__timelines`)
- TTS: ElevenLabs (`ELEVENLABS_API_KEY`)
- IA: Gemini (`GEMINI_API_KEY`) + OpenRouter (`OPENROUTER_API_KEY`)
- GCP: `gcloud` ADC para serviços Google Cloud opcionais

**Sem:** monorepo Turbo, backend/proxy Node, PROXY_HEADER, frontend React/TypeScript.

---

## 2. Passos de Calibragem

### Passo 1: Leitura de Regras (Deep Read)

- **Objetivo:** Carregar constituição e contexto antes de qualquer execução.
- **Ações:**
  1. Leia `AGENTS.md` — governança do Swarm, fluxo 7-Step, personas.
  2. Leia `.context/project-context.md` — mapa estrutural e contrato de composição.
  3. Leia `.context/conventions.md` — convenções de código, linting, commits.
- **Validação:** Se qualquer arquivo faltar, pare e alerte o usuário antes de continuar.

```bash
ls AGENTS.md .context/project-context.md .context/conventions.md
```

---

### Passo 2: Health Check de Dependências

- **Objetivo:** Garantir que `node_modules/` e pacotes `@hyperframes/*` estão presentes.
- **Ações:**
  1. Verifique se `node_modules/` existe.
  2. Confirme que `@hyperframes/core`, `engine`, `player`, `producer` e `studio` estão listados em `package.json`.

```bash
ls node_modules/@hyperframes/
cat package.json
```

> ⚠️ Se `node_modules/` ausente, instale com `bun install` (não `npm install`).

---

### Passo 3: Verificação da CLI HyperFrames

- **Objetivo:** Confirmar que `npx hyperframes` responde e está na versão esperada.
- **Ações:**
  1. Verifique a versão da CLI.
  2. Execute o diagnóstico de dependências do ambiente.

```bash
npx hyperframes --version
npx hyperframes doctor
```

> Se `doctor` reportar dependências faltantes (Chrome, FFmpeg), siga as instruções de instalação sugeridas.

---

### Passo 4: Verificação de Secrets (`.env.local`)

- **Objetivo:** Garantir que as chaves de API necessárias estão configuradas.
- **Ações:**
  1. Confirme existência do arquivo `.env.local` na raiz.
  2. Verifique presença das variáveis obrigatórias.

```bash
ls .env.local
grep -E "ELEVENLABS_API_KEY|GEMINI_API_KEY|OPENROUTER_API_KEY" .env.local
```

**Variáveis obrigatórias:**

| Variável | Uso |
| :--- | :--- |
| `ELEVENLABS_API_KEY` | TTS via `npx hyperframes tts` |
| `GEMINI_API_KEY` | Geração de scripts e assets IA |
| `OPENROUTER_API_KEY` | Modelos alternativos via OpenRouter |

> GCP ADC (`gcloud`) é opcional — necessário apenas se usar serviços Vertex AI.

---

### Passo 5: Verificação de GCP ADC (Opcional)

- **Objetivo:** Verificar acesso a serviços Google Cloud se necessário.
- **Ações:**
  1. Tente obter um token ADC.
  2. Se falhar, instrua o usuário a autenticar.

```bash
gcloud auth application-default print-access-token 2>&1 | head -1
```

> Se falhar: `gcloud auth application-default login`

---

### Passo 6: Inventário de Projetos Ativos

- **Objetivo:** Mapear projetos existentes em `PROJETOS/`.
- **Ações:**
  1. Liste subdiretórios em `PROJETOS/`.
  2. Para cada projeto, verifique se possui a estrutura obrigatória: `capture/`, `compositions/`, `snapshots/`, `renders/`.

```bash
ls -d PROJETOS/*/
```

---

## 3. Protocolo de Finalização

Apresente o seguinte relatório no chat ao concluir:

### 🏁 RELATÓRIO DE CALIBRAGEM

**🟢 SISTEMA HYPERFRAMES: ONLINE**

| Módulo | Status | Detalhes |
| :--- | :--- | :--- |
| **Contexto** | [✅/❌] | `AGENTS.md`, `project-context.md`, `conventions.md` lidos |
| **Dependências** | [✅/❌] | `node_modules/@hyperframes/*` presente |
| **CLI HyperFrames** | [✅/❌] | Versão detectada + `doctor` sem erros críticos |
| **Secrets** | [✅/⚠️/❌] | `.env.local` com `ELEVENLABS`, `GEMINI`, `OPENROUTER` |
| **GCP ADC** | [✅/⚠️/N/A] | Token válido ou não necessário |
| **PROJETOS/** | [✅/❌] | N projetos mapeados com estrutura isolada correta |

**Próxima Ação Recomendada:**

- Novo projeto: `/workflow-01-intake` → `/workflow-02-new-project`
- Projeto existente: `/workflow-04-warm-start` ou `/workflow-10-composition-build`
- Problemas CLI: `/workflow-11-qa-validation` (troubleshooting gate)
