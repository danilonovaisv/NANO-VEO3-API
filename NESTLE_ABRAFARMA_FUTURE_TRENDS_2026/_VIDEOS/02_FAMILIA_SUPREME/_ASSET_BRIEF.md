# FT26-LED01_CURVO-002 — Família Supreme

## Identificação

- **Placement:** LED 1 — Frente / Curvo
- **Código:** LED01_CURVO
- **Asset de origem:** 2
- **Responsável:** Tainá Gonçalves
- **Complexidade:** B_MOTION_KV
- **Prioridade:** HIGH
- **Prazo:** 2026-08-10

## Direcional

Animação dos Mockups em 1 ÚNICA CENA conectando o FRAME-1 (inicial) ao FRAME-2 (final) com a frase "Marca mais Inovadora da Categoria"

## Comentários de Marketing

Confirmar frase sobre "Marca mais Inovadora da Categoria" — **PENDENTE APROVAÇÃO LEGAL / MARKETING**

## Materiais

- **Source link:** PENDENTE
- **Material link:** https://www.dropbox.com/request/4cud7qenqzk7mi9b2hc1
- **Direcional:** Enviado
- **KV:** N/A (frames são os KVs)
- **Mockup:** N/A
- **Campanha:** N/A
- **Vídeo:** N/A

## Especificações Técnicas — LED 1 Curvo (CONFIRMADAS)

- **Resolução:** 1792 × 1536 px — P1.9 7x6 Mod
- **FPS:** 60
- **Codec:** H.264
- **Duração:** 5s (1 cena única de interpolação first+last frame)
- **Áudio:** Nenhum
- **Safe area:** 10% em todas as bordas
- **Loop:** Sim — frame final resolve para FRAME-2
- **Claim:** PENDENTE CONFIRMAÇÃO LEGAL — "Marca mais Inovadora da Categoria"
- **Disclaimer:** PENDENTE

## Frames de Referência (CONFIRMADOS)

| Frame             | Arquivo                                                                 | Tamanho | Status    |
| ----------------- | ----------------------------------------------------------------------- | ------- | --------- |
| FRAME-1 (inicial) | `01_INPUT/FRAME-1_FAMILIA_SUPREME_FT26-LED01_CURVO-001_1792×1536px.png` | 1.35 MB | CONFIRMED |
| FRAME-2 (final)   | `01_INPUT/FRAME-2_FAMILIA_SUPREME_FT26-LED01_CURVO-001_1792×1536px.png` | 2.22 MB | CONFIRMED |
| HERO MOCKUP       | `01_INPUT/02_FAMILIA_SUPREME_FT26-LED01_CURVO-001_1792×1536px.png`      | 2.45 MB | CONFIRMED |

## Prompt JSON Gerado — `04_MASTER/` (GATE 6 READY)

| ID  | Título                              | Motion | JSON                                                                 |
| --- | ----------------------------------- | ------ | -------------------------------------------------------------------- |
| S01 | Cinematic Supreme Innovation Reveal | medium | `S01_FT26-NAN-SUPREME_Cinematic_Innovation_Reveal_veo3_payload.json` |

**Master Payload:** `BATCH_A_ALL_SCENES_veo3_payload.json`

**Modelo de geração:** `veo3-1-first-last-frame-to-video` (eachlabs.ai)

> Veo 3 Highest Quality NÃO suporta first+last frame. Usar exclusivamente o modelo acima.

## Status — Atualizado 2026-08-06

- **Input:** INPUT_RECEIVED ✅
- **Frames confirmados:** FRAME-1 (1.35MB) + FRAME-2 (2.22MB) ✅
- **Specs técnicas:** CONFIRMED ✅
- **Prompt Package:** GATE_6_READY — 1 cena única compilada ✅
- **Produção:** AGUARDANDO APROVAÇÃO GATE 6
- **Aprovação:** NOT_SUBMITTED
- **Legal:** PENDING ⚠️ — claim a confirmar antes do Gate 10
- **Técnico:** SPECS_CONFIRMED ✅

## Bloqueios

| Blocker                    | Severidade | Ação Requerida                                                                       |
| -------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| LEGAL — Claim não aprovado | HIGH       | Confirmar "Marca mais Inovadora da Categoria" com compliance Nestlé antes da entrega |
| LEGAL — Disclaimer ausente | MEDIUM     | Definir se aplicável                                                                 |
| TÉCNICO — Upscaling        | LOW        | Topaz Video Upscaler: 1080p → 1792×1536 em post-produção                             |

## Gates

| Gate                        | Status                                      |
| --------------------------- | ------------------------------------------- |
| Gate 1 — Asset audit        | DONE ✅                                     |
| Gate 2 — Briefing alignment | DONE ✅                                     |
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
- [x] Prompt JSON da cena única compilado em `04_MASTER/`
- [ ] Gate 6: Aprovação do usuário → despachar geração
- [ ] Gate 7: Geração Veo 3.1 concluída
- [ ] Gate 8: QA aprovado
- [ ] Gate 9: Tracker atualizado
- [ ] Gate 10: Claim legal confirmado → entrega final
