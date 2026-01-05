import { personaPath } from "../helpers/personaPath.mjs";
import { writeJson, writeJsonA } from "../helpers/writeJson.mjs";

export const savePersona = (obj) => writeJson(personaPath(obj.name), obj);

export const savePersonaA = async (obj) => await writeJsonA(personaPath(obj.name), obj);
