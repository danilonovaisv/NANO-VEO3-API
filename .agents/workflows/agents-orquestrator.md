---
description: Workflow para entender, auditar e alinhar a orquestração do Swarm de 4 Agentes no pipeline HyperFrames Video (7-Step Master Flow). Use ao revisar delegações de persona ou quando o fluxo de colaboração precisar ser realinhado.
---

# Workflow: /agents-orquestrator — Orquestração do Swarm HyperFrames

> **Slash Command:** `/orchestrate` ou `/agents-orquestrator`  
> **Propósito:** Auditar, alinhar e validar o fluxo de delegação entre os 4 agentes do Swarm HyperFrames e garantir que cada fase do 7-Step Master Flow está sendo executada pela persona correta.  
> **Agente Responsável:** `@orchestrator`  
> **Skills de Referência:**
>
> - `.agents/skills/caveman/SKILL.md`
> - `.agents/skills/superpower/writing-plans/SKILL.md`
> - `.agents/skills/hyperframes-core/SKILL.md`

---

## FASE 0: Leitura do Contrato de Governança

1. Leia `AGENTS.md` — confirme personas, escopos e o 7-Step Master Flow.
2. Leia `.context/project-context.md` — mapa estrutural e contrato de composição HyperFrames.
3. Leia `.context/conventions.md` — `bun`, oxlint, Conventional Commits.

```bash
cat AGENTS.md
```

**Swarm de Referência:**

| Persona | Arquivo | Fases |
| :--- | :--- | :--- |
| `@orchestrator` | `.agents/agents/orchestrator.md` | 0 (Setup), 1 (Capture) |
| `@hf-designer` | `.agents/agents/hf-designer.md` | 2 (Design), 3 (Script), 4 (Storyboard) |
| `@hf-builder` | `.agents/agents/hf-builder.md` | 5 (Build) |
| `@hf-qa` | `.agents/agents/hf-qa.md` | 6 (Validate), 7 (Render) |

---

## FASE 1: Mapeamento de Responsabilidades por Fase

Verifique se cada fase do projeto ativo em `PROJETOS/<nome>/` está sendo executada pela persona correta:

| Fase | Responsável | Artefato de Saída | Critério de Aprovação |
| :--- | :--- | :--- | :--- |
| **0 — Setup** | `@orchestrator` | Estrutura `PROJETOS/<nome>/` criada | Pastas `capture/`, `compositions/`, `snapshots/`, `renders/` existem |
| **1 — Capture** | `@orchestrator` | `capture/` populado | `capture/extracted/asset-descriptions.md` presente |
| **2 — Design** | `@hf-designer` | `DESIGN.md` | Paleta 60-30-10 documentada |
| **3 — Script** | `@hf-designer` | `SCRIPT.md` | Narração dividida por beats com minutagem |
| **4 — Storyboard** | `@hf-designer` | `STORYBOARD.md` | Beats numerados com assets referenciados |
| **5 — Build** | `@hf-builder` | `compositions/*.html` + `index.html` | `npx hyperframes lint` zero erros |
| **6 — Validate** | `@hf-qa` | Snapshots em `snapshots/` | `validate` + `inspect` sem erros críticos |
| **7 — Render** | `@hf-qa` | `renders/output.mp4` | Aprovação humana explícita obrigatória |

---

## FASE 2: Auditoria de Artefatos do Projeto Ativo

```bash
ls PROJETOS/<nome>/
ls PROJETOS/<nome>/compositions/
ls PROJETOS/<nome>/snapshots/
ls PROJETOS/<nome>/renders/
```

Verifique presença dos documentos de planejamento:

```bash
ls PROJETOS/<nome>/DESIGN.md PROJETOS/<nome>/SCRIPT.md PROJETOS/<nome>/STORYBOARD.md 2>/dev/null
```

---

## FASE 3: Verificação de Quebras de Delegação

Sinais de delegação incorreta a corrigir:

- [ ] `@hf-builder` editando `DESIGN.md` ou `SCRIPT.md` (escopo do `@hf-designer`)
- [ ] `@hf-designer` escrevendo código HTML/GSAP (escopo do `@hf-builder`)
- [ ] Render executado sem aprovação humana explícita (gate obrigatório da Fase 7)
- [ ] `npx hyperframes lint` ou `validate` não executados antes do render
- [ ] Persona inexistente sendo invocada (ex: `@db-governance`, `@composition-builder`, `@render-control`)

---

## FASE 4: Fechamento e Atualização

1. Se personas ou escopos foram ajustados, atualize `AGENTS.md`.
2. Se o diagrama de fluxo mudou, atualize `.context/project-context.md`.
3. Registre aprendizados em `.agents/data/memory.json`.

```bash
cat .agents/data/memory.json 2>/dev/null | head -20
```
