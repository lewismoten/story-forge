import path from "path";

import { STORY_DIR } from "../config/STORY_DIR.mjs";

import { safeSlug } from "./safeSlug.mjs";
import { nowIso } from "./nowISO.mjs";
import { writeJson } from "./writeJson.mjs";
import { ensureDir } from "./ensureDir.mjs";

export const writeStory = (personaName, story) => {

  const dateSlug = safeSlug(nowIso()).split('t');
  const parts = dateSlug[0].split('-');// [YYYY, MM, DD]
  parts.push(dateSlug[1]);// time
  parts.push(safeSlug(personaName));

  const dirPath = path.join(STORY_DIR, ...parts);
  ensureDir(dirPath);

  const titleSlug = safeSlug(story.title);
  story.title_slug = titleSlug;

  const filePath = path.join(dirPath, `${titleSlug}-story.json`);

  writeJson(filePath, story);
}
