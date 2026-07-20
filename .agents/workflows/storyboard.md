---
description: Cria o roteiro e os prompts visuais para o vídeo ou campanha. Mapeado para /storyboard
---

# /storyboard — Art Direction & Scene Planning

## Agent: @art-director

### Overview

This workflow transforms a creative brief into a structured storyboard with production-ready prompts for each scene. The @art-director **does NOT generate media** — it plans, structures, and documents.

### Trigger

User types: `/storyboard` followed by a creative brief.

Example: _"Ative /storyboard para criar um vídeo de 30 segundos de introdução a um app de finanças cyberpunk."_

### Steps

1. **Analyze the Brief**
   - Extract: theme, duration, target audience, platform (YouTube/Shorts/Reels)
   - Determine: number of scenes, pacing, transitions
   - Identify: required visual styles, color palettes, mood references

2. **Create the Storyboard Artifact**
   - Generate `artifacts/storyboard.md` with the following structure:

   ```markdown
   # Storyboard: [Project Title]

   ## Production Metadata

   - Duration: [total seconds]
   - Resolution: [4K / FHD]
   - Aspect Ratio: [16:9 / 9:16 / 1:1]
   - FPS: 30
   - Platform: [YouTube / Shorts / Reels]

   ## Global Aesthetic

   - Color Palette: [hex codes]
   - Typography: [font names]
   - Mood: [cinematic / playful / dramatic / minimal]
   - Music Genre: [lo-fi / orchestral / synthwave]

   ## Scene 1: [Scene Title]

   - Duration: [seconds]
   - Camera: [angle, movement]
   - Image Prompt (Nano Banana): "[SLCA structured prompt]"
   - Video Prompt (Veo3/Sora): "[motion description]"
   - Audio Cue: [ambient / SFX / music beat]
   - Transition Out: [fade / cut / zoom / crossfade]

   ## Scene 2: [Scene Title]

   ...
   ```

3. **Write All Prompts to File**
   - Save each scene's prompts to `docs/prompts/storyboard_{project}_scene_{nn}.txt`
   - Follow the SLCA Framework from `nano-banana-prompting` skill

4. **⏸️ PAUSE — Request Human Approval**
   - Present the complete storyboard to the user
   - Display estimated API calls and asset count
   - **DO NOT proceed to media generation** until explicit approval
   - Wait for: "Aprovado" / "Approved" / "Go" / "✅"

### Output

| Artifact            | Path                                    |
| ------------------- | --------------------------------------- |
| Storyboard document | `artifacts/storyboard.md`               |
| Scene prompts       | `docs/prompts/storyboard_*_scene_*.txt` |

### Handoff

Upon approval → User triggers `/generate-media` → @media-ops agent takes over.

### Rules

- ❌ Do NOT generate any media (images, video, audio)
- ❌ Do NOT call any paid APIs
- ❌ Do NOT render any compositions
- ✅ DO write detailed, production-ready prompts
- ✅ DO follow the SLCA Framework strictly
- ✅ DO include negative prompts for each scene
- ✅ DO suggest music genre and timing but don't generate audio
