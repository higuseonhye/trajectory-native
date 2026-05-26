import {
  ENVIRONMENT_ATMOSPHERE_LABELS,
  ENVIRONMENT_CONTEXT_LABELS,
} from "@/lib/environment";
import { formatRelativeTime } from "@/lib/format";
import {
  ALLOCATION_LABELS,
  classifyAllocation,
} from "@/lib/ownership-classifier";
import { findDecisionForEvent } from "@/lib/trajectory-links";
import type { DecisionEntry } from "@/lib/decision-journal";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
  decisions: DecisionEntry[];
}

const KIND_LABEL: Record<TrajectoryEvent["kind"], string> = {
  interaction: "interaction",
  action_taken: "action",
  action_avoided: "avoided",
  momentum_gain: "momentum +",
  momentum_loss: "momentum −",
  entropy_spike: "entropy",
  energy_restore: "recovery",
  execution_collapse: "collapse",
  environment_alignment: "environment",
  loop_unfinished: "open loop",
};

export function TrajectoryEventsFeed({ events, decisions }: Props) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <Section
      id="trajectory-events-heading"
      title="Trajectory events"
      description="Atomic unit — what happened in reality, including where and what atmosphere."
    >
      <ul className="space-y-3">
        {sorted.map((e) => {
          const allocation = classifyAllocation(e);
          const linked = findDecisionForEvent(e.id, decisions);
          return (
          <li
            key={e.id}
            className="rounded border border-[var(--border)] px-4 py-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                  {KIND_LABEL[e.kind]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  {ALLOCATION_LABELS[allocation]}
                </span>
              </div>
              <span className="text-[11px] text-[var(--muted)]">
                {formatRelativeTime(e.timestamp)}
              </span>
            </div>
            {e.environment && (
              <p className="mt-2 text-xs text-[var(--muted)]">
                {e.environment.context &&
                  ENVIRONMENT_CONTEXT_LABELS[e.environment.context]}
                {e.environment.atmosphere && (
                  <>
                    {" · "}
                    {ENVIRONMENT_ATMOSPHERE_LABELS[e.environment.atmosphere]}
                  </>
                )}
                {e.environment.tags?.length ? (
                  <> · {e.environment.tags.join(", ")}</>
                ) : null}
              </p>
            )}
            {e.subject && (
              <p className="mt-1 text-xs text-[var(--muted)]">{e.subject}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
              {e.description}
            </p>
            {linked && (
              <p className="mt-2 text-xs text-[var(--accent)]">
                → decision: {linked.statement.slice(0, 72)}
                {linked.statement.length > 72 ? "…" : ""}
              </p>
            )}
          </li>
          );
        })}
      </ul>
    </Section>
  );
}
