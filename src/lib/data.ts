import type { ObsessionCard, ReasoningTrace, TrajectoryEntry } from "./types";

export const obsession: ObsessionCard = {
  exploring:
    "Whether repeated builder actions reveal identity better than static profiles",
  changedRecently:
    "Shifted from profile-centric UX to trajectory-first feed as the primary surface",
  strugglingWith:
    "How much structure to impose before it feels like another social network",
  watchingSignal:
    "Whether reasoning traces get revisited or only written once",
  updatedAt: "2026-05-16",
};

export const trajectoryFeed: TrajectoryEntry[] = [
  {
    id: "t1",
    kind: "shift",
    title: "Pivot: profile → trajectory",
    body: "Stopped optimizing for identity cards. The feed is now the spine — chronology over branding.",
    timestamp: "2026-05-16T10:00:00Z",
    tags: ["architecture", "thesis"],
  },
  {
    id: "t2",
    kind: "experiment",
    title: "MVP: trajectory-native workspace",
    body: "Lightweight Next.js prototype — obsession card, feed, reasoning layer. No database yet; seed data in repo.",
    timestamp: "2026-05-16T09:30:00Z",
    tags: ["mvp", "build"],
  },
  {
    id: "t3",
    kind: "focus",
    title: "Current focus",
    body: "GitHub as execution residue layer — design architecture for future commit/context linking.",
    timestamp: "2026-05-15T18:00:00Z",
    tags: ["github-native"],
  },
  {
    id: "t4",
    kind: "note",
    title: "Coordination fragmentation",
    body: "AI builders ship faster, but context-sharing and strategic alignment still feel scattered across tools.",
    timestamp: "2026-05-15T12:00:00Z",
    tags: ["thesis"],
  },
  {
    id: "t5",
    kind: "commit",
    title: "Initial scaffold",
    body: "Repository structure: docs, logs, experiments, trajectory-notes. Living artifact over polished SaaS.",
    timestamp: "2026-05-15T08:00:00Z",
    tags: ["repo"],
    githubRef: "future:abc123",
  },
];

export const reasoningTraces: ReasoningTrace[] = [
  {
    id: "r1",
    trigger: "Noticed builders rewriting context in Slack, Notion, and README separately",
    insight:
      "Context wants to live where execution happens — GitHub commits are repeated action with timestamps",
    directionChange:
      "Design for GitHub-native trajectory before adding another datastore",
    timestamp: "2026-05-16T08:00:00Z",
  },
  {
    id: "r2",
    trigger: "Profile fields felt performative in early wireframes",
    insight:
      "A chronological stream of obsessions, pivots, and experiments reads more honest than a bio",
    timestamp: "2026-05-15T16:00:00Z",
  },
];
