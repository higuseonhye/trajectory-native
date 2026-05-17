import type {
  CalibrationNotes,
  CalibrationReply,
  ObsessionCard,
  ReasoningTrace,
  SignalReceived,
  TimelineEvent,
  TrajectoryEntry,
} from "./types";

export const calibrationNotes: CalibrationNotes = {
  currentlyBelieve:
    "Builders need a calibration memory layer — not another place to chat. Execution lives on GitHub; reasoning and signals live elsewhere unless we capture them deliberately.",
  uncertainAbout:
    "Whether external signals (X, DMs, accelerators) can be logged lightly enough that it does not become performative journaling.",
  watchingSignal:
    "Do logged signals precede measurable trajectory shifts (obsession updates, commits, pivots)?",
  feedbackNeeded:
    "Examples of calibration moments that almost disappeared because they happened outside GitHub.",
  updatedAt: "2026-05-16",
};

export const obsession: ObsessionCard = {
  exploring:
    "Trajectory-aware calibration memory across fragmented builder ecosystems",
  changedRecently:
    "Reframed from builder social surface to calibration layer — interactions stay external, memory stays here",
  strugglingWith:
    "Capturing high-signal external moments without rebuilding Slack or X inside the product",
  watchingSignal:
    "Whether signals-received entries correlate with reasoning and commit context updates",
  updatedAt: "2026-05-16",
};

export const signalsReceived: SignalReceived[] = [
  {
    id: "s1",
    interaction:
      "Reply on X questioned whether this is 'another builder Twitter'",
    misunderstanding:
      "Assumed the goal was in-app social graph, not cross-ecosystem calibration memory",
    signalFelt:
      "Framing problem — we are not optimizing for keeping users on-platform",
    changedAfterward:
      "README and thesis rewritten around calibration memory; feed demoted below signals and timeline",
    timestamp: "2026-05-16T14:00:00Z",
    source: "x",
    externalRef: {
      source: "x",
      label: "Thread — calibration vs social",
      url: "https://x.com/example/status/1",
    },
  },
  {
    id: "s2",
    interaction:
      "Accelerator office hours: 'Where does calibration actually stick?'",
    signalFelt:
      "Calibration disappears when it stays in conversation but not in trajectory memory",
    changedAfterward:
      "Added Signals Received + explicit calibration notes structure",
    timestamp: "2026-05-15T20:00:00Z",
    source: "accelerator",
    externalRef: {
      source: "accelerator",
      label: "Office hours — batch 12",
    },
  },
  {
    id: "s3",
    interaction: "GitHub issue #4 — collaborator confused profile vs trajectory",
    misunderstanding:
      "Thought obsession card was a public profile; missed that feed is evidentiary",
    signalFelt: "Execution residue (issues, commits) and reasoning must link visibly",
    changedAfterward:
      "Started commit ↔ context linking experiment on scaffold commit entry",
    timestamp: "2026-05-15T14:30:00Z",
    source: "github",
    externalRef: {
      source: "github",
      label: "issue #4",
      url: "https://github.com/higuseonhye/trajectory-native/issues/4",
    },
  },
  {
    id: "s4",
    interaction: "DM after demo — 'I already talk on Discord, why another app?'",
    signalFelt:
      "Product must ingest ecosystem interaction by reference, not replace channels",
    changedAfterward:
      "Ecosystem reference fields on signals and reasoning traces",
    timestamp: "2026-05-14T22:00:00Z",
    source: "dm",
  },
];

export const trajectoryTimeline: TimelineEvent[] = [
  {
    id: "tl1",
    kind: "signal",
    title: "X reply reframes product",
    summary: "Not builder Twitter — calibration memory across ecosystems",
    timestamp: "2026-05-16T14:00:00Z",
  },
  {
    id: "tl2",
    kind: "calibration",
    title: "Direction shift documented",
    summary: "Optimize for trajectory evolution across ecosystem, not time-on-platform",
    timestamp: "2026-05-16T13:00:00Z",
  },
  {
    id: "tl3",
    kind: "pivot",
    title: "Social surface → calibration layer",
    summary: "Signals, timeline, notes prioritized over viral feed mechanics",
    timestamp: "2026-05-16T10:00:00Z",
  },
  {
    id: "tl4",
    kind: "reasoning",
    title: "GitHub as execution residue",
    summary: "Commits hold what shipped; this layer holds why and what changed",
    timestamp: "2026-05-16T08:00:00Z",
  },
  {
    id: "tl5",
    kind: "signal",
    title: "Accelerator calibration question",
    summary: "Where does calibration stick after conversation ends?",
    timestamp: "2026-05-15T20:00:00Z",
  },
  {
    id: "tl6",
    kind: "commit",
    title: "Initial scaffold",
    summary: "Repo structure + MVP — trajectory notes as living artifact",
    timestamp: "2026-05-15T08:00:00Z",
  },
  {
    id: "tl7",
    kind: "obsession",
    title: "Obsession shift",
    summary: "Profile-centric → trajectory-first → calibration memory",
    timestamp: "2026-05-14T12:00:00Z",
  },
];

export const trajectoryFeed: TrajectoryEntry[] = [
  {
    id: "t1",
    kind: "shift",
    title: "Pivot: social platform → calibration memory",
    body: "Stopped optimizing for in-app interaction. Capture what changed, why, and which external signal caused it.",
    timestamp: "2026-05-16T10:00:00Z",
    tags: ["direction", "thesis"],
  },
  {
    id: "t2",
    kind: "experiment",
    title: "Signals + timeline + calibration notes",
    body: "MVP v0.3 — ecosystem-external interaction capture, trajectory timeline, commit context linking.",
    timestamp: "2026-05-16T09:30:00Z",
    tags: ["mvp", "build"],
  },
  {
    id: "t3",
    kind: "focus",
    title: "Commit ↔ context residue",
    body: "GitHub stores execution; we attach why-changed, trigger, and remaining uncertainty to commits.",
    timestamp: "2026-05-15T18:00:00Z",
    tags: ["github-native"],
  },
  {
    id: "t4",
    kind: "note",
    title: "Fragmented context problem",
    body: "Communication is abundant. Persistent calibration memory and trajectory continuity are not.",
    timestamp: "2026-05-15T12:00:00Z",
    tags: ["thesis"],
  },
  {
    id: "t5",
    kind: "commit",
    title: "Initial scaffold",
    body: "Repository structure: docs, logs, experiments, trajectory-notes.",
    timestamp: "2026-05-15T08:00:00Z",
    tags: ["repo"],
    githubRef: "db84aaf",
    commitContext: {
      whyChanged: "Establish public trajectory artifact before adding calibration layer features",
      trigger: "Thesis that repeated action over time beats static builder profiles",
      uncertainty: "How much structure before it feels like another social product",
      reasoningId: "r2",
    },
  },
];

export const reasoningTraces: ReasoningTrace[] = [
  {
    id: "r1",
    trigger:
      "Builders rewrite context in Slack, Notion, README — calibration does not persist",
    insight:
      "High-signal interaction already happens on X, in DMs, at accelerators. Product must capture residue, not relocate conversation.",
    directionChange:
      "Design for ecosystem-external capture + GitHub execution linking",
    timestamp: "2026-05-16T08:00:00Z",
    externalRef: {
      source: "slack",
      label: "Internal thread — context fragmentation",
    },
  },
  {
    id: "r2",
    trigger: "Profile fields felt performative in early wireframes",
    insight:
      "Timeline of obsession shifts, signals, and pivots reveals trajectory — not a bio",
    timestamp: "2026-05-15T16:00:00Z",
  },
  {
    id: "r3",
    trigger: "GitHub issue #4 misunderstanding (see signal s3)",
    insight:
      "Issue revealed framing gap: users need visible link between execution and evolving belief",
    directionChange: "Commit context blocks on every commit-class feed item",
    timestamp: "2026-05-15T15:00:00Z",
    externalRef: {
      source: "github",
      label: "issue #4",
      url: "https://github.com/higuseonhye/trajectory-native/issues/4",
    },
  },
];

export const calibrationReplies: CalibrationReply[] = [
  {
    id: "c1",
    anchor: { type: "reasoning", id: "r1" },
    author: "collaborator-a",
    body: "Slack thread from Tuesday already argued this — capture the signal, don't copy the chat.",
    timestamp: "2026-05-16T08:20:00Z",
  },
  {
    id: "c2",
    anchor: { type: "reasoning", id: "r1" },
    author: "builder",
    body: "Agreed. Signals Received is the ingest surface; commits hold execution proof.",
    timestamp: "2026-05-16T08:35:00Z",
    isCalibration: true,
  },
  {
    id: "c5",
    anchor: { type: "obsession", id: "watchingSignal" },
    author: "builder",
    body: "Updated: track signal → timeline → obsession shift correlation.",
    timestamp: "2026-05-16T11:15:00Z",
    isCalibration: true,
  },
];
