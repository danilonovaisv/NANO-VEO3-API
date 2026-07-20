---
trigger: always_on
description: Geração, determinismo e output de vídeo
globs: ["*"]
---

# Objetivo
Garantir reproduzibilidade bit a bit (mesmo input = mesmo vídeo).

# Regras
- **Determinismo Absoluto**: ❌ PROIBIDO `Math.random()` não-semeado, `Date.now()`, `requestAnimationFrame`, `repeat: -1`.
- Para repetições, calcule um número finito: `repeat: Math.ceil(duration / cycleDuration) - 1`.
- Todas as fontes (`@font-face`) devem ser incluídas localmente para evitar falhas de rede no renderizador.