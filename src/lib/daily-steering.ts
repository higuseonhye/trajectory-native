/** Daily steering — intentional micro-corrections, not task completion. */

export type VitalityTag = "alive" | "flat" | "numb";

export interface SteeringTurn {
  id: string;
  /** ISO timestamp when logged */
  loggedAt: string;
  /** Calendar day key YYYY-MM-DD (local) */
  dayKey: string;
  turn: string;
  vitality?: VitalityTag;
  /** Was this an environmental turn (space, light, nature)? */
  environmentTurn?: boolean;
  linkedEventId?: string;
}

export function dayKeyFromDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getTurnForDay(
  turns: SteeringTurn[],
  dayKey = dayKeyFromDate(),
): SteeringTurn | undefined {
  return turns.find((t) => t.dayKey === dayKey);
}

export function hasTurnToday(turns: SteeringTurn[]): boolean {
  return getTurnForDay(turns) !== undefined;
}
