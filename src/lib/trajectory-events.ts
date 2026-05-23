/** Core atomic unit — observable trajectory events, not abstract notes. */

export type AllocationKind =
  | "labor"
  | "ownership"
  | "consumption"
  | "investment";

export type TrajectoryEventKind =
  | "interaction"
  | "action_taken"
  | "action_avoided"
  | "momentum_gain"
  | "momentum_loss"
  | "entropy_spike"
  | "energy_restore"
  | "execution_collapse"
  | "environment_alignment"
  | "loop_unfinished";

export interface TrajectoryEvent {
  id: string;
  kind: TrajectoryEventKind;
  timestamp: string;
  /** Who or what was involved — person, channel, environment. */
  subject?: string;
  description: string;
  /** -1 entropy drain · 0 neutral · +1 momentum */
  momentumDelta?: number;
  tags?: string[];
  /** labor vs ownership vs consumption vs investment — auto-classified if omitted */
  allocation?: AllocationKind;
  /** Decision journal entry linked to this event. */
  linkedDecisionId?: string;
}

export const sampleTrajectoryEvents: TrajectoryEvent[] = [
  {
    id: "te1",
    kind: "interaction",
    timestamp: "2026-05-17T14:00:00Z",
    subject: "accelerator office hours",
    description: "30min conversation — activation increased, one concrete next step committed.",
    momentumDelta: 1,
    tags: ["high-signal"],
    allocation: "investment",
  },
  {
    id: "te2",
    kind: "action_avoided",
    timestamp: "2026-05-17T11:00:00Z",
    subject: "outbound DMs",
    description: "Planned 5 founder reach-outs; completed 0. Abstraction work substituted.",
    momentumDelta: -1,
    tags: ["loop-open"],
    allocation: "labor",
  },
  {
    id: "te3",
    kind: "entropy_spike",
    timestamp: "2026-05-16T22:00:00Z",
    description: "Reactive positioning draft after low-engagement post — no customer contact.",
    momentumDelta: -1,
    tags: ["reactive-switch"],
    allocation: "consumption",
    linkedDecisionId: "dj1",
  },
  {
    id: "te4",
    kind: "momentum_gain",
    timestamp: "2026-05-16T16:00:00Z",
    subject: "pair build session",
    description: "Shipped calibration log UI in 2h — execution density restored.",
    momentumDelta: 1,
    tags: ["shipped", "ownership"],
    allocation: "ownership",
    linkedDecisionId: "dj2",
  },
  {
    id: "te5",
    kind: "loop_unfinished",
    timestamp: "2026-05-15T09:00:00Z",
    subject: "follow-up from conference",
    description: "Three warm intros uncontacted after 72h.",
    momentumDelta: -1,
    tags: ["interaction-starvation"],
    allocation: "labor",
  },
  {
    id: "te6",
    kind: "energy_restore",
    timestamp: "2026-05-15T07:00:00Z",
    subject: "morning walk + no Slack",
    description: "Recovered capacity to re-read calibration log without urgency distortion.",
    momentumDelta: 1,
    allocation: "investment",
  },
];
