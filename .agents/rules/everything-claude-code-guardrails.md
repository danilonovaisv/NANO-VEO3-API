---
trigger: always_on
description: Security guardrails, shell safety, and tool execution constraints
globs: ["*"]
---

# EVERYTHING-CLAUDE-CODE-GUARDRAILS.MD - Claude Code Security & Behavior Rules

> **Objective**: Strict security constraints, command execution rules, and web/tool safety.

---

## 🛡️ 1. Shell & Execution Safety

1. **No Destructive Commands**: Never run `rm -rf /`, `mkfs`, or unverified destructive disk operations without explicit user confirmation.
2. **VPS Code Edit Prohibition**: Never modify code files directly via SSH on remote servers. Use local edit → commit → push → pull flow.
3. **Command Verification**: Always verify command parameters before execution.

---

## 🔒 2. Secret Protection

1. **API Keys**: Never log or print `GEMINI_API_KEY`, tokens, or private credentials in raw output.
2. **Environment Files**: Do not commit `.env`, `.env.local`, or credential files to source control.

---

## 🌐 3. Web & Search Safety

| Scenario | Primary Tool | Fallback |
| :--- | :--- | :--- |
| Documentation search | `ctx7` CLI / Context7 | `search_web` |
| GitHub Repositories | `gh` CLI | Web search |
| General web search | `search_web` | Read URL Content |

---

## 🚫 Hard Rules

- **Never** expose secrets in logs or responses.
- **Never** bypass schema validations or linter errors.
- **Never** perform silent failures.
