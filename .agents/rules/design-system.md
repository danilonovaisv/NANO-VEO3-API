---
trigger: always_on
---

# Objetivo

Garantir a consistência visual em vídeos gerados.

---
description: Regras de tipografia, cores e design system
globs: ["*.css", "*.html", "design.md"]
---

# Regras

- **Cores**: Siga a proporção 60-30-10 (60% fundo/canvas, 30% estrutural, 10% acento).
- **Tipografia**: O tamanho mínimo da fonte para fontes proporcionais é 96px; para monospace é 64-72px.
- Use `window.__hyperframes.fitTextFontSize()` para evitar overflow.
- A paleta deve ser lida de `capture/extracted/tokens.json` ou `design.md`.

# Anti-patterns

- ❌ Adicionar texto flutuando em espaço vazio (ancore nas bordas ou centralize de forma robusta).
- ❌ Fundo preto puro `#000` (Use `#0a0a0a` ou tintas escuras).