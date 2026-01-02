import fs from "fs";
import { CANON_JSONL } from "../config/CANON_JSONL.mjs";
export const appendCanon = (entry) => {
  const line = JSON.stringify(entry);
  fs.appendFileSync(CANON_JSONL, line + "\n", "utf8");
}