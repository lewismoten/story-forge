#!/usr/bin/env node

import path from "path";
import process from "process";

import { parseArgs } from "./helpers/parseArgs.mjs";
import { initLayout } from "./helpers/initLayout.mjs";
import { DATA_DIR } from "./config/DATA_DIR.mjs";
import { createPersona } from "./persona/createPersona.mjs";
import { addDoc } from "./ingestion/addDoc.mjs";
import { addLink } from "./ingestion/addLink.mjs";
import { generateStory } from "./story/generateStory.mjs";

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  try {
    if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
      console.log(`
Storyforge (multi-persona worldbuilding)

Commands:
  init
  persona:create "template"
  persona:create "template" "alias" (same template, different person)
  doc:add ./path/to/doc.md
  link:add "https://example.com/worldbuilding"
  story:generate --persona "name" [--links "url1,url2"]

Examples:
  node storyforge.mjs init
  node storyforge.mjs persona:create "wise-man"
  node storyforge.mjs doc:add ./world/setting.md
  node storyforge.mjs link:add "https://example.com/lore"
  node storyforge.mjs story:generate --persona "wise-man"
`.trim());
      return;
    }

    if (cmd === "init") {
      initLayout();
      console.log(`Initialized -> ${getWorkingFor(DATA_DIR)}`);
      return;
    }

    if (cmd === "persona:create") {
      const name = args._[1];
      const alias = args._[2];
      if (!name) throw new Error("Missing persona name.");
      createPersona(name, alias);
      return;
    }

    if (cmd === "doc:add") {
      const p = args._[1];
      if (!p) throw new Error("Missing doc path.");
      addDoc(p);
      return;
    }

    if (cmd === "link:add") {
      const url = args._[1];
      if (!url) throw new Error("Missing URL.");
      await addLink(url);
      return;
    }

    if (cmd === "story:generate") {
      const personaName = args.persona || args.p;
      if (!personaName) throw new Error("Missing --persona \"name\".");
      await generateStory({ personaName, linksCsv: args.links });
      return;
    }

    throw new Error(`Unknown command: ${cmd}`);
  } catch (err) {
    console.error("Error:", err?.message || String(err));
    process.exitCode = 1;
  }
}

await main();
