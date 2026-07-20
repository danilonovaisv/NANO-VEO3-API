---
trigger: always_on
description: Padrões de geração e orquestração de vídeo
globs: ["index.html", "compositions/*.html"]
---

# Objetivo

Garantir que a compilação do vídeo não falhe no `@hyperframes/producer`.

# Regras

- Vídeos externos (`data-composition-src`) devem ser encapsulados em `<div class="clip">`.
- O áudio (VO, trilha) deve residir no `index.html` (host) no `data-track-index` mais alto (ex: 10) para sobreviver a cortes de cena.
- Cenas visuais sequenciais devem estar no mesmo `data-track-index` (ex: 1).
