import path from "path";
import { AUDIO_EXTS } from "./AUDIO_EXTS.mjs";
import { existsA } from "../helpers/exists.mjs";

export const findExistingAudioSameBasename = async (dir, baseNameNoExt) => {
  for (const ext of AUDIO_EXTS) {
    const candidate = path.join(dir, `${baseNameNoExt}-song.${ext}`);
    if (await existsA(candidate)) return candidate;
  }
  return null;
}