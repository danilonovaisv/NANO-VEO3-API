# Workflow: /nestle-video-production
**Project:** NESTLE_ABRAFARMA_FUTURE_TRENDS_2026
**Trigger:** /nestle-video-production OR when processing this project
**Swarm Owner:** @router-orchestrator

---

## PHASE 0 — Load Project Context (Always First)



**Non-negotiable rule:** Veo 3 Highest Quality does NOT support first+last frame.
Use  (eachlabs.ai) for all first+last frame workflows.

---

## PHASE 1 — Asset Audit (@asset-manager)

- Scan 02_SOURCE_MATERIALS/MARCAS/ for each brand folder
- Compare against ASSET_FOLDER_AUDIT.csv
- Classify each asset: CONFIRMED / OBSERVED / MISSING_INFORMATION / BLOCKER
- Update reports/MISSING_INPUTS_AND_BLOCKERS.md
- **GATE 1** — Do not proceed past this gate without user confirmation

## PHASE 2 — Briefing Interpretation (@router-orchestrator)

- Read all docs in 01_briefings/
- Extract: product list, placements, claims, duration, creative direction
- Cross-reference against asset audit findings
- **GATE 2** — Do not proceed without briefing alignment confirmation

## PHASE 3 — Script Creation (@ai-video-engineer)

- Create script JSON per product (format: 02_script.json)
- Include scene breakdown with: scene_number, duration_seconds, narrative_function, visual_beat, copy_or_claim, transition_in, transition_out
- Save to 04_prompts/script_prompts/
- **GATE 3** — STOP and wait for user script approval

## PHASE 4 — Scene Descriptions (@ai-video-engineer)

- Transform approved script into cinematic scene descriptions
- Each scene: Subject, Context, Action, Style, Camera, Lighting, Motion, Ambiance, Product behavior, Text/claim behavior, Transitions
- Save to 04_prompts/scene_descriptions/
- **GATE 4** — STOP and wait for user scene description approval

## PHASE 5 — Keyframe Prompts (@ai-video-engineer)

- Create initial frame prompt (references FRAME-1 source file)
- Create final frame prompt (references FRAME-2 source file)
- Create bridge frame prompt if needed
- Check: lighting continuity, brand accuracy, packshot preservation, safe areas
- Save to 05_keyframes/ subdirectories
- **GATE 5** — STOP and wait for keyframe prompt approval

## PHASE 6 — Video JSON Prompt (@ai-video-engineer)

- Convert approved scenes to full JSON generation prompt
- Declare model_strategy explicitly (veo3-1-first-last-frame-to-video for first+last frame)
- Attach first_frame_path and last_frame_path
- Include negative_prompt from generation_rules.json
- Include qa_checklist per clip
- Save to 04_prompts/video_json_prompts/ and public/output/
- **GATE 6** — STOP and wait for JSON prompt approval

## PHASE 7 — Generation (@veo-integration-specialist)



- Store raw output in 06_PRODUCTION/06_GENERATIONS_RAW/ with timestamp
- Do NOT overwrite previous generations
- **GATE 7** — Generation complete, raw output stored

## PHASE 8 — QA (@evaluator)

- Run all checks in 08_qa_checklist.md
- Create QA report in 06_PRODUCTION/09_QA/
- **GATE 8** — QA PASS required to proceed

## PHASE 9 — Post-Production and Delivery

- Upscale to 1792x1536 via Topaz Video Upscaler
- Retime to 60fps, encode H.264 MP4
- Join CLIP-A + CLIP-B for 15s LED loop
- Export to 06_PRODUCTION/10_FINAL_EXPORTS/
- Update Master Tracker (preserve formula columns)
- **GATE 10** — Delivery complete

---

## CURRENT STATUS (2026-08-06)

| Asset | Status | Current Gate | Next Action |
|---|---|---|---|
| FT26-LED01-NAN-COMFOR-001 | READY_FOR_PREPROD | Gate 5 (keyframes ready) | Approve JSON prompt (Gate 6) |
| All other assets | BLOCKED | Gate 1 | Upload briefings and source materials |