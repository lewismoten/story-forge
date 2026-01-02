import { MAX_CANON_LINES } from "../config/MAX_CANON_LINES.mjs";
import { readCanonTailLines } from "../helpers/readCanonTailLines.mjs";

export const buildCanonText = () => {
  const tail = readCanonTailLines(MAX_CANON_LINES);
  if (!tail.length) return "CANON: (none yet)\n";

  let out = "CANON (recent established facts & summaries across all personas)\n";
  for (const e of tail) {
    out += `\n- [${e.when}] (${e.persona}) ${e.summary}\n`;
    if (Array.isArray(e.new_facts) && e.new_facts.length) {
      out += `  Facts: ${e.new_facts.slice(0, 6).join("; ")}\n`;
    }
    if (e.entities) {
      const c = (e.entities.characters || []).slice(0, 4).join(", ");
      const p = (e.entities.places || []).slice(0, 4).join(", ");
      const o = (e.entities.objects || []).slice(0, 4).join(", ");
      const v = (e.entities.events || []).slice(0, 4).join(", ");
      if (c) out += `  Characters: ${c}\n`;
      if (p) out += `  Places: ${p}\n`;
      if (o) out += `  Objects: ${o}\n`;
      if (v) out += `  Events: ${v}\n`;
    }
  }
  return out + "\n";
}
