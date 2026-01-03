import path from "path";
import { IMAGE_EXTS } from "./IMAGE_EXTS.mjs";
import { existsA } from "../helpers/exists.mjs";

export const findExistingImageSameBasename = async (dir, baseNameNoExt) => {
  for (const ext of IMAGE_EXTS) {
    const candidate = path.join(dir, `${baseNameNoExt}-feature-image.${ext}`);
    if (await existsA(candidate)) return candidate;
  }
  return null;
}