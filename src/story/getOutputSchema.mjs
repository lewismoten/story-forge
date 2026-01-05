export const getOutputSchema = () => {
  // JSON schema enforcement (Structured Outputs guide concept).
  // If your model/account doesn’t support schema enforcement, you can remove "text.format".
  const schema = {
    type: "json_schema", 
    name: "story_output",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { type: "string", description:"glboally unique id of the story"},
        title: { type: "string", description: "Title of the story targeting 3-6 words with good attraction for interested readers"},
        story_html: { type: "string", description: "The story as HTML and MUST use paragraph <p> tags. HTML may include simple formatting and links to other stories (ie <a href=\"story://id\">). Image tags may be used where the 'src' attribute is an brief non-formatted image prompt describing what should appear in the image, and should also include 'alt' and 'title' attributes." },
        circa_date: { type: "string", description: "Exact ISO date when story is written from the authors perspective, or a range of two ISO dates, or an estimated period: Circa 1910s or Circa WWII"},
        categories: {
          type: "array",
          items: { type: "string", description: "A hierarchical category path delimited by forward slashes for where the story should appear on a blog"},
          description: "List of broad categories to find similar types of stories, publishers, books, genres, series, etc"
        },
        publication_meta: {type: "string", description: "Details such as a book, newspaper, page, chapter, verse associated with where the story is published in the fictional world."},
        story_meta: {type: "string", description: "Information associated with the story that people don't see, such as musical instruments and genre for songs"},
        tags: {
          type: "array",
          items: { type: "string"},
          description: "People, Places, Objects, Events, Publications, Chapter Names, Series Name, and other significant information that may appear in other stories. Tags are unique."
        },
        excerpt: { type: "string", description: "40 word excerpt to display on blog feed." },
        summary: { type: "string", description: "40 word summary for canon memory." },
        feature_image: {type: "string", description: "A terse description of no more than 100 words of what a feature image should look like to go along with the story."},
        feature_image_style: {type: "string", description: "A style of image generation for the feature image offered via DeepAI such as cyberpunk-generator, logo-generator, pop-art-generator, or etc."},
        new_facts: {
          type: "array",
          items: { type: "string" },
          description: "Concrete facts established by this story (short bullet-like strings).",
        },
        entities: {
          type: "object",
          additionalProperties: false,
          properties: {
            characters: { type: "array", items: { type: "string" } },
            places: { type: "array", items: { type: "string" } },
            objects: { type: "array", items: { type: "string" } },
            events: { type: "array", items: { type: "string" } },
          },
          required: ["characters", "places", "events", "objects"],
        },
      },
      required: ["id", "story_html", "title", "summary", "categories", "tags", "feature_image", 
        "new_facts", "entities", "circa_date", "publication_meta", "story_meta",
        "feature_image_style", "excerpt"],
    },
  };

  return schema;
}