import { safeSlug } from "../helpers/safeSlug.mjs";
import { ensureWordpressTags } from "./ensureWordpressTags.mjs";
import { ensureWordpressCategories } from "./ensureWordpressCategories.mjs";
import { looksLikeSong} from '../audio/looksLikeSong.mjs';
import { isoIsFuture } from '../helpers/isoIsFuture.mjs';
import { wordpressApiPost } from "./wordpressApiPost.mjs";

export const postStoryToWordpress = 
  async (story, [blogKey, credentials]) => {

  const tags = await ensureWordpressTags(story.tags, credentials);
  const categories = await ensureWordpressCategories(story.categories, credentials);

  const featured_media = story.blogs?.[blogKey]?.featureImage?.mediaId;  
  let status = isoIsFuture(story.publish_at) ? 'future' : 'publish';
  if(looksLikeSong(story)) status = 'draft';

  const payload = {
    title: story.title,
    content: story.story,
    date: story.publish_at,
    slug: safeSlug(story.title),
    excerpt: story.summary,
    status,
    categories,
    tags,
    ...(featured_media ? {featured_media} : {})
  }
  const post = await wordpressApiPost('/wp-json/wp/v2/posts', credentials, payload);
  const {
    id,
    date_gmt,
    link
  } = post;
  return {id, date_gmt, link}
}
