---
trigger: always_on
description: File architecture and Next.js 15 App Router structural standards for NANO-VEO3-API
globs: ["app/**/*", "components/**/*", "lib/**/*"]
---

# Architecture & Structure Guidelines

## Objective

Maintain strict modularity, separation of concerns, and clean layered organization across NANO-VEO3-API.

## Rules

- **API Structure**: Centralize all REST routes in `app/api/<entity>/route.ts`.
- **Layouts & Pages**: Define main pages in `app/page.tsx` and shared layouts in `app/layout.tsx`.
- **UI Components**: Keep reusable components in `components/` and utility functions in `lib/utils.ts`.
- **Layer Separation**: Isolate all `@google/genai` SDK logic into dedicated functions or API routes under `app/api/veo/`.
