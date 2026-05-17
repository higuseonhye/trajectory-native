# trajectory-native

A **trajectory-aware calibration memory layer** for builders and operators — not a social network, not a chat replacement.

## The real problem

Builders already interact across GitHub, X, Discord, Slack, DMs, accelerators, and conferences. Communication is not scarce.

What breaks down:

- fragmented context
- disappearing calibration
- no persistent trajectory memory
- weak connection between execution and evolving reasoning

## What this is

> Help builders continuously recalibrate their trajectory through persistent context and repeated action history.

**Not:** LinkedIn for builders, Twitter for coders, Discord replacement, another productivity app.

**Instead:** a living strategic notebook, trajectory operating system, calibration memory layer, GitHub-native builder context surface.

## Core value

Not content creation. **Calibration memory** — capture what changed, why, what signal caused it, and how trajectory evolved — even when the conversation happened elsewhere.

## MVP (v0.3)

| Surface | Purpose |
|---------|---------|
| **Calibration notes** | What I believe, uncertainty, signals watching, feedback needed |
| **Trajectory timeline** | Obsession shifts, reasoning, pivots, calibration events, signals over time |
| **Signals received** | External interactions (X, GitHub, DM, accelerator…) with what changed afterward |
| **Current obsession** | Compressed "now" state |
| **Execution residue** | Commits/pivots with **commit ↔ context** linking |
| **Reasoning continuity** | Why direction changed, with ecosystem references |

Run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product demo

**Hero view:**

![Builder trajectory workspace — hero view](docs/screenshots/demo-hero.png)

**Full page:**

![Builder trajectory workspace — full page](docs/screenshots/demo-full.png)

*Screenshots may predate v0.3 UI — run locally for latest.*

## Strategic principle

Do **not** optimize for keeping users inside the platform.

Optimize for **helping builders evolve more intelligently across the ecosystem**.

## Repository structure

| Path | Purpose |
|------|---------|
| `src/` | Next.js app — calibration memory UI |
| `docs/` | Thesis, product direction, architecture |
| `trajectory-notes/` | Sample trajectory evolution entries |
| `logs/` | Session logs |
| `experiments/` | Hypothesis spikes |

## Docs

- [`docs/thesis.md`](docs/thesis.md) — evolving thesis
- [`docs/product-direction.md`](docs/product-direction.md) — calibration memory reframing
- [`docs/context-calibration.md`](docs/context-calibration.md) — in-context back-and-forth
- [`docs/architecture.md`](docs/architecture.md) — technical layers

## Status

`v0.3.0` — experimental. Optimize for trajectory visibility and calibration persistence, not virality.

---

*Living artifact. Ecosystem-external by design. Calibration over conversation relocation.*
