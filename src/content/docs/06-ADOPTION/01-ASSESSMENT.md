---
title: "Assessment Guide"
id: "CSD-ADOPTION-01"
type: "Guide"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Adoption Overview](./00-OVERVIEW.md)

---

## 1. Overview

Before adopting CSD, assess your current state to create an effective adoption plan.

---

## 2. Quick Assessment

Answer these questions to gauge readiness:

### 2.1 Process Questions

| Question | Yes | Partial | No |
|----------|-----|---------|-----|
| Do you have written requirements for features? | 3 | 1 | 0 |
| Are correctness criteria explicit before coding? | 3 | 1 | 0 |
| Do you have automated tests? | 3 | 1 | 0 |
| Do tests gate deployments? | 3 | 1 | 0 |
| Is there code review for all changes? | 3 | 1 | 0 |

### 2.2 Team Questions

| Question | Yes | Partial | No |
|----------|-----|---------|-----|
| Does someone own software correctness? | 3 | 1 | 0 |
| Is there appetite for process change? | 3 | 1 | 0 |
| Can the team learn new practices? | 3 | 1 | 0 |
| Is there time for adoption activities? | 3 | 1 | 0 |
| Is leadership supportive? | 3 | 1 | 0 |

### 2.3 Technical Questions

| Question | Yes | Partial | No |
|----------|-----|---------|-----|
| Is there a CI/CD pipeline? | 3 | 1 | 0 |
| Is the codebase testable? | 3 | 1 | 0 |
| Are dependencies manageable? | 3 | 1 | 0 |
| Can tests run in isolation? | 3 | 1 | 0 |
| Is documentation infrastructure available? | 3 | 1 | 0 |

### 2.4 Scoring

| Total Score | Readiness | Recommendation |
|-------------|-----------|----------------|
| 36-45 | High | Start immediately with a full CSD pilot |
| 25-35 | Medium | Address the lowest-scoring dimension first, then start pilot |
| 15-24 | Low | Invest in CI/CD and test infrastructure before attempting CSD |
| 0-14 | Very Low | Foundation work needed - establish basic engineering practices first |

The most common score range is 25-35. Teams at this level usually have CI/CD and tests but lack explicit correctness criteria. CSD fills exactly this gap.

---

## 3. Detailed Assessment

### 3.1 Current Practices Inventory

Document your current state:

```markdown
## Current Practices Assessment

### Requirements
- How are requirements captured? [Answer]
- Who writes them? [Answer]
- How are they verified? [Answer]

### Design
- How are design decisions made? [Answer]
- Where are they documented? [Answer]
- How are they communicated? [Answer]

### Development
- What development methodology? [Answer]
- How is code reviewed? [Answer]
- What standards exist? [Answer]

### Testing
- What types of tests exist? [Answer]
- What is coverage? [Answer]
- How are tests organized? [Answer]

### Deployment
- How is code deployed? [Answer]
- What gates exist? [Answer]
- How is quality verified? [Answer]
```

### 3.2 Gap Analysis

Compare current state to CSD requirements:

| CSD Requirement | Current State | Gap | Priority |
|-----------------|---------------|-----|----------|
| Intent specifications | [Your state] | [Gap] | [H/M/L] |
| Intent tests | [Your state] | [Gap] | [H/M/L] |
| Continuous enforcement | [Your state] | [Gap] | [H/M/L] |
| Cognitive mode clarity | [Your state] | [Gap] | [H/M/L] |
| Documentation | [Your state] | [Gap] | [H/M/L] |

### 3.3 Risk Assessment

Common adoption risks and proven mitigations:

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Team resistance to process change | High | High | Start with volunteers; demonstrate value on one feature before mandating |
| Sprint pressure deprioritizes intent writing | High | Medium | Make intent spec a Definition of Ready item; no coding without intent |
| Over-specification slows delivery | Medium | Medium | Timebox intent writing to 15 minutes per feature; iterate |
| Existing technical debt makes testing hard | Medium | High | Do not retrofit intent for legacy code; apply intent-first only to new and changed code |
| Skill gaps in writing testable intent | Medium | Medium | Pair experienced intent writers with new practitioners; review first 10 intent specs as a team |
| Tool limitations block enforcement | Low | High | CSD requires only a test framework and CI; no specialized tooling needed at Level 1-2 |

---

## 4. Pilot Selection

### 4.1 Criteria for Good Pilot

| Criterion | Why |
|-----------|-----|
| Medium complexity | Not too simple (no learning), not too hard (too risky) |
| Clear correctness needs | Intent is obviously valuable |
| Willing team members | Motivation matters |
| Manageable scope | Can complete in 2-3 months |
| Visible outcomes | Success can be demonstrated |

### 4.2 Pilot Scope Template

```markdown
## CSD Pilot Proposal

### Scope
- **Area**: [System/component]
- **Team**: [Team name]
- **Duration**: [Weeks]

### Goals
- [ ] [Specific goal 1]
- [ ] [Specific goal 2]
- [ ] [Specific goal 3]

### Success Criteria
- [Measurable criterion 1]
- [Measurable criterion 2]
- [Measurable criterion 3]

### Resources Needed
- [Resource 1]
- [Resource 2]

### Risks
- [Risk 1] - Mitigation: [Plan]
- [Risk 2] - Mitigation: [Plan]
```

---

## 5. Stakeholder Alignment

### 5.1 Key Stakeholders

| Stakeholder | Interest | Concerns | Message |
|-------------|----------|----------|---------|
| Engineering Leadership | Quality, velocity | Investment | "Faster with confidence" |
| Product | Features delivered | Slowdown | "Same speed, fewer defects" |
| Operations | Stability | Change | "Better enforcement" |
| Developers | Good practices | Overhead | "AI assistance, clear criteria" |
| QA | Quality | Role change | "Strategic quality ownership" |

### 5.2 Communication Plan

| Audience | Message | Channel | Timing |
|----------|---------|---------|--------|
| Leadership | Business case | Presentation | Before pilot |
| Team | What and why | Team meeting | Week 1 |
| Stakeholders | Progress | Status update | Weekly |
| Organization | Learnings | Brown bag | Post-pilot |

---

## 6. Pre-Adoption Checklist

### Technical Prerequisites

- [ ] CI/CD pipeline exists
- [ ] Test framework available
- [ ] Documentation tooling available
- [ ] Repository structure supports organization

### Process Prerequisites

- [ ] Code review process exists
- [ ] Some quality gates in place
- [ ] Change process defined

### Team Prerequisites

- [ ] Intent Mode practitioner identified
- [ ] Team trained on CSD basics
- [ ] Time allocated for adoption
- [ ] Support available for questions

### Organizational Prerequisites

- [ ] Leadership buy-in obtained
- [ ] Pilot scope approved
- [ ] Success criteria agreed

---

## 7. Assessment Output

After assessment, produce:

1. **Assessment Report**
   - Current state summary
   - Gap analysis
   - Risk assessment
   - Readiness score

2. **Adoption Plan**
   - Pilot scope
   - Timeline
   - Resource needs
   - Success criteria

3. **Communication Plan**
   - Stakeholder messages
   - Channels and timing

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Reviewed against practice; promoted to Active |
| 0.2.0 | 2026-04-20 | CSD Team | Concrete risk mitigations, scoring guidance |
| 0.1.0 | 2026-02-04 | CSD Team | Initial assessment guide |
