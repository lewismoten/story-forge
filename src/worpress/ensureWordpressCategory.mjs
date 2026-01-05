import { CATEGORY_DELIMITER } from "./CATEGORY_DELIMITER.mjs";
import { ensureWordpressTerm } from "./ensureWordpressTerm.mjs";

export const ensureWordpressCategory = async (wp, credentials, category) => {
  const parts = category.split(CATEGORY_DELIMITER);
  let categoryPath = '';
  let parentId;
  let id;
  for(let i = 0; i < parts.length; i++) {
    let part = parts[i];
    categoryPath = i === 0 ? part : `${categoryPath}${CATEGORY_DELIMITER}${part}`;
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