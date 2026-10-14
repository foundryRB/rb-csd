---
title: "INT-CSD-004: Lifecycle Completeness"
id: "INT-CSD-004"
type: "Intent"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
owner: "CSD Methodology"
---
## Intent Specification

The executable claim lives in this repo's `intent.yaml`; this page carries its rationale and provenance.

```yaml
INT-CSD-004:
  version: 1.0.0
  status: active
  statement: "The CSD lifecycle section must document all five phases (Intent, Synthesize, Enforce, Learn, Deploy) with dedicated child documents"
  test:
    scope: unit
    component: CSD Documentation
    type: contract
  criticality: high
```

---

## 1. Rationale

CSD defines a five-phase lifecycle: Intent, Synthesize, Enforce, Learn, Deploy. If any phase is undocumented:

- The methodology has a gap that practitioners cannot learn from
- The lifecycle diagram promises coverage that does not exist
- AI tools using CSD as context will lack understanding of missing phases

This contract ensures the lifecycle section's overview references all five phases and that child documents exist for each.

This invariant must hold regardless of:

- Whether phases are in Draft or Active status
- The depth of each phase's documentation
- Whether additional phases are proposed

---

## 2. Test Specification

### 2.1 Scope: Unit

**Component**: `src/content/docs/04-LIFECYCLE/` directory

**Test Type**: Contract (structural obligation)

### 2.2 Required Phases

The lifecycle overview's navigation children must include documents covering:

| Phase | Expected Document Pattern |
|-------|--------------------------|
| Intent | Intent-first development workflow |
| Synthesize | Synthesis workflow |
| Enforce | Continuous enforcement |
| Learn | Learning loop |
| Deploy | Deployment (may be covered in enforcement or as dedicated doc) |

### 2.3 Test Binding

**Attesting test**: `src/test/lifecycle.test.ts` (carries the `intent('INT-CSD-004', ...)` markers)

The test reads the lifecycle overview, verifies all five phases are represented, and confirms the phase child documents exist on disk.

### 2.4 Emergent Intent Origin

Crystallized when the Learn phase was found to be completely undocumented during the CSD contradiction audit. The 04-LEARNING-LOOP.md document was created to fill this gap, and this intent now prevents future phases from going undocumented.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Claim registered in intent.yaml and attested via the intent markers |
| 1.0.0 | 2026-04-17 | CSD Team | Initial specification, crystallized from Learn phase gap |
