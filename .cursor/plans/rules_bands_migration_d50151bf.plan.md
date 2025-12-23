---
name: Rules Bands Migration
overview: Consolidate the existing rules pages into 9 new numeric ranges (1000–9999) aligned to modern API guideline structure, then renumber rules and reorder each category page accordingly.
todos:
  - id: map-categories-to-bands
    content: Finalize which existing rules pages belong to each new numeric band (1000–9999) and confirm there are no stray rules outside the rules pages.
    status: pending
  - id: allocate-new-ids
    content: Create the full oldId→newId mapping, allocating new IDs within each band in the desired order while staying <9999.
    status: pending
    dependencies:
      - map-categories-to-bands
  - id: migrate-rule-headings
    content: Apply the new IDs to all rule headings across `content/docs/rules/*.mdx` and update all `[#…]` cross-references across `content/docs/**`.
    status: pending
    dependencies:
      - allocate-new-ids
  - id: migrate-review-ledger
    content: Rename `reviews/rules/*.yaml` to the new IDs and update their internal `ruleId`/anchors/urls to match.
    status: pending
    dependencies:
      - allocate-new-ids
  - id: regenerate-and-verify
    content: Regenerate `public/rules.json` and verify rule count, search, and ledger display with the new IDs.
    status: pending
    dependencies:
      - migrate-rule-headings
      - migrate-review-ledger
---

# Consolidate existing categories into new 1000–9999 bands

## Target bands (your structure)

- 1000–1999: API Contract & Documentation
- 2000–2999: Lifecycle & Compatibility
- 3000–3999: Security & Authorization
- 4000–4999: HTTP Semantics
- 5000–5999: Resource Modeling & URLs
- 6000–6999: Requests & Querying
- 7000–7999: Payload Conventions
- 8000–8999: Data Types & Common Objects
- 9000–9999: Operations & Quality

## Consolidation mapping (existing pages → new band)

This maps the current `content/docs/rules/*.mdx` pages into the new bands:

### 1000–1999: API Contract & Documentation

- [`content/docs/rules/api-design-and-documentation.mdx`](content/docs/rules/api-design-and-documentation.mdx)
- [`content/docs/rules/text-formatting-and-naming-conventions.mdx`](content/docs/rules/text-formatting-and-naming-conventions.mdx)

### 2000–2999: Lifecycle & Compatibility

- [`content/docs/rules/versioning-and-metadata.mdx`](content/docs/rules/versioning-and-metadata.mdx)
- [`content/docs/rules/backward-compatibility.mdx`](content/docs/rules/backward-compatibility.mdx)
- [`content/docs/rules/deprecation.mdx`](content/docs/rules/deprecation.mdx)

### 3000–3999: Security & Authorization

- [`content/docs/rules/security-and-authorization.mdx`](content/docs/rules/security-and-authorization.mdx)

### 4000–4999: HTTP Semantics

- [`content/docs/rules/http-methods-and-operations.mdx`](content/docs/rules/http-methods-and-operations.mdx)
- [`content/docs/rules/http-status-codes-and-error-handling.mdx`](content/docs/rules/http-status-codes-and-error-handling.mdx)
- [`content/docs/rules/http-headers.mdx`](content/docs/rules/http-headers.mdx)

### 5000–5999: Resource Modeling & URLs

- [`content/docs/rules/resource-and-url-design.mdx`](content/docs/rules/resource-and-url-design.mdx)
- [`content/docs/rules/hypermedia-and-links.mdx`](content/docs/rules/hypermedia-and-links.mdx)

### 6000–6999: Requests & Querying

- [`content/docs/rules/query-parameters-and-filtering.mdx`](content/docs/rules/query-parameters-and-filtering.mdx)
- [`content/docs/rules/pagination.mdx`](content/docs/rules/pagination.mdx)

### 7000–7999: Payload Conventions

- [`content/docs/rules/json-structure-and-properties.mdx`](content/docs/rules/json-structure-and-properties.mdx)
- [`content/docs/rules/boolean-and-null-handling.mdx`](content/docs/rules/boolean-and-null-handling.mdx)

### 8000–8999: Data Types & Common Objects

- [`content/docs/rules/data-types-and-formats.mdx`](content/docs/rules/data-types-and-formats.mdx)
- [`content/docs/rules/common-data-types-and-objects.mdx`](content/docs/rules/common-data-types-and-objects.mdx)

### 9000–9999: Operations & Quality

- [`content/docs/rules/performance-and-optimization.mdx`](content/docs/rules/performance-and-optimization.mdx)
- [`content/docs/rules/api-operation-and-monitoring.mdx`](content/docs/rules/api-operation-and-monitoring.mdx)

## How this consolidates the earlier (more granular) ranges

The prior 18-range draft collapses cleanly into your 9 bands:

- **API Design & Documentation + Text/Naming** → 1000–1999
- **Versioning/Metadata + Backward Compatibility + Deprecation** → 2000–2999
- **Security/Authorization** → 3000–3999
- **HTTP Methods + Status Codes/Error Handling + Headers** → 4000–4999
- **Resource/URL Design + Hypermedia/Links** → 5000–5999
- **Query/Filtering + Pagination** → 6000–6999
- **JSON Structure/Properties + Boolean/Null** → 7000–7999
- **Data Types/Formats + Common Objects** → 8000–8999
- **Performance/Optimization + API Operation/Monitoring** → 9000–9999

## Migration implications (unchanged)

- This is still a full renumbering of `[#<digits>]` anchors across the rules pages.
- You chose **no legacy aliases**, so old `#<oldId>` deep links will break.
- Tooling impact:
- regenerate [`public/rules.json`](public/rules.json)
- migrate `reviews/rules/*.yaml` filenames and `ruleId` values to the new IDs