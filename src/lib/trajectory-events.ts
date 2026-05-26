/** Core atomic unit — observable trajectory events, not abstract notes. */

import type { EventEnvironment } from "./environment";

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
  /** Where and what atmosphere — embodied trajectory context. */
  environment?: EventEnvironment;
}

export const sampleTrajectoryEvents: TrajectoryEvent[] = [
  {
    id: "te1",
    kind: "interaction",
    timestamp: "2026-05-24T14:00:00Z",
    subject: "accelerator office hours",
    description: "30min conversation — activation increased, one concrete next step committed.",
    momentumDelta: 1,
    tags: ["high-signal"],
    allocation: "investment",
    environment: {
      context: "social",
      atmosphere: "alive",
      tags: ["warm", "natural-light"],
    },
  },
  {
    id: "te2",
    kind: "action_avoided",
    timestamp: "2026-05-24T11:00:00Z",
    subject: "outbound DMs",
    description: "Planned 5 founder reach-outs; completed 0. Abstraction work substituted.",
    momentumDelta: -1,
    tags: ["loop-open"],
    allocation: "labor",
    environment: {
      context: "office",
      atmosphere: "dead",
      tags: ["fluorescent", "indoor-loop"],
    },
  },
  {
    id: "te3",
    kind: "entropy_spike",
    timestamp: "2026-05-23T22:00:00Z",
    description: "Reactive positioning draft after low-engagement post — no customer contact.",
    momentumDelta: -1,
    tags: ["reactive-switch"],
    allocation: "consumption",
    linkedDecisionId: "dj1",
    environment: {
      context: "digital",
      atmosphere: "dead",
      tags: ["scroll-feed", "sensory-flat"],
    },
  },
  {
    id: "te4",
    kind: "momentum_gain",
    timestamp: "2026-05-23T16:00:00Z",
    subject: "pair build session",
    description: "Shipped calibration log UI in 2h — execution density restored.",
    momentumDelta: 1,
    tags: ["shipped", "ownership"],
    allocation: "ownership",
    linkedDecisionId: "dj2",
    environment: {
      context: "home",
      atmosphere: "neutral",
      tags: ["natural-light"],
    },
  },
  {
    id: "te5",
    kind: "loop_unfinished",
    timestamp: "2026-05-22T09:00:00Z",
    subject: "follow-up from conference",
    description: "Three warm intros uncontacted after 72h.",
    momentumDelta: -1,
    tags: ["interaction-starvation"],
    allocation: "labor",
    environment: {
      context: "office",
      atmosphere: "dead",
      tags: ["fluorescent", "sterile"],
    },
  },
  {
    id: "te6",
    kind: "energy_restore",
    timestamp: "2026-05-22T07:00:00Z",
    subject: "morning walk + no Slack",
    description: "Recovered capacity to re-read calibration log without urgency distortion.",
    momentumDelta: 1,
    allocation: "investment",
    environment: {
      context: "nature",
      atmosphere: "restorative",
      tags: ["natural-light", "ocean", "cinematic-scale"],
    },
  },
];
