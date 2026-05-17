# Architecture

## Current (v0.3)

```
trajectory-notes/  ──►  (future) parser
docs/              ──►  thesis, product direction, decisions
src/lib/data.ts    ──►  seed data for MVP UI
src/components/    ──►  presentation layer
```

- **Stack:** Next.js 16, TypeScript, Tailwind CSS 4, App Router
- **Data:** In-memory seed (`src/lib/data.ts`). No database yet.
- **Types:** `CalibrationNotes`, `SignalReceived`, `TimelineEvent`, `CommitContext`, `TrajectoryEntry`, `ReasoningTrace`, `CalibrationReply`

## Principles

1. **Calibration memory first** — signals, notes, timeline before feed mechanics
2. **Ecosystem-external capture** — interactions referenced from X, GitHub, DMs, etc.
3. **Execution ↔ context linking** — commits carry why/trigger/uncertainty residue
4. **Context-embedded calibration** — back-and-forth on objects, not global chat
5. **Not optimized for time-on-platform** — help builders evolve across tools

## Component map

| Component | Responsibility |
|-----------|----------------|
| `CalibrationNotesSection` | Live strategic beliefs and uncertainties |
| `TrajectoryTimeline` | Trajectory over time (signals, pivots, calibration) |
| `SignalsReceived` | External interaction capture with aftermath |
| `ObsessionCard` | Compressed current focus |
| `TrajectoryFeed` | Execution residue + commit context blocks |
| `ReasoningLayer` | Reasoning continuity + ecosystem refs |
| `CommitContextBlock` | Why / trigger / uncertainty on commits |
| `CalibrationThread` | Anchored back-and-forth on context objects |
| `EcosystemRef` | External source link display |

## Future layers

### Layer 1 — Markdown / JSON persistence

Parse `trajectory-notes/` and calibration data at build time.

### Layer 2 — GitHub integration

- Auto-ingest commits with context suggestions
- Issue/PR → signal or reasoning trigger

### Layer 3 — Ecosystem references

- X/Twitter link unfurl or manual capture
- Accelerator / meeting note templates
- Cross-builder shared calibration (with consent)

## Non-goals

- Viral feed, creator metrics, dopamine loops
- Global chat replacing Discord/Slack
- Auth / multi-tenant SaaS (for now)
- Profile pages or follower graphs
