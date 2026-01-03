import path from "path";
import { AUDIO_EXTS } from "./AUDIO_EXTS.mjs";

export const audioExtFromUrl = url => {
  try {
    const u = new URL(url);
    const ext = path.extname(u.pathname).toLowerCase().replaceAll(/\./g, '');
    if (AUDIO_EXTS.includes(ext)) return ext;
  } catch {}
  return null;
}