import fs from "fs";
import fsp from "fs/promises";
export const rename = (oldPath, newPath) => fs.renameSync(oldPath, newPath);
export const renameA = async (oldPath, newPath) => 
  await fsp.rename(oldPath, newPath);
