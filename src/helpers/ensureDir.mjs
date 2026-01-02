import fs from "fs";
export const ensureDir = path => fs.mkdirSync(path, { recursive: true });