export function Header() {
  return (
    <header className="border-b border-[var(--border)] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          trajectory-native · core trajectory repo
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-3xl">
          Strategic adaptation under compressed windows
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          In AI-native markets, execution is abundant while strategic windows
          compress rapidly. This is the living calibration memory — not
          another chat app, not a repo per idea. One artifact for trajectory,
          reasoning, and repeated action under timing pressure.
        </p>
      </div>
    </header>
  );
}
