  const ENTITIES = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&#39;": "'",
    "&#8217;": "’",
    "&#8220;": "“",
    "&#8221;": "”",
    "&#8230;": "…",
  };
  
  export const htmlAsText = (html) => String(html ?? "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|section|article|header|footer|blockquote|pre|h[1-6])>/gi, "\n")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/&[a-zA-Z#0-9]+;/g, m => ENTITIES[m] ?? m)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ \n/g, "\n")
    .trim();
