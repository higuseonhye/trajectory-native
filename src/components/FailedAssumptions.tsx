import type { FailedAssumption } from "@/lib/types";
import { formatRelativeTime } from "@/lib/format";
import { Section } from "./Section";

interface Props {
  assumptions: FailedAssumption[];
}

export function FailedAssumptions({ assumptions }: Props) {
  const sorted = [...assumptions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Section
      id="failed-assumptions-heading"
      title="Failed assumptions"
      description="Adaptation made visible ??what we believed, what happened, what we learned."
    >
      <ul className="space-y-3">
        {sorted.map((item) => (
          <li
            key={item.id}
            className="rounded-md border border-dashed border-[var(--border)] bg-[var(--calibration-bg)] px-5 py-4"
          >
            <time
              dateTime={item.timestamp}
              className="font-mono text-[10px] text-[var(--muted)]"
            >
              {formatRelativeTime(item.timestamp)}
            </time>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                  Assumed
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)] line-through decoration-[var(--muted)] decoration-1">
                  {item.assumption}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                  What happened
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                  {item.whatHappened}
                </dd>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-[var(--accent)]">
                  Lesson
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                  {item.lesson}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}

