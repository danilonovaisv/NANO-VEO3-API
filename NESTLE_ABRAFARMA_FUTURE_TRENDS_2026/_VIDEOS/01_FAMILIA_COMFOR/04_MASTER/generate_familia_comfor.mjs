#!/usr/bin/env node
// generate_familia_comfor.mjs
// Dispara geracao via eachlabs.ai (veo3-1-first-last-frame-to-video)
// Uso: node NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/01_FAMILIA_COMFOR/04_MASTER/generate_familia_comfor.mjs S01
// Ou:  node NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/01_FAMILIA_COMFOR/04_MASTER/generate_familia_comfor.mjs ALL

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// Carregar .env manualmente (sem dotenv)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..", "..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed
      .slice(idx + 1)
      .trim()
      .replace(/^'|'$/g, "")
      .replace(/^"|"$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const EACHLABS_API_KEY = process.env.EACHLABS_API_KEY;
if (!EACHLABS_API_KEY) {
  console.error("EACHLABS_API_KEY nao encontrada no .env");
  process.exit(1);
}

const MASTER_DIR = path.join(
  ROOT,
  "NESTLE_ABRAFARMA_FUTURE_TRENDS_2026",
  "01_FAMILIA_COMFOR",
  "04_MASTER"
);
const RAW_OUTPUT_DIR = path.join(
  ROOT,
  "NESTLE_ABRAFARMA_FUTURE_TRENDS_2026",
  "06_PRODUCTION",
  "06_GENERATIONS_RAW"
);
const SCENE_IDS = ["S01", "S02", "S03", "S04", "S05"];

async function uploadFrame(framePath, apiKey) {
  const absPath = path.join(ROOT, framePath);
  const fileBuffer = fs.readFileSync(absPath);
  const base64 = fileBuffer.toString("base64");
  console.log(
    `  Uploading: ${path.basename(absPath)} (${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB)...`
  );

  const response = await fetch("https://api.eachlabs.ai/v1/file/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
    body: JSON.stringify({
      content: base64,
      content_type: "image/png",
      filename: path.basename(absPath),
    }),
  });

  if (!response.ok) {
    const txt = await response.text();
    // Fallback: retornar data URL se upload nao suportado
    console.warn(
      `  Upload API retornou ${response.status}. Usando data URL como fallback.`
    );
    return `data:image/png;base64,${base64}`;
  }

  const result = await response.json();
  console.log(`  Upload OK: ${result.url || "data URL"}`);
  return result.url || `data:image/png;base64,${base64}`;
}

async function pollUntilDone(predictionId, apiKey) {
  console.log(`  Polling prediction ${predictionId}...`);
  const MAX = 80;
  for (let i = 0; i < MAX; i++) {
    await new Promise((r) => setTimeout(r, 15000));
    const res = await fetch(
      `https://api.eachlabs.ai/v1/prediction/${predictionId}`,
      {
        headers: { "X-API-Key": apiKey },
      }
    );
    if (!res.ok) {
      console.warn(`  Poll ${i + 1}: HTTP ${res.status}`);
      continue;
    }
    const data = await res.json();
    process.stdout.write(
      `  [${new Date().toLocaleTimeString()}] Status: ${data.status}   \r`
    );
    if (data.status === "succeeded" || data.status === "completed") {
      console.log(`\n  Concluido!`);
      return data;
    }
    if (data.status === "failed" || data.status === "canceled") {
      console.error(`\n  Falhou: ${data.status}`);
      console.error(JSON.stringify(data, null, 2));
      return null;
    }
  }
  console.error(`\n  Timeout.`);
  return null;
}

async function generateScene(sceneId, apiKey) {
  const jsonFile = fs
    .readdirSync(MASTER_DIR)
    .find(
      (f) =>
        f.startsWith(sceneId + "_") &&
        f.endsWith(".json") &&
        !f.includes("BATCH") &&
        !f.includes("ALL")
    );

  if (!jsonFile) {
    console.error(`JSON nao encontrado para ${sceneId}`);
    return;
  }

  const payload = JSON.parse(
    fs.readFileSync(path.join(MASTER_DIR, jsonFile), "utf8")
  );
  console.log(`\n====================================================`);
  console.log(`Cena: ${sceneId} — ${payload.scene_title}`);
  console.log(
    `Motion: ${payload.motion_intensity} | Duration: ${payload.duration_seconds}s`
  );
  console.log(`====================================================`);

  const firstFrameUrl = await uploadFrame(
    payload.input_frames.first_frame_path,
    apiKey
  );
  const lastFrameUrl = await uploadFrame(
    payload.input_frames.last_frame_path,
    apiKey
  );

  console.log(`  Disparando geracao...`);
  const dispRes = await fetch("https://api.eachlabs.ai/v1/prediction", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
    body: JSON.stringify({
      model: "veo3-1-first-last-frame-to-video",
      version: "0.0.1",
      input: {
        first_frame_url: firstFrameUrl,
        last_frame_url: lastFrameUrl,
        prompt: payload.video_generation_prompt,
        duration: 8,
        resolution: "1080p",
        generate_audio: false,
        aspect_ratio: "16:9",
      },
    }),
  });

  if (!dispRes.ok) {
    const txt = await dispRes.text();
    console.error(`  Dispatch falhou (${dispRes.status}): ${txt}`);
    return;
  }

  const prediction = await dispRes.json();
  console.log(`  Prediction ID: ${prediction.id}`);
  console.log(`  Status inicial: ${prediction.status}`);

  // Salvar prediction ID imediatamente (para recuperacao se script for interrompido)
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(RAW_OUTPUT_DIR, `${sceneId}_${ts}_prediction.json`),
    JSON.stringify(
      {
        prediction_id: prediction.id,
        scene_id: sceneId,
        scene_title: payload.scene_title,
        started_at: ts,
      },
      null,
      2
    )
  );

  const finalResult = await pollUntilDone(prediction.id, apiKey);
  if (!finalResult) return;

  const videoUrl =
    finalResult.output?.video ||
    finalResult.output?.url ||
    (Array.isArray(finalResult.output) ? finalResult.output[0] : null);
  if (!videoUrl) {
    console.error(
      "  URL do video nao encontrada:",
      JSON.stringify(finalResult.output)
    );
    return;
  }

  console.log(`  Baixando video: ${videoUrl.substring(0, 80)}...`);
  const videoRes = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoRes.arrayBuffer());

  const outFile = `${sceneId}_FT26-NAN-COMFOR_${ts}_raw.mp4`;
  const outPath = path.join(RAW_OUTPUT_DIR, outFile);
  fs.writeFileSync(outPath, videoBuffer);
  console.log(
    `  Video salvo: ${outPath} (${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB)`
  );

  // Metadata
  const meta = {
    scene_id: sceneId,
    scene_title: payload.scene_title,
    asset_id: payload.asset_id,
    generated_at: ts,
    prediction_id: prediction.id,
    model: "veo3-1-first-last-frame-to-video",
    video_url_source: videoUrl,
    output_file: outFile,
    size_bytes: videoBuffer.length,
    status: "RAW_GENERATED — QA PENDING",
    qa_checklist: payload.qa_checklist,
    next_steps: [
      "QA visual checklist",
      "Upscale 1080p→1792x1536 Topaz",
      "Retime 60fps",
      "H.264 MP4 no audio",
      "Gate 10: legal claim approval",
    ],
  };
  fs.writeFileSync(
    path.join(RAW_OUTPUT_DIR, `${sceneId}_${ts}_meta.json`),
    JSON.stringify(meta, null, 2)
  );
  console.log(`  Metadata salva.`);
}

async function main() {
  const arg = (process.argv[2] || "S01").toUpperCase();
  const scenes = arg === "ALL" ? SCENE_IDS : [arg];
  console.log(`\nNESTLE NAN COMFOR — Familia Comfor`);
  console.log(`Modelo: veo3-1-first-last-frame-to-video (eachlabs.ai)`);
  console.log(`Cenas a gerar: ${scenes.join(", ")}`);
  for (const s of scenes) {
    try {
      await generateScene(s, EACHLABS_API_KEY);
    } catch (e) {
      console.error(`ERRO cena ${s}:`, e);
    }
  }
  console.log(`\nPipeline concluido. Outputs em: ${RAW_OUTPUT_DIR}`);
}

main().catch(console.error);
