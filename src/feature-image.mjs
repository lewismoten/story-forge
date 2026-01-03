#!/usr/bin/env node
/**
 * deepai-batch-images.mjs
 *
 * Generate missing feature images for story JSON files via DeepAI.
 *
 * Env:
 *   DEEPAI_API_KEY         (required)
 *   STORY_DIR              (optional; default: ./stories)
 *   DEEPAI_API_ENDPOINT    (optional; default: https://api.deepai.org/api/text2img)
 *   CONCURRENCY            (optional; default: 2)
 *
 * Run:
 *   node deepai-batch-images.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { STORY_DIR } from "./config/STORY_DIR.mjs";
import { DEEPAI_API_CONCURRENCY} from './config/DEEPAI_API_CONCURRENCY.mjs';

import { downloadToFile } from './helpers/downloadToFile.mjs';
import { listSubdirs } from "./helpers/listSubdirs.mjs";
import { listJsonFiles } from "./helpers/listJsonFiles.mjs";
import { runPool } from "./helpers/runPool.mjs";
import { existsA } from "./helpers/exists.mjs";

import { findExistingImageSameBasename} from './images/findExistingImageSameBasename.mjs';
import { extFromContentType } from "./images/extFromContentType.mjs";
import { extFromUrl } from "./images/extFromUrl.mjs";
import { deepaiGenerateImage } from "./images/deepaiGenerateImage.mjs";

async function main() {
  if (!(await existsA(STORY_DIR))) {
    console.error(`STORY_DIR does not exist: ${STORY_DIR}`);
    process.exit(1);
  }

  const personaDirs = await listSubdirs(STORY_DIR);
  if (!personaDirs.length) {
    console.log(`No persona subfolders found in: ${STORY_DIR}`);
    return;
  }

  // Collect work items: { personaDir, jsonPath }
  const work = [];
  for (const pDir of personaDirs) {
    const jsonFiles = await listJsonFiles(pDir);
    for (const j of jsonFiles) {
      work.push({ personaDir: pDir, jsonPath: j });
    }
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Scanning ${work.length} JSON files across ${personaDirs.length} persona folders...`);
console.log(`Concurrency`, DEEPAI_API_CONCURRENCY);
  await runPool(
    work,
    async ({ personaDir, jsonPath }) => {
      const base = path.basename(jsonPath, ".json");
      const existing = await findExistingImageSameBasename(personaDir, base);
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

      const prompt = parsed.feature_image;
      const style = parsed.feature_image_style;

      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        skipped++;
        console.log(`- Skipping (no feature_image prompt): ${path.relative(STORY_DIR, jsonPath)}`);
        return;
      }

      try {
        console.log(`→ Generating: ${path.relative(STORY_DIR, jsonPath)} (style: ${style || "none"})`);
        const { outputUrl } = await deepaiGenerateImage({ prompt, style });
        const urlExt = extFromUrl(outputUrl);
        const tmpPath = path.join(personaDir, `${base}.tmpimg`);
        const dl = await downloadToFile(outputUrl, tmpPath);
        const ctExt = extFromContentType(dl.contentType);
        const finalExt = ctExt || urlExt || ".jpg";
        const finalPath = path.join(personaDir, base + finalExt);
        await fs.rename(tmpPath, finalPath);

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
