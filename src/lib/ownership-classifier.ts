import type { TrajectoryEvent } from "./trajectory-events";

/** How time/energy was allocated — labor vs ownership vs consumption vs investment. */
export type AllocationKind =
  | "labor"
  | "ownership"
  | "consumption"
  | "investment";

const OWNERSHIP_TAGS = new Set([
  "shipped",
  "asset",
  "ownership",
  "build",
  "compound",
  "system",
]);

const CONSUMPTION_TAGS = new Set([
  "reactive-switch",
  "course",
  "learning-only",
  "feed",
  "prestige",
]);

const INVESTMENT_TAGS = new Set([
  "high-signal",
  "relationship",
  "calibration",
  "deep-work",
]);

/** Infer allocation from event shape when not explicitly set. */
export function classifyAllocation(event: TrajectoryEvent): AllocationKind {
  if (event.allocation) return event.allocation;

  const tags = new Set(event.tags ?? []);
  const desc = event.description.toLowerCase();

  if (tags.has("reactive-switch") || /course|tutorial|feed|scroll/i.test(desc)) {
    return "consumption";
  }
  if ([...OWNERSHIP_TAGS].some((t) => tags.has(t))) return "ownership";
  if ([...CONSUMPTION_TAGS].some((t) => tags.has(t))) return "consumption";
  if ([...INVESTMENT_TAGS].some((t) => tags.has(t))) return "investment";

  if (event.kind === "momentum_gain" || event.kind === "action_taken") {
    if (/shipped|built|deployed|asset|system|product/i.test(desc)) {
      return "ownership";
    }
    return "ownership";
  }

  if (event.kind === "action_avoided") return "labor";
  if (event.kind === "entropy_spike") return "consumption";
  if (event.kind === "execution_collapse") return "labor";

  if (event.kind === "interaction") {
    if (/office hours|pair|collaborator|customer|founder/i.test(desc)) {
      return "investment";
    }
    if (/networking|meetup|coffee chat/i.test(desc)) return "consumption";
    return "investment";
  }

  if (event.kind === "energy_restore") return "investment";
  if (event.kind === "loop_unfinished") return "labor";

  return "labor";
}

export function resolveEventAllocations(
  events: TrajectoryEvent[],
): Array<TrajectoryEvent & { allocation: AllocationKind }> {
  return events.map((e) => ({
    ...e,
    allocation: classifyAllocation(e),
  }));
}

export const ALLOCATION_LABELS: Record<AllocationKind, string> = {
  labor: "labor",
  ownership: "ownership",
  consumption: "consumption",
  investment: "investment",
};
