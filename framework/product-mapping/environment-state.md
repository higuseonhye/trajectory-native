# Environment & state — product mapping

How environment design and state design map to product — today and future.

---

## Thesis

trajectory-native / trajectory-drift is evolving toward a **trajectory-aware human environment system**.

Designing conditions where humans reconnect with awe, beauty, vitality, meaning, and intentional direction.

---

## Software layer (now)

| Module | Environment/state role |
|--------|------------------------|
| **Intervention** | Surface dead-environment patterns (scroll loops, sterile routines) |
| **Momentum / vitality** | State proxy — alive vs functioning |
| **Trajectory events** | Tag environment context (`tags: outdoor`, `natural-light`, `sterile-office`) |
| **Interaction intelligence** | Social energy — amplifiers vs drains |
| **Decision journal** | Log environmental turns ("left desk, walked coast") |
| **UI / visuals** | Warm, cinematic, sensory — not corporate productivity |

### UI direction

- Dark warm palette (current) — cinematic, not fluorescent
- Texture through typography and spacing — not flat dashboard
- Copy: embodiment, aliveness, atmosphere
- Avoid: sterile SaaS, quantified-self aesthetics

**Shipped (v0.9+):** optional `environment` on trajectory events; dead/restorative detection in Intervention + Momentum; manual log form + JSON ingest with environment fields.

---

## Data model (planned)

Extend trajectory events:

```typescript
environment?: {
  /** e.g. office, home, nature, transit, social */
  context?: string;
  /** alive | neutral | dead | restorative */
  atmosphere?: string;
};
```

Or lightweight tags: `natural-light`, `nature`, `sterile`, `cinematic-scale`, `social-warm`.

**Shipped:** optional `environment` on events; ingest + log form; drift detection in Intervention, Momentum, and trajectory-drift Environmental drift panel.

---

## Drift signals (environmental)

- prolonged sterile-indoor events
- scroll / feed environment dominance
- no nature or awe-contact in window
- repetitive dead-loop locations
- social energy drain without restoration

Feeds Drift Radar alongside cognitive drift.

---

## Physical layer (future)

Philosophy supports — not required for MVP:

| Domain | Examples |
|--------|----------|
| Spatial | Greenhouse aesthetics, warm architecture |
| Sensory | Light, scent, plants, texture, fabric |
| Hospitality | Winery / Mediterranean atmosphere, retreats |
| Objects | Furniture, fashion as trajectory artifacts |
| Ritual | Embodied practices tied to steering |

Software remains the **navigation and memory layer** for trajectory across environments.

---

## Expanded product question

> "What environment would help this person feel alive enough to choose their direction?"

Not: "What task should they complete next?"

---

## Related

- [`../../docs/environment-design.md`](../../docs/environment-design.md)
- [`../environment-design/`](../environment-design/)
- [`../state-design/`](../state-design/)
- [`daily-steering.md`](./daily-steering.md)
