import fs from "fs";
import { readFile } from "fs/promises";
export const readText = path => fs.readFileSync(path, "utf8");
export const readTextA = async path => await readFile(path, "utf8");
