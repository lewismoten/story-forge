export const firstWords = (text, maxWords) => 
  text
    .trim()
    .match(/\s+/g)
    .slice(0, maxWords)
    .join(' ');