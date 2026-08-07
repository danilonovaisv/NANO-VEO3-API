# FT26-LED01-NAN-COMFOR-001

## Asset Identity
| Field | Value |
|---|---|
| Asset ID | FT26-LED01-NAN-COMFOR-001 |
| Brand / Product | Nestlé NAN COMFOR — Família Comfor |
| Placement | LED 1 Curvo |
| Screen Format | P1.9 7x6 Mod |
| Resolution | 1792 x 1536 px |
| Physical Size | 3500 x 3040 mm |
| FPS | 60 |
| Codec | H.264 |
| Extension | .mp4 |
| Duration | 15 seconds total — split: 8s clip (CLIP-A) + 7s clip (CLIP-B) |
| Audio | None |
| Status | READY_FOR_PREPROD |

## Available Inputs
- [x] FRAME-1:  CONFIRMED
- [x] FRAME-2:  CONFIRMED
- [x] Payload Validation Script:  CONFIRMED
- [x] Execution Script:  CONFIRMED

## Missing Inputs
- [ ] Formal briefing document (01_briefings/) — OBSERVED via script comments only
- [ ] Regulatory approval confirmation for #1 badge claim

## Blocking Issues
- BLOCKER-005: Resolution upscaling required. Veo 3.1 → 1080p → needs upscale to 1792x1536.
- BLOCKER-006: #1 badge regulatory approval — verify before final delivery.

## Approved Creative Direction
Brand: NAN COMFOR — Família Comfor line
Style: Ultra-premium CGI product advertising. Magenta-purple gradient background. Futuristic molecular overlays.
Products: Three NAN COMFOR cans — rear-left, rear-right, front-center hero.
Mascot: Stylized white bird with magenta outlines (per packaging artwork).
Badge: Illuminated #1 seal — appears in FRAME-2 lower-right.
Lens: 70mm full-frame equivalent. Locked frontal camera.
Model: veo3-1-first-last-frame-to-video (eachlabs.ai) — 8s per clip.

## Next Action
1. Run: 
2. Review compiled payload at 
3. Approve JSON prompt (Gate 6)
4. Dispatch to Veo 3.1 (Gate 7)
5. QA raw output (Gate 8)
6. Upscale to 1792x1536 → export H.264 60fps MP4 (Gate 9)
7. Update Master Tracker (Gate 10)