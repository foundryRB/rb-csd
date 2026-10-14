---
title: "Contributing to CSD Docs"
id: "CSD-CONTRIB-OVERVIEW"
type: "Overview"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [CSD Overview](../00-OVERVIEW.md)
- **Children**:
  - [Documentation Authoring Standard](./01-DOCUMENTATION-STANDARD.md)
  - [Doc Metadata Standard](./02-METADATA-STANDARD.md)
  - [Doc Naming Conventions](./03-NAMING-CONVENTIONS.md)
  - [Document Template](./04-DOCUMENT-TEMPLATE.md)

---

## 1. Introduction

This section defines the rules for authoring and maintaining the CSD documentation site itself. These are **contributor rules**, not CSD delivery standards.

> CSD delivery standards (what the methodology prescribes for software delivery) live in the [Intent](../01-INTENT/00-OVERVIEW.md), [Testing](../02-TESTING/00-OVERVIEW.md), [Teams](../03-TEAMS/00-OVERVIEW.md), and [Lifecycle](../04-LIFECYCLE/00-OVERVIEW.md) sections. This section is about how we write the docs, not about how CSD governs delivery.

Adherence to these contributor rules ensures:

- **Consistency** across all documentation
- **Machine-parsability** for automated tooling
- **Maintainability** over time and across contributors

---

## 2. Topics Index

| Topic | Purpose |
|-------|---------|
| [Documentation Authoring Standard](./01-DOCUMENTATION-STANDARD.md) | Document structure, templates, and formatting |
| [Doc Metadata Standard](./02-METADATA-STANDARD.md) | Required frontmatter fields and validation rules |
| [Doc Naming Conventions](./03-NAMING-CONVENTIONS.md) | File, folder, and identifier naming rules for the site |
| [Document Template](./04-DOCUMENT-TEMPLATE.md) | Starter template for new doc pages |

---

## 3. Compliance

All contributions to the docs site MUST comply with these rules. Non-compliant contributions will be rejected during review.

**Enforcement**:

- Markdown linting in CI/CD
- Automated metadata and link validation (see `src/test/`)
- Peer review checklist

---

## 4. Why Contributor Rules Matter in CSD

In traditional docs, contributor rules are often "nice to have" - humans can interpret poorly-structured documents.

For a CSD docs site, they are **critical infrastructure**:

- AI tools consume documentation as context
- Intent specs and examples must be machine-parsable
- Automated validation requires consistent structure

> If machines can't parse it, they can't enforce it.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Topics index defers status to each page's frontmatter |
| 1.0.0 | 2026-07-04 | CSD Team | Reviewed against practice; promoted to Active |
| 0.2.0 | 2026-04-21 | CSD Team | Renamed to Contributing; scope clarified as doc-site rules, not delivery standards |
| 0.1.0 | 2026-02-04 | CSD Team | Initial standards overview |
