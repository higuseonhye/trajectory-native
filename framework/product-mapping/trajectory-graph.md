# Trajectory Graph

Visualize projects, commitments, decisions, goals, relationships, capital allocation, energy allocation, and drift signals.

---

## What it shows

- Active projects and their leverage potential
- Commitments and open loops
- Decision nodes linked to outcomes
- Long-term goals and alignment
- Relationship amplifiers vs drains
- Time/energy allocation across domains
- Drift signals overlaid on trajectory

---

## Implementation status

| Element | Status | Location |
|---------|--------|----------|
| Trajectory events | Shipped | `trajectory-native/src/` |
| Decision nodes | Shipped v0.8 | linked to decision journal |
| Open loop nodes | Shipped v0.8 | from unfinished/avoided events |
| Drift nodes | Shipped v0.8 | from intervention signals |
| Subject clustering | Shipped v0.8 | events grouped by subject |
| Timeline view | Shipped v0.8 | `TrajectoryGraphView.tsx` |
| Capital/energy allocation view | Partial | allocation on event nodes |

---

## Design principles

- Calm, sparse visualization — not dashboard overload
- Long-range clarity over real-time noise
- Behavioral signals over vanity metrics
- Drift signals visible without alarm theater

---

## Framework connection

- [`../coherence/`](../coherence/) — cross-domain alignment
- [`../compounding-assets/`](../compounding-assets/) — what should appear as growing nodes
