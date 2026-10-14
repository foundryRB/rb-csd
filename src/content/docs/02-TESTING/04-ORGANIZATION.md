---
title: "Test Organization"
id: "CSD-TEST-04"
type: "Standard"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Testing Overview](./00-OVERVIEW.md)

---

## 1. Overview

This standard defines how a project organizes its tests so that intent enforcement stays legible: intent tests are distinguishable from implementation tests, every claim's tests are findable, and scopes can run independently.

---

## 2. Separation of Concerns

Intent tests and implementation tests obey different change disciplines, so they MUST be distinguishable:

| Aspect | Intent Tests | Implementation Tests |
|--------|--------------|----------------------|
| **Identified by** | The `intent` marker | No marker |
| **Changes when** | Intent changes | Implementation changes |
| **Can delete?** | Only when the claim is deprecated | Yes, freely |
| **Gates merges?** | Yes, always | Optional |

The marker is the separation mechanism: a test carrying an `intent` marker is an intent test, whatever file it lives in. Projects MAY additionally group intent tests in dedicated directories or files per scope; that is a discoverability aid, not the source of truth.

---

## 3. Discoverability

| Rule | Requirement |
|------|-------------|
| Claim to tests | A claim ID leads to its attesting tests by searching for the marker |
| Test to claim | An intent test names its claim(s) in the marker, never only in prose |
| Naming | Test names restate the claim's statement, so failures read as violated intent |

---

## 4. Execution

| Rule | Requirement |
|------|-------------|
| Scope isolation | Each scope (unit, integration, e2e) is runnable on its own, so fast feedback is never blocked by slow suites |
| Gating | Intent tests run on every change and block merges on failure |
| Budgets | Suites stay within the per-scope time budgets defined in [Test Scopes](./01-TEST-SCOPES.md) |

---

## 5. Coverage Reporting

The audit (see [Intent Test Implementation](./03-IMPLEMENTATION.md)) is the coverage mechanism: it reports, per claim, which tests attest it and fails when an active claim has none. A claim-by-scope matrix generated from the audit is the reviewable artifact:

```text
Intent Coverage
| Intent  | Statement            | Unit | Int. | E2E |
|---------|----------------------|------|------|-----|
| INT-001 | Session isolation    | yes  | -    | -   |
| INT-003 | Correlation ID       | yes  | yes  | -   |

2/2 active claims attested (100%)
```

Coverage counts are generated from the audit, never hand-maintained.

---

## 6. Best Practices

### 6.1 Do

- [OK] Keep intent tests focused on the intent statement
- [OK] Use property-based testing for invariants
- [OK] Run unit intent tests on every commit
- [OK] Generate coverage from the audit
- [OK] Review intent tests when intent changes

### 6.2 Don't

- [NO] Test implementation details in intent tests
- [NO] Skip intent tests in CI/CD
- [NO] Delete intent tests without deprecating the claim
- [NO] Keep a claim active without an attesting test

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Rebuilt as organizational rules (marker-based separation, discoverability, execution, audit-generated coverage); build-tool configuration removed; promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial organization standard |
