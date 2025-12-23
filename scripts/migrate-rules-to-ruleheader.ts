import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Converts rule headings of the form:
//   ### MUST do something [#123]
// into:
//   ### MUST do something
//   <RuleHeader id="123" level="MUST" title="do something" />
//
// And then normalizes order to:
//   <RuleHeader ... />
//   ### MUST do something
//
// Notes:
// - We keep the markdown heading for TOC/navigation, but RuleHeader becomes the canonical metadata.
// - We intentionally keep RuleHeader on ONE line for rules.json generator parsing.

const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const RULES_DIR = path.join(REPO_ROOT, "content", "docs", "rules");

const RULE_HEADING_RE = /^(#{2,6})\s+(MUST|SHOULD|MAY)\s+(.*?)\s+\[#(\d+)\]\s*$/;
const MERGED_HEADING_RE = /^(#{2,6})\s+(MERGED\s+into\s+.*)\s+\[#(\d+)\]\s*$/;
const CURRENT_RULE_HEADING_RE = /^(#{2,6})\s+(MUST|SHOULD|MAY)\s+(.+?)\s*$/;
const CURRENT_MERGED_HEADING_RE = /^(#{2,6})\s+(MERGED\s+into\s+.*)\s*$/;
const RULEHEADER_LINE_RE = /^\s*<RuleHeader\b[^>]*\/>\s*$/;

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

async function main(): Promise<void> {
  const ents = await readdir(RULES_DIR, { withFileTypes: true });
  const mdxFiles = ents
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(RULES_DIR, e.name))
    .filter((p) => !p.endsWith(`${path.sep}index.mdx`));

  for (const filePath of mdxFiles) {
    const raw = await readFile(filePath, "utf8");
    const lines = raw.split("\n");
    const out: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? "";

      // Current-format reorder: if we see a markdown heading immediately followed by a RuleHeader line,
      // swap them so RuleHeader comes first.
      const nextLine = lines[i + 1] ?? "";
      const currentRule = line.match(CURRENT_RULE_HEADING_RE);
      const currentMerged = line.match(CURRENT_MERGED_HEADING_RE);
      if ((currentRule || currentMerged) && nextLine.match(RULEHEADER_LINE_RE)) {
        out.push(nextLine);
        out.push(line);
        i += 1;
        continue;
      }

      const m = line.match(RULE_HEADING_RE);
      if (!m) {
        const merged = line.match(MERGED_HEADING_RE);
        if (!merged) {
          out.push(line);
          continue;
        }

        const hashes = merged[1]!;
        const title = merged[2]!.trim(); // keep as-is (may contain [#...] refs inside)
        const id = merged[3]!;

        out.push(`<RuleHeader id="${id}" level="MUST" title="${escapeAttr(title)}" />`);
        out.push(`${hashes} ${title}`);
        continue;
      }

      const hashes = m[1]!;
      const level = m[2]!;
      const title = m[3]!.trim();
      const id = m[4]!;

      // Insert canonical RuleHeader first (H2 anchor/header is rendered by the component).
      out.push(`<RuleHeader id="${id}" level="${level}" title="${escapeAttr(title)}" />`);

      // Then keep the textual rule header as an H3 (for TOC/reading flow).
      // We purposely omit the legacy [#id] suffix.
      out.push(`${hashes} ${level} ${title}`);
    }

    const updated = out.join("\n");
    if (updated !== raw) await writeFile(filePath, updated, "utf8");
  }

  process.stdout.write("Migrated rules pages to <RuleHeader /> metadata.\n");
}

await main();


