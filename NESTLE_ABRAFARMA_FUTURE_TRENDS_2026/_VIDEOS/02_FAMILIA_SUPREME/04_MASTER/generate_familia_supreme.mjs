import fs from "fs";
import path from "path";

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

async function uploadFrameToEachlabs(framePath, apiKey) {
  const absPath = path.join(process.cwd(), framePath);
  const fileBuffer = fs.readFileSync(absPath);
  const base64 = fileBuffer.toString("base64");
  const mimeType = "image/png";

  console.log(`  Uploading ${path.basename(absPath)}...`);

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
    throw new Error(`Upload failed: ${response.status} - ${err}`);
  }

  const result = await response.json();
  console.log(`  Upload done: ${result.url}`);
  return result.url;
}

async function generateScene(sceneId, apiKey) {
  const jsonFile = fs
    .readdirSync(MASTER_DIR)
    .find(
      (f) =>
        f.startsWith(sceneId + "_") &&
        f.endsWith(".json") &&
        !f.includes("BATCH")
    );

  if (!jsonFile) {
    console.error(`Payload not found for ${sceneId}`);
    return;
  }

  const payloadPath = path.join(MASTER_DIR, jsonFile);
  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));

  console.log(`\nDispatching: ${sceneId} - ${payload.scene_title}`);

  const firstFrameUrl = await uploadFrameToEachlabs(
    payload.input_frames.first_frame_path,
    apiKey
  );
  const lastFrameUrl = await uploadFrameToEachlabs(
    payload.input_frames.last_frame_path,
    apiKey
  );

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
    throw new Error(`Dispatch failed: ${dispatchResponse.status} - ${err}`);
  }

  const prediction = await dispatchResponse.json();
  console.log(`  Prediction ID: ${prediction.id}`);

  let finalResult = null;
  let attempts = 0;
  while (attempts < 80) {
    await new Promise((r) => setTimeout(r, 15000));
    attempts++;

    const pollResponse = await fetch(
      `https://api.eachlabs.ai/v1/prediction/${prediction.id}`,
      {
        headers: { "X-API-Key": apiKey },
      }
    );

    if (!pollResponse.ok) continue;

    const pollResult = await pollResponse.json();
    process.stdout.write(
      `  [${new Date().toISOString()}] Status: ${pollResult.status}\r`
    );

    if (
      pollResult.status === "succeeded" ||
      pollResult.status === "completed"
    ) {
      console.log("\n  Generation complete!");
      finalResult = pollResult;
      break;
    }

    if (pollResult.status === "failed" || pollResult.status === "canceled") {
      console.error(`\n  Failed: ${pollResult.status}`);
      return;
    }
  }

  if (!finalResult) return;

  const videoUrl = finalResult.output?.video || finalResult.output?.url;
  const videoResponse = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputFilename = `${sceneId}_FT26-NAN-SUPREME_${timestamp}_raw.mp4`;
  const outputPath = path.join(RAW_OUTPUT_DIR, outputFilename);

  fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, videoBuffer);

  console.log(`  Saved: ${outputPath}`);
}

async function main() {
  const arg = process.argv[2]?.toUpperCase() || "S01";
  const scenesToRun = arg === "ALL" ? SCENE_IDS : [arg];

  for (const sceneId of scenesToRun) {
    await generateScene(sceneId, EACHLABS_API_KEY);
  }
}

main().catch(console.error);
