---
trigger: always_on
description: Strict TypeScript and Zod schema validation rules for NANO-VEO3-API
globs: ["**/*.ts", "**/*.tsx"]
---

# TypeScript & Zod Validation Rules

> **Objective**: Ensure strict typing, prevent runtime errors, and enforce API payload sanitization.

---

## 1. Strict Typing
- **No `any`**: Using `any` is strictly prohibited. Use explicit interfaces, `type` aliases, or `unknown` with type guards.
- **Strict Mode**: All variables, function arguments, and return values must have explicit types or safely inferred types under TypeScript 5.
- **API Interfaces**: Define explicit types for request bodies and API endpoint responses (e.g., `VeoGenerateRequest`, `VeoOperationResponse`).

---

## 2. Zod Schema Validation
- **Mandatory Sanitization**: Every API route in `app/api/**` handling HTTP POST/PUT/PATCH payloads MUST validate input using a Zod schema before processing.
- **Type Inference**: Use `z.infer<typeof Schema>` to keep TypeScript types perfectly synchronized with runtime validation.
- **Schema Error Handling**: When schema validation fails, return a JSON response with HTTP status `400 Bad Request` and formatted Zod error details.
