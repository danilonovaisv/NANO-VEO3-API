---
name: elevenlabs-tts
description: >
  Generate professional voice-overs and narration using ElevenLabs TTS.
  Supports text-to-speech, voice cloning, sound design, and transcription via the ElevenLabs MCP server.
  Use when the user mentions "voice over", "narração", "texto para fala", "TTS", "ElevenLabs",
  "voz IA", "locução", or any audio narration task.
---

# 🎙️ ElevenLabs TTS — Voice Generation Skill

## Overview

Generate professional-quality voice-overs, narration, and dialogue audio using ElevenLabs'
text-to-speech technology. This skill connects to the **ElevenLabs MCP server** for seamless
integration with the VIDEOS-VEO3 production pipeline.

## When to Use

- Generating narration audio from script text
- Creating voice-overs for AI-generated videos
- Prototyping dialogue for UGC characters
- Adding spoken commentary to screen recordings or tutorials
- Creating audio tracks for Remotion compositions

## MCP Server Setup

Add the ElevenLabs MCP server to your environment:

```json
{
  "elevenlabs-mcp": {
    "command": "uvx",
    "args": ["elevenlabs-mcp"],
    "env": {
      "ELEVENLABS_API_KEY": "${ELEVENLABS_API_KEY}"
    }
  }
}
```

**Requirement:** Python `uv`/`uvx` must be installed:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Capabilities

| Feature          | Description                                     |
| ---------------- | ----------------------------------------------- |
| Text-to-Speech   | Convert text to natural speech in 29+ languages |
| Voice Cloning    | Clone voices from audio samples                 |
| Voice Design     | Create custom synthetic voices                  |
| Sound Effects    | Generate ambient and SFX audio                  |
| Transcription    | Speech-to-text with speaker identification      |
| Voice Conversion | Transform voice characteristics                 |

## Voice Selection Guidelines

### For Portuguese (pt-BR)

| Voice Type        | Recommended Use             | Tone                |
| ----------------- | --------------------------- | ------------------- |
| Male Professional | Corporate, tutorials        | Warm, authoritative |
| Female Narrator   | Storytelling, documentaries | Smooth, engaging    |
| Casual Male       | Vlogs, social media         | Friendly, energetic |
| Casual Female     | Lifestyle, reviews          | Natural, relatable  |

### Voice Settings

```json
{
  "stability": 0.5,
  "similarity_boost": 0.75,
  "style": 0.0,
  "use_speaker_boost": true
}
```

- **stability** (0.0-1.0): Lower = more expressive, Higher = more consistent
- **similarity_boost** (0.0-1.0): Higher = closer to original voice
- **style** (0.0-1.0): Higher = more emotional delivery

## Usage Patterns

### Simple Narration

```python
import os
import requests

VOICE_ID = "your_voice_id"
API_KEY = os.environ["ELEVENLABS_API_KEY"]

def generate_voiceover(text, output_path, voice_id=VOICE_ID):
    resp = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={
            "xi-api-key": API_KEY,
            "Content-Type": "application/json"
        },
        json={
            "text": text,
            "model_id": "eleven_turbo_v2_5",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75
            }
        }
    )
    with open(output_path, "wb") as f:
        f.write(resp.content)
    print(f"✅ Saved: {output_path}")

# Per-scene generation
scenes = [
    ("Scene 1 narration text here...", "public/raw/audio_01_intro.mp3"),
    ("Scene 2 narration text here...", "public/raw/audio_02_main.mp3"),
]

for text, path in scenes:
    generate_voiceover(text, path)
```

### Batch Generation from Script File

```bash
# Using the ElevenLabs MCP server tools:
# 1. List available voices
# 2. Generate speech for each scene's narration
# 3. Save outputs to public/raw/audio_*.mp3
```

## Audio Format Rules

- **Output format:** MP3 (192kbps) for web compatibility
- **Sample rate:** 44.1kHz minimum
- **Loudness:** Normalize to -16 LUFS for YouTube:

```bash
ffmpeg -i audio_raw.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 audio_normalized.mp3
```

## File Output Convention

| Asset            | Path                                  |
| ---------------- | ------------------------------------- |
| Narration audio  | `public/raw/audio_{nn}_{scene}.mp3`   |
| Sound effects    | `public/raw/sfx_{nn}_{desc}.mp3`      |
| Full mixed audio | `public/raw/audio_full_{project}.mp3` |

## Integration with Studio

- Input: narration text from `docs/scripts/{project}_voiceover.txt`
- Output: audio files to `public/raw/audio_*.mp3`
- Consumed by: @motion-engineer for Remotion `<Audio>` components or FFmpeg mixing
- Timing synced with: storyboard scene durations

## Cost Awareness

- ⚠️ ElevenLabs charges per character
- ✅ Always preview with a short sample first
- ✅ Only generate full audio after script is approved
- ❌ NEVER generate without explicit user approval

## Related Skills

- `screenwriting` — Generate the narration text
- `ffmpeg-video-editor` — Mix audio with video
- `remotion-best-practices` — Sync audio in compositions
