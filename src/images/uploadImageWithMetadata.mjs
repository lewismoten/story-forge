import {readFile} from "fs/promises";
import path from "path";
import { basicAuthHeader } from "../helpers/basicAuthHeader.mjs";
import { mimeTypeFromFileName } from "../helpers/mimeTypeFromFileName.mjs";

export const uploadImageWithMetadata = 
  async (baseUrl, username, appPassword, filePath, meta) => {

  const endpoint = `${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2/media`;
  const bytes = await readFile(filePath);
  const filename = path.basename(filePath);
  const mimeType = mimeTypeFromFileName(filename);

  const uploadRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(username, appPassword),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": mimeType,
    },
    body: bytes,
  });

  if (!uploadRes.ok) {
    throw new Error(`Media upload failed: ${uploadRes.status} ${await uploadRes.text()}`);
  }

  const media = await uploadRes.json();
  const mediaId = media.id;
  const absolute_url = media.source_url;
  const relative_url = media.file;
  const width = media.width;
  const height = media.height;
  const filesize = media.filesize;

  const patchBody = getPatchBody(meta);


  if (Object.keys(patchBody).length === 0) {
    return {
      mediaId,
      absolute_url,
      relative_url,
      width,
      height,
      filesize
    }
  }
  const updateRes = await fetch(`${endpoint}/${mediaId}`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(username, appPassword),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchBody),
  });

  if (!updateRes.ok) {
    throw new Error(`Media metadata update failed: ${updateRes.status} ${await updateRes.text()}`);
  }

  return {
    mediaId,
    absolute_url,
    relative_url,
    width,
    height,
    filesize
  }
}

const getPatchBody = ({title, alt_text, caption, description}) => {
  const body = {};
  if (string_not_empty(title)) body.title = title;
  if (string_not_empty(alt_text)) body.alt_text = alt_text;
  if (string_not_empty(caption)) body.caption = caption;
  if (string_not_empty(description)) body.description = description;
  return body;
}
const string_not_empty = value => {
  if(!value) return false;
  if(typeof value !== 'string') return false;
  return value.trim().length !== 0;
}