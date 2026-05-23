import { computeCompoundingMetrics } from "./compounding-engine";
import { classifyAllocation } from "./ownership-classifier";
import type { TrajectoryEvent } from "./trajectory-events";

export type OwnershipTrajectory = "building" | "flat" | "declining";

export interface CapitalLeverageReflection {
  dependencyScore: number;
  optionalityScore: number;
  leverageAccumulating: boolean;
  dominantLeverage: string;
  ownershipTrajectory: OwnershipTrajectory;
  reflectionPrompts: string[];
  summary: string;
}

const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function inferLeverageType(event: TrajectoryEvent): string {
  const desc = event.description.toLowerCase();
  if (/shipped|code|product|deploy/i.test(desc)) return "code";
  if (/audience|post|content|distribution/i.test(desc)) return "media";
  if (/system|process|automation|infrastructure/i.test(desc)) return "systems";
  if (/pair|team|delegate|agent/i.test(desc)) return "delegation";
  if (/walk|health|energy|recovery/i.test(desc)) return "health";
  return "judgment";
}

export function computeCapitalLeverageReflection(
  events: TrajectoryEvent[],
  now = Date.now(),
): CapitalLeverageReflection {
  const compounding = computeCompoundingMetrics(events, now);
  const recent = events.filter(
    (e) => now - new Date(e.timestamp).getTime() <= WINDOW_MS,
  );

  const dependencyScore = Math.min(
    100,
    compounding.laborRatio + Math.round(compounding.consumptionRatio * 0.5),
  );
  const optionalityScore = Math.max(
    0,
    100 - dependencyScore + Math.round(compounding.ownershipRatio * 0.3),
  );

  const leverageCounts = new Map<string, number>();
  for (const e of recent) {
    const a = classifyAllocation(e);
    if (a === "ownership" || a === "investment") {
      const lt = inferLeverageType(e);
      leverageCounts.set(lt, (leverageCounts.get(lt) ?? 0) + 1);
    }
  }

  let dominantLeverage = "none";
  let max = 0;
  for (const [k, v] of leverageCounts) {
    if (v > max) {
      max = v;
      dominantLeverage = k;
    }
  }

  const leverageAccumulating =
    compounding.ownershipRatio >= 25 || compounding.assetEvents >= 2;

  let ownershipTrajectory: OwnershipTrajectory = "flat";
  if (compounding.ownershipRatio >= 30 && compounding.compoundingScore > 0) {
    ownershipTrajectory = "building";
  } else if (compounding.laborDrift || compounding.compoundingScore < -15) {
    ownershipTrajectory = "declining";
  }

  const reflectionPrompts: string[] = [];
  if (compounding.laborDrift) {
    reflectionPrompts.push(
      "What owned asset could you ship before more labor optimization?",
    );
  }
  if (compounding.consumptionRatio >= 30) {
    reflectionPrompts.push(
      "Which consumption this week produced no reusable output?",
    );
  }
  if (ownershipTrajectory === "building") {
    reflectionPrompts.push(
      "What from this week would still matter in 5 years?",
    );
  } else {
    reflectionPrompts.push(
      "Is effort compounding or resetting each project?",
    );
  }
  reflectionPrompts.push(
    "Are you building ownership or renting your trajectory?",
  );

  let summary = "Optionality stable — mixed allocation with some leverage signals.";
  if (ownershipTrajectory === "building") {
    summary = "Ownership trajectory building — leverage accumulating.";
  } else if (ownershipTrajectory === "declining") {
    summary = "Dependency rising — labor and consumption outpacing ownership.";
  } else if (!leverageAccumulating) {
    summary = "Flat trajectory — activity without leverage accumulation.";
  }

  return {
    dependencyScore,
    optionalityScore: Math.min(100, optionalityScore),
    leverageAccumulating,
    dominantLeverage,
    ownershipTrajectory,
    reflectionPrompts: reflectionPrompts.slice(0, 3),
    summary,
  };
}
