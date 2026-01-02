export const truncate = (text, maxLength, suffix="\n…(truncated)…") => {
  if (!text) return "";
  return text.length > maxLength ? 
    text.slice(0, maxLength - suffix.length) + suffix : text;
}