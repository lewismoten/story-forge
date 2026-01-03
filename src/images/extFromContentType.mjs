
export const extFromContentType = contentType => {
  const ct = (contentType || "").toLowerCase();
  if (ct.includes("audio/mp3")) return ".mp3";
  if (ct.includes("image/png")) return ".png";
  if (ct.includes("image/webp")) return ".webp";
  if (ct.includes("image/jpeg") || ct.includes("image/jpg")) return ".jpg";
  return ".bin";
}