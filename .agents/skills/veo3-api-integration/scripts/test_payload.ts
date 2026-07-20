/**
 * Script de teste determinístico para validação da estrutura de payloads do Google Veo 3.
 * Execução: npx tsx .agents/skills/veo3-api-integration/scripts/test_payload.ts
 */

interface VeoPayload {
  prompt: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  durationSeconds?: number;
  negativePrompt?: string;
  personGeneration?: 'ALLOW_ADULT' | 'DONT_ALLOW';
}

function validateVeoPayload(payload: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof payload !== 'object' || payload === null) {
    return { valid: false, errors: ['Payload deve ser um objeto válido.'] };
  }

  const p = payload as Record<string, unknown>;

  if (typeof p.prompt !== 'string' || p.prompt.trim().length === 0) {
    errors.push('O campo "prompt" é obrigatório e deve ser uma string não vazia.');
  }

  if (p.aspectRatio !== undefined) {
    const validRatios = ['16:9', '9:16', '1:1'];
    if (!validRatios.includes(p.aspectRatio as string)) {
      errors.push(`"aspectRatio" inválido: ${p.aspectRatio}. Valores permitidos: ${validRatios.join(', ')}.`);
    }
  }

  if (p.durationSeconds !== undefined) {
    if (typeof p.durationSeconds !== 'number' || p.durationSeconds <= 0) {
      errors.push('"durationSeconds" deve ser um número positivo.');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Testes de Exemplo
const samplePayload: VeoPayload = {
  prompt: 'A futuristic cinematic shots of a glowing robot in rain, ultra detailed 4k',
  aspectRatio: '16:9',
  durationSeconds: 5,
};

console.log('🔍 Executando validação determinística de payload do Veo 3...');
const result = validateVeoPayload(samplePayload);

if (result.valid) {
  console.log('✅ Payload do Veo 3 é VÁLIDO!');
  console.log(JSON.stringify(samplePayload, null, 2));
  process.exit(0);
} else {
  console.error('❌ Validação do Payload FALHOU:');
  result.errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
}
