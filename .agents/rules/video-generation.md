---
trigger: always_on
description: Video generation and orchestration standards using Google Veo 3 API
globs: ["app/api/veo/**/*", "lib/**/*"]
---

# Video Generation Guidelines

## Objective
Ensure resilient, validated, and well-handled video generation calls using Google Veo 3 (`@google/genai`).

## Rules
- **Asynchronous Generation**: Video generation calls launch long-running operations that require status polling (`/api/veo/operation`).
- **Input Validation**: All prompts and parameters (`aspectRatio`, `durationSeconds`) MUST be validated via Zod Schema.
- **Media Grids**: Video previews and player displays must use responsive flat CSS grids.
