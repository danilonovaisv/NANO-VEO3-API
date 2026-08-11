# Dispatch Guide — FT26-LED01-NAN-COMFOR-001 — Batch A

**Gerado em:** 2026-08-06 | **Gate atual:** 6 — aguardando aprovacao do usuario

---

## STEP 1 — Validar frames antes do despacho

Confirmar existencia e tamanho dos frames em 01_INPUT/:

- FRAME-1 esperado: ~2.9 MB
- FRAME-2 esperado: ~3.3 MB

---

## STEP 2 — Escolha a cena

| ID  | Titulo                              | Energia | Recomendacao                                       |
| --- | ----------------------------------- | ------- | -------------------------------------------------- |
| S01 | Cinematic Technology Reveal         | medium  | Equilibrio impacto + elegancia. Testar primeiro.   |
| S02 | Refined Scientific Product Sequence | low     | Contido, sofisticado, hexagonos + DNA curves.      |
| S03 | Innovation and Nutrition Reveal     | medium  | Wing sweep muito proxima, boa continuidade.        |
| S04 | Poetic Molecular Choreography       | low     | Mais lento, poetico, glow dourado-magenta no selo. |
| S05 | High-Impact Scientific Emergence    | high    | Face Punch maximo. Maior impacto visual.           |

---

## STEP 3 — Despacho via API eachlabs.ai

Modelo: veo3-1-first-last-frame-to-video (versao 0.0.1)
Endpoint: POST https://api.eachlabs.ai/v1/prediction

Campos obrigatorios:

- model: veo3-1-first-last-frame-to-video
- input.first_frame_url: URL acessivel do FRAME-1
- input.last_frame_url: URL acessivel do FRAME-2
- input.prompt: conteudo do campo video_generation_prompt no JSON da cena
- input.duration: 8
- input.resolution: 1080p
- input.generate_audio: false
- input.aspect_ratio: 16:9

Header obrigatorio:

- X-API-Key: valor de EACHLABS_API_KEY (nunca expor em logs ou commits)

---

## STEP 4 — Alternativa: via SDK @google/genai (Next.js API local)

Endpoint local: POST http://localhost:3000/api/veo/generate
Payload: conteudo dos JSONs em 04_MASTER/
Polling: GET http://localhost:3000/api/veo/operation?id=[operationId]
Download: GET http://localhost:3000/api/veo/download

---

## STEP 5 — Post-producao (apos geracao concluida)

1. Baixar raw MP4 (1080p, 16:9) para 06_PRODUCTION/06_GENERATIONS_RAW/
2. Nomear: [SCENE_ID]_[TIMESTAMP]_raw.mp4 — NUNCA sobrescrever geracao anterior
3. QA visual: checar todos os itens da qa_checklist dentro do JSON da cena
4. Upscale: Topaz Video Upscaler — 1080p para 1792x1536
5. Retime: 60fps
6. Codec: H.264 MP4, sem audio
7. Export para: 06_PRODUCTION/10_FINAL_EXPORTS/
8. Aguardar Gate 10: confirmacao legal do claim antes da entrega ao cliente

---

## ATENCAO — Gate 10 bloqueado ate aprovacao legal

A entrega final esta BLOQUEADA ate:

- Confirmacao da frase Marca Lider da Categoria com compliance Nestlé
- Definicao do disclaimer se aplicavel

Responsavel: Taína Gonçalves
O badge visivel em FRAME-2 nao pode ser alterado sem aprovacao.

---

## Localizacao dos JSONs

04_MASTER/S01_FT26-NAN-COMFOR_Cinematic_Technology_Reveal_veo3_payload.json
04_MASTER/S02_FT26-NAN-COMFOR_Refined_Scientific_Product_Sequence_veo3_payload.json
04_MASTER/S03_FT26-NAN-COMFOR_Innovation_and_Nutrition_Reveal_veo3_payload.json
04_MASTER/S04_FT26-NAN-COMFOR_Poetic_Molecular_Choreography_veo3_payload.json
04_MASTER/S05_FT26-NAN-COMFOR_High-Impact_Scientific_Emergence_veo3_payload.json
04_MASTER/BATCH_A_ALL_SCENES_veo3_payload.json
