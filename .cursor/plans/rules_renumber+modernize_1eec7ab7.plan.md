---
name: Rules Renumber+Modernize
overview: "Expand and modernize rules #100–#109, then migrate the entire ruleset to a new category-block numeric ID system and cleaner in-page ordering (like the HTTP status code page), updating tooling (rules.json, search, ledger) accordingly."
todos: []
---

# Modernize rules #100–#109 + migrate to new rule organization

## What you asked for

- Update rules **#100–#109** with practical guidance, clearer wording, and concrete examples.
- Improve the **ordering and structure** of rules across the whole set.
- Migrate to a **new organization system** with IDs that are more coherent than the current scattered numbering.

## Decisions captured

- **Renumbering**: You explicitly want to **renumber and accept breaking old deep links** (no legacy anchors).
- **Presentation**: Use **category pages** that are internally ordered and sectioned (like the HTTP status code page), plus a better top-level index.
- **New ID format**: **New numeric blocks per category** (e.g., 1000–1999 API Design, 2000–2999 Security, etc.).

## Constraints / implications (important)

- Existing tooling assumes IDs are numeric in the pattern `[#<digits>]` (see [`scripts/generate-rules-json.ts`](scripts/generate-rules-json.ts)). Renumbering requires:
- Rewriting all rule headings across `content/docs/rules/*.mdx`
- Regenerating [`public/rules.json`](public/rules.json)
- Updating any internal references to old IDs in docs (Guides/Appendices) and templates
- Migrating the review ledger files (YAML filenames + `ruleId` fields)
- Because you chose **no legacy aliases**, any saved links like `/docs/rules/...#106` will stop working after migration.

## Phase A — Draft + codify the content updates for #100–#109

Work in the review ledger first (no MDX edits until the proposals are approved):

- Update these review entries with expanded, practical content and examples:
- `reviews/rules/100.yaml` — expand what “API First” means in practice; add checklists + examples; add enforcement/testability hooks
- `reviews/rules/101.yaml` — keep; light polish
- `reviews/rules/102.yaml` — expand to require step-by-step guides per API slice/use case; require linking via `externalDocs`
- `reviews/rules/103.yaml` — refine U.S. English rule (scope + consistency checklist)
- `reviews/rules/104.yaml` — expand: explicitly document user vs system context per operation and required scopes
- `reviews/rules/105.yaml` — clarify union/AND scope requirement per operation; encourage splitting when behavior differs
- `reviews/rules/106.yaml` — expand with explicit “breaking vs non-breaking” list across schema, enums, validation, defaults, auth, errors
- `reviews/rules/107.yaml` — rewrite to define “compatible extensions” with examples
- `reviews/rules/108.yaml` — rewrite with examples for unknown fields/enums/status codes and SDK behavior
- `reviews/rules/109.yaml` — clarify conservative inputs with tradeoffs + examples; guidance on tightening validation safely

Then apply accepted content into:

- [`content/docs/rules/api-design-and-documentation.mdx`](content/docs/rules/api-design-and-documentation.mdx)
- [`content/docs/rules/security-and-authorization.mdx`](content/docs/rules/security-and-authorization.mdx)
- [`content/docs/rules/backward-compatibility.mdx`](content/docs/rules/backward-compatibility.mdx)
- [`content/docs/rules/text-formatting-and-naming-conventions.mdx`](content/docs/rules/text-formatting-and-naming-conventions.mdx)

## Phase B — Define the new global rule organization + numeric blocks

1. Define a **category → numeric range** mapping (example proposal):

- 1000–1999: API Design & Documentation
- 2000–2999: Versioning & Metadata
- 3000–3999: Security & Authorization
- 4000–4999: Backward Compatibility
- 5000–5999: Resource & URL Design
- 6000–6999: Query Parameters & Filtering
- 7000–7999: JSON Structure & Properties
- 8000–8999: Boolean & Null Handling
- 9000–9999: Data Types & Formats
- 10000–10999: Common Data Types & Objects
- 11000–11999: HTTP Methods & Operations
- 12000–12999: HTTP Status Codes & Error Handling
- 13000–13999: HTTP Headers
- 14000–14999: Performance & Optimization
- 15000–15999: Pagination
- 16000–16999: Hypermedia & Links
- 17000–17999: API Operation & Monitoring
- 18000–18999: Deprecation

2. Within each category page, reorder rules into a logical progression (e.g., “Basics → Advanced → Edge cases → Testability”) and add internal section headings similar to the HTTP status code page.

## Phase C — Renumber migration (breaking old deep links)

1. Create a deterministic mapping: **oldId → newId** for every rule.
2. Update all rule headings across `content/docs/rules/**/*.mdx`:

- From: `### ... [#106]`
- To: `### ... [#4xxx]` (per the new mapping)

3. Update cross-references inside docs (`[#106]` mentions) across `content/docs/**` to the new IDs.
4. Regenerate `public/rules.json` and ensure the generator still finds all rules.

## Phase D — Update tooling to match the new organization

- Update [`scripts/generate-rules-json.ts`](scripts/generate-rules-json.ts) if needed (it currently assumes numeric IDs; your new system is still numeric, so the main change is the **new numbers** and ensuring all headings conform).
- Update the review ledger:
- Rename/migrate files under `reviews/rules/` to the new IDs.
- Update `ruleId`, `source.anchor`, and `source.url` fields.
- Update `scripts/generate-rule-review-stubs.ts` to create stubs using the new IDs after renumbering.
- Ensure the ledger page (`content/docs/appendices/rules-review-ledger.mdx` + `components/rules-review-ledger.tsx`) still renders statuses correctly.

## Phase E — Add better navigation / indexes

- Add a “Rules Index (New Order)” page that groups rules by category and displays them in the new sequence (in addition to the sidebar order).