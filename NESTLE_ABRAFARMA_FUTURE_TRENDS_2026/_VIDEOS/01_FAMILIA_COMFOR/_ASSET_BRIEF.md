# FT26-LED01_CURVO-001 — Família Comfor

## Identificação

- **Placement:** LED 1 — Frente / Curvo
- **Código:** LED01_CURVO
- **Asset de origem:** 1
- **Responsável:** Tainá Gonçalves
- **Complexidade:** B_MOTION_KV
- **Prioridade:** HIGH
- **Prazo:** 2026-08-10

## Direcional

Animação dos Mockups com a frase "Marca Líder da Categoria"

## Comentários de Marketing

Confirmar frase sobre "Marca com maior venda..." — **PENDENTE LEGAL**

## Materiais

- **Source link:** PENDENTE
- **Material link:** https://www.dropbox.com/request/6195ssn7qky5tueb4ool
- **Direcional:** Enviado
- **KV:** N/A (frames são os KVs)
- **Mockup:** N/A
- **Campanha:** N/A
- **Vídeo:** N/A

## Especificações Técnicas — LED 1 Curvo (CONFIRMADAS)

- **Resolução:** 1792 × 1536 px — P1.9 7x6 Mod
- **FPS:** 60
- **Codec:** H.264
- **Duração:** 5s por cena de geração (batch de 5 variações para seleção criativa)
- **Áudio:** Nenhum
- **Safe area:** 10% em todas as bordas
- **Loop:** Sim — frame final resolve para FRAME-2
- **Claim:** PENDENTE CONFIRMAÇÃO LEGAL — "Marca Líder da Categoria"
- **Disclaimer:** PENDENTE

## Frames de Referência (CONFIRMADOS)

| Frame             | Arquivo                                                                | Tamanho | Status    |
| ----------------- | ---------------------------------------------------------------------- | ------- | --------- |
| FRAME-1 (inicial) | `01_INPUT/FRAME-1-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png` | 2.9 MB  | CONFIRMED |
| FRAME-2 (final)   | `01_INPUT/FRAME-2-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png` | 3.3 MB  | CONFIRMED |

## Prompt JSONs Gerados — `04_MASTER/` (GATE 6 READY)

| ID  | Título                              | Motion | JSON                                                                        |
| --- | ----------------------------------- | ------ | --------------------------------------------------------------------------- |
| S01 | Cinematic Technology Reveal         | medium | `S01_FT26-NAN-COMFOR_Cinematic_Technology_Reveal_veo3_payload.json`         |
| S02 | Refined Scientific Product Sequence | low    | `S02_FT26-NAN-COMFOR_Refined_Scientific_Product_Sequence_veo3_payload.json` |
| S03 | Innovation and Nutrition Reveal     | medium | `S03_FT26-NAN-COMFOR_Innovation_and_Nutrition_Reveal_veo3_payload.json`     |
| S04 | Poetic Molecular Choreography       | low    | `S04_FT26-NAN-COMFOR_Poetic_Molecular_Choreography_veo3_payload.json`       |
| S05 | High-Impact Scientific Emergence    | high   | `S05_FT26-NAN-COMFOR_High-Impact_Scientific_Emergence_veo3_payload.json`    |

**Batch master:** `BATCH_A_ALL_SCENES_veo3_payload.json` (42 KB — todas as 5 cenas)

**Modelo de geração:** `veo3-1-first-last-frame-to-video` (eachlabs.ai)

> Veo 3 Highest Quality NÃO suporta first+last frame. Usar exclusivamente o modelo acima.

## Status — Atualizado 2026-08-06

- **Input:** INPUT_RECEIVED ✅
- **Frames confirmados:** FRAME-1 (2.9MB) + FRAME-2 (3.3MB) ✅
- **Specs técnicas:** CONFIRMED ✅
- **Prompt Package:** GATE_6_READY — 5 variações compiladas ✅
- **Produção:** AGUARDANDO APROVAÇÃO GATE 6
- **Aprovação:** NOT_SUBMITTED
- **Legal:** PENDING ⚠️ — claim a confirmar antes do Gate 10
- **Técnico:** SPECS_CONFIRMED ✅

## Bloqueios

| Blocker                    | Severidade | Ação Requerida                                                              |
| -------------------------- | ---------- | --------------------------------------------------------------------------- |
| LEGAL — Claim não aprovado | HIGH       | Confirmar "Marca Líder da Categoria" com compliance Nestlé antes da entrega |
| LEGAL — Disclaimer ausente | MEDIUM     | Definir se aplicável                                                        |
| TÉCNICO — Upscaling        | LOW        | Topaz Video Upscaler: 1080p → 1792×1536 em post-produção                    |

## Gates

| Gate                        | Status                                      |
| --------------------------- | ------------------------------------------- |
| Gate 1 — Asset audit        | DONE ✅                                     |
| Gate 2 — Briefing alignment | PARTIAL ✅                                  |
| Gate 3 — Script             | DONE ✅                                     |
| Gate 4 — Scene descriptions | DONE ✅                                     |
| Gate 5 — Keyframe prompts   | DONE ✅                                     |
| Gate 6 — JSON prompt        | **READY — aguardando aprovação do usuário** |
| Gate 7 — Geração            | NÃO INICIADO                                |
| Gate 8 — QA                 | NÃO INICIADO                                |
| Gate 9 — Tracker            | NÃO INICIADO                                |
| Gate 10 — Delivery          | BLOCKED — legal pending                     |

## Checklist

- [x] Material copiado para `01_INPUT`
- [x] Frames confirmados (FRAME-1 + FRAME-2)
- [x] Specs técnicas definidas
- [x] 5 variações de cena com prompts JSON compilados em `04_MASTER/`
- [ ] Gate 6: Aprovação do usuário → despachar geração
- [ ] Gate 7: Geração Veo 3.1 concluída
- [ ] Gate 8: QA aprovado
- [ ] Gate 9: Tracker atualizado
- [ ] Gate 10: Claim legal confirmado → entrega final
