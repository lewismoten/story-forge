import { readText, readTextA } from "./readText.mjs";
export const readJson = path => JSON.parse(readText(path));
export const readJsonA = async path => JSON.parse(await readTextA(path));