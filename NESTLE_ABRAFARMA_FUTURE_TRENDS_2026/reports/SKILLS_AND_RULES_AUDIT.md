# SKILLS AND RULES AUDIT

**Project:** NESTLE_ABRAFARMA_FUTURE_TRENDS_2026 | **Date:** 2026-08-06

## CRITICAL SKILLS

| Skill                                 | Path                                                  | Status    | Notes                                               |
| ------------------------------------- | ----------------------------------------------------- | --------- | --------------------------------------------------- |
| veo3-1-first-last-frame-to-video      | .agents/skills/veo3-1-first-last-frame-to-video/      | CONFIRMED | PRIMARY — supports first+last frame. 8s max.        |
| veo3-1-first-last-frame-to-video-fast | .agents/skills/veo3-1-first-last-frame-to-video-fast/ | CONFIRMED | Test runs before quality dispatch.                  |
| veo3-api-integration                  | .agents/skills/veo3-api-integration/                  | CONFIRMED | Payload scripts — Nestle NAN COMFOR pipeline ready. |
| nano-banana-pro                       | .agents/skills/nano-banana-pro/                       | CONFIRMED | Keyframe image generation.                          |
| image-upscaling                       | .agents/skills/image-upscaling/                       | CONFIRMED | Required: Veo outputs 1080p → LED needs 1792x1536.  |
| ffmpeg-video-editor                   | .agents/skills/ffmpeg-video-editor/                   | CONFIRMED | Post-processing, clip joining, H.264 export.        |
| storyboard                            | .agents/skills/storyboard/                            | CONFIRMED | Scene planning.                                     |
| screenwriting                         | .agents/skills/screenwriting/                         | CONFIRMED | Script creation.                                    |

## AGENTS

| Agent                       | File                                         | Status    |
| --------------------------- | -------------------------------------------- | --------- |
| @router-orchestrator        | .agents/agents/router-orchestrator.md        | CONFIRMED |
| @api-orchestrator           | .agents/agents/api-orchestrator.md           | CONFIRMED |
| @veo-integration-specialist | .agents/agents/veo-integration-specialist.md | CONFIRMED |
| @ai-video-engineer          | .agents/agents/ai-video-engineer.md          | CONFIRMED |
| @asset-manager              | .agents/agents/asset-manager.md              | CONFIRMED |

## NON-NEGOTIABLE MODEL RULE

Veo 3 Highest Quality (veo-3.0-generate-001) = NO first+last frame support.
First+last frame = use veo3-1-first-last-frame-to-video via eachlabs.ai API.
Document this limitation in every JSON prompt under model_strategy.reason.

## TECH STACK CONFIRMED

Next.js 15 App Router | TypeScript Strict | @google/genai ^1.8.0 | Tailwind v4 | Zod
API: /api/veo/generate | /api/veo/operation | /api/veo/download
Credentials: process.env.GEMINI_API_KEY — never expose in logs or public responses.

## CGI WORKFLOW BEST PRACTICES (from guides/CGI-VIDEOS)

- Always test on Fast model before dispatching Quality
- JSON prompt format > freeform text for Veo 3 (confirmed from guia_completo_google_veo3_json_prompts.txt)
- Max 50 elements per prompt for precision
- Keep timeline actions: 3-5 per clip
- Write all video prompts in English
- Use first frame image for cleaner results; first+last for controlled transitions
