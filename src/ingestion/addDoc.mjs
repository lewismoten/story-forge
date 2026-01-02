import path from "path";

import { WORLD_DOCS_DIR } from "../config/WORLD_DOCS_DIR.mjs";

import { initLayout } from "../helpers/initLayout.mjs";
import { readText } from "../helpers/readText.mjs";
import { writeText } from "../helpers/writeText.mjs";
import { workingDir } from "../helpers/workingDir.mjs";
import { getWorkingFor } from "../helpers/getWorkingFor.mjs";

export const addDoc = filePath => {
  initLayout();
  const abs = path.resolve(workingDir(), filePath);
  if (!exists(abs)) throw new Error(`Doc not found: ${abs}`);
  const base = path.basename(abs);
  const target = path.join(WORLD_DOCS_DIR, base);
  writeText(target, readText(abs));
  console.log(`Added doc -> ${getWorkingFor(target)}`);
}