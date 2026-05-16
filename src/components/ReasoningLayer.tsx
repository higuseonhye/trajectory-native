import type { CalibrationReply, ReasoningTrace } from "@/lib/types";
import { formatRelativeTime } from "@/lib/format";
import { CalibrationThread } from "./CalibrationThread";
import { hasReplies } from "@/lib/calibration";

interface Props {
  traces: ReasoningTrace[];
  calibrations: CalibrationReply[];
}

export function ReasoningLayer({ traces, calibrations }: Props) {
  return (
    <section aria-labelledby="reasoning-heading">
      <h2
        id="reasoning-heading"
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]"
      >
        Reasoning / context
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Short traces — why direction changed, what triggered a pivot, what
        emerged. Calibration happens here, on the trace — not in a side channel.
      </p>

      <ul className="mt-8 space-y-4">
        {traces.map((trace) => {
          const anchor = { type: "reasoning" as const, id: trace.id };
          return (
            <li
              key={trace.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <time
                dateTime={trace.timestamp}
                className="font-mono text-xs text-[var(--muted)]"
              >
                {formatRelativeTime(trace.timestamp)}
              </time>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Trigger
                  </p>
                  <p className="mt-1 leading-relaxed text-[var(--foreground)]">
                    {trace.trigger}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Insight
                  </p>
                  <p className="mt-1 leading-relaxed text-[var(--foreground)]">
                    {trace.insight}
                  </p>
                </div>
                {trace.directionChange && (
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="text-xs font-medium text-[var(--accent)]">
                      Direction change
                    </p>
                    <p className="mt-1 leading-relaxed text-[var(--foreground)]">
                      {trace.directionChange}
                    </p>
                  </div>
                )}
              </div>

              {hasReplies(calibrations, anchor) && (
                <CalibrationThread
                  anchor={anchor}
                  replies={calibrations}
                  label="Calibrating · reasoning"
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
