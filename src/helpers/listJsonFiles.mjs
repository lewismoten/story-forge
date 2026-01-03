import {readdir} from "fs/promises";
import path from "path";

export const listJsonFiles = async (dir, endsWith = ".json") => {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith(endsWith))
    .map(e => path.join(dir, e.name));
}