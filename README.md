# trajectory-native

A lightweight experimental workspace for **builder trajectory** — not a polished SaaS, but a live thinking + execution artifact.

## Thesis

AI builders can ship faster than ever, but coordination, context-sharing, and evolving strategic alignment remain fragmented.

This repo explores:

- **Trajectory over profile** — chronology reveals more than branding
- **Repeated action over static identity** — commits, experiments, pivots as signal
- **Evolving context over polished presentation** — reasoning traces stay visible

## MVP

A minimal Next.js prototype with:

1. **Trajectory feed** — notes, experiments, commits, focus, directional shifts
2. **Current obsession card** — structured evolving context block
3. **Reasoning / context layer** — short traces of why direction changed

Run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product demo

**Hero view** — obsession card and trajectory feed at a glance:

![Builder trajectory workspace — hero view](docs/screenshots/demo-hero.png)

**Full page** — obsession card, trajectory feed, and reasoning layer:

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

**Not:** LinkedIn, Twitter/X, Slack, Discord.

**Instead:** a calm, exploratory builder operating surface — minimal, thoughtful, alive.

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
- What does trajectory-native collaboration look like?

---

*Living artifact. Evolving execution. Public reasoning over time.*
