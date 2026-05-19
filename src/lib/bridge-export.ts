import type { TrajectoryEvent } from "./trajectory-events";

/** Payload for trajectory-drift ingestion (unified run). */
export interface NativeDriftBridgePayload {
  trajectoryEvents: TrajectoryEvent[];
  trajectoryEventsSource: "trajectory-native";
  bridgeVersion: "1";
  exportedAt: string;
}

export function buildDriftBridgePayload(
  events: TrajectoryEvent[],
): NativeDriftBridgePayload {
  return {
    trajectoryEvents: events,
    trajectoryEventsSource: "trajectory-native",
    bridgeVersion: "1",
    exportedAt: new Date().toISOString(),
  };
}

export function downloadBridgeJson(events: TrajectoryEvent[]): void {
  const payload = buildDriftBridgePayload(events);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "trajectory-native-bridge.json";
  a.click();
  URL.revokeObjectURL(url);
}
