import fs from "fs";
import path from "path";

/**
 * Script: generate_familia_supreme.ts
 * Dispara geracao de video via eachlabs.ai (veo3-1-first-last-frame-to-video)
 * Uso: npx tsx NESTLE_ABRAFARMA_FUTURE_TRENDS_2026/_VIDEOS/02_FAMILIA_SUPREME/04_MASTER/generate_familia_supreme.ts [S01|S02|S03|S04|S05|ALL]
 *
 * Requer: EACHLABS_API_KEY no .env ou variavel de ambiente
 */

if (fs.existsSync(path.join(process.cwd(), ".env"))) {
  const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
  for (const line of envContent.split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && v.length > 0 && !process.env[k.trim()]) {
      process.env[k.trim()] = v
        .join("=")
        .trim()
        .replace(/^["']|["']$/g, "");
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
  "_VIDEOS",
  "02_FAMILIA_SUPREME",
  "04_MASTER"
);

const RAW_OUTPUT_DIR = path.join(
  process.cwd(),
  "NESTLE_ABRAFARMA_FUTURE_TRENDS_2026",
  "06_PRODUCTION",
  "06_GENERATIONS_RAW"
);

const SCENE_IDS = ["S01"];

async function uploadFrameToEachlabs(
  framePath: string,
  apiKey: string
): Promise<string> {
  const absPath = path.join(process.cwd(), framePath);
  const fileBuffer = fs.readFileSync(absPath);
  const base64 = fileBuffer.toString("base64");
  const mimeType = "image/png";

  console.log(`  Fazendo upload de ${path.basename(absPath)}...`);

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
    throw new Error(`Upload falhou: ${response.status} - ${err}`);
  }

  const result = (await response.json()) as { url: string };
  console.log(`  Upload concluido: ${result.url}`);
  return result.url;
}

async function generateScene(sceneId: string, apiKey: string): Promise<void> {
  const jsonFile = fs
    .readdirSync(MASTER_DIR)
    .find(
      (f) =>
        f.startsWith(sceneId + "_") &&
        f.endsWith(".json") &&
        !f.includes("BATCH")
    );

  if (!jsonFile) {
    console.error(`Payload nao encontrado para ${sceneId} em ${MASTER_DIR}`);
    return;
  }

  const payloadPath = path.join(MASTER_DIR, jsonFile);
  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));

  console.log(
    `\nIniciando geracao da cena: ${sceneId} - ${payload.scene_title}`
  );
  console.log(`Asset: ${payload.asset_id}`);
  console.log(`Modelo: ${payload.model_strategy.recommended_model}`);

  const firstFrameUrl = await uploadFrameToEachlabs(
    payload.input_frames.first_frame_path,
    apiKey
  );
  const lastFrameUrl = await uploadFrameToEachlabs(
    payload.input_frames.last_frame_path,
    apiKey
  );

  console.log("  Enviando requisicao de predicao para eachlabs.ai...");
  const dispatchResponse = await fetch(
    "https://api.eachlabs.ai/v1/prediction",
    {
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
          duration: 5,
          resolution: "1080p",
          generate_audio: false,
          aspect_ratio: "16:9",
        },
      }),
    }
  );

  if (!dispatchResponse.ok) {
    const err = await dispatchResponse.text();
    throw new Error(`Dispatch falhou: ${dispatchResponse.status} - ${err}`);
  }

  const prediction = (await dispatchResponse.json()) as {
    id: string;
    status: string;
  };
  console.log(`  Predicao criada! ID: ${prediction.id}`);
  console.log("  Aguardando conclusao (polling)...");

  let finalResult: {
    id: string;
    status: string;
    output?: { video?: string; url?: string };
  } | null = null;
  let attempts = 0;
  const MAX_ATTEMPTS = 80;

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

    const pollResult = (await pollResponse.json()) as {
      id: string;
      status: string;
      output?: { video?: string; url?: string };
    };
    process.stdout.write(
      `  [${new Date().toISOString()}] Status: ${pollResult.status}\r`
    );

    if (
      pollResult.status === "succeeded" ||
      pollResult.status === "completed"
    ) {
      console.log("\n  Geracao concluida com sucesso!");
      finalResult = pollResult;
      break;
    }

    if (pollResult.status === "failed" || pollResult.status === "canceled") {
      console.error(`\n  Geracao falhou: ${pollResult.status}`);
      console.error(JSON.stringify(pollResult, null, 2));
      return;
    }
  }

  if (!finalResult) {
    console.error(`\n  Timeout apos ${MAX_ATTEMPTS} tentativas`);
    return;
  }

  const videoUrl = finalResult.output?.video || finalResult.output?.url;
  if (!videoUrl) {
    console.error("  URL do video nao encontrada na resposta");
    console.error(JSON.stringify(finalResult, null, 2));
    return;
  }

  console.log(`  Baixando video: ${videoUrl}`);
  const videoResponse = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputFilename = `${sceneId}_FT26-NAN-SUPREME_${timestamp}_raw.mp4`;
  const outputPath = path.join(RAW_OUTPUT_DIR, outputFilename);

  fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, videoBuffer);

  console.log(`  Video salvo em: ${outputPath}`);

  const metaPath = path.join(
    RAW_OUTPUT_DIR,
    `${sceneId}_FT26-NAN-SUPREME_${timestamp}_meta.json`
  );
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
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`  Metadata salva em: ${metaPath}`);
}

async function main() {
  const arg = process.argv[2]?.toUpperCase() || "S01";
  const scenesToRun = arg === "ALL" ? SCENE_IDS : [arg];

  console.log("=====================================================");
  console.log("  NESTLE NAN SUPREME — Familia Supreme");
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

  console.log("\nPipeline concluido.");
}

main().catch(console.error);
