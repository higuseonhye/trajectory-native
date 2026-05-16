export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          trajectory-native
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-3xl">
          Builder trajectory workspace
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          A live thinking + execution artifact. Trajectory over profile.
          Repeated action over static identity.
        </p>
      </div>
    </header>
  );
}
