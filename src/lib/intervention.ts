import type { CompoundingMetrics } from "./compounding-engine";
import { computeEnvironmentDrift } from "./environment";
import type { MomentumMetrics } from "./momentum-engine";
import type { TrajectoryEvent } from "./trajectory-events";

export type InterventionKind =
  | "interaction_starvation"
  | "momentum_degradation"
  | "loop_fragmentation"
  | "reactive_switching"
  | "abstraction_over_action"
  | "recovery_needed"
  | "labor_drift"
  | "environmental_drift"
  | "awe_deprivation";

export interface InterventionSignal {
  kind: InterventionKind;
  severity: "low" | "medium" | "high";
  interpretation: string;
  suggestedAction: string;
}

export function detectInterventions(
  events: TrajectoryEvent[],
  metrics: MomentumMetrics,
  compounding?: CompoundingMetrics,
): InterventionSignal[] {
  const signals: InterventionSignal[] = [];

  if (metrics.interactionEnergy === 0 && events.length >= 2) {
    signals.push({
      kind: "interaction_starvation",
      severity: "high",
      interpretation: "No high-quality interactions recorded recently.",
      suggestedAction:
        "Schedule one real conversation before more solo abstraction work.",
    });
  }

  if (metrics.momentumScore < -25) {
    signals.push({
      kind: "momentum_degradation",
      severity: metrics.momentumScore < -50 ? "high" : "medium",
      interpretation: "Momentum density falling — entropy may be compounding.",
      suggestedAction:
        "Identify one smallest action that closes an open loop in the next 24h.",
    });
  }

  if (metrics.openLoops >= 2) {
    signals.push({
      kind: "loop_fragmentation",
      severity: "medium",
      interpretation: `${metrics.openLoops} unfinished loops in the window.`,
      suggestedAction: "Close or explicitly defer loops — do not add new ones.",
    });
  }

  const reactive = events.filter((e) =>
    e.tags?.includes("reactive-switch"),
  );
  if (reactive.length >= 1) {
    signals.push({
      kind: "reactive_switching",
      severity: "medium",
      interpretation: "Reactive trajectory switching detected.",
      suggestedAction: "Hold current hypothesis for a fixed window; log one failed assumption.",
    });
  }

  const avoided = events.filter((e) => e.kind === "action_avoided");
  const gains = events.filter((e) => e.kind === "momentum_gain");
  if (avoided.length > gains.length && avoided.length >= 2) {
    signals.push({
      kind: "abstraction_over_action",
      severity: "medium",
      interpretation: "High abstraction / low action density pattern.",
      suggestedAction: "Ship one outward-facing artifact before internal refinement.",
    });
  }

  if (metrics.recoverySignals === 0 && metrics.entropyAccumulation >= 2) {
    signals.push({
      kind: "recovery_needed",
      severity: "low",
      interpretation: "Entropy without recent recovery signals.",
      suggestedAction:
        "Environment reset: walk, offline block, or one non-work activation.",
    });
  }

  if (compounding?.laborDrift) {
    signals.push({
      kind: "labor_drift",
      severity: "high",
      interpretation: `Labor ratio ${compounding.laborRatio}% — ownership at ${compounding.ownershipRatio}%.`,
      suggestedAction:
        "Ship one owned asset before more labor optimization this week.",
    });
  }

  const envDrift = computeEnvironmentDrift(events);
  if (envDrift.deadRatio >= 50 && envDrift.deadCount >= 2) {
    signals.push({
      kind: "environmental_drift",
      severity: envDrift.deadRatio >= 70 ? "high" : "medium",
      interpretation: `${envDrift.deadRatio}% of recent events in dead atmospheres — vitality draining while functional.`,
      suggestedAction:
        "One environmental turn: natural light, outside walk, or a space that restores aliveness before more cognitive work.",
    });
  }

  if (envDrift.aweDeprivation) {
    signals.push({
      kind: "awe_deprivation",
      severity: "low",
      interpretation:
        "No nature, scale, or restorative atmosphere in recent events — awe contact fading.",
      suggestedAction:
        "Seek one moment of scale: coast, garden, sky, or any space that makes you feel small and alive.",
    });
  }

  if (envDrift.scrollDominance) {
    signals.push({
      kind: "environmental_drift",
      severity: "medium",
      interpretation: "Scroll-feed environment detected — sensory numbness risk.",
      suggestedAction:
        "Close the feed. One offline block or physical movement before returning to work.",
    });
  }

  return signals;
}
