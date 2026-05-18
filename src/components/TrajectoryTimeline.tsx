import type { TimelineEvent } from "@/lib/types";
import { formatDate, formatTimelineKind } from "@/lib/format";

const kindStyles: Record<string, string> = {
  signal: "bg-[var(--kind-shift)]",
  calibration: "bg-[var(--accent)]",
  reasoning: "bg-[var(--kind-experiment)]",
  pivot: "bg-[var(--kind-focus)]",
  obsession: "bg-[var(--kind-note)]",
  commit: "bg-[var(--kind-commit)]",
  window: "bg-[var(--kind-shift)]",
};

interface Props {
  events: TimelineEvent[];
}

export function TrajectoryTimeline({ events }: Props) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <section aria-labelledby="timeline-heading">
      <h2
        id="timeline-heading"
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
      >
        Trajectory timeline
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Obsession shifts, reasoning evolution, pivots, calibration events, and
        signals ??trajectory over time, not static identity.
      </p>

      <ol className="mt-8 space-y-0">
        {sorted.map((event, index) => (
          <li
            key={event.id}
            className="relative grid grid-cols-[4.5rem_1fr] gap-x-4 pb-8 last:pb-0"
          >
            <div className="text-right">
              <time
                dateTime={event.timestamp}
                className="font-mono text-[10px] leading-tight text-[var(--muted)]"
              >
                {formatDate(event.timestamp)}
              </time>
            </div>
            <div className="relative border-l border-[var(--border)] pl-5">
              <span
                className={`absolute -left-[5px] top-1 h-2 w-2 rounded-full ${kindStyles[event.kind] ?? "bg-[var(--muted)]"}`}
                aria-hidden
              />
              {index < sorted.length - 1 && (
                <span
                  className="absolute -left-px top-3 bottom-0 w-px bg-[var(--border)]"
                  aria-hidden
                />
              )}
              <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--muted)]">
                {formatTimelineKind(event.kind)}
              </span>
              <h3 className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {event.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {event.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
