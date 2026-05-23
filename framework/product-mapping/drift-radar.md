# Drift Radar

Detect prestige loops, reactive behavior, fragmented direction, and low-leverage activity.

---

## Drift categories (human)

| Drift | Pattern |
|-------|---------|
| **Prestige Drift** | Optimizing for looking impressive vs building ownership |
| **Apprentice Drift** | Infinite learning without assets or execution |
| **Labor Drift** | Optimized worker without leverage or capital |
| **Noise Drift** | Cognitive bandwidth lost to trends, feeds, urgency |
| **Moral Drift** | Avoiding capital/investment until constrained |
| **Spiritual Drift** | Purpose and integrity lost to speed/status |
| **Organizational Drift** | Team coherence decay |
| **AI Drift** | Tool hype replacing judgment and ownership |

Full taxonomy: [trajectory-drift/framework/drift-taxonomy/](https://github.com/higuseonhye/trajectory-drift/tree/main/framework/drift-taxonomy)

---

## Observable signals

- Too much consumption vs creation
- Too much networking vs ownership
- Too many applications vs building
- Fragmented projects with no leverage accumulation
- Reactive behavior and context switching
- High activity, low compounding

See [trajectory-drift/framework/signals/](https://github.com/higuseonhye/trajectory-drift/tree/main/framework/signals)

---

## Implementation (v0.6)

| Surface | Location | Behavior |
|---------|----------|----------|
| Intervention panel | `trajectory-native/src/` | Drift signals + suggested actions |
| Founder drift patterns | `docs/calibration-archive.md` | interaction starvation, momentum degradation, unfinished loops |
| Momentum engine | `trajectory-native/src/` | Density, open loops, recovery |
| Native ↔ drift bridge | Both repos | Export events for unified analysis |

---

## Product behavior

1. Ingest trajectory events from calendar, comms, tools
2. Detect drift patterns against taxonomy
3. Surface intervention signals — not just reflection
4. Close reality loop: reflection → action → environment → feedback

---

## Framework connection

- [`../../framework/coherence/`](../coherence/) — fragmentation detection
- [`../../framework/capital-native/`](../capital-native/) — labor vs ownership signals
