import type { HTMLAttributes, ReactNode } from "react";
import "./LayeredDisplayCard.css";

export type LayeredDisplayCardTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredDisplayCardAspect =
  | "landscape"
  | "square"
  | "portrait";

export interface LayeredDisplayCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  imageSrc: string;
  imageAlt: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  status?: ReactNode;
  footer?: ReactNode;
  tone?: LayeredDisplayCardTone;
  aspect?: LayeredDisplayCardAspect;
}

export function LayeredDisplayCard({
  imageSrc,
  imageAlt,
  title,
  eyebrow,
  description,
  metadata,
  status,
  footer,
  tone = "neutral",
  aspect = "landscape",
  className = "",
  ...props
}: LayeredDisplayCardProps) {
  const classes = [
    "layered-display-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classes}
      data-tone={tone}
      data-aspect={aspect}
      {...props}
    >
      <div className="layered-display-card__screen">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="layered-display-card__image"
        />
        <span className="layered-display-card__vignette" aria-hidden="true" />
        <span className="layered-display-card__glare" aria-hidden="true" />
      </div>

      <div className="layered-display-card__surface">
        {(eyebrow || title || description) && (
          <header className="layered-display-card__header">
            {eyebrow && (
              <div className="layered-display-card__eyebrow">{eyebrow}</div>
            )}
            <h3 className="layered-display-card__title">{title}</h3>
            {description && (
              <div className="layered-display-card__description">
                {description}
              </div>
            )}
          </header>
        )}

        {(metadata || status) && (
          <div className="layered-display-card__meta-bar">
            {metadata && (
              <span className="layered-display-card__metadata">{metadata}</span>
            )}
            {status && (
              <span className="layered-display-card__status">{status}</span>
            )}
          </div>
        )}

        {footer && (
          <footer className="layered-display-card__footer">{footer}</footer>
        )}
      </div>
    </article>
  );
}
