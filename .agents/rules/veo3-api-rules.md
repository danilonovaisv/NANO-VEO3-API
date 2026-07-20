---
trigger: always_on
description: Regras e padrões de consumo da API Google Veo 3 e SDK @google/genai
globs: ["app/api/veo/**/*", "lib/**/*"]
---

# Regras de Integração com Google Veo 3 API

> **Objetivo**: Padronizar requisições de geração de vídeo, controle de operações longas e tratamento de erros do Veo 3.

---

## 1. Inicialização do SDK `@google/genai`
- Utilize a classe `GoogleGenAI` importada de `@google/genai`.
- Certifique-se de que a variável de ambiente `GEMINI_API_KEY` esteja presente antes de invocar a instância.

---

## 2. Ciclo de Vida de Geração de Vídeo
1. **Despacho de Requisição**: A requisição de geração (`generateVideos`) inicia uma operação de longa duração.
2. **Polling de Operação**: Consulte a rota `/api/veo/operation` até que a propriedade `done` da operação seja `true`.
3. **Download e Streaming**: Ao finalizar (`done: true`), utilize a URL de vídeo ou os bytes retornado de forma segura.

---

## 3. Resiliência e Timeouts
- Defina limites razoáveis de tempo limite (timeout) para o polling de operação (ex: limite de 10 minutos).
- Se a operação retornar um objeto `error`, trate a mensagem e repasse um erro estruturado ao cliente HTTP sem expor detalhes internos de infraestrutura da Google Cloud.
