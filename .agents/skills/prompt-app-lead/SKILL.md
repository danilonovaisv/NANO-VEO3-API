---
name: prompt-app-lead
description: >
  Lead AI Engineer do projeto PROMPT-APP de Danilo Novais. Use esta skill SEMPRE que trabalhar
  neste projeto — ao criar componentes React, migrar schemas Dexie, adicionar menus de contexto,
  sincronizar com Supabase, corrigir bugs ou criar features. Inclui arquitetura completa, padrões
  de código, schema do banco, fluxo de sync e diretrizes PromptOps. Acione também ao ver menções
  a "menus de contexto", "IndexedDB", "PromptPayload", "compiledPayload", "syncService",
  "netlify.toml", "prompt-app-dan.netlify.app" ou qualquer arquivo em /src/db, /src/models,
  /src/services, /src/pages, /src/components/menu-manager.
---

# PROMPT-APP — Lead AI Engineer

## 1. Identidade do Projeto

**PROMPT-APP** é uma ferramenta _local-first_ de **PromptOps** desenvolvida por Danilo Novais.
Transforma a escrita de prompts em engenharia estruturada, com templates cognitivos, menus de
contexto dinâmicos e sincronização opcional na nuvem.

- **App em produção:** https://prompt-app-dan.netlify.app
- **Repositório:** https://github.com/danilonovaisv/PROMPT-APP.git
- **Deploy:** Netlify (CI automático via `pnpm run build`)

---

## 2. Stack Técnica

| Camada           | Tecnologia                              | Versão |
| ---------------- | --------------------------------------- | ------ |
| Framework        | React                                   | 19.x   |
| Build            | Vite                                    | 8.x    |
| Linguagem        | TypeScript (Strict)                     | ~6.0   |
| Banco local      | IndexedDB via Dexie.js                  | 4.x    |
| Banco nuvem      | Supabase (opcional)                     | 2.x    |
| Roteamento       | React Router DOM                        | 7.x    |
| Validação        | Zod                                     | 4.x    |
| Estilo           | CSS custom (classes tipo `.app-header`) | —      |
| Toast            | react-hot-toast                         | 2.x    |
| Ícones           | lucide-react                            | 1.x    |
| Monitoramento    | Sentry                                  | 10.x   |
| Package Manager  | pnpm                                    | 10.x   |
| Testes unitários | Jest + Testing Library                  | 30.x   |
| Testes E2E       | Playwright                              | 1.x    |

---

## 3. Arquitetura de Pastas

```
/src
  App.tsx              — Roteador principal + inicialização
  main.tsx             — Entry point
  instrument.ts        — Sentry init
  /pages               — Páginas lazy-loaded
    HomePage.tsx        — Grid de categorias
    CategoryPage.tsx    — Lista de prompts da categoria
    CategoryManagerPage.tsx
    EditorPage.tsx      — Editor de prompt (CRUD completo)
    MenuManagerPage.tsx — CRUD de Menus de Contexto (/menus)
    AboutPage.tsx / ContactPage.tsx / PrivacyPage.tsx
  /components
    Layout.tsx
    ImportExportModal.tsx / ImportMenusModal.tsx
    PromptCard.tsx / CategoryCard.tsx
    ErrorBoundary.tsx / SkeletonLoader.tsx
    /editor             — Subcomponentes do EditorPage
      EditorDefinitionForm.tsx
      EditorContextMenuSelector.tsx
      EditorMetaForm.tsx
      EditorPlayground.tsx
      EditorPreviewModal.tsx
    /menu-manager       — Subcomponentes do MenuManagerPage
      MenuCard.tsx
      MenuForm.tsx
      MenuOptionEditor.tsx
    /ui                 — Componentes genéricos de UI
  /db
    database.ts         — Schema Dexie + migrações (v1→v6)
    seedHelpers.ts      — Seeds e helpers
  /models
    types.ts            — Interfaces TypeScript
    types.d.ts          — Tipos ambientes
    promptSchema.ts     — Schema Zod para PromptPayload
    outputSchema.ts     — Schema Zod para OutputSchema
  /services
    syncService.ts      — Sync bidirecional Supabase
    supabaseMenus.ts    — CRUD menus no Supabase
    supabaseCategories.ts
    supabasePrompts.ts
    autoSync.ts         — Sync automático em background
    realtimeService.ts  — Realtime listeners Supabase
    contextMenuSync.ts  — Sync específico de ContextMenus
    importService.ts
  /context
    ToastContext.tsx
    ConfirmProvider.tsx
  /hooks               — Custom hooks React
  /lib
    supabase.ts         — Cliente Supabase
    supabaseConfig.ts   — Resolução de config via env
  /utils
    backupManager.ts    — Backup local automático
    exportJson.ts / importMenusJson.ts
    contextMenuOptions.ts
```

---

## 4. Schema do Banco (Dexie.js — versão atual: v6)

```typescript
db.version(6).stores({
  categories: '++id, input, name, createdAt, remoteId, syncStatus',
  prompts:
    '++id, categoryId, title, schemaVersion, language, outputFormat, createdAt, updatedAt, remoteId, syncStatus',
  menuOptions: '++id, menuKey, value', // legado, não usar para novos menus
  contextMenus: '++id, menuId, menuName, selectionMode, createdAt, remoteId, syncStatus',
});
```

### Regra de ouro para migrações

```typescript
// SEMPRE incrementar versão e definir lógica de upgrade
db.version(NOVA_VERSAO)
  .stores({
    /* schema completo — NUNCA omitir tabelas existentes */
  })
  .upgrade(async (tx) => {
    // lógica de migração
  });
```

---

## 5. Interfaces TypeScript Principais

```typescript
// Category
interface Category {
  id?: number;
  remoteId?: number;
  syncStatus?: SyncStatus; // 'pending' | 'synced' | 'error'
  isDeleted?: boolean;
  name: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt?: Date;
}

// ContextMenu — usado pela página /menus
interface ContextMenu {
  id?: number;
  remoteId?: number;
  syncStatus?: SyncStatus;
  isDeleted?: boolean;
  menuId: string; // slug único ex: "tom_de_voz"
  menuName: string;
  description: string;
  selectionMode: 'single' | 'multiple';
  options: ContextMenuOption[]; // Array de opções com sub-opções
  createdAt: Date;
  updatedAt: Date;
}

interface ContextMenuOption {
  label: string;
  value: string;
  subOptions: ContextMenuSubOption[];
}

// Prompt — objeto central
interface Prompt {
  id?: number;
  remoteId?: number;
  syncStatus?: SyncStatus;
  categoryId: number;
  title: string;
  promptPayload: TemplatePayload; // Schema cognitivo estruturado
  selectionPayload?: UserSelection;
  compiledPayload?: CompiledPromptPayload;
  schemaVersion: string;
  language: string; // default: 'pt-BR'
  outputFormat: PromptOutputFormat; // 'text'|'markdown'|'json'|'image'|'code'
  fewShotExamples: FewShotExample[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 6. Schema Cognitivo do Prompt (TemplatePayload)

Todo prompt é estruturado com estes campos obrigatórios (PromptOps pattern):

```typescript
// Campos do TemplatePayload (Zod-validated)
{
  title: string,                    // Título do template
  system_role: string,              // Papel/persona da IA
  task: string,                     // Tarefa principal
  context: string,                  // Contexto adicional
  constraints: string[],            // Restrições e regras
  negative_prompt: string[],        // O que evitar
  output_schema: OutputSchemaDTO,   // formato + estrutura de saída
  menus: MenuDefinition[],          // Menus de contexto vinculados
  few_shot_examples: FewShotExample[], // Exemplos input→output
  status: 'draft'|'active'|'archived',
  schema_version: string,
  language: string,
}
```

**Ao criar ou editar prompts, SEMPRE respeitar esta estrutura cognitiva.**

---

## 7. Sistema de Menus de Contexto (`/menus`)

Os **Menus de Contexto** são a feature central da app:

- Permitem customizar prompts em runtime com seleções dinâmicas
- Cada menu tem `menuId` (slug único), `menuName`, `description`
- `selectionMode: 'single' | 'multiple'` — controla se o usuário escolhe 1 ou N opções
- `options` — array de opções com label, value e sub-opções opcionais

### Fluxo CRUD de Menus

```
MenuManagerPage
  ↓ useLiveQuery (Dexie)
  ↓ save/edit/delete via db.contextMenus
  ↓ Se Supabase configurado → saveMenuToSupabase / deleteMenuFromSupabase
  ↓ Supabase Realtime → realtimeService.ts propaga para outros clients
```

### Soft Delete

**NUNCA usar DELETE real no Supabase.** Usar soft delete:

```typescript
// Marcar como excluído — o Realtime propaga para todos os clients
await supabase.from('context_menus').update({ is_deleted: true }).eq('id', remoteId);
```

---

## 8. Sincronização Local ↔ Cloud

```
IndexedDB (Dexie) — sempre fonte de verdade local
         ↕  (syncService.ts + autoSync.ts)
Supabase PostgreSQL — sincronização opcional
         ↕
Supabase Realtime — propagação em tempo real
```

### syncStatus

Cada registro tem `syncStatus`: `'pending' | 'synced' | 'error'`

### Variáveis de ambiente necessárias

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...  # NUNCA hardcodar
```

---

## 9. Comandos do Projeto

```bash
npm run dev          # Dev server (Vite)
npm run build        # Compile TS + Vite build → /dist
npm test             # Jest unit tests
npm run test:e2e     # Playwright E2E
npm run lint         # ESLint
npm run type-check   # tsc --noEmit

pnpm install         # Instalar dependências (usar pnpm, não npm/yarn)
```

---

## 10. Deploy (Netlify)

- **Branch principal** → deploy automático
- **Build command:** `pnpm install --frozen-lockfile && pnpm run build`
- **Publish dir:** `dist`
- **SPA Redirect:** configurado em `netlify.toml` (`/* → /index.html`)
- **Assets** com cache imutável (`/assets/*`, max-age=31536000)

---

## 11. Diretrizes de Qualidade

### Performance

- Usar `useLiveQuery` (Dexie) para subscriptions reativas ao IndexedDB
- `useMemo` para `compiledPayload` — payloads grandes, evitar re-compute
- Lazy loading em todas as páginas (`React.lazy + Suspense`)
- `useCallback` em handlers passados para componentes filhos memoizados

### Segurança

- NUNCA expor chaves Supabase no código — usar `VITE_SUPABASE_*` env vars
- Validar todos inputs com Zod nos boundaries do sistema
- Sanitizar URLs com `sanitizeUrlField()` de `outputSchema.ts`

### Acessibilidade

- Componentes navegáveis por teclado
- Contraste adequado
- ARIA labels onde necessário

### Código

- TypeScript Strict Mode sempre
- Arquivos < 500 linhas
- Interfaces tipadas para todas as APIs públicas
- Sempre ler arquivo antes de editar

---

## 12. Padrões de Resposta

Ao trabalhar neste projeto:

1. **Migrações Dexie** → sempre incrementar versão, nunca remover versões antigas
2. **Sync Supabase** → verificar `isSupabaseConfigured` antes de qualquer chamada cloud
3. **Menus de Contexto** → `menuId` deve ser slug único gerado via `toSlug()`
4. **Prompts** → respeitar estrutura cognitiva completa (`TemplatePayload`)
5. **Testes** → rodar `npm test` após mudanças em models/services/db
6. **Build** → verificar `npm run build` antes de qualquer commit

---

## 13. Referências

- **Dexie.js:** https://dexie.org/docs
- **React 19:** https://react.dev
- **Supabase:** https://supabase.com/docs
- **Vite:** https://vite.dev
- **Netlify:** https://docs.netlify.com
- **Repositório:** https://github.com/danilonovaisv/PROMPT-APP.git
- **App em produção:** https://prompt-app-dan.netlify.app/menus
