import { computeCompoundingMetrics } from "@/lib/compounding-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
}

const ALLOCATION_ROWS = [
  ["Ownership", "ownershipRatio"],
  ["Investment", "investmentRatio"],
  ["Labor", "laborRatio"],
  ["Consumption", "consumptionRatio"],
] as const;

export function CompoundingAnalysis({ events }: Props) {
  const c = computeCompoundingMetrics(events);

  if (c.eventCount === 0) return null;

  return (
    <Section
      id="compounding-heading"
      title="Compounding analysis"
      description="What is actually compounding — ownership, leverage, and asset accumulation."
    >
      <p className="mb-4 text-sm text-[var(--muted)]">{c.summary}</p>

      <div className="mb-6 flex items-baseline gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Compounding score
          </p>
          <p className="mt-1 font-mono text-3xl text-[var(--foreground)]">
            {c.compoundingScore}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
            Asset events
          </p>
          <p className="mt-1 font-mono text-3xl text-[var(--foreground)]">
            {c.assetEvents}
            <span className="text-base text-[var(--muted)]">
              /{c.eventCount}
            </span>
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {ALLOCATION_ROWS.map(([label, key]) => (
          <li key={key}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--muted)]">{label}</span>
              <span className="font-mono text-[var(--foreground)]">
                {c[key]}%
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all"
                style={{ width: `${c[key]}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      {c.laborDrift && (
        <p className="mt-4 border-l-2 border-[var(--accent)] pl-3 text-sm text-[var(--foreground)]">
          Labor drift detected — optimized activity without ownership
          accumulation.
        </p>
      )}
    </Section>
  );
}
