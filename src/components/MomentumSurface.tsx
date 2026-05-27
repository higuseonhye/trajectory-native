import { computeEnvironmentDrift } from "@/lib/environment";
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
  const env = computeEnvironmentDrift(events);

  let envNote: string | null = null;
  if (env.deadRatio >= 50 && env.deadCount >= 2) {
    envNote = `${env.deadRatio}% of recent events in dead atmospheres — environment may be draining vitality.`;
  } else if (env.restorativeCount >= 1 && env.deadCount === 0) {
    envNote = "Recent environments lean restorative — aliveness contact present.";
  }

  return (
    <Section
      id="momentum-heading"
      title="Rhythm"
      description="Vitality vs functioning — are you alive, or just moving through the day?"
    >
      <p className="mb-4 text-sm text-[var(--muted)]">{m.summary}</p>
      {envNote && (
        <p className="mb-4 text-sm italic text-[var(--muted)]">{envNote}</p>
      )}
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
