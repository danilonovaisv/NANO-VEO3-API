#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.cwd();

// Load .env
const envPath = path.join(ROOT, ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed
        .slice(idx + 1)
        .trim()
        .replace(/^'|'$/g, "")
        .replace(/^"|"$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY nao encontrada!");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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

async function main() {
  const sceneId = "S01";
  const jsonFile = fs
    .readdirSync(MASTER_DIR)
    .find(
      (f) =>
        f.startsWith(sceneId + "_") &&
        f.endsWith(".json") &&
        !f.includes("BATCH")
    );
  if (!jsonFile) throw new Error("S01 JSON payload nao encontrado");

  const payload = JSON.parse(
    fs.readFileSync(path.join(MASTER_DIR, jsonFile), "utf8")
  );
  console.log(`🎬 Iniciando via Google API oficial (@google/genai)`);
  console.log(`Cena: ${payload.scene_title}`);

  // Google API so aceita 1 imagem via config padrao. Vamos usar o first_frame_path.
  const imgPath = path.join(ROOT, payload.input_frames.first_frame_path);
  const imgBuffer = fs.readFileSync(imgPath);
  const base64Image = imgBuffer.toString("base64");
  console.log(`  - Frame base lido: ${path.basename(imgPath)}`);

  console.log(`  - Disparando geração no Veo 3.0...`);

  try {
    const operation = await ai.models.generateVideos({
      model: "veo-3.0-generate-001",
      prompt: payload.video_generation_prompt,
      image: {
        imageBytes: base64Image,
        mimeType: "image/png",
      },
      config: {
        aspectRatio: "16:9",
        negativePrompt: payload.negative_prompt,
      },
    });

    console.log(`✅ Dispatch OK!`);
    console.log(`  Operation Name: ${operation.name}`);
    console.log(`  Operation State: ${operation.metadata?.state}`);

    // Save operation ticket
    fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const metaPath = path.join(
      RAW_OUTPUT_DIR,
      `${sceneId}_${ts}_google_api_operation.json`
    );
    fs.writeFileSync(metaPath, JSON.stringify(operation, null, 2));

    console.log(`
Aguardando conclusao (pode demorar alguns minutos)...`);
    let finished = false;
    let attempts = 0;
    while (!finished && attempts < 100) {
      await new Promise((r) => setTimeout(r, 15000));
      attempts++;

      // Polling a operation via REST (since SDK might not have a simple poll wrapper)
      const url = `https://generativelanguage.googleapis.com/v1beta/${operation.name}?key=${GEMINI_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      process.stdout.write(
        `  [${new Date().toLocaleTimeString()}] Status: ${data.metadata?.state || data.done}   \r`
      );

      if (data.done) {
        console.log(`\n🎉 Geração concluída!`);

        if (data.response && data.response.videoUri) {
          console.log(`Baixando video de: ${data.response.videoUri}`);
          const vidRes = await fetch(data.response.videoUri);
          const vidBuffer = Buffer.from(await vidRes.arrayBuffer());

          const outFile = path.join(
            RAW_OUTPUT_DIR,
            `${sceneId}_FT26-NAN-COMFOR_${ts}_veo3_google.mp4`
          );
          fs.writeFileSync(outFile, vidBuffer);
          console.log(
            `Video salvo com sucesso em: ${outFile} (${(vidBuffer.length / 1024 / 1024).toFixed(2)} MB)`
          );
        } else if (data.error) {
          console.error(`\n❌ Erro retornado pela API:`, data.error);
        } else {
          console.log(
            `Não foi possível localizar o URI do vídeo na resposta:`,
            JSON.stringify(data, null, 2)
          );
        }
        finished = true;
      }
    }
  } catch (error) {
    console.error("❌ Erro na geração:", error);
  }
}

main().catch(console.error);
