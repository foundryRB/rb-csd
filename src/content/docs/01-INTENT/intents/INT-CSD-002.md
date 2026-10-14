---
title: "INT-CSD-002: Internal Link Integrity"
id: "INT-CSD-002"
type: "Intent"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
owner: "CSD Methodology"
---
## Intent Specification

The executable claim lives in this repo's `intent.yaml`; this page carries its rationale and provenance.

```yaml
INT-CSD-002:
  version: 1.0.0
  status: active
  statement: "Every internal markdown link in CSD documentation must resolve to an existing file"
  test:
    scope: unit
    component: CSD Documentation
    type: invariant
  criticality: critical
```

---

## 1. Rationale

CSD documentation forms a heavily cross-referenced knowledge graph. Internal links are the navigation mechanism that connects concepts across sections. A broken link means:

- A reader hits a dead end while learning the methodology
- AI tools consuming CSD docs get incomplete context
- The documentation's credibility as "machine-parsable" collapses

This invariant must hold regardless of:

- File renames or moves
- New documents being added
- Documents being deprecated or deleted

---

## 2. Test Specification

### 2.1 Scope: Unit

**Component**: All CSD markdown files

**Test Type**: Invariant (must ALWAYS be true)

### 2.2 What Counts as an Internal Link

- Relative markdown links: `[text](./path/to/file.md)`
- Parent-relative links: `[text](../path/to/file.md)`
- Anchor links within the same file are excluded (not filesystem-verifiable)
- External URLs (http/https) are excluded

### 2.3 Test Binding

**Attesting test**: `src/test/links.test.ts` (carries the `intent('INT-CSD-002', ...)` marker)

The test extracts all markdown links from each file using regex, filters to relative paths, resolves them against the file's directory, and asserts that the target file exists on disk.

### 2.4 Emergent Intent Origin

Crystallized during the CSD infrastructure bootstrap when two broken links were discovered: a template file had been renamed but references were not updated. The test now prevents this class of failure permanently.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Claim registered in intent.yaml; test binding names the links suite |
| 1.0.0 | 2026-04-17 | CSD Team | Initial specification, crystallized from link audit |
