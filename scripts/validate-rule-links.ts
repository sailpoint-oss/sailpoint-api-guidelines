import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createRuleLinkRegex } from "../lib/rule-links";

const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_ROOT = path.join(REPO_ROOT, "content", "docs");
const RULES_JSON_PATH = path.join(REPO_ROOT, "public", "rules.json");

type RulesData = {
  rules: Array<{
    id: string;
    url: string;
  }>;
};

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function main(): Promise<void> {
  const rawRules = await readFile(RULES_JSON_PATH, "utf8");
  const parsed = JSON.parse(rawRules) as RulesData;
  const knownRuleIds = new Set(parsed.rules.map((rule) => rule.id));

  const errors: string[] = [];
  let checkedLinks = 0;

  for await (const filePath of walk(CONTENT_ROOT)) {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) continue;

    const raw = await readFile(filePath, "utf8");
    const relativePath = path.relative(REPO_ROOT, filePath);

    for (const match of raw.matchAll(createRuleLinkRegex())) {
      const ruleId = match[1];
      checkedLinks += 1;

      if (!knownRuleIds.has(ruleId)) {
        errors.push(`Unknown rule link [#${ruleId}] in ${relativePath}`);
      }
    }
  }

  if (errors.length > 0) {
    process.stderr.write(`${errors.join("\n")}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    `Validated ${checkedLinks} rule-id links across ${path.relative(REPO_ROOT, CONTENT_ROOT)}\n`,
  );
}

await main();
