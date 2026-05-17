export type TrajectoryKind =
  | "note"
  | "experiment"
  | "commit"
  | "focus"
  | "shift";

/** External ecosystem where high-signal interaction occurred */
export type SignalSource =
  | "x"
  | "github"
  | "discord"
  | "slack"
  | "dm"
  | "accelerator"
  | "conference"
  | "other";

export interface EcosystemReference {
  source: SignalSource;
  label: string;
  url?: string;
}

export interface CommitContext {
  whyChanged: string;
  trigger: string;
  uncertainty?: string;
  /** Links to reasoning trace or signal */
  reasoningId?: string;
  signalId?: string;
}

export interface TrajectoryEntry {
  id: string;
  kind: TrajectoryKind;
  title: string;
  body: string;
  timestamp: string;
  tags?: string[];
  githubRef?: string;
  commitContext?: CommitContext;
}

export interface ObsessionCard {
  exploring: string;
  changedRecently: string;
  strugglingWith: string;
  watchingSignal: string;
  updatedAt: string;
}

export interface CalibrationNotes {
  currentlyBelieve: string;
  uncertainAbout: string;
  watchingSignal: string;
  feedbackNeeded: string;
  updatedAt: string;
}

export interface SignalReceived {
  id: string;
  interaction: string;
  misunderstanding?: string;
  signalFelt: string;
  changedAfterward: string;
  timestamp: string;
  source: SignalSource;
  externalRef?: EcosystemReference;
}

export interface ReasoningTrace {
  id: string;
  trigger: string;
  insight: string;
  directionChange?: string;
  timestamp: string;
  externalRef?: EcosystemReference;
}

export type WindowDynamicKind =
  | "crowding"
  | "commoditization"
  | "distribution-shift"
  | "moat-decay"
  | "timing-pressure"
  | "ecosystem-shift"
  | "opportunity";

/** Market timing and strategic window observations — AI-era compression */
export interface WindowDynamic {
  id: string;
  kind: WindowDynamicKind;
  observation: string;
  timingPressure?: string;
  adaptation?: string;
  timestamp: string;
}

export type TimelineEventKind =
  | "signal"
  | "calibration"
  | "reasoning"
  | "pivot"
  | "obsession"
  | "commit"
  | "window";

export interface TimelineEvent {
  id: string;
  kind: TimelineEventKind;
  title: string;
  summary: string;
  timestamp: string;
}

export type ContextAnchorType = "reasoning" | "obsession" | "feed";

export interface ContextAnchor {
  type: ContextAnchorType;
  id: string;
}

export interface CalibrationReply {
  id: string;
  anchor: ContextAnchor;
  author: string;
  body: string;
  timestamp: string;
  isCalibration?: boolean;
}
