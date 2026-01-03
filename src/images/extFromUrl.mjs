import path from "path";
import { IMAGE_EXTS } from "./IMAGE_EXTS.mjs";

export const extFromUrl = url => {
  try {
    const u = new URL(url);
    const ext = path.extname(u.pathname).toLowerCase().replace(/^\./,'');
    if (IMAGE_EXTS.includes(ext)) return ext;
  } catch {}
  return null;
}