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

### #100 - Follow API-First
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#100](/docs/rules/api-contract-and-documentation#100) |

**What to Check**: Not directly testable. Process rule about designing API-first.

---

### #101 - Provide an OpenAPI Specification
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#101](/docs/rules/api-contract-and-documentation#101) |

**What to Check**:
- [ ] OpenAPI document exists and is valid (parseable, no schema errors)
- [ ] OpenAPI version is 3.0.3 or 3.1.x
- [ ] Document passes a standard OpenAPI validator (e.g., `@redocly/cli lint`, `spectral`)

---

### #102 - Provide an API User Manual
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#102](/docs/rules/api-contract-and-documentation#102) |

**What to Check**:
- [ ] `externalDocs` is present at root level or on tags/operations
- [ ] `info.description` contains links to guides or user manual

---

### #103 - Write in U.S. English
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#103](/docs/rules/api-contract-and-documentation#103) |

**What to Check**:
- [ ] Scan `description`, `summary`, `title` fields for common British spellings (colour, authorisation, behaviour, catalogue, etc.)
- [ ] Flag non-ASCII characters in descriptions that aren't code examples

---

### #104 - Use camelCase for JSON Properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#104](/docs/rules/api-contract-and-documentation#104) |

**What to Check**:
- [ ] Every property name in every schema matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No property names use snake_case, PascalCase, or kebab-case
- [ ] Acronyms follow lowercase-start convention (e.g., `oauthClientId` not `OAuthClientID`)

---

### #105 - Use ASCII for API Identifiers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#105](/docs/rules/api-contract-and-documentation#105) |

**What to Check**:
- [ ] All path segments contain only ASCII characters
- [ ] All path parameter names contain only ASCII characters
- [ ] All query parameter names contain only ASCII characters
- [ ] All JSON property names contain only ASCII characters
- [ ] All enum values contain only ASCII characters

---

### #106 - Pluralize Array Property Names
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#106](/docs/rules/api-contract-and-documentation#106) |

**What to Check**:
- [ ] Properties with `type: array` have plural names (heuristic: ends in `s`, `es`, `ies`, `ren`, or is in a known exceptions list like `data`, `metadata`)
- [ ] Flag singular-named array properties for review

---

### #107 - Use Lowercase Hyphenated Path Segments and camelCase Path Parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#107](/docs/rules/api-contract-and-documentation#107) |

**What to Check**:
- [ ] All path segments (non-parameter parts) match `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`
- [ ] All path parameter names match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No path segments use PascalCase, snake_case, or camelCase

---

### #108 - Use camelCase for Query Parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#108](/docs/rules/api-contract-and-documentation#108) |

**What to Check**:
- [ ] All query parameter names (`in: query`) match `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] No query parameters use snake_case, PascalCase, or kebab-case

---

### #109 - Use Upper-Case Words with Hyphens
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#109](/docs/rules/api-contract-and-documentation#109) |

**What to Check**:
- [ ] Header parameter names (`in: header`) match `^[A-Z][a-z0-9]*(-[A-Z][a-z0-9]*)*$` pattern (e.g., `Content-Type`, `X-Request-Id`)
- [ ] Flag lowercase or snake_case header names

---

### #110 - Pluralize Collection Resource Names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#110](/docs/rules/api-contract-and-documentation#110) |

**What to Check**:
- [ ] Collection paths (paths that support GET returning a list) use plural resource names
- [ ] Leaf path segments before `/{paramId}` patterns are plural
- [ ] Flag singular collection endpoints

---

### #111 - Follow Naming Convention for Permissions (Scopes)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#111](/docs/rules/api-contract-and-documentation#111) |

**What to Check**:
- [ ] All scopes in `securitySchemes` and `security` match `^[a-z]+:[a-z]+(-[a-z]+)*:(read|write|admin)$` (or documented custom actions)
- [ ] Scopes follow `<domain>:<resource>:<action>` format
- [ ] No scopes use PascalCase, dots, or missing segments

---

### #112 - Declare Enum Values in UPPER_SNAKE_CASE Strings
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#112](/docs/rules/api-contract-and-documentation#112) |

**What to Check**:
- [ ] All `enum` values of type `string` match `^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$`
- [ ] No enum values use camelCase, lowercase, or contain spaces

---

### #113 - Follow SailPoint API Guidelines
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#113](/docs/rules/api-contract-and-documentation#113) |

**What to Check**: Meta-rule. Testable only by running all other rule checks.

---

### #114 - Provide a Detailed API Description
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#114](/docs/rules/api-contract-and-documentation#114) |

**What to Check**:
- [ ] `info.description` is present and non-empty
- [ ] `info.description` length exceeds a minimum threshold (e.g., > 100 characters)
- [ ] Tag descriptions are present for all tags

---

### #115 - Describe Every Parameter and Property
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#115](/docs/rules/api-contract-and-documentation#115) |

**What to Check**:
- [ ] Every parameter (path, query, header) has a non-empty `description`
- [ ] Every schema property has a non-empty `description`
- [ ] No description merely restates the property name (heuristic: description != title-cased property name)
- [ ] Descriptions are longer than a minimum threshold (e.g., > 10 characters)

---

### #116 - Provide Examples for Every Parameter and Property
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#116](/docs/rules/api-contract-and-documentation#116) |

**What to Check**:
- [ ] Every parameter has an `example` or `examples` field
- [ ] Every schema property has an `example` field
- [ ] Response bodies have `example` or `examples` in the media type object
- [ ] Examples conform to the declared schema type/format (e.g., date-time examples are valid RFC 3339)

---

### #117 - Keep Operation Summaries to 5 Words or Fewer
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#117](/docs/rules/api-contract-and-documentation#117) |

**What to Check**:
- [ ] Every operation has a `summary`
- [ ] Word count of `summary` is <= 5

---

### #118 - Avoid Qualifying Verbs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#118](/docs/rules/api-contract-and-documentation#118) |

**What to Check**:
- [ ] Boolean properties do not start with `is`, `has`, `can`, `was`, `will` (flag for review)
- [ ] Suggest the adjective-only alternative

---

### #119 - Use Positive Semantics for Boolean Fields
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#119](/docs/rules/api-contract-and-documentation#119) |

**What to Check**:
- [ ] Boolean property names do not use negative prefixes/words: `disabled`, `excluded`, `unverified`, `hidden`, `inactive`, `denied`, `blocked`, `unavailable`
- [ ] Flag negative boolean names and suggest positive alternatives

---

### #120 - Describe the Filters Parameter (Standard Format)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#120](/docs/rules/api-contract-and-documentation#120) |

**What to Check**:
- [ ] If a `filters` query parameter exists, check that its `description` contains: "Syntax:", "Operators:", "Supported fields:", and "Examples:"
- [ ] Flag `filters` parameters with empty or minimal descriptions

---

### #121 - Describe the Sorters Parameter (Standard Format)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#121](/docs/rules/api-contract-and-documentation#121) |

**What to Check**:
- [ ] If a `sorters` query parameter exists, check that its `description` contains: "Syntax:", "Direction:", "Supported fields:", "Default ordering:", and "Examples:"
- [ ] Flag `sorters` parameters with empty or minimal descriptions

---

### #122 - Provide a camelCase operationId for Every Operation
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#122](/docs/rules/api-contract-and-documentation#122) |

**What to Check**:
- [ ] Every operation has an `operationId`
- [ ] Every `operationId` matches `^[a-z][a-zA-Z0-9]*$` (camelCase)
- [ ] All `operationId` values are unique across the entire spec
- [ ] GET collection operations follow `list<ResourcePlural>` pattern (advisory)
- [ ] GET item operations follow `get<Resource>` pattern (advisory)
- [ ] POST operations follow `create<Resource>` pattern (advisory)

---

### #123 - Provide a Tag for Every Operation
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#123](/docs/rules/api-contract-and-documentation#123) |

**What to Check**:
- [ ] Every operation has a `tags` array with exactly one tag
- [ ] Every tag used on an operation exists in the root `tags` array
- [ ] Root `tags` array entries have descriptions

---

### #124 - Provide x-sailpoint-resource-operation-id for Path Parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | API Contract & Documentation |
| **URL** | [/docs/rules/api-contract-and-documentation#124](/docs/rules/api-contract-and-documentation#124) |

**What to Check**:
- [ ] Every path parameter (`in: path`) has an `x-sailpoint-resource-operation-id` extension
- [ ] The extension value is camelCase
- [ ] The extension value corresponds to an existing `operationId` in the spec

---

## Lifecycle & Compatibility (200-series)

### #200 - Do Not Break Compatibility
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#200](/docs/rules/lifecycle-and-compatibility#200) |

**What to Check** (requires comparing two spec versions):
- [ ] No endpoints removed
- [ ] No required fields added to request bodies
- [ ] No fields removed from responses
- [ ] No field types changed
- [ ] No enum values removed
- [ ] No path parameters added/removed
- [ ] No required query parameters added

---

### #201 - Prefer Compatible Extensions
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial (with diff) |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#201](/docs/rules/lifecycle-and-compatibility#201) |

**What to Check** (requires comparing two spec versions):
- [ ] New fields are optional (have defaults or are not in `required` array)
- [ ] New query parameters have defaults
- [ ] New endpoints don't overlap with existing ones

---

### #202 - Prepare Clients for Extensions
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#202](/docs/rules/lifecycle-and-compatibility#202) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### #203 - Be Conservative with Inputs
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#203](/docs/rules/lifecycle-and-compatibility#203) |

**What to Check**:
- [ ] String properties have `minLength` and/or `maxLength` constraints
- [ ] Integer/number properties have `minimum` and/or `maximum` constraints
- [ ] String properties with known patterns have `pattern` or `format` defined
- [ ] Enum properties have defined values

---

### #204 - Return Top-Level JSON Objects
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#204](/docs/rules/lifecycle-and-compatibility#204) |

**What to Check**:
- [ ] All 2xx response schemas have `type: object` at the top level (not `type: array`)
- [ ] Collection endpoints wrap arrays in an object (e.g., `items` property)

---

### #205 - Treat OpenAPI Objects as Extensible
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#205](/docs/rules/lifecycle-and-compatibility#205) |

**What to Check**:
- [ ] Response schemas do not use `additionalProperties: false` (which blocks extension)
- [ ] No response schema uses `maxProperties`

---

### #206 - Avoid Breaking Changes as the Default Strategy
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#206](/docs/rules/lifecycle-and-compatibility#206) |

**What to Check**: Design/process rule. Not directly testable.

---

### #207 - Use Path Versioning When Versions Coexist
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#207](/docs/rules/lifecycle-and-compatibility#207) |

**What to Check**:
- [ ] If version segments exist in paths, they use path-based format (e.g., `/v2026/...` or `/v3/...`)
- [ ] No query-parameter-based versioning (`?version=`)
- [ ] Server URLs in `servers` array contain version segments if applicable

---

### #208 - Use Year-Based API Versioning (YYYY.Revision)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#208](/docs/rules/lifecycle-and-compatibility#208) |

**What to Check**:
- [ ] `info.version` matches `^\d{4}\.\d+$` pattern (e.g., `2026.1`)
- [ ] Path version segments (if present) use year format (e.g., `/v2026/`)

---

### #209 - Reflect Deprecation in OpenAPI
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#209](/docs/rules/lifecycle-and-compatibility#209) |

**What to Check**:
- [ ] Operations with `deprecated: true` have a `description` mentioning the replacement or migration path
- [ ] Deprecated operations have `externalDocs` linking to migration guide
- [ ] Deprecated operations mention a sunset date in description

---

### #210 - Monitor Deprecated API Usage
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#210](/docs/rules/lifecycle-and-compatibility#210) |

**What to Check**: Operational/runtime process. Not testable against spec.

---

### #211 - Add Deprecation and Sunset Headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#211](/docs/rules/lifecycle-and-compatibility#211) |

**What to Check**:
- [ ] Deprecated operations define `Deprecation` and `Sunset` response headers in their response objects

---

### #212 - Have Clients Monitor Deprecation and Sunset Headers
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#212](/docs/rules/lifecycle-and-compatibility#212) |

**What to Check**: Client-side behavior. Not testable against the spec.

---

### #213 - Do Not Start New Usage of Deprecated APIs or Features
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#213](/docs/rules/lifecycle-and-compatibility#213) |

**What to Check**: Process rule. Not directly testable against a single spec.

---

### #214 - Include API Metadata
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#214](/docs/rules/lifecycle-and-compatibility#214) |

**What to Check**:
- [ ] `info.title` is present and non-empty
- [ ] `info.version` is present and non-empty
- [ ] `info.description` is present and non-empty
- [ ] `info.contact` is present with at least `name` or `email`
- [ ] `servers` array is present and non-empty
- [ ] `tags` array is present and non-empty
- [ ] Every tag has a `description`

---

### #215 - Specify API Audience
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#215](/docs/rules/lifecycle-and-compatibility#215) |

**What to Check**:
- [ ] `info.x-audience` is present
- [ ] Value is one of `internal-company` or `external-public`

---

### #216 - Follow Version Requirements
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#216](/docs/rules/lifecycle-and-compatibility#216) |

**What to Check**: Process/runtime rule about support windows. Not directly testable.

---

### #217 - Follow Beta Requirements When Applicable
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#217](/docs/rules/lifecycle-and-compatibility#217) |

**What to Check**:
- [ ] If `info.x-stability` is `beta`, verify beta-specific documentation exists
- [ ] Check that beta operations/schemas use `x-stability: beta` extension if partial beta

---

### #218 - Agree on Deprecation Timeframes with Clients
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#218](/docs/rules/lifecycle-and-compatibility#218) |

**What to Check**: Process rule. Not testable against spec.

---

### #219 - Annotate Enum Extensibility (Open vs Closed)
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Lifecycle & Compatibility |
| **URL** | [/docs/rules/lifecycle-and-compatibility#219](/docs/rules/lifecycle-and-compatibility#219) |

**What to Check**:
- [ ] Enum properties have `x-extensible: true` or `x-extensible: false`
- [ ] Enum descriptions mention whether the enum is open or closed
- [ ] Closed enums (`x-extensible: false`) are not modified within the same major version (diff-based)

---

## Security & Authorization (300-series)

### #300 - Secure Endpoints with OAuth 2.0
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#300](/docs/rules/security-and-authorization#300) |

**What to Check**:
- [ ] Every operation has a `security` field (not just global security)
- [ ] At least one security scheme of type `oauth2` is defined in `securitySchemes`
- [ ] Each `security` entry references an oauth2 scheme with scopes

---

### #301 - Define and Assign Scopes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#301](/docs/rules/security-and-authorization#301) |

**What to Check**:
- [ ] Every operation's `security` field lists specific scopes (not empty arrays)
- [ ] All scopes referenced in operations are defined in the `securitySchemes`
- [ ] No operation uses an empty scope list when security is declared

---

### #302 - Document Required Licenses for API Collections
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#302](/docs/rules/security-and-authorization#302) |

**What to Check**:
- [ ] Tags or operations that require licenses have `x-license-addons` extension
- [ ] If `x-license-addons` exists, it is a non-empty array of strings

---

### #303 - Define User Capabilities for userAuth Endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#303](/docs/rules/security-and-authorization#303) |

**What to Check**:
- [ ] Operations using `userAuth` security scheme have `description` mentioning required user roles/capabilities
- [ ] Consider checking for a `x-user-capabilities` extension if standardized

---

### #304 - Require HTTPS/TLS for All Endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#304](/docs/rules/security-and-authorization#304) |

**What to Check**:
- [ ] All `servers[].url` values start with `https://`
- [ ] No server URL starts with `http://`
- [ ] No server URL uses a non-TLS scheme

---

### #305 - Never Put Secrets or Credentials in URLs
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#305](/docs/rules/security-and-authorization#305) |

**What to Check**:
- [ ] No `securitySchemes` with `type: apiKey` and `in: query`
- [ ] No query parameters named `api_key`, `token`, `secret`, `password`, `apiKey`, `access_token`
- [ ] No path parameters named `token`, `secret`, `key`

---

### #306 - Authenticate and Authorize Before Processing Payloads
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#306](/docs/rules/security-and-authorization#306) |

**What to Check**: Runtime/implementation behavior. Not testable against spec.

---

### #307 - Document and Enforce Rate Limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#307](/docs/rules/security-and-authorization#307) |

**What to Check**:
- [ ] Operations define a `429` response
- [ ] `429` response includes `Retry-After` header definition
- [ ] Rate limit information is mentioned in `info.description` or tag descriptions
- [ ] `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` headers defined in response components

---

### #308 - Support CORS for Browser Clients
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#308](/docs/rules/security-and-authorization#308) |

**What to Check**: Runtime behavior. Not testable against spec alone.

---

### #309 - Sanitize Inputs and Prevent Injection
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#309](/docs/rules/security-and-authorization#309) |

**What to Check**:
- [ ] String properties have `maxLength` defined
- [ ] Free-form text fields are documented as such in descriptions
- [ ] `filters` parameter descriptions mention allowed field whitelists

---

### #310 - Enforce Tenant Data Isolation in Responses
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Security & Authorization |
| **URL** | [/docs/rules/security-and-authorization#310](/docs/rules/security-and-authorization#310) |

**What to Check**:
- [ ] Error response examples do not reference other tenants or tenant-specific identifiers
- [ ] Cache-related documentation mentions tenant scoping (in descriptions or `Cache-Control` headers)
- [ ] List endpoints document implicit tenant scoping in description

---

## HTTP Semantics (400-series)

### #400 - Use Standard HTTP Headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#400](/docs/rules/http-semantics#400) |

**What to Check**:
- [ ] Operations with JSON responses declare `Content-Type: application/json`
- [ ] Error responses declare `Content-Type: application/problem+json`
- [ ] `429` responses include `Retry-After` header
- [ ] PUT/PATCH responses that support optimistic locking include `ETag` header

---

### #401 - Use HTTP Methods Correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#401](/docs/rules/http-semantics#401) |

**What to Check**:
- [ ] GET operations do not define request bodies
- [ ] DELETE operations do not define request bodies (or if they do, they're optional)
- [ ] POST create operations define `201` responses with `Location` header
- [ ] PUT operations define full resource schema in request body
- [ ] PATCH operations document the patch format in description

---

### #402 - Honor Method Properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#402](/docs/rules/http-semantics#402) |

**What to Check**:
- [ ] GET/HEAD/OPTIONS operations do not declare `requestBody`
- [ ] Flag GET operations that mention "create", "update", "delete", or "trigger" in their description

---

### #403 - Use Standard HTTP Status Codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#403](/docs/rules/http-semantics#403) |

**What to Check**:
- [ ] All response status codes are IANA-registered standard codes
- [ ] No custom/non-standard status codes
- [ ] GET operations define `200` response
- [ ] POST create operations define `201` response
- [ ] DELETE operations define `204` (or `200`) response
- [ ] Every operation defines at least one 4xx error response
- [ ] Operations define `401` and `403` responses

---

### #404 - Define a Standard Error Contract in OpenAPI (Problem Details)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#404](/docs/rules/http-semantics#404) |

**What to Check**:
- [ ] Error responses (4xx, 5xx) use `application/problem+json` content type
- [ ] Error response schemas include required fields: `type`, `title`, `status`, `detail`, `instance`
- [ ] Error responses have `example` or `examples`
- [ ] A shared `ProblemDetails` component schema exists and is referenced
- [ ] Error schemas include `correlationId` property

---

### #405 - Use 207 (or 200) for Per-Item Batch Results
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#405](/docs/rules/http-semantics#405) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) define `207` or `200` responses
- [ ] Batch response schemas include an `items` array with per-item `status` fields

---

### #406 - Use 429 with Rate-Limit Headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#406](/docs/rules/http-semantics#406) |

**What to Check**:
- [ ] Operations that can be rate-limited define `429` response
- [ ] `429` response defines `Retry-After` header
- [ ] `429` response body uses `application/problem+json`

---

### #407 - Support Long-Running Operations
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#407](/docs/rules/http-semantics#407) |

**What to Check**:
- [ ] Operations returning `202 Accepted` define a `Location` header
- [ ] Operations returning `202` define a `Retry-After` header
- [ ] Status resource schemas include `id`, `status`, `createdAt`, `completedAt`, `error` fields
- [ ] Job-related `operationId` values follow `create<Thing>Job` / `get<Thing>Job` / `list<Thing>Jobs` pattern

---

### #408 - Never Expose Stack Traces or Internal Details
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#408](/docs/rules/http-semantics#408) |

**What to Check**:
- [ ] Error response examples do not contain stack traces, file paths, class names, or SQL
- [ ] Error response schemas include `correlationId` field

---

### #409 - Prefer Idempotent POST/PATCH Where Possible
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#409](/docs/rules/http-semantics#409) |

**What to Check**:
- [ ] POST operations document retry/idempotency behavior in description
- [ ] POST create operations define `409 Conflict` response (for duplicate handling)

---

### #410 - Support Idempotency-Key
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#410](/docs/rules/http-semantics#410) |

**What to Check**:
- [ ] If `Idempotency-Key` header parameter is defined, it has a description covering scope, format, and retention
- [ ] POST operations that support idempotency define the `Idempotency-Key` header parameter

---

### #411 - Use Secondary Keys for Idempotent POST
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#411](/docs/rules/http-semantics#411) |

**What to Check**:
- [ ] If `externalId` or similar secondary key is in the request schema, it is documented with uniqueness constraints
- [ ] POST operations with secondary keys define `409 Conflict` response

---

### #412 - Provide Accurate Response Examples
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#412](/docs/rules/http-semantics#412) |

**What to Check**:
- [ ] Every operation has at least one 2xx response example
- [ ] Every operation has at least one error response example
- [ ] Examples are valid JSON (parseable)
- [ ] Examples do not contain placeholder patterns like `"string"`, `"TODO"`, `0`
- [ ] Examples do not contain secrets or obvious test data markers

---

### #413 - Document Caching Behavior
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#413](/docs/rules/http-semantics#413) |

**What to Check**:
- [ ] GET operations mention caching in their description (or explicitly state no caching)
- [ ] `Cache-Control` header is defined in response components
- [ ] `ETag` header is defined for GET responses that support conditional requests

---

### #414 - Document Request and Response Size Limits
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#414](/docs/rules/http-semantics#414) |

**What to Check**:
- [ ] Operations that accept request bodies mention size limits in description
- [ ] `413` response is defined for operations that accept large payloads
- [ ] File upload operations document maximum file size

---

### #415 - Use Optimistic Locking for Concurrent Writes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#415](/docs/rules/http-semantics#415) |

**What to Check**:
- [ ] PUT/PATCH operations define `If-Match` header parameter
- [ ] PUT/PATCH operations define `412 Precondition Failed` response
- [ ] GET operations return `ETag` header
- [ ] `428 Precondition Required` response defined when `If-Match` is mandatory but missing

---

### #416 - Return 406 for Unsupported Accept Headers
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#416](/docs/rules/http-semantics#416) |

**What to Check**:
- [ ] Operations define a `406` response
- [ ] `406` response uses `application/problem+json` content type
- [ ] `406` response schema references the standard Problem Details schema
- [ ] Response `content` keys document all supported media types

---

### #417 - Document HEAD and OPTIONS Method Support
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#417](/docs/rules/http-semantics#417) |

**What to Check**:
- [ ] Paths with GET operations also define HEAD operations (or document automatic HEAD support)
- [ ] OPTIONS responses include `Allow` header documentation if explicitly defined
- [ ] HEAD operations do not define response bodies

---

### #418 - Classify Error Retryability
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | HTTP Semantics |
| **URL** | [/docs/rules/http-semantics#418](/docs/rules/http-semantics#418) |

**What to Check**:
- [ ] `429`, `502`, `503`, `504` responses include `Retry-After` header definition
- [ ] Application-specific error codes (`code` in Problem Details) include retryability documentation in description
- [ ] Non-retryable error responses (400, 401, 403, 404, 422) do not include `Retry-After` header

---

## Resource Modeling & URLs (500-series)

### #500 - Do Not Use /api Base Path
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#500](/docs/rules/resource-modeling-and-urls#500) |

**What to Check**:
- [ ] No path starts with `/api/`
- [ ] No `servers[].url` ends with `/api`

---

### #501 - Define Canonical URL Forms
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#501](/docs/rules/resource-modeling-and-urls#501) |

**What to Check**:
- [ ] No paths contain `//` (double slashes)
- [ ] No paths contain empty segments
- [ ] Trailing slash usage is consistent across all paths (all have or all don't)
- [ ] All path segments are lowercase

---

### #502 - Model Resources (Avoid Action Endpoints)
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#502](/docs/rules/resource-modeling-and-urls#502) |

**What to Check**:
- [ ] Flag path segments containing common verbs: `get`, `create`, `update`, `delete`, `fetch`, `set`, `remove`, `start`, `stop`, `execute`, `run`
- [ ] POST operations with verb-like terminal path segments are flagged for review

---

### #503 - Model Business Processes
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#503](/docs/rules/resource-modeling-and-urls#503) |

**What to Check**: Design judgment. Not testable against spec.

---

### #504 - Define Useful Resources
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#504](/docs/rules/resource-modeling-and-urls#504) |

**What to Check**: Design judgment. Not testable against spec.

---

### #505 - Keep URLs Verb-Free
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#505](/docs/rules/resource-modeling-and-urls#505) |

**What to Check**:
- [ ] Same as #502 — flag path segments containing common verbs
- [ ] Exception: `/search` suffix is acceptable for POST search endpoints

---

### #506 - Use Domain-Specific Resource Names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#506](/docs/rules/resource-modeling-and-urls#506) |

**What to Check**:
- [ ] Flag path segments containing implementation prefixes: `db`, `tbl`, `internal`, `tmp`, `raw`, `sys`
- [ ] Flag path segments that look like database table names

---

### #507 - Nest Sub-resources Only When Tightly Coupled
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | process |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#507](/docs/rules/resource-modeling-and-urls#507) |

**What to Check**: Design judgment about coupling. Not automatable.

---

### #508 - Prefer Non-nested URLs for Independent Resources
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#508](/docs/rules/resource-modeling-and-urls#508) |

**What to Check**:
- [ ] Flag deeply nested paths (> 2 resource/parameter pairs) for review
- [ ] Advisory: resources with globally unique IDs in nested paths could be top-level

---

### #509 - Limit Resource Types
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#509](/docs/rules/resource-modeling-and-urls#509) |

**What to Check**:
- [ ] Count distinct top-level resource paths; warn if exceeding a threshold (e.g., > 20)
- [ ] Flag resource names that are near-synonyms of each other

---

### #510 - Limit Nesting Depth
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#510](/docs/rules/resource-modeling-and-urls#510) |

**What to Check**:
- [ ] Count the number of path parameter segments in each path
- [ ] Flag paths with > 3 levels of nesting (more than 3 `/{param}/` segments)

---

### #511 - Use REST Maturity Level 2
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#511](/docs/rules/resource-modeling-and-urls#511) |

**What to Check**:
- [ ] Composite check: passes #401 (methods), #403 (status codes), #404 (error contract), #107 (URL nouns)
- [ ] No RPC-style paths (paths that are entirely verbs)

---

### #512 - Use URL-Friendly IDs
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#512](/docs/rules/resource-modeling-and-urls#512) |

**What to Check**:
- [ ] Path parameter schemas use `type: string` (not integer or number)
- [ ] Path parameter examples contain only URL-safe characters `[A-Za-z0-9._:-]`
- [ ] Path parameter `format` is `uuid` or unspecified (not `int32`/`int64`)

---

### #513 - Never Include Customer Org Names in Paths
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#513](/docs/rules/resource-modeling-and-urls#513) |

**What to Check**:
- [ ] No paths contain segments like `/customers/`, `/orgs/`, `/tenants/` followed by a parameter
- [ ] No path parameters named `orgName`, `orgId`, `tenantName`, `tenantId`, `customerName`

---

### #514 - Do Not Use Sequential Numeric IDs
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#514](/docs/rules/resource-modeling-and-urls#514) |

**What to Check**:
- [ ] Path parameter schemas are `type: string`, not `type: integer`
- [ ] Path parameter `format` is not `int32` or `int64`
- [ ] Path parameter examples are not purely numeric

---

### #515 - Define Soft Delete Behavior
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Resource Modeling & URLs |
| **URL** | [/docs/rules/resource-modeling-and-urls#515](/docs/rules/resource-modeling-and-urls#515) |

**What to Check**:
- [ ] DELETE operations document whether hard or soft delete in description
- [ ] If schemas include `deletedAt` or `status: DELETED`, corresponding DELETE operations exist
- [ ] List operations that support soft-deleted resources have `includeDeleted` query parameter

---

## Requests & Querying (600-series)

### #600 - Use Conventional Query Parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#600](/docs/rules/requests-and-querying#600) |

**What to Check**:
- [ ] Pagination parameters are named `limit` and `offset` (not `pageSize`, `page`, `skip`)
- [ ] Filter parameter is named `filters` (not `filter`, `query`, `q`, `where`)
- [ ] Sort parameter is named `sorters` (not `sort`, `sortBy`, `orderBy`)
- [ ] Count parameter is named `count` (not `totalCount`, `includeCount`)

---

### #601 - Define Collection Formats for Header and Query Parameters
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#601](/docs/rules/requests-and-querying#601) |

**What to Check**:
- [ ] Array-typed query parameters define `style` and `explode` in their parameter definition
- [ ] Array-typed header parameters define `style` and `explode`
- [ ] Or: description explicitly documents the encoding format

---

### #602 - Support Offset Pagination for List Endpoints
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#602](/docs/rules/requests-and-querying#602) |

**What to Check**:
- [ ] GET operations returning collections define `limit` query parameter
- [ ] GET operations returning collections define `offset` query parameter
- [ ] `limit` parameter has documented `default` and `maximum` values
- [ ] Response schema wraps items in an object with `items` array property
- [ ] Response schema includes `limit`, `offset`, and `count` properties

---

### #603 - Document Implicit Filters and Default Sorting
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#603](/docs/rules/requests-and-querying#603) |

**What to Check**:
- [ ] List operations mention default sort order in description
- [ ] List operations document implicit filters (tenant scoping, deleted items) in description
- [ ] Description contains keywords like "default", "order", "sort" or "implicit", "scope"

---

### #604 - Use One Query Format Across the API
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#604](/docs/rules/requests-and-querying#604) |

**What to Check**:
- [ ] All filter parameters use the same name (`filters`) across all operations
- [ ] All sort parameters use the same name (`sorters`) across all operations
- [ ] POST search endpoints use path suffix `/search`
- [ ] Search endpoint operationIds follow `search<ResourcePlural>` pattern

---

### #605 - Design Batch Request Endpoints
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#605](/docs/rules/requests-and-querying#605) |

**What to Check**:
- [ ] Batch endpoints (paths containing `/batch`) accept an `items` array in request body
- [ ] Batch operations document maximum batch size in description
- [ ] Batch response schemas include per-item status/error
- [ ] Batch operationIds follow `batch<Action><ResourcePlural>` pattern

---

### #606 - Include Pagination Links in Collection Responses
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Requests & Querying |
| **URL** | [/docs/rules/requests-and-querying#606](/docs/rules/requests-and-querying#606) |

**What to Check**:
- [ ] List endpoint response schemas include a `links` property
- [ ] `links` schema includes `self`, `next`, and `prev` properties of type `string` with `format: uri`
- [ ] List endpoint response examples include `links` with absolute URLs

---

## Payload Conventions (700-series)

### #700 - Handle Null Values Correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#700](/docs/rules/payload-conventions#700) |

**What to Check**:
- [ ] Fields that are nullable in examples are marked `nullable: true` in schema (or `type: [string, "null"]` for OAS 3.1)
- [ ] Fields not marked nullable do not have `null` in examples

---

### #701 - Use Booleans Correctly
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#701](/docs/rules/payload-conventions#701) |

**What to Check**:
- [ ] Boolean properties (`type: boolean`) are not `nullable: true`
- [ ] Boolean properties are not in a nullable union type
- [ ] Optional boolean properties have a `default` value defined

---

### #702 - Initialize Empty Arrays
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#702](/docs/rules/payload-conventions#702) |

**What to Check**:
- [ ] Array properties (`type: array`) are not `nullable: true`
- [ ] Array properties are not in a nullable union type
- [ ] Array property examples use `[]` not `null` for empty state

---

### #703 - Model Nullable Fields in OpenAPI
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#703](/docs/rules/payload-conventions#703) |

**What to Check**:
- [ ] Fields with `null` in examples are marked `nullable: true`
- [ ] Boolean and array properties are NOT nullable (#701, #702)
- [ ] Nullable modeling matches OAS version (3.0: `nullable: true`; 3.1: type union)

---

### #704 - Use Standard Non-JSON Media Types
| Field | Value |
|---|---|
| **Level** | MAY |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#704](/docs/rules/payload-conventions#704) |

**What to Check**:
- [ ] Non-JSON response content types are IANA-registered
- [ ] Error responses still use `application/problem+json` even when success is non-JSON

---

### #705 - Use Standard Media Types
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#705](/docs/rules/payload-conventions#705) |

**What to Check**:
- [ ] All `content` keys in request/response bodies use IANA-registered media types
- [ ] JSON responses use `application/json` (not custom vendor types)
- [ ] Error responses use `application/problem+json`
- [ ] No custom/vendor media types without documented justification

---

### #706 - Define Maps with additionalProperties
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#706](/docs/rules/payload-conventions#706) |

**What to Check**:
- [ ] Schema objects with `additionalProperties` have a typed value (not just `true`)
- [ ] Flag `type: object` without `properties` and without `additionalProperties` (ambiguous map)

---

### #708 - Avoid Nested Objects
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#708](/docs/rules/payload-conventions#708) |

**What to Check**:
- [ ] Measure maximum object nesting depth in response schemas
- [ ] Flag schemas with > 3 levels of nested objects
- [ ] Warn when large object schemas ($ref) are embedded inline rather than referenced by ID

---

### #709 - Define Defaults for Optional Properties
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#709](/docs/rules/payload-conventions#709) |

**What to Check**:
- [ ] Optional properties (not in `required` array) have a `default` value OR description documenting default behavior
- [ ] Optional boolean properties have `default: true` or `default: false`
- [ ] Optional query parameters document default values

---

### #710 - Define Required Fields per OpenAPI
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#710](/docs/rules/payload-conventions#710) |

**What to Check**:
- [ ] Request body schemas have a `required` array
- [ ] Response schemas have a `required` array for always-present fields
- [ ] Path parameters have `required: true`
- [ ] Different operations use distinct schemas when required fields differ (e.g., `CreateFooRequest` vs `UpdateFooRequest`)

---

### #711 - Specify PATCH Content Type and Null Semantics
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Payload Conventions |
| **URL** | [/docs/rules/payload-conventions#711](/docs/rules/payload-conventions#711) |

**What to Check**:
- [ ] PATCH operations declare a `requestBody` with explicit `content` type (e.g., `application/merge-patch+json`, `application/json-patch+json`, or `application/json`)
- [ ] PATCH request schemas are distinct from POST/PUT schemas (separate `*Patch` schema)
- [ ] PATCH operation descriptions document null vs. omission semantics
- [ ] PATCH operations include examples showing null handling

---

## Data Types & Common Objects (800-series)

### #801 - Use ISO 8601 Durations and Intervals
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#801](/docs/rules/data-types-and-common-objects#801) |

**What to Check**:
- [ ] Properties with "duration", "interval", "timeout", "ttl", "period" in their name use `type: string` (not integer)
- [ ] Duration examples match ISO 8601 pattern (`^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$`)
- [ ] Flag bare numeric duration fields

---

### #802 - Use Standard Date/Time Formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#802](/docs/rules/data-types-and-common-objects#802) |

**What to Check**:
- [ ] Properties with "date", "time", "At", "timestamp" in their name use `format: date-time` or `format: date`
- [ ] Date-time examples match RFC 3339 format
- [ ] Date-time examples prefer UTC (`Z` suffix)
- [ ] Date-only properties use `format: date`

---

### #803 - Use Standard Country, Language, and Currency Codes
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#803](/docs/rules/data-types-and-common-objects#803) |

**What to Check**:
- [ ] Properties with "country" in name reference ISO 3166-1 in description
- [ ] Properties with "language" or "locale" in name reference BCP 47 in description
- [ ] Properties with "currency" in name reference ISO 4217 in description
- [ ] Country code examples are valid ISO 3166-1 alpha-2

---

### #804 - Define Numeric Formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#804](/docs/rules/data-types-and-common-objects#804) |

**What to Check**:
- [ ] `type: integer` properties have `format: int32` or `format: int64`
- [ ] `type: number` properties have `format: float` or `format: double`
- [ ] Properties representing money/decimal use `type: string` (not `type: number`)
- [ ] ID properties use `type: string` (not `type: integer`)

---

### #805 - Use Common Field Names
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#805](/docs/rules/data-types-and-common-objects#805) |

**What to Check**:
- [ ] Flag non-standard variants: `created` (should be `createdAt`), `modified` (should be `modifiedAt`), `lastModified` (should be `modifiedAt`), `updated` (should be `modifiedAt`)
- [ ] Creation timestamps use `createdAt` name
- [ ] Modification timestamps use `modifiedAt` name
- [ ] Resource identifier fields use `id` name
- [ ] Deletion timestamps use `deletedAt` name
- [ ] Reference objects follow `{ id, name }` pattern

---

### #806 - Use Standard Property Formats
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#806](/docs/rules/data-types-and-common-objects#806) |

**What to Check**:
- [ ] Properties named `*email*` use `format: email`
- [ ] Properties named `*url*`, `*uri*`, `*href*` use `format: uri` or `format: uri-reference`
- [ ] Properties named `*Id` with UUID values use `format: uuid`
- [ ] Date/time properties use appropriate format (#802)
- [ ] IP address properties use `format: ipv4` or `format: ipv6`

---

### #807 - Encode Embedded Binary Safely
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | partial |
| **Category** | Data Types & Common Objects |
| **URL** | [/docs/rules/data-types-and-common-objects#807](/docs/rules/data-types-and-common-objects#807) |

**What to Check**:
- [ ] Properties with `format: byte` or `format: binary` include `contentType` sibling property
- [ ] Binary-embedded schemas include `encoding` field documentation
- [ ] Document maximum size for embedded binary fields

---

## Operations & Quality (900-series)

### #900 - Support Partial Responses (fields)
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#900](/docs/rules/operations-and-quality#900) |

**What to Check**:
- [ ] GET operations have a `fields` query parameter (or document why not)
- [ ] `fields` parameter description documents allowed values and syntax

---

### #901 - Allow Optional Embedding
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#901](/docs/rules/operations-and-quality#901) |

**What to Check**:
- [ ] GET operations for resources with related entities have an `embed` query parameter
- [ ] `embed` parameter description documents allowed values and depth limits

---

### #902 - Publish an OpenAPI Specification (Meet Doc Quality Levels)
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#902](/docs/rules/operations-and-quality#902) |

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

### #903 - Return a Request ID on Every Response
| Field | Value |
|---|---|
| **Level** | MUST |
| **Testability** | full |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#903](/docs/rules/operations-and-quality#903) |

**What to Check**:
- [ ] All responses define `X-Request-Id` header
- [ ] `X-Request-Id` header schema is `type: string, format: uuid`
- [ ] Error response schemas include `correlationId` property
- [ ] A shared `X-Request-Id` header component exists in `components.headers`

---

### #904 - Design Webhooks and Event Notifications
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#904](/docs/rules/operations-and-quality#904) |

**What to Check**:
- [ ] If webhook schemas exist, they include `id`, `type`, `timestamp`, `data`, `tenantId` fields
- [ ] Webhook event `type` values follow `<resource>.<action>` dot-notation pattern
- [ ] Webhook subscription CRUD endpoints exist if webhooks are offered

---

### #905 - Provide Health Check Endpoints
| Field | Value |
|---|---|
| **Level** | SHOULD |
| **Testability** | partial |
| **Category** | Operations & Quality |
| **URL** | [/docs/rules/operations-and-quality#905](/docs/rules/operations-and-quality#905) |

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
- #104 camelCase JSON properties
- #107 lowercase-hyphenated paths, camelCase path params
- #108 camelCase query params
- #112 UPPER_SNAKE_CASE enums
- #115 describe every parameter/property
- #116 examples for every parameter/property
- #122 camelCase operationId on every operation
- #123 tag on every operation
- #204 top-level JSON objects (no bare arrays)
- #300 security on every operation
- #304 HTTPS-only servers
- #403 standard status codes
- #404 Problem Details error contract
- #500 no /api base path
- #514 no sequential numeric IDs
- #602 offset pagination support
- #701 booleans not nullable
- #702 arrays not nullable
- #710 required fields modeled
- #804 numeric formats defined
- #903 X-Request-Id on every response

### P1 - Implement Second (MUST rules, partially testable or diff-based)
- #101 valid OpenAPI spec
- #105 ASCII identifiers
- #110 plural collection names
- #111 scope naming convention
- #124 x-sailpoint-resource-operation-id
- #200 no breaking changes (diff)
- #208 year-based versioning
- #214 API metadata complete
- #215 x-audience specified
- #305 no secrets in URLs
- #310 tenant data isolation
- #406 429 with Retry-After
- #412 accurate response examples
- #416 406 for unsupported Accept headers
- #418 error retryability classification
- #501 canonical URL forms
- #600 conventional query parameter names
- #601 collection format defined
- #604 consistent query format
- #705 standard media types
- #711 PATCH content type and null semantics
- #802 standard date/time formats
- #806 standard property formats
- #902 doc quality levels

### P2 - Implement Third (SHOULD rules, advisory/educational)
- #106 plural array names
- #109 header casing
- #117 summary word count
- #118 avoid qualifying verbs
- #119 positive boolean semantics
- #120 filters parameter template
- #121 sorters parameter template
- #203 input constraints
- #219 enum extensibility annotations
- #309 input sanitization (maxLength)
- #415 optimistic locking
- #417 HEAD and OPTIONS method support
- #502/#505 verb-free URLs
- #510 nesting depth
- #606 pagination links in collection responses
- #706 maps with additionalProperties
- #708 avoid deep nesting
- #709 defaults for optionals
- #805 common field names
