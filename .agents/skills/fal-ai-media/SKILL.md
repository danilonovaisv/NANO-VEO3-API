---
name: fal-ai-media
description: >
  Unified fal.ai media generation skill for images, videos, audio, and upscaling.
  Wraps the fal.ai MCP server and generate.sh scripts from fal-ai-community/skills.
  Use when generating any AI media asset: images, videos, audio, or upscaling existing content.
---

# 🎨 fal.ai Media — Unified AI Generation Skill

## Overview

This skill provides a unified interface to fal.ai's 600+ AI models for image generation,
video creation, audio processing, and media upscaling. All operations go through the
**fal-ai MCP server** or the **generate.sh** bash scripts.

## When to Use

- Generate images: thumbnails, hero shots, concept art, storyboard frames
- Generate videos: text-to-video, image-to-video animation
- Generate audio: video-to-audio (MMAudio), music generation
- Upscale: enhance resolution of images (2x/4x) and videos

## Prerequisites

- fal.ai MCP server configured in `mcp_servers.json`:
  ```json
  {
    "fal-ai-mcp": {
      "command": "npx",
      "args": ["-y", "@fal-ai/mcp-server"],
      "env": { "FAL_KEY": "${FAL_KEY}" }
    }
  }
  ```
- `FAL_KEY` set in `.env`

## Model Catalog

### Image Generation

| Model                        | Use Case                 | Quality   |
| ---------------------------- | ------------------------ | --------- |
| `fal-ai/nano-banana-pro`     | General image gen (fast) | High      |
| `fal-ai/flux/dev`            | Creative/artistic images | Very High |
| `fal-ai/flux-pro/v1.1-ultra` | Premium photorealism     | Premium   |
| `fal-ai/recraft-v3`          | Design/illustration      | High      |

### Video Generation

| Model                                        | Use Case             | Duration |
| -------------------------------------------- | -------------------- | -------- |
| `fal-ai/veo3.1`                              | Best quality video   | 4-8s     |
| `fal-ai/kling-video/v2.6/pro/image-to-video` | Animate still images | 5-10s    |
| `fal-ai/minimax-video/video-01-live-music`   | Music video clips    | 5s       |
| `fal-ai/wan/v2.1/1080p`                      | HD video gen         | 5s       |

### Audio

| Model             | Use Case             |
| ----------------- | -------------------- |
| `fal-ai/mmaudio`  | Video-to-audio (SFX) |
| `fal-ai/ace-step` | Music generation     |

### Upscaling

| Model                        | Use Case           | Scale |
| ---------------------------- | ------------------ | ----- |
| `fal-ai/aura-sr`             | Fast image upscale | 4x    |
| `fal-ai/clarity-upscaler`    | Detail-preserving  | 2x    |
| `fal-ai/topaz/upscale/video` | Video upscale      | 2x    |

## Usage with generate.sh

### Text-to-Image

```bash
# Quick image generation
bash generate.sh \
  --prompt "Cyberpunk cityscape at night, neon reflections on wet streets, volumetric fog" \
  --model "fal-ai/nano-banana-pro"

# Premium quality
bash generate.sh \
  --prompt "Professional product photo of wireless earbuds on marble surface, studio lighting" \
  --model "fal-ai/flux-pro/v1.1-ultra"
```

### Text-to-Video (async for long tasks)

```bash
# Start async video generation
bash generate.sh \
  --prompt "Slow-motion water droplet falling into a still pool, ripple effects, macro lens" \
  --model "fal-ai/veo3.1" \
  --async

# Poll status
bash generate.sh --status "<request_id>" --model "fal-ai/veo3.1"

# Get result when done
bash generate.sh --result "<request_id>" --model "fal-ai/veo3.1"
```

### Image-to-Video

```bash
# Animate a still frame
bash generate.sh \
  --file "public/raw/scene_01_hero.png" \
  --model "fal-ai/kling-video/v2.6/pro/image-to-video" \
  --prompt "Camera slowly zooms in, subtle breathing motion, cinematic"
```

### Video-to-Audio (MMAudio)

```bash
# Generate audio from video content
bash generate.sh \
  --model "fal-ai/mmaudio" \
  --file "public/raw/clip_01_cityscape.mp4" \
  --prompt "Ambient city sounds, distant traffic, rain on pavement"
```

### Image Upscaling

```bash
# 4x upscale with AuraSR
bash upscale.sh --image-url "https://example.com/thumbnail.jpg"

# Detail-preserving 2x upscale
bash upscale.sh \
  --image-url "https://example.com/photo.jpg" \
  --model "fal-ai/clarity-upscaler" \
  --scale 2
```

## File Output Convention

| Asset Type | Directory     | Naming Pattern                   |
| ---------- | ------------- | -------------------------------- |
| Images     | `public/raw/` | `scene_{nn}_{descriptor}.png`    |
| Videos     | `public/raw/` | `clip_{nn}_{descriptor}.mp4`     |
| Audio      | `public/raw/` | `audio_{nn}_{descriptor}.mp3`    |
| Upscaled   | `public/raw/` | `{original_name}_upscaled.{ext}` |

## Queue Management

fal.ai uses an async queue for long-running tasks. The workflow:

1. **Submit** → receive `request_id`
2. **Poll** → check `IN_QUEUE` → `IN_PROGRESS` → `COMPLETED`
3. **Retrieve** → download the result URL
4. **Save** → store to `public/raw/` with proper naming

## Cost Awareness

- ⚠️ Always start with cheaper models for drafts (`nano-banana-pro`, `veo-3.1-lite`)
- ⚠️ Upgrade to premium models only for final production
- ❌ **NEVER** call paid APIs without explicit user approval

## Integration with Studio

- Input prompts from `artifacts/storyboard.md` and `docs/prompts/`
- Output assets to `public/raw/`
- Update `artifacts/generation_manifest.md` with generation results
- Called by `/generate-media` workflow
