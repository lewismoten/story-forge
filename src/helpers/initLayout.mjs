import { DATA_DIR } from "../config/DATA_DIR.mjs";
import { PERSONA_DIR } from "../config/PERSONA_DIR.mjs";
import { WORLD_DIR } from "../config/WORLD_DIR.mjs";
import { WORLD_DOCS_DIR } from "../config/WORLD_DOCS_DIR.mjs";
import { WORLD_LINKS_DIR } from "../config/WORLD_LINKS_DIR.mjs";
import { CANON_JSONL } from "../config/CANON_JSONL.mjs";
import { STORY_DIR } from "../config/STORY_DIR.mjs";
import { ensureDir } from "./ensureDir.mjs";
import { ensureFile } from "./ensureFile.mjs";

export const initLayout = () => {
  ensureDir(DATA_DIR);
  ensureDir(PERSONA_DIR);
  ensureDir(WORLD_DIR);
  ensureDir(WORLD_DOCS_DIR);
  ensureDir(WORLD_LINKS_DIR);
  ensureDir(STORY_DIR);
  ensureFile(CANON_JSONL, "");
}