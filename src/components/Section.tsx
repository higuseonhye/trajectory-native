interface Props {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Section({ id, title, description, children }: Props) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-[var(--border)] pt-14 first:border-0 first:pt-0"
    >
      <h2
        id={id}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}
