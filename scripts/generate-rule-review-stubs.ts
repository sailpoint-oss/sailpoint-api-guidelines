import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RulesIndex = {
  rules: Array<{
    id: string;
    title: string;
    url: string;
  }>;
};

type ReviewEntryV1 = {
  schemaVersion: 1;
  ruleId: string;
  source: {
    doc: string | null;
    anchor: `#${string}`;
    url: string;
  };
  currentTitle: string;
  status: "pending" | "in_review" | "accepted" | "needs_rework" | "rejected";
  decision: {
    changeType:
      | "none"
      | "editorial"
      | "normative"
      | "split"
      | "merge"
      | "move"
      | "deprecate";
    proposedTitle: string | null;
    proposedText: string | null;
    rationale: string | null;
    compatNotes: string | null;
  };
  reviewNotes: string[];
};

// Works in Bun and Node.
const REPO_ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const RULES_JSON_PATH = path.join(REPO_ROOT, "public", "rules.json");
const OUTPUT_DIR = path.join(REPO_ROOT, "reviews", "rules");

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function guessDocPathFromUrl(url: string): string | null {
  // url example: /docs/rules/http-status-codes-and-error-handling#151
  const [pathPart] = url.split("#");
  if (!pathPart) return null;
  if (!pathPart.startsWith("/docs/")) return null;
  const rel = pathPart.replace(/^\/docs\//, "");
  // Prefer .mdx but allow .md in content
  return path.join("content", "docs", `${rel}.mdx`);
}

async function main() {
  const raw = await readFile(RULES_JSON_PATH, "utf8");
  const index = JSON.parse(raw) as RulesIndex;

  await mkdir(OUTPUT_DIR, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const rule of index.rules) {
    const outPath = path.join(OUTPUT_DIR, `${rule.id}.yaml`);
    if (await exists(outPath)) {
      skipped += 1;
      continue;
    }

    const anchor = `#${rule.id}` as const;
    const entry: ReviewEntryV1 = {
      schemaVersion: 1,
      ruleId: rule.id,
      source: {
        doc: guessDocPathFromUrl(rule.url),
        anchor,
        url: rule.url,
      },
      currentTitle: rule.title,
      status: "pending",
      decision: {
        changeType: "none",
        proposedTitle: null,
        proposedText: null,
        rationale: null,
        compatNotes: null,
      },
      reviewNotes: [],
    };

    // JSON-formatted YAML: valid YAML, parseable with JSON.parse.
    await writeFile(outPath, `${JSON.stringify(entry, null, 2)}\n`, "utf8");
    created += 1;
  }

  process.stdout.write(
    `Rule review stubs: created ${created}, skipped ${skipped} (already existed)\n`,
  );
}

await main();


