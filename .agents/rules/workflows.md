---
trigger: always_on
description: Workflow execution governance and slash command standards for NANO-VEO3-API
globs: ["*"]
---

# Workflow Governance Guidelines

## Objective
Ensure strict compliance with standardized workflows (`/audit-api`, `/test`, `/deploy-check`) and Agent Swarm orchestration.

## Rules
- **Slash Commands**: Keep workflows synchronized with slash commands `/audit-api`, `/test`, `/deploy-check`.
- **Quality Gates**: Never skip type-checking (`npx tsc --noEmit`) or linting (`npm run lint`).
- **Deterministic Validation**: Always run `.agents/skills/veo3-api-integration/scripts/test_payload.ts` to validate Veo 3 API schemas.
