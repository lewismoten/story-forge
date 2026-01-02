import { personaPath } from "./personaPath.mjs";
import { writeJson } from "./writeJson.mjs";

export const savePersona = (obj) => writeJson(personaPath(obj.name), obj);
