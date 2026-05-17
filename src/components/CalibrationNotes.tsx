import type { CalibrationNotes } from "@/lib/types";

const fields: { key: keyof CalibrationNotes; label: string }[] = [
  { key: "currentlyBelieve", label: "What I currently believe" },
  { key: "uncertainAbout", label: "What I'm uncertain about" },
  { key: "watchingSignal", label: "What signal I'm watching" },
  { key: "feedbackNeeded", label: "What kind of feedback I need" },
];

interface Props {
  data: CalibrationNotes;
}

export function CalibrationNotesSection({ data }: Props) {
  return (
    <section
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
      aria-labelledby="calibration-notes-heading"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="calibration-notes-heading"
          className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
        >
          Calibration notes
        </h2>
        <time
          dateTime={data.updatedAt}
          className="font-mono text-xs text-[var(--muted)]"
        >
          updated {data.updatedAt}
        </time>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Live strategic thinking ??not polished branding.
      </p>

      <dl className="mt-6 space-y-5">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs font-medium text-[var(--muted)]">{label}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-[var(--foreground)]">
              {data[key]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
