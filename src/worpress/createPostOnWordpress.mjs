import { htmlAsText } from "../helpers/htmlAsText.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";

export const createPostOnWordpress = async (credentials, {
  title,
  content,
  date = new Date(),
  slug = title,
  excerpt = '',
  status = 'publish',
  categories = [],
  tags = [],
  featured_media
}) => {

  tags = await ensureWordpressTags(tags, credentials);
  categories = await ensureWordpressCategories(categories, credentials);
  const publish_at = new Date(date);
  
  if(status !== 'draft' && publish_at.getTime() > Date.now()) {
    status = 'future';
  }
  slug = safeSlug(slug);

  if(typeof excerpt !== 'string' || excerpt === '') {
    excerpt = firstWords(htmlAsText(content), 40)
  }
  
  const payload = {
    title,
    content,
    date: publish_at.toISOString(),
    slug,
    excerpt,
    status,
    categories,
    tags,
    featured_media
  };

  const post = await wordpressApiPost(
    '/wp-json/wp/v2/posts', 
    credentials, 
    payload
  );

  return post;
}