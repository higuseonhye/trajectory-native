import type { SignalReceived } from "@/lib/types";
import { formatRelativeTime, formatSignalSource } from "@/lib/format";

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
  return (
    <section aria-labelledby="signals-heading">
      <h2
        id="signals-heading"
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
      >
        Signals received
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        High-signal interactions from X, GitHub, DMs, accelerators, and elsewhere
        ??captured here so calibration does not disappear.
      </p>

      <ul className="mt-8 space-y-4">
        {signals.map((signal) => (
          <li
            key={signal.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={`font-mono text-xs uppercase tracking-wide ${sourceStyles[signal.source] ?? ""}`}
              >
                {formatSignalSource(signal.source)}
              </span>
              <time
                dateTime={signal.timestamp}
                className="font-mono text-xs text-[var(--muted)]"
              >
                {formatRelativeTime(signal.timestamp)}
              </time>
              {signal.externalRef && (
                <span className="font-mono text-xs text-[var(--muted)]">
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

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-medium text-[var(--muted)]">
                  What interaction changed your thinking?
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                  {signal.interaction}
                </dd>
              </div>
              {signal.misunderstanding && (
                <div>
                  <dt className="text-xs font-medium text-[var(--muted)]">
                    What misunderstanding revealed a framing problem?
                  </dt>
                  <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                    {signal.misunderstanding}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium text-[var(--muted)]">
                  What signal felt important?
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                  {signal.signalFelt}
                </dd>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <dt className="text-xs font-medium text-[var(--accent)]">
                  What changed afterward?
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
                  {signal.changedAfterward}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
