import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Expected multipart/form-data" },
        { status: 400 }
      );
    }

    const form = await req.formData();

    const prompt = (form.get("prompt") as string) || "";
    const model = (form.get("model") as string) || "veo-3.0-generate-001";
    const negativePrompt = (form.get("negativePrompt") as string) || undefined;
    const aspectRatio = (form.get("aspectRatio") as string) || undefined;
    const durationSecondsStr =
      (form.get("durationSeconds") as string) || undefined;
    const durationSeconds = durationSecondsStr
      ? parseInt(durationSecondsStr, 10)
      : undefined;
    const generateAudioStr = (form.get("generateAudio") as string) || undefined;
    const generateAudio = generateAudioStr
      ? generateAudioStr === "true"
      : undefined;
    const resolution = (form.get("resolution") as string) || undefined;
    const personGeneration =
      (form.get("personGeneration") as string) || undefined;

    const imageFile = form.get("imageFile");
    const imageBase64 = (form.get("imageBase64") as string) || undefined;
    const imageMimeType = (form.get("imageMimeType") as string) || undefined;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    let image: { imageBytes: string; mimeType: string } | undefined;

    if (imageFile && imageFile instanceof File) {
      const buf = await imageFile.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      image = { imageBytes: b64, mimeType: imageFile.type || "image/png" };
    } else if (imageBase64) {
      const cleaned = imageBase64.includes(",")
        ? imageBase64.split(",")[1]
        : imageBase64;
      image = { imageBytes: cleaned, mimeType: imageMimeType || "image/png" };
    }

    const config: Record<string, unknown> = {};
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (negativePrompt) config.negativePrompt = negativePrompt;
    if (typeof durationSeconds === "number")
      config.durationSeconds = durationSeconds;
    if (typeof generateAudio === "boolean")
      config.generateAudio = generateAudio;
    if (resolution) config.resolution = resolution;
    if (personGeneration) config.personGeneration = personGeneration;

    const operation = await ai.models.generateVideos({
      model,
      prompt,
      ...(image ? { image } : {}),
      ...(Object.keys(config).length > 0 ? { config } : {}),
    });

    const name = (operation as unknown as { name?: string }).name;
    return NextResponse.json({ name });
  } catch (error: unknown) {
    console.error("Error starting Veo generation:", error);
    return NextResponse.json(
      { error: "Failed to start generation" },
      { status: 500 }
    );
  }
}
