---
title: "Intent Test Template"
id: "CSD-TEMPLATES-02"
type: "Template"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Templates Overview](./00-OVERVIEW.md)

---

## 1. Overview

An intent test is an ordinary test carrying the claim's `intent` marker (see the [marker contract](../02-TESTING/03-IMPLEMENTATION.md)). These templates give the starting shape per runtime; the test body is normal test code for the framework at hand.

Whatever the runtime, the template rules are the same:

1. The marker names the claim ID(s), exactly as they appear in `intent.yaml`.
2. The test name restates the claim's statement, so a failure reads as violated intent.
3. The body proves the statement at the claim's declared scope: positive case, negative case, and property-based or exhaustive checking for invariants.

---

## 2. Python (pytest)

```python
from pytest_intent import intent


@intent("INT-XXX")
def test_statement_restated_as_a_test_name():
    # Arrange
    ...
    # Act
    ...
    # Assert the claim's statement
    ...


@intent("INT-YYY", "INT-ZZZ")  # one test attesting two claims
def test_composite_flow_covering_both_claims():
    ...
```

---

## 3. JS/TS (vitest)

```typescript
import { expect } from 'vitest';
import { intent } from 'vitest-intent';

intent('INT-XXX', '[statement restated as the test name]', () => {
    // Arrange, Act
    // Assert the claim's statement
    expect(actual).toBe(expected);
});

// Multi-claim per test:
intent(['INT-YYY', 'INT-ZZZ'], 'composite flow covering both claims', () => {
    /* step that satisfies INT-YYY */
    /* step that satisfies INT-ZZZ */
});
```

---

## 4. Browser E2E (Playwright)

```typescript
import { expect } from '@playwright/test';
import { intent } from 'playwright-intent';

intent('INT-XXX', '[operator action] [observable outcome]', async ({ page }) => {
    // Arrange: navigate and reach the precondition
    await page.goto('/');

    // Act: perform the operator action the claim describes
    await page.getByRole('button', { name: 'Primary action' }).click();

    // Assert: observable outcome in the rendered UI
    await expect(page.getByText(/expected confirmation/)).toBeVisible();
});
```

The e2e suite starts the system under test itself (via the test runner's web-server hook), so the suite runs cold: no manually pre-started services.

---

## 5. Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Marker ID | Exact claim ID from `intent.yaml` | `INT-001`, `INT-SB-007` |
| Test name | The claim's statement, restated | "session data never crosses user boundaries" |
| Invariants | Property-based or exhaustive body | Generated inputs, enumerated states |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Rebuilt around the runtime marker bindings (pytest, vitest, Playwright); framework-specific scaffolding catalogs removed; promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial intent test template |
