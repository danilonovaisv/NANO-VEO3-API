# 👻 Ghost System Orchestration & Agent Protocol (AGENTS.md)

## 🌌 Visão Geral & Identidade do Sistema

Este repositório (**NANO-VEO3-API**) é a infraestrutura de backend API e interface de controle para geração de vídeos cinematográficos alimentados pelo modelo **Google Veo 3** (`@google/genai`) e **Gemini 2.0/3.0**.

**Lema:** "Criatividade Generativa com Alta Performance e Controle Estrito de API."

---

## 📐 Regras Inegociáveis (Non-Negotiables)

1. **Stack Tecnológica**:
   - **Framework**: Next.js 15 (App Router) em TypeScript (Strict Mode).
   - **SDK IA**: `@google/genai` (^1.8.0) para chamadas ao Veo 3 e Gemini.
   - **Estilização**: Tailwind CSS v4 em Grids Planos Responsivos sem simulações 3D de câmera.
   - **Validação**: Todas as rotas em `app/api/` DEVEM utilizar Zod Schemas para sanitização de requisições.

2. **Segurança & Credenciais**:
   - **Zero Secret Exposure**: NUNCA exponha `GEMINI_API_KEY`, tokens ou URLs de assinatura em logs, retornos de API públicos ou commit de arquivos `.env`.
   - Utilize obrigatoriamente variáveis de ambiente (`process.env.GEMINI_API_KEY`).

3. **Arquitetura de Endpoints (`app/api/**`)**:
   - Respostas de API DEVEM ser padronizadas usando `NextResponse.json({ success, data, error })`.
   - Tratamento de Long-Running Operations do Veo 3 via polling (`app/api/veo/operation`).

4. **Integridade Visual & Mídia**:
   - Grids responsivos de mídia e componentes baseados em `react-player` e `react-dropzone`.
   - Manter a integridade de logos e marcas visuais sem distorções.

---

## 🛠️ Orquestração de Agentes

Agentes operam em sinergia a partir de `.agents/`:
- **Orquestrador de API**: `@api-orchestrator` (`.agents/agents/api-orchestrator.md`)
- **Especialista Veo 3**: `@veo-integration-specialist` (`.agents/agents/veo-integration-specialist.md`)
- **Especialista Frontend**: `@frontend-specialist` (`.agents/agents/frontend-specialist.md`)

---

## ⚡ Slash Commands & Workflows

- `/audit-api`: Executa a auditoria de tipos e endpoints em `app/api/`.
- `/test`: Executa os testes determinísticos de payload Zod e linter.
- `/deploy-check`: Executa a validação pre-flight de build Next.js 15.
