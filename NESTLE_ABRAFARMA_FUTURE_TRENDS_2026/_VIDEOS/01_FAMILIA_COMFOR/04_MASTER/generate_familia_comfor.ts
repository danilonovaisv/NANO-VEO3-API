import fs from "fs";
import path from "path";

/**
 * Script: generate_familia_comfor.ts
 * Dispara geracao de video via eachlabs.ai (veo3-1-first-last-frame-to-video)
 * Uso: npx tsx NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/01_FAMILIA_COMFOR/04_MASTER/generate_familia_comfor.ts [S01|S02|S03|S04|S05|ALL]
 *
 * Requer: EACHLABS_API_KEY no .env ou variavel de ambiente
 */

if (fs.existsSync(path.join(process.cwd(), ".env"))) {
  const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
  for (const line of envContent.split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && v.length > 0 && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
    }
  }
}

const EACHLABS_API_KEY = process.env.EACHLABS_API_KEY;
if (!EACHLABS_API_KEY) {
  console.error("EACHLABS_API_KEY nao encontrada no .env");
  process.exit(1);
}

const MASTER_DIR = path.join(
  process.cwd(),
  "NESTLE_ABRAFARMA_FUTURE_TRENDS_2026",
  "01_FAMILIA_COMFOR",
  "04_MASTER"
);

const RAW_OUTPUT_DIR = path.join(
  process.cwd(),
  "NESTLE_ABRAFARMA_FUTURE_TRENDS_2026",
  "06_PRODUCTION",
  "06_GENERATIONS_RAW"
);

const SCENE_IDS = ["S01", "S02", "S03", "S04", "S05"];

async function uploadFrameToEachlabs(
  framePath: string,
  apiKey: string
): Promise<string> {
  const absPath = path.join(process.cwd(), framePath);
  const fileBuffer = fs.readFileSync(absPath);
  const base64 = fileBuffer.toString("base64");
  const mimeType = "image/png";

  console.log();

  // eachlabs upload endpoint
  const response = await fetch("https://api.eachlabs.ai/v1/file/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      content: base64,
      content_type: mimeType,
      filename: path.basename(absPath),
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error();
  }

  const result = await response.json() as { url: string };
  console.log();
  return result.url;
}

async function generateScene(sceneId: string, apiKey: string): Promise<void> {
  const jsonFile = fs
    .readdirSync(MASTER_DIR)
    .find((f) => f.startsWith(sceneId + "_") && f.endsWith(".json") && !f.includes("BATCH"));

  if (!jsonFile) {
    console.error();
    return;
  }

  const payloadPath = path.join(MASTER_DIR, jsonFile);
  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));

  console.log("");
  console.log();
  console.log();
  console.log();

  // Upload frames
  const firstFrameUrl = await uploadFrameToEachlabs(payload.input_frames.first_frame_path, apiKey);
  const lastFrameUrl = await uploadFrameToEachlabs(payload.input_frames.last_frame_path, apiKey);

  // Dispatch generation
  console.log();
  const dispatchResponse = await fetch("https://api.eachlabs.ai/v1/prediction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
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

  if (!dispatchResponse.ok) {
    const err = await dispatchResponse.text();
    throw new Error();
  }

  const prediction = await dispatchResponse.json() as { id: string; status: string };
  console.log();
  console.log();

  // Polling
  console.log();
  let finalResult: { id: string; status: string; output?: { video?: string; url?: string } } | null = null;
  let attempts = 0;
  const MAX_ATTEMPTS = 80; // ~20 minutos

  while (attempts < MAX_ATTEMPTS) {
    await new Promise((r) => setTimeout(r, 15000));
    attempts++;

    const pollResponse = await fetch(
      `https://api.eachlabs.ai/v1/prediction/${prediction.id}`,
      { headers: { "X-API-Key": apiKey } }
    );

    if (!pollResponse.ok) {
      console.warn(`  Poll attempt ${attempts} falhou: ${pollResponse.status}`);
      continue;
    }

    const pollResult = await pollResponse.json() as { id: string; status: string; output?: { video?: string; url?: string } };
    process.stdout.write(`  [${new Date().toISOString()}] Status: ${pollResult.status}`);

    if (pollResult.status === "succeeded" || pollResult.status === "completed") {
      console.log(`
  Geracao concluida!`);
      finalResult = pollResult;
      break;
    }

    if (pollResult.status === "failed" || pollResult.status === "canceled") {
      console.error(`
  Geracao falhou: ${pollResult.status}`);
      console.error(JSON.stringify(pollResult, null, 2));
      return;
    }
  }

  if (!finalResult) {
    console.error(`  Timeout apos ${MAX_ATTEMPTS} tentativas`);
    return;
  }

  // Download video
  const videoUrl = finalResult.output?.video || finalResult.output?.url;
  if (!videoUrl) {
    console.error("  URL do video nao encontrada na resposta");
    console.error(JSON.stringify(finalResult, null, 2));
    return;
  }

  console.log(`  Baixando video de: ${videoUrl}`);
  const videoResponse = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputFilename = `${sceneId}_FT26-NAN-COMFOR_${timestamp}_raw.mp4`;
  const outputPath = path.join(RAW_OUTPUT_DIR, outputFilename);

  fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, videoBuffer);

  console.log(`  Video salvo: ${outputPath}`);
  console.log(`  Tamanho: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // Save generation metadata
  const metaPath = path.join(RAW_OUTPUT_DIR, `${sceneId}_FT26-NAN-COMFOR_${timestamp}_meta.json`);
  const meta = {
    scene_id: sceneId,
    scene_title: payload.scene_title,
    asset_id: payload.asset_id,
    generated_at: timestamp,
    prediction_id: prediction.id,
    model: "veo3-1-first-last-frame-to-video",
    video_url_source: videoUrl,
    output_file: outputFilename,
    size_bytes: videoBuffer.length,
    qa_checklist: payload.qa_checklist,
    status: "RAW_GENERATED — QA PENDING",
    next_steps: [
      "Run QA checklist against the video",
      "Upscale to 1792x1536 via Topaz Video Upscaler",
      "Retime to 60fps",
      "Export H.264 MP4 no audio to 10_FINAL_EXPORTS/",
      "Await Gate 10 legal claim approval before delivery"
    ]
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`  Metadata salva: ${metaPath}`);
}

async function main() {
  const arg = process.argv[2]?.toUpperCase() || "S01";
  const scenesToRun = arg === "ALL" ? SCENE_IDS : [arg];

  console.log("=====================================================");
  console.log("  NESTLE NAN COMFOR — Familia Comfor");
  console.log("  Veo 3.1 First+Last Frame Generation Pipeline");
  console.log("  Modelo: veo3-1-first-last-frame-to-video (eachlabs.ai)");
  console.log(`  Cenas: ${scenesToRun.join(", ")}`);
  console.log("=====================================================");

  for (const sceneId of scenesToRun) {
    try {
      await generateScene(sceneId, EACHLABS_API_KEY!);
    } catch (err) {
      console.error(`ERRO na cena ${sceneId}:`, err);
    }
  }

  console.log("");
  console.log("Pipeline concluido.");
  console.log(`Outputs em: NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/06_PRODUCTION/06_GENERATIONS_RAW/`);
}

main().catch(console.error);
