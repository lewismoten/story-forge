import { isTextFile } from "./isTextFile.mjs";
export const isTextOrMarkdownFile = name => 
  isTextFile(name) | name.endsWith(".md");