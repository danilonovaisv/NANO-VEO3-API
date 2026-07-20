---
description: Junta as mídias geradas, adiciona legendas e exporta o vídeo final. Mapeado para /render-final
---

# /render-final — Video Composition & Final Render

## Agent: @motion-engineer

### Overview

This workflow takes all generated assets from `public/raw/` and composites them into a final, polished video ready for delivery. The @motion-engineer evaluates the technical needs and chooses between **Remotion** (programmatic) or **FFmpeg** (CLI) based on complexity.

### Trigger

User types: `/render-final` (only after `/generate-media` has completed successfully)

### Pre-Conditions

- ✅ `artifacts/generation_manifest.md` exists with all assets marked ✅
- ✅ `artifacts/storyboard.md` available for scene ordering and timing
- ✅ All required assets present in `public/raw/`

### Steps

1. **Evaluate Technical Approach**
   - **Use Remotion** when:
     - Video requires dynamic text overlays, animated data, or React components
     - Complex timing, layered compositions, or programmatic transitions
     - Template-based productions (intros, outros, episode cards)
   - **Use FFmpeg** when:
     - Simple concatenation of pre-rendered clips
     - Adding audio to silent videos
     - Burning subtitles onto existing video
     - Basic crossfade transitions

2. **If Remotion:**
   - Follow the `remotion-best-practices` skill
   - Create scene components in `src/scenes/`
   - Register compositions in `src/Root.tsx`
   - Use `<Sequence>` for scene isolation
   - Render:

     ```bash
     npx remotion render src/Root.tsx FullVideo public/out/final_{project}_{version}.mp4 \
       --codec h264 --crf 18
     ```

3. **If FFmpeg:**
   - Follow the `ffmpeg-video-editor` skill
   - Create a concat list from scene order in storyboard
   - Apply transitions if specified (crossfade, etc.)
   - Add audio track if available
   - Burn subtitles if `.srt` file exists
   - Render:

     ```bash
     ffmpeg -f concat -safe 0 -i filelist.txt \
       -c:v libx264 -preset slow -crf 18 \
       -c:a aac -b:a 192k \
       -movflags +faststart \
       public/out/final_{project}_{version}.mp4
     ```

4. **Post-Render Validation**
   - Run `ffprobe` on final output:

     ```bash
     ffprobe -v quiet -print_format json -show_streams -show_format \
       public/out/final_*.mp4
     ```

   - Verify:
     - ✅ Correct codec (H.264 video, AAC audio)
     - ✅ Expected resolution (3840×2160 for 4K)
     - ✅ Expected duration matches storyboard total
     - ✅ File is playable (non-corrupt)

5. **Extract Preview Frames**
   - Capture key frames for user review:

     ```bash
     ffmpeg -i public/out/final_*.mp4 -vf "fps=0.5" \
       public/out/preview_frame_%04d.png
     ```

6. **Browser Preview** (Optional)
   - Launch the browser subagent to:
     - Open the rendered video in the integrated Chromium
     - Capture screenshots of key moments
     - Present visual review to user without leaving IDE

7. **Report Delivery**
   - Generate final report:

     ```markdown
     # ✅ Render Complete

     - **Output:** `public/out/final_{project}_{version}.mp4`
     - **Duration:** XX:XX
     - **Resolution:** 3840×2160
     - **File Size:** XX MB
     - **Codec:** H.264 / AAC

     Preview frames saved to `public/out/preview_frame_*.png`
     ```

### Output

| Artifact       | Path                                       |
| -------------- | ------------------------------------------ |
| Final video    | `public/out/final_{project}_{version}.mp4` |
| Preview frames | `public/out/preview_frame_*.png`           |
| Render report  | Inline summary to user                     |

### Error Handling

- **Render failure:** Save partial output, provide `ffmpeg` error log, suggest fixes
- **Missing assets:** Cross-reference manifest, report which scene is incomplete
- **Quality issue:** Re-render specific scenes at higher CRF, offer comparison

### Rules

- ✅ Always validate with `ffprobe` before declaring success
- ✅ Always present preview frames to user
- ✅ Output to `public/out/` only
- ✅ Use `-movflags +faststart` for web-optimized playback
- ❌ Do NOT delete raw assets after rendering
- ❌ Do NOT overwrite previous final renders without version increment
- ❌ Do NOT skip validation — evidence before assertions
