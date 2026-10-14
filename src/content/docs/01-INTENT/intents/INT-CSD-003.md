---
title: "INT-CSD-003: Metadata Compliance"
id: "INT-CSD-003"
type: "Intent"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
owner: "CSD Methodology"
---
## Intent Specification

The executable claim lives in this repo's `intent.yaml`; this page carries its rationale and provenance.

```yaml
INT-CSD-003:
  version: 1.0.0
  status: active
  statement: "Every CSD document must contain frontmatter metadata with all mandatory fields set to valid values"
  test:
    scope: unit
    component: CSD Documentation
    type: invariant
  criticality: critical
```

---

## 1. Rationale

CSD requires machine-parsable documentation. Frontmatter metadata is the primary mechanism for automated tooling to classify, index, and validate documents. Without mandatory metadata:

- Automated status reporting breaks
- Document lifecycle tracking becomes manual
- Navigation generation fails
- The methodology's own standard (02-METADATA-STANDARD) is violated

This invariant must hold regardless of:

- Document type (Overview, Standard, Guide, Template, Reference)
- Document status (Draft, Active, Deprecated)
- Whether the document was written by a human or AI

---

## 2. Test Specification

### 2.1 Scope: Unit

**Component**: All CSD markdown files under `src/content/docs/`

**Test Type**: Invariant (must ALWAYS be true)

### 2.2 Mandatory Fields

Every document frontmatter block must contain:

| Field | Validation |
|-------|------------|
| **ID** | Non-empty string |
| **Type** | One of: Overview, Standard, Guide, Template, Reference, Intent |
| **Status** | One of: Draft, Active, Deprecated |
| **Version** | Semantic version format (x.y.z) |
| **Updated** | ISO date format (YYYY-MM-DD) |

### 2.3 Test Binding

**Attesting test**: `src/test/metadata.test.ts` (carries the `intent('INT-CSD-003', ...)` markers)

The test parses each markdown file's frontmatter, extracts field values, and validates against the rules above. Reports compliance as a percentage (target: 100%).

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Claim registered in intent.yaml; compliance status lives in the test output, not this page |
| 1.0.0 | 2026-04-17 | CSD Team | Initial specification, formalizing existing metadata test |
