---
title: "Intent Specification Template"
id: "CSD-TEMPLATES-01"
type: "Template"
status: "Active"
version: "1.1.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Templates Overview](./00-OVERVIEW.md)

---

## 1. YAML Template

Copy this template when creating a new intent specification:

```yaml
# ==============================================================================
# Intent Specification
# ==============================================================================
# Add this entry to the project's intent.yaml (the claim ID is the YAML key)
# Replace all [PLACEHOLDER] values
# ==============================================================================

INT-XXX:                               # Unique ID: INT-NNN, or INT-PREFIX-NNN in a monorepo
  version: "1.0.0"                     # Semantic version
  status: draft                        # draft | active | deprecated

  # ----------------------------------------------------------------------------
  # Specification
  # ----------------------------------------------------------------------------
  statement: "[Component] must [behavior] [condition]"

  # Writing Tips:
  # - Use "must" for requirements
  # - Start with the component name
  # - Be specific about the constraint
  # - Make it testable (how would you verify this?)

  # ----------------------------------------------------------------------------
  # Test Binding
  # ----------------------------------------------------------------------------
  test:
    scope: unit                        # unit | integration | e2e | llm
    component: ComponentName           # Exact component where test executes
    type: invariant                    # invariant | behavior | contract

  # Scope Selection Guide:
  # - unit: Test in isolation, mocked dependencies, <100ms
  # - integration: Test with real dependencies (DB, services), <5s
  # - e2e: Test full system flow, <60s
  #
  # Type Selection Guide:
  # - invariant: Must always be true (property-based testing recommended)
  # - behavior: Describes input -> output transformation
  # - contract: Defines interface guarantees between components

  # ----------------------------------------------------------------------------
  # Metadata
  # ----------------------------------------------------------------------------
  criticality: medium                  # low | medium | high | critical

  # Criticality Guide:
  # - critical: Security, data integrity, financial - requires multiple scopes
  # - high: Core functionality - requires at least unit + integration
  # - medium: Important business logic - unit tests sufficient
  # - low: Nice-to-have - unit test recommended

  # ----------------------------------------------------------------------------
  # Context (Optional)
  # ----------------------------------------------------------------------------
  rationale: |
    [Why this intent exists]

  source:
    type: requirement                  # requirement | decision | incident | regulation
    reference: "[Link or identifier]"

  domain: "[Domain area]"              # e.g., security, payments, user-management

  related:
    - INT-YYY                          # Related intent IDs
    - INT-ZZZ

  # ----------------------------------------------------------------------------
  # Ownership
  # ----------------------------------------------------------------------------
  owner: "[Owning practitioner or team]"
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
```

---

## 2. Markdown Template (Alternative)

For documentation alongside YAML:

```markdown
# INT-XXX: [Short Title]

| Attribute | Value |
|-----------|-------|
| **ID** | INT-XXX |
| **Status** | [draft/active/deprecated] |
| **Version** | 1.0.0 |
| **Criticality** | [low/medium/high/critical] |
| **Test Scope** | [unit/integration/e2e] |
| **Test Component** | [ComponentName] |
| **Test Type** | [invariant/behavior/contract] |
| **Owner** | [Name/Team] |
| **Updated** | YYYY-MM-DD |

---

## Statement

> [Component] must [behavior] [condition]

---

## Rationale

[Why this intent exists. What problem it prevents. What correctness it ensures.]

---

## Test Specification

| Aspect | Value |
|--------|-------|
| Scope | [unit/integration/e2e] |
| Component | [Where test executes] |
| Type | [invariant/behavior/contract] |
| Attesting Test | [Test file and name once implemented] |

### Test Approach

[Description of how to test this intent]

---

## Examples

### Valid Behavior

[Example of correct behavior]

### Invalid Behavior

[Example that would violate this intent]

---

## Related Intents

- [INT-YYY](./INT-YYY.md) - [Brief description]
- [INT-ZZZ](./INT-ZZZ.md) - [Brief description]

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial specification |
```

---

## 3. Minimal Template

For quick intent capture:

```yaml
INT-XXX:
  version: "0.1.0"
  status: draft
  statement: "[Component] must [behavior] [condition]"
  test:
    scope: unit
    component: ComponentName
    type: invariant
  criticality: medium
```

---

## 4. Field Reference

### Required Fields

| Field | Description | Valid Values |
|-------|-------------|--------------|
| ID (the YAML key) | Unique identifier | `INT-NNN`, or `INT-PREFIX-NNN` in a monorepo |
| `version` | Semantic version | `X.Y.Z` |
| `statement` | The intent statement | Free text, at least 10 characters |
| `test.scope` | Where test runs (`llm`: judged by a reviewer, nothing executes) | unit, integration, e2e, llm |
| `test.component` | Component under test | Component name |
| `test.type` | Type of test | invariant, behavior, contract |
| `criticality` | Business importance | low, medium, high, critical |
| `status` | Lifecycle status | draft, active, deprecated |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `rationale` | Why intent exists | "Prevents session hijacking" |
| `source.type` | Origin type | requirement, incident |
| `source.reference` | Link to origin | "JIRA-1234" |
| `domain` | Business domain | "security" |
| `related` | Related intents | [INT-001, INT-002] |
| `owner` | Responsible party | "Security Team" |
| `created` | Creation date | 2024-01-15 |
| `updated` | Last update | 2024-02-20 |

---

## 5. Examples by Domain

### Security Intent

```yaml
INT-SEC-001:
  version: "1.0.0"
  status: active
  statement: "User passwords must be stored using an adaptive hashing algorithm with a configurable work factor"
  test:
    scope: unit
    component: PasswordService
    type: invariant
  criticality: critical
  rationale: "Prevents password compromise if database is breached"
  source:
    type: regulation
    reference: "OWASP Password Storage Cheat Sheet"
  domain: security
```

### Data Integrity Intent

```yaml
INT-DATA-001:
  version: "1.0.0"
  status: active
  statement: "Order total must equal sum of line item amounts plus tax"
  test:
    scope: unit
    component: OrderCalculator
    type: invariant
  criticality: high
  rationale: "Financial accuracy is mandatory"
  domain: orders
```

### API Contract Intent

```yaml
INT-API-001:
  version: "1.0.0"
  status: active
  statement: "ProductCatalog API must return consistent pagination across requests"
  test:
    scope: integration
    component: ProductCatalogAPI
    type: contract
  criticality: medium
  rationale: "Client applications depend on stable pagination"
  domain: catalog
```

### Performance Intent

```yaml
INT-PERF-001:
  version: "1.0.0"
  status: active
  statement: "Search queries must return within 500ms at 95th percentile"
  test:
    scope: integration
    component: SearchService
    type: behavior
  criticality: high
  rationale: "User experience degrades significantly above 500ms"
  domain: search
```

---

## 6. Validation Checklist

Before submitting a new intent:

- [ ] ID follows the INT-NNN format (or INT-PREFIX-NNN in a monorepo)
- [ ] Statement is specific and testable
- [ ] Component exists or is planned
- [ ] Scope is minimal (unit preferred)
- [ ] Type matches the nature of the constraint
- [ ] Criticality reflects business impact
- [ ] Status is "draft" until approved

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-07-04 | CSD Team | Security example statement technology-agnostic, per the writing guide |
| 1.0.0 | 2026-07-04 | CSD Team | Templates in canonical intent.yaml form (ID as key); promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial intent spec template |
