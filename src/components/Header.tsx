export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          trajectory-native · steering mode
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-[2rem] md:leading-tight">
          Stop drifting quietly.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          A trajectory-aware operating system. Notice drift, make tiny turns,
          stay in contact with reality — not another productivity dashboard.
        </p>
        <p className="mt-3 text-xs italic text-[var(--muted)]">
          Tiny turns create different futures. Pairs with{" "}
          <a
            href="https://github.com/higuseonhye/trajectory-drift"
            className="underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            trajectory-drift
          </a>{" "}
          for teams and agents.
        </p>
      </div>
    </header>
  );
}
