import {readdir} from "fs/promises";
import path from "path";

export const listJsonFiles = async dir => {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith(".json"))
    .map(e => path.join(dir, e.name));
}