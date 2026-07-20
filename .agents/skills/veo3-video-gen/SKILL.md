---
name: veo3-video-gen
description: >
  Generate AI videos using Google Veo 3.1 models via fal.ai MCP or direct Gemini API.
  Supports text-to-video, image-to-video, and video extension.
  Use when the user mentions "Veo3", "generate video", "text-to-video", "video generation",
  "criar vídeo com IA", or any task involving AI-powered video creation.
---

# 🎬 Veo3 Video Generation — AI Video Creation Skill

## Overview

Generate professional AI videos using Google's Veo 3.1 family of models. This skill supports
multiple access methods: **fal.ai MCP** (recommended), **Gemini API SDK**, and **Vertex AI**.

## When to Use

- Creating video clips from text prompts (text-to-video)
- Animating a static image into a video clip (image-to-video)
- Extending the duration of a previously generated video
- Generating hero/intro clips for YouTube, Reels, or Shorts
- Producing B-roll footage from storyboard scene descriptions

## Available Models (April 2026)

| Model                  | Quality | Speed   | Best For                     |
| ---------------------- | ------- | ------- | ---------------------------- |
| `veo-3.1-generate-001` | Highest | Slow    | Hero shots, finals           |
| `veo-3.1-fast-001`     | High    | Fast    | Iteration, drafts            |
| `veo-3.1-lite-001`     | Good    | Fastest | High-volume, testing         |
| `fal-ai/veo3.1`        | Highest | Slow    | Via fal.ai MCP (recommended) |

## Method 1: fal.ai MCP (Recommended)

The fal.ai MCP server wraps Veo3.1 with queue management and CDN hosting.

### Text-to-Video

```bash
# Generate via fal.ai generate script (from fal-ai-community/skills)
bash generate.sh \
  --prompt "Cinematic aerial shot of Tokyo skyline at night, neon lights reflecting on wet streets, drone slowly ascending" \
  --model "fal-ai/veo3.1" \
  --async

# Check status
bash generate.sh --status "<request_id>" --model "fal-ai/veo3.1"

# Get result when complete
bash generate.sh --result "<request_id>" --model "fal-ai/veo3.1"
```

### Image-to-Video

```bash
# Animate a static frame into a video clip
bash generate.sh \
  --file "public/raw/scene_01_hero.png" \
  --model "fal-ai/kling-video/v2.6/pro/image-to-video" \
  --prompt "Camera slowly pushes in, subtle parallax movement, cinematic depth of field"
```

## Method 2: Gemini API (Direct)

```javascript
const { GoogleGenAI } = require('@google/generative-ai');
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateVideo(prompt, options = {}) {
  const { model = 'veo-3.1-generate-001', aspectRatio = '16:9', duration = '6s' } = options;

  // Initiate generation (async operation)
  const operation = await client.models.generateVideos({
    model,
    prompt,
    config: {
      aspectRatio,
      duration,
    },
  });

  console.log('Operation started:', operation.name);

  // Poll until done
  let result;
  while (!result || !result.done) {
    await new Promise((r) => setTimeout(r, 5000));
    result = await client.operations.get(operation.name);
    console.log('Status:', result.done ? 'COMPLETED' : 'IN_PROGRESS');
  }

  return result.response;
}

// Usage
generateVideo(
  'Cinematic tracking shot through a futuristic data center, racks of glowing servers, volumetric blue light',
  { aspectRatio: '16:9', duration: '8s' },
).then((r) => console.log('Video URL:', r.videoUrl));
```

## Prompt Engineering for Veo3

### Structure Template

```
[Camera Movement], [Subject Action], [Environment/Setting],
[Lighting], [Atmosphere/Mood], [Technical Details]
```

### Good Examples

```
# Hero intro shot
"Slow cinematic dolly forward through a dark corridor, blue neon strips on walls,
 volumetric fog, camera reveals a massive holographic dashboard at the end,
 anamorphic lens flare, 4K cinematic quality"

# Product showcase
"Smooth 360-degree orbit around a sleek smartphone on a reflective dark surface,
 studio lighting with subtle rim light, particles floating in the air,
 premium product photography feel, shallow depth of field"

# Nature B-roll
"Aerial drone shot ascending over misty mountains at golden hour,
 clouds parting to reveal a valley below, warm amber sunlight,
 epic scale, National Geographic quality"
```

### Negative Concepts to Avoid in Prompts

- Avoid: jumpcuts, text, watermarks, logos, face close-ups (can distort)
- Avoid: multiple subjects changing simultaneously (causes flickering)
- Keep: single camera movement per clip, consistent lighting

## Resolution & Format Settings

| Platform      | Aspect Ratio | Duration | Quality      |
| ------------- | ------------ | -------- | ------------ |
| YouTube       | 16:9         | 4-8s     | veo-3.1      |
| Shorts/Reels  | 9:16         | 4-6s     | veo-3.1      |
| Square Social | 1:1          | 4-6s     | veo-3.1-fast |
| Draft/Testing | 16:9         | 4s       | veo-3.1-lite |

## File Output Rules

- Save to: `public/raw/clip_{nn}_{descriptor}.mp4`
- Always validate with `ffprobe` after download:

```bash
ffprobe -v quiet -print_format json -show_streams -show_format \
  "public/raw/clip_01_hero.mp4" | \
  jq '{duration: .format.duration, codec: .streams[0].codec_name,
       resolution: "\(.streams[0].width)x\(.streams[0].height)"}'
```

## Human-in-the-Loop

- ❌ **NEVER** call a paid API without explicit user approval
- ✅ Always present estimated cost before generation
- ✅ Start with `veo-3.1-lite` for testing prompts
- ✅ Only upgrade to `veo-3.1-generate` for final production

## Integration with Studio

- Input prompts from `artifacts/storyboard.md` (created by @art-director)
- Output clips to `public/raw/` (consumed by @motion-engineer)
- Log prompts to `docs/prompts/video_prompt_{nn}.txt`
- Update `artifacts/generation_manifest.md` after each generation
