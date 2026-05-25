import { computeMomentumMetrics } from "@/lib/momentum-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

const METRIC_KEYS = [
  ["Score", "momentumScore"],
  ["Density", "momentumDensity", "%"],
  ["Open loops", "openLoops"],
  ["Interactions", "interactionEnergy"],
  ["Entropy", "entropyAccumulation"],
  ["Recovery", "recoverySignals"],
] as const;

export function MomentumSurface({ events }: Props) {
  const m = computeMomentumMetrics(events);

  return (
    <Section
      id="momentum-heading"
      title="Momentum"
      description="Vitality vs function — are you alive, or just moving?"
    >
      <p className="mb-4 text-sm text-[var(--muted)]">{m.summary}</p>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {METRIC_KEYS.map(([label, key, suffix]) => (
          <li key={key}>
            <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
              {label}
            </p>
            <p className="mt-1 font-mono text-2xl text-[var(--foreground)]">
              {m[key]}
              {suffix ?? ""}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
