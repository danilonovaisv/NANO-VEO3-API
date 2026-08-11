---
trigger: always_on
description: Automatic skill trigger conditions, scenario matching, and routing rules
globs: ["*"]
---

# Skill Trigger Rules

> Scenario match → auto-trigger. Each rule has ✅ Use when / ❌ NOT when for accurate routing.

## P0 Mandatory Triggers

| Scenario                                      | Skill                                           | ❌ NOT when                                                                    |
| --------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| Error/Bug (test/build/lint failure)           | systematic-debugging                            | Missing env var/path error (fix directly); user already gave fix               |
| Before claiming completion                    | verification-before-completion                  | Pure research/exploration/Q&A; only changed docs/comments                      |
| Exit signal ("that is all"/"heading out"/etc.)| session-end + memory-flush                      | Brief pause ("hmm let me think"/"hold on"); mid-task looking at something else |
| New Skill/MCP file added or installed         | Security audit scan                             | Self-written from scratch with no external code; single-line config change     |

## Web Retrieval Strategy

| Target Content                     | Primary Tool               | Fallback                                        |
| ---------------------------------- | -------------------------- | ----------------------------------------------- |
| Technical docs / API specs         | `ctx7` CLI / Context7      | `search_web`                                    |
| Social media platforms (X/Twitter) | Dedicated MCP tools        | Web fetch                                       |
| General articles/blogs/news        | `fetch_jina`               | `fetch_page` → `WebFetch`                       |
| JS-heavy SPA / login-required      | Playwright                 | —                                               |
| GitHub                             | `gh` CLI (Bash)            | `WebFetch`                                      |

### Hard Rules

- **Never** use WebFetch as first choice (social platforms always fail)
- **Never** try >2 tools on same URL (2 failures → tell user, change approach)
- **Never** ignore scenario matches when a P0 trigger condition is met.
