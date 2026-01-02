import { readText } from "./readText.mjs";
export const readJson = path => JSON.parse(readText(path));
