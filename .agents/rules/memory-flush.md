---
trigger: always_on
description: Auto-save, state logging, and session flush protocols
globs: ["*"]
---

# Memory Flush Protocol

> Don't rely on user triggers — auto-save. User might close the window at any time.

## Trigger Conditions

- **Non-trivial task starts** → Immediately write today.md session header: `### SN (~HH:MM) [project] Working on XXX...` (crash recovery anchor, fill in details after completion)
- Each task completed → Update today.md
- Each code commit → Update PROJECT_CONTEXT.md
- Architecture/strategy decision → Immediately record in today.md
- Important external model analysis received → Record in patterns.md

## Exit Signals (Execute full Flush immediately)

"That is all for now" / "Done for today" / "I am heading out" / "Going out" / "Talk later" / "Closing window" → Immediately run session-end
