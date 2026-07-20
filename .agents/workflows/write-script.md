---
description: Cria roteiros e scripts para vídeos a partir de um tema ou brief. Mapeado para /write-script
---

# /write-script — AI Screenwriting Pipeline

## Agent: @art-director

### Overview

This workflow transforms a raw idea, topic, or brief into a structured video script with
narration text, scene descriptions, timing, and visual cues. The script becomes the
foundation for the `/storyboard` workflow.

### Trigger

User types: `/write-script` followed by a topic or brief.

Example: _"Ative /write-script para criar um roteiro de 2 minutos sobre as 5 tendências de IA em 2026."_

### Steps

1. **Understand the Brief**
   - Extract: topic, target platform, tone, duration, audience
   - Determine: format (YouTube long-form, Shorts, Reels, UGC)
   - Clarify: any specific requirements or constraints
   - Ask for missing information if needed

2. **Research & Structure**
   - Identify key points, arguments, or story beats
   - Choose a narrative structure:
     - **Hook → Problem → Solution → CTA** (educational)
     - **Hook → Story → Climax → Resolution** (storytelling)
     - **Hook → Tips 1-5 → Recap → CTA** (listicle)
     - **Shock → Context → Value → CTA** (short-form)
   - Calculate word count from target duration (150 WPM average)

3. **Write the Script**
   - Follow the `screenwriting` skill format
   - Include for each scene/segment:
     - Exact narration text (written for spoken delivery)
     - Visual description (what the viewer sees)
     - On-screen text (if any)
     - Music/SFX cues
     - Timing markers
   - Save to: `docs/scripts/{project}_script.md`

4. **Generate Voice-Over Text**
   - Extract pure narration text from the script
   - Format for TTS generation (short sentences, natural pauses)
   - Save to: `docs/scripts/{project}_voiceover.txt`
   - Include word count and estimated duration

5. **⏸️ PAUSE — Request Human Approval**
   - Present the complete script to the user
   - Show: total duration, word count, scene count
   - **DO NOT proceed** until explicit approval
   - Wait for: "Aprovado" / "Approved" / "Go" / "✅"

### Output

| Artifact        | Path                                   |
| --------------- | -------------------------------------- |
| Full script     | `docs/scripts/{project}_script.md`     |
| Voice-over text | `docs/scripts/{project}_voiceover.txt` |

### Handoff

Upon approval → User triggers `/storyboard` → @art-director creates visual storyboard
based on the approved script.

### Rules

- ❌ Do NOT generate any media (images, video, audio)
- ❌ Do NOT call any paid APIs
- ✅ DO write scripts optimized for spoken delivery
- ✅ DO include timing estimates for each segment
- ✅ DO use the Hook-first principle (first 3 seconds matter most)
- ✅ DO calculate word count to match target duration
