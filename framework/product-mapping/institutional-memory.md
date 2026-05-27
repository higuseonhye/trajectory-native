# Institutional Memory

For teams: preserve strategic continuity, prevent repeated mistakes, maintain alignment over time.

---

## What it preserves

- Strategic decisions and rationale
- Policies and their enforcement history
- Incident patterns and resolutions
- Coordination failures and recovery
- Propagation rules across human and agent workflows
- Organizational drift signals over time

---

## Why teams fail

Not from lack of intelligence — from **institutional memory fragmentation**:
- Decisions made but rationale lost
- Incidents repeat without pattern recognition
- Policies exist but don't propagate to agents
- Mission drifts while execution continues

---

## Implementation

| Component | Location | Status |
|-----------|----------|--------|
| Org memory layer | `trajectory-drift/core/org-memory/` | Shipped |
| Decision extraction | `org-reasoning-mvp/` | Shipped |
| Team decision API | `org-reasoning-mvp/src/app/api/decisions/` | Shipped v0.8 |
| Native bridge panel | `trajectory-native/TeamDecisionMemory` | Shipped v0.8 |
| Propagation validation | `trajectory-drift/core/coordination/` | Shipped |

---

## Product behavior

1. Persist policies, incidents, patterns
2. Validate propagation across handoffs
3. Surface stale memory and repeated failures
4. Enable calibration and recovery journaling
5. Bridge personal (native) and organizational (drift) memory

---

## Framework connection

- [Decision Memory](./decision-memory.md)
- [trajectory-drift/framework/organizational-drift/](https://github.com/higuseonhye/drift/tree/main/framework/organizational-drift)
