import { Section } from "./Section";

const REFERENCES = [
  {
    name: "Vermouth hour",
    detail: "Madrid wine bars · aperitivo · the hour before evening — unhurried, warm, alive.",
  },
  {
    name: "Kissaten & greenhouse",
    detail: "Japanese coffee silence · botanical light · places with time embedded in them.",
  },
  {
    name: "Gatherings",
    detail: "Not networking. One subtle turn shared aloud. Return made social, not performative.",
  },
] as const;

const DOMAINS = [
  { name: "Rooms", examples: "Warm wood, natural light, old signage with modern care" },
  { name: "Ritual", examples: "Today's turn · vermouth hour · embodied return" },
  { name: "Objects", examples: "Journals, scent, fabric — rhythm you can hold" },
] as const;

export function PhysicalLayerPanel() {
  return (
    <Section
      id="physical-layer-heading"
      title="Vermouth Hour"
      description="Software is one expression. The philosophy may become rooms, gatherings, and rituals you can walk into."
    >
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        A north star for physical design — not luxury, not startup culture. Warmth,
        silence, conversation with time in it. Places where people feel like
        themselves again.
      </p>

      <ul className="mt-8 space-y-4">
        {REFERENCES.map((r) => (
          <li
            key={r.name}
            className="border-l border-[var(--accent)]/40 pl-4"
          >
            <p className="text-sm font-medium text-[var(--foreground)]">
              {r.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {r.detail}
            </p>
          </li>
        ))}
      </ul>

      <ul className="mt-10 space-y-3">
        {DOMAINS.map((d) => (
          <li
            key={d.name}
            className="rounded border border-[var(--border)]/80 px-4 py-3"
          >
            <p className="text-xs tracking-wide text-[var(--accent)]">
              {d.name}
            </p>
            <p className="mt-1 text-sm text-[var(--foreground)]">
              {d.examples}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-[var(--muted)]">
        Framework:{" "}
        <a
          href="https://github.com/higuseonhye/return/tree/main/framework/vermouth-hour"
          className="underline underline-offset-2 hover:text-[var(--foreground)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          vermouth-hour/
        </a>
      </p>
    </Section>
  );
}
