import { useId, type ReactNode } from "react";
import "./LayeredPanel.css";

export type LayeredPanelTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredPanelPadding =
  | "small"
  | "medium"
  | "large";

export interface LayeredPanelProps {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  tone?: LayeredPanelTone;
  padding?: LayeredPanelPadding;
  className?: string;
}

export function LayeredPanel({
  children,
  title,
  eyebrow,
  footer,
  tone = "neutral",
  padding = "medium",
  className = "",
}: LayeredPanelProps) {
  const generatedId = useId();
  const headingId = title ? `layered-panel-heading-${generatedId}` : undefined;

  const classes = ["layered-panel", className].filter(Boolean).join(" ");

  return (
    <section
      className={classes}
      data-tone={tone}
      data-padding={padding}
      aria-labelledby={headingId}
    >
      <div className="layered-panel__surface">
        {(title || eyebrow) && (
          <header className="layered-panel__header">
            {eyebrow && (
              <div className="layered-panel__eyebrow">{eyebrow}</div>
            )}
            {title && (
              <h2 id={headingId} className="layered-panel__title">
                {title}
              </h2>
            )}
          </header>
        )}
        <div className="layered-panel__content">{children}</div>
        {footer && <footer className="layered-panel__footer">{footer}</footer>}
      </div>
    </section>
  );
}
