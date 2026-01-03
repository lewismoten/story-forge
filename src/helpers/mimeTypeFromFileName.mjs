import path from "path";

const extMimeTypes = {
  jpg:  "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif"
}

export const mimeTypeFromFileName = (filename, defaultMimeType = "image/jpeg") => {
  const ext = path
    .extname(filename)
    .toLowerCase()
    .replace(/^\./,'');
  if(ext in extMimeTypes) return extMimeTypes[ext];
  return defaultMimeType;
}