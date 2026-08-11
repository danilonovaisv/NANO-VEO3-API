---
trigger: always_on
description: Node.js runtime, Next.js 15 App Router, and script execution rules for NANO-VEO3-API
globs: ["package.json", "next.config.mjs", "eslint.config.mjs", "app/**/*", "lib/**/*"]
---

# Node.js & Next.js 15 Guidelines for NANO-VEO3-API

> Runtime rules, Node.js environment setup, and script execution guidelines for NANO-VEO3-API.

## Detected Stack

- **Runtime**: Node.js >= 18 (ESM / TypeScript 5)
- **Framework**: Next.js 15 (App Router)
- **Package Manager**: npm (`package.json`, `package-lock.json`)
- **Linter**: ESLint (Flat Config `eslint.config.mjs`, `eslint-config-next`)
- **Build & Execution**: `npm run dev`, `npm run build`, `npm run lint`

## Code & Runtime Conventions

- Use ESM (`import` / `export`) exclusively across the entire TypeScript codebase.
- Never mix CommonJS (`require`) unless strictly necessary for legacy script interoperability.
- Always execute scripts through package.json scripts or `npx tsx` for TypeScript scripts.
