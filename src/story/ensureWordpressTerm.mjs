import { wordpressApiGet } from "./wordpressApiGet.mjs";
import { wordpressApiPost } from "./wordpressApiPost.mjs";
import { lCase } from '../helpers/lCase.mjs';

export const ensureWordpressTerm = async (type, payload, credentials) => {
  const name = payload.name;
  const parentId = payload.parentId;

  const endpointPath = `/wp-json/wp/v2/${type}`;

  let page =1;
  const lName = lCase(name);

  const params = new URLSearchParams();
  params.set("per_page", "100");
  if(type === "tags") {
    params.set("search", lName);
  } else if(type === "categories") {
    params.set("hide_empty", "false");
    params.set("parent", String(parentId ?? 0));
  }

  while(true) {
    params.set("page", String(page));
    const items = await wordpressApiGet(`${endpointPath}?${params.toString()}`, credentials);
    if(!items) break;
    const exact = (items || []).find(term => lCase(term.name) === lName);
    if (exact) return exact.id;
    if(items.length < 100) break;
    page++;
  }
  try {
    const created = await wordpressApiPost(endpointPath, credentials, payload)
    return created.id;
  } catch (e) {
    if (e.cause?.data?.code === 'term_exists') {
      return e.cause.data.data.term_id;
    } else {
      throw e;
    }
  }
}