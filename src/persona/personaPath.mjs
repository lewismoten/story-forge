import path from "path";
import { safeSlug } from "./safeSlug.mjs";
import { PERSONA_DIR } from "../config/PERSONA_DIR.mjs";

export const personaPath = name => 
  path.join(PERSONA_DIR, `${safeSlug(name)}.json`);