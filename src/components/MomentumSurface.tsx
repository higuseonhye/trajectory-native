import { computeEnvironmentDrift } from "@/lib/environment";
import { computeMomentumMetrics } from "@/lib/momentum-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

function vitalityWord(score: number): string {
  if (score > 25) return "returning";
  if (score < -25) return "fading";
  return "steady";
}

export function MomentumSurface({ events }: Props) {
  const m = computeMomentumMetrics(events);
  const env = computeEnvironmentDrift(events);

  let envNote: string | null = null;
  if (env.deadRatio >= 50 && env.deadCount >= 2) {
    envNote = `Many recent moments happened in dead atmospheres — the room may be draining you.`;
  } else if (env.restorativeCount >= 1 && env.deadCount === 0) {
    envNote = "Some restorative contact in recent environments — aliveness is present.";
  }

  const vitality = vitalityWord(m.momentumScore);

  return (
    <Section
      id="momentum-heading"
      title="Rhythm"
      description="Vitality vs functioning — are you alive, or just moving through the day?"
    >
      <p className="text-sm leading-relaxed text-[var(--foreground)]">
        {m.summary}
      </p>

      <p className="mt-6 text-sm text-[var(--muted)]">
        Vitality feels{" "}
        <span className="text-[var(--foreground)]">{vitality}</span>
        {m.openLoops > 0 && (
          <>
            {" "}
            · {m.openLoops} open loop{m.openLoops > 1 ? "s" : ""} still waiting
          </>
        )}
        {m.recoverySignals > 0 && (
          <>
            {" "}
            · {m.recoverySignals} moment{m.recoverySignals > 1 ? "s" : ""} of
            recovery
          </>
        )}
      </p>

      {envNote && (
        <p className="mt-4 text-sm italic leading-relaxed text-[var(--muted)]">
          {envNote}
        </p>
      )}
    </Section>
  );
}
