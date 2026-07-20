---
trigger: always_on
description: Comandos para diagnóstico e resolução de problemas
globs: ["*"]
---

# Objetivo

Fluxo de debugging padrão do HyperFrames.

# Regras

- Falhas de compilação: Execute `npx hyperframes lint` e `npx hyperframes validate`.
- Verificação de frames específicos: Execute `npx hyperframes snapshot --at 1,2.5,5`.
- Se o servidor de preview falhar por porta ocupada: `npx hyperframes preview --port 4567`.
