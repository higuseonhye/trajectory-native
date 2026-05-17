import type { EcosystemReference } from "@/lib/types";
import { formatSignalSource } from "@/lib/format";

interface Props {
  externalRef: EcosystemReference;
}

export function EcosystemRef({ externalRef }: Props) {
  return (
    <p className="mt-3 font-mono text-xs text-[var(--muted)]">
      <span className="text-[var(--accent)]">
        {formatSignalSource(externalRef.source)}
      </span>
      {" · "}
      {externalRef.url ? (
        <a
          href={externalRef.url}
          className="underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {externalRef.label}
        </a>
      ) : (
        externalRef.label
      )}
    </p>
  );
}
