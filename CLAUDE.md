# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A documentation site for SailPoint's API design guidelines, built with FumaDocs (Next.js) and MDX. The content is a set of API rules identified by stable kebab-case IDs, organized by category. Rules are the sole source of truth — there are no separate guides or appendix pages.

## Commands

```bash
pnpm install         # install deps (CI uses pnpm install --frozen-lockfile)
pnpm dev             # local dev server
pnpm build           # production build
pnpm lint            # biome check (linting + formatting check)
pnpm format          # biome format --write
pnpm types:check     # fumadocs-mdx && next typegen && tsc --noEmit
pnpm rules:generate  # bun run scripts/generate-rules-json.ts → public/rules.json
pnpm docs-links:validate # bun run scripts/validate-docs-links.ts
pnpm reviews:stubs   # bun run scripts/generate-rule-review-stubs.ts
pnpm reviews:validate # bun run scripts/validate-reviews.ts
```

Scripts in `scripts/` require **bun** to execute.

## Architecture

- **Framework**: Next.js App Router + FumaDocs (fumadocs-core, fumadocs-mdx, fumadocs-ui)
- **Styling**: Tailwind CSS v4 + tw-animate-css; UI primitives in `components/ui/` built on @base-ui/react + class-variance-authority
- **Linter/Formatter**: Biome (not ESLint/Prettier). Config in `biome.json`. Indent: 2 spaces.
- **Font**: Poppins (Google Fonts via next/font)
- **Path aliases**: `@/*` maps to repo root (tsconfig `paths`)

### Content Structure

All documentation lives in `content/docs/` as MDX files. Sidebar order is controlled by `meta.json` files in each directory.

- `content/docs/index.mdx` — Short getting-started landing page
- `content/docs/rules/` — One file per rule category (e.g., `http-semantics.mdx`, `payload-conventions.mdx`). Each file contains multiple rules. All substantive content (requirements, examples, anti-patterns) lives here.

### Rule Format

Each rule uses the `<RuleHeader>` MDX component (registered in `mdx-components.tsx`). The pattern in MDX files is:

```mdx
### use-standard-headers
<RuleHeader
  id="use-standard-headers"
  level="MUST"
  title="Use Standard HTTP Headers"
  externalDocs={[...]}
  implementation={[...]}
  examples={[{ lang: "yaml", code: "..." }]}
/>
```

- **id**: Stable kebab-case identifier (derived from the rule name, linter-style), never reused. Used for anchors (`#use-standard-headers`) and deep links.
- **level**: One of `MUST`, `SHOULD`, `MAY` (RFC 2119 keywords).
- **examples**: Optional array of `{ label?, lang, code }`. The first example renders as the canonical snippet directly under the rule's badge row. Use YAML for OpenAPI contract shape, JSON for payload shape, HTTP for headers/status/URL.
- The markdown heading is the same kebab-case string as **id** (for TOC and anchor alignment).

The `RuleHeader` component is split across: `components/rule-header.tsx` (server), `components/rule-header.client.tsx` (client interactivity), `components/rule-header.external-docs.tsx`, `components/rule-header.implementation.tsx`.

### Key App Routes

- `/` — Homepage (`app/(home)/page.tsx`)
- `/docs/[...slug]` — All documentation pages (`app/docs/[[...slug]]/page.tsx`)
- `/api/search` — FumaDocs search endpoint
- `/llms-full.txt` — LLM-friendly plaintext export of all docs
- `/og/docs/[...slug]` — OG image generation

### Data Pipeline

`scripts/generate-rules-json.ts` parses all `<RuleHeader>` components from rule MDX files and produces `public/rules.json` — a flat index of all rules with id, title, and URL. Run `pnpm rules:generate` after adding/renaming rules.

### Source Configuration

`source.config.ts` defines the FumaDocs content collection (docs dir: `content/docs`). The `lib/source.ts` loader creates the page tree used by layouts and navigation.
