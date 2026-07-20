---
name: image-upscaling
description: >
  Upscale and enhance images and videos using AI models via fal.ai.
  Supports 2x and 4x upscaling for images and video resolution enhancement.
  Use when the user mentions "upscale", "enhance", "melhorar resolução",
  "aumentar qualidade", "4x", "super resolution", or needs higher-res assets.
---

# 🔍 Image & Video Upscaling — AI Enhancement Skill

## Overview

Enhance the resolution and quality of AI-generated images and videos using fal.ai's
upscaling models. Essential for preparing draft-quality assets for final 4K production.

## When to Use

- Upscaling draft images (1K) to production quality (4K)
- Enhancing AI-generated thumbnails for YouTube
- Improving video resolution before final render
- Preparing social media assets at optimal resolutions

## Available Models

| Model                        | Type  | Scale | Speed  | Best For                    |
| ---------------------------- | ----- | ----- | ------ | --------------------------- |
| `fal-ai/aura-sr`             | Image | 4x    | Fast   | Quick upscale, good quality |
| `fal-ai/clarity-upscaler`    | Image | 2x    | Medium | Detail preservation         |
| `fal-ai/topaz/upscale/video` | Video | 2x    | Slow   | Video resolution boost      |

## Usage

### Image Upscaling

```bash
# Quick 4x upscale (default model: AuraSR)
bash upscale.sh --image-url "https://example.com/draft_thumbnail.jpg"

# Detail-preserving 2x upscale
bash upscale.sh \
  --image-url "https://example.com/scene_01.png" \
  --model "fal-ai/clarity-upscaler" \
  --scale 2

# From local file (upload first, then upscale)
bash generate.sh --file "public/raw/scene_01_draft.png" --model "fal-ai/aura-sr"
```

### Video Upscaling

```bash
# Upscale video to 2x resolution
bash upscale.sh \
  --video-url "https://example.com/clip_01.mp4" \
  --model "fal-ai/topaz/upscale/video"
```

## Workflow: Draft → Upscale → Final

1. Generate at 1K resolution (fast, cheap iteration)
2. Review and approve the visual composition
3. Upscale approved assets to 4K
4. Use upscaled assets in final render

```
[Draft 1K] → [Review ✅] → [Upscale 4x] → [Final 4K] → [Render]
```

## File Output

- Upscaled images: `public/raw/{original_name}_upscaled.png`
- Upscaled videos: `public/raw/{original_name}_upscaled.mp4`
- Always validate resolution with `ffprobe` or image dimensions check

## Integration

- Called after `/generate-media` when assets need resolution boost
- Feeds into `/render-final` with production-quality assets
