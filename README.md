# SailPoint API Guidelines

This repository is the source for SailPoint’s **API design guidelines**: numbered rules, guides, and appendices, published as a static documentation site.

- **Framework**: [Next.js](https://nextjs.org/) (App Router) with [FumaDocs](https://fumadocs.dev/) (`fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`)
- **Content**: MDX under [`content/docs/`](content/docs/)
- **Rule IDs**: Stable numeric IDs for anchors, search, and deep links

**Repository**: [github.com/sailpoint-oss/sailpoint-api-guidelines](https://github.com/sailpoint-oss/sailpoint-api-guidelines)

The site is deployed from `main` to **GitHub Pages** with base path `/sailpoint-api-guidelines` (for example `https://sailpoint-oss.github.io/sailpoint-api-guidelines/` when hosted under that org).

## Prerequisites

| Tool | Notes |
|------|--------|
| **Node.js 20** | Matches [CI](.github/workflows/build.yml); use this version locally. |
| **[pnpm](https://pnpm.io/installation)** | Package manager for installs and Node scripts. This repo is set up for pnpm (`pnpm-lock.yaml`). |
| **Bun** | Required for scripts under `scripts/` that are invoked as `bun run …` (rules index, reviews, link checks, `verify`). [Install Bun](https://bun.sh/docs/installation). |

## Local development

1. Clone the repository.
2. Install dependencies:

   ```bash
   pnpm install
   ```

   On install, **`postinstall`** runs `fumadocs-mdx` to generate MDX-related build inputs.

3. Start the dev server:

   ```bash
   pnpm dev
   ```

4. Open **http://localhost:3000** in a browser (or the URL Next.js prints if the port is taken).

Optional while editing:

```bash
pnpm lint            # Biome check (lint + format check)
pnpm types:check     # MDX codegen, Next typegen, TypeScript
```

## Building and previewing the static site

The app uses Next.js **`output: "export"`** ([`next.config.mjs`](next.config.mjs)). A production build writes a fully static site to the **`out/`** directory.

```bash
pnpm build
```

**GitHub Pages build** (same as [`.github/workflows/pages.yml`](.github/workflows/pages.yml)): set `GITHUB_PAGES=true` so `basePath` / `assetPrefix` use `/sailpoint-api-guidelines`:

```bash
GITHUB_PAGES=true pnpm build
```

Preview the static output with any static file server, for example:

```bash
pnpm dlx serve out
```

For a Pages-faithful preview (correct asset URLs), serve from a path that matches the configured base path, or rely on `pnpm dev` for day-to-day work.

> **`pnpm start`** runs `next start`, which is intended for a Node server deployment. This project’s primary artifact is the **`out/`** static export, not a long-running Next server.

## Package scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local development server (hot reload). |
| `pnpm build` | Production static export → `out/`. |
| `pnpm lint` | `biome check` — lint and formatting check. |
| `pnpm format` | `biome format --write` — apply formatter. |
| `pnpm types:check` | `fumadocs-mdx`, `next typegen`, `tsc --noEmit`. |
| `pnpm rules:generate` | Regenerate [`public/rules.json`](public/rules.json) from rule MDX (`bun`). Run after adding or renaming rules. |
| `pnpm rule-links:validate` | Validate rule cross-links (`bun`). |
| `pnpm reviews:stubs` | Generate rule review stub files (`bun`). |
| `pnpm reviews:validate` | Validate rule reviews (`bun`). |
| `pnpm verify` | Regenerate `public/rules.json`, fail if git diff, then run `reviews:validate` and `rule-links:validate` — mirrors part of CI. |

## Before opening a pull request

Align with [`.github/workflows/build.yml`](.github/workflows/build.yml):

```bash
pnpm verify
pnpm types:check
pnpm lint
```

For a production build (as CI does for static output):

```bash
GITHUB_PAGES=true pnpm build
```

## Authoring rules

Rules live as **one MDX file per category** under [`content/docs/rules/`](content/docs/rules/). Sidebar order is controlled by `meta.json` files in the docs tree (for example [`content/docs/meta.json`](content/docs/meta.json) and [`content/docs/rules/meta.json`](content/docs/rules/meta.json)).

Each rule uses a level-3 heading with a **numeric id** and title, plus the `<RuleHeader>` component:

```mdx
### #148 - Rule title here

<RuleHeader
  id="148"
  level="MUST"
  title="Rule title here"
  externalDocs={[...]}
  implementation={[...]}
/>
```

- **`id`**: Stable numeric identifier (never reused). Used for anchors (e.g. `#148`) and URLs.
- **`level`**: One of `MUST`, `SHOULD`, `MAY` (RFC 2119).
- The heading must stay in the form `### #<id> - <title>` so anchors and generated metadata stay consistent.

`RuleHeader` is implemented across [`components/rule-header.tsx`](components/rule-header.tsx), [`components/rule-header.client.tsx`](components/rule-header.client.tsx), and related files.

## Legacy content

Older AsciiDoc / HTML / PDF deliverables were removed after the content moved into this Next.js app.
