#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { STORY_DIR } from "./config/STORY_DIR.mjs";
import { DEEPAI_API_CONCURRENCY} from './config/DEEPAI_API_CONCURRENCY.mjs';

import { downloadToFile } from './helpers/downloadToFile.mjs';
import { findStoryDirs } from "./helpers/findStoryDirs.mjs";
import { listJsonFiles } from "./helpers/listJsonFiles.mjs";
import { runPool } from "./helpers/runPool.mjs";
import { existsA } from "./helpers/exists.mjs";

import { findExistingAudioSameBasename} from './audio/findExistingAudioSameBasename.mjs';
import { extFromContentType } from "./images/extFromContentType.mjs";
import { audioExtFromUrl } from "./audio/audioExtFromUrl.mjs";
import { looksLikeSong } from './audio/looksLikeSong.mjs';
import { deepaiGenerateAudio } from "./audio/deepaiGenerateAudio.mjs";
import { promptGenerateAudio } from "./audio/promptGenerateAudio.mjs";
import { writeText } from "./helpers/writeText.mjs";
import { htmlAsText } from "./helpers/htmlAsText.mjs";

async function main() {
  if (!(await existsA(STORY_DIR))) {
    console.error(`STORY_DIR does not exist: ${STORY_DIR}`);
    process.exit(1);
  }

  const personaDirs = await findStoryDirs(STORY_DIR);
  if (!personaDirs.length) {
    console.log(`No stories found in: ${STORY_DIR}`);
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

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Scanning ${work.length} JSON files across ${personaDirs.length} persona folders...`);

  await runPool(
    work,
    async ({ personaDir, jsonPath }) => {
      const base = path.basename(jsonPath, ".json").replace(/-story$/, '');
      const existing = await findExistingAudioSameBasename(personaDir, base);
      if (existing) {
        skipped++;
        return;
      }

      let parsed;
      try {
        const raw = await fs.readFile(jsonPath, "utf8");
        parsed = JSON.parse(raw);
      } catch (e) {
        failed++;
        console.error(`✗ JSON parse failed: ${jsonPath}\n  ${String(e)}`);
        return;
      }

      if(!looksLikeSong(parsed)) {
        skipped++;
        return;
      }

      let prompt = ('story_html' in parsed) ? htmlAsText(parsed.story_html) : parsed.story;
      
      const sound = parsed.story_meta;
      const title = parsed.title;

      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        skipped++;
        return;
      }

      try {
        console.log(`→ Generating: ${path.relative(STORY_DIR, jsonPath)}`);
        let finalPath;
        let dl;
        if(1===1) {
          const textPrompt = await promptGenerateAudio({ prompt, sound, title });
          finalPath = path.join(personaDir, base + '-song.audio-prompt.txt');
          writeText(finalPath, textPrompt);
          dl = {bytes: textPrompt.length};
        } else {
          const { outputUrl } = await deepaiGenerateAudio({ prompt, sound, title });
          const urlExt = audioExtFromUrl(outputUrl);
          const tmpPath = path.join(personaDir, `${base}-song.tmpmp3`);
          dl = await downloadToFile(outputUrl, tmpPath);
          const ctExt = extFromContentType(dl.contentType);
          let finalExt = ctExt || urlExt || ".mp3";
          if(!finalExt.startsWith('.')) finalExt = `.${finalExt}`;
          finalPath = path.join(personaDir, base + '-song' + finalExt);
          await fs.rename(tmpPath, finalPath);
        }

        generated++;
        console.log(`✓ Saved ${path.relative(STORY_DIR, finalPath)} (${dl.bytes} bytes)`);
      } catch (e) {
        failed++;
        console.error(`✗ Failed: ${path.relative(STORY_DIR, jsonPath)}\n  ${String(e)}`);
        try {
          const tmpPath = path.join(personaDir, `${base}.tmpimg`);
          if (await fileExists(tmpPath)) await fs.unlink(tmpPath);
        } catch {}
      }
    },
    DEEPAI_API_CONCURRENCY
  );

  console.log("\nDone.");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
}

await main();
