import { wpCategories } from "./wordpressCategories.mjs";
import { insensitiveUniqueReducer } from '../helpers/insensitiveUniqueReducer.mjs';
import { trimParts } from "../helpers/trimParts.mjs";
import { CATEGORY_DELIMITER } from "./CATEGORY_DELIMITER.mjs";
import { ensureWordpressCategory } from "./ensureWordpressCategory.mjs";

export const ensureWordpressCategories = async (categories, credentials) => {
  if (categories.length === 0) return [];
  let uniqueCategories = categories.map(trimParts(CATEGORY_DELIMITER)).reduce(insensitiveUniqueReducer, [])
  const wp = wpCategories(credentials.baseUrl);
  const categoryIds = [];
  for (let i = 0; i < uniqueCategories.length; i++) {
    let category = uniqueCategories[i];
    let id = await ensureWordpressCategory(wp, credentials, category);
    categoryIds.push(id);
  }
  return categoryIds;
}
