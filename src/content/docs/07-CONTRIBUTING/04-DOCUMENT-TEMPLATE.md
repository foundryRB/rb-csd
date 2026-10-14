---
title: "Document Template"
id: "CSD-CONTRIB-04"
type: "Template"
status: "Active"
version: "1.0.0"
updated: "2026-07-04"
---
## Navigation

- **Parent**: [Contributing to CSD Docs](./00-OVERVIEW.md)

---

## 1. Overview Template

Use for section overview documents (00-OVERVIEW.md files):

```markdown
---
title: [Section Name] Overview
id: CSD-[SECTION]-OVERVIEW
type: Overview
status: [Draft/Active/Deprecated]
version: X.Y.Z
updated: YYYY-MM-DD
---

## Navigation

- **Parent**: [CSD Overview](../00-OVERVIEW.md)
- **Children**:
  - [Child Document 1](./01-CHILD-1.md)
  - [Child Document 2](./02-CHILD-2.md)
  - [Child Document 3](./03-CHILD-3.md)

---

## 1. Introduction

[Brief introduction to this section. What does it cover? Why is it important?]

---

## 2. Key Concepts

[Summary of the main concepts covered in this section]

| Concept | Description |
|---------|-------------|
| [Concept 1] | [Brief description] |
| [Concept 2] | [Brief description] |
| [Concept 3] | [Brief description] |

---

## 3. Documents in This Section

| Document | Purpose |
|----------|---------|
| [Document 1](./01-CHILD-1.md) | [What it covers] |
| [Document 2](./02-CHILD-2.md) | [What it covers] |
| [Document 3](./03-CHILD-3.md) | [What it covers] |

---

## 4. Getting Started

[Quick start guide for this section]

1. [First step]
2. [Second step]
3. [Third step]

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| X.Y.Z | YYYY-MM-DD | [Author] | [Changes description] |
```

---

## 2. Standard Template

Use for normative documents (rules, standards, conventions):

````markdown
---
title: [Standard Name]
id: CSD-[SECTION]-NN
type: Standard
status: [Draft/Active/Deprecated]
version: X.Y.Z
updated: YYYY-MM-DD
---

## Navigation

- **Parent**: [Section Overview](./00-OVERVIEW.md)

---

## 1. Overview

[What this standard covers and why it exists]

---

## 2. Scope

**Applies to:** [What this standard covers]
**Does not apply to:** [Exceptions or exclusions]

---

## 3. Requirements

### 3.1 [Requirement Category 1]

| Requirement | Description | Level |
|-------------|-------------|-------|
| [REQ-01] | [Description] | MUST |
| [REQ-02] | [Description] | SHOULD |
| [REQ-03] | [Description] | MAY |

### 3.2 [Requirement Category 2]

| Requirement | Description | Level |
|-------------|-------------|-------|
| [REQ-04] | [Description] | MUST |
| [REQ-05] | [Description] | SHOULD |

---

## 4. Examples

### 4.1 Correct Example

```[language]
[Example code/text that follows the standard]
```

### 4.2 Incorrect Example

```[language]
[Example code/text that violates the standard]
```

**Why it's wrong:** [Explanation]

---

## 5. Enforcement

[How this standard is enforced: tooling, reviews, automation]

---

## 6. Exceptions

[Process for requesting exceptions to this standard]

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| X.Y.Z | YYYY-MM-DD | [Author] | [Changes description] |
````

---

## 3. Guide Template

Use for instructional documents (how-to, tutorials):

````markdown
---
title: [Guide Title]
id: CSD-[SECTION]-NN
type: Guide
status: [Draft/Active/Deprecated]
version: X.Y.Z
updated: YYYY-MM-DD
---

## Navigation

- **Parent**: [Section Overview](./00-OVERVIEW.md)

---

## 1. Overview

[What this guide teaches and who it's for]

**Prerequisites:**
- [Required knowledge/tools 1]
- [Required knowledge/tools 2]

**Time Required:** [Estimated time]

---

## 2. [Step 1: First Major Step]

[Explanation of first step]

```[language]
[Code or commands for step 1]
```

**Expected Result:** [What should happen]

---

## 3. [Step 2: Second Major Step]

[Explanation of second step]

```[language]
[Code or commands for step 2]
```

**Expected Result:** [What should happen]

---

## 4. [Step 3: Third Major Step]

[Explanation of third step]

```[language]
[Code or commands for step 3]
```

**Expected Result:** [What should happen]

---

## 5. Verification

[How to verify the guide was completed successfully]

```[language]
[Verification commands/checks]
```

---

## 6. Troubleshooting

### Problem 1: [Common Issue]

**Symptom:** [What goes wrong]
**Cause:** [Why it happens]
**Solution:** [How to fix it]

### Problem 2: [Another Common Issue]

**Symptom:** [What goes wrong]
**Cause:** [Why it happens]
**Solution:** [How to fix it]

---

## 7. Next Steps

- [Related guide 1](./related-1.md)
- [Related guide 2](./related-2.md)

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| X.Y.Z | YYYY-MM-DD | [Author] | [Changes description] |
````

---

## 4. Reference Template

Use for reference documentation (API docs, glossaries, lookups):

```markdown
---
title: [Reference Title]
id: CSD-[SECTION]-NN
type: Reference
status: [Draft/Active/Deprecated]
version: X.Y.Z
updated: YYYY-MM-DD
---

## Navigation

- **Parent**: [Section Overview](./00-OVERVIEW.md)

---

## 1. Overview

[What this reference covers]

---

## 2. Quick Reference

| Item | Description | See Also |
|------|-------------|----------|
| [Item 1] | [Brief description] | [Link] |
| [Item 2] | [Brief description] | [Link] |
| [Item 3] | [Brief description] | [Link] |

---

## 3. Detailed Reference

### 3.1 [Category 1]

#### [Item 1.1]

| Attribute | Value |
|-----------|-------|
| **Description** | [What it is] |
| **Usage** | [How to use it] |
| **Parameters** | [If applicable] |
| **Returns** | [If applicable] |
| **Example** | [Code example] |

#### [Item 1.2]

| Attribute | Value |
|-----------|-------|
| **Description** | [What it is] |
| **Usage** | [How to use it] |
| **Parameters** | [If applicable] |
| **Returns** | [If applicable] |
| **Example** | [Code example] |

### 3.2 [Category 2]

[Similar structure for category 2]

---

## 4. Index

[Alphabetical or categorized index for quick lookup]

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| X.Y.Z | YYYY-MM-DD | [Author] | [Changes description] |
```

---

## 5. Metadata Reference

### Document Types

| Type | Purpose | Example |
|------|---------|---------|
| Overview | Section entry point | 00-OVERVIEW.md |
| Standard | Rules and requirements | DOCUMENTATION-STANDARD.md |
| Guide | Step-by-step instructions | WRITING-INTENT.md |
| Reference | Lookup information | GLOSSARY.md |
| Template | Reusable patterns | This document |

### Status Values

| Status | Meaning |
|--------|---------|
| Draft | Work in progress, not yet approved |
| Active | Approved and current |
| Deprecated | Superseded, maintained for reference |

### Version Format

Use semantic versioning: `MAJOR.MINOR.PATCH`

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking change | MAJOR | 1.0.0 -> 2.0.0 |
| New content | MINOR | 1.0.0 -> 1.1.0 |
| Fixes/typos | PATCH | 1.0.0 -> 1.0.1 |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-04 | CSD Team | Reviewed against practice; promoted to Active |
| 0.1.0 | 2026-02-04 | CSD Team | Initial document template |
