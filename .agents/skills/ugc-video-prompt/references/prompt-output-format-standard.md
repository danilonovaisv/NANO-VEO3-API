# PROMPT-APP — Formato de Saída Padrão (Cognitive Schema)

Todo prompt criado ou editado no PROMPT-APP **deve obrigatoriamente** seguir este formato cognitivo.
Este é o contrato de estrutura que garante que os prompts sejam processáveis pela engine do app
(Dexie.js schema → `TemplatePayload`) e otimizados para outros LLMs.

---

## Template Canônico

```markdown
# ROLE: **[Título do papel/persona da IA]**

**Sua Identidade:**
[Descrição completa da persona que a IA deve adotar — inclui domínio de expertise,
ecossistema de operação, missão principal e ferramentas disponíveis]

## 1. CONTEXT & TASK

- **Alvo / Escopo (User Input):** {{user_input}}
- **Parâmetros Selecionados:** {{menu_selections}}

[Descrição das tarefas que a IA deve executar, numeradas ou em bullet points.
Sempre em ordem lógica de execução.]

1. [Tarefa 1]
2. [Tarefa 2]
3. [Tarefa N]

## 2. DYNAMIC PARAMETERS

- **Tom**: [Técnico | Emocional | Inspirador | Descontraído | Formal | Criativo]
- **Público**: [Desenvolvedores | Consumidores | Empreendedores | Estudantes | etc.]
- **Estilo**: [Conciso | Detalhado | Narrativo | Estruturado | Conversacional]
- **objetivo_principal**: [uma frase que descreve o objetivo central deste prompt]
- Inputs:
  - [Input 1 — tipo e descrição]
  - [Input 2 — tipo e descrição]
  - [Input N]
- Output:
  - [Output 1 — formato e conteúdo esperado]
  - [Output 2 — formato e conteúdo esperado]
  - [Output N]
- **prompt_input**: |
  [Aqui vai o corpo completo do prompt — o texto que será enviado ao LLM.
  Pode incluir system role expandido, regras detalhadas, exemplos few-shot,
  estrutura de resposta esperada, etc.]

## 3. RULES & CONSTRAINTS

- [Regra 1 — sempre específica e acionável]
- [Regra 2 — inclui o "por quê" quando não é óbvio]
- [Regra N]
- Após executar, gere o output **EXATAMENTE** nesta estrutura: [estrutura esperada]

## 5. OUTPUT FORMAT

- **Format**: [markdown | json | text | code | image]
- **Language**: [pt-BR | en-US | es-ES]
- **Required fields**: [campo1, campo2, campo3]
```

---

## Campos Obrigatórios vs. Opcionais

| Campo                           | Obrigatório | Tipo TypeScript    | Notas                        |
| ------------------------------- | ----------- | ------------------ | ---------------------------- |
| `system_role` (de `# ROLE:`)    | ✅          | `string`           | Persona da IA                |
| `task` (de `## 1.`)             | ✅          | `string`           | Tarefa principal             |
| `context` (de `## 1.` + inputs) | ✅          | `string`           | Contexto de execução         |
| `constraints` (de `## 3.`)      | ✅          | `string[]`         | Array de restrições          |
| `negative_prompt`               | ✅          | `string[]`         | O que a IA deve evitar       |
| `output_schema` (de `## 5.`)    | ✅          | `OutputSchemaDTO`  | Format + required fields     |
| `menus`                         | ✅          | `MenuDefinition[]` | Menus de contexto vinculados |
| `few_shot_examples`             | Opcional    | `FewShotExample[]` | Exemplos input→output        |

---

## Seção de Numeração — Por que não há `## 4.`?

O schema intencionalmente pula de `## 3. RULES & CONSTRAINTS` para `## 5. OUTPUT FORMAT`.
A seção `## 4.` é reservada para **few-shot examples** quando necessário:

```markdown
## 4. FEW-SHOT EXAMPLES (opcional)

### Exemplo 1

**Input:**
[exemplo de entrada do usuário]

**Output esperado:**
[exemplo de saída ideal]

---

### Exemplo 2

[repete o padrão]
```

Se não houver exemplos, omita `## 4.` completamente — não use "N/A" nem deixe vazio.

---

## Parâmetros Dinâmicos (DYNAMIC PARAMETERS) — Guia de Valores

### Tom

| Valor                 | Quando usar                                  |
| --------------------- | -------------------------------------------- |
| `Técnico (Detalhado)` | Público tech, documentação, código           |
| `Técnico (Conciso)`   | Engenheiros experientes, quick reference     |
| `Emocional`           | Marketing, storytelling, campanhas           |
| `Inspirador`          | Conteúdo motivacional, branding, missão      |
| `Descontraído`        | Social media, comunidades, tutoriais casuais |
| `Formal`              | Jurídico, corporativo, B2B enterprise        |

### Público

Seja específico: não apenas "desenvolvedores" mas "Desenvolvedores Full Stack com 3+ anos de experiência em React".

### Estilo

| Valor         | Impacto no output                        |
| ------------- | ---------------------------------------- |
| `Conciso`     | Respostas curtas e diretas, sem floreios |
| `Detalhado`   | Explicações completas com contexto       |
| `Estruturado` | Uso de headers, listas, tabelas          |
| `Narrativo`   | Texto corrido, mais humanizado           |

---

## Exemplo Completo — Prompt de Auditoria de Código

```markdown
# ROLE: **Agente Auditor e Engenheiro de Software Sênior**

**Sua Identidade:**
Você é um Agente Auditor e Engenheiro de Software Sênior (Frontend, UX e Performance)
operando no ecossistema Google Antigravity. Sua missão é dupla: auditar ativamente o
código-fonte do projeto PROMPT-APP e aplicar as correções e melhorias necessárias
diretamente nos arquivos do projeto.

**Suas Ferramentas:**
UTILIZE SUAS FERRAMENTAS DE LEITURA E ESCRITA DE ARQUIVOS, além da busca no código,
para inspecionar, avaliar e refatorar a base de código com base nas entradas fornecidas.

## 1. CONTEXT & TASK

- **Alvo da Auditoria (User Input):** {{user_input}}
- **Eixos de Avaliação Selecionados:** {{menu_selections}}

1. Inspecionar o código-fonte indicado e avaliar os Eixos Selecionados
2. Gerar relatório de auditoria cruzando o código com melhores práticas
3. IMPLEMENTAR as correções diretamente no código do projeto

## 2. DYNAMIC PARAMETERS

- **Tom**: Técnico (Detalhado)
- **Público**: Desenvolvedores (Full Stack)
- **Estilo**: Estruturado
- **objetivo_principal**: Auditar e corrigir código do PROMPT-APP com foco em A11y + Performance
- Inputs:
  - Alvo da auditoria (componente, página ou serviço específico)
  - Eixos de avaliação selecionados via menu de contexto
- Output:
  - Relatório de auditoria em markdown com seções padronizadas
  - Correções aplicadas diretamente nos arquivos do projeto
  - Changelog de arquivos modificados
- **prompt_input**: |
  [corpo completo do prompt de auditoria aqui]

## 3. RULES & CONSTRAINTS

- Ação Direta: sempre que encontrar problema crítico ou médio/alto, aplique a correção no código
- Prioridades fixas: Acessibilidade → Performance → Confiabilidade → Qualidade Editorial → Motion
- Regras de Motion: aceitar apenas opacity, blur, translateY (máx 18px)
- Mobile-First: garantir áreas de toque mínimo 44×44px
- Nunca basear análise em suposições — inspecionar arquivos reais

## 5. OUTPUT FORMAT

- **Format**: markdown
- **Language**: pt-BR
- **Required fields**: audit_request_summary, findings, fix_plan, validation_checklist, final_decision
```

---

## Integração com o PROMPT-APP (TemplatePayload TypeScript)

Ao salvar no IndexedDB, os campos do template mapeiam para:

```typescript
const promptPayload: TemplatePayload = {
  title: 'Nome do prompt',
  system_role: '// conteúdo de # ROLE:',
  task: '// conteúdo de ## 1. CONTEXT & TASK',
  context: '// contexto extraído dos inputs',
  constraints: [
    /* array de ## 3. RULES & CONSTRAINTS */
  ],
  negative_prompt: [
    /* itens negativos extraídos das constraints */
  ],
  output_schema: {
    format: 'markdown', // de ## 5. OUTPUT FORMAT > Format
    language: 'pt-BR',
    required_fields: ['campo1', 'campo2'],
  },
  menus: [
    /* MenuDefinition[] de DYNAMIC PARAMETERS */
  ],
  few_shot_examples: [
    /* FewShotExample[] de ## 4. se existir */
  ],
  status: 'active',
  schema_version: '1.0',
  language: 'pt-BR',
};
```
