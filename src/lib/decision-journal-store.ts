import {
  sampleDecisionEntries,
  type DecisionEntry,
} from "./decision-journal";
import { linkDecisionToEvents } from "./trajectory-links";
import type { TrajectoryEvent } from "./trajectory-events";

const STORAGE_KEY = "trajectory-native:decision-journal";

export function loadDecisionEntries(): DecisionEntry[] {
  if (typeof window === "undefined") return sampleDecisionEntries;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return sampleDecisionEntries;
    const parsed = JSON.parse(raw) as DecisionEntry[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : sampleDecisionEntries;
  } catch {
    return sampleDecisionEntries;
  }
}

export function saveDecisionEntries(entries: DecisionEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addDecisionEntry(entry: DecisionEntry): DecisionEntry[] {
  const current = loadDecisionEntries();
  const next = [entry, ...current];
  saveDecisionEntries(next);
  return next;
}

export function updateDecisionLinks(
  decisionId: string,
  eventIds: string[],
): DecisionEntry[] {
  const current = loadDecisionEntries();
  const next = current.map((d) =>
    d.id === decisionId ? { ...d, linkedEventIds: eventIds } : d,
  );
  saveDecisionEntries(next);
  return next;
}

export { linkDecisionToEvents };
