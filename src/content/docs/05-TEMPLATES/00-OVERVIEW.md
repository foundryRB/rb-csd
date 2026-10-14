---
title: "Templates Overview"
id: "CSD-TEMPLATES-OVERVIEW"
type: "Overview"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [CSD Overview](../00-OVERVIEW.md)
- **Children**:
  - [Intent Specification Template](./01-INTENT-SPEC-TEMPLATE.md)
  - [Intent Test Template](./02-INTENT-TEST-TEMPLATE.md)

---

## 1. Introduction

This section provides templates for CSD methodology artifacts (intent specs and intent tests). For the template used to author pages on this docs site, see [Document Template](../07-CONTRIBUTING/04-DOCUMENT-TEMPLATE.md).

Using consistent templates:

- Ensures all required information is captured
- Makes artifacts scannable and familiar
- Reduces cognitive load when reading
- Enables tooling and automation

---

## 2. Available Templates

| Template | Purpose | When to Use |
|----------|---------|-------------|
| Intent Specification | Define a new intent | Creating new correctness criteria |
| Intent Test | Test an intent | Implementing intent validation |

---

## 3. Template Guidelines

### 3.1 How to Use

1. Copy the template
2. Fill in all required fields
3. Remove placeholder text
4. Add to appropriate location
5. Submit for review

### 3.2 Customization

Templates may be customized for your context:

- Add optional fields as needed
- Adjust language/framework-specific sections
- Keep required sections intact
- Document customizations in team guidelines

---

## 4. Quick Reference

### Intent Specification

```yaml
INT-XXX:
  version: "1.0.0"
  status: active
  statement: "[Component] must [behavior] [condition]"
  test:
    scope: unit | integration | e2e | llm
    component: ComponentName
    type: invariant | behavior | contract
  criticality: low | medium | high | critical
```

### Intent Test

```typescript
intent('INT-XXX', '[statement restated as the test name]', () => {
    /* arrange, act, assert */
});
```

### Document Header

```markdown
---
title: Title
id: CSD-CATEGORY-NN
type: Overview/Standard/Guide/Reference
status: Draft/Active/Deprecated
version: X.Y.Z
updated: YYYY-MM-DD
---
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Quick reference in canonical claim and marker form; promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial templates overview |
