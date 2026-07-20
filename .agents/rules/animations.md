---
trigger: always_on
description: Padrões e limites de animação visual
globs: ["*.js", "*.html"]
---

# Objetivo

Garantir animações fluidas e dentro da linguagem de motion do HyperFrames.

# Regras

- Use os Spring Intents definidos: `entry` (back.out), `gentle` (power2.inOut), `snappy`, `heavy`, `slam`.
- Animações de CSS devem usar propriedades aceleradas por GPU (`transform`, `opacity`, `filter`).
- ❌ Nunca anime `width`, `height`, `top`, `left`.
- Efeitos contínuos (idle breathing) devem usar `onUpdate` multiplicativo ou funções matemáticas (`Math.sin`), atreladas à timeline.
