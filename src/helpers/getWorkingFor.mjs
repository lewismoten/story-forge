import path from "path";
import { workingDir } from "./workingDir.mjs";
export const getWorkingFor = name => path.relative(workingDir(), name);