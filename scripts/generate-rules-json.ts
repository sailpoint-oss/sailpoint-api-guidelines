import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Works in Bun and Node (no Bun-specific import.meta fields).
const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_ROOT = path.join(REPO_ROOT, "content", "docs");
const RULES_ROOT = path.join(CONTENT_ROOT, "rules");
const OUTPUT_PATH = path.join(REPO_ROOT, "public", "rules.json");

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function toRoute(filePath: string): string {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const noExt = rel.replace(/\.(md|mdx)$/, "");
  const routePath = noExt === "index" ? "" : noExt.replace(/\/index$/, "");
  return `/docs/${routePath}`.replace(/\/+$/, "") || "/docs";
}

type RuleIndexEntry = {
  id: string;
  title: string;
  level: string;
  category: string;
  categorySlug: string;
  url: string;
};

function parseRuleHeaderBlock(
  block: string,
): { id: string; title: string; level: string } | null {
  // Canonical rule metadata lives in RuleHeader components. The block may be
  // one physical line or many (e.g. when the `examples` prop spans lines).
  const id = block.match(/\bid="([a-z][a-z0-9-]*)"/)?.[1];
  const title = block.match(/\btitle="([^"]+)"/)?.[1];
  const level = block.match(/\blevel="(MUST|SHOULD|MAY)"/)?.[1];
  if (!id || !title || !level) return null;

  return { id, title: title.trim(), level };
}

function* iterateRuleHeaderBlocks(raw: string): Generator<string> {
  // Accumulate physical lines between `<RuleHeader` and `/>` into a single block.
  const lines = raw.split("\n");
  let buffer: string[] = [];
  let inBlock = false;
  for (const line of lines) {
    if (!inBlock) {
      const start = line.indexOf("<RuleHeader");
      if (start === -1) continue;
      inBlock = true;
      const tail = line.slice(start);
      buffer = [tail];
      if (tail.includes("/>")) {
        yield buffer.join("\n");
        buffer = [];
        inBlock = false;
      }
      continue;
    }
    buffer.push(line);
    if (line.includes("/>")) {
      yield buffer.join("\n");
      buffer = [];
      inBlock = false;
    }
  }
}

function extractFrontmatterTitle(content: string): string | null {
  // Match frontmatter title, handling both quoted and unquoted values
  const match = content.match(
    /^---[\s\S]*?^title:\s*["']?([^"'\n]+)["']?\s*$/m,
  );
  return match?.[1]?.trim() ?? null;
}

async function main(): Promise<void> {
  const rules: RuleIndexEntry[] = [];
  const seen = new Map<string, string>();

  for await (const filePath of walk(RULES_ROOT)) {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) continue;
    // Skip index files
    if (filePath.endsWith("index.mdx") || filePath.endsWith("index.md"))
      continue;

    const route = toRoute(filePath);
    const raw = await readFile(filePath, "utf8");

    // Extract category from frontmatter or filename
    const categoryTitle =
      extractFrontmatterTitle(raw) ?? path.basename(filePath, ".mdx");
    const categorySlug = path.basename(filePath, ".mdx");

    for (const block of iterateRuleHeaderBlocks(raw)) {
      const parsed = parseRuleHeaderBlock(block);
      if (!parsed) continue;
      const { id, title, level } = parsed;

      if (seen.has(id)) {
        throw new Error(
          `Duplicate rule id [#${id}] in ${filePath} (already seen in ${seen.get(id)})`,
        );
      }

      seen.set(id, filePath);
      rules.push({
        id,
        title,
        level,
        category: categoryTitle,
        categorySlug,
        url: `${route}#${id}`,
      });
    }
  }

  rules.sort((a, b) => a.id.localeCompare(b.id));
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    `${JSON.stringify({ rules }, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(
    `Wrote ${rules.length} rules to ${path.relative(REPO_ROOT, OUTPUT_PATH)}\n`,
  );
}

await main();
