import { wordpressApiGet } from "./wordpressApiGet.mjs";
import { wordpressApiPost } from "./wordpressApiPost.mjs";
import { lCase } from '../helpers/lCase.mjs';

export const ensureWordpressTerm = async (type, name, credentials) => {
  const endpointPath = `/wp-json/wp/v2/${type}`;
  const searchUrl = `${endpointPath}?search=${encodeURIComponent(name)}&per_page=100`;
  const found = await wordpressApiGet(searchUrl, credentials);
  const lName = lCase(name);
  const exact = (found || []).find(term => lCase(term.name) === lName);
  if (exact) return exact.id;
  try {
    const created = await wordpressApiPost(endpointPath, credentials, { name })
    return created.id;
  } catch (e) {
    if (e.code === 'term_exists') {
      return e.json.data.term_id;
    } else {
      throw e;
    }
  }
}