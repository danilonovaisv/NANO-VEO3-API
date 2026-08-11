---
trigger: always_on
description: Systematic QA, debugging, testing strategy, and issue reporting protocol
globs: ["*"]
---

# DEBUG.MD - Systematic QA & Fix Protocol

> **Objective**: Investigate, fix, and test within a unified workflow.

---

## 🕵️ 1. INVESTIGATION (Sherlock Mode)

1. **Stack Trace**: Do not guess. Read the first line of the error log.
2. **Reproduce**: Write a small script/test to reproduce the error deterministically.
3. **Isolate**: Disable surrounding modules to isolate the root cause.

---

## 🧪 2. TESTING STRATEGY (The Guard)

1. **TDD Lite**: Write a failing (red) test case before touching production code.
2. **Unit Test**: Test individual function logic.
3. **Integration**: Test full flow from API to Database or external SDKs.

---

## 🛠️ 3. FIXING PROTOCOL (Surgeon Mode)

1. **Root Cause**: Fix the underlying root cause, never mask symptoms.
2. **Regression Check**: Re-run existing test suites to ensure no regressions.
3. **Cleanup**: Remove all temporary debug logging before finalizing.

---

## 📝 4. REPORTING

- Format: `[Error] -> [Root Cause] -> [Applied Fix] -> [Prevention]`.
