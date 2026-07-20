---
description: Workflow de descoberta e calibração de ambiente NANO-VEO3-API (Next.js 15, TypeScript, @google/genai, Veo 3 API). Use ao iniciar uma sessão de trabalho ou ao executar /calibragem-descoberta.
---

# 🔄 WORKFLOW: Calibragem e Validação de Contexto (Boot NANO-VEO3-API)

**Gatilho:** `/calibragem-descoberta`  
**Agentes Responsáveis:** `@api-orchestrator`

---

## 1. Contexto do Projeto

Este repositório é o **NANO-VEO3-API** — backend API e interface de controle para geração de vídeos alimentada pelo modelo **Google Veo 3** (`@google/genai`).

**Stack:**
- Runtime & Framework: Node.js >= 18 + Next.js 15.3.5 (App Router) + TypeScript 5
- Package Manager: `npm`
- IA: `@google/genai` (^1.8.0) para Veo 3 e Gemini
- Estilização & UI: Tailwind CSS v4, Lucide React, Radix UI, react-player

---

## 2. Passos de Calibragem

### Passo 1: Leitura de Regras (Deep Read)
1. Leia `AGENTS.md` — governança e regras inegociáveis.
2. Leia `.context/project-context.md` — mapa estrutural e rotas de API.
3. Leia `.context/conventions.md` — convenções de código e Zod schemas.

```bash
ls AGENTS.md .context/project-context.md .context/conventions.md
```

### Passo 2: Health Check de Dependências
1. Verifique se `node_modules/` existe.
2. Confirme que `@google/genai` e `next` estão em `package.json`.

```bash
cat package.json
```

### Passo 3: Verificação de Secrets (`.env` / `.env.local`)
1. Confirme a existência do arquivo `.env` ou `.env.local`.
2. Verifique a presença da variável de ambiente obrigatória `GEMINI_API_KEY`.

```bash
grep -E "GEMINI_API_KEY" .env .env.local 2>/dev/null
```

---

## 3. Relatório de Calibragem

### 🏁 RELATÓRIO DE CALIBRAGEM

**🟢 NANO-VEO3-API: ONLINE**

| Módulo | Status | Detalhes |
| :--- | :--- | :--- |
| **Contexto** | [✅/❌] | `AGENTS.md`, `project-context.md`, `conventions.md` |
| **Dependências** | [✅/❌] | `package.json` com `@google/genai` e Next.js 15 |
| **Secrets** | [✅/⚠️] | `GEMINI_API_KEY` configurada |
| **Payload Test** | [✅/❌] | `npx tsx .agents/skills/veo3-api-integration/scripts/test_payload.ts` |
