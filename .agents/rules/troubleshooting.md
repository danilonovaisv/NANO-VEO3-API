---
trigger: always_on
description: Troubleshooting and error diagnosis guidelines for NANO-VEO3-API
globs: ["*"]
---

# Troubleshooting Guidelines (NANO-VEO3-API)

## Debugging Workflow
- **Payload / API Errors**: Start by executing the deterministic test script `.agents/skills/veo3-api-integration/scripts/test_payload.ts`.
- **Type or Build Errors**: Execute `npx tsc --noEmit` and `npm run lint`.
- **@google/genai SDK Errors**: Verify that the `GEMINI_API_KEY` environment variable is correctly set in `.env` or `.env.local`.
