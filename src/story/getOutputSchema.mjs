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
        title: { type: "string", description: "Title of the story targeting 3-6 words with good attraction for interested readers"},
        story: { type: "string", description: "The story." },
        circa_date: { type: "string", description: "Exact ISO date when story is written from the authors perspective, or a range of two ISO dates, or an estimated period: Circa 1910s or Circa WWII"},
        category: { type: "string", description: "How to hierarchically categorize this story on a blog such as Micro Fiction, Flash fiction, Short Story, Novella, Novel, Memoir, Biography, Personal Essay, Play, Screenplay, Song Lyrics, Poem, Haiku/Senryu/Tanka, Metafiction, Nonlinear, Choose-Your-Own-Adventure, Ergodic Literature, Oulipo, Expository Fiction, Persuasive Writing, Technical Writing, Speech"},
        publication_meta: {type: "string", description: "Details such as a book, newspaper, page, chapter, verse associated with where the story is published in the fictional world."},
        story_meta: {type: "string", description: "Information associated with the story that people don't see, such as musical instruments and genre for songs"},
        tags: {
          type: "array",
          items: { type: "string"},
          description: "People, Places, Objects, Events, Publications, Chapter Names, Series Name, and other significant information that may appear in other stories"
        },
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
      required: ["story", "title", "summary", "category", "tags", "feature_image", 
        "new_facts", "entities", "circa_date", "publication_meta", "story_meta", "feature_image_style"],
    },
  };

  return schema;
}