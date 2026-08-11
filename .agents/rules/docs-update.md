---
trigger: always_on
description: Documentation sync protocol for skills, workflows, rules, and agents
globs: ["docs/**/*", "*.md"]
---

# DOCS-UPDATE.MD - Documentation Sync Protocol

> **Objective**: Ensure documentation remains synchronized with the actual codebase. Prevent outdated documentation.

---

## 📋 1. DOCS UPDATE CHECKLIST

Whenever a new feature is added, the Agent MUST check and update the following files:

### A. When adding a new SKILL

- [ ] `SKILLS.md` - Add the skill to the standard list
- [ ] `docs/SKILLS_GUIDE.md` - Add to the appropriate category
- [ ] `README.md` - Update the Skill count

### B. When adding a new WORKFLOW

- [ ] `docs/WORKFLOW_GUIDE.md` - Add a guide section
- [ ] `README.md` - Update the Workflow count + add to the `/command` list

### C. When adding a new RULE

- [ ] `docs/RULES_GUIDE.md` - Add to the appropriate classification table (Auto/On-Demand).
- [ ] `README.md` - Add key feature rules to the Features section if applicable.

### D. When adding a new AGENT

- [ ] `docs/AGENTS_GUIDE.md` - Describe roles and responsibilities
- [ ] `README.md` - Update the agent count if changed

---

## 🔄 2. AUTOMATED PROCESS

1. **Detect changes**: After creating a new file in `.agents/`
2. **Run script**: `node .agents/scripts/update-docs.js`
3. **Review output**: The script will display current statistics
4. **Manual update**: Follow the checklist above
5. **Commit docs**: Create a separate commit for documentation updates

---

## 📊 3. STANDARD FORMAT

### In README (Statistics table)

```markdown
| **XX** Skill Sets | **XX** Expert Agents | **XX** Workflows |
```

### In SKILLS_GUIDE

```markdown
### 🛡️ Security Group
*   **`skill-name`**: Brief description of the skill
```

### In WORKFLOW_GUIDE

```markdown
### `/workflow-name` - Concise title
- **When to use**: Description of the use case
- **Usage**: `/workflow-name [params]`
```

---

## ⚠️ 4. IMPORTANT NOTES

1. **Maintain data consistency**: Accurately count total files and references.
2. **Write concise descriptions**: One clear line per skill or workflow.
3. **Separate commits**: Isolate documentation updates into dedicated commits for review.

---

## 🎯 5. OBJECTIVES

- Documentation must 100% accurately reflect existing features.
- New users should understand the system solely from the main README.
- No undocumented "hidden features".
