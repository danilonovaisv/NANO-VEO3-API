**nano-banana-json-prompting**
---
**Generates perfect, professional structured JSON prompts for Google's Nano Banana AI image generation models (Nano Banana 2 / Flash, Nano Banana Pro, Nano Banana 2 Lite). Use when the user asks for Nano Banana JSON prompts, structured image generation prompts, character consistency schemas, product photography setups, or technical camera and lighting JSON configurations for Gemini image models.**
---
# nano-banana-json-prompting
A comprehensive skill for engineering precise, production-ready JSON prompts for the Google Nano Banana AI image generation ecosystem (Nano Banana 2 / Gemini 3.1 Flash Image, Nano Banana Pro / Gemini 3 Pro Image, Nano Banana 2 Lite / Gemini 3.1 Flash-Lite Image).

JSON prompting isolates visual variables into structured key-value pairs, preventing concept bleeding, eliminating natural language ambiguity, and enabling repeatable high-fidelity outputs across batches and automated creative pipelines.

## When to Use

Activate this skill whenever the user asks to:

- Create or convert an image concept into a structured JSON prompt for Nano Banana / Gemini models.
- Build prompts for Nano Banana Pro (`gemini-3-pro-image`), Nano Banana 2 (`gemini-3.1-flash-image`), or Nano Banana 2 Lite (`gemini-3.1-flash-lite-image`).
- Setup character consistency profiles, product photography mockups, editorial fashion portraits, architecture visualizations, or isometric infographics.
- Configure precise optical camera settings (lens models, focal lengths, aperture, ISO), studio lighting, or strict negative constraints (prohibitions).

## Core Principles

- **Structure Over Tag Soup**: Avoid unstructured adjectival lists ("tag soups"). Group instructions into logical categories (Subject, Scene, Camera, Lighting, Typography, Constraints).
- **Single-Generation Philosophy**: Invest in complete upfront prompt engineering rather than iterative conversational edits to prevent generative drift.
- **Anti-Plastic Skin Protocol**: Always specify realistic skin micro-textures (`visible pores, fine lines, subtle skin imperfections, unretouched photography`) and exclude plastic smoothing in prohibitions.
- **Verifiable Constraints**: Use the SCHEMA framework method (Luca Cazzaniga, arXiv:2602.18903) to define verifiable `mandatory` inclusions and explicit `prohibitions`.

## Master JSON Schema

```json
{
  "meta": {
    "target_model": "gemini-3-pro-image",
    "aspect_ratio": "16:9",
    "resolution": "4K",
    "thinking_level": "high",
    "search_grounding": false
  },
  "subject": {
    "type": "portrait | product | architecture | scene | character",
    "description": "Primary subject description with physical traits, clothing, and action",
    "material_properties": "Substantiated surface materials, textures, and finish",
    "micro_details": "Visible skin pores, subtle expression lines, unretouched skin texture"
  },
  "scene": {
    "location": "Environment setting and spatial context",
    "atmosphere": "Ambient conditions, mood, weather, or air particles",
    "background": "Depth of field details, background elements, and bokeh description"
  },
  "camera": {
    "body": "Sony A7IV / Hasselblad H6D-100c / Canon R5",
    "lens": "85mm f/1.4 GM / 100mm Macro / 24mm f/1.4",
    "focal_length": "85mm",
    "aperture": "f/1.8",
    "iso": 100,
    "shutter_speed": "1/250s",
    "angle": "Eye-level medium close-up",
    "depth_of_field": "Shallow depth of field with soft creamy bokeh"
  },
  "lighting": {
    "setup": "Three-point studio lighting / Golden hour natural side-lighting",
    "key_light": "Large softbox key light at 45 degrees camera right",
    "fill_light": "Neutral diffused reflector camera left",
    "rim_light": "Subtle warm hair light from behind",
    "color_temperature": "5500K"
  },
  "typography": {
    "text_content": "EXACT TEXT STRING",
    "font_style": "Bold elegant sans-serif / Vintage serif",
    "placement": "Top center overlay",
    "language": "en"
  },
  "constraints": {
    "mandatory": [
      "Must include exact brand logo placement on product surface",
      "Realistic contact shadows on ground plane"
    ],
    "prohibitions": [
      "smooth plastic skin",
      "CGI render look",
      "blurry text",
      "distorted anatomy",
      "over-saturated artificial filters",
      "extra fingers"
    ]
  }
}
```

## Model Selection Matrix

| Model | API Identifier | Key Capabilities | Best Used For |
| - | - | - | - |
| Nano Banana Pro | `gemini-3-pro-image` | High fidelity, 16-bit pipeline, 4K native, up to 14 reference images, 5 character consistency slots | Hero product photography, high-end editorial, accurate typography, complex infographics |
| Nano Banana 2 | `gemini-3.1-flash-image` | Fast (~3-5s), 4K output, Web & Image Search Grounding, Thinking Mode (Minimal/High), up to 14 reference images | UGC content, e-commerce volume, real-time grounded scenes, social media assets |
| Nano Banana 2 Lite | `gemini-3.1-flash-lite-image` | Ultra-fast (~1.5-3s), low cost, 1K resolution | Prototyping, storyboard sketches, rapid concept iterations |

## Technical Parameter Guidelines

### Camera & Optics

- **Portraits**: `Hasselblad H6D-100c` or `Sony A7IV` + `85mm f/1.4` at `f/1.8`, `ISO 100`.
- **Macro & Products**: `100mm Macro f/2.8` lens at `f/4`, `ISO 100`, high specular reflections.
- **Architecture**: `24mm f/1.4` tilt-shift wide angle at `f/8`, `ISO 100` for crisp corner-to-corner sharp focus.
- **Street / Vintage**: `Fujifilm X100V` or `35mm film` with subtle grain and natural color grading.
- **ISO Limit**: Keep ISO between 100 and 400. High ISO settings trigger unwanted digital art smoothing.

### Studio Lighting Setups

- **Commercial Product**: Three-point softbox setup (`Key: Softbox 45deg`, `Fill: Reflector`, `Rim: Accent light`).
- **Dramatic Portrait**: Rembrandt lighting, chiaroscuro contrast with warm key light and deep dark shadows.
- **Outdoors**: Golden hour backlighting (3200K temperature) with long soft warm directional shadows.

### Typography Rules

- Limit text strings to 20-25 characters max.
- Always encapsulate text in exact quotes within `typography.text_content`.
- Specify font family (e.g., `Century Gothic`, `Helvetica Neue Bold`, `Garamond Serif`).

### Multi-Reference Stacks (Character Consistency)

- Up to 14 reference images supported on Nano Banana 2 / Pro.
- Allocate slots: 3 facial angle anchors (front, profile, 3/4), 2 clothing/style anchors, 1-2 product anchors.

## Workflow Steps for Generating Prompts

1. **Analyze Request**: Identify subject type, target model, lighting requirement, composition, and specific constraints.
2. **Draft JSON Payload**: Populate the Master Schema. Remove irrelevant keys (e.g., drop skin/hair fields for non-human subjects).
3. **Inject Specific Optical & Lighting Data**: Specify exact camera body, lens, focal length, aperture, ISO, and Kelvin temperature.
4. **Validate Schema**: Ensure clean JSON structure with valid syntax.
5. **Present Output**: Deliver the raw formatted JSON block followed by brief operational tips.

## Gotchas

- **Do Not Mix Contradictory Lenses**: Never combine wide-angle (24mm) and telephoto (200mm) specs in the same prompt.
- **Avoid Vague Words**: Replace qualitative words like "beautiful" or "hyper-realistic" with technical specs (`f/1.8`, `5500K`, `visible pores`).
- **Do Not Re-edit Iteratively**: Gemini 3 models suffer from generative drift when iteratively re-edited via chat. Use a complete upfront JSON payload.
