import fs from "fs";
export const readText = path => fs.readFileSync(path, "utf8");
