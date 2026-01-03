export const looksLikeSong = (json) => {
  const SONG_TAG_RE = /\[(verse(\s*\d+)?|chorus(\s*\d+)?|bridge|pre-chorus|hook|outro|intro)\]/i;

  const category = String(json.category || "").trim().toLowerCase();
  if (category === "song lyrics") return true;

  const story = String(json.story || "");
  return SONG_TAG_RE.test(story);
}