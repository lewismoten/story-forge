import {accessSync} from "fs";
import {access} from "fs/promises";

export const exists = path => {
  try { accessSync(path); return true; } catch { return false; }
}
export const existsA = async path => {
  try { 
    await access(path); 
    return true; 
  } catch { 
    return false;
   }
}