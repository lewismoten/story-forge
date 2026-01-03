import { nowIso } from "./nowISO.mjs";
import { writeJson } from "./writeJson.mjs";

export const saveStory = (filePath, story) => {
  story.updated = nowIso();
  writeJson(filePath, story);
}
