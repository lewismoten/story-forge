#!/usr/bin/env node

import process from "process";

import { parseArgs } from "./helpers/parseArgs.mjs";
import { initLayout } from "./helpers/initLayout.mjs";
import { generateStory } from "./story/generateStory.mjs";
import { generatePersona } from "./persona/generatePersona.mjs";

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  initLayout();

  try {
    if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
      console.log(`
StoryForge (multi-persona worldbuilding)

Commands:
  random (no direction)
  as "direction"
  as "direction" [--links "url1,url2"]

Examples:
  node generate-persona.mjs random
  node generate-persona.mjs random --links "http://example.com"
  node generate-persona.mjs create --as "a student who is studying about the history of the world"
  node generate-persona.mjs create --as "wise man" --links "http://example.com"
`.trim());
      return;
    }

    if (cmd === "random") {
      generatePersona({ linksCsv: args.links });
      return;
    }

    if (cmd === "create") {
      const userDirection = args.as || args.p;
      if (!userDirection) throw new Error("Missing --as \"directions\".");
      await generateStory({ userDirection, linksCsv: args.links });
      return;
    }

    throw new Error(`Unknown command: ${cmd}`);
  } catch (err) {
    console.error("Error:", err?.message || String(err));
    console.log(err);
    process.exitCode = 1;
  }
}

await main();
