# SailPoint API Guidelines (Rewrite)

This repo is dedicated to **writing/refining API rules and guidance** and generating/publishing the documentation site.

- **Docs framework**: FumaDocs (Next.js)
- **Authoring format**: Markdown / MDX
- **Rule IDs**: preserved numeric IDs (e.g. `[#148]`) for durable references and deep links

## Website

The documentation site is the repo root (this is a Next.js app).

- **Install**:

```bash
npm install
```

- **Run locally**:

```bash
npm run dev
```

- **Production build**:

```bash
npm run build
```

## Rules

Rules are authored as **one file per category** under `content/docs/rules/`.

- Rule headings must end with a numeric ID: `### MUST ... [#148]`
- The site generates stable anchors for each rule (both `#148` and `#rule-148`).

## Legacy content

Legacy AsciiDoc/HTML/PDF outputs have been removed after migrating the content into this app.
