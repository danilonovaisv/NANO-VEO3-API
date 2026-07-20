---
description: Pipeline completo de produção de vídeo institucional cinematográfico com VEO3. Mapeado para /institutional-video
---

# /institutional-video — Cinematographic Institutional Video Production

## Agent: @institutional-director

### Visão Geral

Pipeline de produção de ponta a ponta para vídeos institucionais com IA. Transforma um brief de brand storytelling em um pacote completo de produção: storyboard cinematográfico, JSONs para VEO3, roteiro de locução, dual format (9:16 + 16:9) e checklists de montagem.

**Diferencial:** Sem personagem fixo. Cenas diversas e autônomas por temática.

---

### Trigger

Usuário digita: `/institutional-video` seguido do brief.

**Exemplo:**

> "Ative /institutional-video para criar um vídeo de 60s sobre os 10 anos da empresa TechBridge, mostrando origem, crescimento e impacto social. Tom documental, paleta azul corporativo, 8 cenas."

---

### FASE 1 — Brief Intake & Parsing

**O agente deve extrair do brief:**

```
✅ CHECKLIST DE EXTRAÇÃO DE BRIEF:
□ brand_name: Nome da empresa / marca
□ duration_total: Duração total desejada (30s / 60s / 90s / 2min / 5min)
□ platform: Plataforma principal (YouTube, Reels, LinkedIn, TV, Apresentação)
□ scene_count: Número de cenas (5–20). Se não informado, calcular: 1 cena / 5s
□ tone: Tom narrativo (Inspiracional / Corporativo / Documental / Épico / Minimalista)
□ objective: O que o vídeo deve comunicar / converter
□ palette_preference: Referência de cor ou nome de paleta pré-definida
□ reference_videos: URLs ou descrições de referências visuais (opcional)
□ forbidden_elements: O que NÃO deve aparecer no vídeo
```

**Se qualquer campo estiver faltando → perguntar ao usuário antes de prosseguir.**

---

### FASE 2 — Global Aesthetic Definition

Antes de planejar cenas, definir a identidade visual global:

```json
{
  "project_id": "[brand]_[yyyymmdd]",
  "brand_name": "...",
  "duration_total": "60s",
  "scene_count": 8,
  "platform": "YouTube + Reels",

  "global_aesthetic": {
    "palette": {
      "name": "...",
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "shadow": "#hex",
      "highlight": "#hex",
      "grade_preset": "...",
      "mood_reference": "..."
    },
    "typography": {
      "font_title": "...",
      "font_body": "...",
      "subtitle_style": "..."
    },
    "cinematographic_style": "...",
    "music_genre": "...",
    "narration_voice": "...",
    "pacing": "slow_burn | dynamic | rhythmic | editorial"
  }
}
```

**⏸️ PAUSE #1 — Aprovação da Identidade Visual**
Apresentar a definição estética ao usuário e aguardar: "Aprovado" / "Go" / ✅

---

### FASE 3 — Scene Planning & Distribution

Distribuir as cenas seguindo a **estrutura narrativa em 3 atos:**

```
ATO 1 — ABERTURA (25% das cenas): Capturar atenção, estabelecer contexto
  └─ Cenas: Épica de abertura + Contexto da marca

ATO 2 — DESENVOLVIMENTO (50% das cenas): Contar a história, provar o valor
  └─ Cenas: Jornada, dados/resultados, bastidores, impacto

ATO 3 — RESOLUÇÃO (25% das cenas): Inspirar ação, deixar memória emocional
  └─ Cenas: Visão de futuro, CTA, encerramento da marca
```

**Distribuição de Tipos de Cena (exemplo para 8 cenas):**

| Cena | Ato             | Tipo Sugerido                 | Duração |
| ---- | --------------- | ----------------------------- | ------- |
| S01  | Abertura        | Urbana / Metáfora épica       | 8s      |
| S02  | Abertura        | Histórica / Documental        | 8s      |
| S03  | Desenvolvimento | Empreendedorismo / Bastidores | 7s      |
| S04  | Desenvolvimento | Data Visualization            | 7s      |
| S05  | Desenvolvimento | Produto / Plataforma          | 7s      |
| S06  | Desenvolvimento | Metáfora Abstrata (impacto)   | 7s      |
| S07  | Resolução       | Natureza / Escala global      | 8s      |
| S08  | Resolução       | Metáfora + Logo reveal        | 8s      |

---

### FASE 4 — Full Scene Pack Generation

Para **cada cena**, gerar o JSON completo no formato da skill `veo3-institutional-director`:

```markdown
## SCENE [N]: [Título]

**Ato:** [1/2/3] | **Tipo:** [tipo] | **Duração:** [X]s

### Narração (ElevenLabs)

> "[Texto exato da locução em off]"
> Tom: [autoritario|inspiracional|urgente|reflexivo|energetico]

### Prompt Gemini / Nano Banana Pro (Imagem Base 4K)
```

[SLCA PROMPT COMPLETO]
Subject: [desc precisa do elemento principal]
Environment: [contexto espacial]
Lighting: [tipo e direção da luz]
Camera: [ângulo exato e tipo de lente]
Aesthetic: [referência cinematográfica]
Color Grade: [preset LUT — manter consistência com paleta global]
Quality: photorealistic, 8K, cinematic, hyper-detailed
Negative: cartoon, watermark, text overlay, distorted anatomy, motion blur, stock photo look

```

### Prompt Midjourney v6 (alternativo)
```

/imagine [descrição] --ar [16:9|9:16] --style raw --v 6 --q 2 --stylize 750 --no text, watermark, blur

````

### JSON VEO3 (Animação Cinematográfica)
```json
{
  "model": "veo-3.1-generate-001",
  "prompt": "[Descrição do movimento cinematográfico: frame inicial → arco da câmera → frame final. Elementos atmosféricos, velocidade do movimento, continuidade de iluminação]",
  "negative_prompt": "shaky camera, overexposed, artificial CGI look, stock footage aesthetic, jump cuts, talking heads, subtitles",
  "duration": [X],
  "aspect_ratio": "16:9",
  "resolution": "4K",
  "fps": 30,
  "seed": null
}
````

### Configurações de Dual Format

- **9:16 Reels:** crop_focus=[center|top|subject_tracking], elementos críticos em zona segura central
- **16:9 Wide:** composition=[rule_of_thirds|centered], cinematográfico sem crop

### Transição para Próxima Cena

Tipo: [cut|fade|dissolve|match_cut|zoom] | Duração: [N] frames

````

---

### FASE 5 — Narration Script (Roteiro Completo)

Gerar o roteiro de locução compilado:

```markdown
# Roteiro de Locução — [Project Name]
**Duração total:** [X]s | **Voz:** [ElevenLabs voice] | **Idioma:** PT-BR

---

## S01 — [Título da Cena] (0:00 – 0:08)
**[Texto de narração da cena 1]**

## S02 — [Título da Cena] (0:08 – 0:16)
**[Texto de narração da cena 2]**

[... continuar para todas as cenas]

---
**Contagem total de palavras:** [N]
**Tempo estimado de leitura:** [X]s @ 150 palavras/min
**Tom dominante:** [tom escolhido]
**Nota de performance:** [instruções para o sistema de TTS]
````

Salvar em: `docs/scripts/[project_name]/narration_final.md`

---

### FASE 6 — Production Pack Assembly

Compilar o `production_pack.json` com TODOS os assets de uma vez:

```json
{
  "project_id": "...",
  "brand_name": "...",
  "created_at": "[ISO timestamp]",
  "global_aesthetic": { ... },
  "scenes": [
    { ... scene S01 completa ... },
    { ... scene S02 completa ... },
    ...
  ],
  "narration_script": { ... },
  "checklist": {
    "capcut": "path/to/checklist_capcut.md",
    "premiere": "path/to/checklist_premiere.md"
  },
  "asset_manifest": {
    "total_scenes": N,
    "images_to_generate": N,
    "videos_to_generate": N,
    "audio_files_to_generate": N,
    "estimated_api_calls": N,
    "formats_to_export": ["9:16", "16:9"]
  }
}
```

**⏸️ PAUSE #2 — Aprovação do Production Pack Completo**

Apresentar ao usuário:

1. Resumo do storyboard (cena por cena)
2. Roteiro de locução completo
3. Estimativa de chamadas de API e créditos estimados
4. Formatos de entrega confirmados

**AGUARDAR:** "Aprovado" / "Gerar mídia" / "Go" / ✅

---

### FASE 7 — Handoff para @media-ops

Após aprovação → disparar sequência:

```
🎬 Passando para @media-ops...

Agenda de geração:
1. Imagens base (Nano Banana Pro / Gemini) — [N] imagens 4K
2. Animações VEO3 (image-to-video) — [N] clips de [X]s cada
3. Narração ElevenLabs — [N] arquivos de áudio
4. Validação com ffprobe — todos os assets

Após validação → @motion-engineer para dual format render.
```

---

### Outputs do Workflow

| Artefato             | Caminho                                     | Responsável             |
| -------------------- | ------------------------------------------- | ----------------------- |
| Production Pack JSON | `artifacts/[project]/production_pack.json`  | @institutional-director |
| Storyboard completo  | `artifacts/[project]/storyboard.md`         | @institutional-director |
| Roteiro de narração  | `docs/scripts/[project]/narration_final.md` | @institutional-director |
| Paleta visual        | `artifacts/[project]/palette.json`          | @institutional-director |
| Checklist CapCut     | `artifacts/[project]/checklist_capcut.md`   | @institutional-director |
| Checklist Premiere   | `artifacts/[project]/checklist_premiere.md` | @institutional-director |
| Assets brutos        | `public/raw/[project]/`                     | @media-ops              |
| Renders finais       | `public/out/[project]/`                     | @motion-engineer        |

---

### Regras Críticas

- ❌ NÃO usar personagem fixo ou influenciadora virtual
- ❌ NÃO gerar assets de mídia sem aprovação do usuário (PAUSE obrigatório)
- ❌ NÃO avançar para próxima fase com campos de brief faltando
- ✅ SEMPRE gerar dual format (9:16 + 16:9) por padrão
- ✅ SEMPRE manter consistência de paleta entre todas as cenas
- ✅ SEMPRE incluir negative_prompt em todos os prompts VEO3
- ✅ SEMPRE salvar production_pack.json antes do handoff
- ✅ SEMPRE apresentar asset_manifest antes de chamar APIs pagas
