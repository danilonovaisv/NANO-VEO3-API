# Decisões técnicas — hospedagem, orquestração e custo

> **Data:** 26/07/2026 · **Contexto:** respostas às 3 perguntas bloqueadoras do
> `docs/PLANO-PIPELINE-AUTOMATIZADO.md`, delegadas com os critérios "solução mais viável" (1 e 2) e
> "o mais barato" (3).
> **Status:** decidido, pendente de validação. **Nenhum código foi alterado.**

Marcas: `[CÓDIGO]` verificado no repositório · `[DOC]` documentação oficial consultada hoje ·
`[CALC]` aritmética verificável (script na §4.1) · `[REC]` recomendação.

---

## 0. Achado urgente que apareceu durante a pesquisa de preços

**Os três modelos de vídeo usados no código foram desligados há 26 dias.**

`[DOC]` Tabela oficial de deprecations (atualizada em 23/07/2026):

| Modelo no código            | Shutdown       | Substituto oficial              |
| --------------------------- | -------------- | ------------------------------- |
| `veo-3.0-generate-001`      | **30/06/2026** | `veo-3.1-generate-preview`      |
| `veo-3.0-fast-generate-001` | **30/06/2026** | `veo-3.1-fast-generate-preview` |
| `veo-2.0-generate-001`      | **30/06/2026** | `veo-3.1-generate-preview`      |

`[CÓDIGO]` Todos estão hardcoded hoje:

```
app/api/veo/generate/route.ts:24      "veo-3.0-generate-001"   (default do servidor)
app/page.tsx:28, :35                  "veo-3.0-generate-001"
components/ui/ModelSelector.tsx:21-23 os três IDs desligados
```

E há mais dois prazos se aproximando `[DOC]`:

| Modelo no código                                                           | Shutdown                    | Substituto               |
| -------------------------------------------------------------------------- | --------------------------- | ------------------------ |
| `gemini-2.5-flash-image-preview` (`gemini/generate:20`, `gemini/edit:107`) | **15/01/2026 — já passou**  | `gemini-3.1-flash-image` |
| `imagen-4.0-fast-generate-001` (`imagen/generate:14`)                      | 17/08/2026 (**em 22 dias**) | `gemini-3.1-flash-image` |

> **Implicação:** a geração de vídeo do projeto está, muito provavelmente, **quebrada em produção
> agora** — não por bug de código, mas porque o endpoint deixou de existir. Não pude confirmar com
> chamada real (não há `GEMINI_API_KEY` neste ambiente `[CÓDIGO]`), então trato como _altamente
> provável_, não como fato observado. **Verificar isto é a tarefa nº 1**, à frente de qualquer
> decisão arquitetural — não adianta desenhar pipeline sobre um endpoint morto.

A boa notícia: `[CÓDIGO]` o SDK não fixa nomes de modelo (são `string`), então a correção é troca de
identificador + ajuste de rótulos, sem upgrade de biblioteca.

---

## 1. Decisão 1 — Hospedagem: **container no Railway**

**Escolhido:** container (Docker) no **Railway**. **Descartado:** Vercel/serverless.

### Por quê

O fator decisivo não é preço, é **viabilidade técnica**: o pipeline precisa de FFmpeg e de processos
que rodam por minutos. `[CÓDIGO]` Hoje não há Dockerfile e `which ffmpeg` não encontra o binário —
ou seja, a montagem de timeline simplesmente não tem onde rodar.

Em serverless isso esbarra em três paredes ao mesmo tempo: binário nativo de ~80 MB no bundle,
limite de tempo de execução por request, e sistema de arquivos efêmero para arquivos de centenas de
MB. Dá para contornar com serviço externo de render, mas isso adiciona um fornecedor e mais custo.

Entre as plataformas de container `[DOC]`:

| Plataforma        | Custo base                                 | Observação                                               |
| ----------------- | ------------------------------------------ | -------------------------------------------------------- |
| **Railway Hobby** | **$5/mês** (inclui $5 de crédito de uso)   | Postgres em 1 clique, worker e web no mesmo projeto      |
| Render            | $7/mês por serviço **+ $7** Postgres = $14 | Mais previsível, porém o dobro                           |
| Fly.io            | ~$5/mês                                    | Mais barato em escala, mas Postgres **não é gerenciado** |
| Hetzner + Coolify | ~$5/mês                                    | Mais barato de todos, mas você opera tudo                |

**Railway vence** porque, na faixa de uso deste projeto, o serviço web + worker + Postgres cabem
dentro dos $5–10/mês, e o Postgres gerenciado sai de graça em esforço operacional — enquanto no
Render o mesmo arranjo custa $14 e no Fly.io o banco vira sua responsabilidade.

`[REC]` Manter a **UI na Vercel** (ela é ótima em Next.js e o free tier resolve) e apontar para o
backend no Railway é possível, mas só vale se a UI precisar de edge/CDN global. Para começar,
**tudo no Railway** é mais simples e igualmente barato.

**Custo de infraestrutura: ~$5–10/mês.**

---

## 2. Decisão 2 — Self-hosting / residência de dados: **não há restrição → Inngest**

O workspace não expõe nenhuma exigência de soberania de dados `[CÓDIGO]` (sem política de
compliance, sem menção a LGPD em contrato, sem VPC). Além disso, o conteúdo já trafega para a API do
Google nos EUA — impor self-hosting só ao orquestrador não traria ganho real de privacidade.

Como não há restrição e o critério é viabilidade, **mantenho o Inngest** recomendado no plano:

- **Free tier: 50.000 execuções/mês** `[DOC]` — muito acima do necessário (um vídeo de 5 cenas
  consome ~20 steps; 50k execuções ≈ 2.500 vídeos/mês).
- Retry por step, idempotência e reprocessamento parcial saem de fábrica — exatamente os requisitos
  5 e 12 do briefing.
- Dashboard de execuções incluído, o que adia a necessidade da Fase 9.

**Ressalva honesta:** o Inngest executa a função **dentro da sua infraestrutura**, herdando o limite
de tempo do host. Isso seria um problema na Vercel — mas como a Decisão 1 escolheu container, deixa
de ser. As duas decisões se sustentam mutuamente.

`[REC]` Fallback registrado: se no futuro surgir exigência de self-hosting, a troca natural é
**BullMQ + Redis** no mesmo Railway (~$5/mês a mais). A camada `providers/`/`workflows/` do plano
isola essa troca.

**Custo de orquestração: $0.**

---

## 3. Decisão 3 — O mais barato: **Veo 3.1 Lite 720p como padrão**

Você pediu o mais barato. Isso tem resposta objetiva na tabela oficial `[DOC]`:

| Modelo           | 720p        | 1080p   | 4k          |
| ---------------- | ----------- | ------- | ----------- |
| **Veo 3.1 Lite** | **$0.05/s** | $0.08/s | não suporta |
| Veo 3.1 Fast     | $0.10/s     | $0.12/s | $0.30/s     |
| Veo 3.1 Standard | $0.40/s     | $0.40/s | $0.60/s     |

Imagem `[DOC]`: Nano Banana 2 Lite **$0.0336**/imagem 1K · Nano Banana 2 $0.067 · Imagen 4 Fast $0.02
(mas este é desligado em 22 dias). Áudio nativo do Veo: **incluído no preço do vídeo**, sem custo
extra `[DOC]` — logo, TTS separado só se justifica por controle de voz.

### 3.1 Custo real por vídeo `[CALC]`

Vídeo de 40s = 5 cenas × 8s (o Veo gera clipes de 8s `[DOC]`):

| Perfil        | Vídeo  | Keyframes | **Total**  |
| ------------- | ------ | --------- | ---------- |
| **Lite 720p** | $2.00  | $0.17     | **$2.17**  |
| Lite 1080p    | $3.20  | $0.17     | $3.37      |
| Fast 720p     | $4.00  | $0.17     | $4.17      |
| Standard      | $16.00 | $0.17     | **$16.17** |

Com retentativas realistas (fator 1,3) e 2 keyframes por cena: **Lite $3.04** · Fast $5.64 ·
Standard $21.24.

**Lite custa 7,4× menos que Standard.** Em 30 vídeos/mês: **$60 contra $480** — economia de $420
(88%).

### 3.2 A estratégia que economiza mais do que escolher o modelo barato

O maior desperdício não é o preço unitário: é **iterar prompt no modelo caro**. Escada de qualidade
`[REC]`:

| Fase                        | Modelo                 | Uso                 |
| --------------------------- | ---------------------- | ------------------- |
| Rascunho / ajuste de prompt | **Lite 720p**          | todas as tentativas |
| Aprovação interna           | Fast 720p              | versão apresentável |
| Entrega final               | Fast 1080p ou Standard | só o take aprovado  |

`[CALC]` Cenário "5 rascunhos + 1 final" (vídeo de 40s):

- Tudo em Standard: **$96.00**
- 5 rascunhos em Lite + final em Standard: **$26.00** → economiza **73%**
- 5 rascunhos em Lite + final em Fast: **$14.00** → economiza **85%**

### 3.3 Sete controles de custo que valem mais que o modelo escolhido `[REC]`

1. **Teto por projeto** (`budget_cap_cents`): o workflow para ao atingir. Protege contra o loop
   acidental que gera 200 clipes.
2. **Cache por idempotência**: prompt+seed idênticos reaproveitam o asset — retry não recobra.
3. **Aprovar roteiro e prompts antes de gerar vídeo**: texto custa frações de centavo; vídeo custa
   dólares. Errar cedo é barato.
4. **Keyframe primeiro, vídeo depois**: revisar uma imagem de $0.03 evita queimar um clipe de $0.40.
5. **Limite de retries = 2** e nunca repetir erro não-retryable (safety block repete igual e cobra
   igual).
6. **Batch API tem 50% de desconto** `[DOC]` — aplicável a roteiro/prompts (texto), que não são
   urgentes.
7. **720p por padrão**: 1080p custa +60% no Lite; e a extensão de vídeo do Veo **exige 720p** `[DOC]`
   de qualquer forma.

### 3.4 Orçamento mensal proposto

| Item                              | Custo           |
| --------------------------------- | --------------- |
| Railway (web + worker + Postgres) | $5–10           |
| Inngest (free tier)               | $0              |
| Storage (volume Railway ou R2)    | $0–5            |
| Geração — 10 vídeos/mês em Lite   | ~$30            |
| **Total**                         | **~$35–45/mês** |

Para comparação, os mesmos 10 vídeos em Standard custariam ~$210/mês só de geração.

**Teto sugerido para o piloto:** $50/mês, com alerta em 50%.

---

## 4. Resumo das decisões

| #   | Pergunta       | Decisão                                     | Motivo                                                                                            | Custo                |
| --- | -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | Onde roda?     | **Container no Railway**                    | FFmpeg e jobs longos inviabilizam serverless; Railway é o mais barato **com** Postgres gerenciado | $5–10/mês            |
| 2   | Self-hosting?  | **Não** → **Inngest**                       | Sem exigência no workspace; free tier cobre ~2.500 vídeos/mês; durabilidade por step de fábrica   | $0                   |
| 3   | Teto de custo? | **Veo 3.1 Lite 720p** + escada de qualidade | 7,4× mais barato que Standard; escada corta mais 73–85% na iteração                               | ~$30/mês (10 vídeos) |

### 4.1 Reprodutibilidade dos números

Todos os valores de `[CALC]` saem de aritmética direta sobre a tabela oficial:

```
clipe 8s   = preço_por_segundo × 8
vídeo 40s  = clipe × 5 cenas + keyframes
Lite 720p  = 0.05 × 8 × 5 = $2.00   |  Standard = 0.40 × 8 × 5 = $16.00
```

Preços conferidos em `ai.google.dev/gemini-api/docs/pricing` em 26/07/2026. **São preços de preview
e podem mudar** — reconferir antes de fechar orçamento.

---

## 5. Impacto no plano original

As decisões **simplificam** o roadmap:

| Fase                  | Mudança                                                              |
| --------------------- | -------------------------------------------------------------------- |
| **Nova F0.5**         | **Migrar os IDs de modelo** — urgente, ver §0                        |
| Fase 3 (orquestração) | Confirmada com Inngest; sem risco de timeout, pois é container       |
| Fase 7 (render)       | Destravada: Dockerfile com FFmpeg resolve, sem serviço externo       |
| Fase 8 (custos)       | Ganha o teto por projeto como item obrigatório, não opcional         |
| Fase 9 (console)      | Pode ser adiada — o dashboard do Inngest cobre o essencial no início |

### Tarefas revisadas

| #      | Tarefa                                                                                                                                             | Prioridade |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **T0** | **Verificar se a geração de vídeo ainda funciona** e migrar `veo-3.0-*` → `veo-3.1-*`, `gemini-2.5-flash-image-preview` → `gemini-3.1-flash-image` | 🔴 agora   |
| T1     | Client Gemini lazy + guardas em `candidates` + ativar CI                                                                                           | alta       |
| T2     | Corrigir SSRF em `veo/download`                                                                                                                    | alta       |
| T3     | Dockerfile com FFmpeg + deploy no Railway                                                                                                          | alta       |
| T4     | Postgres + schema mínimo                                                                                                                           | média      |
| T5     | PoC de workflow durável com Inngest                                                                                                                | média      |

T0 subiu à frente de tudo: **é a diferença entre um pipeline e um pipeline que não gera nada.**

---

## 6. O que ainda precisa de você

Nada bloqueia o início. Três pontos que só você decide, mas que **não travam T0–T3**:

1. **Qualidade de entrega final** — Fast 1080p ($4.80/vídeo) ou Standard ($16)? Sugiro começar em
   Fast e subir só se o cliente reclamar.
2. **Volume mensal esperado** — calibrei para ~10 vídeos/mês. Acima de 100, revisar o teto.
3. **Aprovação de roteiro humana ou automática?** — humana economiza dinheiro (erra no texto, não no
   vídeo), mas adiciona latência.
