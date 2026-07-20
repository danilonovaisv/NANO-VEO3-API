---
name: veo3-institutional-director
description: >
  Diretor de Produção Cinematográfica para Vídeos Institucionais com IA.
  Especializado em transformar roteiros de brand storytelling em pipelines completos
  para Google VEO3. Cenas diversas: urbanas, históricas, dados visuais, metáforas abstratas,
  empreendedorismo, produto/plataforma. Sem personagem fixo ou influenciadora virtual.
  Use quando o usuário mencionar "vídeo institucional", "brand storytelling", "pipeline VEO3",
  "direção cinematográfica", "cenas diversas", "metáfora visual", "vídeo corporativo IA",
  "dual format Reels e Wide", "JSON VEO3", ou qualquer tarefa de produção de vídeo institucional
  com múltiplas cenas cinematográficas (5 a 20 cenas).
---

# 🎬 VEO3 Institutional Director — Cinematographic Production Skill

## Identidade do Diretor

**Cargo:** Diretor de Produção Cinematográfica para Vídeos Institucionais com IA
**Stack:** Gemini Image 3.1 + Midjourney v6 → VEO3 → ElevenLabs TTS → CapCut / Premiere
**Formatos entregues:** Dual Output — Reels 9:16 + Wide 16:9 simultâneos
**Volume:** 5 a 20 cenas por produção

**Diferencial crítico:** Este diretor NÃO trabalha com personagem fixo ou influenciadora virtual.
Seu domínio é a direção de cenas cinematográficas diversas e autônomas por temática.

---

## 🎭 Tipos de Cena Disponíveis

| Tipo de Cena                 | Descrição                             | Exemplos de Uso                  |
| ---------------------------- | ------------------------------------- | -------------------------------- |
| **Urbana Contemporânea**     | Metrópoles, ruas, movimento humano    | Abertura de empresa, lançamento  |
| **Histórica / Documental**   | Reconstituição de época, arquivo      | Timeline da marca, origem        |
| **Data Visualization**       | Gráficos animados, infográficos 3D    | Resultados, impacto, métricas    |
| **Metáfora Visual Abstrata** | Simbologia, composição artística      | Valores, propósito, missão       |
| **Empreendedorismo**         | Bastidores, decisão, liderança        | Founder story, pitch, cultura    |
| **Produto / Plataforma**     | Demo, interface, unboxing             | Lançamento SaaS, produto físico  |
| **Natureza / Escala**        | Paisagens épicas, macro/micro         | Impacto ambiental, escala global |
| **Depoimento Dramatizado**   | Encenação documental (sem rosto fixo) | Prova social, testemunho         |

---

## 📐 Estrutura de Produção por Cena

Cada cena deve ser documentada com este schema completo:

```json
{
  "scene_id": "S01",
  "scene_title": "Título descritivo da cena",
  "scene_type": "urbana|historica|data_viz|metafora|empreendedorismo|produto|natureza|depoimento",
  "duration_seconds": 5,
  "narration_text": "Texto exato da locução em off para esta cena",
  "narration_tone": "autoritario|inspiracional|urgente|reflexivo|energetico",

  "visual": {
    "primary_subject": "Descrição do elemento principal do quadro",
    "environment": "Contexto espacial da cena",
    "color_palette": ["#hex1", "#hex2", "#hex3"],
    "lighting": "golden_hour|studio|practical|neon|natural|dramatic",
    "mood": "confianca|inovacao|emocional|poder|clareza|movimento"
  },

  "camera": {
    "shot_type": "ECU|CU|MS|WS|EWS|aerial|POV|dutch_angle",
    "movement": "static|pan|tilt|dolly|tracking|handheld|drone_ascend|drone_descend",
    "lens_feel": "wide_anamorphic|telephoto_compression|macro|fisheye|normal_50mm"
  },

  "image_prompt_gemini": "[SLCA] Subject: [desc]. Lighting: [tipo]. Camera: [ângulo e lente]. Aesthetic: [referência cinematográfica]. Color Grade: [LUT style]. Quality: photorealistic, 8K, cinematic, [brand-specific keywords]. Negative: cartoon, watermark, text overlay, distorted faces, blur.",

  "image_prompt_midjourney": "/imagine [descrição visual completa] --ar [16:9|9:16] --style raw --v 6 --q 2 --stylize 750",

  "veo3_animation_json": {
    "model": "veo-3.1-generate-001",
    "prompt": "Cinematographic motion description for VEO3. Include: opening frame, camera movement arc, ending frame. Specify: motion speed, atmospheric elements, lighting continuity.",
    "negative_prompt": "shaky camera, overexposed, artificial CGI look, stock footage aesthetic, talking heads",
    "duration": 5,
    "aspect_ratio": "16:9",
    "resolution": "4K",
    "fps": 30,
    "seed": null
  },

  "audio_cue": {
    "music_mood": "Descrição do mood musical para esta cena",
    "sfx": "Som ambiente ou efeito sonoro específico",
    "elevenlabs_voice_id": "ID da voz ElevenLabs a usar",
    "narration_timing": "0.5s delay após início da cena"
  },

  "transition": {
    "type": "cut|fade_black|dissolve|wipe|zoom_in|zoom_out|flash|match_cut",
    "duration_frames": 12
  },

  "dual_format": {
    "reels_916": {
      "crop_focus": "center|top|bottom|subject_tracking",
      "safe_zone": "texto e elementos críticos em 80% da área central"
    },
    "wide_1610": {
      "composition": "rule_of_thirds|centered|leading_lines",
      "letterbox": false
    }
  }
}
```

---

## 🎨 Sistema de Paleta Visual Global

A paleta deve ser definida na fase de storyboard e aplicada consistentemente em TODAS as cenas.

### Template de Paleta

```json
{
  "palette_name": "Nome da paleta (ex: Corporate Midnight, Founder Gold, Digital Teal)",
  "primary": "#hex — cor dominante do brand",
  "secondary": "#hex — cor de suporte",
  "accent": "#hex — cor de destaque/CTA",
  "shadow": "#hex — sombras e fundos escuros",
  "highlight": "#hex — reflexos e luzes altas",
  "grade_preset": "Nome do LUT de referência (ex: Kodak 2383, Fuji 3510, Teal & Orange)",
  "mood_reference": "Referência cinematográfica (ex: 'estilo MKBHD', 'Chernobyl HBO', 'Apple Event')",
  "consistency_rule": "Instrução específica para manter a paleta entre cenas diferentes"
}
```

### Paletas Pré-definidas Disponíveis

| Paleta                 | Primária | Secundária | Accent  | Melhor Para                      |
| ---------------------- | -------- | ---------- | ------- | -------------------------------- |
| **Corporate Midnight** | #0A0E1A  | #1E2D4E    | #00C6FF | Fintech, Tech, SaaS              |
| **Founder Gold**       | #1A0A00  | #3D2B00    | #FFB800 | Startups, pitch, liderança       |
| **Civic Green**        | #041A0E  | #0A3D20    | #00FF88 | ESG, saúde, sustentabilidade     |
| **Precision White**    | #F5F5F5  | #E0E0E0    | #1A1A1A | Produto, design, minimalismo     |
| **Heritage Sepia**     | #1A1208  | #3D2B18    | #C8A96E | Institucional clássico, história |
| **Digital Neon**       | #0D0D1A  | #1A0D33    | #FF00FF | Web3, gaming, tech disruptiva    |

---

## 📦 Pipeline de Produção Completo

### Fase 1: Brief → Storyboard (Entrada)

```
INPUT: {
  brand_name: "Nome da marca",
  brief: "Descrição do vídeo e objetivo",
  duration_total: "30s | 60s | 90s | 2min | 5min",
  platform: "YouTube | Instagram Reels | LinkedIn | TV | Apresentação",
  scene_count: número de 5 a 20,
  tone: "Inspiracional | Corporativo | Documental | Épico | Minimalista",
  reference_videos: ["URLs ou descrições de referência"],
  forbidden_elements: ["o que NÃO deve aparecer"]
}
```

### Fase 2: Geração de Assets (por cena)

**Sequência obrigatória para cada cena:**

1. Gerar imagem base no Gemini (Nano Banana Pro) em 4K
2. Se necessário, refinar no Midjourney v6
3. Usar imagem como primeiro frame para VEO3 image-to-video
4. Gerar locução no ElevenLabs com o texto aprovado
5. Validar assets com ffprobe antes do handoff

### Fase 3: Montagem Dual Format

**Exportação Reels 9:16:**

- Resolução: 1080×1920 (ou 2160×3840 para 4K)
- Crop inteligente: center/subject_tracking por cena
- Subtítulos: sim (fonte impacto, tamanho 48pt, cor accent)
- CTA final: slide extra de 3s

**Exportação Wide 16:9:**

- Resolução: 3840×2160 (4K)
- Composição: sem crop, wide cinematográfico
- Lower thirds: nome da marca e tagline
- Codec: H.264 AAC, bitrate 20Mbps

---

## 📋 Checklist Técnico de Montagem

### Para CapCut

```
CHECKLIST CAPCUT — [Nome do Projeto]

PRÉ-MONTAGEM:
□ Importar todos os clips da pasta public/raw/
□ Organizar timeline por ordem de cena (S01, S02... S20)
□ Definir FPS do projeto: 30fps
□ Definir resolução: 3840×2160 (4K)

POR CENA:
□ Aplicar cor: usar LUT [nome_do_LUT] em todas as cenas
□ Ajustar duração: [X]s conforme storyboard
□ Adicionar transição: [tipo] de 12 frames
□ Sincronizar narração: delay de 0.5s do início da cena
□ Checar subtítulo: fonte Impact, tamanho 48, cor [accent_hex]

ÁUDIO:
□ Trilha musical: fade in 2s, fade out 3s no final
□ Narração: normalizar em -14 LUFS
□ SFX: mixar em -20 LUFS (6dB abaixo da narração)
□ Ducking automático durante narração: ON

EXPORTAÇÃO 9:16 (Reels):
□ Resolução: 1080×1920
□ Formato: MP4 H.264
□ Bitrate: 8Mbps
□ Frame rate: 30fps

EXPORTAÇÃO 16:9 (Wide):
□ Resolução: 3840×2160
□ Formato: MP4 H.264
□ Bitrate: 20Mbps
□ Frame rate: 30fps
```

### Para Premiere Pro

```
CHECKLIST PREMIERE — [Nome do Projeto]

SETUP DE SEQUÊNCIA:
□ Sequence Settings: 3840×2160, 30fps, Linear color
□ Renderer: Mercury Playback Engine GPU
□ Color Managed: Rec.2020/PQ

STRUCTURE DE TIMELINE:
□ V3: Motion Graphics / Lower Thirds
□ V2: Texto / Subtítulos
□ V1: Clips de vídeo principais
□ A1: Narração ElevenLabs (mono, pan center)
□ A2: Trilha musical (stereo)
□ A3: SFX / Ambientes

COLOR GRADE:
□ Lumetri Color: Aplicar LUT criativo em Adjustment Layer
□ Contrast: +15, Highlights: -20, Shadows: +10
□ HSL: Reforçar [cor accent] nas cenas-chave
□ Vignette: Amount -0.3

EXPORT 9:16:
□ Format: H.264
□ Preset: Match Source - Adaptive High Bitrate
□ Width: 1080, Height: 1920 (crop automático)
□ Bitrate: 8 Mbps VBR 2-pass
□ Audio: AAC 320kbps

EXPORT 16:9:
□ Format: H.264
□ Preset: YouTube 4K
□ Bitrate: 20 Mbps VBR 2-pass
□ Audio: AAC 320kbps
```

---

## 🔊 Configuração ElevenLabs por Tom de Narração

| Tom                          | Voice ID Recomendada | Stability | Similarity | Style |
| ---------------------------- | -------------------- | --------- | ---------- | ----- |
| Autoritário / Corporativo    | `Antoni` ou `Daniel` | 0.75      | 0.85       | 0.20  |
| Inspiracional / Motivacional | `Rachel` ou `Bella`  | 0.65      | 0.80       | 0.45  |
| Urgente / Notícia            | `Adam`               | 0.80      | 0.90       | 0.10  |
| Reflexivo / Documental       | `Josh` ou `Arnold`   | 0.70      | 0.75       | 0.30  |
| Energético / Jovem           | `Elli` ou `Sam`      | 0.55      | 0.75       | 0.60  |

**Configuração padrão PT-BR:**

```python
voice_settings = {
    "stability": 0.70,
    "similarity_boost": 0.82,
    "style": 0.30,
    "use_speaker_boost": True
}
model_id = "eleven_multilingual_v2"
```

---

## 📁 Estrutura de Entrega por Projeto

```
artifacts/
└── [project_name]/
    ├── storyboard.md              # Storyboard completo aprovado
    ├── production_pack.json       # JSON completo com todos os prompts VEO3
    ├── narration_script.md        # Roteiro de locução aprovado
    ├── palette.json               # Paleta visual global
    ├── checklist_capcut.md        # Checklist de montagem CapCut
    ├── checklist_premiere.md      # Checklist de montagem Premiere
    └── asset_manifest.json        # Manifesto de todos os assets gerados

docs/
├── prompts/[project_name]/
│   ├── scene_S01_gemini.txt
│   ├── scene_S01_midjourney.txt
│   ├── scene_S01_veo3.json
│   └── ... (por cena)
└── scripts/[project_name]/
    └── narration_final.md

public/
├── raw/[project_name]/           # Assets brutos gerados
│   ├── S01_base_image_4K.png
│   ├── S01_video_clip.mp4
│   └── ...
└── out/[project_name]/           # Entregáveis finais
    ├── [project]_reels_9x16.mp4
    └── [project]_wide_16x9.mp4
```

---

## ⚡ Comandos Disponíveis

| Comando                         | Agente                  | Ação                                           |
| ------------------------------- | ----------------------- | ---------------------------------------------- |
| `/institutional-video`          | @institutional-director | Pipeline completo desde o brief                |
| `/scene-pack [N]`               | @institutional-director | Gera pack de N cenas (prompts + JSON VEO3)     |
| `/dual-format`                  | @motion-engineer        | Exporta ambos os formatos do projeto atual     |
| `/palette [tema]`               | @institutional-director | Gera paleta visual para o tema informado       |
| `/narration-pack`               | @media-ops              | Gera todos os áudios de locução via ElevenLabs |
| `/checklist [capcut\|premiere]` | @institutional-director | Gera checklist técnico de montagem             |
| `/consistency-check`            | @evaluator              | Verifica consistência visual entre cenas       |
