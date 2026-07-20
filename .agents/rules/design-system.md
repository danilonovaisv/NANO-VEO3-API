---
trigger: always_on
description: Regras de design system, tipografia e cores no NANO-VEO3-API
globs: ["app/**/*.tsx", "components/**/*.tsx", "app/globals.css"]
---

# Objetivo

Garantir a consistência visual da interface e mídias no NANO-VEO3-API.

# Regras

- **Cores**: Proporção 60-30-10 (60% canvas/fundo `#040013`, 30% estrutural, 10% acento `#0048ff` / `#4fe6ff`).
- **Tipografia**: Fontes legíveis com escalonamento fluido (`clamp()`).
- **Layouts**: Layouts em grids planos responsivos Tailwind CSS sem distorções de proporção.
- **Integridade Visual**: Logos de marcas devem se manter intactos e sem deformações.