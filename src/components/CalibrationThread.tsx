import type { CalibrationReply, ContextAnchor } from "@/lib/types";
import { repliesForAnchor } from "@/lib/calibration";
import { formatRelativeTime } from "@/lib/format";

interface Props {
  anchor: ContextAnchor;
  replies: CalibrationReply[];
  label?: string;
}

export function CalibrationThread({ anchor, replies, label }: Props) {
  const thread = repliesForAnchor(replies, anchor);
  if (thread.length === 0) return null;

  return (
    <div
      className="mt-4 rounded-md border border-[var(--border)] border-l-2 border-l-[var(--accent)] bg-[var(--calibration-bg)] p-4"
      aria-label={label ?? "Context calibration"}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
        {label ?? "Calibration · in context"}
      </p>

      <ul className="mt-3 space-y-3">
        {thread.map((reply) => (
          <li key={reply.id} className="text-sm">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-mono text-xs text-[var(--foreground)]">
                {reply.author}
              </span>
              <time
                dateTime={reply.timestamp}
                className="font-mono text-xs text-[var(--muted)]"
              >
                {formatRelativeTime(reply.timestamp)}
              </time>
              {reply.isCalibration && (
                <span className="rounded border border-[var(--accent)] px-1.5 py-px font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                  calibrated
                </span>
              )}
            </div>
            <p className="mt-1 leading-relaxed text-[var(--muted)]">
              {reply.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
