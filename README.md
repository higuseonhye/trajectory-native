# trajectory-native

**A trajectory-aware operating system.**  
Most people don't collapse — they **drift quietly**. This helps you notice, steer with intention, and stay awake to your chosen direction.

> Not productivity. Not "return to normal." Conscious navigation.

**trajectory-native** — personal steering (human-side).  
**[trajectory-drift](https://github.com/higuseonhye/trajectory-drift)** — drift detection (system-side).

Thesis: [product direction](docs/product-direction.md) · [steering](docs/steering.md) · [framework](framework/)

<p align="center">
  <img src="docs/screenshots/demo-hero.png" alt="Trajectory intelligence — are you steering or just functioning?" width="720" />
</p>

---

## Why this exists

People rarely collapse all at once. They **drift quietly** — unconscious inertia, signal loss, and direction fade while still looking functional.

Most tools push optimization. Few help you ask: **am I steering, or just functioning?**

---

## What this is

Not a dashboard. Not a habit tracker. Not optimization software.

A **personal navigation system** for steering your trajectory.

| Surface layer | Depth layer |
|---------------|-------------|
| Drift detection · daily steering · vitality | Compounding · judgment · ownership |
| "What's one tiny turn?" | Decision memory · trajectory graph |
| Emotional honesty | Systems intelligence |

| Capability | Role |
|------------|------|
| **Decision Memory** | Preserve decisions, rationale, tradeoffs, commitments |
| **Drift Detection** | Prestige loops, fragmentation, low-leverage activity |
| **Compounding Analysis** | Surface what actually compounds |
| **Ownership Layer** | Assets, leverage, ownership trajectory |

| Module (v0.8 shipped) | Role |
|-----------------------|------|
| **Capital & leverage reflection** | Dependency, optionality, ownership trajectory |
| **Trajectory graph** | Unified timeline — decisions, events, loops, drift |
| **Institutional memory** | Team decisions bridged from org-reasoning-mvp |
| **Compounding analysis** | Ownership/labor/consumption allocation trends |
| **Decision journal** | Personal judgment + event linking |
| **Trajectory events** | Atomic unit — interactions, momentum, entropy, allocation |
| **Momentum engine** | Density, open loops, interaction energy, recovery |
| **Intervention / Drift Radar** | Unconscious drift surfaced — one turn toward signal |
| **Interaction intelligence** | Amplifiers vs drains |
| **Native ↔ drift bridge** | Export events for unified analysis |

See [framework/product-mapping/](framework/product-mapping/) for full module architecture.

---

## Founder drift → intervention

Recurring patterns now drive **intervention signals**, not only reflection:

- interaction starvation
- momentum degradation
- unfinished loops
- reactive trajectory switching
- abstraction over action

Archive: [`docs/calibration-archive.md`](docs/calibration-archive.md)

---

## Reality loop

```
reflection → action → environment → feedback → recalibration
```

The loop must close in the world — not stop at insight.

---

## Run locally

```bash
npm install && npm run dev
# → http://localhost:3000
```

Surfaces at top of page: **Intervention** · **Momentum** · **Compounding** · **Capital & leverage** · **Trajectory graph** · **Decision journal** · **Institutional memory** · **Interaction intelligence** · **Events** · **Bridge**.

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/demo-intervention.png" alt="Unconscious drift detected — one intentional turn" width="400" />
  <img src="docs/screenshots/demo-decision-journal.png" alt="Honest turns — decisions, assumptions, outcomes" width="400" />
</p>

<p align="center">
  <img src="docs/screenshots/demo-trajectory-graph.png" alt="Directional evolution — tiny turns over time" width="400" />
  <img src="docs/screenshots/demo-compounding.png" alt="Systems depth — what compounds vs what drifts" width="400" />
</p>

<p align="center">
  <img src="docs/screenshots/x-post-v08-viewport.png" alt="Steering mode — are you steering or just functioning? (1200×675)" width="720" />
</p>

Full scroll: [`demo-full.png`](docs/screenshots/demo-full.png)

---

## Ecosystem

| Repo | Layer |
|------|--------|
| **trajectory-native** (this repo) | Personal trajectory OS |
| **[trajectory-drift](https://github.com/higuseonhye/trajectory-drift)** | Human + AI coordination infrastructure |

---

## Docs

- [`docs/product-direction.md`](docs/product-direction.md) — current thesis
- [`docs/steering.md`](docs/steering.md) — emotional layer (drift, rudder, signal contact)
- [`framework/steering/`](framework/steering/) — steering concepts
- [`docs/trajectory-infrastructure.md`](docs/trajectory-infrastructure.md)
- [`docs/calibration-archive.md`](docs/calibration-archive.md)
- [trajectory-drift/framework/](https://github.com/higuseonhye/trajectory-drift/tree/main/framework) — drift taxonomy, signals, recovery

---

## Status

`v0.9` direction — trajectory-aware OS: emotional steering surface + systems depth underneath. Early. Evolving in public.

### org-reasoning-mvp bridge

Set `ORG_REASONING_URL=http://localhost:3000` when org-reasoning-mvp is running. Team decisions load live; otherwise seed data displays.
