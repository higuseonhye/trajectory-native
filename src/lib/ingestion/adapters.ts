import type {
  TrajectoryEvent,
  TrajectoryEventKind,
  AllocationKind,
} from "../trajectory-events";
import type {
  EnvironmentAtmosphere,
  EnvironmentContext,
  EventEnvironment,
} from "../environment";
import type { IngestResult } from "./types";

const KINDS = new Set<TrajectoryEventKind>([
  "interaction",
  "action_taken",
  "action_avoided",
  "momentum_gain",
  "momentum_loss",
  "entropy_spike",
  "energy_restore",
  "execution_collapse",
  "environment_alignment",
  "loop_unfinished",
]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const ALLOCATIONS = new Set<AllocationKind>([
  "labor",
  "ownership",
  "consumption",
  "investment",
]);

const ENV_CONTEXTS = new Set<EnvironmentContext>([
  "office",
  "home",
  "nature",
  "transit",
  "social",
  "digital",
]);

const ENV_ATMOSPHERES = new Set<EnvironmentAtmosphere>([
  "alive",
  "neutral",
  "dead",
  "restorative",
]);

function normalizeEnvironment(raw: unknown): EventEnvironment | undefined {
  if (!isRecord(raw)) return undefined;
  const context =
    typeof raw.context === "string" &&
    ENV_CONTEXTS.has(raw.context as EnvironmentContext)
      ? (raw.context as EnvironmentContext)
      : undefined;
  const atmosphere =
    typeof raw.atmosphere === "string" &&
    ENV_ATMOSPHERES.has(raw.atmosphere as EnvironmentAtmosphere)
      ? (raw.atmosphere as EnvironmentAtmosphere)
      : undefined;
  const tags = Array.isArray(raw.tags)
    ? raw.tags.filter((t): t is string => typeof t === "string")
    : undefined;
  if (!context && !atmosphere && !tags?.length) return undefined;
  return { context, atmosphere, tags };
}

function normalizeEvent(raw: unknown, index: number): TrajectoryEvent {
  if (!isRecord(raw)) throw new Error(`event[${index}] must be an object`);
  const kind = raw.kind;
  if (typeof kind !== "string" || !KINDS.has(kind as TrajectoryEventKind)) {
    throw new Error(`event[${index}]: invalid kind`);
  }
  return {
    id: typeof raw.id === "string" ? raw.id : `evt-${Date.now()}-${index}`,
    kind: kind as TrajectoryEventKind,
    timestamp:
      typeof raw.timestamp === "string"
        ? raw.timestamp
        : new Date().toISOString(),
    description:
      typeof raw.description === "string" ? raw.description : "",
    subject: typeof raw.subject === "string" ? raw.subject : undefined,
    momentumDelta:
      typeof raw.momentumDelta === "number" ? raw.momentumDelta : undefined,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((t): t is string => typeof t === "string")
      : undefined,
    allocation:
      typeof raw.allocation === "string" &&
      ALLOCATIONS.has(raw.allocation as AllocationKind)
        ? (raw.allocation as AllocationKind)
        : undefined,
    linkedDecisionId:
      typeof raw.linkedDecisionId === "string"
        ? raw.linkedDecisionId
        : undefined,
    environment: normalizeEnvironment(raw.environment),
  };
}

function fromCalendar(raw: Record<string, unknown>): TrajectoryEvent[] {
  const items = raw.items;
  if (!Array.isArray(items)) throw new Error("calendar.items required");
  return items.map((item, i) => {
    if (!isRecord(item)) throw new Error(`calendar.items[${i}] invalid`);
    return {
      id: `cal-${i}`,
      kind: "interaction",
      timestamp:
        typeof item.start === "string" ? item.start : new Date().toISOString(),
      subject:
        typeof item.summary === "string" ? item.summary : "calendar",
      description:
        typeof item.summary === "string"
          ? item.summary
          : "Calendar block",
      momentumDelta: item.cancelled === true ? -1 : 1,
      tags: ["ingested", "calendar"],
    };
  });
}

function fromComms(raw: Record<string, unknown>): TrajectoryEvent[] {
  const messages = raw.messages;
  if (!Array.isArray(messages)) throw new Error("comms.messages required");
  return messages.map((msg, i) => {
    if (!isRecord(msg)) throw new Error(`comms.messages[${i}] invalid`);
    const body = String(msg.body ?? "");
    const negative = /urgent|override|conflict|stale/i.test(body);
    return {
      id: `comms-${i}`,
      kind: negative ? "entropy_spike" : "interaction",
      timestamp: typeof msg.at === "string" ? msg.at : new Date().toISOString(),
      subject:
        typeof msg.channel === "string"
          ? `${msg.channel}${msg.from ? ` · ${msg.from}` : ""}`
          : "comms",
      description: body.slice(0, 240),
      momentumDelta: negative ? -1 : 1,
      tags: ["ingested", "comms"],
    };
  });
}

function fromTools(raw: Record<string, unknown>): TrajectoryEvent[] {
  const actions = raw.actions;
  if (!Array.isArray(actions)) throw new Error("tools.actions required");
  return actions.map((act, i) => {
    if (!isRecord(act)) throw new Error(`tools.actions[${i}] invalid`);
    const action = String(act.action ?? "");
    const avoided = /skipped|deferred|cancelled/i.test(action);
    return {
      id: `tool-${i}`,
      kind: avoided ? "action_avoided" : "action_taken",
      timestamp: typeof act.at === "string" ? act.at : new Date().toISOString(),
      subject: typeof act.tool === "string" ? act.tool : "tool",
      description: action,
      momentumDelta: avoided ? -1 : 1,
      tags: ["ingested", "tools"],
    };
  });
}

/** Ingest trajectory events from JSON — native events or adapter shapes. */
export function ingestTrajectoryEvents(raw: unknown): IngestResult {
  if (!isRecord(raw)) {
    throw new Error("Payload must be a JSON object");
  }

  if (Array.isArray(raw.trajectoryEvents)) {
    return {
      events: raw.trajectoryEvents.map(normalizeEvent),
      source: "trajectoryEvents",
      merged: raw.trajectoryEvents.length,
    };
  }

  if (isRecord(raw.trajectoryEvents) && Array.isArray(raw.trajectoryEvents.events)) {
    const evs = raw.trajectoryEvents.events.map(normalizeEvent);
    return {
      events: evs,
      source:
        typeof raw.trajectoryEvents.source === "string"
          ? raw.trajectoryEvents.source
          : "bundle",
      merged: evs.length,
    };
  }

  if (Array.isArray(raw.events)) {
    return {
      events: raw.events.map(normalizeEvent),
      source: "events",
      merged: raw.events.length,
    };
  }

  if (raw.source === "calendar") {
    const events = fromCalendar(raw);
    return { events, source: "calendar", merged: events.length };
  }
  if (raw.source === "comms") {
    const events = fromComms(raw);
    return { events, source: "comms", merged: events.length };
  }
  if (raw.source === "tools") {
    const events = fromTools(raw);
    return { events, source: "tools", merged: events.length };
  }

  throw new Error(
    "Expected trajectoryEvents[], { source: calendar|comms|tools }, or events[]",
  );
}
