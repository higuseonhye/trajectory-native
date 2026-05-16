import type {
  CalibrationReply,
  ObsessionCard,
  ReasoningTrace,
  TrajectoryEntry,
} from "./types";

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

/** Context-embedded calibration — short back-and-forth on specific objects */
export const calibrationReplies: CalibrationReply[] = [
  {
    id: "c1",
    anchor: { type: "reasoning", id: "r1" },
    author: "collaborator-a",
    body: "Slack thread from Tuesday already argued this — can we link that commit series instead of rewriting?",
    timestamp: "2026-05-16T08:20:00Z",
  },
  {
    id: "c2",
    anchor: { type: "reasoning", id: "r1" },
    author: "builder",
    body: "Agreed. Treating commits as residue means the feed item should point at SHAs, not paraphrase.",
    timestamp: "2026-05-16T08:35:00Z",
    isCalibration: true,
  },
  {
    id: "c3",
    anchor: { type: "reasoning", id: "r1" },
    author: "collaborator-a",
    body: "Then Layer 2 is priority — without SHA links, calibration stays verbal.",
    timestamp: "2026-05-16T08:42:00Z",
    isCalibration: true,
  },
  {
    id: "c4",
    anchor: { type: "reasoning", id: "r2" },
    author: "collaborator-b",
    body: "Honest chronology — does that include failed experiments or only published pivots?",
    timestamp: "2026-05-15T17:00:00Z",
  },
  {
    id: "c5",
    anchor: { type: "obsession", id: "watchingSignal" },
    author: "collaborator-a",
    body: "Revisit rate matters — if traces are write-once, the reasoning layer is just a diary.",
    timestamp: "2026-05-16T11:00:00Z",
  },
  {
    id: "c6",
    anchor: { type: "obsession", id: "watchingSignal" },
    author: "builder",
    body: "Signal updated: we'll measure replies-on-trace, not page views. That's the calibration loop.",
    timestamp: "2026-05-16T11:15:00Z",
    isCalibration: true,
  },
  {
    id: "c7",
    anchor: { type: "feed", id: "t1" },
    author: "collaborator-b",
    body: "Feed as spine — does obsession card become secondary or still the 'now' surface?",
    timestamp: "2026-05-16T10:15:00Z",
  },
  {
    id: "c8",
    anchor: { type: "feed", id: "t1" },
    author: "builder",
    body: "Both. Obsession = compressed now; feed = proof over time. Calibration can happen on either.",
    timestamp: "2026-05-16T10:22:00Z",
    isCalibration: true,
  },
];
