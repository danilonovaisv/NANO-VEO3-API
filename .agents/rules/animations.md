---
trigger: always_on
description: Padrões de animação e transições de UI com Tailwind CSS v4 no NANO-VEO3-API
globs: ["app/**/*.tsx", "components/**/*.tsx", "app/globals.css"]
---

# Objetivo

Garantir micro-interações fluidas na interface do NANO-VEO3-API com Tailwind CSS v4 e CSS modern standards.

# Regras

- **Propriedades Aceleradas**: Animações de UI devem utilizar propriedades otimizadas por GPU (`transform`, `opacity`, `filter`).
- **Transições Suaves**: Utilize utilitários de transição do Tailwind (`transition-all`, `duration-200`, `ease-in-out`).
- **Sem 3D Invasivo**: Evite efeitos de rotação 3D de câmera que prejudiquem a usabilidade da grade de vídeos.
