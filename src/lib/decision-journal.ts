/** Personal decision journal — compounding judgment layer. */

export type DecisionStatus = "pending" | "decided" | "reviewed";
export type ConfidenceLevel = "low" | "medium" | "high";

export interface DecisionEntry {
  id: string;
  statement: string;
  decidedAt: string;
  confidence: ConfidenceLevel;
  assumptions: string[];
  alternativesRejected?: string;
  status: DecisionStatus;
  outcome?: string;
  reviewedAt?: string;
  /** Link to recurring mistake pattern, e.g. "reactive-switching". */
  patternLink?: string;
  /** Trajectory events that informed or resulted from this decision. */
  linkedEventIds?: string[];
}

export const sampleDecisionEntries: DecisionEntry[] = [
  {
    id: "dj1",
    statement:
      "Reframe from builder social platform to calibration memory layer.",
    decidedAt: "2026-05-16T10:00:00Z",
    confidence: "high",
    assumptions: [
      "Persistent calibration is scarcer than communication channels.",
      "Founders will log signals if friction is low.",
    ],
    alternativesRejected: "Global chat inbox; follower graph mechanics.",
    status: "decided",
    patternLink: "prestige-drift",
    linkedEventIds: ["te3"],
  },
  {
    id: "dj2",
    statement:
      "Ship v0.5 founder operating surface after null public signal.",
    decidedAt: "2026-05-17T09:00:00Z",
    confidence: "medium",
    assumptions: [
      "Operational tension in product attracts more than abstract framing.",
      "Instrumenting silence beats waiting for engagement.",
    ],
    alternativesRejected: "More positioning posts before product depth.",
    status: "decided",
    outcome:
      "Shipped calibration log, weekly changes, failed assumptions surfaces.",
    reviewedAt: "2026-05-17T18:00:00Z",
    linkedEventIds: ["te4", "te3"],
  },
  {
    id: "dj3",
    statement:
      "Pivot product thesis to trajectory/judgment infrastructure.",
    decidedAt: "2026-05-23T08:00:00Z",
    confidence: "high",
    assumptions: [
      "AI productivity is commoditizing; judgment infrastructure is not.",
      "Decision memory and drift detection map to real behavioral gaps.",
    ],
    alternativesRejected: "PM copilot; meeting summarizer positioning.",
    status: "pending",
  },
];
