import type { TrajectoryEvent } from "./trajectory-events";
import { sampleTrajectoryEvents } from "./trajectory-events";

const STORAGE_KEY = "trajectory-native:trajectory-events";

export function loadTrajectoryEvents(): TrajectoryEvent[] {
  if (typeof window === "undefined") return [...sampleTrajectoryEvents];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...sampleTrajectoryEvents];
    const parsed = JSON.parse(raw) as TrajectoryEvent[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : [...sampleTrajectoryEvents];
  } catch {
    return [...sampleTrajectoryEvents];
  }
}

export function saveTrajectoryEvents(events: TrajectoryEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // quota
  }
}

export function mergeTrajectoryEvents(
  existing: TrajectoryEvent[],
  incoming: TrajectoryEvent[],
): TrajectoryEvent[] {
  const byId = new Map(existing.map((e) => [e.id, e]));
  for (const e of incoming) {
    byId.set(e.id, e);
  }
  return [...byId.values()].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}
