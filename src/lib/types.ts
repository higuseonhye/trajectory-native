export type TrajectoryKind =
  | "note"
  | "experiment"
  | "commit"
  | "focus"
  | "shift";

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

/** Founder operational calibration — alive, not marketing */
export interface CalibrationLogEntry {
  id: string;
  timestamp: string;
  observation: string;
  failedAssumption?: string;
  emotionalRead?: string;
  reframing?: string;
  nextAction?: string;
}

export type WeeklyChangeCategory =
  | "thesis"
  | "positioning"
  | "reframing"
  | "operational"
  | "interaction";

export interface WeeklyChange {
  id: string;
  category: WeeklyChangeCategory;
  title: string;
  body: string;
  timestamp: string;
}

export interface FailedAssumption {
  id: string;
  assumption: string;
  whatHappened: string;
  lesson: string;
  timestamp: string;
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
  /** Weak or null signal — still a calibration artifact */
  isNullSignal?: boolean;
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

/** @deprecated Prefer TrajectoryEvent in trajectory-events.ts for v0.6+ */
export type TrajectoryEventKind =
  | "interaction"
  | "action_taken"
  | "action_avoided"
  | "momentum_gain"
  | "momentum_loss"
  | "entropy_spike"
  | "energy_restore"
  | "execution_collapse"
  | "environment_alignment"
  | "loop_unfinished";

export interface CalibrationReply {
  id: string;
  anchor: ContextAnchor;
  author: string;
  body: string;
  timestamp: string;
  isCalibration?: boolean;
}
