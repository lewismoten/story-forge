import { wpTags } from "./wordpressTags.mjs";
import { ensureWordpressTerm } from "../story/ensureWordpressTerm.mjs";
import { insensitiveUniqueReducer } from '../helpers/insensitiveUniqueReducer.mjs';

export const ensureWordpressTags = async (tags, credentials) => {
  if (tags.length === 0) return [];
  let uniqueTags = tags.reduce(insensitiveUniqueReducer, [])
  const wp = wpTags(credentials.baseUrl);
  const tagIds = [];
  for (let i = 0; i < uniqueTags.length; i++) {
    let tag = uniqueTags[i];
    let id = await wp.getId(tag);
    if (id) {
      tagIds.push(id);
      continue;
    }
    id = await ensureWordpressTerm('tags', {name:tag}, credentials);
    tagIds.push(id);
    await wp.setId(tag, id);
  }
  return tagIds;
}



