import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./LayeredPagination.css";

export type LayeredPaginationTone = "neutral" | "copper" | "green" | "gold";
export type LayeredPaginationSize = "small" | "medium";

export interface LayeredPaginationProps
  extends ComponentPropsWithoutRef<"nav"> {
  tone?: LayeredPaginationTone;
  paginationSize?: LayeredPaginationSize;
}

export const LayeredPagination = forwardRef<
  HTMLElement,
  LayeredPaginationProps
>(function LayeredPagination(
  {
    tone = "neutral",
    paginationSize = "medium",
    className = "",
    "aria-label": ariaLabel = "Pagination",
    ...props
  },
  ref
) {
  return (
    <nav
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      data-tone={tone}
      data-size={paginationSize}
      className={["layered-pagination", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredPaginationListProps = ComponentPropsWithoutRef<"ul">;

export const LayeredPaginationList = forwardRef<
  HTMLUListElement,
  LayeredPaginationListProps
>(function LayeredPaginationList({ className = "", ...props }, ref) {
  return (
    <ul
      {...props}
      ref={ref}
      className={["layered-pagination__list", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

export type LayeredPaginationItemProps = ComponentPropsWithoutRef<"li">;

export const LayeredPaginationItem = forwardRef<
  HTMLLIElement,
  LayeredPaginationItemProps
>(function LayeredPaginationItem({ className = "", ...props }, ref) {
  return (
    <li
      {...props}
      ref={ref}
      className={["layered-pagination__item", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

export interface LayeredPaginationLinkProps
  extends ComponentPropsWithoutRef<"a"> {
  isCurrent?: boolean;
  disabled?: boolean;
}

export const LayeredPaginationLink = forwardRef<
  HTMLAnchorElement,
  LayeredPaginationLinkProps
>(function LayeredPaginationLink(
  {
    isCurrent = false,
    disabled = false,
    className = "",
    href,
    tabIndex,
    onClick,
    "aria-current": ariaCurrent,
    "aria-disabled": ariaDisabled,
    ...props
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <a
      {...props}
      ref={ref}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : tabIndex}
      aria-current={isCurrent ? "page" : ariaCurrent}
      aria-disabled={disabled ? true : ariaDisabled}
      data-current={isCurrent ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      onClick={handleClick}
      className={["layered-pagination__link", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

export interface LayeredPaginationDirectionProps
  extends Omit<LayeredPaginationLinkProps, "children" | "isCurrent"> {
  children?: ReactNode;
}

export const LayeredPaginationPrevious = forwardRef<
  HTMLAnchorElement,
  LayeredPaginationDirectionProps
>(function LayeredPaginationPrevious(
  {
    children = "Previous",
    className = "",
    "aria-label": ariaLabel = "Previous page",
    ...props
  },
  ref
) {
  return (
    <LayeredPaginationLink
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={["layered-pagination__direction", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className="layered-pagination__chevron layered-pagination__chevron--previous"
        aria-hidden="true"
      />
      <span className="layered-pagination__direction-label">{children}</span>
    </LayeredPaginationLink>
  );
});

export const LayeredPaginationNext = forwardRef<
  HTMLAnchorElement,
  LayeredPaginationDirectionProps
>(function LayeredPaginationNext(
  {
    children = "Next",
    className = "",
    "aria-label": ariaLabel = "Next page",
    ...props
  },
  ref
) {
  return (
    <LayeredPaginationLink
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={["layered-pagination__direction", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="layered-pagination__direction-label">{children}</span>
      <span
        className="layered-pagination__chevron layered-pagination__chevron--next"
        aria-hidden="true"
      />
    </LayeredPaginationLink>
  );
});

export type LayeredPaginationEllipsisProps = ComponentPropsWithoutRef<"span">;

export const LayeredPaginationEllipsis = forwardRef<
  HTMLSpanElement,
  LayeredPaginationEllipsisProps
>(function LayeredPaginationEllipsis(
  { className = "", "aria-hidden": ariaHidden = true, ...props },
  ref
) {
  return (
    <span
      {...props}
      ref={ref}
      aria-hidden={ariaHidden}
      className={["layered-pagination__ellipsis", className]
        .filter(Boolean)
        .join(" ")}
    >
      &hellip;
    </span>
  );
});
