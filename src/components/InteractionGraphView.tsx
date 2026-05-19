"use client";

import { buildInteractionGraph } from "@/lib/interaction-graph";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

const ROLE_COLOR: Record<string, string> = {
  amplifier: "var(--accent)",
  neutral: "var(--muted)",
  drain: "#c45c5c",
};

interface Props {
  events: TrajectoryEvent[];
}

export function InteractionGraphView({ events }: Props) {
  const graph = buildInteractionGraph(events);

  if (graph.nodes.length === 0) {
    return (
      <Section
        id="interaction-graph"
        title="Interaction intelligence"
        description="Who and what shapes momentum — requires subjects on events."
      >
        <p className="text-sm text-[var(--muted)]">
          Add subjects to trajectory events to map amplifiers and drains.
        </p>
      </Section>
    );
  }

  const maxNet = Math.max(...graph.nodes.map((n) => Math.abs(n.momentumNet)), 1);

  return (
    <Section
      id="interaction-graph"
      title="Interaction intelligence"
      description="Who increases momentum · who creates entropy."
    >
      <p className="mb-4 text-sm italic text-[var(--muted)]">
        {graph.observation}
      </p>
      <ul className="space-y-3">
        {graph.nodes.map((n) => {
          const width = Math.round((Math.abs(n.momentumNet) / maxNet) * 100);
          return (
            <li key={n.id}>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-[var(--foreground)]">
                  {n.label}
                </span>
                <span
                  className="font-mono uppercase tracking-wide"
                  style={{ color: ROLE_COLOR[n.role] }}
                >
                  {n.role}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-[var(--border)]">
                <div
                  className="h-full rounded"
                  style={{
                    width: `${Math.max(8, width)}%`,
                    backgroundColor: ROLE_COLOR[n.role],
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-[var(--muted)]">
                net {n.momentumNet > 0 ? "+" : ""}
                {n.momentumNet} · {n.eventCount} events
              </p>
            </li>
          );
        })}
      </ul>
      {graph.insights.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-[var(--border)] pt-4">
          {graph.insights.map((ins) => (
            <li
              key={ins.subject}
              className="border-l-2 border-[var(--accent)] pl-3 text-sm"
            >
              <p className="text-[var(--foreground)]">{ins.interpretation}</p>
              {ins.suggestedCalibration && (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  → {ins.suggestedCalibration}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
