const kindLabels: Record<string, string> = {
  note: "note",
  experiment: "experiment",
  commit: "commit",
  focus: "focus",
  shift: "shift",
};

const signalSourceLabels: Record<string, string> = {
  x: "X",
  github: "GitHub",
  discord: "Discord",
  slack: "Slack",
  dm: "DM",
  accelerator: "Accelerator",
  conference: "Conference",
  other: "External",
};

const timelineKindLabels: Record<string, string> = {
  signal: "signal",
  calibration: "calibration",
  reasoning: "reasoning",
  pivot: "pivot",
  obsession: "obsession",
  commit: "commit",
  window: "window",
};

const windowKindLabels: Record<string, string> = {
  crowding: "crowding",
  commoditization: "commoditization",
  "distribution-shift": "distribution",
  "moat-decay": "moat decay",
  "timing-pressure": "timing pressure",
  "ecosystem-shift": "ecosystem shift",
  opportunity: "opportunity",
};

const weeklyCategoryLabels: Record<string, string> = {
  thesis: "thesis",
  positioning: "positioning",
  reframing: "reframing",
  operational: "operational",
  interaction: "interaction",
};

export function formatKind(kind: string): string {
  return kindLabels[kind] ?? kind;
}

export function formatSignalSource(source: string): string {
  return signalSourceLabels[source] ?? source;
}

export function formatTimelineKind(kind: string): string {
  return timelineKindLabels[kind] ?? kind;
}

export function formatWindowKind(kind: string): string {
  return windowKindLabels[kind] ?? kind;
}

export function formatWeeklyCategory(category: string): string {
  return weeklyCategoryLabels[category] ?? category;
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
