---
name: media-player-integration
description: Boas práticas e padrões para integração de players de vídeo (react-player) e áreas de drop de arquivos (react-dropzone) no React 19.
---

# Media Player Integration Skill

> **Objetivo**: Orientar a criação de componentes de visualização de vídeo e upload mantendo o padrão visual e compatibilidade com SSR no Next.js.

---

## 🛠️ Diretrizes de Integração

1. **Suporte SSR / Dynamic Import**:
   - Componentes `ReactPlayer` devem ser carregados dinamicamente com `{ ssr: false }` ou renderizados apenas após montagem no cliente (`useEffect` / `mounted` state) para evitar erros de hidratação no Next.js App Router.

2. **Grid Responsivo Plano**:
   - Mantenha os players organizados em containers CSS Grid (`grid grid-cols-1 md:grid-cols-2 gap-4`).
   - Não aplique simulação de física de câmera 3D.

3. **Fallback & Loading States**:
   - Exiba um indicador de progresso (spinner ou skeleton) enquanto a operação do Veo 3 estiver em andamento (`status !== 'DONE'`).
