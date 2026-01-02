import { stripHtml } from "../helpers/stripHtml.mjs";
import { nowIso } from "../helpers/nowISO.mjs";

export const fetchLinkText = async url => {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Fetch failed (${res.status}): ${url}`);
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  const raw = await res.text();
  let text = raw;
  if (ct.includes("text/html")) text = stripHtml(raw);
  return `SOURCE: ${url}\nFETCHED: ${nowIso()}\n\n${text}`;
}