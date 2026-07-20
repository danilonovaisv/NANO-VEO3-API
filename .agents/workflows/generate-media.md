---
description: Dispara as APIs de IA para transformar o storyboard em ficheiros reais. Mapeado para /generate-media
---

# /generate-media — AI Asset Generation Pipeline

## Agent: @media-ops

### Overview

This workflow reads the approved storyboard and generates all required media assets using AI tools (Nano Banana Pro, Veo3, Sora, Fal.ai). Every generated asset is validated before handoff.

### Trigger

User types: `/generate-media` (only after `/storyboard` has been approved)

### Pre-Conditions

- ✅ `artifacts/storyboard.md` exists and has been approved by user
- ✅ At least one MCP media server is configured (`fal-ai-mcp` or native Nano Banana)

### Steps

1. **Load the Storyboard**
   - Read `artifacts/storyboard.md`
   - Parse scene list with prompts, durations, and asset types
   - Create a generation manifest tracking all required assets

2. **Generate Static Images** (per scene)
   - Use Nano Banana Pro (native IDE tool) or Fal.ai MCP for each image prompt
   - Apply resolution from storyboard metadata (default: 4K)
   - Save to: `public/raw/scene_{nn}_{descriptor}.png`
   - Verify file exists and size > 0 bytes

3. **Generate Video Clips** (per scene, if required)
   - Use Veo3 or Sora via MCP for each video/motion prompt
   - Request `.mp4` with H.264 codec
   - Save to: `public/raw/clip_{nn}_{descriptor}.mp4`
   - Run `ffprobe` to validate codec and resolution

4. **Generate Audio** (if specified in storyboard)
   - Use ElevenLabs / MusicGen via MCP or external API
   - Save to: `public/raw/audio_{nn}_{descriptor}.mp3`
   - Validate format and duration match

5. **Generate Manifest Report**
   - Create `artifacts/generation_manifest.md` listing:

   ```markdown
   # Generation Manifest

   | Scene | Asset Type | File                              | Status | Size    |
   | ----- | ---------- | --------------------------------- | ------ | ------- |
   | 01    | Image      | public/raw/scene_01_hero.png      | ✅     | 2.4 MB  |
   | 01    | Video      | public/raw/clip_01_intro.mp4      | ✅     | 14.7 MB |
   | 02    | Image      | public/raw/scene_02_dashboard.png | ✅     | 1.9 MB  |
   ```

6. **Validate All Assets**
   - Check every file in manifest exists
   - Verify non-zero file sizes
   - Run `ffprobe` on all video/audio files
   - Report any failures immediately — do NOT silently skip

### Output

| Artifact            | Path                               |
| ------------------- | ---------------------------------- |
| Generated images    | `public/raw/scene_*.png`           |
| Generated clips     | `public/raw/clip_*.mp4`            |
| Generated audio     | `public/raw/audio_*.mp3`           |
| Generation manifest | `artifacts/generation_manifest.md` |

### Handoff

Upon successful generation → User triggers `/render-final` → @motion-engineer agent takes over.

### Error Handling

- **API timeout:** Retry once with same prompt, then report failure
- **Quality issue:** Flag in manifest with ⚠️ status, suggest re-generation
- **Missing asset:** Mark as ❌ in manifest, alert user, do NOT proceed to render
- **Rate limit:** Wait and retry, inform user of delay

### Rules

- ✅ Always validate assets with `ffprobe` or file size checks
- ✅ Save ALL assets to `public/raw/` (never to temp or other dirs)
- ✅ Log every API call with its prompt for reproducibility
- ❌ Do NOT compose or edit assets — that's @motion-engineer's job
- ❌ Do NOT delete or overwrite existing raw assets without approval
