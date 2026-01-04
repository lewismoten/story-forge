import path from "path";

export const isoFromStoryPath = (filePath) => {
  const parts = filePath.split(path.sep);

  const i = parts.lastIndexOf("stories");
  if (i === -1 || parts.length < i + 5) {
    throw new Error(`Path does not match expected format: ${filePath}`);
  }
  const year = parts[i + 1];
  const month = parts[i + 2];
  const day = parts[i + 3];
  const timeDir = parts[i + 4];

  const m = /^(\d{2})-(\d{2})-(\d{2})-(\d{3})z$/i.exec(timeDir);
  if (!m) {
    throw new Error(`Time directory not in expected format: ${timeDir}`);
  }

  const [, hh, mm, ss, ms] = m;
  return `${year}-${month}-${day}T${hh}:${mm}:${ss}.${ms}Z`;
}