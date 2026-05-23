import type { DecisionEntry } from "./decision-journal";
import type { TrajectoryEvent } from "./trajectory-events";

/** Apply bidirectional links: decision ↔ events. */
export function linkDecisionToEvents(
  decisions: DecisionEntry[],
  events: TrajectoryEvent[],
  decisionId: string,
  eventIds: string[],
): { decisions: DecisionEntry[]; events: TrajectoryEvent[] } {
  const nextDecisions = decisions.map((d) =>
    d.id === decisionId ? { ...d, linkedEventIds: eventIds } : d,
  );

  const nextEvents = events.map((e) => {
    const linked = eventIds.includes(e.id);
    const wasLinked = decisions
      .find((d) => d.id === decisionId)
      ?.linkedEventIds?.includes(e.id);
    if (linked) return { ...e, linkedDecisionId: decisionId };
    if (wasLinked && e.linkedDecisionId === decisionId) {
      const { linkedDecisionId: _, ...rest } = e;
      return rest as TrajectoryEvent;
    }
    return e;
  });

  return { decisions: nextDecisions, events: nextEvents };
}

export function findDecisionForEvent(
  eventId: string,
  decisions: DecisionEntry[],
): DecisionEntry | undefined {
  return decisions.find((d) => d.linkedEventIds?.includes(eventId));
}
