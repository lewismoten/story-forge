
export const tidyBreaks = htmlOrText =>
  htmlOrText
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br><br>")
    .replace(/(\s*<\/p>\s*<p\b[^>]*>\s*){2,}/gi, "</p><p>");
