---
title: "Intents Index"
id: "CSD-INTENT-INDEX"
type: "Overview"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Intent Overview](../00-OVERVIEW.md)
- **Children**:
  - [INT-001: Session Isolation](./INT-001.md)
  - [INT-002: Password Storage](./INT-002.md)
  - [INT-003: API Correlation](./INT-003.md)
  - [INT-CSD-001: Terminology Consistency](./INT-CSD-001.md)
  - [INT-CSD-002: Internal Link Integrity](./INT-CSD-002.md)
  - [INT-CSD-003: Metadata Compliance](./INT-CSD-003.md)
  - [INT-CSD-004: Lifecycle Completeness](./INT-CSD-004.md)
  - [INT-CSD-005: Markdown Lint Compliance](./INT-CSD-005.md)

---

## 1. Introduction

This section contains intent specifications: both example intents demonstrating best practices and CSD meta-intents that govern the methodology's own documentation.

---

## 2. Example Intent Index

| ID | Statement | Scope | Type | Criticality |
|----|-----------|-------|------|-------------|
| [INT-001](./INT-001.md) | Session data must never cross user boundaries | unit | invariant | critical |
| [INT-002](./INT-002.md) | Passwords must be hashed using bcrypt with cost >= 12 | unit | invariant | critical |
| [INT-003](./INT-003.md) | API responses must include correlation ID header | unit | contract | medium |

---

## 2.1 CSD Meta-Intent Index

These intents govern CSD's own documentation -- the dog-food loop.

| ID | Statement | Scope | Type | Criticality |
|----|-----------|-------|------|-------------|
| [INT-CSD-001](./INT-CSD-001.md) | Terminology must use canonical cognitive mode names | unit | invariant | critical |
| [INT-CSD-002](./INT-CSD-002.md) | Every internal markdown link must resolve | unit | invariant | critical |
| [INT-CSD-003](./INT-CSD-003.md) | Every document must have compliant metadata | unit | invariant | critical |
| [INT-CSD-004](./INT-CSD-004.md) | All five lifecycle phases must be documented | unit | contract | high |
| [INT-CSD-005](./INT-CSD-005.md) | All markdown must pass lint validation | unit | invariant | medium |

---

## 3. Intent by Domain

### 3.1 Security

| ID | Statement |
|----|-----------|
| INT-001 | Session data must never cross user boundaries |
| INT-002 | Passwords must be hashed using bcrypt with cost >= 12 |

### 3.2 Observability

| ID | Statement |
|----|-----------|
| INT-003 | API responses must include correlation ID header |

### 3.3 Methodology (CSD Meta-Intents)

| ID | Statement |
|----|-----------|
| INT-CSD-001 | Terminology must use canonical cognitive mode names |
| INT-CSD-002 | Every internal markdown link must resolve |
| INT-CSD-003 | Every document must have compliant metadata |
| INT-CSD-004 | All five lifecycle phases must be documented |
| INT-CSD-005 | All markdown must pass lint validation |

---

## 4. Intent by Scope

### 4.1 Unit Scope

| ID | Statement |
|----|-----------|
| INT-001 | Session data must never cross user boundaries |
| INT-002 | Passwords must be hashed using bcrypt with cost >= 12 |
| INT-003 | API responses must include correlation ID header |
| INT-CSD-001 | Terminology must use canonical cognitive mode names |
| INT-CSD-002 | Every internal markdown link must resolve |
| INT-CSD-003 | Every document must have compliant metadata |
| INT-CSD-004 | All five lifecycle phases must be documented |
| INT-CSD-005 | All markdown must pass lint validation |

### 4.2 Integration Scope

No examples yet.

### 4.3 E2E Scope

No examples yet.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Reviewed against practice; promoted with the canon |
| 0.2.0 | 2026-04-17 | CSD Team | Added CSD meta-intents (INT-CSD-001 through INT-CSD-005) |
| 0.1.0 | 2026-02-04 | CSD Team | Initial examples index |
