---
trigger: always_on
description: Arquitetura de arquivos e sub-composições
globs: ["*"]
---

# Objetivo

Manter a modularidade através de sub-composições.

# Regras

- `index.html` deve ser enxuto: declara slots, monta áudio e registra a timeline raiz.
- Animações de cena vivem dentro de `compositions/<nome>.html`.
- IDs de slots no host devem usar `el-` ou `slot-`.
- O `data-composition-id` da raiz da sub-composição deve corresponder exatamente ao ID do slot no host.
