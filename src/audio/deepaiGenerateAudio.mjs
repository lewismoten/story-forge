import { DEEPAI_API_ENDPOINT } from "../config/DEEPAI_API_ENDPOINT.mjs";
import { DEEPAI_API_KEY } from "../config/DEEPAI_API_KEY.mjs";

export const deepaiGenerateAudio = async ({ prompt, sound }) => {
  const form = new FormData();

  if(sound) {
    prompt = `${prompt}\n\n${sound}`;
  }

  form.append("text", prompt);

  if(1===1) {
    console.log(prompt);
    throw new Error(`Unknown model for music-generator`);
  }

  const res = await fetch(`${DEEPAI_API_ENDPOINT}/olde`, {
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
