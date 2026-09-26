import type { AnchorHTMLAttributes, ReactNode } from "react";
import { href } from "../router";

/* Navigation must stay a real link, so this borrows LayeredButton's published
   class contract (casing, face, content) on an <a> instead of wrapping a
   <button> in an anchor. */
export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  tone?: "copper" | "green" | "gold" | "neutral";
  size?: "small" | "medium" | "large";
  children: ReactNode;
}

export function ButtonLink({
  to,
  tone = "copper",
  size = "medium",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      href={to ? href(to) : props.href}
      className={["layered-button", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={size}
    >
      <span className="layered-button__face">
        <span className="layered-button__content">{children}</span>
      </span>
    </a>
  );
}
