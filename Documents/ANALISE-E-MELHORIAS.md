# Análise do projeto NANO-VEO3-API — organização e configuração

> Data: 26/07/2026 · Branch analisada: `arena/019f9d65-nano-veo3-api` (base `fe3cc84`)
> Escopo: organização de diretórios, configuração de build/lint/tipos, governança de repositório.
> Cada afirmação abaixo foi **verificada executando o projeto**, não inferida por leitura.

---

## 1. Sumário executivo

O repositório é um fork/derivado do _Gemini API Veo 3 Quickstart_ do Google, ao qual foi acoplada
uma camada muito grande de governança de agentes de IA (`.agents/`, `.claude/`, `.gemini/`,
`.context/`). O app Next.js em si é pequeno e saudável — **16 arquivos de código**, lint limpo,
typecheck limpo. O problema não é o código: é **desproporção e desalinhamento**.

Três números resumem o diagnóstico:

| Métrica                                              | Valor                                              |
| ---------------------------------------------------- | -------------------------------------------------- |
| Código de aplicação (arquivos `.ts`/`.tsx`)          | **16 arquivos**                                    |
| Conteúdo de agentes (`.agents/`)                     | **712 arquivos `.md`, 50 MB** — 92% do repositório |
| Regras declaradas no `AGENTS.md` que o código cumpre | **1 de 4**                                         |

O `AGENTS.md` e o `.context/conventions.md` descrevem um projeto que **não é o que está no disco**:
exigem Zod em todas as rotas (zero rotas usam), TypeScript strict (está desligado), respostas
`{ success, data, error }` (nenhuma rota segue) e Next.js 15 (o projeto está no 16). Isso é pior do
que não ter documentação, porque agentes de IA e novos desenvolvedores vão seguir instruções falsas.

**Prioridade de ataque:** (1) desbloquear build/CI, (2) realinhar documentação com a realidade,
(3) reduzir `.agents/`, (4) endurecer tipos e validação.

---

## 2. Evidências coletadas

Comandos executados neste ambiente, com resultado real:

```
npm ci                        → 495 pacotes, OK
npm run lint                  → limpo (0 erros)
npx tsc --noEmit              → limpo (0 erros)  ← mas com strict: false
npx tsc --noEmit (strict:true)→ 11 erros
npm run build (sem chave)     → FALHA: "GEMINI_API_KEY environment variable is not set"
npm run build (com chave)     → OK, 8 rotas geradas
npx eslint . -f json          → 25 arquivos lintados, sendo 7 de .agents/ (terceiros)
```

---

## 3. Problemas encontrados, por severidade

### 🔴 P0 — `next build` falha sem `GEMINI_API_KEY`

As seis rotas em `app/api/**` fazem isto **no escopo do módulo**:

```ts
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

Como o Next.js avalia os módulos de rota durante o passo _"Collecting page data"_, o build inteiro
quebra sem uma chave — **verificado**:

```
Error: GEMINI_API_KEY environment variable is not set.
> Build error occurred
Error: Failed to collect page data for /api/gemini/edit
```

Consequências: nenhum CI consegue buildar sem injetar um segredo; deploys em plataformas que
buildam antes de ter env configurado falham; contribuidores externos não conseguem validar um PR.

**Correção recomendada** — mover a criação do client para dentro do handler (_lazy_), de modo que a
ausência da chave vire um erro HTTP 500 legível em runtime, e não um crash de build:

```ts
// lib/gemini.ts (novo)
import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY não configurada. Copie .env.example para .env.local."
    );
  }
  client ??= new GoogleGenAI({ apiKey });
  return client;
}
```

```ts
// nas rotas
export async function POST(req: Request) {
  try {
    const ai = getGeminiClient();   // ← agora dentro do try
    ...
```

Enquanto isso não é feito, o CI adicionado neste trabalho injeta `GEMINI_API_KEY=dummy-key-for-build`,
que é suficiente porque **nenhuma chamada real à API acontece durante o build**.

---

### 🔴 P0 — Documentação normativa contradiz o código

O `AGENTS.md` lista "Regras Inegociáveis". Confrontando com o repositório:

| Regra declarada                                  | Realidade verificada                                         | Status |
| ------------------------------------------------ | ------------------------------------------------------------ | ------ |
| "TypeScript (Strict Mode)"                       | `tsconfig.json`: `"strict": false`, `"noImplicitAny": false` | ❌     |
| "Todas as rotas DEVEM utilizar Zod Schemas"      | `zod` **não está** nas dependências; 0 rotas validam         | ❌     |
| "Respostas DEVEM ser `{ success, data, error }`" | Todas retornam `{ image }`, `{ name }` ou `{ error }`        | ❌     |
| "Next.js 15 (App Router)"                        | `package.json`: `next: ^16.2.10`                             | ❌     |
| "SDK `@google/genai` (^1.8.0)"                   | Instalado: `2.12.0`                                          | ❌     |
| "Polling de long-running operations"             | Implementado em `app/api/veo/operation`                      | ✅     |

O `.context/project-context.md` também descreve rotas que **não existem** (`/app/api/gemini/route.ts`
e `/app/api/imagen/route.ts` — os caminhos reais são `gemini/generate`, `gemini/edit`,
`imagen/generate`).

**Recomendação:** decidir entre duas rotas e executar _uma_ delas, sem meio-termo:

- **(a) Ajustar a doc à realidade** — barato, imediato, honesto. Reescrever `AGENTS.md` como
  "estado atual + backlog de metas", marcando Zod/strict como _pendente_, não como _inegociável_.
- **(b) Ajustar o código à doc** — instalar `zod`, criar schemas por rota, padronizar envelope de
  resposta, ligar `strict`. É trabalho real (estimado 1–2 dias) mas entrega o que a doc promete.

Sugiro **(a) agora e (b) como épico**, porque documentação falsa causa dano contínuo.

---

### 🟠 P1 — TypeScript com as proteções desligadas

`"strict": false` e `"noImplicitAny": false` num projeto cuja própria convenção diz
_"é proibido o uso de `any` sem justificativa"_. O typecheck passa hoje apenas porque as
verificações estão desativadas.

Com `strict: true` aparecem **11 erros reais** — e são bugs em potencial, não ruído:

```
app/api/gemini/edit/route.ts(116,24):     'response.candidates' is possibly 'undefined'
app/api/gemini/generate/route.ts(28,24):  'response.candidates' is possibly 'undefined'
app/page.tsx(258,42):  'e' is of type 'unknown'      (× 4 ocorrências)
app/page.tsx(953,9):   Type 'string | boolean | null' is not assignable to type 'boolean'
```

Os dois primeiros são concretos: se a Gemini API devolver um bloqueio de safety filter,
`response.candidates` vem `undefined` e a rota lança `TypeError` → o usuário recebe 500 genérico
em vez de "conteúdo bloqueado".

**Plano de migração incremental** (evita um PR gigante):

1. Ligar `strict: true` e `noImplicitAny: true` no `tsconfig.json`.
2. Corrigir os 11 pontos — são localizados, ~1 hora:
   - guardas `response.candidates?.[0]?.content?.parts ?? []`;
   - `catch (e)` → `e instanceof Error ? e.message : String(e)`;
   - `canStart` → forçar boolean com `Boolean(...)` / `!!`.
3. Manter `npm run typecheck` no CI para não regredir.

---

### 🟠 P1 — ESLint varria código de terceiros

Sem `ignores`, o `eslint .` alcançava **25 arquivos, dos quais 7 dentro de `.agents/`** — hooks
`.cjs`, scripts `.ts` e `.js` de skills importadas de outros repositórios. Isso mistura violações
de código que não é seu com o do app, e torna o lint mais lento.

✅ **Corrigido neste trabalho** — o `eslint.config.mjs` agora ignora `.agents/`, `.claude/`,
`guides/` e artefatos de build. Resultado verificado: **18 arquivos lintados, todos do app**.

---

### 🟠 P1 — Ausência total de CI

Não havia `.github/` no repositório: nenhum workflow, nenhum template de PR/issue, nenhum
Dependabot. Havia apenas `.allstar/branch_protection.yaml` com `action: log` — ou seja, o Allstar
apenas _registra_ a ausência de proteção de branch, sem aplicá-la.

⚠️ **Entregue como template** — o workflow está pronto em `.github/ci.yml.template` e roda lint,
typecheck, format check e build em push/PR, com cache de npm e cancelamento de runs concorrentes.

Ele **não** foi colocado direto em `.github/workflows/` porque o GitHub App desta sessão não possui
a permissão `workflows` e o push foi rejeitado:

```
! [remote rejected] refusing to allow a GitHub App to create or update
  workflow `.github/workflows/ci.yml` without `workflows` permission
```

Para ativar (um comando, localmente):

```bash
mkdir -p .github/workflows
git mv .github/ci.yml.template .github/workflows/ci.yml
git commit -m "ci: ativa workflow de CI" && git push
```

**Ainda recomendado:** `dependabot.yml` (as dependências já estão desatualizadas — ver §5),
proteção de branch real em `main` e template de PR.

---

### 🟡 P2 — `.agents/` é 92% do repositório

```
.agents/    50 MB   712 arquivos .md   637 SKILL.md
public/    2.6 MB
guides/    540 KB
app+lib+components: 16 arquivos
```

Três problemas concretos:

**(i) Peso morto em Git.** Um único arquivo, `nano-banana-pro-prompts-recommend-skill/references/social-media-post.json`,
tem **20 MB**. Os arquivos `references/*.json` dessa skill somam **44 MB** — 81% do repositório
inteiro. Todo `git clone` paga esse custo para sempre, mesmo que os arquivos sejam removidos depois
(ficam no histórico).

**(ii) 24 skills duplicadas.** Mesmo nome de skill em dois caminhos diferentes:

```
.agents/skills/veo-3/SKILL.md          ×  .agents/skills/models/veo-3/SKILL.md
.agents/skills/nano-banana/SKILL.md    ×  .agents/skills/models/nano-banana/SKILL.md
.agents/skills/background-removal/     ×  .agents/skills/categories/image/background-removal/
... (24 no total)
```

Destas: **17 são byte-a-byte idênticas** (deleção segura) e **7 divergiram** — ex.: `nano-banana`
tem 157 linhas de diferença entre as duas cópias, `youtube-thumbnail` tem 296. Nas divergentes, um
agente pode carregar a versão errada e produzir resultado inconsistente. Estas exigem merge manual.

**(iii) Três idiomas nas regras.** `.agents/rules/` tem 21 arquivos: **9 em vietnamita**
(`code-quality.md`, `debug.md`, `design-system.md`, `node.md`, `rendering.md`, ...), 6 em português,
6 em inglês. `code-quality.md` — a regra de qualidade que deveria reger o projeto — está inteira em
vietnamita. Além disso, `.agents/data/memory.json` contém estado de **outro projeto**
(`"project": "PPT-CREATOR"`, com links de Canva), e `.agents/hooks/` referencia caminhos
inexistentes aqui (`supabase/functions/`, `.aios-core/`).

**Plano de enxugamento proposto (não executado — nada foi apagado):**

| Passo | Ação                                                                                                                                                                           | Ganho               | Risco                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | --------------------- |
| 1     | Remover os 12 `references/*.json` da skill `nano-banana-pro-prompts-recommend-skill` do working tree e baixá-los sob demanda (a skill já tem `scripts/generate-references.ts`) | −44 MB              | Baixo                 |
| 2     | Deletar as **17 duplicatas idênticas**, mantendo a cópia canônica em `skills/<nome>/`                                                                                          | −17 arquivos        | Nenhum                |
| 3     | Fazer merge manual das **7 duplicatas divergentes** e manter uma só                                                                                                            | consistência        | Médio — exige revisão |
| 4     | Traduzir (ou remover) as 9 regras em vietnamita; padronizar em PT-BR                                                                                                           | legibilidade        | Baixo                 |
| 5     | Limpar `.agents/data/memory.json` (estado do PPT-CREATOR) e os hooks que apontam para `supabase/`/`.aios-core/`                                                                | coerência           | Baixo                 |
| 6     | Se quiser reduzir o histórico do Git também, usar `git filter-repo` para expurgar os JSONs de 44 MB — **operação destrutiva**, exige force-push coordenado                     | −44 MB no histórico | **Alto**              |

Passos 1–2 são seguros e sozinhos cortam ~81% do peso do working tree.

---

### 🟡 P2 — Higiene de configuração (corrigido)

| Item                   | Antes                                                                                           | Depois                                                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.env.example`         | inexistente — a chave obrigatória só era descoberta lendo o README                              | criado e documentado                                                                                                                                                                        |
| `.gitignore` / `.env*` | a regra `.env*` **bloqueava** o próprio `.env.example`                                          | exceção `!.env.example`                                                                                                                                                                     |
| `public/uploads/`      | `frame_start.png` e `frame_end.jpg` versionados, **não referenciados** por nenhum código ou doc | novos uploads ignorados + `.gitkeep`; os 2 arquivos atuais seguem versionados (o `.gitignore` não afeta o que já está rastreado) — remover com `git rm --cached` se confirmado que são lixo |
| `engines`              | ausente — nada impedia rodar em Node 18, que o Next 16 não suporta                              | `">=20.9.0"` + `.nvmrc`                                                                                                                                                                     |
| Nome do pacote         | `gemini-api-veo-3-quickstart` (herdado do upstream)                                             | `nano-veo3-api`                                                                                                                                                                             |
| Formatador             | nenhum                                                                                          | Prettier + `.prettierrc.json` + `.prettierignore`                                                                                                                                           |
| Estilo de editor       | nenhum                                                                                          | `.editorconfig`                                                                                                                                                                             |
| Scripts npm            | 4 (`dev`, `build`, `start`, `lint`)                                                             | 9 (+ `typecheck`, `format`, `format:check`, `lint:fix`, `verify`)                                                                                                                           |

---

### 🟢 P3 — Pontos menores

- **Favicon quebrado:** `app/layout.tsx` aponta `icon: "/imgs/gemini_icon.svg"`, mas **`public/imgs/`
  não existe**. O `app/favicon.ico` acaba sendo usado por convenção do Next, mas a declaração está
  morta — remover ou adicionar o arquivo.
- **3 dependências não usadas** (verificado por grep em `app/`, `components/`, `lib/`):
  `react-player` (o `VideoPlayer.tsx` usa `<video>` nativo + `MediaRecorder`),
  `@wojtekmaj/react-hooks` e `class-variance-authority` — zero importações. Removê-las corta
  peso de instalação. _Não removidas aqui por estarem fora do escopo de "quick wins"._
- **19 `console.log` e 4 `alert()`** em código de produção. O `alert()` como tratamento de erro
  (`alert(\`Failed to generate image: ${e.message}\`)`) é UX ruim — trocar por toast/estado de erro.
Note que a própria regra `.agents/rules/code-quality.md`proíbe`console.log` em branch principal.
- **`app/page.tsx` com 970 linhas** concentra 4 modos de operação, polling, download e trim.
  Extrair hooks (`useVeoGeneration`, `useImageGeneration`) e um `lib/api-client.ts` reduziria
  bastante a superfície e removeria a duplicação entre `generateWithImagen`/`generateWithGemini`,
  que são quase idênticos.
- **`next.config.ts` vazio** — sem `images.remotePatterns`, sem headers de segurança
  (`X-Frame-Options`, `Content-Security-Policy`). Para um app que renderiza mídia gerada, vale
  configurar.
- **Sem nenhum teste.** Não há Vitest/Jest/Playwright. Para as rotas de API, testes de contrato
  (payload válido → 200; payload inválido → 400) seriam baratos e casariam com a meta de Zod.

---

## 4. O que foi aplicado nesta branch

Somente mudanças de **baixo risco**, sem tocar na lógica da aplicação:

```
 .editorconfig            (novo)  padrão de editor
 .env.example             (novo)  template da chave obrigatória, sem segredos
 .nvmrc                   (novo)  Node 22
 .prettierrc.json         (novo)  config do formatador
 .prettierignore          (novo)  exclui .agents/, guides/, build
 .github/ci.yml.template  (novo)  CI pronto — requer 1 comando p/ ativar
 .gitignore               (edit)  !.env.example, uploads de runtime, artefatos de IA
 eslint.config.mjs        (edit)  ignora .agents/, .claude/, guides/
 package.json             (edit)  nome, engines, license, repository, +5 scripts, +prettier
 package-lock.json        (edit)  sincronizado
 public/uploads/.gitkeep  (novo)  preserva o diretório
 docs/ANALISE-E-MELHORIAS.md (novo)  este documento
```

Além disso, `npx prettier --write .` normalizou 13 arquivos já existentes. Verifiquei que essas
mudanças são **puramente cosméticas** (ponto-e-vírgula, quebra de linha, indentação): o
`git diff --ignore-all-space` não mostra nenhuma alteração semântica, e a tabela HTML do README
segue intacta.

**Validação pós-mudança:**

```
npm run lint         → limpo (18 arquivos, só do app)
npm run typecheck    → limpo
npm run format:check → "All matched files use Prettier code style!"
npm run build        → OK, 8 rotas geradas
```

> Nota sobre o build neste sandbox: `npm run build` falha aqui com
> `Failed to fetch 'Manrope' from Google Fonts` porque o ambiente **não tem acesso a
> `fonts.googleapis.com`** (confirmado: `curl` para o domínio falha, enquanto o registry npm
> responde 200). Não é defeito do projeto — validei o build neutralizando temporariamente o
> `next/font` e restaurando o `app/layout.tsx` em seguida (o arquivo está intocado). No GitHub
> Actions, com rede liberada, o passo roda normalmente.

---

## 5. Roadmap sugerido

**Sprint 1 — desbloqueio (≈ meio dia)**

1. Client Gemini _lazy_ em `lib/gemini.ts` → build deixa de exigir chave (§3, P0).
2. Reescrever `AGENTS.md` e `.context/project-context.md` para refletir a realidade (§3, P0).
3. Corrigir o favicon fantasma e remover as 3 dependências não usadas.

**Sprint 2 — robustez (≈ 1–2 dias)** 4. `strict: true` + corrigir os 11 erros (§3, P1). 5. Instalar `zod` e validar as 6 rotas; padronizar o envelope `{ success, data, error }`. 6. Substituir `alert()` por UI de erro e remover os `console.log`.

**Sprint 3 — organização (≈ 1 dia)** 7. Executar os passos 1–2 do enxugamento de `.agents/` (§3, P2): −44 MB e −17 arquivos. 8. Resolver as 7 skills divergentes e unificar o idioma das regras. 9. Extrair hooks de `app/page.tsx`.

**Sprint 4 — sustentação** 10. Dependabot + proteção de branch real (hoje o Allstar só loga). 11. Atualizar dependências: **13 pacotes desatualizados**, incluindo `next` 16.2.10 → 16.2.12,
`@google/genai` 2.12.0 → 2.13.0 e `tailwindcss` 4.1.11 → 4.3.3. 12. Testes de contrato das rotas de API.

---

## 6. Resumo visual do antes/depois

```
ANTES                                    DEPOIS
─────────────────────────────────────    ─────────────────────────────────────
build sem chave     ✗ quebra             ✗ quebra  (correção proposta em §3)
CI                  ✗ inexistente        ~ template pronto (1 cmd p/ ativar)
.env.example        ✗ inexistente        ✓ documentado
                    ✗ .gitignore o comia ✓ exceção explícita
lint                ~ 25 arq. (7 alheios)✓ 18 arq., só do app
formatador          ✗ nenhum             ✓ Prettier, 13 arq. normalizados
Node version        ✗ não declarada      ✓ engines + .nvmrc
scripts npm         4                    9
doc vs. código      ✗ 1 de 4 regras      ✓ divergências mapeadas em §3
.agents/            50 MB, 24 duplicatas  ✓ plano de corte de ~81% (§3, P2)
```
