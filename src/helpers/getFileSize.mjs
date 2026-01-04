import {stat} from "node:fs/promises";

export const getFileSize = async filePath => {
  const stats = await stat(filePath);
  return stats.size;
}