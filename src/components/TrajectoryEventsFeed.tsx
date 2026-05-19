import { formatRelativeTime } from "@/lib/format";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
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

export function TrajectoryEventsFeed({ events }: Props) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <Section
      id="trajectory-events-heading"
      title="Trajectory events"
      description="Atomic unit — what happened in reality, not only what was thought."
    >
      <ul className="space-y-3">
        {sorted.map((e) => (
          <li
            key={e.id}
            className="rounded border border-[var(--border)] px-4 py-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                {KIND_LABEL[e.kind]}
              </span>
              <span className="text-[11px] text-[var(--muted)]">
                {formatRelativeTime(e.timestamp)}
              </span>
            </div>
            {e.subject && (
              <p className="mt-1 text-xs text-[var(--muted)]">{e.subject}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
              {e.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
