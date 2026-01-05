#!/usr/bin/env node

import process from "process";

import { parseArgs } from "./helpers/parseArgs.mjs";
import { initLayout } from "./helpers/initLayout.mjs";
import { createPersonaWordpressAccounts } from "./persona/createPersonaWordpressAccounts.mjs";

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  initLayout();

  try {
    if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
      console.log(`
StoryForge (multi-persona worldbuilding)

Commands:
  create

Examples:
  node wordpress-accounts.mjs create
`.trim());
      return;
    }

    if (cmd === "create") {
      await createPersonaWordpressAccounts();
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
