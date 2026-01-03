import { readdir } from "fs/promises";
import path from "path";

export const listSubdirs = async dir => {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => path.join(dir, e.name));
}