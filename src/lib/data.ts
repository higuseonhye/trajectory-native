import type {
  CalibrationNotes,
  CalibrationReply,
  ObsessionCard,
  ReasoningTrace,
  SignalReceived,
  TimelineEvent,
  TrajectoryEntry,
  WindowDynamic,
} from "./types";

export const calibrationNotes: CalibrationNotes = {
  currentlyBelieve:
    "In AI-native markets, execution is abundant and strategic windows compress fast. The scarce resources are positioning, trajectory calibration, ecosystem proximity, and distribution timing — not raw shipping speed.",
  uncertainAbout:
    "How to log window dynamics without turning this into anxiety-driven hustle content. Survival-oriented positioning, not vanity growth.",
  watchingSignal:
    "Whether window-dynamic entries precede pivots faster than signals alone — timing pressure as leading indicator.",
  feedbackNeeded:
    "Examples where distribution urgency (not capability) determined survival in a 2–4 week window.",
  updatedAt: "2026-05-16",
};

export const windowDynamics: WindowDynamic[] = [
  {
    id: "w1",
    kind: "crowding",
    observation:
      "This direction became crowded within two weeks — three near-identical open-source repos appeared after a single viral thread.",
    timingPressure:
      "Differentiation window collapsed before feature completeness.",
    adaptation:
      "Shift thesis emphasis from capability to calibration memory + execution residue — harder to copy quickly.",
    timestamp: "2026-05-16T16:00:00Z",
  },
  {
    id: "w2",
    kind: "commoditization",
    observation:
      "Open-source replication compressed differentiation — the core workflow is now a weekend project with a popular model API.",
    timingPressure:
      "Moat weakened after model commoditization; feature parity is no longer defensible.",
    adaptation:
      "Double down on trajectory continuity and ecosystem-linked context — not the widget layer.",
    timestamp: "2026-05-16T12:00:00Z",
  },
  {
    id: "w3",
    kind: "distribution-shift",
    observation:
      "Distribution became more important than capability for this wedge — builders with reach shipped worse products and still won attention.",
    timingPressure:
      "First-mover advantage decayed in days, not quarters.",
    adaptation:
      "Explore calibration-driven distribution: public trajectory as positioning, not performance content.",
    timestamp: "2026-05-15T18:00:00Z",
  },
  {
    id: "w4",
    kind: "ecosystem-shift",
    observation:
      "The wedge changed because the market moved — platform policy shift removed the original integration path.",
    timingPressure:
      "Strategic pivot required before accumulated execution became sunk cost.",
    adaptation:
      "Logged ecosystem timing observation here before rewriting roadmap in Notion.",
    timestamp: "2026-05-15T10:00:00Z",
  },
  {
    id: "w5",
    kind: "opportunity",
    observation:
      "A narrow window opened — incumbents slow to adopt agent-native workflows; attention spike on X lasted ~72 hours.",
    timingPressure:
      "Repeated execution velocity matters more than perfect architecture in this phase.",
    adaptation:
      "Ship calibration memory MVP in core repo; defer satellite experiments.",
    timestamp: "2026-05-14T08:00:00Z",
  },
];

export const obsession: ObsessionCard = {
  exploring:
    "Strategic adaptation under compressed AI windows — calibration memory as survival layer",
  changedRecently:
    "Added window dynamics surface; core repo stays single living trajectory artifact",
  strugglingWith:
    "Balancing market-aware urgency without dopamine-driven productivity theater",
  watchingSignal:
    "Copy-cycle speed on adjacent repos vs. our trajectory calibration cadence",
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
  {
    id: "s5",
    interaction:
      "Conference hallway — 'Everyone ships now; the fight is positioning and timing'",
    signalFelt:
      "Window compression makes trajectory misalignment costlier than slow execution",
    changedAfterward:
      "Window Dynamics section added; distribution framed as survival layer not growth hack",
    timestamp: "2026-05-16T11:00:00Z",
    source: "conference",
    externalRef: {
      source: "conference",
      label: "Builder systems track — Q&A",
    },
  },
];

export const trajectoryTimeline: TimelineEvent[] = [
  {
    id: "tl0",
    kind: "window",
    title: "Direction crowded in 2 weeks",
    summary: "Open-source copy cycle compressed differentiation window",
    timestamp: "2026-05-16T16:00:00Z",
  },
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
    id: "t0",
    kind: "note",
    title: "Core repo continuity principle",
    body: "This repo is the living trajectory artifact. Satellite repos only for isolated technical spikes — always linked back to core thesis.",
    timestamp: "2026-05-16T15:00:00Z",
    tags: ["repo-strategy", "continuity"],
  },
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
    id: "r4",
    trigger:
      "Window crowded in two weeks — copy repos appeared before we finished positioning",
    insight:
      "When differentiation periods shrink, calibration memory and public trajectory become the moat — not feature lists",
    directionChange:
      "Add Window Dynamics; keep all strategic evolution in this core repo",
    timestamp: "2026-05-16T16:30:00Z",
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
