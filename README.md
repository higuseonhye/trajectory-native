# trajectory-native

A lightweight experimental workspace for **builder trajectory** — not a polished SaaS, but a live thinking + execution artifact.

## Thesis

AI builders can ship faster than ever, but coordination, context-sharing, and evolving strategic alignment remain fragmented.

This repo explores:

- **Trajectory over profile** — chronology reveals more than branding
- **Repeated action over static identity** — commits, experiments, pivots as signal
- **Evolving context over polished presentation** — reasoning traces stay visible
- **Context-embedded calibration** — back-and-forth happens *on* obsession, feed items, and reasoning traces — not in a side channel

## Origin

The product started from a coordination gap: builders talk in Slack, but **alignment inside shared context** is hard. Calibration should happen where obsession, pivots, and reasoning live — not in a detached chat tab.

See [`docs/thesis.md`](docs/thesis.md) and [`docs/context-calibration.md`](docs/context-calibration.md).

## MVP

A minimal Next.js prototype with:

1. **Trajectory feed** — notes, experiments, commits, focus, directional shifts
2. **Current obsession card** — structured evolving context block
3. **Reasoning / context layer** — short traces of why direction changed
4. **Calibration threads** — short multi-author back-and-forth anchored to context objects (read-only seed data in v0.2)

Run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product demo

**Hero view** — obsession card, feed, and context-embedded calibration threads:

![Builder trajectory workspace — hero view](docs/screenshots/demo-hero.png)

**Full page** — obsession, trajectory feed, reasoning layer, and calibration:

![Builder trajectory workspace — full page](docs/screenshots/demo-full.png)

## Repository structure

| Path | Purpose |
|------|---------|
| `src/` | Next.js app — UI and seed data layer |
| `docs/` | Architecture, thesis, future directions |
| `logs/` | Session and build logs over time |
| `experiments/` | Hypothesis-driven spikes |
| `trajectory-notes/` | Markdown trajectory entries (repo-as-artifact) |

## Design direction

**Not:** LinkedIn, Twitter/X, Slack-style global chat, Discord.

**Instead:** a calm, exploratory builder operating surface — minimal, thoughtful, alive. **Calibration is in-context, not in a channel.**

## GitHub-native direction

Architecture assumes **GitHub as the execution residue layer**. Future work:

- Commit / context linking
- Repo trajectory visualization
- Repeated-action identity mapping

See [`docs/architecture.md`](docs/architecture.md).

## Status

`v0.1.0` — experimental MVP. Optimize for clarity of thesis and trajectory visibility, not perfection.

## Open questions

- How do builders expose evolving context?
- Can repeated actions reveal identity better than profiles?
- What does trajectory-native collaboration look like when calibration stays on the object?

---

*Living artifact. Evolving execution. Public reasoning over time.*
