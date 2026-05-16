# Architecture

## Current (v0.1)

```
trajectory-notes/  ──►  (future) parser
docs/              ──►  human-readable thesis + decisions
src/lib/data.ts    ──►  seed data for MVP UI
src/components/    ──►  presentation layer
```

- **Stack:** Next.js 16, TypeScript, Tailwind CSS 4, App Router
- **Data:** In-memory seed (`src/lib/data.ts`). No database yet.
- **Types:** `TrajectoryEntry`, `ObsessionCard`, `ReasoningTrace` in `src/lib/types.ts`

## Principles

1. **Trajectory-first** — feed is the spine, not profile cards
2. **GitHub as residue** — commits are timestamped repeated action; design types with `githubRef` for future linking
3. **Repo as artifact** — `trajectory-notes/` and `logs/` capture evolution outside the app
4. **Extensible, not overbuilt** — add persistence when the thesis is validated

## Future layers

### Layer 1 — Markdown sync

Read `trajectory-notes/*.md` at build time or via API route. Single source of truth in repo.

### Layer 2 — GitHub integration

- Webhook or polling for commits on linked repos
- Map commit messages → `TrajectoryEntry` kind `commit`
- Optional: PR / issue context as reasoning triggers

### Layer 3 — Collaboration

- Multiple builders, federated feeds
- Shared obsession cards with attribution
- Trajectory diff / merge (how did two builders' reasoning diverge?)

## Component map

| Component | Responsibility |
|-----------|----------------|
| `ObsessionCard` | Structured current context block |
| `TrajectoryFeed` | Chronological mixed-type stream |
| `ReasoningLayer` | Trigger → insight → optional direction change |

## Non-goals (for now)

- Auth / multi-tenant SaaS
- Real-time chat
- Profile pages or follower graphs
- Heavy CMS
