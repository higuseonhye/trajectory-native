"use client";

import { useMemo } from "react";
import { formatRelativeTime } from "@/lib/format";
import { detectInterventions } from "@/lib/intervention";
import { computeCompoundingMetrics } from "@/lib/compounding-engine";
import { computeMomentumMetrics } from "@/lib/momentum-engine";
import { buildTrajectoryGraph } from "@/lib/trajectory-graph";
import type { DecisionEntry } from "@/lib/decision-journal";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
  decisions: DecisionEntry[];
}

const KIND_COLOR: Record<string, string> = {
  event: "var(--muted)",
  decision: "var(--accent)",
  open_loop: "#c45c5c",
  drift: "#e07a4f",
  subject: "#a78bfa",
};

const KIND_LABEL: Record<string, string> = {
  event: "event",
  decision: "decision",
  open_loop: "open loop",
  drift: "drift",
  subject: "subject",
};

export function TrajectoryGraphView({ events, decisions }: Props) {
  const graph = useMemo(() => {
    const metrics = computeMomentumMetrics(events);
    const compounding = computeCompoundingMetrics(events);
    const interventions = detectInterventions(events, metrics, compounding);
    return buildTrajectoryGraph(events, decisions, interventions);
  }, [events, decisions]);

  if (graph.nodes.length === 0) return null;

  const timeline = graph.nodes.slice(0, 12);

  return (
    <Section
      id="trajectory-graph-heading"
      title="Trajectory graph"
      description="Projects, commitments, decisions, events, and drift signals — unified view."
    >
      <p className="mb-4 text-sm text-[var(--muted)]">{graph.summary}</p>

      <div className="relative border-l border-[var(--border)] pl-4">
        <ul className="space-y-4">
          {timeline.map((node) => (
            <li key={node.id} className="relative">
              <span
                className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--background)]"
                style={{ backgroundColor: KIND_COLOR[node.kind] }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wide"
                    style={{ color: KIND_COLOR[node.kind] }}
                  >
                    {KIND_LABEL[node.kind]}
                  </span>
                  {node.allocation && (
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      {node.allocation}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[var(--muted)]">
                  {formatRelativeTime(node.timestamp)}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--foreground)]">
                {node.label}
              </p>
              {node.detail && node.kind !== "decision" && (
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {node.detail}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {graph.edges.length > 0 && (
        <p className="mt-4 text-xs text-[var(--muted)]">
          {graph.edges.length} link(s) between decisions, events, and subjects.
        </p>
      )}
    </Section>
  );
}
