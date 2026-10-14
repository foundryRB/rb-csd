---
title: "Doc Naming Conventions"
id: "CSD-CONTRIB-03"
type: "Standard"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Contributing to CSD Docs](./00-OVERVIEW.md)

---

## 1. Overview

Consistent naming enables:

- Automated discovery and processing
- Predictable navigation
- Clear organizational structure

---

## 2. File Naming

### 2.1 Documentation Files

| Pattern | Usage | Example |
|---------|-------|---------|
| `00-OVERVIEW.md` | Folder entry point | `src/content/docs/01-INTENT/00-OVERVIEW.md` |
| `NN-NAME.md` | Numbered documents | `01-DOCUMENTATION-STANDARD.md` |
| `INT-NNN.md` / `INT-PREFIX-NNN.md` | Intent specification pages | `INT-001.md`, `INT-CSD-002.md` |

### 2.2 Numbering Rules

- Use two-digit numbers for ordered documents: `01-`, `02-`, `99-`
- Use three-digit numbers for intents: `INT-001`, `INT-042`
- Leave gaps for future insertions: `01`, `05`, `10` instead of `01`, `02`, `03`

---

## 3. Folder Naming

### 3.1 Documentation Folders

| Rule | Example |
|------|---------|
| Use UPPERCASE | `07-CONTRIBUTING/`, `01-INTENT/` |
| Prefix with number for ordering | `01-`, `02-`, `03-` |
| Use hyphen for multi-word | `06-ADOPTION/` |

### 3.2 Standard Folder Structure

```text
src/content/docs/
|- 00-OVERVIEW.md
|- 07-CONTRIBUTING/
|  |- 00-OVERVIEW.md
|  |- 01-DOCUMENTATION-STANDARD.md
|  `- ...
|- 01-INTENT/
|  |- 00-OVERVIEW.md
|  |- 01-SPECIFICATION.md
|  `- intents/
|     |- INT-001.md
|     `- INT-002.md
`- ...
```

---

## 4. Intent Naming

### 4.1 Intent IDs

| Rule | Example |
|------|---------|
| Prefix: `INT-` | `INT-001` |
| Three-digit zero-padded | `INT-001`, not `INT-1` |
| Monorepo form: uppercase module prefix | `INT-CSD-001`, `INT-STARLIGHT-007` |
| Sequential, never reused | After `INT-042`, next is `INT-043` |
| Deprecated IDs stay reserved | `INT-005` deprecated -> never reuse `INT-005` |

### 4.2 Intent Statements

Intent statements SHOULD:

- Start with the subject
- Use "must", "must not", "may"
- Be concise (one sentence)

Good:

- "Session data must never cross user boundaries"
- "API responses must include correlation IDs"
- "Password hashes must use an adaptive algorithm with a configurable work factor"

Bad:

- "We should try to keep sessions separate" (vague)
- "It would be nice if..." (not a requirement)
- "Security stuff for users" (not a statement)

---

## 5. Test Naming

### 5.1 Intent Test Names

An intent test is identified by its marker, not by an ID scheme of its own. Its name restates the claim's statement, so a failure reads as violated intent:

```text
Pattern: {subject} {condition} {expected result}

- "session data accessed by a different user is rejected"
- "API responses always include the correlation ID"
- "password hashes use an adaptive algorithm with the minimum work factor"
```

### 5.2 Markers

```text
intent('INT-001', '<test name>', fn)    # JS/TS runtimes
@intent("INT-001")                      # Python runtime
```

The claim ID in the marker matches the `intent.yaml` key exactly.

---

## 6. Summary Table

| Artifact | Convention | Example |
|----------|------------|---------|
| Doc folders | `NN-UPPERCASE-NAME/` | `01-INTENT/` |
| Doc files | `NN-NAME.md` | `01-SPECIFICATION.md` |
| Overview files | `00-OVERVIEW.md` | `00-OVERVIEW.md` |
| Intent IDs | `INT-NNN` (or `INT-PREFIX-NNN`) | `INT-001`, `INT-CSD-002` |
| Intent files | `INT-NNN.md` | `INT-001.md` |
| Intent tests | Marker + statement-derived name | `intent('INT-001', '...')` |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Statement examples technology-agnostic, per the writing guide |
| 1.0.0 | 2026-07-04 | CSD Team | Test naming stated via markers; ID rules cover the monorepo form; promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial naming conventions |
