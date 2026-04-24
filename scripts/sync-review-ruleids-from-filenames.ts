/**
 * Set each review entry's ruleId, source.anchor, and source.url fragment to match the YAML filename.
 * Run: bun run scripts/sync-review-ruleids-from-filenames.ts
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const REVIEWS_DIR = path.join(REPO_ROOT, "reviews", "rules");

async function main(): Promise<void> {
  const ents = await readdir(REVIEWS_DIR, { withFileTypes: true });
  for (const ent of ents) {
    if (!ent.isFile() || !ent.name.endsWith(".yaml")) continue;
    const slug = ent.name.replace(/\.yaml$/, "");
    const filePath = path.join(REVIEWS_DIR, ent.name);
    let raw = await readFile(filePath, "utf8");
    raw = raw.replace(/,\s*([}\]])/g, "$1");
    const parsed = JSON.parse(raw) as {
      ruleId?: string;
      source?: { anchor?: string; url?: string };
    };
    parsed.ruleId = slug;
    if (parsed.source) {
      parsed.source.anchor = `#${slug}`;
      if (parsed.source.url) {
        const [base] = parsed.source.url.split("#");
        parsed.source.url = `${base}#${slug}`;
      }
    }
    await writeFile(filePath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  }
  process.stdout.write(
    `Synced ruleId/anchor/url for reviews in ${path.relative(REPO_ROOT, REVIEWS_DIR)}\n`,
  );
}

await main();
