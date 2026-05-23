# Decision Memory

Preserve decisions, rationale, tradeoffs, commitments, and long-term goals to create institutional memory and compounding judgment.

---

## What it preserves

- Decisions and when they were made
- Rationale and assumptions at decision time
- Tradeoffs considered and rejected
- Commitments and their lineage
- Long-term goals and how decisions connect
- Recurring patterns across decisions

---

## Why it matters

Modern people do not mainly suffer from lack of information. They suffer from **decision entropy** and **organizational memory loss**.

Without decision memory:
- Same mistakes repeat
- Rationale disappears at turnover
- Strategic continuity breaks
- Judgment does not compound

---

## Implementation

| Component | Location | Status |
|-----------|----------|--------|
| Document ingestion | `org-reasoning-mvp/workflows/decision_continuity/` | Shipped |
| Extraction (LLM + heuristic) | `org-reasoning-mvp/reasoning_extractor/` | Shipped |
| SQLite persistence | `org-reasoning-mvp/memory/` | Shipped |
| Timeline / tradeoffs / tensions UI | `org-reasoning-mvp/src/app/` | Shipped |
| Lineage detection | `org-reasoning-mvp/decision_lineage/` | Shipped |
| Personal decision journal | trajectory-native DecisionJournal | Shipped v0.7 |

---

## Product behavior

1. Ingest notes, transcripts, PRDs, meeting notes
2. Extract decisions with evidence spans (anchored quotes)
3. Link superseded decisions for continuity
4. Surface tradeoffs and open tensions
5. Enable synthesis across documents over time

---

## Framework connection

- [`../principles/`](../principles/) — Judgment principle
- [`../compounding-assets/`](../compounding-assets/) — Institutional memory as compounding asset
- [Decision Journal](./decision-journal.md) — personal layer extension
