# NANO-VEO3-API: Project Architecture Context

## Contexto Geral
O **NANO-VEO3-API** é uma aplicação Next.js 15 (App Router) construída em TypeScript que integra a API de geração de vídeo de última geração do Google, o **Google Veo 3**, através do SDK oficial `@google/genai`.

## Mapeamento de Arquitetura

### 1. Rotas de API (`app/api/`)
* **`/app/api/veo/generate/route.ts`**: Recebe requisições HTTP POST com parâmetros (prompt, aspect ratio, duração, semente, etc.) e dispara a criação do vídeo no Veo 3 via `@google/genai`. Retorna o ID da operação assíncrona.
* **`/app/api/veo/operation/route.ts`**: Recebe o ID da operação via HTTP GET/POST e realiza a consulta (polling) do status até que o vídeo esteja pronto (`DONE`).
* **`/app/api/veo/download/route.ts`**: Fornece o stream ou URL de download seguro do MP4 gerado.
* **`/app/api/gemini/route.ts`**: Interface com modelos Gemini para aprimoramento e expansão de prompts de texto.
* **`/app/api/imagen/route.ts`**: Geração de imagens estáticas de suporte/referência visual.

### 2. Frontend & UI Componentes (`app/`, `components/`)
* Componente principal em `app/page.tsx`.
* Layout principal em `app/layout.tsx`.
* Estilização em `app/globals.css` via Tailwind CSS v4.
* Componentes utilitários UI em `components/` e utilitários em `lib/utils.ts`.

### 3. Integração com SDK Google GenAI
* Importação principal: `import { GoogleGenAI } from '@google/genai'`
* A API Veo 3 utiliza operações assíncronas de longa duração. Os agentes devem garantir que o status da operação seja auditado corretamente antes do download dos bytes do vídeo.
