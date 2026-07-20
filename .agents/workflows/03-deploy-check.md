---
description: Validação pre-flight de build Next.js 15, variáveis de ambiente e checagem de integridade antes do deploy.
---

# Workflow: Verificação Pre-flight para Deploy (`/deploy-check`)

> **Slash Command**: `/deploy-check`

---

## Passo 1: Checagem de Variáveis de Ambiente
1. Verificar a existência do arquivo `.env.example`.
2. Assegurar que `GEMINI_API_KEY` esteja documentada como necessária.

## Passo 2: Validação da Suíte de Linter & Tipos
```bash
npm run lint
npx tsc --noEmit
```

## Passo 3: Teste de Build Next.js
Executar a compilação do pacote de produção:
```bash
npm run build
```
Confirmar que não ocorrem erros de hidratação ou falhas de bundling de rotas.
