import { computeCompoundingMetrics } from "@/lib/compounding-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

const ALLOCATION_ROWS = [
  ["What you build", "ownershipRatio"],
  ["What you plant", "investmentRatio"],
  ["What you trade time for", "laborRatio"],
  ["What you consume", "consumptionRatio"],
] as const;

export function CompoundingAnalysis({ events }: Props) {
  const c = computeCompoundingMetrics(events);

  if (c.eventCount === 0) return null;

  return (
    <Section
      id="compounding-heading"
      title="What endures"
      description="Not optimization — what quietly compounds in your life over time."
    >
      <p className="text-sm leading-relaxed text-[var(--foreground)]">
        {c.summary}
      </p>

      {c.laborDrift && (
        <p className="mt-6 border-l border-[var(--accent)]/50 pl-4 text-sm italic text-[var(--muted)]">
          Much of your recent energy went to labor without ownership — busy,
          but not accumulating.
        </p>
      )}

      <ul className="mt-10 space-y-5">
        {ALLOCATION_ROWS.map(([label, key]) => (
          <li key={key}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="text-[var(--muted)]">{label}</span>
              <span className="tabular-nums text-[var(--foreground)]">
                {c[key]}%
              </span>
            </div>
            <div className="mt-2 h-px overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]/70 transition-all"
                style={{ width: `${c[key]}%`, opacity: 0.35 + (c[key] / 100) * 0.65 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
