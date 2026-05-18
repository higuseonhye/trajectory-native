import type { SignalReceived } from "@/lib/types";
import { formatRelativeTime, formatSignalSource } from "@/lib/format";
import { Section } from "./Section";

const sourceStyles: Record<string, string> = {
  x: "text-[var(--kind-shift)]",
  github: "text-[var(--kind-commit)]",
  discord: "text-[var(--kind-experiment)]",
  slack: "text-[var(--kind-note)]",
  dm: "text-[var(--kind-focus)]",
  accelerator: "text-[var(--accent)]",
  conference: "text-[var(--accent)]",
  other: "text-[var(--muted)]",
};

interface Props {
  signals: SignalReceived[];
}

export function SignalsReceived({ signals }: Props) {
  const sorted = [...signals].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Section
      id="signals-heading"
      title="Signals ??action"
      description="Every signal becomes an artifact ??including weak or null signals. Observation without action is incomplete."
    >
      <ul className="space-y-3">
        {sorted.map((signal) => (
          <li
            key={signal.id}
            className={`rounded-md border px-5 py-4 ${
              signal.isNullSignal
                ? "border-dashed border-[var(--accent)] bg-[var(--calibration-bg)]"
                : "border-[var(--border)] bg-[var(--surface-elevated)]"
            }`}
          >
            <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {signal.isNullSignal && (
                <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                  null signal
                </span>
              )}
              <span
                className={`font-mono text-[10px] uppercase tracking-wide ${sourceStyles[signal.source] ?? ""}`}
              >
                {formatSignalSource(signal.source)}
              </span>
              <time
                dateTime={signal.timestamp}
                className="font-mono text-[10px] text-[var(--muted)]"
              >
                {formatRelativeTime(signal.timestamp)}
              </time>
              {signal.externalRef && (
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  {signal.externalRef.url ? (
                    <a
                      href={signal.externalRef.url}
                      className="underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--accent)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {signal.externalRef.label}
                    </a>
                  ) : (
                    signal.externalRef.label
                  )}
                </span>
              )}
            </header>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-[var(--border)] bg-[var(--background)] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  Signal
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {signal.signalFelt}
                </p>
                {signal.interaction && (
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                    {signal.interaction}
                  </p>
                )}
              </div>
              <div className="rounded border border-[var(--accent)] border-opacity-40 bg-[var(--calibration-bg)] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                  Action
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {signal.changedAfterward}
                </p>
              </div>
            </div>

            {signal.misunderstanding && (
              <p className="mt-3 text-xs text-[var(--muted)]">
                <span className="font-medium">Framing gap: </span>
                {signal.misunderstanding}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
