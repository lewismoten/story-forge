import { readdir } from "fs/promises";
import path from "path";

// dir/yyyy/mm/dd/hh-mm-ss-zzzz/persona/
const CURRENT_YEAR = new Date().getFullYear();

export const findStoryDirs = async dir => {
  const entries = await readdir(dir, {withFileTypes:true});
  const paths = entries
    .filter(e => e.isDirectory() && isFourDigitYear(e.name))
    .map(e => path.join(dir, e.name));
  const storyDirs = [];
  for(let i = 0; i < paths.length; i++) {
    const dirs = await findMonths(paths[i]);
    storyDirs.push(...dirs);
  }
  return storyDirs;
}
const findMonths = async dir => {
  const entries = await readdir(dir, {withFileTypes:true});
  const paths = entries
    .filter(e => e.isDirectory() && isTwoDigitMonth(e.name))
    .map(e => path.join(dir, e.name));
  const storyDirs = [];
  for(let i = 0; i < paths.length; i++) {
    const dirs = await findDays(paths[i]);
    storyDirs.push(...dirs);
  }
  return storyDirs;
}
const findDays = async dir => {
  const entries = await readdir(dir, {withFileTypes:true});
  const paths = entries
    .filter(e => e.isDirectory() && isTwoDigitDay(e.name))
    .map(e => path.join(dir, e.name));
  const storyDirs = [];
  for(let i = 0; i < paths.length; i++) {
    const dirs = await findTimes(paths[i]);
    storyDirs.push(...dirs);
  }
  return storyDirs;
}
const findTimes = async dir => {
  const entries = await readdir(dir, {withFileTypes:true});
  const paths = entries
    .filter(e => e.isDirectory() && isTime(e.name))
    .map(e => path.join(dir, e.name));
  const storyDirs = [];
  for(let i = 0; i < paths.length; i++) {
    const dirs = await findPersonas(paths[i]);
    storyDirs.push(...dirs);
  }
  return storyDirs;
}
const findPersonas = async dir => {
  const entries = await readdir(dir, {withFileTypes:true});
  return entries
    .filter(e => e.isDirectory())
    .map(e => path.join(dir, e.name));
}
const numberValidator = (length, min, max) => (name) =>{
  if(name.length !== length) return false;
  if(isNaN(name)) return false;
  const i = parseInt(name, 10);
  return i >= min && i <= max;
}

const isFourDigitYear = numberValidator(4, 1970, CURRENT_YEAR+1);
const isTwoDigitMonth = numberValidator(2, 1, 12);
const isTwoDigitDay = numberValidator(2, 1, 31);
const isTime = name => /[012]\d-[0-5]\d-[0-5]\d-\d\d\dz/.test(name);