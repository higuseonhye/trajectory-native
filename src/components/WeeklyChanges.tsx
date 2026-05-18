import type { WeeklyChange } from "@/lib/types";
import { formatRelativeTime, formatWeeklyCategory } from "@/lib/format";
import { Section } from "./Section";

const categoryStyles: Record<string, string> = {
  thesis: "text-[var(--kind-experiment)]",
  positioning: "text-[var(--accent)]",
  reframing: "text-[var(--kind-shift)]",
  operational: "text-[var(--kind-commit)]",
  interaction: "text-[var(--kind-note)]",
};

interface Props {
  changes: WeeklyChange[];
}

export function WeeklyChanges({ changes }: Props) {
  const sorted = [...changes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Section
      id="weekly-changes-heading"
      title="What changed this week?"
      description="Observable directional movement — thesis, positioning, reframing, operations, interaction."
    >
      <ul className="space-y-2">
        {sorted.map((change) => (
          <li
            key={change.id}
            className="grid gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-4 sm:grid-cols-[5rem_1fr]"
          >
            <div className="flex flex-col gap-1 sm:items-end sm:text-right">
              <span
                className={`font-mono text-[10px] uppercase tracking-wide ${categoryStyles[change.category] ?? ""}`}
              >
                {formatWeeklyCategory(change.category)}
              </span>
              <time
                dateTime={change.timestamp}
                className="font-mono text-[10px] text-[var(--muted)]"
              >
                {formatRelativeTime(change.timestamp)}
              </time>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--foreground)]">
                {change.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                {change.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
