import { computeCapitalLeverageReflection } from "@/lib/capital-leverage-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

const TRAJECTORY_LABEL = {
  building: "building slowly",
  flat: "holding steady",
  declining: "thinning out",
} as const;

export function CapitalLeverageReflection({ events }: Props) {
  const r = computeCapitalLeverageReflection(events);

  if (events.length === 0) return null;

  return (
    <Section
      id="capital-leverage-heading"
      title="What you hold"
      description="Reflection on dependency, optionality, and what you're actually accumulating — not financial advice."
    >
      <p className="text-sm leading-relaxed text-[var(--foreground)]">
        {r.summary}
      </p>

      <ul className="mt-8 space-y-3">
        {r.reflectionPrompts.map((p) => (
          <li
            key={p}
            className="border-l border-[var(--border)] pl-4 text-sm leading-relaxed text-[var(--muted)]"
          >
            {p}
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-[var(--muted)]">
        Ownership feels{" "}
        <span className="text-[var(--foreground)]">
          {TRAJECTORY_LABEL[r.ownershipTrajectory]}
        </span>
        {" · "}
        optionality {r.optionalityScore}
        {" · "}
        dependency {r.dependencyScore}
      </p>
    </Section>
  );
}
