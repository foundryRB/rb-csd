# Cognitive Software Delivery (CSD)

The intent doctrine: how machine-checkable intent governs AI-mediated software delivery.

## Overview

Cognitive Software Delivery (CSD) is not a new methodology - it is glue: an assembly of proven industry practice (specification by example, test-first thinking, executable constraints) into one working discipline for the challenges that emerge when machines participate in software synthesis. It defines the intent runtimes, how to run them, and how to operate a delivery whose quality gates are machine-checkable claims. Traditional delivery models (Waterfall, Agile, DevOps) were built around human-centric assumptions that break down when AI tooling introduces high-throughput, probabilistic synthesis into the delivery pipeline; CSD is the quality discipline that restores the binding, and it plugs into whatever lifecycle runs the delivery.

CSD responds to the core insight: **the bottleneck has shifted from implementation to cognition** — from writing code to governing intent.

## The Problem

When AI tooling enters traditional delivery systems:

- Implicit rules don't bind at the point of synthesis
- Architectural constraints exist socially, not mechanically
- Quality standards are enforced inconsistently
- Domain rules are understood but not written down

The result: **more output with less coherence**, shifting cost into review and coordination.

## The Solution

CSD introduces explicit, executable artifacts that govern machine-mediated synthesis:

1. **Intent Specification** — Human-owned, machine-checkable truth statements
2. **Intent Tests** — Executable validation that binds intent to implementation
3. **Synthesis Governance** — Constraints that participate in execution, not just documentation
4. **Emergent Intent** — Intent discovered from synthesis failures, crystallized into permanent constraints
5. **Trust Calibration** — Right-level validation per artifact type (not everything needs human review)
6. **Time to Trusted Output (TtTO)** — The metric that measures governance effectiveness

## Core Principles

> **Humans own meaning. Machines synthesize. Tests enforce. Failures teach.**

- Intent must be explicit and durable
- Constraints must be executable
- Evidence must be binding by default
- Judgment and synthesis must be separated
- Trust must be calibrated, not binary
- Emergent intent must be captured, not ignored

## Run with Docker

Builds the site and serves it with nginx on <http://localhost:8082>:

```bash
cd devops && docker compose up --build
```

## Develop without Docker

Requires Node 22.12+. `@psa-department-of-engineering/*` packages install from the
public npm registry, so no `.npmrc` and no token are needed.

```bash
npm install
npm run dev        # live site at http://localhost:4321
npm run validate   # markdownlint + vitest intent tests + astro build
```

## Layout

```text
src/content/docs/      # The methodology content (the product), one Markdown page each:
                       #   00-OVERVIEW, 01-INTENT/, 02-TESTING/, 03-TEAMS/,
                       #   04-LIFECYCLE/, 05-TEMPLATES/, 06-ADOPTION/, 07-CONTRIBUTING/
src/plugins/           # Remark plugin: internal doc-link resolution (diagrams render via astro-mermaid)
src/test/              # vitest-intent meta-tests over every content page
intent.yaml            # CSD intent claims the meta-tests attest
devops/                # Dockerfile + docker-compose + nginx.conf for the app image
docs/                  # Deployment docs site, served at docs.vodafone-foundry.com/apps/cognitive-software-delivery
k8s/                   # Helm chart: app + docs Deployments, Services, HTTPRoute
.github/workflows/     # Thin callers of the shared VFPT-VODAFONE-FOUNDRY/adf-ci workflows
```

`src/content/docs/` is the canonical methodology source; `docs/` documents this
repo as a deployed app.

## Quick Start

| If you are... | Start here |
|---------------|------------|
| Executive/Manager | [Overview](./src/content/docs/00-OVERVIEW.md) → Why CSD matters |
| Architect | [Intent Specification](./src/content/docs/01-INTENT/00-OVERVIEW.md) → How to specify intent |
| Developer | [Testing Strategy](./src/content/docs/02-TESTING/00-OVERVIEW.md) → How to write intent tests |
| Team Lead | [Cognitive Modes](./src/content/docs/03-TEAMS/00-OVERVIEW.md) → Scaling topologies |
| Solo IC | [Cognitive Modes § Solo IC](./src/content/docs/03-TEAMS/00-OVERVIEW.md) → All modes, one person |

## Reference

This methodology is part of a series:

1. ["When Machines Write Code"](https://medium.com/@chaos.architect25/when-machines-write-code-b7d2452fc0e3) — The problem statement
2. "Time to Trusted Output" — The metric that measures governance effectiveness (TtTO is defined in [Overview § Glossary](./src/content/docs/00-OVERVIEW.md))
3. **CSD** (this methodology) — The operational framework

## Commits

Every commit follows the platform's commit convention: a Conventional Commit
subject and no co-author trailer. CI derives the version from the type and
blocks release otherwise. The convention is documented on the platform
portal's GitOps delivery page, under "Commit convention"; the committed
`.pre-commit-config.yaml` checks it locally once installed (`pre-commit install`).
