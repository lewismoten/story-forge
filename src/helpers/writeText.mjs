import fs from "fs";
export const writeText = (path, text) => 
  fs.writeFileSync(path, text, "utf8");
