"use client";

import { useCallback, useState } from "react";
import { formatDate, formatRelativeTime } from "@/lib/format";
import type { ConfidenceLevel, DecisionEntry } from "@/lib/decision-journal";
import { Section } from "./Section";
import type { TrajectoryEvent } from "@/lib/trajectory-events";

const STATUS_LABEL: Record<DecisionEntry["status"], string> = {
  pending: "pending review",
  decided: "decided",
  reviewed: "reviewed",
};

const CONFIDENCE_LABEL: Record<ConfidenceLevel, string> = {
  low: "low confidence",
  medium: "medium confidence",
  high: "high confidence",
};

interface Props {
  events: TrajectoryEvent[];
  decisions: DecisionEntry[];
  onAdd: (entry: DecisionEntry) => void;
  onReview: (id: string, outcome: string) => void;
  onLinkEvents: (decisionId: string, eventIds: string[]) => void;
}

export function DecisionJournal({
  events,
  decisions,
  onAdd,
  onReview,
  onLinkEvents,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [linkingId, setLinkingId] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [statement, setStatement] = useState("");
  const [confidence, setConfidence] = useState<ConfidenceLevel>("medium");
  const [assumptions, setAssumptions] = useState("");
  const [newEventLinks, setNewEventLinks] = useState<string[]>([]);

  const recentEvents = [...events]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 8);

  const handleAdd = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!statement.trim()) return;

      const entry: DecisionEntry = {
        id: `dj-${Date.now()}`,
        statement: statement.trim(),
        decidedAt: new Date().toISOString(),
        confidence,
        assumptions: assumptions
          .split("\n")
          .map((a) => a.trim())
          .filter(Boolean),
        status: "decided",
        linkedEventIds: newEventLinks.length > 0 ? newEventLinks : undefined,
      };

      onAdd(entry);
      setStatement("");
      setAssumptions("");
      setNewEventLinks([]);
      setExpanded(false);
    },
    [statement, confidence, assumptions, newEventLinks, onAdd],
  );

  const sorted = [...decisions].sort(
    (a, b) =>
      new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime(),
  );

  return (
    <Section
      id="decision-journal-heading"
      title="Memory of turns"
      description="Honest choices, assumptions, and what came after."
    >
      <ul className="space-y-4">
        {sorted.map((d) => (
          <li
            key={d.id}
            className="rounded border border-[var(--border)] px-4 py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                {STATUS_LABEL[d.status]}
              </span>
              <span className="text-[11px] text-[var(--muted)]">
                {formatRelativeTime(d.decidedAt)} ·{" "}
                {CONFIDENCE_LABEL[d.confidence]}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
              {d.statement}
            </p>
            {d.assumptions.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  Assumptions
                </p>
                <ul className="mt-1 space-y-1">
                  {d.assumptions.map((a) => (
                    <li
                      key={a}
                      className="text-xs text-[var(--muted)] before:mr-1.5 before:content-['·']"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {d.alternativesRejected && (
              <p className="mt-2 text-xs text-[var(--muted)]">
                Rejected: {d.alternativesRejected}
              </p>
            )}
            {d.linkedEventIds && d.linkedEventIds.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  Linked events
                </p>
                <ul className="mt-1 space-y-1">
                  {d.linkedEventIds.map((eid) => {
                    const ev = events.find((e) => e.id === eid);
                    return (
                      <li
                        key={eid}
                        className="text-xs text-[var(--muted)]"
                      >
                        · {ev?.description.slice(0, 80) ?? eid}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {d.outcome && (
              <p className="mt-3 border-l-2 border-[var(--border)] pl-3 text-sm text-[var(--foreground)]">
                Outcome ({formatDate(d.reviewedAt ?? d.decidedAt)}):{" "}
                {d.outcome}
              </p>
            )}
            {d.patternLink && (
              <p className="mt-2 font-mono text-[10px] text-[var(--muted)]">
                pattern: {d.patternLink}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-3">
              {d.status === "decided" && !d.outcome && (
                <button
                  type="button"
                  onClick={() => {
                    const outcome = prompt("What was the outcome?");
                    if (outcome?.trim()) onReview(d.id, outcome.trim());
                  }}
                  className="text-xs text-[var(--accent)] underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
                >
                  Log outcome
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setLinkingId(linkingId === d.id ? null : d.id);
                  setSelectedEvents(d.linkedEventIds ?? []);
                }}
                className="text-xs text-[var(--muted)] underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
              >
                {linkingId === d.id ? "Cancel link" : "Link events"}
              </button>
            </div>
            {linkingId === d.id && (
              <div className="mt-3 space-y-2 rounded border border-[var(--border)] p-3">
                {recentEvents.map((ev) => (
                  <label
                    key={ev.id}
                    className="flex cursor-pointer items-start gap-2 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(ev.id)}
                      onChange={(e) => {
                        setSelectedEvents((prev) =>
                          e.target.checked
                            ? [...prev, ev.id]
                            : prev.filter((id) => id !== ev.id),
                        );
                      }}
                      className="mt-0.5"
                    />
                    <span className="text-[var(--muted)]">
                      {ev.description.slice(0, 100)}
                    </span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    onLinkEvents(d.id, selectedEvents);
                    setLinkingId(null);
                  }}
                  className="text-xs text-[var(--accent)] underline underline-offset-2"
                >
                  Save links
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-xs text-[var(--accent)] underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
          >
            + Log decision
          </button>
        ) : (
          <form
            onSubmit={handleAdd}
            className="space-y-3 rounded border border-[var(--border)] p-4"
          >
            <label className="block">
              <span className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                Decision
              </span>
              <textarea
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                rows={2}
                className="mt-1 w-full resize-none rounded border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--foreground)]"
                placeholder="What did you decide?"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                Assumptions (one per line)
              </span>
              <textarea
                value={assumptions}
                onChange={(e) => setAssumptions(e.target.value)}
                rows={2}
                className="mt-1 w-full resize-none rounded border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--foreground)]"
                placeholder="What must be true?"
              />
            </label>
            {recentEvents.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  Link to events (optional)
                </p>
                <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto">
                  {recentEvents.map((ev) => (
                    <li key={ev.id}>
                      <label className="flex cursor-pointer items-start gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={newEventLinks.includes(ev.id)}
                          onChange={(e) => {
                            setNewEventLinks((prev) =>
                              e.target.checked
                                ? [...prev, ev.id]
                                : prev.filter((id) => id !== ev.id),
                            );
                          }}
                          className="mt-0.5"
                        />
                        <span className="text-[var(--muted)]">
                          {ev.description.slice(0, 80)}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <label className="block">
              <span className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
                Confidence
              </span>
              <select
                value={confidence}
                onChange={(e) =>
                  setConfidence(e.target.value as ConfidenceLevel)
                }
                className="mt-1 rounded border border-[var(--border)] bg-transparent px-2 py-1 text-sm text-[var(--foreground)]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground)] hover:border-[var(--accent)]"
              >
                Save decision
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
