# Node.js & Next.js 15 Rules for NANO-VEO3-API

> Regras de runtime, ambiente Node.js e execução de scripts no projeto NANO-VEO3-API.

## Stack Detectada

- **Runtime**: Node.js >= 18 (ESM / TypeScript 5)
- **Framework**: Next.js 15 (App Router)
- **Gerenciador de Pacotes**: npm (`package.json`, `package-lock.json`)
- **Linter**: ESLint (Flat Config `eslint.config.mjs`, `eslint-config-next`)
- **Build & Execução**: `npm run dev`, `npm run build`, `npm run lint`

## Convenções de Código Node.js / TypeScript

- Utilize ESM (`import` / `export`) em todo o codebase TypeScript.
- Scripts utilitários em `scripts/` ou `.agents/skills/*/scripts/` devem ser executados com `npx tsx <script>.ts`.
- Mantenha scripts utilitários modulares e focados em tarefas únicas.
- Prefira `const` sobre `let`; nunca utilize `var`.
- Todos os scripts automatizados devem finalizar com `exit 0` em caso de sucesso ou `exit 1` e log estruturado em `stderr` em falhas fatais.

## Execução de Comandos em Terminal

- Para validação de código: `npm run lint`
- Para verificação de tipos: `npx tsc --noEmit`
- Para execução de scripts TypeScript: `npx tsx <caminho_do_script>`
