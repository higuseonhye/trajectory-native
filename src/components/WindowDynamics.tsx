import type { WindowDynamic } from "@/lib/types";
import { formatRelativeTime, formatWindowKind } from "@/lib/format";

const kindStyles: Record<string, string> = {
  crowding: "text-[var(--kind-shift)]",
  commoditization: "text-[var(--kind-note)]",
  "distribution-shift": "text-[var(--kind-focus)]",
  "moat-decay": "text-[var(--muted)]",
  "timing-pressure": "text-[var(--accent)]",
  "ecosystem-shift": "text-[var(--kind-experiment)]",
  opportunity: "text-[var(--kind-commit)]",
};

interface Props {
  entries: WindowDynamic[];
}

export function WindowDynamics({ entries }: Props) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <section aria-labelledby="window-heading">
      <h2
        id="window-heading"
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
      >
        Window dynamics
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        AI-era strategic timing ??crowded wedges, commoditizing capabilities,
        distribution urgency, collapsing moats. Trajectory calibration matters
        more when windows compress.
      </p>

      <ul className="mt-8 space-y-4">
        {sorted.map((entry) => (
          <li
            key={entry.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={`font-mono text-xs uppercase tracking-wide ${kindStyles[entry.kind] ?? ""}`}
              >
                {formatWindowKind(entry.kind)}
              </span>
              <time
                dateTime={entry.timestamp}
                className="font-mono text-xs text-[var(--muted)]"
              >
                {formatRelativeTime(entry.timestamp)}
              </time>
            </header>

            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
              {entry.observation}
            </p>

            {entry.timingPressure && (
              <p className="mt-3 text-sm">
                <span className="text-xs font-medium text-[var(--accent)]">
                  Timing pressure ·{" "}
                </span>
                <span className="leading-relaxed text-[var(--muted)]">
                  {entry.timingPressure}
                </span>
              </p>
            )}

            {entry.adaptation && (
              <p className="mt-2 text-sm border-t border-[var(--border)] pt-3">
                <span className="text-xs font-medium text-[var(--muted)]">
                  Trajectory adaptation ·{" "}
                </span>
                <span className="leading-relaxed text-[var(--foreground)]">
                  {entry.adaptation}
                </span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
