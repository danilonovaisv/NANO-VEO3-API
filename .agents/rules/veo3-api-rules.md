---
trigger: always_on
description: Rules and consumption standards for Google Veo 3 API and @google/genai SDK
globs: ["app/api/veo/**/*", "lib/**/*"]
---

# Google Veo 3 API Integration Rules

> **Objective**: Standardize video generation requests, long-running operation polling, and error handling for Veo 3.

---

## 1. `@google/genai` SDK Initialization
- Use the `GoogleGenAI` class imported from `@google/genai`.
- Ensure the `GEMINI_API_KEY` environment variable is defined before initializing the client instance.

---

## 2. Video Generation Lifecycle
1. **Request Dispatch**: The generation call (`generateVideos`) starts a long-running operation.
2. **Operation Polling**: Poll the `/api/veo/operation` endpoint until the operation `done` property equals `true`.
3. **Download and Streaming**: Once completed (`done: true`), safely handle the returned video URL or binary data.

---

## 3. Resilience and Timeouts
- Set reasonable timeout thresholds for operation polling (e.g., 10-minute timeout limit).
- If the operation returns an `error` object, process the message and return a structured error to the HTTP client without leaking internal Google Cloud infrastructure details.
