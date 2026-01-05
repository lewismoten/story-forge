import process from "process";

import OpenAI from "openai";

import { MAX_LINK_EXTRACT_CHARS } from "../config/MAX_LINK_EXTRACT_CHARS.mjs";

import { MODEL } from '../config/MODEL.mjs';
import { initLayout } from "../helpers/initLayout.mjs";
import { fetchLinkText } from "../ingestion/fetchLinkText.mjs";
import { truncate } from "../helpers/truncate.mjs";
import { nowIso } from "../helpers/nowISO.mjs";
import { getPersonaOutputSchema } from './getPersonaOutputSchema.mjs';
import { uuid } from '../helpers/uuid.mjs';
import { safeSlug } from "../helpers/safeSlug.mjs";
import { personaPath } from "../helpers/personaPath.mjs";
import { exists } from "../helpers/exists.mjs";
import { buildWorldBibleText } from "../world/buildWorldBibleText.mjs";
import { buildCanonText } from "../world/buildCanonText.mjs";
import { adjustResponseSchemaFormat } from "../helpers/JsonSchema/adjustResponseSchemaFormat.mjs";
import { writeText } from "../helpers/writeText.mjs";
import { savePersona } from './savePersona.mjs';

export const generatePersona = async ({ userRequest = "none", linksCsv }) => {
  initLayout();

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

  // Developer instructions = persona voice + rules
  const dev = `
You are Story Forge: a author generator for an in-world multi-author blog.

Goal:
Generate exactly ONE author object that matches the provided JSON Schema. Output must be valid JSON and must conform to the schema strictly.

Inputs you will receive in the user message:
1) CANON (shared across personas): facts/events/entities that are authoritative.
2) WORLD BIBLE (docs + saved extracts): broader setting references; treat as supportive unless it contradicts CANON.
3) USER REQUEST: the specific persona concept to generate (tone, role, constraints).

Rules:
- The author is a new character that is not in the CANON or WORLD BIBLE
- Treat CANON as highest priority. Do not contradict it.
- WORLD BIBLE may be incomplete, biased, or fragmentary; use it to add flavor and compatibility.
- Keep all names, handles, affiliations, and tags “in-world” (blog vibe).
- Fill every required field. Respect enums, max lengths, patterns.
- Keep bios punchy and public-facing; avoid real-world references to “AI,” “OpenAI,” “ChatGPT,” or “prompting” unless CANON explicitly contains it.
- Relationships are optional; include only if USER REQUEST references known personas.
- Publishing rules should be internally consistent (min <= max, etc.).
- If the resulting output does not match the JSON schema, rework it to fit the JSON schema.

Output MUST be JSON only, matching the schema.
`.trim();

  // User prompt provides the shared context + specific task
  const user = `
[CANNON]
${canon}

[WORLD_BIBLE]
${worldBible}

[USER_REQUEST]
${userRequest}
`.trim();

  const schema = getPersonaOutputSchema()
  adjustResponseSchemaFormat(schema);

  // console.log('age:',schema.schema.properties.profile.properties.age);
  //     process.exitCode = 2;
  //   return;

  // Build request
  const req = {
    model: MODEL,
    input: [
      { role: "developer", content: dev },
      { role: "user", content: user },
    ],
    store: false,
    text: {
      format: schema
    },
  };

  const resp = await client.responses.create(req);

  let outText = resp.output_text || "";
  outText = outText
    .replace(/^\s*```(json)?\s*/i, '')
    .replace(/\s*```\s*$/, '');
  let parsed;
  try {
    parsed = JSON.parse(outText);
  } catch (e) {
    const badName = `invalid-json.${safeSlug(nowIso())}.json`;
    console.error("Model did not return valid JSON. see:", `./${badName}`);
    writeText(badName, outText);
    process.exitCode = 2;
    return;
  }

  const id = uuid();
  parsed.generator = {
    id,
    created_at: nowIso(),
    userRequest
  };

  try {
    const {
      first_name,
      last_name,
      avatar_name,
      user_name,
      bio
    } = parsed.personalization;

    parsed.memory_summaries = [];

    // temp to inject info for blog (YOU NEED TO CHANGE THIS)
    parsed.personalization.email = `${user_name}@story-forge.lewismoten.com`;
    parsed.personalization.website = `https://story-forge.lewismoten.com/author/milo-stars/${user_name}`;
    parsed.blogs = {
      "story-forge": {
        "type": "wordpress",
        "baseUrl": "https://story-forge.lewismoten.com",
        "username": user_name,
        "appPassword": "aaaa bbbb cccc dddd eeee ffff"
      }
    };
    parsed.name = safeSlug(parsed.name);
    const personaFile = personaPath(parsed.name);
    if (exists(personaFile)) throw new Error(`Persona already exists: ${parsed.name}`);
    savePersona(parsed);

    console.log(`— ${parsed.name}: ${first_name} ${last_name} "${avatar_name}" ${bio}`);
  } catch (e) {
    const badName = `err-reading.${safeSlug(nowIso())}.json`;
    console.error("Error reading JSON. see:", `./${badName}`);
    console.error(e);
    writeText(badName, outText);
    process.exitCode = 2;
    return;

  }
}
