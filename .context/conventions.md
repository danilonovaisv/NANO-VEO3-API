# Convenções de Código e Desenvolvimento (NANO-VEO3-API)

## 1. Padrões de TypeScript & Async/Await
* **Strict Typing**: É proibido o uso de `any` sem justificativa prévia. Defina interfaces ou types explicitamente.
* **Handlers de API Async**: Todos os handlers de rota em `app/api/**/route.ts` devem ser assíncronos (`export async function POST(req: Request)`).

## 2. Validação com Zod
* Toda rota que aceite payload no corpo (`req.json()`) ou query params DEVE ter um esquema Zod correspondente para parse/validation antes da execução de regras de negócio.
* Respostas de erro por validação devem retornar HTTP 400 Bad Request com os detalhes de erros formatados (`error.errors`).

## 3. Respostas HTTP Padronizadas (`NextResponse`)
```typescript
// Sucesso
return NextResponse.json({ success: true, data: result }, { status: 200 });

// Erro
return NextResponse.json({ success: false, error: "Descrição técnica legível" }, { status: 400 | 500 });
```

## 4. Estilização & UI
* Use Tailwind CSS v4 para estilização declarativa.
* Organize layouts em container grids responsivos planos.
* Evite física 3D de câmera em vídeos ou previews interativos.
