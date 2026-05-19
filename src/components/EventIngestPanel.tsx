"use client";

import { useState } from "react";
import { ingestTrajectoryEvents } from "@/lib/ingestion";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  onIngest: (events: TrajectoryEvent[], source: string) => void;
}

export function EventIngestPanel({ onIngest }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState<string | null>(null);

  function handleFile(file: File) {
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(String(reader.result)) as unknown;
        const result = ingestTrajectoryEvents(raw);
        setLastSource(result.source);
        onIngest(result.events, result.source);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON");
      }
    };
    reader.readAsText(file);
  }

  return (
    <Section
      id="event-ingest"
      title="Ingest events"
      description="Calendar · comms · tools · or trajectoryEvents[] JSON."
    >
      <label className="inline-block cursor-pointer text-sm text-[var(--accent)] underline-offset-2 hover:underline">
        Import JSON
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </label>
      {lastSource && (
        <p className="mt-2 text-xs text-[var(--muted)]">
          Last import: {lastSource}
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <pre className="mt-4 overflow-x-auto rounded border border-[var(--border)] bg-[var(--background)] p-3 text-[10px] text-[var(--muted)]">
        {`{ "source": "calendar", "items": [{ "summary": "...", "start": "ISO" }] }
{ "source": "comms", "messages": [{ "channel": "slack", "body": "...", "at": "ISO" }] }
{ "trajectoryEvents": [ { "kind": "interaction", "description": "..." } ] }`}
      </pre>
    </Section>
  );
}
