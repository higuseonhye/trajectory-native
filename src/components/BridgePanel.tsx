"use client";

import { downloadBridgeJson } from "@/lib/bridge-export";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

const DRIFT_URL = "http://localhost:3001/dashboard";

interface Props {
  events: TrajectoryEvent[];
}

export function BridgePanel({ events }: Props) {
  return (
    <Section
      id="bridge"
      title="Native ↔ drift bridge"
      description="Export human trajectory events for system-side analysis."
    >
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadBridgeJson(events)}
          className="rounded border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Download bridge JSON
        </button>
        <a
          href={DRIFT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          Open trajectory-drift →
        </a>
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        In drift: upload the JSON or use the unified demo. Human metrics appear
        alongside agent coordination.
      </p>
    </Section>
  );
}
