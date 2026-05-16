import type { ObsessionCard } from "@/lib/types";

const fields: { key: keyof ObsessionCard; label: string }[] = [
  { key: "exploring", label: "What I'm exploring" },
  { key: "changedRecently", label: "What changed recently" },
  { key: "strugglingWith", label: "What I'm struggling with" },
  { key: "watchingSignal", label: "What signal I'm watching" },
];

interface Props {
  data: ObsessionCard;
}

export function ObsessionCard({ data }: Props) {
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
