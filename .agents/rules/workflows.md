---
trigger: always_on
description: Governança de execução de workflows e slash commands no NANO-VEO3-API
globs: ["*"]
---

# Objetivo

Garantir conformidade com os workflows padronizados (`/audit-api`, `/test`, `/deploy-check`) e orquestração do Swarm.

# Regras

- **Slash Commands**: Mantenha workflows sincronizados com os comandos `/audit-api`, `/test`, `/deploy-check`.
- **Gates de Qualidade**: Não pule validações de tipagem (`npx tsc --noEmit`) ou linter (`npm run lint`).
- **Validação Determinística**: Execute sempre o script `.agents/skills/veo3-api-integration/scripts/test_payload.ts` para testar esquemas do Veo 3.
