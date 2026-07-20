---
name: zod-schema-validation
description: Instruções procedimentais para criação de schemas de validação Zod e tipagem inferida no TypeScript.
---

# Zod Schema Validation Skill

> **Objetivo**: Garantir validação estrita de dados de entrada na API para evitar erros em tempo de execução e requisições malformadas.

---

## 🛠️ Padrão de Schema de Validação

```typescript
import { z } from 'zod';

export const VeoGenerateSchema = z.object({
  prompt: z.string().min(3, 'O prompt deve ter pelo menos 3 caracteres.'),
  aspectRatio: z.enum(['16:9', '9:16', '1:1']).default('16:9'),
  durationSeconds: z.number().min(1).max(60).default(5),
  negativePrompt: z.string().optional(),
});

export type VeoGenerateInput = z.infer<typeof VeoGenerateSchema>;
```

## 📋 Como Aplicar nas Rotas
```typescript
const parseResult = VeoGenerateSchema.safeParse(body);
if (!parseResult.success) {
  return NextResponse.json(
    { success: false, error: 'Dados inválidos', details: parseResult.error.format() },
    { status: 400 }
  );
}
```
