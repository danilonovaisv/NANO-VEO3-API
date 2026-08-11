---
trigger: always_on
description: Security and secret protection guardrails for Google GenAI and Veo 3 API in NANO-VEO3-API
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.json"]
---

# SECURITY.MD - Security & Secret Protection Guardrails

> **Objective**: Protect Google GenAI / Veo 3 API credentials, environment variables, and enforce secure execution standards.

---

## 🚫 1. FORBIDDEN ACTIONS

1. **Hardcoding Credentials & API Keys**: Never embed `GEMINI_API_KEY` or any private token directly in client code, public API responses, or committed files.
2. **Exposing Secrets in Logs**: Never log environment variables, request Authorization headers, or full signed URLs to stdout or external reporting channels.
3. **Unsanitized Endpoints**: Never expose public API endpoints that trigger Veo 3 generation without Zod schema validation and rate limiting considerations.

---

## ✅ 2. REQUIRED BEST PRACTICES

1. **Environment Variables**: Always retrieve API keys using server-side `process.env.GEMINI_API_KEY`.
2. **Server-Side API Calls**: Execute `@google/genai` SDK operations exclusively inside Next.js server-side API routes (`app/api/**`).
3. **Zod Input Sanitization**: Validate all incoming parameters (prompt, aspect ratio, duration) on every request.
