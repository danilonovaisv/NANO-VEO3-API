---
description: Execução de testes de contrato de payloads, testes linter e verificação determinística de requisições.
---

# Workflow: Teste de Endpoints e Payloads (`/test`)

> **Slash Command**: `/test`

---

## Passo 1: Executar Teste Determinístico de Payload Veo 3
Executar o script de validação de estrutura de payload:
```bash
npx tsx .agents/skills/veo3-api-integration/scripts/test_payload.ts
```

## Passo 2: Executar Linter
Executar a verificação de código com ESLint:
```bash
npm run lint
```

## Passo 3: Relatório de Auto-Healing
Se ocorrer falha nos esquemas de payload ou sintaxe:
1. Identificar a rota afetada em `app/api/`.
2. Aplicar a correção com base no contrato do Zod Schema.
3. Re-executar o teste para garantir resolução.
