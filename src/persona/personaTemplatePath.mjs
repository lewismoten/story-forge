import path from "path";
import { PERSONA_TEMPLATE_DIR } from "../config/PERSONA_TEMPLATE_DIR.mjs";
import { safeSlug } from "./safeSlug.mjs";

export const personaTemplatePath = name => 
  path.join(PERSONA_TEMPLATE_DIR, `${safeSlug(name)}.json`);