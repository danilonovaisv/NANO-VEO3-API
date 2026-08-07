# DISPATCH GUIDE — Família Supreme (FT26-LED01_CURVO-002)

> **Placement:** LED 1 — Frente / Curvo (1792×1536px, 60fps)  
> **Brand:** Nestlé NAN SUPREME  
> **Estrutura:** 1 ÚNICA CENA — Interpolação do FRAME-1 (inicial) para o FRAME-2 (final)  
> **Model:** `veo3-1-first-last-frame-to-video` (via `eachlabs.ai`)  
> **Status:** GATE 6 READY — Prompt package compilado

---

## 🚀 Como Executar a Geração

### 1. Pré-requisitos

Certifique-se de que a variável de ambiente `EACHLABS_API_KEY` está configurada em `.env` na raiz do projeto.

### 2. Validação Determinística de Payload

Antes de disparar a geração, valide a integridade dos schemas:

```bash
npx tsx .agents/skills/veo3-api-integration/scripts/test_payload.ts
```

### 3. Execução da Cena S01

```bash
npx tsx NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/_VIDEOS/02_FAMILIA_SUPREME/04_MASTER/generate_familia_supreme.ts S01
```

---

## 📁 Onde os Resultados são Salvos

- **Vídeo Raw (.mp4):** `NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/06_PRODUCTION/06_GENERATIONS_RAW/S01_FT26-NAN-SUPREME_<timestamp>_raw.mp4`
- **Metadados QA (.json):** `NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/06_PRODUCTION/06_GENERATIONS_RAW/S01_FT26-NAN-SUPREME_<timestamp>_meta.json`

---

## ⚙️ Pós-Produção Obrigatória

1. **Upscaling:** 1080p → 1792×1536 via Topaz Video Upscaler.
2. **Retiming:** Converter para 60fps.
3. **Exportação Final:** H.264 MP4 sem áudio em `10_FINAL_EXPORTS/`.
