---
name: veo3-api-integration
description: Procedimentos procedimentais para criação de payloads, envio de requisições e polling de operações da API do Google Veo 3 via @google/genai.
---

# Veo 3 API Integration Skill

> **Objetivo**: Fornecer aos agentes a lógica operacional para interagir com os endpoints da API do Google Veo 3 (`@google/genai`).

---

## 🚀 Como Usar

### 1. Parâmetros Obrigatórios para Payload Veo 3
- `prompt`: String descrevendo a cena de vídeo desejada.
- `aspectRatio`: `"16:9"` | `"9:16"` | `"1:1"` (padrão: `"16:9"`).
- `durationSeconds`: Número (ex: `5` ou `10`).

### 2. Ciclo de Execução Assíncrona (Long Running Operation)
1. Disparar chamada de geração enviando o payload para `POST /api/veo/generate`.
2. A resposta conterá o `operationName` ou `operationId`.
3. Iniciar polling em `GET /api/veo/operation?id=<operationName>`.
4. Quando `done === true`, coletar o link de download ou bytes do vídeo retornado.

### 3. Validação Prévia de Payload
Sempre execute o script determinístico de validação de payload antes de enviar uma requisição em ambiente de testes:
```bash
npx tsx .agents/skills/veo3-api-integration/scripts/test_payload.ts
```

---

## 🚨 Restrições Estritas
- Nunca passe API keys em query strings ou no corpo do payload público.
- Sempre verifique a presença da variável de ambiente `GEMINI_API_KEY`.
