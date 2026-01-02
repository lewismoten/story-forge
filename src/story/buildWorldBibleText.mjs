import path from "path";

import { MAX_DOC_CHARS } from "../config/MAX_DOC_CHARS.mjs";

import { listWorldDocs } from "../helpers/listWorldDocs.mjs";
import { listLinkExtracts } from "../helpers/listLinkExtracts.mjs";
import { readText } from "../helpers/readText.mjs";
import { truncate } from "../helpers/truncate.mjs";

export const buildWorldBibleText = () => {
  const docs = listWorldDocs();
  const links = listLinkExtracts();

  let combined = "WORLD BIBLE (user-added docs)\n\n";
  for (const p of docs) {
    combined += `--- DOC: ${path.basename(p)} ---\n${readText(p)}\n\n`;
  }

  combined += "\nWORLD BIBLE (saved link extracts)\n\n";
  for (const p of links) {
    combined += `--- LINK EXTRACT: ${path.basename(p)} ---\n${readText(p)}\n\n`;
  }

  return truncate(combined, MAX_DOC_CHARS);
}