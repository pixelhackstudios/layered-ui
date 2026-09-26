import type { AnchorHTMLAttributes } from "react";
import { href, usePath } from "./router";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

/* A plain anchor: native link semantics, middle-click, and copy-link all work
   because the destination is a real href. */
export function Link({ to, ...props }: LinkProps) {
  const current = usePath();

  return (
    <a
      {...props}
      href={href(to)}
      aria-current={current === to ? "page" : undefined}
    />
  );
}
