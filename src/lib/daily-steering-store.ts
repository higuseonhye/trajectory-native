import type { SteeringTurn } from "./daily-steering";

const STORAGE_KEY = "trajectory-native:daily-steering";

export function loadSteeringTurns(): SteeringTurn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SteeringTurn[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSteeringTurns(turns: SteeringTurn[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turns));
  } catch {
    // quota
  }
}

export function addSteeringTurn(turn: SteeringTurn): SteeringTurn[] {
  const existing = loadSteeringTurns().filter((t) => t.dayKey !== turn.dayKey);
  const next = [turn, ...existing].sort(
    (a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime(),
  );
  saveSteeringTurns(next);
  return next;
}
