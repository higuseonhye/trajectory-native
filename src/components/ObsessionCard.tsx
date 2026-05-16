import type { CalibrationReply, ObsessionCard } from "@/lib/types";
import { CalibrationThread } from "./CalibrationThread";
import { hasReplies } from "@/lib/calibration";

const fields: { key: keyof ObsessionCard; label: string }[] = [
  { key: "exploring", label: "What I'm exploring" },
  { key: "changedRecently", label: "What changed recently" },
  { key: "strugglingWith", label: "What I'm struggling with" },
  { key: "watchingSignal", label: "What signal I'm watching" },
];

interface Props {
  data: ObsessionCard;
  calibrations: CalibrationReply[];
}

export function ObsessionCard({ data, calibrations }: Props) {
  return (
    <section
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
      aria-labelledby="obsession-heading"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="obsession-heading"
          className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
        >
          Current obsession
        </h2>
        <time
          dateTime={data.updatedAt}
          className="font-mono text-xs text-[var(--muted)]"
        >
          updated {data.updatedAt}
        </time>
      </div>

      <dl className="mt-6 space-y-5">
        {fields.map(({ key, label }) => {
          const anchor = { type: "obsession" as const, id: key };
          return (
            <div key={key}>
              <dt className="text-xs font-medium text-[var(--muted)]">{label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-[var(--foreground)]">
                {data[key]}
              </dd>
              {hasReplies(calibrations, anchor) && (
                <CalibrationThread
                  anchor={anchor}
                  replies={calibrations}
                  label="Calibrating · signal"
                />
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
