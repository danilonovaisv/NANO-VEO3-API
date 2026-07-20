---
description: Workflow para orquestrar e auditar os papéis das sub-personas no pipeline de vídeo.
---

# Workflow: /video-agent-orchestration — Matriz de Swarm do Pipeline de Vídeo

- **Quando usar:** Ao orquestrar e auditar papéis das personas de IA que atuam no pipeline de vídeo.
- **Quem age:** `@orchestrator`.

---

## 👥 Swarm Persona Matrix

| Core Swarm Owner | Agent ID | Persona Name | Role | Inputs | Outputs | Allowed Files | Prohibited Files | Associated Skills | Associated MCPs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `@orchestrator` | `briefing-analyzer-agent` | Briefing Analyzer | Parses scripts and resources | Raw briefing files | `PROJECT_CONTEXT.md` | `PROJECT_CONTEXT.md` | Python scripts | `context-driven-development` | `filesystem` |
| `@orchestrator` | `project-context-agent` | Context Architect | Structures workspace and variables | Briefing parameters | `AGENTS.md`, `GEMINI.md` | `workflow/`, `.context/` | Source code | `context-manager` | `filesystem` |
| `@hf-designer` | `identity-lock-agent` | Identity Guard | Enforces consistency | Character descriptors | `IDENTITY_LOCK.md` | `IDENTITY_LOCK.md` | Python scripts | `ugc-brief` | `filesystem` |
| `@hf-designer` | `master-image-agent` | Image Master | Prompts and filters master character frames | Character descriptors | `assets/master/*.png` | `prompts/image/` | Timeline scripts | `nano-banana-pro-openrouter` | `filesystem` |
| `@hf-designer` | `scene-json-agent` | Scene Director | Manages scene metadata | Script text | `json/scenes/scene_*.json` | `json/scenes/` | Governance files | `script-generation` | `filesystem` |
| `@hf-designer` | `image-prompt-agent` | Image Prompter | Generates image prompts | Scene descriptions | Prompts inside JSON | `json/scenes/` | Audio assets | `veo3-prompter` | `filesystem` |
| `@hf-designer` | `video-prompt-agent` | Video Prompter | Generates video prompts | Scene actions | Prompts inside JSON | `json/scenes/` | Audio assets | `veo3-prompter` | `filesystem` |
| `@hf-builder` | `audio-agent` | Audio Engineer | Generates speech and voice-clone tracks | Dialogue scripts | `assets/audio/*.mp3` | `assets/audio/` | Video files | `elevenlabs-text-to-speech` | `filesystem` |
| `@hf-builder` | `lipsync-agent` | Lip Sync Director | Coordinates avatar lip synchronizations | Silent MP4 + MP3 | `assets/lipsync/*.mp4` | `assets/lipsync/` | Code files | `heygen-video` | `heygen` |
| `@hf-builder` | `broll-agent` | Asset Manager | Gathers overlay footage | Shot lists | `assets/broll/` | `assets/broll/` | Timeline scripts | `media-asset-processing` | `google-drive` |
| `@hf-builder` | `editing-agent` | Video Editor | Compiles video timeline and burns subtitles | Lip-sync files, B-rolls | `timeline_edit.py`, final MP4 | `timeline_edit.py`, `outputs/` | Prompts | `video-processing` | `filesystem` |
| `@hf-qa` | `qa-agent` | Quality Controller | Conducts technical and narrative QA | Generated videos | `logs/qa-run.json` | `logs/` | Active code | `video-analyzer` | `filesystem` |
| `@hf-qa` | `security-agent` | Security Guard | Audits credentials and protects project privacy | Code files | `logs/security-audit.md` | `logs/security-audit.md`, `.env` | Render engines | `troubleshooting` | `filesystem` |
| `@hf-qa` | `context7-research-agent` | Doc Specialist | Validates library APIs and locks versions | APIs and commands | `playbook/` | `playbook/`, `json/` | Subtitles | `context7-auto-research` | `context7` |
| `@hf-qa` | `packaging-agent` | Deliverer | Zips and hands off finished video outputs | Approved MP4s | `outputs/*.zip`, `CHANGELOG.md` | `outputs/`, `CHANGELOG.md` | Source code | `troubleshooting` | `filesystem` |

---

## 🔒 Execution Gates & Approval

Every agent must stop and query human approval before starting execution if:

1. `@hf-designer` (`master-image-agent`) plans to render the initial master frame.
2. `@hf-builder` (`editing-agent`) triggers final timeline compilation.
3. `@hf-builder` (`lipsync-agent`) starts lipsync generation.
