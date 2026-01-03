import { DEEPAI_API_ENDPOINT } from "../config/DEEPAI_API_ENDPOINT.mjs";
import { DEEPAI_API_KEY } from "../config/DEEPAI_API_KEY.mjs";

export const deepaiGenerateImage = async ({ prompt, style }) => {
  const form = new FormData();
  form.append("text", prompt);
  if (style && String(style).trim()) {
    form.append("style", String(style).trim());
  }
  // width,height 128-1536 (default 512), multiples of 32; keep between 256-700
  form.append("width",  512);
  form.append("height",  512);
  // image_generator_version: (standard), hd, genius, super_genius
  form.append("image_generator_version",  "standard");
  // resolution: (2k) 4k [super_genius only]
  // genius_preference: anime, photography, graphic, cinematic [genius only]
  // negative_prompt: string of what is removed from the image

  const res = await fetch(DEEPAI_API_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": DEEPAI_API_KEY,
    },
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `DeepAI error ${res.status} ${res.statusText}: ${errText}`.slice(0, 800)
    );
  }

  const data = await res.json();
  const outputUrl = data.output_url || data.outputUrl || data.url;
  if (!outputUrl) {
    throw new Error(`DeepAI response missing output_url: ${JSON.stringify(data).slice(0, 500)}`);
  }

  return { outputUrl, raw: data };
}
