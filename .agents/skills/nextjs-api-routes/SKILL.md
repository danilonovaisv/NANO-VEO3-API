---
name: nextjs-api-routes
description: Instruções procedimentais para criação e manutenção de rotas de API HTTP no Next.js 15 (App Router) em TypeScript.
---

# Next.js 15 API Routes Skill

> **Objetivo**: Padronizar a criação de handlers de API REST (`route.ts`) na estrutura do Next.js 15 App Router.

---

## 📋 Padrão de Estrutura de Rota (`app/api/<rota>/route.ts`)

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Sanitização / Validação
    // 2. Lógica de negócio / Chamada de serviço

    return NextResponse.json(
      { success: true, data: { result: "ok" } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## 🛠️ Diretrizes Obrigatórias
- **Handlers Nomeados**: Use `GET`, `POST`, `PUT`, `DELETE` em letra maiúscula.
- **Tratamento de CORS e Headers**: Adicione headers necessários na instância de `NextResponse` quando aplicável.
- **Respostas Tipadas**: Mantenha o formato unificado `{ success: boolean, data?: T, error?: string }`.
