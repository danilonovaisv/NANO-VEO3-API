---
trigger: always_on
description: TypeScript and Schema Validation Rules for NANO-VEO3-API
globs: ["**/*.ts", "**/*.tsx"]
---

# TypeScript & Zod Validation Rules

> **Objetivo**: Garantir tipagem estrita, prevenção de runtime errors e sanitização de payloads de API.

---

## 1. Strict Typing (Tipagem Estrita)
- **Proibição de `any`**: O uso de `any` é proibido. Utilize interfaces explícitas, `type` alias, ou `unknown` com type guards.
- **Strict Mode**: Todas as variáveis, argumentos de função e retornos devem ter tipos declarados ou inferidos com segurança pelo TypeScript 5.
- **Interfaces de API**: Defina tipos claros para requisições e respostas de endpoints (ex: `VeoGenerateRequest`, `VeoOperationResponse`).

---

## 2. Validação com Zod
- **Sanitização Obrigatória**: Todas as rotas em `app/api/**` que aceitam payloads HTTP POST/PUT/PATCH devem validar a entrada com um Zod Schema antes da execução.
- **Inferência**: Utilize `z.infer<typeof Schema>` para sincronizar tipos de entrada TypeScript com a validação em runtime.
- **Tratamento de Erros de Schema**: Quando o parse falhar, retorne resposta JSON com status `400 Bad Request` e a lista formatada de erros do Zod.
