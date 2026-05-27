interface Props {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/** Shared section rhythm — breathable, warm, unhurried. */
export function Section({ id, title, description, children }: Props) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-[var(--border)]/60 pt-16 first:border-0 first:pt-0 md:pt-20"
    >
      <h2
        id={id}
        className="text-lg font-medium tracking-tight text-[var(--foreground)] md:text-xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  );
}
