import fs from "fs";
import path from "path";
import { exists } from "./exists.mjs";
import { isTextFile } from "./isTextFile.mjs";
import { WORLD_LINKS_DIR } from "../config/WORLD_LINKS_DIR.mjs";

export const listLinkExtracts = () => {
  if (!exists(WORLD_LINKS_DIR)) return [];
  return fs.readdirSync(WORLD_LINKS_DIR)
    .filter(isTextFile)
    .map(name => path.join(WORLD_LINKS_DIR, name));
}