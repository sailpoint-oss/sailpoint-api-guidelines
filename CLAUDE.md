# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A documentation site for SailPoint's API design guidelines, built with FumaDocs (Next.js) and MDX. The content is a set of numbered API rules organized by category, plus guides and appendices.

## Commands

```bash
pnpm install         # install deps (CI uses pnpm install --frozen-lockfile)
pnpm dev             # local dev server
pnpm build           # production build
pnpm lint            # biome check (linting + formatting check)
pnpm format          # biome format --write
pnpm types:check     # fumadocs-mdx && next typegen && tsc --noEmit
pnpm rules:generate  # bun run scripts/generate-rules-json.ts → public/rules.json
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

- `content/docs/rules/` — One file per rule category (e.g., `http-semantics.mdx`, `payload-conventions.mdx`). Each file contains multiple rules.
- `content/docs/guides/` — Longer-form how-to guides
- `content/docs/appendices/` — Reference material (checklists, glossary, snippets)

### Rule Format

Each rule uses the `<RuleHeader>` MDX component (registered in `mdx-components.tsx`). The pattern in MDX files is:

```mdx
### #148 - Rule Title Here
<RuleHeader id="148" level="MUST" title="Rule Title Here" externalDocs={[...]} implementation={[...]} />
```

- **id**: Stable numeric identifier, never reused. Used for anchors (`#148`) and deep links.
- **level**: One of `MUST`, `SHOULD`, `MAY` (RFC 2119 keywords).
- The heading must match the format `### #<id> - <title>` for consistent anchor generation.

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
