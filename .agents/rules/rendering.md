---
trigger: always_on
description: Renderização de mídias e comportamento de players no NANO-VEO3-API
globs: ["app/**/*", "components/**/*"]
---

# Objetivo
Garantir reproduzibilidade, alta performance e exibição consistente de vídeos do Veo 3 no cliente.

# Regras
- **Player de Vídeo**: Utilize `react-player` encapsulado com verificações de hidratação cliente (SSR safe).
- **Sem Animação 3D de Câmera**: Renderize mídias estritamente em um layout de grid plano responsivo sem simulação de câmera física 3D na UI.
- **Loading & Skeleton States**: Exiba estados visuais de carregamento enquanto as chamadas assíncronas do Veo 3 estiverem em processamento (`operation.done === false`).