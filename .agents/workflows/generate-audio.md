---
description: Gera áudio de narração e efeitos sonoros para os vídeos. Mapeado para /generate-audio
---

# /generate-audio — Voice & Sound Generation Pipeline

## Agent: @media-ops

### Overview

This workflow generates all audio assets for a video production: voice-overs via ElevenLabs,
sound effects via fal.ai MMAudio, and background music suggestions. It reads from the
approved script or storyboard.

### Trigger

User types: `/generate-audio` (after script or storyboard approval)

### Pre-Conditions

- ✅ Approved script exists at `docs/scripts/{project}_voiceover.txt`
  OR approved storyboard at `artifacts/storyboard.md`
- ✅ ElevenLabs MCP server configured OR `ELEVENLABS_API_KEY` in `.env`

### Steps

1. **Load Source Text**
   - Read voice-over text from `docs/scripts/{project}_voiceover.txt`
   - Parse scene-by-scene narration blocks
   - Calculate per-scene character/word counts

2. **⏸️ PAUSE — Confirm Voice & Cost**
   - Present: total characters, estimated cost, selected voice
   - Let user choose/preview voice if available
   - **DO NOT proceed without explicit approval**

3. **Generate Voice-Overs** (per scene)
   - Use ElevenLabs MCP server or API
   - Generate one audio file per scene/segment
   - Save to: `public/raw/audio_{nn}_{scene_name}.mp3`
   - Normalize audio to -16 LUFS:
     ```bash
     ffmpeg -i raw_audio.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 normalized.mp3
     ```

4. **Generate Sound Effects** (if specified in storyboard)
   - Use fal.ai MMAudio for video-to-audio SFX
   - Use fal.ai AceStep for background music
   - Save to: `public/raw/sfx_{nn}_{descriptor}.mp3`

5. **Validate All Audio**
   - Check file existence and non-zero size
   - Verify duration matches expected timing
   - Run `ffprobe` on each file:
     ```bash
     ffprobe -v quiet -print_format json -show_format audio_01.mp3 | \
       jq '{duration: .format.duration, bitrate: .format.bit_rate}'
     ```

6. **Update Generation Manifest**
   - Add audio entries to `artifacts/generation_manifest.md`

### Output

| Artifact         | Path                                |
| ---------------- | ----------------------------------- |
| Voice-over audio | `public/raw/audio_{nn}_{scene}.mp3` |
| Sound effects    | `public/raw/sfx_{nn}_{desc}.mp3`    |
| Updated manifest | `artifacts/generation_manifest.md`  |

### Handoff

Upon completion → Audio assets are ready for `/render-final` → @motion-engineer mixes them.

### Rules

- ✅ Always normalize audio levels
- ✅ Validate duration matches script timing
- ✅ Save all assets to `public/raw/`
- ❌ Do NOT mix or composite audio — that's @motion-engineer's job
- ❌ Do NOT generate without explicit cost approval
