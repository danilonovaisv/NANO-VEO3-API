---
trigger: always_on
description: Forçar execução estrita de workflows, ativação de skills e escopo de agentes.
globs: ["*"]
---

# Objetivo

Garantir conformidade total com os workflows estruturados do HyperFrames, ativação obrigatória de skills essenciais (como caveman e writing-plans) e delegação correta para os agentes específicos do squad.

# Regras

- **Pesquisa e Execução de Workflows**: Antes de iniciar qualquer alteração, criação ou validação de arquivos no projeto, consulte a pasta `.agents/workflows/` (ou `.agent/workflows/` no caso do build-video) para identificar o workflow correspondente. Siga-o de forma sequencial, executando cada passo listado.
- **Ativação de Skills**:
  - Habilidade **caveman**: Use para otimizar tokens na comunicação e saídas de log.
  - Habilidade **.agents/skills/superpower/writing-plans**: Use para orientar e planejar toda alteração estrutural no projeto.
- **Respeito ao Escopo e Persona**:
  - `@orchestrator`: Responsável por Discovery, Setup (Fase 0) e Capture (Fase 1).
  - `@hf-designer`: Responsável por Design Specs (Fase 2), Script (Fase 3) e Storyboard (Fase 4).
  - `@hf-builder`: Responsável por Build de composições HTML/CSS/GSAP (Fase 5).
  - `@hf-qa`: Responsável por Validate (Fase 6) e Render (Fase 7).
- **Gates de Qualidade**: Não pule nenhuma validação técnica (`npx hyperframes lint` ou `validate`) ou aprovação do usuário descrita nos workflows.
