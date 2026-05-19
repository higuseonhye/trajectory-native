"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterventionPanel } from "@/components/InterventionPanel";
import { MomentumSurface } from "@/components/MomentumSurface";
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
import type { TrajectoryEvent } from "@/lib/trajectory-events";
import {
  loadTrajectoryEvents,
  mergeTrajectoryEvents,
  saveTrajectoryEvents,
} from "@/lib/trajectory-events-store";

export function TrajectoryWorkspace() {
  const [events, setEvents] = useState<TrajectoryEvent[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEvents(loadTrajectoryEvents());
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
          <MomentumSurface events={events} />
          <InteractionGraphView events={events} />
          <EventIngestPanel onIngest={handleIngest} />
          <BridgePanel events={events} />
          <TrajectoryEventsFeed events={events} />
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
