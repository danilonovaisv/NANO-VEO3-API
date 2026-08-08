import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = (body?.prompt as string) || "";
    const model = (body?.model as string) || "gemini-2.5-flash-image-preview";
    const aspectRatio = body?.aspectRatio as string | undefined;
    const outputResolution = body?.outputResolution as string | undefined;
    const thinkingBudget = body?.thinkingBudget as number | undefined;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const config: Record<string, unknown> = {};
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (outputResolution) config.outputResolution = outputResolution;
    if (typeof thinkingBudget === "number") {
      config.thinkingConfig = { thinkingBudget };
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      ...(Object.keys(config).length > 0 ? { config } : {}),
    });

    // Process the response to extract the image
    let imageData = null;
    let imageMimeType = "image/png";

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.text) {
          console.log("Generated text:", part.text);
        } else if (part.inlineData) {
          imageData = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType || "image/png";
          break;
        }
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: {
        imageBytes: imageData,
        mimeType: imageMimeType,
      },
    });
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
