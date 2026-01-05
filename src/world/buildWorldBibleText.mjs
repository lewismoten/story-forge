import path from "path";

import { MAX_DOC_CHARS } from "../config/MAX_DOC_CHARS.mjs";

import { listWorldDocs } from "../helpers/listWorldDocs.mjs";
import { listLinkExtracts } from "../helpers/listLinkExtracts.mjs";
import { readText } from "../helpers/readText.mjs";
import { truncate } from "../helpers/truncate.mjs";
import { getFileSize } from "../helpers/getFileSize.mjs";

export const buildWorldBibleText = async () => {
  const docs = listWorldDocs();
  const links = listLinkExtracts();

  for(let i = 0; i < docs.length; i++) {
    const size = await getFileSize(docs[i]);
    if(size > MAX_DOC_CHARS) {
      console.warn(`File exceeds ${MAX_DOC_CHARS} characters. (${size} bytes): ${path.basename(p)}`);
    }
  }

  shuffle(docs);

  let combined = "WORLD BIBLE (user-added docs)\n\n";
  for (const p of docs) {
    const basename = path.basename(p);
    console.log('Using:', basename);
    combined += `--- DOC: ${basename} ---\n${readText(p)}\n\n`;
    if(combined.length >= MAX_DOC_CHARS) break;
  }

  if(combined.length <= MAX_DOC_CHARS) {
    combined += "\nWORLD BIBLE (saved link extracts)\n\n";
    for (const p of links) {
      combined += `--- LINK EXTRACT: ${path.basename(p)} ---\n${readText(p)}\n\n`;
      if(combined.length >= MAX_DOC_CHARS) break;
    }
  }

  return truncate(combined, MAX_DOC_CHARS);
}

const shuffle = items => {
  for(let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}