---
trigger: always_on
description: Security & Secret Protection Guardrails for NANO-VEO3-API
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.json"]
---

# SECURITY.MD - Security & Secret Protection Guardrails

> **Objetivo**: Proteger credenciais da API Google GenAI/Veo 3, env vars e impor execução segura em ambiente sandbox.

---

## 🚫 1. FORBIDDEN ACTIONS (Cấm / Proibições)

1. **Hardcode de Credenciais & API Keys**:
   - NUNCA insira `GEMINI_API_KEY`, senhas ou tokens diretamente no código ou scripts de teste.
   - Sempre consuma via `process.env.GEMINI_API_KEY`.
2. **Exposição em Logs e Console**:
   - NUNCA imprima valores inteiros de API keys ou URLs de assinatura de mídia privada em `console.log` ou logs de exceção.
3. **Commit de Arquivos Sensíveis**:
   - Garanta que `.env`, `.env.local` e arquivos de chaves estejam listados no `.gitignore`.
4. **Comandos Destrutivos Sem Validação**:
   - Quaisquer comandos no terminal que executem limpeza de repositório (`rm -rf`) ou alterações destrutivas requerem verificação previa.

---

## 🛡️ 2. CODING & API STANDARDS

1. **Sanitização de Inputs**:
   - Todo parâmetro enviado para a API do Veo 3 deve ser higienizado contra injeções de script ou caracteres de controle maliciosos.
2. **Execução de Comandos**:
   - Agentes e scripts automatizados devem executar comandos terminal dentro de contêineres sandbox ou com flags sem privilégios de root.

---

## 🚨 3. INCIDENT PROTOCOL

Se uma API key ou secret for detectado em arquivos commitados ou em logs:

1. **DỪNG / PARAR**: Interromper a execução imediatamente.
2. **REPORTAR**: Notificar a necessidade de revogação/rotação imediata da `GEMINI_API_KEY`.
