---
name: screenwriting
description: >
  AI screenwriting and script creation for video production.
  Generates roteiros, scene breakdowns, dialogue, voice-over scripts,
  and narration for YouTube, Shorts, Reels, and long-form content.
  Use when the user mentions "roteiro", "script", "screenplay", "narração",
  "voice over", "diálogo", "cenas", or any writing task for video production.
---

# 📝 Screenwriting — AI-Powered Script Creation Skill

## Overview

This skill transforms creative briefs, topics, or raw ideas into production-ready scripts
for video content. It covers everything from YouTube long-form to 30-second Reels/Shorts,
including narration, dialogue, scene descriptions, and timing.

## When to Use

- Writing video scripts for YouTube, Shorts, Reels, or TikTok
- Creating narration/voice-over text for AI-generated videos
- Breaking down concepts into scene-by-scene structures
- Writing dialogue for UGC-style videos with AI characters
- Converting blog posts, articles, or ideas into video scripts
- Creating pitch scripts, product demos, or explainer videos

## Script Formats

### 1. YouTube Long-Form (5-20 min)

```markdown
# Script: [Title]

**Channel:** [Channel Name]
**Duration Target:** [X minutes]
**Tone:** [Educational | Entertaining | Inspirational | Technical]
**Target Audience:** [Demographics]

---

## HOOK (0:00 - 0:30)

**Visual:** [What the viewer sees — B-roll, talking head, etc.]
**Narração:** "[Exact text the narrator/host says — must grab attention in first 5 seconds]"
**CTA Implícito:** [What makes the viewer stay — curiosity gap, promise, shock]

## INTRO (0:30 - 1:30)

**Visual:** [Channel branding, title card, context setup]
**Narração:** "[Context-setting narration — who you are, why this matters]"
**Texto na Tela:** [Optional overlay text, subscribe reminder]

## SEGMENT 1: [Topic] (1:30 - 4:00)

**Visual:** [Screen recording, B-roll, AI-generated footage, data visualization]
**Narração:** "[Main educational/entertainment content — conversational, clear]"
**Notas Técnicas:** [Any specific editing cues — zoom, highlight, annotation]

## SEGMENT 2: [Topic] (4:00 - 7:00)

...

## CLIMAX / KEY INSIGHT (XX:XX - XX:XX)

**Visual:** [Most impactful visual moment]
**Narração:** "[The big revelation, key takeaway, or emotional peak]"
**Música:** [Music swells, dramatic beat]

## CTA + OUTRO (XX:XX - end)

**Visual:** [End screen, subscribe animation]
**Narração:** "[Clear call to action — subscribe, comment, like, next video]"
```

### 2. Short-Form (15-60 seconds)

```markdown
# Script: [Title] — [Platform: Reels/Shorts/TikTok]

**Duration:** [XX seconds]
**Aspect Ratio:** 9:16
**Formato:** [Talking Head | Text Overlay | AI B-roll | Mixed]
**Hook Style:** [Question | Shock | Curiosity | Controversy]

---

## BEAT 1: HOOK (0-3s)

**Visual:** [Immediate attention grab — face, text, motion]
**Texto/Voz:** "[1 sentence — the hook that stops the scroll]"

## BEAT 2: CONTEXT (3-8s)

**Visual:** [Quick context — who, what, why]
**Texto/Voz:** "[Setup the premise]"

## BEAT 3: VALUE (8-20s)

**Visual:** [The core content — tutorial step, insight, story beat]
**Texto/Voz:** "[Deliver the promise from the hook]"

## BEAT 4: PAYOFF (20-30s)

**Visual:** [Resolution, result, transformation]
**Texto/Voz:** "[Satisfying conclusion or twist]"

## BEAT 5: CTA (final 3-5s)

**Visual:** [Follow button, comment prompt]
**Texto/Voz:** "[Follow for more | Comment X | Save this]"
```

### 3. Narration/Voice-Over (for AI-generated videos)

```markdown
# Narration Script: [Project]

**Voice Model:** [ElevenLabs voice ID or description]
**Tone:** [Warm | Authoritative | Casual | Dramatic]
**Pace:** [Slow: 120 WPM | Normal: 150 WPM | Fast: 180 WPM]
**Language:** [pt-BR | en-US]

---

## Scene 1 Narration (Duration: Xs)

> "[Exact narration text — written for spoken delivery.
>
> > Short sentences. Natural pauses marked with (...).
> > Emphasis on KEY WORDS in caps for voice inflection.]"

**Timing Note:** Sync with visual transition at [timestamp]

## Scene 2 Narration (Duration: Xs)

> "[Next narration block]"
```

## Writing Principles

### 1. Hook First, Always

- **First 3 seconds** determine if someone watches or scrolls
- Use: questions, bold claims, visual shock, relatable scenarios
- Never: greetings, long intros, channel branding first

### 2. Write for the Ear, Not the Eye

- Short sentences (8-15 words)
- Conversational language (contractions, informal where appropriate)
- Natural rhythm — read aloud to check flow
- Pause markers: `(...)` for dramatic pauses, `—` for quick breaks

### 3. Scene = Action + Emotion

- Every scene must answer: "What does the viewer FEEL here?"
- Don't describe — evoke
- Match visual energy to script energy

### 4. CTA Integration

- Embed CTAs naturally in the content, not just at the end
- "If this resonates, you'll love what comes next..."
- Avoid generic "like and subscribe" — give a REASON

## Timing Calculator

| Content Length | Words (150 WPM) | Words (120 WPM) |
| -------------- | --------------- | --------------- |
| 15 seconds     | ~38 words       | ~30 words       |
| 30 seconds     | ~75 words       | ~60 words       |
| 60 seconds     | ~150 words      | ~120 words      |
| 5 minutes      | ~750 words      | ~600 words      |
| 10 minutes     | ~1500 words     | ~1200 words     |

## Output Files

| Artifact                 | Path                                   |
| ------------------------ | -------------------------------------- |
| Full script              | `docs/scripts/{project}_script.md`     |
| Scene-by-scene narration | `docs/scripts/{project}_narration.md`  |
| Voice-over text (plain)  | `docs/scripts/{project}_voiceover.txt` |

## Integration with Studio

- Scripts feed into `/storyboard` workflow for visual planning
- Narration text feeds into ElevenLabs MCP for audio generation
- Voice-over timing syncs with Remotion `<Sequence>` durations
- Scene descriptions become prompts for Nano Banana / Veo3 generation

## Related Skills

- `ugc-video-prompt` — Full UGC pipeline with character consistency
- `nano-banana-prompting` — Image prompt structure (SLCA)
- `veo3-video-gen` — Video generation from scene prompts
- `elevenlabs-tts` — Voice generation from narration scripts
