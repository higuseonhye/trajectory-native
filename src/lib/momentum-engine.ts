import type { TrajectoryEvent } from "./trajectory-events";

export interface MomentumMetrics {
  /** Net momentum score from recent events (-100 to 100 scale). */
  momentumScore: number;
  momentumDensity: number;
  entropyAccumulation: number;
  openLoops: number;
  interactionEnergy: number;
  recoverySignals: number;
  summary: string;
}

const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export function computeMomentumMetrics(
  events: TrajectoryEvent[],
  now = Date.now(),
): MomentumMetrics {
  const recent = events.filter(
    (e) => now - new Date(e.timestamp).getTime() <= WINDOW_MS,
  );

  const deltas = recent.map((e) => e.momentumDelta ?? 0);
  const net = deltas.reduce((a, b) => a + b, 0);
  const momentumScore = Math.max(-100, Math.min(100, net * 18));

  const positive = recent.filter((e) => (e.momentumDelta ?? 0) > 0).length;
  const momentumDensity =
    recent.length > 0 ? Math.round((positive / recent.length) * 100) : 50;

  const entropyAccumulation = recent.filter(
    (e) =>
      e.kind === "entropy_spike" ||
      e.kind === "execution_collapse" ||
      (e.momentumDelta ?? 0) < 0,
  ).length;

  const openLoops = recent.filter(
    (e) => e.kind === "loop_unfinished" || e.kind === "action_avoided",
  ).length;

  const interactionEnergy = recent.filter((e) => e.kind === "interaction").length;

  const recoverySignals = recent.filter(
    (e) => e.kind === "energy_restore" || e.kind === "momentum_gain",
  ).length;

  let summary = "Momentum stable — loops closing in reality.";
  if (momentumScore < -30) {
    summary = "Momentum degrading — entropy outpacing interaction.";
  } else if (openLoops >= 2) {
    summary = "Unfinished loops accumulating — action propagation slowing.";
  } else if (interactionEnergy === 0 && recent.length >= 3) {
    summary = "Interaction starvation — isolation risk rising.";
  }

  return {
    momentumScore,
    momentumDensity,
    entropyAccumulation,
    openLoops,
    interactionEnergy,
    recoverySignals,
    summary,
  };
}
