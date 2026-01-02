import path from "path";

import { STORY_DIR } from "../config/STORY_DIR.mjs";

import { safeSlug } from "./safeSlug.mjs";
import { nowIso } from "./nowISO.mjs";
import { writeJson } from "./writeJson.mjs";
import { ensureDir } from "./ensureDir.mjs";

export const writeStory = (personaName, story) => {

  const dirPath = path.join(STORY_DIR, safeSlug(personaName));
  ensureDir(dirPath);

  const filePath = path.join(dirPath, `${safeSlug(nowIso())}.json`);

  writeJson(filePath, story);
}
