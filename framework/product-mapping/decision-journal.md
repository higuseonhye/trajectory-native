# Decision Journal

Track decisions, confidence, assumptions, outcomes, and recurring mistakes — personal layer of compounding judgment.

---

## What it tracks

| Field | Purpose |
|-------|---------|
| Decision | What was decided |
| Confidence | How certain at decision time |
| Assumptions | What must be true |
| Alternatives rejected | Tradeoffs considered |
| Outcome | What actually happened |
| Pattern link | Connection to recurring mistakes |

---

## Difference from Decision Memory

| Decision Memory | Decision Journal |
|-----------------|------------------|
| Organizational, document-ingested | Personal, intentionally logged |
| Evidence spans from source docs | Structured reflection entries |
| Team continuity | Individual judgment compounding |
| org-reasoning-mvp | trajectory-native |

---

## Implementation status

Shipped v0.8 — localStorage-backed personal journal with outcome review and event linking.

Implementation: `src/lib/decision-journal.ts` · `src/components/DecisionJournal.tsx` · `src/lib/trajectory-links.ts`

---

## Product behavior

1. Log decision at moment of choice
2. Capture confidence and assumptions explicitly
3. Schedule outcome review
4. Surface recurring mistake patterns
5. Link to trajectory graph and drift radar

---

## Framework connection

- [Decision Memory](./decision-memory.md) — organizational layer
- [`../principles/`](../principles/) — Judgment principle
- [`../../framework/compounding-assets/`](../compounding-assets/) — Judgment as compounding asset
