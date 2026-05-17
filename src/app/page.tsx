import { Header } from "@/components/Header";
import { CalibrationNotesSection } from "@/components/CalibrationNotes";
import { WindowDynamics } from "@/components/WindowDynamics";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { SignalsReceived } from "@/components/SignalsReceived";
import { ObsessionCard } from "@/components/ObsessionCard";
import { TrajectoryFeed } from "@/components/TrajectoryFeed";
import { ReasoningLayer } from "@/components/ReasoningLayer";
import { Footer } from "@/components/Footer";
import {
  calibrationNotes,
  windowDynamics,
  obsession,
  signalsReceived,
  trajectoryTimeline,
  trajectoryFeed,
  reasoningTraces,
  calibrationReplies,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-3xl space-y-16">
          <CalibrationNotesSection data={calibrationNotes} />
          <WindowDynamics entries={windowDynamics} />
          <TrajectoryTimeline events={trajectoryTimeline} />
          <SignalsReceived signals={signalsReceived} />
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
