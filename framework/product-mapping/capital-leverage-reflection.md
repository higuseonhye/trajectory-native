# Capital & Leverage Reflection

How time is allocated, where leverage accumulates, whether behavior compounds, ownership vs dependency trajectory.

**Not investment advice.** Behavioral and structural reflection infrastructure.

---

## What it surfaces

| Dimension | Question |
|-----------|----------|
| Time allocation | Labor vs ownership-building vs consumption |
| Leverage accumulation | Where output scales beyond time input |
| Compounding behavior | What assets grow vs reset |
| Ownership trajectory | Building vs renting trajectory |
| Dependency | Optionality increasing or decreasing |

---

## Reflection prompts (operational)

- Where did time go this week — and did it compound?
- What assets were created vs consumed?
- Is leverage increasing or only activity?
- Are you building ownership or optimizing labor?
- What would still matter in 5 years from this week's work?

---

## Product behavior

1. Aggregate trajectory events by allocation category
2. Trend leverage signals over time windows
3. Contrast stated long-term goals with behavioral data
4. Surface capital drift patterns (see trajectory-drift)
5. Connect to Drift Radar for intervention

---

## Implementation status

Shipped v0.8 — dependency/optionality scores, ownership trajectory, reflection prompts.

Implementation: `src/lib/capital-leverage-engine.ts` · `src/components/CapitalLeverageReflection.tsx`

---

## Framework connection

- [`../capital-native/`](../capital-native/)
- [`../leverage/`](../leverage/)
- [trajectory-drift/framework/capital-drift/](https://github.com/higuseonhye/trajectory-drift/tree/main/framework/capital-drift)
