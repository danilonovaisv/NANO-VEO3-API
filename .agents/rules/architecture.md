---
trigger: always_on
description: Arquitetura de arquivos e estrutura do Next.js 15 App Router no NANO-VEO3-API
globs: ["app/**/*", "components/**/*", "lib/**/*"]
---

# Objetivo

Manter a modularidade, separação de conceitos e organização em camadas no NANO-VEO3-API.

# Regras

- **Estrutura de API**: Rotas REST devem ser centralizadas em `app/api/<entidade>/route.ts`.
- **Layouts & Páginas**: Páginas principais em `app/page.tsx`, layouts compartilhados em `app/layout.tsx`.
- **Componentes UI**: Reutilizáveis em `components/` e utilitários de estilo em `lib/utils.ts`.
- **Separação de Camadas**: A lógica de comunicação com o SDK `@google/genai` deve ser mantida em funções isoladas ou em rotas da API em `app/api/veo/`.
