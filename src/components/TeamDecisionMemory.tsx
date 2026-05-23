"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format";
import type { TeamDecision, TeamDecisionPayload } from "@/lib/team-decisions";
import { Section } from "./Section";

export function TeamDecisionMemory() {
  const [data, setData] = useState<TeamDecisionPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team-decisions")
      .then((r) => r.json())
      .then((payload: TeamDecisionPayload) => setData(payload))
      .catch(() =>
        setData({ entries: [], source: "unavailable" }),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section
      id="team-decisions-heading"
      title="Institutional memory"
      description="Team decision continuity — bridged from org-reasoning-mvp when available."
    >
      {loading && (
        <p className="text-sm text-[var(--muted)]">Loading team decisions…</p>
      )}

      {!loading && data?.source === "unavailable" && (
        <p className="text-sm text-[var(--muted)]">
          org-reasoning-mvp unavailable. Start it on port 3000 or ingest
          documents to populate decision memory.
        </p>
      )}

      {!loading && data && data.entries.length > 0 && (
        <>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-wide text-[var(--muted)]">
            source: {data.source}
          </p>
          <ul className="space-y-3">
            {data.entries.map((d: TeamDecision) => (
              <li
                key={d.id}
                className="rounded border border-[var(--border)] px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                    {d.status}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">
                    {d.decisionDate ?? formatDate(d.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {d.statement}
                </p>
                {d.evidenceQuote && (
                  <blockquote className="mt-2 border-l-2 border-[var(--border)] pl-3 text-xs italic text-[var(--muted)]">
                    {d.evidenceQuote}
                  </blockquote>
                )}
                {d.supersededById && (
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Superseded by newer decision.
                  </p>
                )}
                {d.supersedesCount != null && d.supersedesCount > 0 && (
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Supersedes {d.supersedesCount} prior decision(s).
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
