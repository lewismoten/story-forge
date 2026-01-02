import { MODEL } from "../config/MODEL.mjs";

import { initLayout } from "../helpers/initLayout.mjs";
import { personaPath } from "../helpers/personaPath.mjs";
import { exists } from "../helpers/exists.mjs";
import { savePersona } from "../helpers/savePersona.mjs";
import { getWorkingFor } from "../helpers/getWorkingFor.mjs";
import { readJson } from "../helpers/readJson.mjs";
import { personaTemplatePath } from "../helpers/personaTemplatePath.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";
import { nowIso } from "../helpers/nowISO.mjs";

import { defaultPersonaSpec } from "./defaultPersonaSpec.mjs";
import { pickRandom } from "../helpers/pickRandom.mjs";

export const createPersona = (name, alias) => {
  initLayout();
  const safeAlias = safeSlug(alias ? `${name}-${alias}` : name);
  const path = personaPath(safeAlias);
  if (exists(path)) throw new Error(`Persona already exists: ${safeAlias}`);
  const templatePath = personaTemplatePath(name);
  let obj;
  if(exists(templatePath)) {
    obj = {
      name: safeAlias,
      original_persona: name,
      created_at: nowIso(),
      model: MODEL,
      previous_response_id: null,
      memory_summaries: [],
      instructions: {},
      crossPersona: {
        enabled: pickRandom([true, false]),
        borrowStrength: pickRandom(["low", "medium", "high"])
      },
    };
    obj.instructions = readJson(templatePath)
  } else {
    obj = defaultPersonaSpec(name);
    obj.name = safeAlias;
  }
  savePersona(obj);
  console.log(`Created persona -> ${getWorkingFor(path)}`);
  console.log(`Tip: open the JSON file and tweak voice/instructions anytime.`);
}