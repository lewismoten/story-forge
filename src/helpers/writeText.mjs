import fs from "fs";
import { writeFile } from "fs/promises";
export const writeText = (path, text) => 
  fs.writeFileSync(path, text, "utf8");
export const writeTextA = async (path, text) => 
  await writeFile(path, text, 'utf8');