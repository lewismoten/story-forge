import { personaPath } from "./personaPath.mjs";
import { exists } from "./exists.mjs";
import { readJson } from "./readJson.mjs";

export const loadPersona = name => {
  const path = personaPath(name);
  return exists(path) ? readJson(path) : null;
}
