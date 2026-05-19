import type { TrajectoryEvent } from "../trajectory-events";

export interface IngestResult {
  events: TrajectoryEvent[];
  source: string;
  merged: number;
}
