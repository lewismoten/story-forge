import path from "path";
import { DATA_DIR } from "./DATA_DIR.mjs";
export const getDir = (...paths) => path.join(DATA_DIR, ...paths);
