import { Section } from "./Section";

export function WhySiliconValley() {
  return (
    <Section
      id="silicon-valley-heading"
      title="Why Silicon Valley?"
      description="Ecosystem note ??not relocation hype. Proximity as calibration infrastructure."
    >
      <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-5 text-sm leading-relaxed">
        <p className="text-[var(--foreground)]">
          Trajectory calibration improves under{" "}
          <span className="text-[var(--accent)]">dense ecosystem exposure</span>
          : builders, operators, investors, and distribution paths in the same
          compressed loop.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          AI-native markets reward proximity ??not because geography is magic,
          but because feedback cycles are shorter. Misalignment surfaces faster.
          Windows are visible sooner.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          This repo logs adaptation whether you are in SF or not. The point is
          explicit: calibration quality correlates with ecosystem density when
          windows compress.
        </p>
      </div>
    </Section>
  );
}
