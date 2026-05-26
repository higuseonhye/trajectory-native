"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterventionPanel } from "@/components/InterventionPanel";
import { MomentumSurface } from "@/components/MomentumSurface";
import { CompoundingAnalysis } from "@/components/CompoundingAnalysis";
import { CapitalLeverageReflection } from "@/components/CapitalLeverageReflection";
import { TrajectoryGraphView } from "@/components/TrajectoryGraphView";
import { DecisionJournal } from "@/components/DecisionJournal";
import { TeamDecisionMemory } from "@/components/TeamDecisionMemory";
import { TrajectoryEventsFeed } from "@/components/TrajectoryEventsFeed";
import { InteractionGraphView } from "@/components/InteractionGraphView";
import { EventIngestPanel } from "@/components/EventIngestPanel";
import { BridgePanel } from "@/components/BridgePanel";
import { CalibrationLog } from "@/components/CalibrationLog";
import { WeeklyChanges } from "@/components/WeeklyChanges";
import { FailedAssumptions } from "@/components/FailedAssumptions";
import { SignalsReceived } from "@/components/SignalsReceived";
import { WhySiliconValley } from "@/components/WhySiliconValley";
import { CalibrationNotesSection } from "@/components/CalibrationNotes";
import { WindowDynamics } from "@/components/WindowDynamics";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { ObsessionCard } from "@/components/ObsessionCard";
import { TrajectoryFeed } from "@/components/TrajectoryFeed";
import { ReasoningLayer } from "@/components/ReasoningLayer";
import {
  calibrationLog,
  weeklyChanges,
  failedAssumptions,
  signalsReceived,
  calibrationNotes,
  windowDynamics,
  obsession,
  trajectoryTimeline,
  trajectoryFeed,
  reasoningTraces,
  calibrationReplies,
} from "@/lib/data";
import { DailySteeringPanel } from "@/components/DailySteeringPanel";
import { PhysicalLayerPanel } from "@/components/PhysicalLayerPanel";
import type { DecisionEntry } from "@/lib/decision-journal";
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import {
  linkDecisionToEvents,
  loadDecisionEntries,
  saveDecisionEntries,
} from "@/lib/decision-journal-store";
import {
  loadSteeringTurns,
  saveSteeringTurns,
} from "@/lib/daily-steering-store";
import type { SteeringTurn } from "@/lib/daily-steering";
import {
  loadTrajectoryEvents,
  mergeTrajectoryEvents,
  saveTrajectoryEvents,
} from "@/lib/trajectory-events-store";

export function TrajectoryWorkspace() {
  const [events, setEvents] = useState<TrajectoryEvent[]>([]);
  const [decisions, setDecisions] = useState<DecisionEntry[]>([]);
  const [steeringTurns, setSteeringTurns] = useState<SteeringTurn[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEvents(loadTrajectoryEvents());
    setDecisions(loadDecisionEntries());
    setSteeringTurns(loadSteeringTurns());
    setHydrated(true);
  }, []);

  const handleIngest = useCallback(
    (incoming: TrajectoryEvent[], _source: string) => {
      setEvents((prev) => {
        const next = mergeTrajectoryEvents(prev, incoming);
        saveTrajectoryEvents(next);
        return next;
      });
    },
    [],
  );

  const handleAddDecision = useCallback((entry: DecisionEntry) => {
    setDecisions((prevDecisions) => {
      const nextDecisions = [entry, ...prevDecisions];
      setEvents((prevEvents) => {
        if (entry.linkedEventIds?.length) {
          const { events: nextEvents } = linkDecisionToEvents(
            nextDecisions,
            prevEvents,
            entry.id,
            entry.linkedEventIds,
          );
          saveTrajectoryEvents(nextEvents);
          return nextEvents;
        }
        return prevEvents;
      });
      saveDecisionEntries(nextDecisions);
      return nextDecisions;
    });
  }, []);

  const handleReviewDecision = useCallback((id: string, outcome: string) => {
    setDecisions((prev) => {
      const next = prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "reviewed" as const,
              outcome,
              reviewedAt: new Date().toISOString(),
            }
          : d,
      );
      saveDecisionEntries(next);
      return next;
    });
  }, []);

  const handleLinkEvents = useCallback(
    (decisionId: string, eventIds: string[]) => {
      setDecisions((prev) => {
        const { decisions: nextDecisions, events: nextEvents } =
          linkDecisionToEvents(prev, events, decisionId, eventIds);
        saveDecisionEntries(nextDecisions);
        saveTrajectoryEvents(nextEvents);
        setEvents(nextEvents);
        return nextDecisions;
      });
    },
    [events],
  );

  const handleSteeringTurnsChange = useCallback((turns: SteeringTurn[]) => {
    setSteeringTurns(turns);
    saveSteeringTurns(turns);
  }, []);

  if (!hydrated) {
    return (
      <p className="px-6 py-12 text-sm text-[var(--muted)]">Loading…</p>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl space-y-2">
          <InterventionPanel events={events} />
          <DailySteeringPanel
            events={events}
            turns={steeringTurns}
            onTurnsChange={handleSteeringTurnsChange}
            onIngest={handleIngest}
          />
          <MomentumSurface events={events} />
          <CompoundingAnalysis events={events} />
          <CapitalLeverageReflection events={events} />
          <TrajectoryGraphView events={events} decisions={decisions} />
          <DecisionJournal
            events={events}
            decisions={decisions}
            onAdd={handleAddDecision}
            onReview={handleReviewDecision}
            onLinkEvents={handleLinkEvents}
          />
          <TeamDecisionMemory />
          <InteractionGraphView events={events} />
          <EventIngestPanel onIngest={handleIngest} />
          <BridgePanel events={events} />
          <PhysicalLayerPanel />
          <TrajectoryEventsFeed events={events} decisions={decisions} />
          <CalibrationLog entries={calibrationLog} />
          <WeeklyChanges changes={weeklyChanges} />
          <FailedAssumptions assumptions={failedAssumptions} />
          <SignalsReceived signals={signalsReceived} />
          <WhySiliconValley />
          <CalibrationNotesSection data={calibrationNotes} />
          <WindowDynamics entries={windowDynamics} />
          <TrajectoryTimeline events={trajectoryTimeline} />
          <ObsessionCard data={obsession} calibrations={calibrationReplies} />
          <TrajectoryFeed
            entries={trajectoryFeed}
            calibrations={calibrationReplies}
          />
          <ReasoningLayer
            traces={reasoningTraces}
            calibrations={calibrationReplies}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
