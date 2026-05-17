# Evolving thesis

## Origin — the real problem

AI builders ship faster. The bottleneck is not execution — it is **alignment inside context**.

Conversations happen in Slack or DMs, but obsession, pivots, and reasoning live elsewhere. People exchange ideas back-and-forth, but **outside** the object they are trying to calibrate. Context fragments; direction drifts.

**This project started here:**

> Back-and-forth should happen **inside context** — where adjustment, calibration, and shared progress occur — and that is still very hard to do well.

trajectory-native is an experiment in **context-embedded calibration** — not another chat app.

## Problem observation

Builders using AI ship faster. Coordination and context-sharing do not keep pace. Context scatters across Slack, Notion, README, and memory.

## Hypothesis

**Repeated action over time** — commits, experiments, pivots, obsession updates — may reveal builder identity and intent more honestly than static profiles.

**Context-embedded calibration** — short back-and-forth anchored to obsession fields, feed items, and reasoning traces — may align direction better than side-channel chat.

## Experiment

This repository is the experiment:

1. Ship a minimal trajectory UI
2. Attach calibration threads to context objects (see [`context-calibration.md`](context-calibration.md))
3. Maintain trajectory notes in markdown alongside code
4. Iterate in public with meaningful commits

## Design tension (resolved)

| Looks conflicting | Actually compatible |
|-----------------|---------------------|
| "No real-time chat" | Calibration on objects, not channels |
| "No social graph" | Multi-author replies on shared context |
| "Trajectory over profile" | Identity emerges from feed + calibration history |

## Success signals (early)

- Reasoning traces get **revisited and replied to**, not just written
- Calibrated replies correlate with real direction changes (commits, obsession updates)
- Obsession card updates follow calibration threads

## Failure modes to watch

- Becomes another microblog
- Calibration devolves into Slack-style threads without object anchor
- GitHub integration never ships and residue stays manual

*Last updated: 2026-05-16*
