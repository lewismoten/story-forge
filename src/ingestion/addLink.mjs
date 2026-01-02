import { initLayout } from "../helpers/initLayout.mjs";
import { fetchLinkText } from "./fetchLinkText.mjs";
import { sha1 } from "../helpers/sha1.mjs";
import { safeSlug } from "../helpers/safeSlug.mjs";
import { WORLD_LINKS_DIR } from "../config/WORLD_LINKS_DIR.mjs";
import { truncate } from "../helpers/truncate.mjs";
import { MAX_LINK_EXTRACT_CHARS } from "../config/MAX_LINK_EXTRACT_CHARS.mjs";
import { getWorkingFor } from "../helpers/getWorkingFor.mjs";
export const addLink = async url => {
  initLayout();
  const txt = await fetchLinkText(url);
  const id = sha1(url).slice(0, 12);
  const fname = `${safeSlug(new URL(url).hostname)}-${id}.txt`;
  const target = path.join(WORLD_LINKS_DIR, fname);
  writeText(target, truncate(txt, MAX_LINK_EXTRACT_CHARS));
  console.log(`Added link extract -> ${getWorkingFor(target)}`);
}