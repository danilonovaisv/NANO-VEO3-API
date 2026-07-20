# Workflow: Geração de Ativos de Vídeo (`generate-video-assets`)

Este workflow é acionado para automatizar a geração de ativos de vídeo via a API do **Google Veo 3** (`@google/genai`) integrada no NANO-VEO3-API.

## Etapas de Execução

### 1. Verificação de Inputs e Prompts
- Escanear `public/` ou payloads recebidos na API (`app/api/veo/generate`).
- Validar se o prompt e os parâmetros de vídeo estão em conformidade com o Zod Schema (`veo3-api-integration`).

### 2. Disparo da Requisição Veo 3 API
- Invocar o endpoint da API ou chamar a SDK `@google/genai`:
```typescript
const response = await ai.models.generateVideos({
  model: 'veo-3.0-generate-001',
  prompt: promptText,
  config: {
    aspectRatio: '16:9',
    personGeneration: 'ALLOW_ADULT',
  },
});
```

### 3. Polling de Operação (`app/api/veo/operation`)
- Realizar polling no endpoint de operação até a conclusão da geração do vídeo.

### 4. Armazenamento e Exibição de Mídia
- Salvar a mídia gerada ou redirecionar o stream via `app/api/veo/download`.
- Renderizar a preview usando o player `react-player` no frontend.
