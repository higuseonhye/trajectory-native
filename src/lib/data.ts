import type {
  CalibrationLogEntry,
  CalibrationNotes,
  CalibrationReply,
  FailedAssumption,
  ObsessionCard,
  ReasoningTrace,
  SignalReceived,
  TimelineEvent,
  TrajectoryEntry,
  WeeklyChange,
  WindowDynamic,
} from "./types";

export const calibrationLog: CalibrationLogEntry[] = [
  {
    id: "log1",
    timestamp: "2026-05-17T10:00:00Z",
    observation:
      "Posted on X. Almost no engagement on GitHub or X. Silence is loud.",
    failedAssumption:
      "Builders would react to abstract trajectory framing without operational tension visible in the product.",
    emotionalRead:
      "Not embarrassment — more like 'the market is telling me something I did not instrument.'",
    reframing:
      "No reaction is still a signal. Null signals belong in the calibration layer.",
    nextAction:
      "Ship v0.5: founder calibration log, failed assumptions, observable weekly movement.",
  },
  {
    id: "log2",
    timestamp: "2026-05-16T18:00:00Z",
    observation:
      "The repo reads conceptually strong but interaction surfaces feel thin — thesis without lived adaptation visible.",
    emotionalRead: "Founder isolation — building in public without visible calibration loop yet.",
    reframing:
      "Optimize for observability of adaptation, not virality. The artifact is the operating surface.",
    nextAction: "Demote thesis blocks; promote operational logs and signal→action pairs.",
  },
  {
    id: "log3",
    timestamp: "2026-05-16T12:00:00Z",
    observation:
      "Compressed window: adjacent repos appeared within two weeks of a public thread.",
    failedAssumption: "We had more time to position before copy cycles caught up.",
    nextAction: "Log window dynamics explicitly; tie pivots to market movement.",
  },
  {
    id: "log4",
    timestamp: "2026-05-15T09:00:00Z",
    observation:
      "Accelerator question: where does calibration stick after conversation ends?",
    reframing: "Conversation is not the product — persistent calibration memory is.",
    nextAction: "Signals received + ecosystem references, not in-app chat.",
  },
];

export const weeklyChanges: WeeklyChange[] = [
  {
    id: "wc1",
    category: "reframing",
    title: "Null signal became first-class",
    body: "No X/GitHub engagement → shift from abstract thesis UI to founder calibration operating surface (v0.5).",
    timestamp: "2026-05-17T10:00:00Z",
  },
  {
    id: "wc2",
    category: "positioning",
    title: "Thesis-heavy → adaptation-visible",
    body: "Product is now measured by observable strategic movement, not conceptual completeness.",
    timestamp: "2026-05-17T08:00:00Z",
  },
  {
    id: "wc3",
    category: "operational",
    title: "Signals → action loop strengthened",
    body: "Weak signals render as calibration artifacts with explicit Action column.",
    timestamp: "2026-05-16T20:00:00Z",
  },
  {
    id: "wc4",
    category: "thesis",
    title: "Window dynamics + core repo continuity",
    body: "Single living artifact; satellite repos only for isolated spikes. Market timing logged explicitly.",
    timestamp: "2026-05-16T14:00:00Z",
  },
  {
    id: "wc5",
    category: "interaction",
    title: "First public X post",
    body: "Short post, calibration-memory framing. Engagement minimal — logged as signal s0.",
    timestamp: "2026-05-16T16:00:00Z",
  },
];

export const failedAssumptions: FailedAssumption[] = [
  {
    id: "fa1",
    assumption:
      "Builders will react to abstract trajectory concepts on X/GitHub",
    whatHappened:
      "Near-zero external engagement after first post. Abstract framing did not create operational tension.",
    lesson:
      "Interaction requires observable founder adaptation — logs, failed assumptions, weekly movement.",
    timestamp: "2026-05-17T10:00:00Z",
  },
  {
    id: "fa2",
    assumption: "Virality or replies indicate calibration quality",
    whatHappened: "Silence after shipping v0.3/v0.4 surfaces. Repo stars quiet.",
    lesson:
      "Null signals are calibration inputs. Optimize observability of adaptation, not engagement metrics.",
    timestamp: "2026-05-17T09:00:00Z",
  },
  {
    id: "fa3",
    assumption: "More thesis sections = clearer product",
    whatHappened:
      "Conceptually strong README; weak sense of live founder movement.",
    lesson:
      "Strategic console beats manifesto. Show what changed this week, not only what we believe.",
    timestamp: "2026-05-16T18:00:00Z",
  },
];

export const calibrationNotes: CalibrationNotes = {
  currentlyBelieve:
    "Founder adaptation must be observable in the artifact itself — especially when external reaction is weak.",
  uncertainAbout:
    "Whether public calibration logs attract the right collaborators or feel too exposed.",
  watchingSignal:
    "Does logging null signals increase my own calibration velocity faster than waiting for replies?",
  feedbackNeeded:
    "Examples of founders who ship adaptation logs that feel operational, not performative.",
  updatedAt: "2026-05-17",
};

export const windowDynamics: WindowDynamic[] = [
  {
    id: "w1",
    kind: "crowding",
    observation:
      "Direction crowded within two weeks — near-identical OSS repos after one viral thread.",
    timingPressure: "Differentiation window collapsed before feature completeness.",
    adaptation: "Shift from capability story to calibration memory + execution residue.",
    timestamp: "2026-05-16T16:00:00Z",
  },
  {
    id: "w2",
    kind: "commoditization",
    observation: "Open-source replication compressed differentiation.",
    timingPressure: "Feature parity is no longer a moat.",
    adaptation: "Trajectory continuity over widget layer.",
    timestamp: "2026-05-16T12:00:00Z",
  },
];

export const obsession: ObsessionCard = {
  exploring: "Observable founder calibration under weak external signal",
  changedRecently:
    "v0.5 — calibration log, weekly changes, failed assumptions; silence as signal",
  strugglingWith:
    "Exposure vs. operational honesty — logging isolation without performance theater",
  watchingSignal: "Whether public adaptation logs create ecosystem pull without virality",
  updatedAt: "2026-05-17",
};

export const signalsReceived: SignalReceived[] = [
  {
    id: "s0",
    interaction:
      "First X post + repo link. Views unclear; no replies, no GitHub issues, no stars spike.",
    signalFelt: "Null signal — market did not meet abstract framing where it lives.",
    changedAfterward:
      "Shift from thesis-heavy artifact → founder calibration operating surface. Log silence as s0.",
    timestamp: "2026-05-17T10:00:00Z",
    source: "x",
    isNullSignal: true,
    externalRef: { source: "x", label: "Launch post — May 17" },
  },
  {
    id: "s1",
    interaction: "Earlier X thread questioned 'another builder Twitter'",
    misunderstanding: "Assumed in-app social graph vs calibration memory",
    signalFelt: "Framing gap on what we optimize for",
    changedAfterward: "Reframed as ecosystem-external calibration layer",
    timestamp: "2026-05-16T14:00:00Z",
    source: "x",
  },
  {
    id: "s2",
    interaction: "Accelerator: where does calibration stick?",
    signalFelt: "Calibration disappears when conversation ends",
    changedAfterward: "Signals received structure + persistent memory",
    timestamp: "2026-05-15T20:00:00Z",
    source: "accelerator",
  },
  {
    id: "s3",
    interaction: "GitHub issue #4 — profile vs trajectory confusion",
    signalFelt: "Execution and belief must link visibly",
    changedAfterward: "Commit ↔ context linking",
    timestamp: "2026-05-15T14:30:00Z",
    source: "github",
    externalRef: {
      source: "github",
      label: "issue #4",
      url: "https://github.com/higuseonhye/trajectory-native/issues/4",
    },
  },
];

export const trajectoryTimeline: TimelineEvent[] = [
  {
    id: "tl-v5",
    kind: "calibration",
    title: "v0.5 founder operating surface",
    summary: "Calibration log, weekly changes, failed assumptions, null signal loop",
    timestamp: "2026-05-17T10:00:00Z",
  },
  {
    id: "tl0",
    kind: "window",
    title: "Direction crowded in 2 weeks",
    summary: "Copy cycle compressed differentiation",
    timestamp: "2026-05-16T16:00:00Z",
  },
  {
    id: "tl1",
    kind: "signal",
    title: "First X post",
    summary: "Minimal engagement — logged as calibration signal",
    timestamp: "2026-05-16T16:00:00Z",
  },
];

export const trajectoryFeed: TrajectoryEntry[] = [
  {
    id: "t-v5",
    kind: "experiment",
    title: "v0.5 — founder adaptation surface",
    body: "Calibration log, what changed this week, failed assumptions, signals→action, why SF note.",
    timestamp: "2026-05-17T10:30:00Z",
    tags: ["v0.5", "build"],
    githubRef: "pending",
  },
  {
    id: "t0",
    kind: "note",
    title: "Core repo continuity",
    body: "One living trajectory artifact. No repo per idea.",
    timestamp: "2026-05-16T15:00:00Z",
    tags: ["repo-strategy"],
  },
];

export const reasoningTraces: ReasoningTrace[] = [
  {
    id: "r5",
    trigger: "No external engagement after public post (signal s0)",
    insight:
      "Weak reaction is data. The product should make founder adaptation visible even when the ecosystem is quiet.",
    directionChange:
      "v0.5 prioritizes calibration log and failed assumptions over thesis expansion",
    timestamp: "2026-05-17T10:00:00Z",
    externalRef: { source: "x", label: "Null signal — May 17" },
  },
  {
    id: "r1",
    trigger: "Context fragments across Slack, Notion, README",
    insight: "Capture residue where interaction already happens",
    directionChange: "Ecosystem-external capture + GitHub linking",
    timestamp: "2026-05-16T08:00:00Z",
  },
];

export const calibrationReplies: CalibrationReply[] = [];
