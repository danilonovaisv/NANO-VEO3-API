---
trigger: always_on
description: Diretrizes de solução de problemas e diagnóstico de erros no NANO-VEO3-API
globs: ["*"]
---

# Diagnóstico de Problemas (NANO-VEO3-API)

## Fluxo de Debugging
- **Erros de Payload / API**: Inicie executando o teste determinístico `.agents/skills/veo3-api-integration/scripts/test_payload.ts`.
- **Erros de Tipos ou Build**: Execute `npx tsc --noEmit` e `npm run lint`.
- **Erros no SDK @google/genai**: Verifique se a variável de ambiente `GEMINI_API_KEY` está corretamente configurada no arquivo `.env` ou `.env.local`.
