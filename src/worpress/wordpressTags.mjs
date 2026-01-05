import { TAG_DIR } from "../config/TAG_DIR.mjs";
import { ensureDir } from "../helpers/ensureDir.mjs";
import { existsA } from "../helpers/exists.mjs";
import { readJsonA } from "../helpers/readJson.mjs";
import { renameA } from "../helpers/rename.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";
import { writeJsonA } from "../helpers/writeJson.mjs";
import { sortKeys } from "../helpers/sortKeys.mjs";
import { lCase } from "../helpers/lCase.mjs";
import path from "path";

let cache = {};

export const wpTags = (baseUrl) => {
  const slug = safeSlug(baseUrl);
  let tagFile = `${slug}.json`;
  ensureDir(TAG_DIR);
  let tagFilePath = path.join(TAG_DIR, tagFile);

  const getCache = async () => {
    if (slug in cache) return cache[slug];
    ensureDir(TAG_DIR);
    if (await existsA(tagFilePath))
      cache[slug] = await readJsonA(tagFilePath);
    else cache[slug] = {};
    return cache[slug];
  }
  const setCache = async (newCache) => {
    cache[slug] = newCache;
    await writeJsonA(tagFilePath + '.tmp', newCache);
    await renameA(tagFilePath + '.tmp', tagFilePath);
  }
  const getId = async tag => (await getCache())[lCase(tag)];
  const setId = async (tag, id) => {
    const cache = await getCache();
    cache[lCase(tag)] = id;
    const sorted = sortKeys(cache);
    await setCache(sorted);
  }
  return { getId, setId };
}
