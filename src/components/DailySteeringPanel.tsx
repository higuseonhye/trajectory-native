"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatRelativeTime } from "@/lib/format";
import {
  dayKeyFromDate,
  getTurnForDay,
  type SteeringTurn,
  type VitalityTag,
} from "@/lib/daily-steering";
import { addSteeringTurn } from "@/lib/daily-steering-store";
import { detectInterventions } from "@/lib/intervention";
import { computeCompoundingMetrics } from "@/lib/compounding-engine";
import { computeMomentumMetrics } from "@/lib/momentum-engine";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import { Section } from "./Section";

interface Props {
  events: TrajectoryEvent[];
  turns: SteeringTurn[];
  onTurnsChange: (turns: SteeringTurn[]) => void;
  onIngest?: (events: TrajectoryEvent[], source: string) => void;
}

const VITALITY_LABEL: Record<VitalityTag, string> = {
  alive: "alive",
  flat: "flat",
  numb: "numb",
};

export function DailySteeringPanel({
  events,
  turns,
  onTurnsChange,
  onIngest,
}: Props) {
  const todayKey = dayKeyFromDate();
  const todayTurn = useMemo(
    () => getTurnForDay(turns, todayKey),
    [turns, todayKey],
  );
  const [editing, setEditing] = useState(!todayTurn);
  const [turn, setTurn] = useState("");
  const [vitality, setVitality] = useState<VitalityTag | "">("");
  const [environmentTurn, setEnvironmentTurn] = useState(false);
  const [alsoLogEvent, setAlsoLogEvent] = useState(false);

  useEffect(() => {
    if (todayTurn && editing) {
      setTurn(todayTurn.turn);
      setVitality(todayTurn.vitality ?? "");
      setEnvironmentTurn(todayTurn.environmentTurn ?? false);
    }
  }, [todayTurn, editing]);

  const metrics = computeMomentumMetrics(events);
  const compounding = computeCompoundingMetrics(events);
  const driftActive =
    detectInterventions(events, metrics, compounding).length > 0;
  const showNudge = !todayTurn && driftActive;

  const recent = [...turns]
    .sort(
      (a, b) =>
        new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime(),
    )
    .slice(0, 5);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!turn.trim()) return;

      const entry: SteeringTurn = {
        id: todayTurn?.id ?? `st-${Date.now()}`,
        loggedAt: new Date().toISOString(),
        dayKey: todayKey,
        turn: turn.trim(),
        vitality: vitality || undefined,
        environmentTurn: environmentTurn || undefined,
      };

      if (alsoLogEvent && onIngest) {
        const linkedEventId = `evt-st-${Date.now()}`;
        onIngest(
          [
            {
              id: linkedEventId,
              kind: environmentTurn ? "environment_alignment" : "momentum_gain",
              timestamp: entry.loggedAt,
              description: turn.trim(),
              momentumDelta: 1,
              tags: [
                "daily-steering",
                ...(environmentTurn ? ["environment-turn"] : []),
              ],
              environment: environmentTurn
                ? { atmosphere: "restorative", tags: ["steering-turn"] }
                : undefined,
            },
          ],
          "daily-steering",
        );
        entry.linkedEventId = linkedEventId;
      }

      onTurnsChange(addSteeringTurn(entry));
      setAlsoLogEvent(false);
      setEditing(false);
    },
    [
      turn,
      todayKey,
      todayTurn,
      vitality,
      environmentTurn,
      alsoLogEvent,
      onIngest,
      onTurnsChange,
    ],
  );

  return (
    <Section
      id="daily-steering-heading"
      title="Daily steering"
      description="What tiny turn did you make today — toward direction you actually chose?"
    >
      {showNudge && (
        <p className="mb-4 border-l-2 border-[var(--accent)] pl-4 text-sm italic text-[var(--muted)]">
          No turn today. That&apos;s data too. What&apos;s one small move toward
          signal you trust?
        </p>
      )}

      {todayTurn && !editing && (
        <div className="rounded border border-[var(--border)] px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
            Today&apos;s turn
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
            {todayTurn.turn}
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {todayTurn.vitality && (
              <>vitality: {VITALITY_LABEL[todayTurn.vitality]} · </>
            )}
            {todayTurn.environmentTurn && <>environment turn · </>}
            {formatRelativeTime(todayTurn.loggedAt)}
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-3 text-xs text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Edit today&apos;s turn
          </button>
        </div>
      )}

      {(!todayTurn || editing) && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-xs text-[var(--muted)]">
            Your turn
            <textarea
              className="mt-1 min-h-[80px] w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
              value={turn}
              onChange={(e) => setTurn(e.target.value)}
              placeholder="One honest conversation, one loop closed, one moment outside…"
              required
            />
          </label>

          <div className="flex flex-wrap gap-4">
            <label className="text-xs text-[var(--muted)]">
              Vitality (optional)
              <select
                className="mt-1 block rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm"
                value={vitality}
                onChange={(e) =>
                  setVitality(e.target.value as VitalityTag | "")
                }
              >
                <option value="">—</option>
                {(Object.keys(VITALITY_LABEL) as VitalityTag[]).map((v) => (
                  <option key={v} value={v}>
                    {VITALITY_LABEL[v]}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-end gap-2 text-xs text-[var(--muted)]">
              <input
                type="checkbox"
                checked={environmentTurn}
                onChange={(e) => setEnvironmentTurn(e.target.checked)}
              />
              Environmental turn
            </label>
            {onIngest && (
              <label className="flex items-end gap-2 text-xs text-[var(--muted)]">
                <input
                  type="checkbox"
                  checked={alsoLogEvent}
                  onChange={(e) => setAlsoLogEvent(e.target.checked)}
                />
                Also log as trajectory event
              </label>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
            >
              Save turn
            </button>
            {todayTurn && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {recent.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-[var(--border)] pt-4">
          {recent.map((t) => (
            <li key={t.id} className="text-xs text-[var(--muted)]">
              <span className="text-[var(--foreground)]">{t.turn}</span>
              <span className="ml-2">{t.dayKey}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
