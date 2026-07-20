---
trigger: always_on
description: Padrões de geração e orquestração de vídeo via Google Veo 3 API
globs: ["app/api/veo/**/*", "lib/**/*"]
---

# Objetivo

Garantir chamadas resilientes e tratadas na geração de vídeos com o Google Veo 3 (`@google/genai`).

# Regras

- **Geração Assíncrona**: Chamadas para geração de vídeo iniciam operações longas que requerem polling de status (`/api/veo/operation`).
- **Validação de Inputs**: Prompts e configurações (aspectRatio, durationSeconds) devem ser validados via Zod Schema.
- **Grids de Mídia**: Previews e exibição de vídeos gerados devem utilizar players responsivos em grid plano.
