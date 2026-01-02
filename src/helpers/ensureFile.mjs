import { exists } from "./exists.mjs";
import { writeText } from "./writeText.mjs";
export const ensureFile = (path, text="") => {
  if (!exists(path)) writeText(path, text);
}