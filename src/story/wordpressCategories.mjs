import { CATEGORY_DIR } from "../config/CATEGORY_DIR.mjs";
import { ensureDir } from "../helpers/ensureDir.mjs";
import { existsA } from "../helpers/exists.mjs";
import { lCase } from "../helpers/lCase.mjs";
import { readJsonA } from "../helpers/readJson.mjs";
import { renameA } from "../helpers/rename.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";
import { writeJsonA } from "../helpers/writeJson.mjs";
import { sortKeys } from "../helpers/sortKeys.mjs";
import path from "path";

let cache = {};

export const wpCategories = (baseUrl) => {
  const slug = safeSlug(baseUrl);
  let categoryFile = `${slug}.json`;
  ensureDir(CATEGORY_DIR);
  let categoryFilePath = path.join(CATEGORY_DIR, categoryFile);

  const getCache = async () => {
    if (slug in cache) return cache[slug];
    ensureDir(CATEGORY_DIR);
    if (await existsA(categoryFilePath))
      cache[slug] = await readJsonA(categoryFilePath);
    else cache[slug] = {};
    return cache[slug];
  }
  const setCache = async (newCache) => {
    cache[slug] = newCache;
    await writeJsonA(categoryFilePath + '.tmp', newCache);
    await renameA(categoryFilePath + '.tmp', categoryFilePath);
  }
  const getId = async category => (await getCache())[lCase(category)];
  const setId = async (category, id) => {
    const cache = await getCache();
    cache[lCase(category)] = id;
    const sorted = sortKeys(cache);
    await setCache(sorted);
  }
  return { getId, setId };
}
