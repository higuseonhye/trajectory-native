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
