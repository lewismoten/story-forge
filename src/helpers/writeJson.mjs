import { writeText, writeTextA } from "./writeText.mjs";
export const writeJson = (path, obj) => 
  writeText(path, JSON.stringify(obj, null, 2));
export const writeJsonA = async (path, obj) =>
  writeTextA(path, JSON.stringify(obj, null, 2));