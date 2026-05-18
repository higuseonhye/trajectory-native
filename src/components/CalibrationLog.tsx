import type { CalibrationLogEntry } from "@/lib/types";
import { formatRelativeTime } from "@/lib/format";
import { Section } from "./Section";

interface Props {
  entries: CalibrationLogEntry[];
}

function LogField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}

export function CalibrationLog({ entries }: Props) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Section
      id="calibration-log-heading"
      title="Calibration log"
      description="Real founder adaptation entries ??operational, alive. Not polished startup marketing."
    >
      <ul className="space-y-3">
        {sorted.map((entry) => (
          <li
            key={entry.id}
            className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4"
          >
            <time
              dateTime={entry.timestamp}
              className="font-mono text-[10px] text-[var(--muted)]"
            >
              {formatRelativeTime(entry.timestamp)}
            </time>
            <dl className="mt-3 space-y-3">
              <LogField label="Observation" value={entry.observation} />
              <LogField label="Failed assumption" value={entry.failedAssumption} />
              <LogField label="Emotional read" value={entry.emotionalRead} />
              <LogField label="Reframing" value={entry.reframing} />
              <LogField label="Next action" value={entry.nextAction} />
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}
