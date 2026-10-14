---
title: "INT-CSD-001: Terminology Consistency"
id: "INT-CSD-001"
type: "Intent"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
owner: "CSD Methodology"
---
## Intent Specification

The executable claim lives in this repo's `intent.yaml`; this page carries its rationale and provenance.

```yaml
INT-CSD-001:
  version: 1.0.0
  status: active
  statement: "CSD documentation must use canonical cognitive mode terminology; deprecated role names must never appear in prose"
  test:
    scope: unit
    component: CSD Documentation
    type: invariant
  criticality: critical
```

---

## 1. Rationale

CSD underwent a terminology shift from role-based language (`Intent Owner`, `Synthesis Operator`, `Quality Guardian`) to cognitive mode language (Intent Mode, Synthesis Mode, Enforcement Mode). This reflects the methodology's core insight: these are modes of thinking any practitioner can adopt, not job titles.

If deprecated terminology persists:

- New readers learn the wrong mental model
- The methodology contradicts itself (preaches precision but practices sloppiness)
- AI tools consuming CSD docs as context will propagate incorrect terminology

This invariant must hold regardless of:

- Which document is being edited
- Whether the edit is content or metadata
- Whether the author is human or AI

---

## 2. Test Specification

### 2.1 Scope: Unit

**Component**: All CSD markdown files (excluding templates)

**Test Type**: Invariant (must ALWAYS be true)

### 2.2 Canonical Terms and Banned Variants

| Canonical Term | Banned Variants |
|----------------|-----------------|
| Intent Mode | `Intent Owner` |
| Synthesis Mode | `Synthesis Operator` |
| Enforcement Mode | `Quality Guardian` |
| Cognitive Modes | `CSD roles`, `Role Definition`, `Role clarity` |
| Cognitive Software Delivery | `Cognitive software delivery` (wrong case) |

### 2.3 Test Binding

**Attesting test**: `src/test/terminology.test.ts` (carries the `intent('INT-CSD-001', ...)` marker)

The test extracts prose text from each markdown file (excluding code blocks, frontmatter, inline code, URLs, and HTML comments), then asserts that no banned variant appears.

### 2.4 Emergent Intent Origin

This intent was crystallized from a real failure: during the CSD infrastructure bootstrap, 108 terminology violations were discovered across 20+ files. The methodology was using deprecated role names throughout while claiming to have moved to mode-based language. The test now prevents regression permanently.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Claim registered in intent.yaml and attested via the intent marker |
| 1.0.0 | 2026-04-17 | CSD Team | Initial specification, crystallized from terminology audit |
