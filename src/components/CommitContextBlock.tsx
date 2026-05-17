import type { CommitContext } from "@/lib/types";

interface Props {
  context: CommitContext;
  githubRef?: string;
}

export function CommitContextBlock({ context, githubRef }: Props) {
  return (
    <div
      className="mt-4 rounded-md border border-[var(--border)] border-dashed bg-[var(--calibration-bg)] p-4"
      aria-label="Commit context residue"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--kind-commit)]">
        Commit ↔ context
        {githubRef && (
          <span className="ml-2 text-[var(--muted)]">· {githubRef}</span>
        )}
      </p>
      <dl className="mt-3 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-[var(--muted)]">
            Why this changed
          </dt>
          <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
            {context.whyChanged}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-[var(--muted)]">
            What triggered this
          </dt>
          <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
            {context.trigger}
          </dd>
        </div>
        {context.uncertainty && (
          <div>
            <dt className="text-xs font-medium text-[var(--muted)]">
              What uncertainty remains
            </dt>
            <dd className="mt-1 leading-relaxed text-[var(--foreground)]">
              {context.uncertainty}
            </dd>
          </div>
        )}
        {(context.reasoningId || context.signalId) && (
          <p className="font-mono text-xs text-[var(--muted)]">
            linked ·
            {context.reasoningId && ` reasoning:${context.reasoningId}`}
            {context.signalId && ` signal:${context.signalId}`}
          </p>
        )}
      </dl>
    </div>
  );
}
