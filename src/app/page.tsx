import { Header } from "@/components/Header";
import { ObsessionCard } from "@/components/ObsessionCard";
import { TrajectoryFeed } from "@/components/TrajectoryFeed";
import { ReasoningLayer } from "@/components/ReasoningLayer";
import { Footer } from "@/components/Footer";
import {
  obsession,
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
