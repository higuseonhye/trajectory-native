export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-12 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Return · drift & return
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-[2rem] md:leading-snug">
          Do you still feel like yourself?
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          A quiet room for rhythm — not productivity. Notice when aliveness
          fades, remember what mattered, make one subtle turn toward return.
        </p>
        <p className="mt-4 text-xs italic text-[var(--muted)]">
          Warmth, pause, continuity. Pairs with{" "}
          <a
            href="https://github.com/higuseonhye/trajectory-drift"
            className="underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Drift
          </a>{" "}
          for collective rhythm.
        </p>
      </div>
    </header>
  );
}
