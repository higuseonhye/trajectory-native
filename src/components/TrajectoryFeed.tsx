import type { TrajectoryEntry } from "@/lib/types";
import { formatKind, formatRelativeTime } from "@/lib/format";

const kindStyles: Record<string, string> = {
  note: "text-[var(--kind-note)]",
  experiment: "text-[var(--kind-experiment)]",
  commit: "text-[var(--kind-commit)]",
  focus: "text-[var(--kind-focus)]",
  shift: "text-[var(--kind-shift)]",
};

interface Props {
  entries: TrajectoryEntry[];
}

export function TrajectoryFeed({ entries }: Props) {
  return (
    <section aria-labelledby="feed-heading">
      <h2
        id="feed-heading"
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
      >
        Trajectory feed
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Chronological stream — notes, experiments, commits, focus, shifts.
      </p>

      <ol className="mt-8 space-y-0">
        {entries.map((entry, index) => (
          <li
            key={entry.id}
            className="relative border-l border-[var(--border)] pl-6 pb-10 last:pb-0"
          >
            <span
              className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[var(--accent)]"
              aria-hidden
            />
            {index < entries.length - 1 && (
              <span
                className="absolute -left-px top-3 bottom-0 w-px bg-[var(--border)]"
                aria-hidden
              />
            )}

            <article>
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={`font-mono text-xs uppercase tracking-wide ${kindStyles[entry.kind] ?? ""}`}
                >
                  {formatKind(entry.kind)}
                </span>
                <time
                  dateTime={entry.timestamp}
                  className="font-mono text-xs text-[var(--muted)]"
                >
                  {formatRelativeTime(entry.timestamp)}
                </time>
              </header>

              <h3 className="mt-2 text-base font-medium text-[var(--foreground)]">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {entry.body}
              </p>

              {(entry.tags?.length ?? 0) > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                  {entry.tags!.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {entry.githubRef && (
                <p className="mt-2 font-mono text-xs text-[var(--muted)] opacity-60">
                  github · {entry.githubRef}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
