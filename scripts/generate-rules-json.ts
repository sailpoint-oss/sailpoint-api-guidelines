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
	url: string;
};

function parseRuleHeaderLine(rawLine: string): { id: string; title: string } | null {
	// Canonical rule metadata lives in RuleHeader components.
	//
	// Prefer one-per-line (recommended), but tolerate multi-line blocks by treating
	// each physical line independently (this parser is intentionally simple).
	const line = rawLine.trim();
	if (!line.startsWith("<RuleHeader")) return null;
	if (!line.includes("/>")) return null;

	const id = line.match(/\bid="(\d+)"/)?.[1];
	const title = line.match(/\btitle="([^"]+)"/)?.[1];
	if (!id || !title) return null;

	return { id, title: title.trim() };
}

async function main(): Promise<void> {
	const rules: RuleIndexEntry[] = [];
	const seen = new Map<string, string>();

	for await (const filePath of walk(RULES_ROOT)) {
		if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) continue;

		const route = toRoute(filePath);
		const raw = await readFile(filePath, "utf8");
		const lines = raw.split("\n");

		for (const line of lines) {
			const parsed = parseRuleHeaderLine(line);
			if (!parsed) continue;
			const { id, title } = parsed;

			if (seen.has(id)) {
				throw new Error(
					`Duplicate rule id [#${id}] in ${filePath} (already seen in ${seen.get(id)})`,
				);
			}

			seen.set(id, filePath);
			rules.push({
				id,
				title,
				url: `${route}#${id}`,
			});
		}
	}

	rules.sort((a, b) => Number(a.id) - Number(b.id));
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
