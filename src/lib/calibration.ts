import type { CalibrationReply, ContextAnchor } from "./types";

export function anchorKey(anchor: ContextAnchor): string {
  return `${anchor.type}:${anchor.id}`;
}

export function repliesForAnchor(
  replies: CalibrationReply[],
  anchor: ContextAnchor
): CalibrationReply[] {
  const key = anchorKey(anchor);
  return replies
    .filter((r) => anchorKey(r.anchor) === key)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}

export function hasReplies(
  replies: CalibrationReply[],
  anchor: ContextAnchor
): boolean {
  return repliesForAnchor(replies, anchor).length > 0;
}
