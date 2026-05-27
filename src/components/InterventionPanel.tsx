import { detectInterventions } from "@/lib/intervention";
import { computeCompoundingMetrics } from "@/lib/compounding-engine";
import { computeMomentumMetrics } from "@/lib/momentum-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

export function InterventionPanel({ events }: Props) {
  const metrics = computeMomentumMetrics(events);
  const compounding = computeCompoundingMetrics(events);
  const signals = detectInterventions(events, metrics, compounding);

  if (signals.length === 0) return null;

  return (
    <Section
      id="intervention-heading"
      title="A quiet notice"
      description="When rhythm fades — a gentle reflection, and one subtle turn toward return."
    >
      <ul className="space-y-4">
        {signals.map((s) => (
          <li
            key={s.kind}
            className="border-l-2 border-[var(--accent)] pl-4"
          >
            <p className="text-sm text-[var(--foreground)]">
              {s.interpretation}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              → {s.suggestedAction}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
