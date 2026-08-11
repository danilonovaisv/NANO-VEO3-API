---
trigger: always_on
description: Production-grade code quality, anti-patterns, and testing standards
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.json"]
---

# CODE-QUALITY.MD - Engineering Excellence

> **Goal**: Ensure source code meets "Production-Grade" standards from the very first line.

---

## 🚫 1. Anti-Patterns (Strictly Prohibited)

1. **Console Logs**: Do not commit `console.log` or `print()` statements to the main branch (except in temporary debug files).
2. **Magic Numbers**: Do not use hard-coded numbers in logic; define constants instead.
3. **Any Type**: Minimize the use of `any` in TypeScript; define types explicitly.
4. **Long Functions**: Functions should not exceed 50 lines; break down complex logic.

---

## ✅ 2. Best Practices (Recommended)

1. **Naming Conventions**:

* Variable/Function: `camelCase` (e.g., `userProfile`)
* Class/Component: `PascalCase` (e.g., `UserProfile`)
* Constant: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`)
* File: `kebab-case` (e.g., `user-profile.ts`)

1. **Comments**:

* Explain the "WHY," not the "WHAT."
* Use JSDoc/DocStrings for public functions.

1. **Error Handling**:

* Always use `try/catch` with `async/await`.
* Do not swallow errors (silent failures); log or throw them.

---

## 🧪 3. Testing Requirements

1. **Unit Tests**: Complex logic must be accompanied by unit tests.
2. **Coverage**: Aim for > 80% code coverage for core modules.
