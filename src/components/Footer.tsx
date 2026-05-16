export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>
          Experimental · trajectory over profile · GitHub-native by design
        </p>
        <p className="font-mono">v0.1.0 — living artifact</p>
      </div>
    </footer>
  );
}
