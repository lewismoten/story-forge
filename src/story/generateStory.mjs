import process from "process";

import OpenAI from "openai";

import { MAX_LINK_EXTRACT_CHARS } from "../config/MAX_LINK_EXTRACT_CHARS.mjs";
import { STORY_WORD_TARGET } from "../config/STORY_WORD_TARGET.mjs";

import { initLayout } from "../helpers/initLayout.mjs";
import { loadPersona } from "../helpers/loadPersona.mjs";
import { fetchLinkText } from "../ingestion/fetchLinkText.mjs";
import { truncate } from "../helpers/truncate.mjs";
import { buildWorldBibleText } from "./buildWorldBibleText.mjs";
import { buildCanonText } from "./buildCanonText.mjs";
import { countWords } from "../helpers/countWords.mjs";
import { nowIso } from "../helpers/nowISO.mjs";
import { getOutputSchema} from './getOutputSchema.mjs';
import { savePersona } from "../helpers/savePersona.mjs";
import { appendCanon } from "../helpers/appendCanon.mjs";
import { writeStory } from "../helpers/writeStory.mjs";

export const generateStory = async ({ personaName, linksCsv }) => {
  initLayout();
  const persona = loadPersona(personaName);
  if (!persona) throw new Error(`Unknown persona: ${personaName}. Create it with persona:create`);

  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY env var.");

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Fetch any “ad hoc” links for THIS story request (in addition to saved extracts).
  let adHoc = "";
  if (linksCsv) {
    const urls = linksCsv.split(",").map(s => s.trim()).filter(Boolean);
    for (const url of urls) {
      try {
        const txt = await fetchLinkText(url);
        adHoc += `\n--- AD HOC LINK: ${url} ---\n${truncate(txt, MAX_LINK_EXTRACT_CHARS)}\n`;
      } catch (err) {
        adHoc += `\n--- AD HOC LINK (failed): ${url} ---\n${String(err)}\n`;
      }
    }
  }

  const worldBible = await buildWorldBibleText();
  const canon = buildCanonText();

  const localMemory = persona.memory_summaries.slice(-12).join("\n- ");
  const localMemoryBlock = localMemory ? `PERSONA LOCAL MEMORY (most recent)\n- ${localMemory}\n` : "PERSONA LOCAL MEMORY: (none yet)\n";

  // Developer instructions = persona voice + rules
  const dev = `
You are a distinct narrative persona.

ROLE: ${persona.instructions.role}
STYLE: ${persona.instructions.style}
TIMELINE BIAS: ${persona.instructions.timelineBias}
SCOPE_OF_TRUTH: ${persona.instructions.scope_of_truth}
ALLOWED_CONTRIBUTIONS: ${persona.instructions.allowed_contributions}
STORY_FORMATS: ${persona.instructions.story_formats}

HARD RULES:
${persona.instructions.hard_rules.map(r => `- ${r}`).join("\n")}

CROSS-PERSONA:
- enabled: ${persona.crossPersona?.enabled ? "yes" : "no"}
- borrowStrength: ${persona.crossPersona?.borrowStrength || "medium"}

Output MUST be JSON only, matching the schema.
`.trim();

  // User prompt provides the shared context + specific task
  const user = `
Write one story, consistent with canon.

CONTEXT PACKETS (in priority order):
1) CANON (shared across personas)
2) WORLD BIBLE (docs + saved extracts)
3) PERSONA LOCAL MEMORY
4) AD HOC LINKS (if any)

${canon}

${worldBible}

${localMemoryBlock}

${adHoc ? `AD HOC LINKS\n${adHoc}\n` : "AD HOC LINKS: (none)\n"}

TASK:
- Write a complete story with a beginning, turn, and a clean last line.
- Continue ongoing characters/places if present; otherwise introduce at most ONE new named entity.
- Make it feel like it belongs to this persona's timeline bias.
- Keep it internally consistent.
`.trim();

const schema = getOutputSchema();
  
  // Build request
  const req = {
    model: persona.model || MODEL,
    input: [
      { role: "developer", content: dev },
      { role: "user", content: user },
    ],
    // store=true helps enable multi-turn continuity via previous_response_id (retention applies). :contentReference[oaicite:1]{index=1}
    store: true,
    // When available, you can continue state with previous_response_id. :contentReference[oaicite:2]{index=2}
    ...(persona.previous_response_id ? { previous_response_id: persona.previous_response_id } : {}),
    text: {
      format: schema
    },
  };

  const resp = await client.responses.create(req);

  // Extract text output safely
  // The SDK returns an object; easiest is to use output_text when available.
  const outText = resp.output_text || "";
  let parsed;
  try {
    parsed = JSON.parse(outText);
  } catch (e) {
    // Fallback: print raw output and abort
    console.error("Model did not return valid JSON. Raw output:\n");
    console.error(outText);
    process.exitCode = 2;
    return;
  }

  // save output;
  writeStory(personaName, parsed);

  // Validate word count and warn (don’t auto-retry to keep it simple)
  const wc = countWords(parsed.story || "");
  if (wc < 80 || wc > 120) {
    console.warn(`Warning: story is ${wc} words (target ~${STORY_WORD_TARGET}).`);
  }

  // Update persona continuity
  persona.previous_response_id = resp.id || persona.previous_response_id;

  // Update local persona memory (keep it short)
  const memLine = `${nowIso()}: ${parsed.summary}`;
  persona.memory_summaries.push(memLine);
  persona.memory_summaries = persona.memory_summaries.slice(-60);
  savePersona(persona);

  // Append shared canon entry
  appendCanon({
    when: nowIso(),
    persona: persona.name,
    summary: parsed.summary,
    new_facts: parsed.new_facts || [],
    entities: parsed.entities || { characters: [], places: [], events: [] },
    word_count: wc,
  });

  // Print story + a tiny footer
  console.log("\n" + parsed.story.trim() + "\n");
  console.log(`— (${persona.name}) wc=${wc}`);
}
