import path from "path";
import { basicAuthHeader } from "../helpers/basicAuthHeader.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";
import { ensureWordpressTags } from "./ensureWordpressTags.mjs";

export const postStoryToWordpress = 
  async (story, [blogKey, credentials]) => {

  const endpoint = `${credentials.baseUrl.replace(/\/$/, "")}/wp-json/wp/v2/posts`;

  const tags = await ensureWordpressTags(story.tags, credentials);

  console.log(tags);
  throw new Error('foo');
  const featured_media = story.blogs?.[blogKey]?.featureImage?.mediaId;


  // caegoryIds[]
  // tagIds[]
  // date: dateISO - future scheduling
  const status = looksLikeSong(story) ? 'draft' : 'publish';// or "future"

  const body = {
    title: story.title,
    content: story.story,
    slug: safeSlug(title),
    excerpt: story.summary,
    status,
    tags,
    ...(featured_media ? {featured_media} : {})
  }
  const posted = await wpFetchJason(endpoint, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(credentials.username, credentials.appPassword),
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!posted.ok) {
    throw new Error(`Post failed: ${posted.status} ${await posted.text()}`);
  }
  return posted;
}
