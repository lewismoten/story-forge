import { exists } from "./exists.mjs";
import { readText } from "./readText.mjs";
import { CANON_JSONL } from "../config/CANON_JSONL.mjs";

export const readCanonTailLines = (maxLines) => {
  if (!exists(CANON_JSONL)) return [];
  const lines = readText(CANON_JSONL).split("\n").filter(Boolean);
  return lines.slice(Math.max(0, lines.length - maxLines)).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
}