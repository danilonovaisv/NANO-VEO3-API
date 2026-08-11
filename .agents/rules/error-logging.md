---
trigger: always_on
description: Automatic error tracking, logging format, and continuous learning protocol
globs: ["*"]
---

# ERROR-LOGGING.MD - Automatic Error Tracking & Learning

> **Objective**: Log every error encountered during development to facilitate learning and continuous improvement. Prevent error recurrence.

---

## 🎯 1. WHEN TO LOG ERRORS

The Agent MUST log errors to the `ERRORS.md` file in the following cases:

1. **Syntax Errors**:

- Missing brackets or semicolons
- Incorrect import paths
- Typos in variable or function names

1. **Logic Errors**:

- Code executes but produces incorrect results
- `if/else` conditions failing to cover all cases
- Infinite loops

1. **Integration Errors**:

- Failed API calls
- Database query errors
- Module not found

1. **Runtime Errors**:

- Null pointer exceptions
- Type mismatches
- Out-of-memory errors

1. **Agent Errors (CRITICAL)**:

- **Misinterpretation**: Agent misunderstands user intent or documentation.
- **Execution Error**: Deviating from agreed logic in the Plan, deleting code, or omitting imports.
- **Hang/Loop**: Agent enters an infinite loop or hangs during tool invocation.
- **Hallucination**: Providing non-existent information regarding the codebase or API specs.

1. **Process & Test Failures**:

- **Test Failure**: Whenever a test (Unit, E2E, Regression) fails.
- **Build/Lint Failure**: Errors during packaging or code quality checks.
- **Infrastructure Failure**: Environment issues, Docker errors, or disk space exhaustion.

---

## 📝 2. ERROR LOGGING FORMAT

Each error MUST adhere to the following structure in `ERRORS.md`:

```markdown
## [YYYY-MM-DD HH:MM] - Concise Error Title

- **Type**: [Syntax/Logic/Integration/Runtime/Agent/Process]
- **Severity**: [Low/Medium/High/Critical]
- **File**: `path/to/file.extension:line_number`
- **Agent**: [Name of executing Agent]
- **Root Cause**: Description of root cause (1-2 sentences)
- **Error Message**:
```

[Error code or stack trace]

```
- **Fix Applied**: Specific action taken
- **Prevention**: How to prevent this error from recurring
- **Status**: [Fixed/Investigating/Deferred]

---
```

---

## 🔄 3. AUTOMATED PROCESS

1. **Detection**: When an error occurs (test failure, build failure, runtime error).
2. **Classification**: Determine Type and Severity.
3. **Logging**: Append to `ERRORS.md` using the standard format.
4. **Notification**: Inform the user that the error has been logged and provide the file path.
5. **Resolution**: Fix the error and update Status.

---

## 📍 4. FILE STORAGE LOCATION

- **Main file**: `ERRORS.md` (in the project root directory)
- **Backup**: `.agents/logs/errors-[YYYY-MM].md` (organized by month)

---

## ⚠️ 5. IMPORTANT NOTES

1. **Never delete old errors**: Errors are valuable historical learning assets.
2. **Always update Status**: Mark as Fixed once resolved.
3. **Privacy**: Do not log sensitive information (API Keys, Passwords, Secrets).
4. **Periodic review**: Review errors at the end of every week to refine guardrails.

---

## 🎓 6. LEARNING FROM ERRORS

Any error that recurs two or more times MUST be converted into:

- **A new rule**: To automatically prevent it
- **A test case**: To detect it early
- **A checklist item**: For the pre-flight check
