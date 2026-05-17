export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          trajectory-native
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-3xl">
          Trajectory-aware calibration memory
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Not another social network. A living strategic notebook for builders:
          capture signals, persist calibration, link execution to evolving
          reasoning across GitHub, X, DMs, and beyond.
        </p>
      </div>
    </header>
  );
}
