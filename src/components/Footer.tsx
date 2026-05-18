export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-[11px] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>
          Founder adaptation · null signals logged · not optimized for virality
        </p>
        <p className="font-mono">v0.5.0</p>
      </div>
    </footer>
  );
}
