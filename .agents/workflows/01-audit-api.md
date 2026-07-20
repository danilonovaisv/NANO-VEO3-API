---
description: Auditoria de endpoints de API em app/api/ para checagem de tipos TypeScript, resiliência REST e integração com Veo 3 SDK.
---

# Workflow: Auditoria de Endpoints de API (`/audit-api`)

> **Slash Command**: `/audit-api`

---

## Passo 1: Mapear Endpoints Existentes
1. Listar todas as rotas localizadas dentro de `app/api/**/route.ts`.
2. Verificar se cada rota possui exportação nomeada explícita (`GET`, `POST`, etc.).

## Passo 2: Audit de Validação e Segurança
1. Confirmar se requisições POST/PUT utilizam Zod Schemas para sanitização dos dados.
2. Verificar se nenhuma chave `GEMINI_API_KEY` ou secret está codificada diretamente no código fonte.

## Passo 3: Verificação de Tipagem TypeScript
1. Executar a checagem de compilação sem emissão de código:
```bash
npx tsc --noEmit
```
2. Garantir zero erros de compilação.
