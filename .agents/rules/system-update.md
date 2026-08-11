---
trigger: always_on
description: Version control protocol, zero-drift policy, and human-in-the-loop release guidelines
globs: ["package.json", "README.md", "docs/**/*", "scripts/**/*"]
---

# SYSTEM-UPDATE.MD - Version Control Protocol

> **Objective**: Ensure absolute version consistency across the entire system.

---

## 🚫 1. ZERO-DRIFT POLICY

When requested to update or release a new version, the Agent MUST synchronously update all of the following files at once:

1. **`package.json`**: `version` field.
2. **`README.md`**:
   * Header: `### *Advanced Edition • vX.Y.Z Meta-Engine*`
   * Section: `## ✨ The Premium Edge (vX.Y.Z)`
3. **`docs/MASTER_OPERATIONS.md`**: Line `**Version**: X.Y.Z`

Partial version updates are **STRICTLY PROHIBITED**. A version bump is valid only when all listed files match 100%.

---

## 🛠️ 2. AUTOMATION SCRIPT

To avoid human or AI errors during version updates, use the prepared script:

```bash
node scripts/bump.js <new-version>
# Example: node scripts/bump.js 4.1.9
```

---

## 🚀 3. PUBLISHING CHECKLIST

Standard procedure for publishing after bumping version:

1. **Commit**: `git commit -m "chore: release vX.Y.Z"`
2. **Tag**: `git tag vX.Y.Z`
3. **Push Code**: `git push`
4. **Push Tag**: `git push origin vX.Y.Z`

---

## 4. HUMAN-IN-THE-LOOP PROTOCOL

> **Supreme Rule**: Never automatically push a new release (git tag / npm publish) without explicit user authorization.

1. **Standby**: When code is ready, run tests and present the report.
2. **Permission Request**: Ask "Would you like me to release version (vX.Y.Z)?".
3. **Execution**: Run `scripts/bump.js` and git commands only after explicit user confirmation ("OK", "Proceed", "Approve").
