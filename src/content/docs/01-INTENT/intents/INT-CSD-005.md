---
title: "INT-CSD-005: Markdown Lint Compliance"
id: "INT-CSD-005"
type: "Intent"
status: "Active"
version: "1.1.1"
updated: "2026-07-04"
owner: "CSD Methodology"
---
## Intent Specification

The executable claim lives in this repo's `intent.yaml`; this page carries its rationale and provenance.

```yaml
INT-CSD-005:
  version: 1.0.0
  status: active
  statement: "All CSD markdown files must pass markdownlint validation with zero errors"
  test:
    scope: unit
    component: CSD Documentation
    type: invariant
  criticality: medium
```

---

## 1. Rationale

CSD advocates for machine-parsable documentation. Markdown lint rules enforce structural consistency that enables:

- Reliable parsing by documentation generators
- Consistent rendering across platforms
- Predictable structure for AI context consumption
- Professional presentation

If lint errors accumulate:

- Rendering bugs appear unpredictably
- Automated processing fails silently
- The methodology's credibility as "quality-first" erodes

---

## 2. Test Specification

### 2.1 Scope: Unit

**Component**: All CSD markdown files under `src/content/docs/`

**Test Type**: Invariant (must ALWAYS be true)

### 2.2 Lint Configuration

Configured via `.markdownlint-cli2.yaml`:

| Rule | Status | Rationale |
|------|--------|-----------|
| MD013 | Disabled | Line length is impractical for documentation prose |
| MD033 | Disabled | Inline HTML needed for special formatting |
| MD041 | Disabled | Starlight content uses frontmatter before body headings |
| MD060 | Disabled | Table pipe spacing is cosmetic, not a quality signal |
| MD024 | siblings_only | Allow same heading text in different sections |
| All others | Enabled | Default markdownlint rules |

### 2.3 Key Rules Enforced

| Rule | What It Catches |
|------|----------------|
| MD031 | Code fences without surrounding blank lines |
| MD032 | Lists without surrounding blank lines |
| MD036 | Bold text used as a heading (use proper headings) |
| MD040 | Code fences without a language specifier |
| MD022 | Headings without surrounding blank lines |

### 2.4 Test Binding

**Attesting test**: `src/test/markdownlint.test.ts` (carries the `intent('INT-CSD-005', ...)` marker) runs the markdownlint-cli2 engine with the repo configuration inside the vitest gate.

The standalone `npm run lint:md` script runs the same engine and configuration; `npm run validate` runs both lint and vitest.

### 2.5 Emergent Intent Origin

Crystallized after a lint audit found 1,546 errors across 39 files. After disabling the cosmetic MD060 rule (1,302 errors for table pipe spacing), 244 real structural errors remained. All were fixed systematically, establishing the zero-error baseline this intent now protects.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.1 | 2026-07-04 | CSD Team | MD033 rationale states the current need (special formatting) |
| 1.1.0 | 2026-07-04 | CSD Team | Claim registered in intent.yaml and attested by a dedicated lint intent test |
| 1.0.0 | 2026-04-17 | CSD Team | Initial specification, crystallized from lint audit |
