## Rule review entries (`reviews/rules/`)

Each file in this folder represents the review status + decisions for one rule ID.

- **Filename**: `<ruleId>.yaml` (example: `151.yaml`)
- **Format**: JSON-formatted YAML (valid YAML, parseable via `JSON.parse`)

### Schema (v1)

Required top-level fields:

- `schemaVersion`: number (currently `1`)
- `ruleId`: string (e.g. `"151"`)
- `source`:
  - `doc`: string (MDX path, e.g. `"content/docs/rules/http-status-codes-and-error-handling.mdx"`)
  - `anchor`: string (e.g. `"#151"`)
  - `url`: string (site URL, e.g. `"/docs/rules/http-status-codes-and-error-handling#151"`)
- `currentTitle`: string
- `status`: one of:
  - `"pending"`
  - `"in_review"`
  - `"accepted"`
  - `"needs_rework"`
  - `"rejected"`
- `decision`:
  - `changeType`: one of:
    - `"none"`
    - `"editorial"`
    - `"normative"`
    - `"split"`
    - `"merge"`
    - `"move"`
    - `"deprecate"`
  - `proposedTitle`: string | null
  - `proposedText`: string | null (full markdown for the rule section body; headings handled separately)
  - `rationale`: string | null
  - `compatNotes`: string | null
- `reviewNotes`: array of strings (chronological notes; links allowed)

### Status semantics

- `pending`: not reviewed yet
- `in_review`: actively being discussed
- `needs_rework`: reviewed but needs follow-up before acceptance
- `accepted`: approved and ready to implement into MDX
- `rejected`: intentionally not adopted (keep note of why)


