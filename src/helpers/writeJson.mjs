import { writeText } from "./writeText.mjs";
export const writeJson = (path, obj) => 
  writeText(path, JSON.stringify(obj, null, 2));