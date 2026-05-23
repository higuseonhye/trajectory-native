/** Team decision memory — org-reasoning-mvp compatible shape. */

export interface TeamDecision {
  id: string;
  statement: string;
  status: "proposed" | "decided" | "reversed" | "superseded";
  decisionDate?: string;
  createdAt: string;
  supersededById?: string | null;
  supersedesCount?: number;
  evidenceQuote?: string;
}

export interface TeamDecisionPayload {
  entries: TeamDecision[];
  source: "live" | "seed" | "unavailable";
}

export const sampleTeamDecisions: TeamDecision[] = [
  {
    id: "td1",
    statement:
      "Prioritize enterprise tier launch before self-serve growth experiments.",
    status: "decided",
    decisionDate: "2026-04-01",
    createdAt: "2026-04-01T10:00:00Z",
    evidenceQuote:
      "We accept onboarding rough edges for two sprints to hit procurement timelines.",
  },
  {
    id: "td2",
    statement:
      "Commit to enterprise-first motion — supersede consumer-led rollout.",
    status: "decided",
    decisionDate: "2026-04-15",
    createdAt: "2026-04-15T14:00:00Z",
    supersedesCount: 1,
    evidenceQuote:
      "Pipeline concentration favors enterprise given fiscal year alignment pressure.",
  },
  {
    id: "td3",
    statement:
      "Build judgment infrastructure layer — not AI productivity tooling.",
    status: "proposed",
    decisionDate: "2026-05-23",
    createdAt: "2026-05-23T08:00:00Z",
    evidenceQuote:
      "Decision memory and drift detection map to real behavioral gaps.",
  },
];
