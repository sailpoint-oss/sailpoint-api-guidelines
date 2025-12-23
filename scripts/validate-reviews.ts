import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RulesIndex = {
  rules: Array<{
    id: string;
    title: string;
    url: string;
  }>;
};

type ReviewStatus = "pending" | "in_review" | "accepted" | "needs_rework" | "rejected";

type ReviewEntryV1 = {
  schemaVersion: 1;
  ruleId: string;
  source?: {
    doc?: string | null;
    anchor?: string;
    url?: string;
  };
  currentTitle?: string;
  status?: ReviewStatus;
};

// Works in Bun and Node.
const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const RULES_JSON_PATH = path.join(REPO_ROOT, "public", "rules.json");
const REVIEWS_DIR = path.join(REPO_ROOT, "reviews", "rules");

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

function parseRulesIndex(raw: string): RulesIndex {
  const parsed = JSON.parse(raw) as RulesIndex;
  assert(Array.isArray(parsed.rules), "Invalid public/rules.json (missing rules[])");
  return parsed;
}

function parseJsonishYaml(raw: string): ReviewEntryV1 | null {
  try {
    return JSON.parse(raw) as ReviewEntryV1;
  } catch {
    // Allow trailing commas
    const cleaned = raw.replace(/,\s*([}\]])/g, "$1");
    try {
      return JSON.parse(cleaned) as ReviewEntryV1;
    } catch {
      return null;
    }
  }
}

async function main(): Promise<void> {
  const index = parseRulesIndex(await readFile(RULES_JSON_PATH, "utf8"));
  const ruleIds = new Set(index.rules.map((r) => r.id));
  const ruleById = new Map(index.rules.map((r) => [r.id, r]));

  const ents = await readdir(REVIEWS_DIR, { withFileTypes: true });
  const yamlNames = ents
    .filter((e) => e.isFile() && e.name.endsWith(".yaml"))
    .map((e) => e.name);

  const reviewIds = new Set<string>();
  const errors: string[] = [];

  for (const name of yamlNames) {
    const filePath = path.join(REVIEWS_DIR, name);
    const raw = await readFile(filePath, "utf8");
    const parsed = parseJsonishYaml(raw);
    if (!parsed) {
      errors.push(`Unparseable review entry (expected JSON-formatted YAML): ${path.join("reviews", "rules", name)}`);
      continue;
    }

    const id = parsed.ruleId ?? name.replace(/\.yaml$/, "");
    reviewIds.add(id);

    if (!ruleIds.has(id)) {
      errors.push(`Review has no matching rule id in public/rules.json: ${path.join("reviews", "rules", name)} (ruleId=${id})`);
      continue;
    }

    const rule = ruleById.get(id)!;
    const expectedUrl = rule.url;
    const expectedAnchor = `#${id}`;

    if (parsed.source?.url && parsed.source.url !== expectedUrl) {
      errors.push(
        `Review source.url mismatch for ${id}: ${path.join("reviews", "rules", name)} expected ${expectedUrl} got ${parsed.source.url}`,
      );
    }
    if (parsed.source?.anchor && parsed.source.anchor !== expectedAnchor) {
      errors.push(
        `Review source.anchor mismatch for ${id}: ${path.join("reviews", "rules", name)} expected ${expectedAnchor} got ${parsed.source.anchor}`,
      );
    }
  }

  for (const id of ruleIds) {
    if (!reviewIds.has(id)) {
      errors.push(`Missing review entry for rule [#${id}] (${ruleById.get(id)!.url})`);
    }
  }

  if (errors.length) {
    process.stderr.write(`Review validation failed (${errors.length} issues):\n`);
    for (const e of errors) process.stderr.write(`- ${e}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`Review validation OK: ${ruleIds.size} rules, ${yamlNames.length} review files\n`);
}

await main();


