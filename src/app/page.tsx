import { Header } from "@/components/Header";
import { InterventionPanel } from "@/components/InterventionPanel";
import { MomentumSurface } from "@/components/MomentumSurface";
import { TrajectoryEventsFeed } from "@/components/TrajectoryEventsFeed";
import { CalibrationLog } from "@/components/CalibrationLog";
import { sampleTrajectoryEvents } from "@/lib/trajectory-events";
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
import { Footer } from "@/components/Footer";
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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl space-y-2">
          <InterventionPanel events={sampleTrajectoryEvents} />
          <MomentumSurface events={sampleTrajectoryEvents} />
          <TrajectoryEventsFeed events={sampleTrajectoryEvents} />
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
