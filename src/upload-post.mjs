#!/usr/bin/env node

import fs from "node:fs/promises";
import path, { basename } from "node:path";
import process from "node:process";

import { STORY_DIR } from "./config/STORY_DIR.mjs";
import { DEEPAI_API_CONCURRENCY} from './config/DEEPAI_API_CONCURRENCY.mjs';

import { listJsonFiles } from "./helpers/listJsonFiles.mjs";
import { runPool } from "./helpers/runPool.mjs";
import { existsA } from "./helpers/exists.mjs";
import { findStoryDirs } from "./helpers/findStoryDirs.mjs";

import { findExistingImageSameBasename} from './images/findExistingImageSameBasename.mjs';
import { loadPersona } from "./helpers/loadPersona.mjs";
import { nowIso } from "./helpers/nowISO.mjs";
import { postStoryToWordpress } from "./story/postStoryToWordpress.mjs";
import { saveStory } from "./helpers/saveStory.mjs";

async function main() {
  if (!(await existsA(STORY_DIR))) {
    console.error(`STORY_DIR does not exist: ${STORY_DIR}`);
    process.exit(1);
  }

  const personaDirs = await findStoryDirs(STORY_DIR);
  if (!personaDirs.length) {
    console.log(`No persona subfolders found in: ${STORY_DIR}`);
    return;
  }

  // Collect work items: { personaDir, jsonPath }
  const work = [];
  for (const pDir of personaDirs) {
    const jsonFiles = await listJsonFiles(pDir, "-story.json");
    for (const j of jsonFiles) {
      work.push({ personaDir: pDir, jsonPath: j });
    }
  }

  let posted = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Scanning ${work.length} JSON files across ${personaDirs.length} persona folders...`);
  await runPool(
    work,
    async ({ personaDir, jsonPath }) => {
      const base = path.basename(jsonPath, ".json").replace(/-story$/, '');
      const existing = await findExistingImageSameBasename(personaDir, base);
      if (!existing) {
        skipped++;
        return;
      }

      let story;
      try {
        const raw = await fs.readFile(jsonPath, "utf8");
        story = JSON.parse(raw);
      } catch (e) {
        failed++;
        console.error(`✗ JSON parse failed: ${jsonPath}\n  ${String(e)}`);
        return;
      }

      const personaName = path.basename(personaDir);
      const persona = loadPersona(personaName);

      const title = story.title;

      const {blogs} = persona;
      const entries = Object.entries(blogs)
      for(let i = 0; i < entries.length; i++) {
        const [blogKey, { baseUrl, username, appPassword}] = entries[i];
        if('blogs' in story 
          && blogKey in story.blogs 
          && 'post' in story.blogs[blogKey]) {
            skipped++;
        console.log(`- Skipping (previously posted to ${blogKey})`);
        continue;

          }
        console.log(`→ Posting to ${blogKey}`);
        try {
          const postInfo = await postStoryToWordpress(story, entries[i]);
          if(!('blogs' in story)) story.blogs = {};
          if(!(blogKey in story.blogs)) story.blogs[blogKey] = {};
          story.blogs[blogKey].post = postInfo;
          story.blogs[blogKey].post.created_at = nowIso();
          saveStory(jsonPath, story);
          posted++;
          console.log(`✓ Posted ${path.relative(STORY_DIR, story.title)}`);
        } catch (e) {
          failed++;
          console.error(`✗ Failed: ${path.relative(STORY_DIR, story.title)}\n  ${String(e)}`);
        }
      }
    },
    DEEPAI_API_CONCURRENCY
  );

  console.log("\nDone.");
  console.log(`Posted:  ${posted}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
}

await main();
