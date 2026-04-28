/**
 * Validates internal /docs/* links and [#rule-id] citations.
 * Optional: HEAD-check external https URLs (set CHECK_EXTERNAL_URLS=1).
 * External scan skips fenced code blocks, RFC 9457 `type` URIs under
 * developer.sailpoint.com/problems/, OpenAPI `{variable}` URLs, localhost,
 * and example.sailpoint.com.
 *
 * Run: bun run scripts/validate-docs-links.ts
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createRuleLinkRegex } from "../lib/rule-links";

const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_ROOT = path.join(REPO_ROOT, "content", "docs");
const RULES_JSON_PATH = path.join(REPO_ROOT, "public", "rules.json");
const CHECK_EXTERNAL = process.env.CHECK_EXTERNAL_URLS === "1";

const INTERNAL_MD_RE = /\]\(\/docs\/[^)]+\)/g;
const INTERNAL_HREF_RE = /href="(\/docs\/[^"]+)"/g;
const EXTERNAL_URL_RE = /https?:\/\/[^\s)"'<>]+/g;

/** Remove fenced code so example JSON/YAML URLs are not link-checked. */
function stripFencedCodeBlocks(source: string): string {
  return source.replace(/```[\s\S]*?```/g, "\n");
}

/**
 * Normalize a URL substring from markdown/yaml and drop values that are not
 * meant to be dereferenced (placeholders, RFC 9457 type URIs, inline-code junk).
 */
function normalizeExternalUrl(raw: string): string | null {
  const u = raw
    .replace(/[),.;]+$/, "")
    .replace(/[`]+$/, "")
    .replace(/\*+$/, "")
    .replace(/\\n?$/g, "");
  if (u.includes("spec.openapis.org")) return null;
  if (u.includes("/...")) return null;
  if (u.includes("{")) return null;
  if (u.startsWith("https://developer.sailpoint.com/problems/")) return null;
  if (/example\.sailpoint\.com/i.test(u)) return null;
  if (/^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\b/i.test(u)) return null;

  try {
    const parsed = new URL(u);
    if (!parsed.hostname || parsed.hostname.length < 2) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

type RulesData = {
  rules: Array<{ id: string; url: string }>;
};

function toDocRoute(filePath: string): string {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const noExt = rel.replace(/\.(md|mdx)$/, "");
  const routePath = noExt === "index" ? "" : noExt.replace(/\/index$/, "");
  const r = `/docs/${routePath}`.replace(/\/+$/, "");
  return r || "/docs";
}

function slugifyHeading(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function* walkFiles(
  dir: string,
  exts: readonly string[],
): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkFiles(full, exts);
    else if (exts.some((e) => full.endsWith(e))) yield full;
  }
}

function collectAnchorsFromMdx(raw: string): Set<string> {
  const anchors = new Set<string>();
  for (const m of raw.matchAll(/\bid="([^"]+)"/g)) {
    anchors.add(m[1]);
  }
  for (const m of raw.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const text = m[1].trim();
    anchors.add(text);
    anchors.add(slugifyHeading(text));
  }
  return anchors;
}

function normalizeInternalPath(href: string): {
  path: string;
  hash: string | null;
} {
  const [pathPart, h = ""] = href.split("#");
  const hash = h ? h.replace(/\/$/, "") : null;
  let p = pathPart.split("?")[0];
  if (p.endsWith("/") && p.length > 1) p = p.slice(0, -1);
  return { path: p || "/docs", hash };
}

async function main(): Promise<void> {
  const rulesRaw = await readFile(RULES_JSON_PATH, "utf8");
  const rulesData = JSON.parse(rulesRaw) as RulesData;
  const ruleById = new Map(rulesData.rules.map((r) => [r.id, r]));

  const routeToFile = new Map<string, string>();
  for await (const fp of walkFiles(CONTENT_ROOT, [".mdx", ".md"])) {
    routeToFile.set(toDocRoute(fp), fp);
  }

  const scanRoots: Array<{ label: string; dir: string; exts: string[] }> = [
    { label: "content/docs", dir: CONTENT_ROOT, exts: [".mdx", ".md"] },
    {
      label: "reviews/rules",
      dir: path.join(REPO_ROOT, "reviews", "rules"),
      exts: [".yaml", ".yml"],
    },
  ];
  const extraFiles = [
    path.join(REPO_ROOT, "TESTABLE_RULES.md"),
    path.join(REPO_ROOT, "README.md"),
    path.join(REPO_ROOT, "CLAUDE.md"),
    path.join(REPO_ROOT, "reviews", "legacy-content-map.md"),
    path.join(REPO_ROOT, "app", "(home)", "page.tsx"),
  ];

  const errors: string[] = [];
  let internalChecked = 0;
  let ruleRefsChecked = 0;

  async function scanFile(filePath: string, _label: string): Promise<void> {
    let raw: string;
    try {
      raw = await readFile(filePath, "utf8");
    } catch {
      return;
    }
    const rel = path.relative(REPO_ROOT, filePath);

    for (const m of raw.matchAll(createRuleLinkRegex())) {
      ruleRefsChecked += 1;
      const id = m[1];
      if (!ruleById.has(id)) {
        errors.push(`Unknown rule link [#${id}] in ${rel}`);
      }
    }

    const internalHrefs = [
      ...raw.matchAll(INTERNAL_MD_RE),
      ...raw.matchAll(INTERNAL_HREF_RE),
    ];
    for (const m of internalHrefs) {
      const full = m[0].startsWith("href=")
        ? (m as RegExpMatchArray)[1]
        : m[0].slice(2, -1);
      internalChecked += 1;
      const { path: docPath, hash } = normalizeInternalPath(full);
      const targetFile = routeToFile.get(docPath);
      if (!targetFile) {
        errors.push(
          `Broken internal link ${full} in ${rel} (no page for ${docPath})`,
        );
        continue;
      }
      if (!hash) continue;

      const ruleEntry = ruleById.get(hash);
      if (ruleEntry !== undefined) {
        if (
          !ruleEntry.url.startsWith(`${docPath}#`) &&
          ruleEntry.url !== `${docPath}#${hash}`
        ) {
          errors.push(
            `Rule [#${hash}] linked from ${docPath} in ${rel}, but rule lives at ${ruleEntry.url}`,
          );
        }
        continue;
      }

      const targetRaw = await readFile(targetFile, "utf8");
      const anchors = collectAnchorsFromMdx(targetRaw);
      if (!anchors.has(hash)) {
        errors.push(
          `Unknown anchor #${hash} on ${docPath} (from ${rel}) — not a rule id and not found as heading/id in ${path.relative(REPO_ROOT, targetFile)}`,
        );
      }
    }

    if (!CHECK_EXTERNAL) return;

    const externalScan = stripFencedCodeBlocks(raw);
    const externalRes = new Set<string>();
    for (const m of externalScan.matchAll(EXTERNAL_URL_RE)) {
      const u = normalizeExternalUrl(m[0]);
      if (u) externalRes.add(u);
    }
    for (const url of externalRes) {
      try {
        const res = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(8000),
          headers: { "User-Agent": "sailpoint-api-guidelines-link-check/1.0" },
        });
        if (res.status === 405 || res.status === 501) {
          const getRes = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(8000),
            headers: {
              "User-Agent": "sailpoint-api-guidelines-link-check/1.0",
            },
          });
          if (getRes.status >= 400) {
            errors.push(
              `External URL ${url} returned ${getRes.status} (from ${rel})`,
            );
          }
          continue;
        }
        if (res.status >= 400) {
          errors.push(
            `External URL ${url} returned ${res.status} (from ${rel})`,
          );
        }
      } catch (e) {
        errors.push(
          `External URL fetch failed ${url} in ${rel}: ${e instanceof Error ? e.message : e}`,
        );
      }
    }
  }

  for (const root of scanRoots) {
    try {
      await stat(root.dir);
    } catch {
      continue;
    }
    for await (const fp of walkFiles(root.dir, root.exts)) {
      await scanFile(fp, root.label);
    }
  }

  for (const fp of extraFiles) {
    try {
      await stat(fp);
      await scanFile(fp, "extra");
    } catch {
      // optional
    }
  }

  if (errors.length > 0) {
    process.stderr.write(`${errors.join("\n")}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    `Docs link check OK: ${internalChecked} /docs links, ${ruleRefsChecked} [#rule-id] refs (${path.relative(REPO_ROOT, CONTENT_ROOT)} + reviews + extras)\n`,
  );
}

await main();
