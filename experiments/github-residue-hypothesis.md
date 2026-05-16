# Experiment: GitHub as execution residue

## Hypothesis

Commits are already a trajectory — timestamped, attributed, diff-backed. Linking feed items to SHAs may ground builder narrative in execution truth.

## Method

1. Add `githubRef` field to trajectory types (done in v0.1)
2. Manually tag seed commit entries
3. Later: ingest real commits via API

## Success criteria

- Feed feels more credible when commit items link to real diffs
- Reasoning traces can reference "what shipped" not just "what was said"

## Status

`planned` — field exists, integration not built
