import fs from "fs";
export const exists = path => {
  try { fs.accessSync(path); return true; } catch { return false; }
}