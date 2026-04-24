# Testable API Rules Reference

This document catalogs every rule in the SailPoint API Guidelines that can be validated
programmatically against an OpenAPI specification. Each entry includes the rule metadata,
what specifically can be tested, and a link to the full rule on the documentation site.

> **Base URL**: `https://sailpoint-api-guidelines.vercel.app` (adjust if deployed elsewhere)

---

## How to Read This Document

- **Testability**: `full` = the entire rule can be checked by a linter; `partial` = some aspects
  require human judgment but key signals are machine-checkable; `process` = the rule is about
  workflow/behavior and cannot be linted against a spec alone.
- **What to Check**: concrete, implementable checks a linter or LSP can perform.
- **Level**: RFC 2119 keyword (MUST, SHOULD, MAY).

---

## API Contract & Documentation (100-series)

### follow-api-first
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#follow-api-first](/docs/rules/api-contract-and-documentation#follow-api-first) |

**What to Check**: Not directly testable. Process rule about designing API-first.

---

### provide-an-openapi-specification
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-an-openapi-specification](/docs/rules/api-contract-and-documentation#provide-an-openapi-specification) |

**What to Check**:
- [ ] OpenAPI document exists and is valid (parseable, no schema errors)
- [ ] OpenAPI version is 3.0.3 or 3.1.x
- [ ] Document passes a standard OpenAPI validator (e.g., `@redocly/cli lint`, `spectral`)

---

### provide-an-api-user-manual
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-an-api-user-manual](/docs/rules/api-contract-and-documentation#provide-an-api-user-manual) |

**What to Check**:
- [ ] `externalDocs` is present at root level or on tags/operations
- [ ] `info.description` contains links to guides or user manual

---

### write-in-u-s-english
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#write-in-u-s-english](/docs/rules/api-contract-and-documentation#write-in-u-s-english) |

**What to Check**:
- [ ] Scan `description`, `summary`, `title` fields for common British spellings (colour, authorisation, behaviour, catalogue, etc.)
- [ ] Flag non-ASCII characters in descriptions that aren't code examples

---

### use-camelcase-for-json-properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-camelcase-for-json-properties](/docs/rules/api-contract-and-documentation#use-camelcase-for-json-properties) |

**What to Check**:
- [ ] Every property name in every schema matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No property names use snake_case, PascalCase, or kebab-case
- [ ] Acronyms follow lowercase-start convention (e.g., `oauthClientId` not `OAuthClientID`)

---

### use-ascii-for-api-identifiers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-ascii-for-api-identifiers](/docs/rules/api-contract-and-documentation#use-ascii-for-api-identifiers) |

**What to Check**:
- [ ] All path segments contain only ASCII characters
- [ ] All path parameter names contain only ASCII characters
- [ ] All query parameter names contain only ASCII characters
- [ ] All JSON property names contain only ASCII characters
- [ ] All enum values contain only ASCII characters

---

### pluralize-array-property-names
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#pluralize-array-property-names](/docs/rules/api-contract-and-documentation#pluralize-array-property-names) |

**What to Check**:
- [ ] Properties with `type: array` have plural names (heuristic: ends in `s`, `es`, `ies`, `ren`, or is in a known exceptions list like `data`, `metadata`)
- [ ] Flag singular-named array properties for review

---

### use-lowercase-hyphenated-path-segments-and-camelcase-path-parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-lowercase-hyphenated-path-segments-and-camelcase-path-parameters](/docs/rules/api-contract-and-documentation#use-lowercase-hyphenated-path-segments-and-camelcase-path-parameters) |

**What to Check**:
- [ ] All path segments (non-parameter parts) match `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`
- [ ] All path parameter names match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No path segments use PascalCase, snake_case, or camelCase

---

### use-camelcase-for-query-parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-camelcase-for-query-parameters](/docs/rules/api-contract-and-documentation#use-camelcase-for-query-parameters) |

**What to Check**:
- [ ] All query parameter names (`in: query`) match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No query parameters use snake_case, PascalCase, or kebab-case

---

### use-upper-case-words-with-hyphens
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-upper-case-words-with-hyphens](/docs/rules/api-contract-and-documentation#use-upper-case-words-with-hyphens) |

**What to Check**:
- [ ] Header parameter names (`in: header`) match `^[A-Z][a-z0-9]*(-[A-Z][a-z0-9]*)*$` pattern (e.g., `Content-Type`, `X-Request-Id`)
- [ ] Flag lowercase or snake_case header names

---

### pluralize-collection-resource-names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#pluralize-collection-resource-names](/docs/rules/api-contract-and-documentation#pluralize-collection-resource-names) |

**What to Check**:
- [ ] Collection paths (paths that support GET returning a list) use plural resource names
- [ ] Leaf path segments before `/{paramId}` patterns are plural
- [ ] Flag singular collection endpoints

---

### follow-naming-convention-for-permissions-scopes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#follow-naming-convention-for-permissions-scopes](/docs/rules/api-contract-and-documentation#follow-naming-convention-for-permissions-scopes) |

**What to Check**:
- [ ] All scopes in `securitySchemes` and `security` match `^[a-z]+:[a-z]+(-[a-z]+)*:(read|write|admin)$` (or documented custom actions)
- [ ] Scopes follow `<domain>:<resource>:<action>` format
- [ ] No scopes use PascalCase, dots, or missing segments

---

### declare-enum-values-in-upper-snake-case-strings
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#declare-enum-values-in-upper-snake-case-strings](/docs/rules/api-contract-and-documentation#declare-enum-values-in-upper-snake-case-strings) |

**What to Check**:
- [ ] All `enum` values of type `string` match `^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$`
- [ ] No enum values use camelCase, lowercase, or contain spaces

---

### follow-sailpoint-api-guidelines
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#follow-sailpoint-api-guidelines](/docs/rules/api-contract-and-documentation#follow-sailpoint-api-guidelines) |

**What to Check**: Meta-rule. Testable only by running all other rule checks.

---

### provide-a-detailed-api-description
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-a-detailed-api-description](/docs/rules/api-contract-and-documentation#provide-a-detailed-api-description) |

**What to Check**:
- [ ] `info.description` is present and non-empty
- [ ] `info.description` length exceeds a minimum threshold (e.g., > 100 characters)
- [ ] Tag descriptions are present for all tags

---

### describe-every-parameter-and-property
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#describe-every-parameter-and-property](/docs/rules/api-contract-and-documentation#describe-every-parameter-and-property) |

**What to Check**:
- [ ] Every parameter (path, query, header) has a non-empty `description`
- [ ] Every schema property has a non-empty `description`
- [ ] No description merely restates the property name (heuristic: description != title-cased property name)
- [ ] Descriptions are longer than a minimum threshold (e.g., > 10 characters)

---

### provide-examples-for-operations-and-key-fields
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-examples-for-operations-and-key-fields](/docs/rules/api-contract-and-documentation#provide-examples-for-operations-and-key-fields) |

**What to Check**:
- [ ] Every parameter has an `example` or `examples` field
- [ ] Every schema property has an `example` field
- [ ] Response bodies have `example` or `examples` in the media type object
- [ ] Examples conform to the declared schema type/format (e.g., date-time examples are valid RFC 3339)

---

### keep-operation-summaries-to-5-words-or-fewer
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#keep-operation-summaries-to-5-words-or-fewer](/docs/rules/api-contract-and-documentation#keep-operation-summaries-to-5-words-or-fewer) |

**What to Check**:
- [ ] Every operation has a `summary`
- [ ] Word count of `summary` is <= 5

---

### avoid-qualifying-verbs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#avoid-qualifying-verbs](/docs/rules/api-contract-and-documentation#avoid-qualifying-verbs) |

**What to Check**:
- [ ] Boolean properties do not start with `is`, `has`, `can`, `was`, `will` (flag for review)
- [ ] Suggest the adjective-only alternative

---

### use-positive-semantics-for-boolean-fields
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-positive-semantics-for-boolean-fields](/docs/rules/api-contract-and-documentation#use-positive-semantics-for-boolean-fields) |

**What to Check**:
- [ ] Boolean property names do not use negative prefixes/words: `disabled`, `excluded`, `unverified`, `hidden`, `inactive`, `denied`, `blocked`, `unavailable`
- [ ] Flag negative boolean names and suggest positive alternatives

---

### describe-the-filters-parameter-standard-format
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#describe-the-filters-parameter-standard-format](/docs/rules/api-contract-and-documentation#describe-the-filters-parameter-standard-format) |

**What to Check**:
- [ ] If a `filters` query parameter exists, check that its `description` contains: "Syntax:", "Operators:", "Supported fields:", and "Examples:"
- [ ] Flag `filters` parameters with empty or minimal descriptions
- [ ] Spectral (or equivalent) rules that validate `filters` grammar stay aligned with the documented operators and structure in this guideline

---

### describe-the-sorters-parameter-standard-format
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#describe-the-sorters-parameter-standard-format](/docs/rules/api-contract-and-documentation#describe-the-sorters-parameter-standard-format) |

**What to Check**:
- [ ] If a `sorters` query parameter exists, check that its `description` contains: "Syntax:", "Direction:", "Supported fields:", "Default ordering:", and "Examples:"
- [ ] Flag `sorters` parameters with empty or minimal descriptions
- [ ] Spectral (or equivalent) rules that validate `sorters` grammar stay aligned with the documented structure in this guideline

---

### provide-a-camelcase-operationid-for-every-operation
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-a-camelcase-operationid-for-every-operation](/docs/rules/api-contract-and-documentation#provide-a-camelcase-operationid-for-every-operation) |

**What to Check**:
- [ ] Every operation has an `operationId`
- [ ] Every `operationId` matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] All `operationId` values are unique across the entire spec
- [ ] GET collection operations follow `list<ResourcePlural>` pattern (advisory)
- [ ] GET item operations follow `get<Resource>` pattern (advisory)
- [ ] POST operations follow `create<Resource>` pattern (advisory)

---

### provide-a-tag-for-every-operation
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-a-tag-for-every-operation](/docs/rules/api-contract-and-documentation#provide-a-tag-for-every-operation) |

**What to Check**:
- [ ] Every operation has a `tags` array with exactly one tag
- [ ] Every tag used on an operation exists in the root `tags` array
- [ ] Root `tags` array entries have descriptions

---

### provide-x-sailpoint-resource-operation-id-for-path-parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#provide-x-sailpoint-resource-operation-id-for-path-parameters](/docs/rules/api-contract-and-documentation#provide-x-sailpoint-resource-operation-id-for-path-parameters) |

**What to Check**:
- [ ] Every path parameter (`in: path`) has an `x-sailpoint-resource-operation-id` extension
- [ ] The extension value is camelCase
- [ ] The extension value corresponds to an existing `operationId` in the spec

---

## Lifecycle & Compatibility (200-series)

### do-not-break-compatibility
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#do-not-break-compatibility](/docs/rules/lifecycle-and-compatibility#do-not-break-compatibility) |

**What to Check** (requires comparing two spec versions):
- [ ] No endpoints removed
- [ ] No required fields added to request bodies
- [ ] No fields removed from responses
- [ ] No field types changed
- [ ] No enum values removed
- [ ] No path parameters added/removed
- [ ] No required query parameters added

---

### prefer-compatible-extensions
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#prefer-compatible-extensions](/docs/rules/lifecycle-and-compatibility#prefer-compatible-extensions) |

**What to Check** (requires comparing two spec versions):
- [ ] New fields are optional (have defaults or are not in `required` array)
- [ ] New query parameters have defaults
- [ ] New endpoints don't overlap with existing ones

---

### prepare-clients-for-extensions
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#prepare-clients-for-extensions](/docs/rules/lifecycle-and-compatibility#prepare-clients-for-extensions) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### be-conservative-with-inputs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#be-conservative-with-inputs](/docs/rules/lifecycle-and-compatibility#be-conservative-with-inputs) |

**What to Check**:
- [ ] String properties have `minLength` and/or `maxLength` constraints
- [ ] Integer/number properties have `minimum` and/or `maximum` constraints
- [ ] String properties with known patterns have `pattern` or `format` defined
- [ ] Enum properties have defined values

---

### return-top-level-json-objects
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#return-top-level-json-objects](/docs/rules/lifecycle-and-compatibility#return-top-level-json-objects) |

**What to Check**:
- [ ] All 2xx response schemas have `type: object` at the top level (not `type: array`) for **new** list endpoints
- [ ] Collection endpoints wrap arrays in an object (e.g., `items` property)
- [ ] If a legacy endpoint still documents `type: array` at the root, the spec calls out the grandfathered contract and a migration path

---

### treat-openapi-objects-as-extensible
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#treat-openapi-objects-as-extensible](/docs/rules/lifecycle-and-compatibility#treat-openapi-objects-as-extensible) |

**What to Check**:
- [ ] Response schemas do not use `additionalProperties: false` (which blocks extension)
- [ ] No response schema uses `maxProperties`

---

### avoid-breaking-changes-as-the-default-strategy
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#avoid-breaking-changes-as-the-default-strategy](/docs/rules/lifecycle-and-compatibility#avoid-breaking-changes-as-the-default-strategy) |

**What to Check**: Design/process rule. Not directly testable.

---

### use-path-versioning-when-versions-coexist
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#use-path-versioning-when-versions-coexist](/docs/rules/lifecycle-and-compatibility#use-path-versioning-when-versions-coexist) |

**What to Check**:
- [ ] If version segments exist in paths, they use path-based format (e.g., `/v2026/...` or `/v3/...`)
- [ ] No query-parameter-based versioning (`?version=`)
- [ ] Server URLs in `servers` array contain version segments if applicable

---

### use-year-based-api-versioning-yyyy-revision
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#use-year-based-api-versioning-yyyy-revision](/docs/rules/lifecycle-and-compatibility#use-year-based-api-versioning-yyyy-revision) |

**What to Check**:
- [ ] `info.version` matches `^\d{4}\.\d+$` pattern (e.g., `2026.1`)
- [ ] Path version segments (if present) use year format (e.g., `/v2026/`)

---

### reflect-deprecation-in-openapi
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#reflect-deprecation-in-openapi](/docs/rules/lifecycle-and-compatibility#reflect-deprecation-in-openapi) |

**What to Check**:
- [ ] Operations with `deprecated: true` use `x-deprecated-description` (or equivalent) for sunset, replacement, and migration narrative; primary `description` still describes current behavior
- [ ] Deprecated operations have `externalDocs` linking to migration guide
- [ ] Sunset date appears in `x-deprecated-description` (or migration doc linked there), not only in informal prose outside the spec

---

### monitor-deprecated-api-usage
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#monitor-deprecated-api-usage](/docs/rules/lifecycle-and-compatibility#monitor-deprecated-api-usage) |

**What to Check**: Operational/runtime process. Not testable against spec.

---

### add-deprecation-and-sunset-headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#add-deprecation-and-sunset-headers](/docs/rules/lifecycle-and-compatibility#add-deprecation-and-sunset-headers) |

**What to Check**:
- [ ] Deprecated operations define `Deprecation` and `Sunset` response headers in their response objects

---

### have-clients-monitor-deprecation-and-sunset-headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#have-clients-monitor-deprecation-and-sunset-headers](/docs/rules/lifecycle-and-compatibility#have-clients-monitor-deprecation-and-sunset-headers) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### do-not-start-new-usage-of-deprecated-apis-or-features
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#do-not-start-new-usage-of-deprecated-apis-or-features](/docs/rules/lifecycle-and-compatibility#do-not-start-new-usage-of-deprecated-apis-or-features) |

**What to Check**: Process rule. Not directly testable against a single spec.

---

### include-api-metadata
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#include-api-metadata](/docs/rules/lifecycle-and-compatibility#include-api-metadata) |

**What to Check**:
- [ ] `info.title` is present and non-empty
- [ ] `info.version` is present and non-empty
- [ ] `info.description` is present and non-empty
- [ ] `info.contact` is present with at least `name` or `email`
- [ ] `servers` array is present and non-empty
- [ ] `tags` array is present and non-empty
- [ ] Every tag has a `description`

---

### specify-api-audience
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#specify-api-audience](/docs/rules/lifecycle-and-compatibility#specify-api-audience) |

**What to Check**:
- [ ] `info.x-audience` is present
- [ ] Value is one of `internal-company` or `external-public`

---

### follow-version-requirements
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#follow-version-requirements](/docs/rules/lifecycle-and-compatibility#follow-version-requirements) |

**What to Check**: Process/runtime rule about support windows. Not directly testable.

---

### follow-experimental-requirements-when-applicable
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#follow-experimental-requirements-when-applicable](/docs/rules/lifecycle-and-compatibility#follow-experimental-requirements-when-applicable) |

**What to Check**:
- [ ] If `info.x-stability` is `experimental`, verify experimental-specific documentation exists
- [ ] Check that experimental operations/schemas use `x-stability: experimental` (or equivalent) when only part of the API is experimental

---

### agree-on-deprecation-timeframes-with-clients
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#agree-on-deprecation-timeframes-with-clients](/docs/rules/lifecycle-and-compatibility#agree-on-deprecation-timeframes-with-clients) |

**What to Check**: Process rule. Not testable against spec.

---

### annotate-enum-extensibility-open-vs-closed
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#annotate-enum-extensibility-open-vs-closed](/docs/rules/lifecycle-and-compatibility#annotate-enum-extensibility-open-vs-closed) |

**What to Check**:
- [ ] Enum properties have `x-extensible: true` or `x-extensible: false`
- [ ] Enum descriptions mention whether the enum is open or closed
- [ ] Closed enums (`x-extensible: false`) are not modified within the same major version (diff-based)

---

## Security & Authorization (300-series)

### secure-endpoints-with-oauth-2-0
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#secure-endpoints-with-oauth-2-0](/docs/rules/security-and-authorization#secure-endpoints-with-oauth-2-0) |

**What to Check**:
- [ ] Every operation has a `security` field (not just global security)
- [ ] At least one security scheme of type `oauth2` is defined in `securitySchemes`
- [ ] Each `security` entry references an oauth2 scheme with scopes

---

### define-and-assign-scopes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#define-and-assign-scopes](/docs/rules/security-and-authorization#define-and-assign-scopes) |

**What to Check**:
- [ ] Every operation's `security` field lists specific scopes (not empty arrays)
- [ ] All scopes referenced in operations are defined in the `securitySchemes`
- [ ] No operation uses an empty scope list when security is declared

---

### document-required-licenses-for-api-collections
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#document-required-licenses-for-api-collections](/docs/rules/security-and-authorization#document-required-licenses-for-api-collections) |

**What to Check**:
- [ ] Tags or operations that require licenses have `x-license-addons` extension
- [ ] If `x-license-addons` exists, it is a non-empty array of strings

---

### define-user-capabilities-for-userauth-endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#define-user-capabilities-for-userauth-endpoints](/docs/rules/security-and-authorization#define-user-capabilities-for-userauth-endpoints) |

**What to Check**:
- [ ] Operations using `userAuth` security scheme have `description` mentioning required user roles/capabilities
- [ ] Consider checking for a `x-user-capabilities` extension if standardized

---

### require-https-tls-for-all-endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#require-https-tls-for-all-endpoints](/docs/rules/security-and-authorization#require-https-tls-for-all-endpoints) |

**What to Check**:
- [ ] All `servers[].url` values start with `https://`
- [ ] No server URL starts with `http://`
- [ ] No server URL uses a non-TLS scheme

---

### never-put-secrets-or-credentials-in-urls
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#never-put-secrets-or-credentials-in-urls](/docs/rules/security-and-authorization#never-put-secrets-or-credentials-in-urls) |

**What to Check**:
- [ ] No `securitySchemes` with `type: apiKey` and `in: query`
- [ ] No query parameters named `api_key`, `token`, `secret`, `password`, `apiKey`, `access_token`
- [ ] No path parameters named `token`, `secret`, `key`

---

### authenticate-and-authorize-before-processing-payloads
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#authenticate-and-authorize-before-processing-payloads](/docs/rules/security-and-authorization#authenticate-and-authorize-before-processing-payloads) |

**What to Check**: Runtime/implementation behavior. Not testable against spec.

---

### document-and-enforce-rate-limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#document-and-enforce-rate-limits](/docs/rules/security-and-authorization#document-and-enforce-rate-limits) |

**What to Check**:
- [ ] Operations define a `429` response
- [ ] `429` response includes `Retry-After` header definition
- [ ] Rate limit information is mentioned in `info.description` or tag descriptions
- [ ] `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` headers defined in response components

---

### support-cors-for-browser-clients
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#support-cors-for-browser-clients](/docs/rules/security-and-authorization#support-cors-for-browser-clients) |

**What to Check**: Runtime behavior. Not testable against spec alone.

---

### sanitize-inputs-and-prevent-injection
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#sanitize-inputs-and-prevent-injection](/docs/rules/security-and-authorization#sanitize-inputs-and-prevent-injection) |

**What to Check**:
- [ ] String properties have `maxLength` defined
- [ ] Free-form text fields are documented as such in descriptions
- [ ] `filters` parameter descriptions mention allowed field whitelists

---

### enforce-tenant-data-isolation-in-responses
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#enforce-tenant-data-isolation-in-responses](/docs/rules/security-and-authorization#enforce-tenant-data-isolation-in-responses) |

**What to Check**:
- [ ] Error response examples do not reference other tenants or tenant-specific identifiers
- [ ] Cache-related documentation mentions tenant scoping (in descriptions or `Cache-Control` headers)
- [ ] List endpoints document implicit tenant scoping in description

---

## HTTP Semantics (400-series)

### use-standard-http-headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-standard-http-headers](/docs/rules/http-semantics#use-standard-http-headers) |

**What to Check**:
- [ ] Operations with JSON responses declare `Content-Type: application/json`
- [ ] Error responses declare `Content-Type: application/problem+json`
- [ ] `429` responses include `Retry-After` header
- [ ] PUT/PATCH responses that support optimistic locking include `ETag` header

---

### use-http-methods-correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-http-methods-correctly](/docs/rules/http-semantics#use-http-methods-correctly) |

**What to Check**:
- [ ] GET operations do not define request bodies
- [ ] DELETE operations do not define request bodies (or if they do, they're optional)
- [ ] POST create operations define `201` responses with `Location` header
- [ ] PUT operations define full resource schema in request body
- [ ] PATCH operations document the patch format in description

---

### honor-method-properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#honor-method-properties](/docs/rules/http-semantics#honor-method-properties) |

**What to Check**:
- [ ] GET/HEAD/OPTIONS operations do not declare `requestBody`
- [ ] Flag GET operations that mention "create", "update", "delete", or "trigger" in their description

---

### use-standard-http-status-codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-standard-http-status-codes](/docs/rules/http-semantics#use-standard-http-status-codes) |

**What to Check**:
- [ ] All response status codes are IANA-registered standard codes
- [ ] No custom/non-standard status codes
- [ ] GET operations define `200` response
- [ ] POST create operations define `201` response
- [ ] DELETE operations define `204` (or `200`) response
- [ ] Every operation defines at least one 4xx error response
- [ ] Operations define `401` and `403` responses

---

### define-a-standard-error-contract-in-openapi-problem-details
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#define-a-standard-error-contract-in-openapi-problem-details](/docs/rules/http-semantics#define-a-standard-error-contract-in-openapi-problem-details) |

**What to Check**:
- [ ] Error responses (4xx, 5xx) use `application/problem+json` content type
- [ ] Error response schemas include required fields: `type`, `title`, `status`, `detail`, `instance`
- [ ] Error responses have `example` or `examples`
- [ ] A shared `ProblemDetails` component schema exists and is referenced
- [ ] Error schemas include `correlationId` property
- [ ] Examples and extension fields match the organization's published API error catalog when it is stricter than this baseline

---

### use-207-or-200-for-per-item-batch-results
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-207-or-200-for-per-item-batch-results](/docs/rules/http-semantics#use-207-or-200-for-per-item-batch-results) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) define `207` or `200` responses
- [ ] Batch response schemas include an `items` array with per-item `status` fields

---

### use-429-with-rate-limit-headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-429-with-rate-limit-headers](/docs/rules/http-semantics#use-429-with-rate-limit-headers) |

**What to Check**:
- [ ] Operations that can be rate-limited define `429` response
- [ ] `429` response defines `Retry-After` header
- [ ] `429` response body uses `application/problem+json`

---

### support-long-running-operations
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#support-long-running-operations](/docs/rules/http-semantics#support-long-running-operations) |

**What to Check**:
- [ ] Operations returning `202 Accepted` define a `Location` header
- [ ] Operations returning `202` define a `Retry-After` header
- [ ] Status resource schemas include `id`, `status`, `createdAt`, `completedAt`, `error` fields
- [ ] Job-related `operationId` values follow `create<Thing>Job` / `get<Thing>Job` / `list<Thing>Jobs` pattern

---

### never-expose-stack-traces-or-internal-details
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#never-expose-stack-traces-or-internal-details](/docs/rules/http-semantics#never-expose-stack-traces-or-internal-details) |

**What to Check**:
- [ ] Error response examples do not contain stack traces, file paths, class names, or SQL
- [ ] Error response schemas include `correlationId` field

---

### prefer-idempotent-post-patch-where-possible
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#prefer-idempotent-post-patch-where-possible](/docs/rules/http-semantics#prefer-idempotent-post-patch-where-possible) |

**What to Check**:
- [ ] POST operations document retry/idempotency behavior in description
- [ ] POST create operations define `409 Conflict` response (for duplicate handling)

---

### support-idempotency-key
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#support-idempotency-key](/docs/rules/http-semantics#support-idempotency-key) |

**What to Check**:
- [ ] If `Idempotency-Key` header parameter is defined, it has a description covering scope, format, and retention
- [ ] POST operations that support idempotency define the `Idempotency-Key` header parameter

---

### use-secondary-keys-for-idempotent-post
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-secondary-keys-for-idempotent-post](/docs/rules/http-semantics#use-secondary-keys-for-idempotent-post) |

**What to Check**:
- [ ] If `externalId` or similar secondary key is in the request schema, it is documented with uniqueness constraints
- [ ] POST operations with secondary keys define `409 Conflict` response

---

### provide-accurate-response-examples
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#provide-accurate-response-examples](/docs/rules/http-semantics#provide-accurate-response-examples) |

**What to Check**:
- [ ] Every operation has at least one 2xx response example
- [ ] Every operation has at least one error response example
- [ ] Examples are valid JSON (parseable)
- [ ] Examples do not contain placeholder patterns like `"string"`, `"TODO"`, `0`
- [ ] Examples do not contain secrets or obvious test data markers
- [ ] List success examples use an object envelope (e.g., `items` + pagination fields), not a bare top-level JSON array, unless the operation is explicitly documented as grandfathered

---

### document-caching-behavior
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-caching-behavior](/docs/rules/http-semantics#document-caching-behavior) |

**What to Check**:
- [ ] GET operations mention caching in their description (or explicitly state no caching)
- [ ] `Cache-Control` header is defined in response components
- [ ] `ETag` header is defined for GET responses that support conditional requests

---

### document-request-and-response-size-limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-request-and-response-size-limits](/docs/rules/http-semantics#document-request-and-response-size-limits) |

**What to Check**:
- [ ] Operations that accept request bodies mention size limits in description
- [ ] `413` response is defined for operations that accept large payloads
- [ ] File upload operations document maximum file size

---

### use-optimistic-locking-for-concurrent-writes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-optimistic-locking-for-concurrent-writes](/docs/rules/http-semantics#use-optimistic-locking-for-concurrent-writes) |

**What to Check**:
- [ ] PUT/PATCH operations define `If-Match` header parameter
- [ ] PUT/PATCH operations define `412 Precondition Failed` response
- [ ] GET operations return `ETag` header
- [ ] `428 Precondition Required` response defined when `If-Match` is mandatory but missing

---

### return-406-for-unsupported-accept-headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#return-406-for-unsupported-accept-headers](/docs/rules/http-semantics#return-406-for-unsupported-accept-headers) |

**What to Check**:
- [ ] Operations define a `406` response
- [ ] `406` response uses `application/problem+json` content type
- [ ] `406` response schema references the standard Problem Details schema
- [ ] Response `content` keys document all supported media types

---

### document-head-and-options-method-support
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-head-and-options-method-support](/docs/rules/http-semantics#document-head-and-options-method-support) |

**What to Check**:
- [ ] Paths with GET operations also define HEAD operations (or document automatic HEAD support)
- [ ] OPTIONS responses include `Allow` header documentation if explicitly defined
- [ ] HEAD operations do not define response bodies

---

### classify-error-retryability
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#classify-error-retryability](/docs/rules/http-semantics#classify-error-retryability) |

**What to Check**:
- [ ] `429`, `502`, `503`, `504` responses include `Retry-After` header definition
- [ ] Application-specific error codes (`code` in Problem Details) include retryability documentation in description
- [ ] Non-retryable error responses (400, 401, 403, 404, 422) do not include `Retry-After` header

---

## Resource Modeling & URLs (500-series)

### do-not-use-api-base-path
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#do-not-use-api-base-path](/docs/rules/resource-modeling-and-urls#do-not-use-api-base-path) |

**What to Check**:
- [ ] No path starts with `/api/`
- [ ] No `servers[].url` ends with `/api`

---

### define-canonical-url-forms
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#define-canonical-url-forms](/docs/rules/resource-modeling-and-urls#define-canonical-url-forms) |

**What to Check**:
- [ ] No paths contain `//` (double slashes)
- [ ] No paths contain empty segments
- [ ] Trailing slash usage is consistent across all paths (all have or all don't)
- [ ] All path segments are lowercase

---

### use-resource-oriented-urls
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-resource-oriented-urls](/docs/rules/resource-modeling-and-urls#use-resource-oriented-urls) |

**What to Check**:
- [ ] Flag path segments containing common verbs: `get`, `create`, `update`, `delete`, `fetch`, `set`, `remove`, `start`, `stop`, `execute`, `run`
- [ ] Exception: `/search` suffix is acceptable for POST search endpoints
- [ ] Prefer noun-based request resources (`POST .../disable-requests`) over procedure-style paths (`POST .../disable`) when an action does not map to CRUD
- [ ] POST operations whose last segment is a verb token are flagged for review against resource modeling guidance

---

### model-business-processes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#model-business-processes](/docs/rules/resource-modeling-and-urls#model-business-processes) |

**What to Check**: Design judgment. Not testable against spec.

---

### define-useful-resources
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#define-useful-resources](/docs/rules/resource-modeling-and-urls#define-useful-resources) |

**What to Check**:
- [ ] Collection GET endpoints that benefit from slimmer payloads document field projection when `POST .../search` is not the only entry point
- [ ] Advisory: design judgment on resource boundaries — pair with [#use-resource-oriented-urls] and [#support-partial-responses-fields]

---

### use-domain-specific-resource-names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-domain-specific-resource-names](/docs/rules/resource-modeling-and-urls#use-domain-specific-resource-names) |

**What to Check**:
- [ ] Flag path segments containing implementation prefixes: `db`, `tbl`, `internal`, `tmp`, `raw`, `sys`
- [ ] Flag path segments that look like database table names

---

### nest-sub-resources-only-when-tightly-coupled
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#nest-sub-resources-only-when-tightly-coupled](/docs/rules/resource-modeling-and-urls#nest-sub-resources-only-when-tightly-coupled) |

**What to Check**: Design judgment about coupling. Not automatable.

---

### prefer-non-nested-urls-for-independent-resources
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#prefer-non-nested-urls-for-independent-resources](/docs/rules/resource-modeling-and-urls#prefer-non-nested-urls-for-independent-resources) |

**What to Check**:
- [ ] Flag deeply nested paths (> 2 resource/parameter pairs) for review
- [ ] Advisory: resources with globally unique IDs in nested paths could be top-level

---

### limit-resource-types
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#limit-resource-types](/docs/rules/resource-modeling-and-urls#limit-resource-types) |

**What to Check**:
- [ ] Count distinct top-level resource paths; warn if exceeding a threshold (e.g., > 20)
- [ ] Flag resource names that are near-synonyms of each other

---

### limit-nesting-depth
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#limit-nesting-depth](/docs/rules/resource-modeling-and-urls#limit-nesting-depth) |

**What to Check**:
- [ ] Count the number of path parameter segments in each path
- [ ] Flag paths with > 3 levels of nesting (more than 3 `/{param}/` segments)

---

### use-rest-maturity-level-2
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-rest-maturity-level-2](/docs/rules/resource-modeling-and-urls#use-rest-maturity-level-2) |

**What to Check**:
- [ ] **Richardson Level 2**: resources identified by URLs; HTTP methods express operations; status codes express outcomes (hypermedia / Level 3 not required)
- [ ] Composite check: passes #use-http-methods-correctly (methods), #use-standard-http-status-codes (status codes), #define-a-standard-error-contract-in-openapi-problem-details (error contract), #use-lowercase-hyphenated-path-segments-and-camelcase-path-parameters (URL nouns)
- [ ] No RPC-style paths (paths that are entirely verbs)

---

### use-url-friendly-ids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-url-friendly-ids](/docs/rules/resource-modeling-and-urls#use-url-friendly-ids) |

**What to Check**:
- [ ] Path parameter schemas use `type: string` (not integer or number)
- [ ] Path parameter examples contain only URL-safe characters `[A-Za-z0-9._:-]`
- [ ] Path parameter `format` is `uuid` or unspecified (not `int32`/`int64`)

---

### never-include-customer-org-names-in-paths
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#never-include-customer-org-names-in-paths](/docs/rules/resource-modeling-and-urls#never-include-customer-org-names-in-paths) |

**What to Check**:
- [ ] No paths contain segments like `/customers/`, `/orgs/`, `/tenants/` followed by a parameter
- [ ] No path parameters named `orgName`, `orgId`, `tenantName`, `tenantId`, `customerName`

---

### do-not-use-sequential-numeric-ids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#do-not-use-sequential-numeric-ids](/docs/rules/resource-modeling-and-urls#do-not-use-sequential-numeric-ids) |

**What to Check**:
- [ ] Path parameter schemas are `type: string`, not `type: integer`
- [ ] Path parameter `format` is not `int32` or `int64`
- [ ] Path parameter examples are not purely numeric

---

### define-soft-delete-behavior
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#define-soft-delete-behavior](/docs/rules/resource-modeling-and-urls#define-soft-delete-behavior) |

**What to Check**:
- [ ] DELETE operations document whether hard or soft delete in description
- [ ] If schemas include `deletedAt` or `status: DELETED`, corresponding DELETE operations exist
- [ ] List operations that support soft-deleted resources have `includeDeleted` query parameter

---

## Requests & Querying (600-series)

### use-conventional-query-parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#use-conventional-query-parameters](/docs/rules/requests-and-querying#use-conventional-query-parameters) |

**What to Check**:
- [ ] Pagination parameters are named `limit` and `offset` (not `pageSize`, `page`, `skip`)
- [ ] Filter parameter is named `filters` (not `filter`, `query`, `q`, `where`)
- [ ] Sort parameter is named `sorters` (not `sort`, `sortBy`, `orderBy`)
- [ ] Count parameter is named `count` (not `totalCount`, `includeCount`)

---

### define-collection-formats-for-header-and-query-parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#define-collection-formats-for-header-and-query-parameters](/docs/rules/requests-and-querying#define-collection-formats-for-header-and-query-parameters) |

**What to Check**:
- [ ] Array-typed query parameters define `style` and `explode` in their parameter definition
- [ ] Array-typed header parameters define `style` and `explode`
- [ ] Or: description explicitly documents the encoding format

---

### support-offset-pagination-for-list-endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#support-offset-pagination-for-list-endpoints](/docs/rules/requests-and-querying#support-offset-pagination-for-list-endpoints) |

**What to Check**:
- [ ] GET operations returning collections define `limit` query parameter
- [ ] GET operations returning collections define `offset` query parameter
- [ ] `limit` parameter has documented `default` and `maximum` values
- [ ] Response schema wraps items in an object with `items` array property
- [ ] Response schema includes `limit`, `offset`, and `count` properties
- [ ] Examples and documented response bodies do not show a bare JSON array at the root for list responses

---

### document-implicit-filters-and-default-sorting
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#document-implicit-filters-and-default-sorting](/docs/rules/requests-and-querying#document-implicit-filters-and-default-sorting) |

**What to Check**:
- [ ] List operations mention default sort order in description
- [ ] List operations document implicit filters (tenant scoping, deleted items) in description
- [ ] Description contains keywords like "default", "order", "sort" or "implicit", "scope"

---

### use-one-query-format-across-the-api
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#use-one-query-format-across-the-api](/docs/rules/requests-and-querying#use-one-query-format-across-the-api) |

**What to Check**:
- [ ] All filter parameters use the same name (`filters`) across all operations
- [ ] All sort parameters use the same name (`sorters`) across all operations
- [ ] POST search endpoints use path suffix `/search`
- [ ] Search endpoint operationIds follow `search<ResourcePlural>` pattern

---

### design-batch-request-endpoints
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#design-batch-request-endpoints](/docs/rules/requests-and-querying#design-batch-request-endpoints) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) accept an `items` array in request body
- [ ] Batch operations document maximum batch size in description
- [ ] Batch response schemas include per-item status/error
- [ ] Batch operationIds follow `batch<Action><ResourcePlural>` pattern

---

### include-pagination-links-in-collection-responses
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#include-pagination-links-in-collection-responses](/docs/rules/requests-and-querying#include-pagination-links-in-collection-responses) |

**What to Check**:
- [ ] List endpoint response schemas include a `links` property
- [ ] `links` schema includes `self`, `next`, and `prev` properties of type `string` with `format: uri`
- [ ] List endpoint response examples include `links` with absolute URLs

---

## Payload Conventions (700-series)

### handle-null-values-correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#handle-null-values-correctly](/docs/rules/payload-conventions#handle-null-values-correctly) |

**What to Check**:
- [ ] Fields that are nullable in examples are marked `nullable: true` in schema (or `type: [string, "null"]` for OAS 3.1)
- [ ] Fields not marked nullable do not have `null` in examples

---

### use-booleans-correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-booleans-correctly](/docs/rules/payload-conventions#use-booleans-correctly) |

**What to Check**:
- [ ] Boolean properties (`type: boolean`) are not `nullable: true`
- [ ] Boolean properties are not in a nullable union type
- [ ] Optional boolean properties have a `default` value defined

---

### initialize-empty-arrays
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#initialize-empty-arrays](/docs/rules/payload-conventions#initialize-empty-arrays) |

**What to Check**:
- [ ] Array properties (`type: array`) are not `nullable: true`
- [ ] Array properties are not in a nullable union type
- [ ] Array property examples use `[]` not `null` for empty state

---

### model-nullable-fields-in-openapi
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#model-nullable-fields-in-openapi](/docs/rules/payload-conventions#model-nullable-fields-in-openapi) |

**What to Check**:
- [ ] Fields with `null` in examples are marked `nullable: true`
- [ ] Boolean and array properties are NOT nullable (#use-booleans-correctly, #initialize-empty-arrays)
- [ ] Nullable modeling matches OAS version (3.0: `nullable: true`; 3.1: type union)

---

### use-standard-non-json-media-types
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-standard-non-json-media-types](/docs/rules/payload-conventions#use-standard-non-json-media-types) |

**What to Check**:
- [ ] Non-JSON response content types are IANA-registered
- [ ] Error responses still use `application/problem+json` even when success is non-JSON

---

### use-standard-media-types
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-standard-media-types](/docs/rules/payload-conventions#use-standard-media-types) |

**What to Check**:
- [ ] All `content` keys in request/response bodies use IANA-registered media types
- [ ] JSON responses use `application/json` (not custom vendor types)
- [ ] Error responses use `application/problem+json`
- [ ] No custom/vendor media types without documented justification

---

### define-maps-with-additionalproperties
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-maps-with-additionalproperties](/docs/rules/payload-conventions#define-maps-with-additionalproperties) |

**What to Check**:
- [ ] Schema objects with `additionalProperties` have a typed value (not just `true`)
- [ ] Flag `type: object` without `properties` and without `additionalProperties` (ambiguous map)

---

### avoid-nested-objects
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#avoid-nested-objects](/docs/rules/payload-conventions#avoid-nested-objects) |

**What to Check**:
- [ ] Measure maximum object nesting depth in response schemas
- [ ] Flag schemas with > 3 levels of nested objects
- [ ] Warn when large object schemas ($ref) are embedded inline rather than referenced by ID

---

### define-defaults-for-optional-properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-defaults-for-optional-properties](/docs/rules/payload-conventions#define-defaults-for-optional-properties) |

**What to Check**:
- [ ] Optional properties (not in `required` array) have a `default` value OR description documenting default behavior
- [ ] Optional boolean properties have `default: true` or `default: false`
- [ ] Optional query parameters document default values

---

### define-required-fields-per-openapi
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-required-fields-per-openapi](/docs/rules/payload-conventions#define-required-fields-per-openapi) |

**What to Check**:
- [ ] Request body schemas have a `required` array
- [ ] Response schemas have a `required` array for always-present fields
- [ ] Path parameters have `required: true`
- [ ] Different operations use distinct schemas when required fields differ (e.g., `CreateFooRequest` vs `UpdateFooRequest`)

---

### specify-patch-content-type-and-null-semantics
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#specify-patch-content-type-and-null-semantics](/docs/rules/payload-conventions#specify-patch-content-type-and-null-semantics) |

**What to Check**:
- [ ] PATCH operations declare a `requestBody` with explicit `content` type (e.g., `application/merge-patch+json`, `application/json-patch+json`, or `application/json`)
- [ ] PATCH request schemas are distinct from POST/PUT schemas (separate `*Patch` schema)
- [ ] PATCH operation descriptions document null vs. omission semantics
- [ ] PATCH operations include examples showing null handling

---

## Data Types & Common Objects (800-series)

### use-iso-8601-durations-and-intervals
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-iso-8601-durations-and-intervals](/docs/rules/data-types-and-common-objects#use-iso-8601-durations-and-intervals) |

**What to Check**:
- [ ] Properties with "duration", "interval", "timeout", "ttl", "period" in their name use `type: string` (not integer)
- [ ] Duration examples match ISO 8601 pattern (`^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$`)
- [ ] Flag bare numeric duration fields

---

### use-standard-date-time-formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-date-time-formats](/docs/rules/data-types-and-common-objects#use-standard-date-time-formats) |

**What to Check**:
- [ ] Properties with "date", "time", "At", "timestamp" in their name use `format: date-time` or `format: date`
- [ ] Date-time examples match RFC 3339 format
- [ ] Date-time examples prefer UTC (`Z` suffix)
- [ ] Date-only properties use `format: date`

---

### use-standard-country-language-and-currency-codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-country-language-and-currency-codes](/docs/rules/data-types-and-common-objects#use-standard-country-language-and-currency-codes) |

**What to Check**:
- [ ] Properties with "country" in name reference ISO 3166-1 in description
- [ ] Properties with "language" or "locale" in name reference BCP 47 in description
- [ ] Properties with "currency" in name reference ISO 4217 in description
- [ ] Country code examples are valid ISO 3166-1 alpha-2

---

### define-numeric-formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#define-numeric-formats](/docs/rules/data-types-and-common-objects#define-numeric-formats) |

**What to Check**:
- [ ] `type: integer` properties have `format: int32` or `format: int64`
- [ ] `type: number` properties have `format: float` or `format: double`
- [ ] Properties representing money/decimal use `type: string` (not `type: number`)
- [ ] ID properties use `type: string` (not `type: integer`)

---

### use-common-field-names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-common-field-names](/docs/rules/data-types-and-common-objects#use-common-field-names) |

**What to Check**:
- [ ] Flag non-standard variants: `created` (should be `createdAt`), `modified` (should be `modifiedAt`), `lastModified` (should be `modifiedAt`), `updated` (should be `modifiedAt`)
- [ ] Creation timestamps use `createdAt` name
- [ ] Modification timestamps use `modifiedAt` name
- [ ] Resource identifier fields use `id` name
- [ ] Deletion timestamps use `deletedAt` name
- [ ] Reference objects follow `{ id, name }` pattern

---

### use-standard-property-formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-property-formats](/docs/rules/data-types-and-common-objects#use-standard-property-formats) |

**What to Check**:
- [ ] Properties named `*email*` use `format: email`
- [ ] Properties named `*url*`, `*uri*`, `*href*` use `format: uri` or `format: uri-reference`
- [ ] Properties named `*Id` with UUID values use `format: uuid`
- [ ] Date/time properties use appropriate format (#use-standard-date-time-formats)
- [ ] IP address properties use `format: ipv4` or `format: ipv6`

---

### encode-embedded-binary-safely
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#encode-embedded-binary-safely](/docs/rules/data-types-and-common-objects#encode-embedded-binary-safely) |

**What to Check**:
- [ ] Properties with `format: byte` or `format: binary` include `contentType` sibling property
- [ ] Binary-embedded schemas include `encoding` field documentation
- [ ] Document maximum size for embedded binary fields

---

## Operations & Quality (900-series)

### support-partial-responses-fields
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#support-partial-responses-fields](/docs/rules/operations-and-quality#support-partial-responses-fields) |

**What to Check**:
- [ ] GET operations have a `fields` query parameter (or document why not)
- [ ] `fields` parameter description documents allowed values and syntax

---

### allow-optional-embedding
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#allow-optional-embedding](/docs/rules/operations-and-quality#allow-optional-embedding) |

**What to Check**:
- [ ] GET operations for resources with related entities have an `embed` query parameter
- [ ] `embed` parameter description documents allowed values and depth limits

---

### publish-an-openapi-specification-meet-doc-quality-levels
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#publish-an-openapi-specification-meet-doc-quality-levels](/docs/rules/operations-and-quality#publish-an-openapi-specification-meet-doc-quality-levels) |

**What to Check** (Level 1 minimum):
- [ ] Every operation has `summary` + `description`
- [ ] Every operation defines success responses and error responses
- [ ] Request/response schemas are fully typed (no `any` or untyped objects)
- [ ] `security` is declared with scopes
- [ ] At least one example for success and error per operation

**What to Check** (Level 2 for external APIs):
- [ ] Consistent tagging and operationId conventions
- [ ] Pagination/filtering/sorting parameters documented
- [ ] Deprecated items marked with `deprecated: true` and migration info
- [ ] `info.version` changelog maintained

---

### return-a-request-id-on-every-response
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#return-a-request-id-on-every-response](/docs/rules/operations-and-quality#return-a-request-id-on-every-response) |

**What to Check**:
- [ ] All responses define `X-Request-Id` header
- [ ] `X-Request-Id` header schema is `type: string, format: uuid`
- [ ] Error response schemas include `correlationId` property
- [ ] A shared `X-Request-Id` header component exists in `components.headers`

---

### design-webhooks-and-event-notifications
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#design-webhooks-and-event-notifications](/docs/rules/operations-and-quality#design-webhooks-and-event-notifications) |

**What to Check**:
- [ ] If webhook schemas exist, they include `id`, `type`, `timestamp`, `data`, `tenantId` fields
- [ ] Webhook event `type` values follow `<resource>.<action>` dot-notation pattern
- [ ] Webhook subscription CRUD endpoints exist if webhooks are offered

---

### provide-health-check-endpoints
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#provide-health-check-endpoints](/docs/rules/operations-and-quality#provide-health-check-endpoints) |

**What to Check**:
- [ ] `/health` or `/health/ready` path exists (note: may be excluded from public spec per rule guidance)
- [ ] Health response schema includes `status` field with enum `[UP, DOWN, DEGRADED]`
- [ ] Health endpoints do not require security (no `security` field, or empty security)

---

## Summary Statistics

| Category | Rules | Fully Testable | Partially Testable | Process Only |
|---|---|---|---|---|
| API Contract & Documentation (100s) | 25 | 15 | 7 | 3 |
| Lifecycle & Compatibility (200s) | 20 | 7 | 5 | 8 |
| Security & Authorization (300s) | 11 | 4 | 5 | 2 |
| HTTP Semantics (400s) | 19 | 5 | 12 | 2 |
| Resource Modeling & URLs (500s) | 16 | 5 | 6 | 5 |
| Requests & Querying (600s) | 7 | 4 | 3 | 0 |
| Payload Conventions (700s) | 11 | 5 | 5 | 1 |
| Data Types & Common Objects (800s) | 7 | 3 | 4 | 0 |
| Operations & Quality (900s) | 6 | 2 | 4 | 0 |
| **Total** | **122** | **50** | **51** | **21** |

---

## Linter Implementation Priority

Rules are prioritized for linter implementation based on impact (MUST > SHOULD > MAY),
testability (full > partial), and frequency of violation.

### P0 - Implement First (high impact, fully testable MUST rules)
- #use-camelcase-for-json-properties camelCase JSON properties
- #use-lowercase-hyphenated-path-segments-and-camelcase-path-parameters lowercase-hyphenated paths, camelCase path params
- #use-camelcase-for-query-parameters camelCase query params
- #declare-enum-values-in-upper-snake-case-strings UPPER_SNAKE_CASE enums
- #describe-every-parameter-and-property describe every parameter/property
- #provide-examples-for-operations-and-key-fields examples for every parameter/property
- #provide-a-camelcase-operationid-for-every-operation camelCase operationId on every operation
- #provide-a-tag-for-every-operation tag on every operation
- #return-top-level-json-objects top-level JSON objects (no bare arrays)
- #secure-endpoints-with-oauth-2-0 security on every operation
- #require-https-tls-for-all-endpoints HTTPS-only servers
- #use-standard-http-status-codes standard status codes
- #define-a-standard-error-contract-in-openapi-problem-details Problem Details error contract
- #do-not-use-api-base-path no /api base path
- #do-not-use-sequential-numeric-ids no sequential numeric IDs
- #support-offset-pagination-for-list-endpoints offset pagination support
- #use-booleans-correctly booleans not nullable
- #initialize-empty-arrays arrays not nullable
- #define-required-fields-per-openapi required fields modeled
- #define-numeric-formats numeric formats defined
- #return-a-request-id-on-every-response X-Request-Id on every response

### P1 - Implement Second (MUST rules, partially testable or diff-based)
- #provide-an-openapi-specification valid OpenAPI spec
- #use-ascii-for-api-identifiers ASCII identifiers
- #pluralize-collection-resource-names plural collection names
- #follow-naming-convention-for-permissions-scopes scope naming convention
- #provide-x-sailpoint-resource-operation-id-for-path-parameters x-sailpoint-resource-operation-id
- #do-not-break-compatibility no breaking changes (diff)
- #use-year-based-api-versioning-yyyy-revision year-based versioning
- #include-api-metadata API metadata complete
- #specify-api-audience x-audience specified
- #never-put-secrets-or-credentials-in-urls no secrets in URLs
- #enforce-tenant-data-isolation-in-responses tenant data isolation
- #use-429-with-rate-limit-headers 429 with Retry-After
- #provide-accurate-response-examples accurate response examples
- #return-406-for-unsupported-accept-headers 406 for unsupported Accept headers
- #classify-error-retryability error retryability classification
- #define-canonical-url-forms canonical URL forms
- #use-conventional-query-parameters conventional query parameter names
- #define-collection-formats-for-header-and-query-parameters collection format defined
- #use-one-query-format-across-the-api consistent query format
- #use-standard-media-types standard media types
- #specify-patch-content-type-and-null-semantics PATCH content type and null semantics
- #use-standard-date-time-formats standard date/time formats
- #use-standard-property-formats standard property formats
- #publish-an-openapi-specification-meet-doc-quality-levels doc quality levels

### P2 - Implement Third (SHOULD rules, advisory/educational)
- #pluralize-array-property-names plural array names
- #use-upper-case-words-with-hyphens header casing
- #keep-operation-summaries-to-5-words-or-fewer summary word count
- #avoid-qualifying-verbs avoid qualifying verbs
- #use-positive-semantics-for-boolean-fields positive boolean semantics
- #describe-the-filters-parameter-standard-format filters parameter template
- #describe-the-sorters-parameter-standard-format sorters parameter template
- #be-conservative-with-inputs input constraints
- #annotate-enum-extensibility-open-vs-closed enum extensibility annotations
- #sanitize-inputs-and-prevent-injection input sanitization (maxLength)
- #use-optimistic-locking-for-concurrent-writes optimistic locking
- #document-head-and-options-method-support HEAD and OPTIONS method support
- #use-resource-oriented-urls resource modeling + noun-based URL segments (single consolidated rule)
- #limit-nesting-depth nesting depth
- #include-pagination-links-in-collection-responses pagination links in collection responses
- #define-maps-with-additionalproperties maps with additionalProperties
- #avoid-nested-objects avoid deep nesting
- #define-defaults-for-optional-properties defaults for optionals
- #use-common-field-names common field names
