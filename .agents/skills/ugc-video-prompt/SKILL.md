---
name: ugc-video-prompt
description: >
  Skill para criar prompts de produção de vídeos UGC (User Generated Content) com personagens
  IA no PROMPT-APP de Danilo Novais. Use SEMPRE que o usuário mencionar "vídeo UGC", "personagem IA",
  "criação de vídeo com IA", "roteiro de vídeo", "Midjourney vídeo", "Nano Banana vídeo",
  "cenas com personagem", "video prompts JSON", "frames iniciais e finais de cenas",
  "produção de conteúdo UGC", "vídeo com marca" ou qualquer tarefa que envolva
  gerar um pipeline completo de produção de vídeo com IA (imagens → vídeos → montagem).
  Também acione ao ver briefs de vídeo, roteiros com cenas e locução, ou links de Google Drive
  com assets de marca + personagens.
---

# UGC Video Prompt — Pipeline Completo de Produção com IA

## O que esta skill faz

Transforma um briefing de vídeo UGC em um **pipeline de produção completo**, gerando 4 artefatos:

1. **Roteiro de Produção** (`.md`) — storyboard detalhado cena a cena com direção de arte, locução, timing e notas de edição
2. **Image Prompts** (`.md`) — prompts de frame inicial e final para **Midjourney v6** e **Nano Banana** de cada cena
3. **Video Prompts** (`.json`) — prompts estruturados para geração de vídeo de cada cena usando os frames como referência
4. **Curadoria Musical** — recomendação de BG music alinhada ao tom da marca

Todos os prompts seguem o **formato cognitivo padrão do PROMPT-APP** — consulte `references/prompt-output-format-standard.md` para detalhes do schema.

---

## Inputs Necessários

Antes de gerar qualquer output, confirme que o usuário forneceu:

| Input               | Descrição                                                                                                    | Obrigatório |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| `briefing_video`    | Objetivo, mensagem central, duração alvo, plataforma (Instagram, TikTok, YouTube)                            | ✅          |
| `roteiro`           | Cenas numeradas com locução/narração e duração de cada cena                                                  | ✅          |
| `link_assets`       | Google Drive (ou similar) com: guia da marca, imagem do personagem, imagem do cenário, logo, paleta de cores | ✅          |
| `link_identidade`   | Instagram, site ou qualquer referência visual da comunicação da marca                                        | ✅          |
| `estilo_personagem` | Descrição do personagem (aparência, roupas, expressões-chave)                                                | Recomendado |
| `duracao_cena`      | Duração alvo de cada cena em segundos (padrão: 3-5s)                                                         | Opcional    |

Se algum input obrigatório estiver faltando, pergunte antes de continuar.

---

## Formato Cognitivo Padrão (PROMPT-APP Schema)

Todo prompt gerado neste projeto segue esta estrutura. Respeite-a rigorosamente:

```
# ROLE: [Identidade/persona da IA]

## 1. CONTEXT & TASK
[Contexto do projeto e tarefa principal a ser executada]

## 2. DYNAMIC PARAMETERS
- **Tom**: [ex: Técnico | Emocional | Inspirador | Descontraído]
- **Público**: [ex: Consumidores jovens | Desenvolvedores | Empreendedores]
- **Estilo**: [ex: Conciso | Detalhado | Narrativo]
- **objetivo_principal**: [objetivo específico deste prompt]
- Inputs:
  - [input 1]
  - [input 2]
  - ...
- Output:
  - [output 1 com formato]
  - [output 2 com formato]
  - ...
- **prompt_input**: |
  [O corpo do prompt em si — system role, tarefa, regras e formato de saída]

## 3. RULES & CONSTRAINTS
[Regras e restrições de execução]

## 5. OUTPUT FORMAT
- **Format**: [markdown | json | text | code]
- **Language**: [pt-BR | en-US]
- **Required fields**: [campos obrigatórios no output]
```

> 📖 Veja o template completo e exemplos em `references/prompt-output-format-standard.md`

---

## Processo de Geração — Passo a Passo

### Passo 1: Análise dos Assets e Identidade da Marca

Antes de gerar qualquer output, internalize:

- **Personagem**: aparência física (cabelo, pele, roupa, expressão neutra), estilo visual (fotorrealista, animação, 3D)
- **Cenários**: ambientes de cada cena, paleta de cores dominante, iluminação
- **Tom de voz da marca**: formal/informal, energético/calmo, emocional/racional
- **Plataforma alvo**: formato (vertical 9:16 para Reels/TikTok, horizontal 16:9 para YouTube), duração padrão

### Passo 2: Roteiro de Produção (`.md`)

Gere um documento estruturado com este formato para cada cena:

```markdown
# Roteiro de Produção — [Nome do Projeto]

**Marca:** [Nome]  
**Plataforma:** [Instagram Reels | TikTok | YouTube Shorts]  
**Duração Total:** [XX segundos]  
**Personagem:** [Descrição curta]

---

## CENA [N] — [Título da Cena]

**Duração:** [X-Xs]  
**Localização/Cenário:** [descrição do ambiente]  
**Ação do Personagem:** [o que o personagem faz fisicamente]  
**Locução/Narração:** "[texto exato da fala ou narração off]"  
**Expressão/Emoção:** [expressão facial e corporal do personagem]  
**Câmera:** [ângulo: frontal | perfil | plongée | contra-plongée] + [movimento: estático | pan | zoom in | zoom out]  
**Texto na Tela:** [overlay de texto se houver, com posição e estilo]  
**Transição para próxima cena:** [corte seco | dissolve | wipe | fade]  
**Notas de Edição:** [cor grading, efeitos especiais, música, SFX]
```

### Passo 3: Image Prompts para Midjourney e Nano Banana (`.md`)

Para **cada cena**, gere 2 prompts de imagem (frame inicial + frame final):

```markdown
## CENA [N] — Image Prompts

### 🎬 Frame Inicial (Keyframe A)

**Midjourney v6:**
```

[descrição completa do personagem], [expressão], [ação], [cenário detalhado],
[iluminação], [composição de câmera], [estilo visual], [paleta de cores],
--ar 9:16 --v 6 --style raw --q 2

```

**Nano Banana:**
```

[mesmo prompt adaptado para Nano Banana — mais descritivo, sem flags Midjourney,
incluir referências de estilo como "photorealistic", "cinematic lighting", etc.]

```

### 🎬 Frame Final (Keyframe B)

**Midjourney v6:**
```

[mesmos parâmetros de identidade do personagem + cenário], [nova ação/posição],
[mesma paleta e iluminação para consistência], [expressão final da cena]
--ar 9:16 --v 6 --style raw --q 2 --seed [mesmo seed do Frame A]

```

**Nano Banana:**
```

[versão Nano Banana do frame final]

```

```

**Regras críticas de consistência visual:**

- O personagem deve ter exatamente a mesma descrição física em TODOS os frames (cabelo, roupa, tom de pele, acessórios)
- Use o mesmo `--seed` no Midjourney para manter consistência facial entre cenas
- Descreva a iluminação e paleta de cores da mesma forma em todas as cenas para coesão visual
- Separe claramente o que muda entre keyframe A e B (ação/posição) do que permanece igual (identidade)

### Passo 4: Video Prompts em JSON

Gere um JSON com um objeto por cena seguindo esta estrutura:

```json
{
  "project": {
    "name": "[Nome do projeto]",
    "brand": "[Nome da marca]",
    "platform": "[instagram_reels | tiktok | youtube_shorts]",
    "aspect_ratio": "9:16",
    "total_duration_seconds": 0,
    "character_description": "[descrição completa e canônica do personagem — usada como referência em todas as cenas]"
  },
  "scenes": [
    {
      "scene_id": "cena_01",
      "title": "[Título da cena]",
      "duration_seconds": 4,
      "keyframe_a": {
        "description": "[descrição do frame inicial — deve corresponder ao image prompt gerado]",
        "image_reference": "cena_01_frame_a.png"
      },
      "keyframe_b": {
        "description": "[descrição do frame final]",
        "image_reference": "cena_01_frame_b.png"
      },
      "video_prompt": {
        "motion_description": "[descrição do movimento que deve acontecer entre frame A e B]",
        "camera_movement": "[static | pan_left | pan_right | zoom_in | zoom_out | tilt_up | tilt_down]",
        "character_action": "[ação física detalhada do personagem durante a cena]",
        "expression_transition": "[como a expressão muda do início ao fim]",
        "atmosphere": "[descrição do ambiente, iluminação, clima emocional]",
        "negative_prompt": "[o que evitar: jumpcuts abruptos, distorção de rosto, flickering, inconsistência de roupa]",
        "tools": {
          "primary": "[Kling 1.6 | Runway Gen-3 | Pika 2.0 | Wan 2.1]",
          "fallback": "[Luma Dream Machine | MiniMax Video]",
          "settings": {
            "duration": "4s",
            "fps": 24,
            "resolution": "1080x1920",
            "motion_intensity": "medium"
          }
        }
      },
      "audio": {
        "narration": "[texto exato da locução/narração]",
        "sfx": "[efeitos sonoros se houver]",
        "music_volume": "background_30_percent"
      }
    }
  ]
}
```

### Passo 5: Curadoria Musical

Recomende a trilha de BG com este formato:

```markdown
## 🎵 Curadoria Musical — BG Track

**Tom do Vídeo:** [energético | emocional | inspirador | descontraído | corporativo]  
**BPM Ideal:** [ex: 100-120 BPM para vídeos energéticos]  
**Instrumentação:** [ex: sintetizadores + bateria eletrônica + melodia de piano]

### Recomendações Primárias

1. **[Nome da música]** — [Artista/Estilo]
   - Plataformas: [Epidemic Sound | Artlist | Musicbed | YouTube Audio Library]
   - Link de referência: [URL se disponível]
   - Por que funciona: [breve justificativa alinhada ao tom da marca]

2. [repetir para 2-3 opções]

### Keywords para busca

[termos para buscar em bibliotecas de música: ex: "upbeat corporate pop", "motivational indie", "energetic lo-fi"]

### Notas de edição musical

- Fade in nos primeiros [X]s
- Pico de energia na cena [N] (momento do CTA ou reveal principal)
- Fade out nos últimos [X]s
```

---

## Formato Final de Entrega

Sempre entregue 4 arquivos separados:

| Arquivo                         | Conteúdo                                   |
| ------------------------------- | ------------------------------------------ |
| `[projeto]_roteiro_producao.md` | Storyboard completo (Passo 2)              |
| `[projeto]_image_prompts.md`    | Prompts Midjourney + Nano Banana (Passo 3) |
| `[projeto]_video_prompts.json`  | JSON estruturado (Passo 4)                 |
| `[projeto]_musica_bg.md`        | Curadoria musical (Passo 5)                |

---

## Exemplo de Resposta ao Usuário

Ao completar a geração:

```
✅ Pipeline UGC gerado com sucesso!

**[projeto]_roteiro_producao.md** — X cenas detalhadas com direção de arte
**[projeto]_image_prompts.md** — X×2 = Y prompts (Midjourney + Nano Banana)
**[projeto]_video_prompts.json** — X objetos de cena com prompts e settings
**[projeto]_musica_bg.md** — 3 opções de trilha com keywords de busca

💡 Próximo passo: gere os frames com Midjourney/Nano Banana usando os
image prompts → renomeie os arquivos conforme `image_reference` no JSON →
importe no seu editor de vídeo IA preferido.
```
