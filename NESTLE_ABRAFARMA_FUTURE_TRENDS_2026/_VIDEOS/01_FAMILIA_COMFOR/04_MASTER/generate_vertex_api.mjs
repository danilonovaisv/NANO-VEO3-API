#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.cwd();

const ai = new GoogleGenAI({
  vertexai: true,
  project: "portfolio-danilo-novais",
  location: "us-central1",
});

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
  console.log(`🎬 Iniciando via Google API (Vertex AI)`);
  console.log(`Cena: ${payload.scene_title}`);

  // Usar first_frame_path
  const imgPath = path.join(ROOT, payload.input_frames.first_frame_path);
  const imgBuffer = fs.readFileSync(imgPath);
  const base64Image = imgBuffer.toString("base64");
  console.log(`  - Frame base lido: ${path.basename(imgPath)}`);

  console.log(`  - Disparando geração no Veo 3.0 via Vertex AI...`);

  try {
    const operation = await ai.models.generateVideos({
      model: "veo-3.0-generate-001", // Pode ser veo-01 ou veo-3.0-generate-001
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
    console.log(
      `  Operation State: ${operation.metadata?.state || "PROCESSANDO"}`
    );

    // Save operation ticket
    fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const metaPath = path.join(
      RAW_OUTPUT_DIR,
      `${sceneId}_${ts}_vertex_operation.json`
    );
    fs.writeFileSync(metaPath, JSON.stringify(operation, null, 2));

    console.log(`
Aguardando conclusao (pode demorar alguns minutos)...`);
    console.log(operation);

    if (operation.videoUri || operation.uri || operation.generatedVideo) {
      console.log(`🎉 Geração concluída! URL:`, operation);
    } else {
      console.log(
        "⚠️ Operação em andamento no Vertex AI, verifique o console do GCP para o progresso."
      );
    }
  } catch (error) {
    console.error("❌ Erro na geração:", error);
  }
}

main().catch(console.error);
