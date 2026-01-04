import { wpCategories } from "./wordpressCategories.mjs";
import { ensureWordpressTerm } from "./ensureWordpressTerm.mjs";
import { insensitiveUniqueReducer } from '../helpers/insensitiveUniqueReducer.mjs';
import { trimParts } from "../helpers/trimParts.mjs";

const DELIMITER = '/';

export const ensureWordpressCategories = async (categories, credentials) => {
  if (categories.length === 0) return [];
  let uniqueCategories = categories.map(trimParts(DELIMITER)).reduce(insensitiveUniqueReducer, [])
  const wp = wpCategories(credentials.baseUrl);
  const categoryIds = [];
  for (let i = 0; i < uniqueCategories.length; i++) {
    let category = uniqueCategories[i];
    let id = await ensureCategory(wp, credentials, category);
    categoryIds.push(id);
  }
  return categoryIds;
}

const ensureCategory = async (wp, credentials, category) => {
  const parts = category.split(DELIMITER);
  let categoryPath = '';
  let parentId;
  let id;
  for(let i = 0; i < parts.length; i++) {
    let part = parts[i];
    categoryPath = i === 0 ? part : `${categoryPath}${DELIMITER}${part}`;
    id = await wp.getId(categoryPath);
    if(id) {
      parentId = id;
      continue;
    }
    const payload = { name: part};
    if(parentId) {
      payload.parentId = parentId;
    }
    id = await ensureWordpressTerm('categories', payload, credentials);
    await wp.setId(categoryPath, id);
    parentId = id;
  }
  return id;
}