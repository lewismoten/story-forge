import fs from "fs";
import path from "path";
import { exists } from "./exists.mjs";
import { isTextOrMarkdownFile } from "./isTextOrMarkdownFile.mjs";
import { WORLD_DOCS_DIR } from "../config/WORLD_DOCS_DIR.mjs";

export const listWorldDocs = () => {
  if (!exists(WORLD_DOCS_DIR)) return [];
  return fs.readdirSync(WORLD_DOCS_DIR)
    .filter(isTextOrMarkdownFile)
    .map(name => path.join(WORLD_DOCS_DIR, name));
}