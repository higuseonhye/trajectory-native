import { Section } from "./Section";

const DOMAINS = [
  { name: "Spatial", examples: "Greenhouse aesthetics, warm architecture" },
  { name: "Sensory", examples: "Light, scent, plants, texture, fabric" },
  { name: "Hospitality", examples: "Winery atmosphere, retreats, curated spaces" },
  { name: "Objects", examples: "Furniture, fashion as trajectory artifacts" },
  { name: "Ritual", examples: "Embodied practices tied to steering" },
] as const;

export function PhysicalLayerPanel() {
  return (
    <Section
      id="physical-layer-heading"
      title="Spaces to come"
      description="Software is one expression. Physical rhythm — cafés, greenhouses, rituals — may follow."
    >
      <p className="text-sm text-[var(--muted)]">
        Reference energy: Malibu coastline · greenhouse · Mediterranean winery ·
        botanical gardens · places where people feel alive again.
      </p>
      <ul className="mt-4 space-y-3">
        {DOMAINS.map((d) => (
          <li
            key={d.name}
            className="rounded border border-[var(--border)] px-4 py-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
              {d.name}
            </p>
            <p className="mt-1 text-sm text-[var(--foreground)]">{d.examples}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Framework:{" "}
        <a
          href="https://github.com/higuseonhye/trajectory-native/tree/main/framework/physical-layer"
          className="underline underline-offset-2 hover:text-[var(--foreground)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          physical-layer/
        </a>
      </p>
    </Section>
  );
}
