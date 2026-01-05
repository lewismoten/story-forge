import { safeSlug } from "../helpers/safeSlug.mjs";
import { isoIsFuture } from '../helpers/isoIsFuture.mjs';
import { createPostOnWordpress } from "../worpress/createPostOnWordpress.mjs";
import { removeBracketLines } from "../helpers/removeBracketLines.mjs";

export const postStoryToWordpress = 
  async (story, [blogKey, credentials]) => {

  const featured_media = story.blogs?.[blogKey]?.featureImage?.mediaId;  
  let status = isoIsFuture(story.publish_at) ? 'future' : 'publish';

  let content = story.story_html ?? story.story;

  // remove lyric markers [Verse] [Bridge]
  content = removeBracketLines(content);

  if(!('story_html' in story)) {
    if(content.indexOf('</p>') === -1) {
      content = '<p>' + content.replaceAll(/\n\n/g, '</p><p>' ) + '</p>'; 
    }
    content = content.replaceAll(/\n/g, '<br />');
  }
  // adding more meta content to the post - you may want to adjust...
  content = `<p class="sf-circa">${story.circa_date}</p>${content}`;
  content += '<p class="sf-publication-meta"><em>' + story.publication_meta + '</em></p>';

  const payload = {
    title: story.title,
    content,
    date: new Date(story.publish_at),
    slug: safeSlug(story.title),
    excerpt: story.summary,
    status,
    categories: story.categories,
    tags: story.tags,
    ...(featured_media ? {featured_media} : {})
  }
  const post = await createPostOnWordpress(credentials, payload);
  const {
    id,
    date_gmt,
    link
  } = post;
  return {id, date_gmt, link}
}
