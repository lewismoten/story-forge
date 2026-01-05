import { personaPath } from "./personaPath.mjs";
import { exists, existsA } from "../helpers/exists.mjs";
import { readJson, readJsonA } from "../helpers/readJson.mjs";

export const loadPersona = name => {
  const path = personaPath(name);
  return exists(path) ? readJson(path) : null;
}
export const loadPersonaA = async name => {
  const path = personaPath(name);
  const e = await existsA(path);
  return e ? await readJsonA(path) : null;
}
