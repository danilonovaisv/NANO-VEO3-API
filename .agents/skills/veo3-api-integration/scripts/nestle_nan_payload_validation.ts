import fs from "fs";
import path from "path";

/**
 * Script de compilação e validação do payload Nestlé NAN COMFOR para Veo 3 / Veo 3.1.
 */

const inputDir = path.join(process.cwd(), "public", "input");
const outputDir = path.join(process.cwd(), "public", "output");

const frame1Path = path.join(inputDir, "FRAME-1-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png");
const frame2Path = path.join(inputDir, "FRAME-2-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png");

console.log("🔍 [Orchestrator] Auditando arquivos de entrada em public/input...");

if (!fs.existsSync(frame1Path)) {
  console.error("❌ ERRO: FRAME-1 não foi encontrado no diretório public/input.");
  process.exit(1);
}

if (!fs.existsSync(frame2Path)) {
  console.error("❌ ERRO: FRAME-2 não foi encontrado no diretório public/input.");
  process.exit(1);
}

const frame1Stats = fs.statSync(frame1Path);
const frame2Stats = fs.statSync(frame2Path);

console.log(`✅ FRAME-1 encontrado: ${(frame1Stats.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`✅ FRAME-2 encontrado: ${(frame2Stats.size / (1024 * 1024)).toFixed(2)} MB`);

// 🎬 Prompt Cinematográfico Master para Veo 3 / Veo 3.1 First & Last Frame
const masterVeo3Prompt = `Ultra-premium CGI commercial hero product reveal for Nestlé NAN COMFOR (16:9 4K).
Seamless first-to-last frame interpolation starting exactly as FRAME-1 and ending exactly as FRAME-2.

STRICT BRAND PRESERVATION:
Preserve exact package geometry, proportions, scale, label placement, typography, Nestlé NAN COMFOR brand identity, magenta-to-purple background gradient, and visible text throughout the entire animation. Maintain perfect packaging legibility at every frame. Preserve the stylized white bird with magenta outlines, pointed beak, rounded body and wing proportions exactly as shown on packaging artwork.

CREATIVE DIRECTION & LIGHTING:
- Environment: Minimal premium virtual studio with branded magenta-purple gradient background, luminous circular arcs, molecular structures, soft hexagonal overlays, floating light particles.
- Style: Ultra-premium advertising CGI, clean luxury composition, high micro-contrast, product-first framing.
- Lens & Focus: 70mm full-frame lens, continuous sharp focus on products, locked frontal camera position.
- Lighting: Large diffused frontal key light, low-intensity magenta ambient fill, subtle magenta-violet rim light defining cylindrical metal can edges, soft volumetric additive glow.
- Materials: Printed coated metal cans with accurate metallic reflections, glossy illuminated seal with soft bloom, clean matte white bird graphic with saturated magenta outline.

TIMELINE EXECUTION (0.00s - 8.00s):
- 0.00s - 0.80s: Scene opens on empty branded magenta-purple background matching FRAME-1. Futuristic interface graphics, circular arcs, molecular nodes, fine luminous lines, and floating particles drift inward from lateral edges. Locked camera.
- 0.80s - 1.70s: The stylized white bird with magenta outline rises from behind the camera. Large wing passes close to lens creating a clean foreground wipe. Fast creative crash zoom follows the bird briefly before returning to locked hero framing. Bird flies toward center with controlled wingbeats.
- 1.70s - 2.60s: Rear-left Nestlé NAN COMFOR package rises vertically from central glow, easing into rear-left position. Metallic reflections stabilize.
- 2.60s - 3.50s: Rear-right Nestlé NAN COMFOR package emerges from central glow, rises vertically and settles into mirrored rear-right position.
- 3.50s - 4.50s: Front-center Nestlé NAN COMFOR package rises with a strong luminous pulse and settles into foreground hero position.
- 4.50s - 5.70s: Stylized bird performs a restrained circular glide above packages, gently descends and lands inside the front-center package artwork. Bird remains subtly animated with slight head movement.
- 5.70s - 6.60s: Rear-left package slides slightly farther left; rear-right package slides slightly farther right. Center package remains stationary as visual anchor.
- 6.60s - 8.00s: Glowing particles converge in lower-right. Light rays condense into the illuminated '#1' seal, resolving precisely into the exact badge shown in FRAME-2. Scene perfectly aligns with FRAME-2 at 8.00s.`;

const negativePromptList = [
  "deformed packaging",
  "incorrect proportions",
  "label distortion",
  "illegible text",
  "brand replacement",
  "logo alteration",
  "color shift",
  "additional products",
  "extra objects",
  "people",
  "hands",
  "utensils",
  "text overlays",
  "subtitles",
  "watermarks",
  "camera cuts",
  "camera shake except intentional crash zoom",
  "background replacement",
  "incorrect bird design",
  "bird color changes",
  "missing technological graphics",
  "particle explosion",
  "excessive bloom",
  "lens dirt",
  "chromatic aberration",
  "motion blur obscuring labels",
  "package intersection",
  "floating packages after settling",
  "physics glitches",
  "identity drift",
  "hallucinated graphics"
];

const compiledPayload = {
  platform: "veo_3_1",
  model: "veo3-1-first-last-frame-to-video",
  duration_seconds: 8,
  aspect_ratio: "16:9",
  resolution: "4k",
  visual_anchors: {
    first_frame_path: "public/input/FRAME-1-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png",
    last_frame_path: "public/input/FRAME-2-Família_Comfor_FT26-LED01_CURVO-001_1792×1536px.png"
  },
  prompt: masterVeo3Prompt,
  negative_prompt: negativePromptList.join(", "),
  config: {
    aspectRatio: "16:9",
    durationSeconds: 8,
    generateAudio: false
  }
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const payloadOutputPath = path.join(outputDir, "nestle_nan_veo3_payload.json");
fs.writeFileSync(payloadOutputPath, JSON.stringify(compiledPayload, null, 2), "utf8");

console.log(`✅ Payload compilado com sucesso e salvo em: ${payloadOutputPath}`);
console.log(`🎬 Prompt Master Veo 3 gerado (${masterVeo3Prompt.length} caracteres)`);
