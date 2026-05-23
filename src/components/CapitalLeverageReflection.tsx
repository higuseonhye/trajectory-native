import { computeCapitalLeverageReflection } from "@/lib/capital-leverage-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

const TRAJECTORY_LABEL = {
  building: "building",
  flat: "flat",
  declining: "declining",
} as const;

export function CapitalLeverageReflection({ events }: Props) {
  const r = computeCapitalLeverageReflection(events);

  if (events.length === 0) return null;

  return (
    <Section
      id="capital-leverage-heading"
      title="Capital & leverage reflection"
      description="Behavioral allocation — not investment advice. Where leverage accumulates vs dissipates."
    >
      <p className="mb-4 text-sm text-[var(--muted)]">{r.summary}</p>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Dependency
          </p>
          <p className="mt-1 font-mono text-2xl text-[var(--foreground)]">
            {r.dependencyScore}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Optionality
          </p>
          <p className="mt-1 font-mono text-2xl text-[var(--foreground)]">
            {r.optionalityScore}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Ownership trajectory
          </p>
          <p className="mt-1 font-mono text-sm uppercase text-[var(--accent)]">
            {TRAJECTORY_LABEL[r.ownershipTrajectory]}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Dominant leverage
          </p>
          <p className="mt-1 font-mono text-sm text-[var(--foreground)]">
            {r.dominantLeverage}
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-4">
        <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
          Reflection prompts
        </p>
        <ul className="mt-2 space-y-2">
          {r.reflectionPrompts.map((p) => (
            <li
              key={p}
              className="border-l-2 border-[var(--border)] pl-3 text-sm text-[var(--foreground)]"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
