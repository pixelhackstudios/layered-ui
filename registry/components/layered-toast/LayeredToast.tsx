import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactElement,
} from "react";
import * as Toast from "@radix-ui/react-toast";
import "./LayeredToast.css";

export type LayeredToastTone = "neutral" | "copper" | "green" | "gold";
export type LayeredToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/* Provider: thin wrapper around Radix Toast.Provider. Unlike
   LayeredTooltipProvider, no defaults are overridden here — duration,
   swipeDirection, swipeThreshold, and label all stay at Radix's own
   values, since (unlike Tooltip's hover-delay case) there is no stated
   UX rationale for diverging from them. */
export type LayeredToastProviderProps = ComponentPropsWithoutRef<
  typeof Toast.Provider
>;

export function LayeredToastProvider(props: LayeredToastProviderProps) {
  return <Toast.Provider {...props} />;
}

/* Viewport: the fixed mounting region for the toast stack. Not an
   automatic body-level Portal the way Dialog/Tooltip's Content is —
   consumers must mount it themselves near the application root, outside
   transformed, overflow-clipped, or locally stacked ancestors, or the
   shared z-index below cannot escape that ancestor's stacking context.
   `position` is purely a Layered/CSS concern (data-position drives
   anchoring); it does not touch Radix's `swipeDirection`, which remains
   a separate, independent prop on Provider. */
export interface LayeredToastViewportProps
  extends ComponentPropsWithoutRef<typeof Toast.Viewport> {
  position?: LayeredToastPosition;
}

export const LayeredToastViewport = forwardRef<
  ElementRef<typeof Toast.Viewport>,
  LayeredToastViewportProps
>(function LayeredToastViewport(
  { position = "bottom-right", className = "", ...props },
  ref
) {
  return (
    <Toast.Viewport
      {...props}
      ref={ref}
      data-position={position}
      className={["layered-toast-viewport", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Root: adds only `tone`. Layout is owned entirely by CSS grid-template-
   areas on this element — Title/Description/Action/Close each carry a
   fixed class that maps to a grid-area, so Root never inspects, clones,
   or reorders its children to place them. */
export interface LayeredToastProps
  extends ComponentPropsWithoutRef<typeof Toast.Root> {
  tone?: LayeredToastTone;
}

export const LayeredToast = forwardRef<
  ElementRef<typeof Toast.Root>,
  LayeredToastProps
>(function LayeredToast({ tone = "neutral", className = "", ...props }, ref) {
  return (
    <Toast.Root
      {...props}
      ref={ref}
      data-tone={tone}
      className={["layered-toast", className].filter(Boolean).join(" ")}
    />
  );
});

/* Title / Description: thin wrappers, both optional, preserving Radix
   semantics and props exactly. */
export const LayeredToastTitle = forwardRef<
  ElementRef<typeof Toast.Title>,
  ComponentPropsWithoutRef<typeof Toast.Title>
>(function LayeredToastTitle({ className = "", ...props }, ref) {
  return (
    <Toast.Title
      {...props}
      ref={ref}
      className={["layered-toast-title", className].filter(Boolean).join(" ")}
    />
  );
});

export const LayeredToastDescription = forwardRef<
  ElementRef<typeof Toast.Description>,
  ComponentPropsWithoutRef<typeof Toast.Description>
>(function LayeredToastDescription({ className = "", ...props }, ref) {
  return (
    <Toast.Description
      {...props}
      ref={ref}
      className={["layered-toast-description", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Action: thin styled wrapper. `altText` remains Radix's own required
   prop, untouched — never renamed, weakened, or derived from children. */
export type LayeredToastActionProps = ComponentPropsWithoutRef<
  typeof Toast.Action
>;

export const LayeredToastAction = forwardRef<
  ElementRef<typeof Toast.Action>,
  LayeredToastActionProps
>(function LayeredToastAction({ className = "", ...props }, ref) {
  return (
    <Toast.Action
      {...props}
      ref={ref}
      className={["layered-toast-action", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Close: three explicit modes.
   - no children, asChild omitted/false: renders the internal mechanical
     X glyph with a default accessible label (`closeLabel`).
   - explicit children, asChild omitted/false: children replace the
     glyph and carry their own accessible text.
   - asChild true: requires exactly one element child (Radix Slot's own
     contract), renders no internal glyph, injects no second child. The
     discriminated prop union below keeps `asChild: true` without a
     `children` element from type-checking as valid. */
type LayeredToastCloseAsChildProps = Omit<
  ComponentPropsWithoutRef<typeof Toast.Close>,
  "asChild" | "children"
> & {
  asChild: true;
  children: ReactElement;
};

type LayeredToastCloseDefaultProps = Omit<
  ComponentPropsWithoutRef<typeof Toast.Close>,
  "asChild"
> & {
  asChild?: false;
  closeLabel?: string;
};

export type LayeredToastCloseProps =
  | LayeredToastCloseAsChildProps
  | LayeredToastCloseDefaultProps;

export const LayeredToastClose = forwardRef<
  ElementRef<typeof Toast.Close>,
  LayeredToastCloseProps
>(function LayeredToastClose(props, ref) {
  const { className = "", children, ...rest } = props;
  const closeClasses = ["layered-toast-close", className]
    .filter(Boolean)
    .join(" ");

  if (rest.asChild) {
    return (
      <Toast.Close {...rest} ref={ref} className={closeClasses}>
        {children}
      </Toast.Close>
    );
  }

  const {
    closeLabel = "Dismiss notification",
    "aria-label": ariaLabel,
    ...restProps
  } = rest as LayeredToastCloseDefaultProps;
  const hasChildren = children != null;

  return (
    <Toast.Close
      {...restProps}
      ref={ref}
      className={closeClasses}
      aria-label={ariaLabel ?? (hasChildren ? undefined : closeLabel)}
    >
      {hasChildren ? (
        children
      ) : (
        <span className="layered-toast-close__glyph" aria-hidden="true" />
      )}
    </Toast.Close>
  );
});
