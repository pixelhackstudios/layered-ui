import type { HTMLAttributes, ReactNode } from "react";
import "./LayeredBadge.css";

export type LayeredBadgeTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold"
  | "signal-red";

export type LayeredBadgeSize = "small" | "medium";

export interface LayeredBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: LayeredBadgeTone;
  badgeSize?: LayeredBadgeSize;
}

export function LayeredBadge({
  children,
  tone = "neutral",
  badgeSize = "small",
  className = "",
  ...props
}: LayeredBadgeProps) {
  return (
    <span
      {...props}
      className={["layered-badge", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={badgeSize}
    >
      {children}
    </span>
  );
}
