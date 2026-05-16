# Context-embedded calibration

## Origin (why this exists)

The hardest part of builder collaboration is not chat — it is **calibration inside shared context**.

People talk in Slack, but direction drifts because the conversation is detached from obsession, pivots, and reasoning. This product started from that gap:

> **티키타카는 맥락(context) 안에서 일어나야 하고,**  
> 그 과정에서 조정·calibration·방향 발전이 같이 일어나야 한다.

## What we are NOT building

| Avoid | Why |
|-------|-----|
| Global chat channel | Context leaves the object; threads orphan |
| Follower / like graph | Engagement without calibration |
| Profile-first identity | Hides trajectory and reasoning |

## What we ARE building

**Calibration threads** — short back-and-forth **anchored to a context object**:

| Anchor | Example calibration |
|--------|---------------------|
| **Obsession field** (`watchingSignal`) | "Is revisit rate the right signal?" → "Yes, measure replies-on-trace" |
| **Feed item** (`t1` pivot) | "Is obsession secondary now?" → "Both: obsession = now, feed = proof" |
| **Reasoning trace** (`r1`) | "Link Slack or SHA?" → "SHA links or calibration stays verbal" |

Replies marked `calibrated` indicate shared understanding shifted.

## Wireframe (attachment points)

```
┌─ Current obsession ─────────────────────────────┐
│  What signal I'm watching: "..."              │
│  ┌─ Calibrating · signal ──────────────────┐  │
│  │ collaborator-a: revisit rate matters   │  │
│  │ builder [calibrated]: measure replies    │  │
│  └────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘

┌─ Trajectory feed ─────────────────────────────┐
│  ● SHIFT · Pivot: profile → trajectory        │
│  ┌─ Calibrating · pivot ───────────────────┐  │
│  │ ...feed vs obsession roles...           │  │
│  └────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘

┌─ Reasoning trace ─────────────────────────────┐
│  Trigger → Insight → Direction change           │
│  ┌─ Calibrating · reasoning ────────────────┐  │
│  │ ...GitHub residue vs paraphrase...       │  │
│  └────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

## MVP implementation (v0.2)

- `CalibrationReply` type with `ContextAnchor`
- `CalibrationThread` component — rendered only when replies exist
- Seed data demonstrates multi-author calibration on three anchor types
- No compose UI yet (read-only prototype)

## Next

- [ ] Add reply from UI (still anchored, no global inbox)
- [ ] Persist calibrations in `trajectory-notes/` or JSON alongside markdown
- [ ] Link calibrated replies to GitHub PR / commit when direction changes ship
