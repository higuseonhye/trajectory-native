export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          trajectory-native · v0.8 direction
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-[2rem] md:leading-tight">
          Trajectory / judgment infrastructure
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Compound judgment, ownership, and long-term trajectory. Detect drift,
          preserve decision memory, surface what actually compounds.
        </p>
        <p className="mt-3 text-xs italic text-[var(--muted)]">
          Pairs with{" "}
          <a
            href="https://github.com/higuseonhye/trajectory-drift"
            className="underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            trajectory-drift
          </a>{" "}
          for organizational and agent coordination.
        </p>
      </div>
    </header>
  );
}
