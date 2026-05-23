import type { DecisionEntry } from "./decision-journal";
import type { InterventionSignal } from "./intervention";
import { classifyAllocation } from "./ownership-classifier";
import type { TrajectoryEvent } from "./trajectory-events";

export type GraphNodeKind =
  | "event"
  | "decision"
  | "open_loop"
  | "drift"
  | "subject";

export interface TrajectoryGraphNode {
  id: string;
  kind: GraphNodeKind;
  label: string;
  timestamp: string;
  detail?: string;
  allocation?: string;
}

export interface TrajectoryGraphEdge {
  from: string;
  to: string;
  relation: "linked" | "subject" | "drift";
}

export interface TrajectoryGraph {
  nodes: TrajectoryGraphNode[];
  edges: TrajectoryGraphEdge[];
  summary: string;
}

export function buildTrajectoryGraph(
  events: TrajectoryEvent[],
  decisions: DecisionEntry[],
  interventions: InterventionSignal[] = [],
): TrajectoryGraph {
  const nodes: TrajectoryGraphNode[] = [];
  const edges: TrajectoryGraphEdge[] = [];

  for (const e of events) {
    nodes.push({
      id: e.id,
      kind: "event",
      label: e.kind.replace(/_/g, " "),
      timestamp: e.timestamp,
      detail: e.description.slice(0, 120),
      allocation: classifyAllocation(e),
    });

    if (
      e.kind === "loop_unfinished" ||
      e.kind === "action_avoided"
    ) {
      nodes.push({
        id: `loop-${e.id}`,
        kind: "open_loop",
        label: e.subject ?? "open loop",
        timestamp: e.timestamp,
        detail: e.description.slice(0, 80),
      });
      edges.push({ from: `loop-${e.id}`, to: e.id, relation: "linked" });
    }
  }

  for (const d of decisions) {
    nodes.push({
      id: d.id,
      kind: "decision",
      label: d.statement.slice(0, 60) + (d.statement.length > 60 ? "…" : ""),
      timestamp: d.decidedAt,
      detail: d.status,
    });

    for (const eventId of d.linkedEventIds ?? []) {
      if (events.some((e) => e.id === eventId)) {
        edges.push({ from: d.id, to: eventId, relation: "linked" });
      }
    }
  }

  for (const s of interventions) {
    const id = `drift-${s.kind}`;
    nodes.push({
      id,
      kind: "drift",
      label: s.kind.replace(/_/g, " "),
      timestamp: new Date().toISOString(),
      detail: s.interpretation.slice(0, 100),
    });
  }

  const subjects = new Set(
    events.map((e) => e.subject?.trim()).filter(Boolean) as string[],
  );
  for (const subject of subjects) {
    const related = events.filter((e) => e.subject?.trim() === subject);
    if (related.length < 2) continue;
    const id = `subj-${subject.toLowerCase().replace(/\s+/g, "-").slice(0, 32)}`;
    nodes.push({
      id,
      kind: "subject",
      label: subject,
      timestamp: related[0]!.timestamp,
      detail: `${related.length} events`,
    });
    for (const e of related) {
      edges.push({ from: id, to: e.id, relation: "subject" });
    }
  }

  nodes.sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const openLoops = nodes.filter((n) => n.kind === "open_loop").length;
  const decisionCount = nodes.filter((n) => n.kind === "decision").length;
  const driftCount = nodes.filter((n) => n.kind === "drift").length;

  let summary = `${nodes.length} nodes — decisions, events, and commitments in one view.`;
  if (driftCount > 0) {
    summary = `${driftCount} drift signal(s) active across ${decisionCount} decisions and ${events.length} events.`;
  } else if (openLoops >= 2) {
    summary = `${openLoops} open loops — fragmentation risk on trajectory graph.`;
  }

  return { nodes, edges, summary };
}
