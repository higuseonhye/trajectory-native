export type TrajectoryKind =
  | "note"
  | "experiment"
  | "commit"
  | "focus"
  | "shift";

export interface TrajectoryEntry {
  id: string;
  kind: TrajectoryKind;
  title: string;
  body: string;
  timestamp: string;
  tags?: string[];
  /** Future: link to GitHub commit SHA or PR */
  githubRef?: string;
}

export interface ObsessionCard {
  exploring: string;
  changedRecently: string;
  strugglingWith: string;
  watchingSignal: string;
  updatedAt: string;
}

export interface ReasoningTrace {
  id: string;
  trigger: string;
  insight: string;
  directionChange?: string;
  timestamp: string;
}

/** Where calibration (context-embedded back-and-forth) attaches */
export type ContextAnchorType = "reasoning" | "obsession" | "feed";

export interface ContextAnchor {
  type: ContextAnchorType;
  /** reasoning id | feed entry id | obsession field key */
  id: string;
}

/** Short reply anchored to a context object — not global chat */
export interface CalibrationReply {
  id: string;
  anchor: ContextAnchor;
  author: string;
  body: string;
  timestamp: string;
  /** Marks a reply that shifted shared understanding */
  isCalibration?: boolean;
}
