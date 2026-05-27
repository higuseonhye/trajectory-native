"use client";

import { useState } from "react";
import {
  ENVIRONMENT_ATMOSPHERE_LABELS,
  ENVIRONMENT_CONTEXT_LABELS,
  type EnvironmentAtmosphere,
  type EnvironmentContext,
} from "@/lib/environment";
import { ingestTrajectoryEvents } from "@/lib/ingestion";
import type {
  TrajectoryEvent,
  TrajectoryEventKind,
} from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  onIngest: (events: TrajectoryEvent[], source: string) => void;
}

const EVENT_KINDS: TrajectoryEventKind[] = [
  "interaction",
  "action_taken",
  "action_avoided",
  "momentum_gain",
  "momentum_loss",
  "entropy_spike",
  "energy_restore",
  "environment_alignment",
  "loop_unfinished",
];

const CONTEXTS = Object.keys(
  ENVIRONMENT_CONTEXT_LABELS,
) as EnvironmentContext[];

const ATMOSPHERES = Object.keys(
  ENVIRONMENT_ATMOSPHERE_LABELS,
) as EnvironmentAtmosphere[];

const inputClass =
  "mt-1 w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]";

export function EventIngestPanel({ onIngest }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [kind, setKind] = useState<TrajectoryEventKind>("interaction");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [momentumDelta, setMomentumDelta] = useState<string>("1");
  const [envContext, setEnvContext] = useState<EnvironmentContext | "">("");
  const [envAtmosphere, setEnvAtmosphere] = useState<EnvironmentAtmosphere | "">(
    "",
  );
  const [envTags, setEnvTags] = useState("");

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

  function handleLogEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;

    const tags = envTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const event: TrajectoryEvent = {
      id: `evt-${Date.now()}`,
      kind,
      timestamp: new Date().toISOString(),
      description: description.trim(),
      subject: subject.trim() || undefined,
      momentumDelta:
        momentumDelta === "0" ? 0 : momentumDelta === "-1" ? -1 : 1,
      environment:
        envContext || envAtmosphere || tags.length
          ? {
              context: envContext || undefined,
              atmosphere: envAtmosphere || undefined,
              tags: tags.length ? tags : undefined,
            }
          : undefined,
    };

    setLastSource("manual");
    onIngest([event], "manual");
    setDescription("");
    setSubject("");
    setEnvTags("");
    setExpanded(false);
    setError(null);
  }

  return (
    <Section
      id="event-ingest"
      title="Remember & import"
      description="Hold what happened — including atmosphere — from memory or file."
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-[var(--accent)] underline-offset-2 hover:underline"
      >
        {expanded ? "Cancel" : "+ Log event"}
      </button>

      {expanded && (
        <form onSubmit={handleLogEvent} className="mt-4 space-y-3">
          <label className="block text-xs text-[var(--muted)]">
            Kind
            <select
              className={inputClass}
              value={kind}
              onChange={(e) => setKind(e.target.value as TrajectoryEventKind)}
            >
              {EVENT_KINDS.map((k) => (
                <option key={k} value={k}>
                  {k.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs text-[var(--muted)]">
            Description
            <textarea
              className={`${inputClass} min-h-[72px]`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened in reality?"
              required
            />
          </label>

          <label className="block text-xs text-[var(--muted)]">
            Subject (optional)
            <input
              className={inputClass}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="person, place, channel"
            />
          </label>

          <label className="block text-xs text-[var(--muted)]">
            Momentum
            <select
              className={inputClass}
              value={momentumDelta}
              onChange={(e) => setMomentumDelta(e.target.value)}
            >
              <option value="1">+1 momentum</option>
              <option value="0">neutral</option>
              <option value="-1">−1 entropy</option>
            </select>
          </label>

          <fieldset className="rounded border border-[var(--border)] px-3 py-3">
            <legend className="px-1 text-xs text-[var(--muted)]">
              Environment (optional)
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs text-[var(--muted)]">
                Context
                <select
                  className={inputClass}
                  value={envContext}
                  onChange={(e) =>
                    setEnvContext(e.target.value as EnvironmentContext | "")
                  }
                >
                  <option value="">—</option>
                  {CONTEXTS.map((c) => (
                    <option key={c} value={c}>
                      {ENVIRONMENT_CONTEXT_LABELS[c]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs text-[var(--muted)]">
                Atmosphere
                <select
                  className={inputClass}
                  value={envAtmosphere}
                  onChange={(e) =>
                    setEnvAtmosphere(
                      e.target.value as EnvironmentAtmosphere | "",
                    )
                  }
                >
                  <option value="">—</option>
                  {ATMOSPHERES.map((a) => (
                    <option key={a} value={a}>
                      {ENVIRONMENT_ATMOSPHERE_LABELS[a]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-3 block text-xs text-[var(--muted)]">
              Tags (comma-separated)
              <input
                className={inputClass}
                value={envTags}
                onChange={(e) => setEnvTags(e.target.value)}
                placeholder="natural-light, ocean, fluorescent, scroll-feed"
              />
            </label>
          </fieldset>

          <button
            type="submit"
            className="rounded border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            Save event
          </button>
        </form>
      )}

      <div className="mt-6 border-t border-[var(--border)] pt-4">
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
          {`{ "trajectoryEvents": [{
  "kind": "energy_restore",
  "description": "Morning walk by the coast",
  "momentumDelta": 1,
  "environment": {
    "context": "nature",
    "atmosphere": "restorative",
    "tags": ["ocean", "natural-light", "cinematic-scale"]
  }
}] }`}
        </pre>
      </div>
    </Section>
  );
}
