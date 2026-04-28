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

### api-first
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#api-first](/docs/rules/api-contract-and-documentation#api-first) |

**What to Check**: Not directly testable. Process rule about designing API-first.

---

### require-openapi
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#require-openapi](/docs/rules/api-contract-and-documentation#require-openapi) |

**What to Check**:
- [ ] OpenAPI document exists and is valid (parseable, no schema errors)
- [ ] OpenAPI version is 3.0.3 or 3.1.x
- [ ] Document passes a standard OpenAPI validator (e.g., `@redocly/cli lint`, `spectral`)

---

### document-user-manual
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#document-user-manual](/docs/rules/api-contract-and-documentation#document-user-manual) |

**What to Check**:
- [ ] `externalDocs` is present at root level or on tags/operations
- [ ] `info.description` contains links to guides or user manual

---

### use-us-english
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-us-english](/docs/rules/api-contract-and-documentation#use-us-english) |

**What to Check**:
- [ ] Scan `description`, `summary`, `title` fields for common British spellings (colour, authorisation, behaviour, catalogue, etc.)
- [ ] Flag non-ASCII characters in descriptions that aren't code examples

---

### use-camelcase-properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-camelcase-properties](/docs/rules/api-contract-and-documentation#use-camelcase-properties) |

**What to Check**:
- [ ] Every property name in every schema matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No property names use snake_case, PascalCase, or kebab-case
- [ ] Acronyms follow lowercase-start convention (e.g., `oauthClientId` not `OAuthClientID`)

---

### use-ascii-identifiers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-ascii-identifiers](/docs/rules/api-contract-and-documentation#use-ascii-identifiers) |

**What to Check**:
- [ ] All path segments contain only ASCII characters
- [ ] All path parameter names contain only ASCII characters
- [ ] All query parameter names contain only ASCII characters
- [ ] All JSON property names contain only ASCII characters
- [ ] All enum values contain only ASCII characters

---

### pluralize-arrays
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#pluralize-arrays](/docs/rules/api-contract-and-documentation#pluralize-arrays) |

**What to Check**:
- [ ] Properties with `type: array` have plural names (heuristic: ends in `s`, `es`, `ies`, `ren`, or is in a known exceptions list like `data`, `metadata`)
- [ ] Flag singular-named array properties for review

---

### use-path-casing
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-path-casing](/docs/rules/api-contract-and-documentation#use-path-casing) |

**What to Check**:
- [ ] All path segments (non-parameter parts) match `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`
- [ ] All path parameter names match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No path segments use PascalCase, snake_case, or camelCase

---

### use-camelcase-query
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-camelcase-query](/docs/rules/api-contract-and-documentation#use-camelcase-query) |

**What to Check**:
- [ ] All query parameter names (`in: query`) match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No query parameters use snake_case, PascalCase, or kebab-case

---

### use-header-case
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-header-case](/docs/rules/api-contract-and-documentation#use-header-case) |

**What to Check**:
- [ ] Header parameter names (`in: header`) match `^[A-Z][a-z0-9]*(-[A-Z][a-z0-9]*)*$` pattern (e.g., `Content-Type`, `X-Request-Id`)
- [ ] Flag lowercase or snake_case header names

---

### pluralize-resources
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#pluralize-resources](/docs/rules/api-contract-and-documentation#pluralize-resources) |

**What to Check**:
- [ ] Collection paths (paths that support GET returning a list) use plural resource names
- [ ] Leaf path segments before `/{paramId}` patterns are plural
- [ ] Flag singular collection endpoints

---

### use-scope-names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-scope-names](/docs/rules/api-contract-and-documentation#use-scope-names) |

**What to Check**:
- [ ] All scopes in `securitySchemes` and `security` match `^[a-z]+:[a-z]+(-[a-z]+)*:(read|write|admin)$` (or documented custom actions)
- [ ] Scopes follow `<domain>:<resource>:<action>` format
- [ ] No scopes use PascalCase, dots, or missing segments

---

### use-upper-snake-enums
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-upper-snake-enums](/docs/rules/api-contract-and-documentation#use-upper-snake-enums) |

**What to Check**:
- [ ] All `enum` values of type `string` match `^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$`
- [ ] No enum values use camelCase, lowercase, or contain spaces

---

### follow-api-guidelines
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#follow-api-guidelines](/docs/rules/api-contract-and-documentation#follow-api-guidelines) |

**What to Check**: Meta-rule. Testable only by running all other rule checks.

---

### describe-api
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#describe-api](/docs/rules/api-contract-and-documentation#describe-api) |

**What to Check**:
- [ ] `info.description` is present and non-empty
- [ ] `info.description` length exceeds a minimum threshold (e.g., > 100 characters)
- [ ] Tag descriptions are present for all tags

---

### describe-fields
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#describe-fields](/docs/rules/api-contract-and-documentation#describe-fields) |

**What to Check**:
- [ ] Every parameter (path, query, header) has a non-empty `description`
- [ ] Every schema property has a non-empty `description`
- [ ] No description merely restates the property name (heuristic: description != title-cased property name)
- [ ] Descriptions are longer than a minimum threshold (e.g., > 10 characters)

---

### require-examples
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#require-examples](/docs/rules/api-contract-and-documentation#require-examples) |

**What to Check**:
- [ ] Every parameter has an `example` or `examples` field
- [ ] Every schema property has an `example` field
- [ ] Response bodies have `example` or `examples` in the media type object
- [ ] Examples conform to the declared schema type/format (e.g., date-time examples are valid RFC 3339)

---

### limit-summary-length
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#limit-summary-length](/docs/rules/api-contract-and-documentation#limit-summary-length) |

**What to Check**:
- [ ] Every operation has a `summary`
- [ ] Word count of `summary` is <= 5

---

### omit-boolean-prefixes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#omit-boolean-prefixes](/docs/rules/api-contract-and-documentation#omit-boolean-prefixes) |

**What to Check**:
- [ ] Boolean properties do not start with `is`, `has`, `can`, `was`, `will` (flag for review)
- [ ] Suggest the adjective-only alternative

---

### use-positive-booleans
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-positive-booleans](/docs/rules/api-contract-and-documentation#use-positive-booleans) |

**What to Check**:
- [ ] Boolean property names do not use negative prefixes/words: `disabled`, `excluded`, `unverified`, `hidden`, `inactive`, `denied`, `blocked`, `unavailable`
- [ ] Flag negative boolean names and suggest positive alternatives

---

### document-filters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#document-filters](/docs/rules/api-contract-and-documentation#document-filters) |

**What to Check**:
- [ ] If a `filters` query parameter exists, check that its `description` contains: "Syntax:", "Operators:", "Supported fields:", and "Examples:"
- [ ] Flag `filters` parameters with empty or minimal descriptions
- [ ] Spectral (or equivalent) rules that validate `filters` grammar stay aligned with the documented operators and structure in this guideline

---

### document-sorters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#document-sorters](/docs/rules/api-contract-and-documentation#document-sorters) |

**What to Check**:
- [ ] If a `sorters` query parameter exists, check that its `description` contains: "Syntax:", "Direction:", "Supported fields:", "Default ordering:", and "Examples:"
- [ ] Flag `sorters` parameters with empty or minimal descriptions
- [ ] Spectral (or equivalent) rules that validate `sorters` grammar stay aligned with the documented structure in this guideline

---

### use-camelcase-operationids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#use-camelcase-operationids](/docs/rules/api-contract-and-documentation#use-camelcase-operationids) |

**What to Check**:
- [ ] Every operation has an `operationId`
- [ ] Every `operationId` matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] All `operationId` values are unique across the entire spec
- [ ] GET collection operations follow `list<ResourcePlural>` pattern (advisory)
- [ ] GET item operations follow `get<Resource>` pattern (advisory)
- [ ] POST operations follow `create<Resource>` pattern (advisory)

---

### require-operation-tags
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#require-operation-tags](/docs/rules/api-contract-and-documentation#require-operation-tags) |

**What to Check**:
- [ ] Every operation has a `tags` array with exactly one tag
- [ ] Every tag used on an operation exists in the root `tags` array
- [ ] Root `tags` array entries have descriptions

---

### require-resource-operation-id
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#require-resource-operation-id](/docs/rules/api-contract-and-documentation#require-resource-operation-id) |

**What to Check**:
- [ ] Every path parameter (`in: path`) has an `x-sailpoint-resource-operation-id` extension
- [ ] The extension value is camelCase
- [ ] The extension value corresponds to an existing `operationId` in the spec

---

## Lifecycle & Compatibility (200-series)

### no-breaking-changes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#no-breaking-changes](/docs/rules/lifecycle-and-compatibility#no-breaking-changes) |

**What to Check** (requires comparing two spec versions):
- [ ] No endpoints removed
- [ ] No required fields added to request bodies
- [ ] No fields removed from responses
- [ ] No field types changed
- [ ] No enum values removed
- [ ] No path parameters added/removed
- [ ] No required query parameters added

---

### prefer-additive-changes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#prefer-additive-changes](/docs/rules/lifecycle-and-compatibility#prefer-additive-changes) |

**What to Check** (requires comparing two spec versions):
- [ ] New fields are optional (have defaults or are not in `required` array)
- [ ] New query parameters have defaults
- [ ] New endpoints don't overlap with existing ones

---

### tolerate-extensions
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#tolerate-extensions](/docs/rules/lifecycle-and-compatibility#tolerate-extensions) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### constrain-inputs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#constrain-inputs](/docs/rules/lifecycle-and-compatibility#constrain-inputs) |

**What to Check**:
- [ ] String properties have `minLength` and/or `maxLength` constraints
- [ ] Integer/number properties have `minimum` and/or `maximum` constraints
- [ ] String properties with known patterns have `pattern` or `format` defined
- [ ] Enum properties have defined values

---

### use-object-responses
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#use-object-responses](/docs/rules/lifecycle-and-compatibility#use-object-responses) |

**What to Check**:
- [ ] All 2xx response schemas have `type: object` at the top level (not `type: array`) for **new** list endpoints
- [ ] Collection endpoints wrap arrays in an object (e.g., `items` property)
- [ ] If a legacy endpoint still documents `type: array` at the root, the spec calls out the grandfathered contract and a migration path

---

### treat-objects-extensible
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#treat-objects-extensible](/docs/rules/lifecycle-and-compatibility#treat-objects-extensible) |

**What to Check**:
- [ ] Response schemas do not use `additionalProperties: false` (which blocks extension)
- [ ] No response schema uses `maxProperties`

---

### avoid-version-forks
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#avoid-version-forks](/docs/rules/lifecycle-and-compatibility#avoid-version-forks) |

**What to Check**: Design/process rule. Not directly testable.

---

### use-path-versioning
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#use-path-versioning](/docs/rules/lifecycle-and-compatibility#use-path-versioning) |

**What to Check**:
- [ ] If version segments exist in paths, they use path-based format (e.g., `/v2026/...` or `/v3/...`)
- [ ] No query-parameter-based versioning (`?version=`)
- [ ] Server URLs in `servers` array contain version segments if applicable

---

### use-calendar-versioning
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#use-calendar-versioning](/docs/rules/lifecycle-and-compatibility#use-calendar-versioning) |

**What to Check**:
- [ ] `info.version` matches `^\d{4}\.\d+$` pattern (e.g., `2026.1`)
- [ ] Path version segments (if present) use year format (e.g., `/v2026/`)

---

### mark-deprecated
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#mark-deprecated](/docs/rules/lifecycle-and-compatibility#mark-deprecated) |

**What to Check**:
- [ ] Operations with `deprecated: true` use `x-deprecated-description` (or equivalent) for sunset, replacement, and migration narrative; primary `description` still describes current behavior
- [ ] Deprecated operations have `externalDocs` linking to migration guide
- [ ] Sunset date appears in `x-deprecated-description` (or migration doc linked there), not only in informal prose outside the spec

---

### monitor-deprecation
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#monitor-deprecation](/docs/rules/lifecycle-and-compatibility#monitor-deprecation) |

**What to Check**: Operational/runtime process. Not testable against spec.

---

### add-sunset-headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#add-sunset-headers](/docs/rules/lifecycle-and-compatibility#add-sunset-headers) |

**What to Check**:
- [ ] Deprecated operations define `Deprecation` and `Sunset` response headers in their response objects

---

### monitor-sunset-headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#monitor-sunset-headers](/docs/rules/lifecycle-and-compatibility#monitor-sunset-headers) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### no-new-deprecated-usage
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#no-new-deprecated-usage](/docs/rules/lifecycle-and-compatibility#no-new-deprecated-usage) |

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

### specify-audience
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#specify-audience](/docs/rules/lifecycle-and-compatibility#specify-audience) |

**What to Check**:
- [ ] `info.x-audience` is present
- [ ] Value is one of `internal-company` or `external-public`

---

### follow-version-policy
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#follow-version-policy](/docs/rules/lifecycle-and-compatibility#follow-version-policy) |

**What to Check**: Process/runtime rule about support windows. Not directly testable.

---

### mark-experimental
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#mark-experimental](/docs/rules/lifecycle-and-compatibility#mark-experimental) |

**What to Check**:
- [ ] If `info.x-stability` is `experimental`, verify experimental-specific documentation exists
- [ ] Check that experimental operations/schemas use `x-stability: experimental` (or equivalent) when only part of the API is experimental

---

### agree-sunset-timelines
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#agree-sunset-timelines](/docs/rules/lifecycle-and-compatibility#agree-sunset-timelines) |

**What to Check**: Process rule. Not testable against spec.

---

### mark-enum-extensibility
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#mark-enum-extensibility](/docs/rules/lifecycle-and-compatibility#mark-enum-extensibility) |

**What to Check**:
- [ ] Enum properties have `x-extensible: true` or `x-extensible: false`
- [ ] Enum descriptions mention whether the enum is open or closed
- [ ] Closed enums (`x-extensible: false`) are not modified within the same major version (diff-based)

---

## Security & Authorization (300-series)

### use-oauth2
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#use-oauth2](/docs/rules/security-and-authorization#use-oauth2) |

**What to Check**:
- [ ] Every operation has a `security` field (not just global security)
- [ ] At least one security scheme of type `oauth2` is defined in `securitySchemes`
- [ ] Each `security` entry references an oauth2 scheme with scopes

---

### define-scopes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#define-scopes](/docs/rules/security-and-authorization#define-scopes) |

**What to Check**:
- [ ] Every operation's `security` field lists specific scopes (not empty arrays)
- [ ] All scopes referenced in operations are defined in the `securitySchemes`
- [ ] No operation uses an empty scope list when security is declared

---

### document-licenses
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#document-licenses](/docs/rules/security-and-authorization#document-licenses) |

**What to Check**:
- [ ] Tags or operations that require licenses have `x-license-addons` extension
- [ ] If `x-license-addons` exists, it is a non-empty array of strings

---

### document-user-capabilities
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#document-user-capabilities](/docs/rules/security-and-authorization#document-user-capabilities) |

**What to Check**:
- [ ] Operations using `userAuth` security scheme have `description` mentioning required user roles/capabilities
- [ ] Consider checking for a `x-user-capabilities` extension if standardized

---

### require-https
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#require-https](/docs/rules/security-and-authorization#require-https) |

**What to Check**:
- [ ] All `servers[].url` values start with `https://`
- [ ] No server URL starts with `http://`
- [ ] No server URL uses a non-TLS scheme

---

### no-url-secrets
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#no-url-secrets](/docs/rules/security-and-authorization#no-url-secrets) |

**What to Check**:
- [ ] No `securitySchemes` with `type: apiKey` and `in: query`
- [ ] No query parameters named `api_key`, `token`, `secret`, `password`, `apiKey`, `access_token`
- [ ] No path parameters named `token`, `secret`, `key`

---

### auth-before-parse
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#auth-before-parse](/docs/rules/security-and-authorization#auth-before-parse) |

**What to Check**: Runtime/implementation behavior. Not testable against spec.

---

### enforce-rate-limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#enforce-rate-limits](/docs/rules/security-and-authorization#enforce-rate-limits) |

**What to Check**:
- [ ] Operations define a `429` response
- [ ] `429` response includes `Retry-After` header definition
- [ ] Rate limit information is mentioned in `info.description` or tag descriptions
- [ ] `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` headers defined in response components

---

### support-cors
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#support-cors](/docs/rules/security-and-authorization#support-cors) |

**What to Check**: Runtime behavior. Not testable against spec alone.

---

### sanitize-inputs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#sanitize-inputs](/docs/rules/security-and-authorization#sanitize-inputs) |

**What to Check**:
- [ ] String properties have `maxLength` defined
- [ ] Free-form text fields are documented as such in descriptions
- [ ] `filters` parameter descriptions mention allowed field whitelists

---

### isolate-tenant-data
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#isolate-tenant-data](/docs/rules/security-and-authorization#isolate-tenant-data) |

**What to Check**:
- [ ] Error response examples do not reference other tenants or tenant-specific identifiers
- [ ] Cache-related documentation mentions tenant scoping (in descriptions or `Cache-Control` headers)
- [ ] List endpoints document implicit tenant scoping in description

---

## HTTP Semantics (400-series)

### use-standard-headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-standard-headers](/docs/rules/http-semantics#use-standard-headers) |

**What to Check**:
- [ ] Operations with JSON responses declare `Content-Type: application/json`
- [ ] Error responses declare `Content-Type: application/problem+json`
- [ ] `429` responses include `Retry-After` header
- [ ] PUT/PATCH responses that support optimistic locking include `ETag` header

---

### use-http-methods
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-http-methods](/docs/rules/http-semantics#use-http-methods) |

**What to Check**:
- [ ] GET operations do not define request bodies
- [ ] DELETE operations do not define request bodies (or if they do, they're optional)
- [ ] POST create operations define `201` responses with `Location` header
- [ ] PUT operations define full resource schema in request body
- [ ] PATCH operations document the patch format in description

---

### honor-method-semantics
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#honor-method-semantics](/docs/rules/http-semantics#honor-method-semantics) |

**What to Check**:
- [ ] GET/HEAD/OPTIONS operations do not declare `requestBody`
- [ ] Flag GET operations that mention "create", "update", "delete", or "trigger" in their description

---

### use-standard-status-codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-standard-status-codes](/docs/rules/http-semantics#use-standard-status-codes) |

**What to Check**:
- [ ] All response status codes are IANA-registered standard codes
- [ ] No custom/non-standard status codes
- [ ] GET operations define `200` response
- [ ] POST create operations define `201` response
- [ ] DELETE operations define `204` (or `200`) response
- [ ] Every operation defines at least one 4xx error response
- [ ] Operations define `401` and `403` responses

---

### use-problem-details
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-problem-details](/docs/rules/http-semantics#use-problem-details) |

**What to Check**:
- [ ] Error responses (4xx, 5xx) use `application/problem+json` content type
- [ ] Error response schemas include required fields: `type`, `title`, `status`, `detail`, `instance`
- [ ] Error responses have `example` or `examples`
- [ ] A shared `ProblemDetails` component schema exists and is referenced
- [ ] Error schemas include `correlationId` property
- [ ] Examples and extension fields match the organization's published API error catalog when it is stricter than this baseline

---

### use-per-item-batch-status
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-per-item-batch-status](/docs/rules/http-semantics#use-per-item-batch-status) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) define `207` or `200` responses
- [ ] Batch response schemas include an `items` array with per-item `status` fields

---

### use-429-rate-limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-429-rate-limits](/docs/rules/http-semantics#use-429-rate-limits) |

**What to Check**:
- [ ] Operations that can be rate-limited define `429` response
- [ ] `429` response defines `Retry-After` header
- [ ] `429` response body uses `application/problem+json`

---

### support-async-operations
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#support-async-operations](/docs/rules/http-semantics#support-async-operations) |

**What to Check**:
- [ ] Operations returning `202 Accepted` define a `Location` header
- [ ] Operations returning `202` define a `Retry-After` header
- [ ] Status resource schemas include `id`, `status`, `createdAt`, `completedAt`, `error` fields
- [ ] Job-related `operationId` values follow `create<Thing>Job` / `get<Thing>Job` / `list<Thing>Jobs` pattern

---

### no-internal-errors
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#no-internal-errors](/docs/rules/http-semantics#no-internal-errors) |

**What to Check**:
- [ ] Error response examples do not contain stack traces, file paths, class names, or SQL
- [ ] Error response schemas include `correlationId` field

---

### prefer-idempotent-writes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#prefer-idempotent-writes](/docs/rules/http-semantics#prefer-idempotent-writes) |

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

### use-secondary-idempotency-keys
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-secondary-idempotency-keys](/docs/rules/http-semantics#use-secondary-idempotency-keys) |

**What to Check**:
- [ ] If `externalId` or similar secondary key is in the request schema, it is documented with uniqueness constraints
- [ ] POST operations with secondary keys define `409 Conflict` response

---

### require-accurate-examples
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#require-accurate-examples](/docs/rules/http-semantics#require-accurate-examples) |

**What to Check**:
- [ ] Every operation has at least one 2xx response example
- [ ] Every operation has at least one error response example
- [ ] Examples are valid JSON (parseable)
- [ ] Examples do not contain placeholder patterns like `"string"`, `"TODO"`, `0`
- [ ] Examples do not contain secrets or obvious test data markers
- [ ] List success examples use an object envelope (e.g., `items` + pagination fields), not a bare top-level JSON array, unless the operation is explicitly documented as grandfathered

---

### document-caching
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-caching](/docs/rules/http-semantics#document-caching) |

**What to Check**:
- [ ] GET operations mention caching in their description (or explicitly state no caching)
- [ ] `Cache-Control` header is defined in response components
- [ ] `ETag` header is defined for GET responses that support conditional requests

---

### document-size-limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-size-limits](/docs/rules/http-semantics#document-size-limits) |

**What to Check**:
- [ ] Operations that accept request bodies mention size limits in description
- [ ] `413` response is defined for operations that accept large payloads
- [ ] File upload operations document maximum file size

---

### use-optimistic-locking
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-optimistic-locking](/docs/rules/http-semantics#use-optimistic-locking) |

**What to Check**:
- [ ] PUT/PATCH operations define `If-Match` header parameter
- [ ] PUT/PATCH operations define `412 Precondition Failed` response
- [ ] GET operations return `ETag` header
- [ ] `428 Precondition Required` response defined when `If-Match` is mandatory but missing

---

### use-406-for-accept
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#use-406-for-accept](/docs/rules/http-semantics#use-406-for-accept) |

**What to Check**:
- [ ] Operations define a `406` response
- [ ] `406` response uses `application/problem+json` content type
- [ ] `406` response schema references the standard Problem Details schema
- [ ] Response `content` keys document all supported media types

---

### document-head-options
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#document-head-options](/docs/rules/http-semantics#document-head-options) |

**What to Check**:
- [ ] Paths with GET operations also define HEAD operations (or document automatic HEAD support)
- [ ] OPTIONS responses include `Allow` header documentation if explicitly defined
- [ ] HEAD operations do not define response bodies

---

### classify-retryability
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#classify-retryability](/docs/rules/http-semantics#classify-retryability) |

**What to Check**:
- [ ] `429`, `502`, `503`, `504` responses include `Retry-After` header definition
- [ ] Application-specific error codes (`code` in Problem Details) include retryability documentation in description
- [ ] Non-retryable error responses (400, 401, 403, 404, 422) do not include `Retry-After` header

---

## Resource Modeling & URLs (500-series)

### no-api-base-path
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#no-api-base-path](/docs/rules/resource-modeling-and-urls#no-api-base-path) |

**What to Check**:
- [ ] No path starts with `/api/`
- [ ] No `servers[].url` ends with `/api`

---

### canonical-urls
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#canonical-urls](/docs/rules/resource-modeling-and-urls#canonical-urls) |

**What to Check**:
- [ ] No paths contain `//` (double slashes)
- [ ] No paths contain empty segments
- [ ] Trailing slash usage is consistent across all paths (all have or all don't)
- [ ] All path segments are lowercase

---

### use-resource-urls
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-resource-urls](/docs/rules/resource-modeling-and-urls#use-resource-urls) |

**What to Check**:
- [ ] Flag path segments containing common verbs: `get`, `create`, `update`, `delete`, `fetch`, `set`, `remove`, `start`, `stop`, `execute`, `run`
- [ ] Exception: `/search` suffix is acceptable for POST search endpoints
- [ ] Prefer noun-based request resources (`POST .../disable-requests`) over procedure-style paths (`POST .../disable`) when an action does not map to CRUD
- [ ] POST operations whose last segment is a verb token are flagged for review against resource modeling guidance

---

### model-workflows
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#model-workflows](/docs/rules/resource-modeling-and-urls#model-workflows) |

**What to Check**: Design judgment. Not testable against spec.

---

### design-useful-resources
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#design-useful-resources](/docs/rules/resource-modeling-and-urls#design-useful-resources) |

**What to Check**:
- [ ] Collection GET endpoints that benefit from slimmer payloads document field projection when `POST .../search` is not the only entry point
- [ ] Advisory: design judgment on resource boundaries — pair with [#use-resource-urls] and [#support-fields]

---

### use-domain-names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-domain-names](/docs/rules/resource-modeling-and-urls#use-domain-names) |

**What to Check**:
- [ ] Flag path segments containing implementation prefixes: `db`, `tbl`, `internal`, `tmp`, `raw`, `sys`
- [ ] Flag path segments that look like database table names

---

### nest-coupled-resources
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#nest-coupled-resources](/docs/rules/resource-modeling-and-urls#nest-coupled-resources) |

**What to Check**: Design judgment about coupling. Not automatable.

---

### prefer-flat-urls
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#prefer-flat-urls](/docs/rules/resource-modeling-and-urls#prefer-flat-urls) |

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

### limit-url-depth
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#limit-url-depth](/docs/rules/resource-modeling-and-urls#limit-url-depth) |

**What to Check**:
- [ ] Count the number of path parameter segments in each path
- [ ] Flag paths with > 3 levels of nesting (more than 3 `/{param}/` segments)

---

### use-rest-level-2
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-rest-level-2](/docs/rules/resource-modeling-and-urls#use-rest-level-2) |

**What to Check**:
- [ ] **Richardson Level 2**: resources identified by URLs; HTTP methods express operations; status codes express outcomes (hypermedia / Level 3 not required)
- [ ] Composite check: passes #use-http-methods (methods), #use-standard-status-codes (status codes), #use-problem-details (error contract), #use-path-casing (URL nouns)
- [ ] No RPC-style paths (paths that are entirely verbs)

---

### use-url-safe-ids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#use-url-safe-ids](/docs/rules/resource-modeling-and-urls#use-url-safe-ids) |

**What to Check**:
- [ ] Path parameter schemas use `type: string` (not integer or number)
- [ ] Path parameter examples contain only URL-safe characters `[A-Za-z0-9._:-]`
- [ ] Path parameter `format` is `uuid` or unspecified (not `int32`/`int64`)

---

### no-org-names-in-paths
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#no-org-names-in-paths](/docs/rules/resource-modeling-and-urls#no-org-names-in-paths) |

**What to Check**:
- [ ] No paths contain segments like `/customers/`, `/orgs/`, `/tenants/` followed by a parameter
- [ ] No path parameters named `orgName`, `orgId`, `tenantName`, `tenantId`, `customerName`

---

### no-sequential-ids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#no-sequential-ids](/docs/rules/resource-modeling-and-urls#no-sequential-ids) |

**What to Check**:
- [ ] Path parameter schemas are `type: string`, not `type: integer`
- [ ] Path parameter `format` is not `int32` or `int64`
- [ ] Path parameter examples are not purely numeric

---

### define-soft-delete
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#define-soft-delete](/docs/rules/resource-modeling-and-urls#define-soft-delete) |

**What to Check**:
- [ ] DELETE operations document whether hard or soft delete in description
- [ ] If schemas include `deletedAt` or `status: DELETED`, corresponding DELETE operations exist
- [ ] List operations that support soft-deleted resources have `includeDeleted` query parameter

---

## Requests & Querying (600-series)

### use-standard-query-params
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#use-standard-query-params](/docs/rules/requests-and-querying#use-standard-query-params) |

**What to Check**:
- [ ] Pagination parameters are named `limit` and `offset` (not `pageSize`, `page`, `skip`)
- [ ] Filter parameter is named `filters` (not `filter`, `query`, `q`, `where`)
- [ ] Sort parameter is named `sorters` (not `sort`, `sortBy`, `orderBy`)
- [ ] Count parameter is named `count` (not `totalCount`, `includeCount`)

---

### define-array-params
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#define-array-params](/docs/rules/requests-and-querying#define-array-params) |

**What to Check**:
- [ ] Array-typed query parameters define `style` and `explode` in their parameter definition
- [ ] Array-typed header parameters define `style` and `explode`
- [ ] Or: description explicitly documents the encoding format

---

### support-offset-pagination
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#support-offset-pagination](/docs/rules/requests-and-querying#support-offset-pagination) |

**What to Check**:
- [ ] GET operations returning collections define `limit` query parameter
- [ ] GET operations returning collections define `offset` query parameter
- [ ] `limit` parameter has documented `default` and `maximum` values
- [ ] Response schema wraps items in an object with `items` array property
- [ ] Response schema includes `limit`, `offset`, and `count` properties
- [ ] Examples and documented response bodies do not show a bare JSON array at the root for list responses

---

### document-default-query
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#document-default-query](/docs/rules/requests-and-querying#document-default-query) |

**What to Check**:
- [ ] List operations mention default sort order in description
- [ ] List operations document implicit filters (tenant scoping, deleted items) in description
- [ ] Description contains keywords like "default", "order", "sort" or "implicit", "scope"

---

### use-consistent-query-format
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#use-consistent-query-format](/docs/rules/requests-and-querying#use-consistent-query-format) |

**What to Check**:
- [ ] All filter parameters use the same name (`filters`) across all operations
- [ ] All sort parameters use the same name (`sorters`) across all operations
- [ ] POST search endpoints use path suffix `/search`
- [ ] Search endpoint operationIds follow `search<ResourcePlural>` pattern

---

### design-batch-endpoints
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#design-batch-endpoints](/docs/rules/requests-and-querying#design-batch-endpoints) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) accept an `items` array in request body
- [ ] Batch operations document maximum batch size in description
- [ ] Batch response schemas include per-item status/error
- [ ] Batch operationIds follow `batch<Action><ResourcePlural>` pattern

---

### include-pagination-links
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#include-pagination-links](/docs/rules/requests-and-querying#include-pagination-links) |

**What to Check**:
- [ ] List endpoint response schemas include a `links` property
- [ ] `links` schema includes `self`, `next`, and `prev` properties of type `string` with `format: uri`
- [ ] List endpoint response examples include `links` with absolute URLs

---

## Payload Conventions (700-series)

### handle-null-values
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#handle-null-values](/docs/rules/payload-conventions#handle-null-values) |

**What to Check**:
- [ ] Fields that are nullable in examples are marked `nullable: true` in schema (or `type: [string, "null"]` for OAS 3.1)
- [ ] Fields not marked nullable do not have `null` in examples

---

### use-booleans
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-booleans](/docs/rules/payload-conventions#use-booleans) |

**What to Check**:
- [ ] Boolean properties (`type: boolean`) are not `nullable: true`
- [ ] Boolean properties are not in a nullable union type
- [ ] Optional boolean properties have a `default` value defined

---

### use-empty-arrays
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-empty-arrays](/docs/rules/payload-conventions#use-empty-arrays) |

**What to Check**:
- [ ] Array properties (`type: array`) are not `nullable: true`
- [ ] Array properties are not in a nullable union type
- [ ] Array property examples use `[]` not `null` for empty state

---

### model-nullability
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#model-nullability](/docs/rules/payload-conventions#model-nullability) |

**What to Check**:
- [ ] Fields with `null` in examples are marked `nullable: true`
- [ ] Boolean and array properties are NOT nullable (#use-booleans, #use-empty-arrays)
- [ ] Nullable modeling matches OAS version (3.0: `nullable: true`; 3.1: type union)

---

### use-non-json-media-types
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-non-json-media-types](/docs/rules/payload-conventions#use-non-json-media-types) |

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

### use-additionalproperties
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#use-additionalproperties](/docs/rules/payload-conventions#use-additionalproperties) |

**What to Check**:
- [ ] Schema objects with `additionalProperties` have a typed value (not just `true`)
- [ ] Flag `type: object` without `properties` and without `additionalProperties` (ambiguous map)

---

### avoid-nesting
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#avoid-nesting](/docs/rules/payload-conventions#avoid-nesting) |

**What to Check**:
- [ ] Measure maximum object nesting depth in response schemas
- [ ] Flag schemas with > 3 levels of nested objects
- [ ] Warn when large object schemas ($ref) are embedded inline rather than referenced by ID

---

### define-defaults
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-defaults](/docs/rules/payload-conventions#define-defaults) |

**What to Check**:
- [ ] Optional properties (not in `required` array) have a `default` value OR description documenting default behavior
- [ ] Optional boolean properties have `default: true` or `default: false`
- [ ] Optional query parameters document default values

---

### define-required-fields
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-required-fields](/docs/rules/payload-conventions#define-required-fields) |

**What to Check**:
- [ ] Request body schemas have a `required` array
- [ ] Response schemas have a `required` array for always-present fields
- [ ] Path parameters have `required: true`
- [ ] Different operations use distinct schemas when required fields differ (e.g., `CreateFooRequest` vs `UpdateFooRequest`)

---

### define-patch-semantics
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#define-patch-semantics](/docs/rules/payload-conventions#define-patch-semantics) |

**What to Check**:
- [ ] PATCH operations declare a `requestBody` with explicit `content` type (e.g., `application/merge-patch+json`, `application/json-patch+json`, or `application/json`)
- [ ] PATCH request schemas are distinct from POST/PUT schemas (separate `*Patch` schema)
- [ ] PATCH operation descriptions document null vs. omission semantics
- [ ] PATCH operations include examples showing null handling

---

## Data Types & Common Objects (800-series)

### use-iso8601-durations
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-iso8601-durations](/docs/rules/data-types-and-common-objects#use-iso8601-durations) |

**What to Check**:
- [ ] Properties with "duration", "interval", "timeout", "ttl", "period" in their name use `type: string` (not integer)
- [ ] Duration examples match ISO 8601 pattern (`^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$`)
- [ ] Flag bare numeric duration fields

---

### use-standard-dates
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-dates](/docs/rules/data-types-and-common-objects#use-standard-dates) |

**What to Check**:
- [ ] Properties with "date", "time", "At", "timestamp" in their name use `format: date-time` or `format: date`
- [ ] Date-time examples match RFC 3339 format
- [ ] Date-time examples prefer UTC (`Z` suffix)
- [ ] Date-only properties use `format: date`

---

### use-standard-codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-codes](/docs/rules/data-types-and-common-objects#use-standard-codes) |

**What to Check**:
- [ ] Properties with "country" in name reference ISO 3166-1 in description
- [ ] Properties with "language" or "locale" in name reference BCP 47 in description
- [ ] Properties with "currency" in name reference ISO 4217 in description
- [ ] Country code examples are valid ISO 3166-1 alpha-2

---

### define-number-formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#define-number-formats](/docs/rules/data-types-and-common-objects#define-number-formats) |

**What to Check**:
- [ ] `type: integer` properties have `format: int32` or `format: int64`
- [ ] `type: number` properties have `format: float` or `format: double`
- [ ] Properties representing money/decimal use `type: string` (not `type: number`)
- [ ] ID properties use `type: string` (not `type: integer`)

---

### use-common-fields
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-common-fields](/docs/rules/data-types-and-common-objects#use-common-fields) |

**What to Check**:
- [ ] Flag non-standard variants: `created` (should be `createdAt`), `modified` (should be `modifiedAt`), `lastModified` (should be `modifiedAt`), `updated` (should be `modifiedAt`)
- [ ] Creation timestamps use `createdAt` name
- [ ] Modification timestamps use `modifiedAt` name
- [ ] Resource identifier fields use `id` name
- [ ] Deletion timestamps use `deletedAt` name
- [ ] Reference objects follow `{ id, name }` pattern

---

### use-standard-formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#use-standard-formats](/docs/rules/data-types-and-common-objects#use-standard-formats) |

**What to Check**:
- [ ] Properties named `*email*` use `format: email`
- [ ] Properties named `*url*`, `*uri*`, `*href*` use `format: uri` or `format: uri-reference`
- [ ] Properties named `*Id` with UUID values use `format: uuid`
- [ ] Date/time properties use appropriate format (#use-standard-dates)
- [ ] IP address properties use `format: ipv4` or `format: ipv6`

---

### encode-binary
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#encode-binary](/docs/rules/data-types-and-common-objects#encode-binary) |

**What to Check**:
- [ ] Properties with `format: byte` or `format: binary` include `contentType` sibling property
- [ ] Binary-embedded schemas include `encoding` field documentation
- [ ] Document maximum size for embedded binary fields

---

## Operations & Quality (900-series)

### support-fields
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#support-fields](/docs/rules/operations-and-quality#support-fields) |

**What to Check**:
- [ ] GET operations have a `fields` query parameter (or document why not)
- [ ] `fields` parameter description documents allowed values and syntax

---

### support-embedding
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#support-embedding](/docs/rules/operations-and-quality#support-embedding) |

**What to Check**:
- [ ] GET operations for resources with related entities have an `embed` query parameter
- [ ] `embed` parameter description documents allowed values and depth limits

---

### meet-doc-quality
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#meet-doc-quality](/docs/rules/operations-and-quality#meet-doc-quality) |

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

### return-request-ids
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#return-request-ids](/docs/rules/operations-and-quality#return-request-ids) |

**What to Check**:
- [ ] All responses define `X-Request-Id` header
- [ ] `X-Request-Id` header schema is `type: string, format: uuid`
- [ ] Error response schemas include `correlationId` property
- [ ] A shared `X-Request-Id` header component exists in `components.headers`

---

### design-webhooks
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#design-webhooks](/docs/rules/operations-and-quality#design-webhooks) |

**What to Check**:
- [ ] If webhook schemas exist, they include `id`, `type`, `timestamp`, `data`, `tenantId` fields
- [ ] Webhook event `type` values follow `<resource>.<action>` dot-notation pattern
- [ ] Webhook subscription CRUD endpoints exist if webhooks are offered

---

### provide-health-checks
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#provide-health-checks](/docs/rules/operations-and-quality#provide-health-checks) |

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
- #use-camelcase-properties camelCase JSON properties
- #use-path-casing lowercase-hyphenated paths, camelCase path params
- #use-camelcase-query camelCase query params
- #use-upper-snake-enums UPPER_SNAKE_CASE enums
- #describe-fields describe every parameter/property
- #require-examples examples for every parameter/property
- #use-camelcase-operationids camelCase operationId on every operation
- #require-operation-tags tag on every operation
- #use-object-responses top-level JSON objects (no bare arrays)
- #use-oauth2 security on every operation
- #require-https HTTPS-only servers
- #use-standard-status-codes standard status codes
- #use-problem-details Problem Details error contract
- #no-api-base-path no /api base path
- #no-sequential-ids no sequential numeric IDs
- #support-offset-pagination offset pagination support
- #use-booleans booleans not nullable
- #use-empty-arrays arrays not nullable
- #define-required-fields required fields modeled
- #define-number-formats numeric formats defined
- #return-request-ids X-Request-Id on every response

### P1 - Implement Second (MUST rules, partially testable or diff-based)
- #require-openapi valid OpenAPI spec
- #use-ascii-identifiers ASCII identifiers
- #pluralize-resources plural collection names
- #use-scope-names scope naming convention
- #require-resource-operation-id x-sailpoint-resource-operation-id
- #no-breaking-changes no breaking changes (diff)
- #use-calendar-versioning year-based versioning
- #include-api-metadata API metadata complete
- #specify-audience x-audience specified
- #no-url-secrets no secrets in URLs
- #isolate-tenant-data tenant data isolation
- #use-429-rate-limits 429 with Retry-After
- #require-accurate-examples accurate response examples
- #use-406-for-accept 406 for unsupported Accept headers
- #classify-retryability error retryability classification
- #canonical-urls canonical URL forms
- #use-standard-query-params conventional query parameter names
- #define-array-params collection format defined
- #use-consistent-query-format consistent query format
- #use-standard-media-types standard media types
- #define-patch-semantics PATCH content type and null semantics
- #use-standard-dates standard date/time formats
- #use-standard-formats standard property formats
- #meet-doc-quality doc quality levels

### P2 - Implement Third (SHOULD rules, advisory/educational)
- #pluralize-arrays plural array names
- #use-header-case header casing
- #limit-summary-length summary word count
- #omit-boolean-prefixes avoid qualifying verbs
- #use-positive-booleans positive boolean semantics
- #document-filters filters parameter template
- #document-sorters sorters parameter template
- #constrain-inputs input constraints
- #mark-enum-extensibility enum extensibility annotations
- #sanitize-inputs input sanitization (maxLength)
- #use-optimistic-locking optimistic locking
- #document-head-options HEAD and OPTIONS method support
- #use-resource-urls resource modeling + noun-based URL segments (single consolidated rule)
- #limit-url-depth nesting depth
- #include-pagination-links pagination links in collection responses
- #use-additionalproperties maps with additionalProperties
- #avoid-nesting avoid deep nesting
- #define-defaults defaults for optionals
- #use-common-fields common field names
