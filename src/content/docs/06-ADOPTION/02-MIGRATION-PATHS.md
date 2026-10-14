---
title: "Migration Paths"
id: "CSD-ADOPTION-02"
type: "Guide"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Adoption Overview](./00-OVERVIEW.md)

---

## 1. Overview

This guide provides detailed migration paths for teams adopting CSD from various starting points.

---

## 2. Migration from Agile/Scrum

### 2.1 Mapping Concepts

| Agile Concept | CSD Equivalent | Notes |
|---------------|----------------|-------|
| User Story | Feature context | Stories inform intent |
| Acceptance Criteria | Intent specification | More rigorous, testable |
| Definition of Done | Intent tests pass | Objective, automated |
| Sprint Review | Still relevant | Plus intent coverage review |
| Retrospective | Still relevant | Plus CSD process feedback |

### 2.2 Migration Steps

#### Phase 1: Parallel Practice (2-4 weeks)

```text
Sprint Planning:
  1. Write user stories as before
  2. For each story, identify correctness criteria
  3. Write intent specifications for critical criteria
  
Sprint Execution:
  1. Implement as before
  2. For intent-covered areas, write intent tests
  3. Ensure intent tests pass before "done"
  
Sprint Review:
  1. Demo as before
  2. Show intent coverage
```

#### Phase 2: Integration (4-8 weeks)

```text
Sprint Planning:
  1. Stories include intent specification as subtask
  2. Intent Mode practitioner reviews stories for intent needs
  
Sprint Execution:
  1. Intent-first for new development
  2. Backlog grooming includes intent identification
  
Sprint Review:
  1. Intent coverage is part of "done"
```

#### Phase 3: Mature Practice (ongoing)

```text
Sprint Planning:
  1. Intent specification precedes story estimation
  2. Synthesis complexity informed by intent
  
Sprint Execution:
  1. Full CSD workflow
  2. AI-assisted synthesis common
  
Sprint Review:
  1. Intent coverage metrics tracked
  2. Quality trends analyzed
```

### 2.3 Worked Example: User Story to Intent

This example shows how a typical Scrum team transforms a user story into an intent specification during Phase 1.

#### Before CSD (Agile Only)

The team writes a user story:

```text
As a customer, I want to apply a discount code at checkout
so that I get a reduced price.

Acceptance Criteria:
- Valid codes reduce the total
- Invalid codes show an error
- Expired codes show an error
```

A developer picks up the story, implements it, writes some tests, and marks it done. Three weeks later, a production bug reveals that stacking two discount codes can reduce the price below zero. Nobody specified that this should be prevented - the acceptance criteria said "valid codes reduce the total," which is technically what happened.

#### After CSD (Intent-First)

During sprint planning, the team activates Intent Mode and writes:

```yaml
INT-CHECKOUT-042:
  version: "1.0.0"
  status: active
  statement: "Discount application must never reduce order total below zero"
  test:
    scope: unit
    component: DiscountService
    type: invariant
  criticality: critical
  domain: financial-integrity
```

The intent spec forces the team to ask: "What must always be true about discounts?" - not just "what should the feature do?" This surfaces the edge case before any code is written.

The intent test, property-based because the claim is an invariant:

```python
@intent("INT-CHECKOUT-042")
@given(
    price=st.decimals(min_value="0.01", max_value="100000"),
    discount_percent=st.integers(min_value=1, max_value=100),
)
def test_discount_never_produces_negative_total(price, discount_percent):
    result = discount_service.apply(price, discount_percent)
    assert result >= 0
```

The critical difference: the acceptance criteria described a feature; the intent specification described an invariant. Features can be "done." Invariants must hold forever.

### 2.4 Team Structure Changes

| Agile Role | CSD Evolution |
|------------|---------------|
| Product Owner | + Intent Mode practitioner for product correctness |
| Scrum Master | + Process support for CSD adoption |
| Developer | Primarily Synthesis Mode, rotating into Intent Mode |
| QA | Primarily Enforcement Mode, contributing to Intent Mode |

The key shift: in Agile, roles are permanent identities. In CSD, cognitive modes are activities that rotate. A developer who writes intent for a colleague's area gains deeper understanding of the domain. A QA engineer who contributes to synthesis becomes a better enforcer.

---

## 3. Migration from Waterfall

### 3.1 Mapping Concepts

| Waterfall Phase | CSD Equivalent | Notes |
|-----------------|----------------|-------|
| Requirements | Intent specifications | More granular, testable |
| Design | Synthesis planning | Lighter, AI-assisted |
| Implementation | Synthesis | AI-assisted |
| Testing | Continuous enforcement | Throughout, not phase |
| Deployment | Deployment phase | Same, with gates |

### 3.2 Migration Steps

#### Phase 1: Documentation Shift (4-6 weeks)

```text
Requirements Phase:
  1. Continue requirements as before
  2. Derive intent specifications from requirements
  3. Intent specifications are reviewed artifacts
  
Design Phase:
  1. Lighter design documentation
  2. Focus on architecture decisions
  3. Implementation details left to synthesis
```

#### Phase 2: Development Shift (6-12 weeks)

```text
Implementation Phase:
  1. Intent-first development
  2. Continuous testing (not separate phase)
  3. AI-assisted synthesis where appropriate
  
Testing Phase:
  1. Becomes "verification" not "find bugs"
  2. Focus on intent coverage
  3. Exploratory testing for edge cases
```

#### Phase 3: Process Shift (ongoing)

```text
Continuous Delivery:
  1. Smaller increments
  2. Frequent deployment
  3. Continuous enforcement
  
Feedback:
  1. Fast feedback loops
  2. Intent gap identification
  3. Iterative improvement
```

### 3.3 Cultural Changes

The hardest part of waterfall-to-CSD migration is not the process change - it is the cultural shift from sequential thinking to continuous verification.

| Waterfall Culture | CSD Culture | Why It Matters |
|-------------------|-------------|----------------|
| Big upfront design | Emergent design constrained by intent | Design decisions are made continuously, not once |
| Testing finds bugs | Testing prevents bugs | Tests exist before code, not after |
| Phases are sequential | Activities are continuous | Intent, synthesis, enforcement happen in every sprint |
| Change is expensive | Change is managed by intent | Intent tests tell you instantly if a change breaks guarantees |
| Documentation is heavy | Intent specs are sufficient | 20-40 lines per intent, not 200-page requirements docs |

The team that has spent years in waterfall may resist the ambiguity of "we don't fully design upfront." The CSD response: you DO fully specify correctness upfront (intent specs). You just don't fully specify implementation upfront. This is a critical distinction - waterfall conflates the two.

---

## 4. Migration from No Process

### 4.1 Starting Point

```text
Current state:
  - Ad-hoc development
  - Little/no documentation
  - Minimal/no testing
  - Tribal knowledge
```

### 4.2 Migration Steps

#### Phase 1: Foundation (2-4 weeks)

```text
Week 1-2:
  1. Set up CI/CD (if not exists)
  2. Set up test framework
  3. Identify most critical functionality

Week 3-4:
  1. Write first intent for critical functionality
  2. Write first intent test
  3. Add to CI
```

#### Phase 2: Build Habit (4-8 weeks)

```text
Each feature:
  1. Write intent before coding
  2. Write intent test
  3. Implement
  4. Verify test passes

Team practice:
  1. Weekly intent review
  2. Share learnings
  3. Refine process
```

#### Phase 3: Expand Coverage (ongoing)

```text
Systematic coverage:
  1. Prioritize critical areas
  2. Write intent for each
  3. Retrofit tests
  4. Track coverage

Mature practice:
  1. Intent-first is default
  2. AI synthesis common
  3. Continuous improvement
```

### 4.3 Quick Wins

| Win | Description | Timeline |
|-----|-------------|----------|
| First intent | Team sees value | Week 1 |
| First prevented bug | Intent test catches issue | Week 2-4 |
| Confidence in change | Refactoring with intent tests | Month 2 |
| Faster onboarding | New member reads intent | Month 2-3 |

---

## 5. Migration for AI-Heavy Teams

This is the migration path where CSD delivers the most immediate, visible value. Teams already using AI for code generation have the problem CSD was designed to solve: high synthesis throughput with no correctness guardrails.

### 5.1 The Core Problem

```text
Current state:
  - Heavy AI code generation (Copilot, ChatGPT, Claude, etc.)
  - Quality concerns: "it works but is it right?"
  - Inconsistent output across prompts and sessions
  - Code review bottleneck: reviewers cannot verify faster than AI generates
  - Growing gap between code volume and team understanding
```

The AI-heavy team's failure mode is not that AI writes bad code - it usually writes plausible code. The failure is that nobody can confidently say whether plausible code is correct code. Sprint velocity looks great until production reveals that speed without intent is just faster accumulation of uncertainty.

### 5.2 Migration Steps

#### Phase 1: Constrain AI (1-2 weeks)

The immediate win: include intent in every AI prompt. This alone changes AI output quality dramatically.

**Before CSD:**

```text
Prompt: "Write a Java method that applies a discount to an order"
Result: A method that compiles and probably works. Maybe handles nulls. Maybe not.
        No way to know if edge cases are covered without reading every line.
```

**After CSD:**

```text
Prompt: "Write a Java method that applies a discount to an order.
         Intent INT-CHECKOUT-042: discount must never reduce total below zero.
         Intent INT-CHECKOUT-043: expired discount codes must throw DiscountExpiredException.
         Intent INT-CHECKOUT-044: discount percentage must be between 1 and 100 inclusive."

Result: A method that explicitly handles all three invariants.
        Generated code is reviewable against stated intent, not reviewer intuition.
```

**Process change:**

- Every AI prompt must reference the intent spec it is implementing
- Review checks intent compliance, not just "does it compile"
- Reject AI output that does not address all stated intents

#### Phase 2: Test AI Output (2-4 weeks)

Intent tests become the automated reviewer that scales with AI generation speed.

```text
For each intent:
  1. Write the intent test BEFORE generating code with AI
  2. Generate code with AI, including intent in the prompt
  3. Run intent tests against AI output
  4. If tests fail: regenerate with failure feedback in the prompt
  5. If tests pass: proceed to human review (now scoped to readability, not correctness)
```

This inverts the review bottleneck. Instead of humans verifying correctness (slow, error-prone), tests verify correctness (fast, deterministic) and humans verify clarity and maintainability (their actual strength).

**CI integration:**

```text
  1. Intent tests in CI gate all PRs
  2. AI-generated code is held to the same standard as human code
  3. No special path - intent tests do not care who wrote the code
```

#### Phase 3: Optimize the Synthesis Loop (ongoing)

```text
Prompt improvement:
  1. Build a prompt library that includes intent specs per domain
  2. Track which prompts produce intent-compliant output on first try
  3. Refine prompts that consistently fail intent tests

Quality measurement:
  1. Track "first-pass intent compliance rate" for AI-generated code
  2. Compare across models, prompt styles, and domains
  3. Feed insights back into prompt library
```

### 5.3 Measuring AI + CSD Effectiveness

| Metric | What It Tells You | Target |
|--------|-------------------|--------|
| First-pass compliance rate | How often AI output passes intent tests without modification | > 80% |
| Regen cycles per feature | How many AI regeneration attempts before tests pass | < 2 |
| Review time reduction | How much faster reviews are with intent tests as pre-filter | > 50% reduction |
| Intent coverage of AI-generated code | What percentage of AI code has corresponding intent | 100% for critical paths |

---

## 6. Technical Migration Checklist

### 6.1 Infrastructure

- [ ] CI/CD pipeline supporting:
  - [ ] Unit test execution
  - [ ] Integration test execution
  - [ ] Quality gates
- [ ] Test framework(s) installed
- [ ] Documentation infrastructure
- [ ] Intent test annotations/markers

### 6.2 Codebase

- [ ] Test directories organized
- [ ] Intent test naming convention
- [ ] Example intent tests created
- [ ] Coverage tooling configured

### 6.3 Tooling

- [ ] IDE support for intent specs
- [ ] Linting for intent format
- [ ] Reporting for intent coverage
- [ ] Dashboards for metrics

---

## 7. Measuring Migration Success

### 7.1 Leading Indicators

| Indicator | Target | Measurement |
|-----------|--------|-------------|
| Intent specs created | Increasing weekly | Count |
| Intent tests written | Matching specs | Ratio |
| CI enforcement active | 100% | Boolean |
| Team understanding | High | Survey |

### 7.2 Lagging Indicators

| Indicator | Target | Measurement |
|-----------|--------|-------------|
| Defects in production | Decreasing | Count/trend |
| Time to fix issues | Decreasing | Hours |
| Confidence in changes | Increasing | Survey |
| Onboarding time | Decreasing | Days |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Worked example in canonical claim and marker form; promoted to Active |
| 0.2.0 | 2026-04-20 | CSD Team | Deepened AI migration, added worked example, enriched cultural changes |
| 0.1.0 | 2026-02-04 | CSD Team | Initial migration paths guide |
