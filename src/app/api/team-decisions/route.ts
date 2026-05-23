import { NextResponse } from "next/server";
import {
  sampleTeamDecisions,
  type TeamDecision,
  type TeamDecisionPayload,
} from "@/lib/team-decisions";

export const runtime = "nodejs";

type RemoteEntry = {
  decision: {
    id: string;
    statement: string;
    status: TeamDecision["status"];
    decisionDate?: string | null;
    createdAt: string;
  };
  supersededById?: string | null;
  supersedesIds?: string[];
};

export async function GET() {
  const base = process.env.ORG_REASONING_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${base}/api/decisions`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const raw = (await res.json()) as { entries: RemoteEntry[] };
      const entries: TeamDecision[] = (raw.entries ?? []).map((e) => ({
        id: e.decision.id,
        statement: e.decision.statement,
        status: e.decision.status,
        decisionDate: e.decision.decisionDate ?? undefined,
        createdAt: e.decision.createdAt,
        supersededById: e.supersededById,
        supersedesCount: e.supersedesIds?.length,
      }));
      if (entries.length > 0) {
        const payload: TeamDecisionPayload = {
          entries,
          source: "live",
        };
        return NextResponse.json(payload);
      }
    }
  } catch {
    /* fall through to seed */
  }

  const payload: TeamDecisionPayload = {
    entries: sampleTeamDecisions,
    source: "seed",
  };
  return NextResponse.json(payload);
}
