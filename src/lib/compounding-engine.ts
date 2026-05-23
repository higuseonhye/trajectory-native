import {
  classifyAllocation,
  type AllocationKind,
} from "./ownership-classifier";
import type { TrajectoryEvent } from "./trajectory-events";

export interface CompoundingMetrics {
  /** Net compounding score (-100 to 100). */
  compoundingScore: number;
  ownershipRatio: number;
  laborRatio: number;
  consumptionRatio: number;
  investmentRatio: number;
  laborDrift: boolean;
  assetEvents: number;
  eventCount: number;
  summary: string;
  allocationBreakdown: Record<AllocationKind, number>;
}

const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const WEIGHTS: Record<AllocationKind, number> = {
  ownership: 2,
  investment: 1,
  labor: -1,
  consumption: -2,
};

export function computeCompoundingMetrics(
  events: TrajectoryEvent[],
  now = Date.now(),
): CompoundingMetrics {
  const recent = events.filter(
    (e) => now - new Date(e.timestamp).getTime() <= WINDOW_MS,
  );

  const breakdown: Record<AllocationKind, number> = {
    labor: 0,
    ownership: 0,
    consumption: 0,
    investment: 0,
  };

  for (const event of recent) {
    breakdown[classifyAllocation(event)]++;
  }

  const total = recent.length || 1;
  const ownershipRatio = Math.round((breakdown.ownership / total) * 100);
  const laborRatio = Math.round((breakdown.labor / total) * 100);
  const consumptionRatio = Math.round((breakdown.consumption / total) * 100);
  const investmentRatio = Math.round((breakdown.investment / total) * 100);

  let weighted = 0;
  for (const [kind, count] of Object.entries(breakdown) as [
    AllocationKind,
    number,
  ][]) {
    weighted += count * WEIGHTS[kind];
  }
  const compoundingScore = Math.max(
    -100,
    Math.min(100, Math.round((weighted / total) * 40)),
  );

  const assetEvents = recent.filter((e) => {
    const a = classifyAllocation(e);
    return a === "ownership" || a === "investment";
  }).length;

  const laborDrift =
    laborRatio >= 50 &&
    ownershipRatio < 25 &&
    recent.length >= 3;

  let summary = "Allocation balanced — ownership and investment present.";
  if (laborDrift) {
    summary =
      "Labor drift — high labor ratio, low ownership accumulation.";
  } else if (consumptionRatio >= 40) {
    summary =
      "Consumption-heavy window — creation and ownership lagging.";
  } else if (ownershipRatio >= 40) {
    summary = "Ownership building — assets and leverage accumulating.";
  } else if (compoundingScore < -20) {
    summary = "Non-compounding pattern — activity without asset creation.";
  }

  return {
    compoundingScore,
    ownershipRatio,
    laborRatio,
    consumptionRatio,
    investmentRatio,
    laborDrift,
    assetEvents,
    eventCount: recent.length,
    summary,
    allocationBreakdown: breakdown,
  };
}
