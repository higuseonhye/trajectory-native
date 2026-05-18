export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          trajectory-native - v0.5
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-[2rem] md:leading-tight">
          Founder calibration console
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Live adaptation under compressed windows. Observable movement, failed
          assumptions, and signal-to-action loops - not startup marketing. One
          core repo; trajectory continuity over repo fragmentation.
        </p>
      </div>
    </header>
  );
}
