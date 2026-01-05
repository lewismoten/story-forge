import { stripHtmlTags } from "./stripHtmlTags.mjs";
import { tidyBreaks } from "./tidyBreaks.mjs";

export const removeBracketLines = text => {
  if(typeof text !== 'string') return '';

  const DELIMS = /(\r?\n|\s*<br\s*\/?>\s*|\s*<\/p>\s*<p\b[^>]*>\s*)/gi;

  return tidyBreaks(text
    .split(DELIMS)
    .filter((part, idx, arr) => {
      if(idx % 2 === 1) return true;
      const visible = stripHtmlTags(part).trim();
      return visible === '' || !isBracketLine(visible)
    })
    .join(''));
}

const isBracketLine = line => 
  /\s*\[[^\]\r\n]*\]\s*$/.test(line);
