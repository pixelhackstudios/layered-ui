import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactElement,
} from "react";
import * as Popover from "@radix-ui/react-popover";
import "./LayeredPopover.css";

export type LayeredPopoverTone = "neutral" | "copper" | "green" | "gold";
export type LayeredPopoverSize = "small" | "medium";

/* Root: thin Radix Popover.Root wrapper (controlled/uncontrolled, modal). */
export type LayeredPopoverProps = ComponentPropsWithoutRef<typeof Popover.Root>;

export function LayeredPopover(props: LayeredPopoverProps) {
  return <Popover.Root {...props} />;
}

/* Trigger: thin wrapper, no structural styling of its own — composes via
   `asChild` around arbitrary consumer content. */
export type LayeredPopoverTriggerProps = ComponentPropsWithoutRef<
  typeof Popover.Trigger
>;

export const LayeredPopoverTrigger = forwardRef<
  ElementRef<typeof Popover.Trigger>,
  LayeredPopoverTriggerProps
>(function LayeredPopoverTrigger(props, ref) {
  return <Popover.Trigger {...props} ref={ref} />;
});

/* Anchor: thin wrapper. Lets a consumer position Content against an
   element other than Trigger while controlling Root's `open` state
   directly (Content-without-Trigger composition). */
export type LayeredPopoverAnchorProps = ComponentPropsWithoutRef<
  typeof Popover.Anchor
>;

export const LayeredPopoverAnchor = forwardRef<
  ElementRef<typeof Popover.Anchor>,
  LayeredPopoverAnchorProps
>(function LayeredPopoverAnchor(props, ref) {
  return <Popover.Anchor {...props} ref={ref} />;
});

/* Content: owns Portal, casing, z-index, motion, and the internal Arrow.
   `asChild` is intentionally omitted — Content always renders a fixed body
   wrapper plus an optional Arrow as siblings, which violates Radix Slot's
   single-child contract for `asChild` (same reasoning as
   LayeredAccordionContent/LayeredAccordionTrigger). `forceMount` is
   forwarded to both `Popover.Portal` and `Popover.Content`, since Radix
   gates Presence separately at each of those two levels — forwarding it to
   only one would leave the other's mount state uncontrolled. Content
   remains free-form: no Title/Description wiring (Radix Popover does not
   expose those primitives, unlike Dialog), no Header/Footer. */
export interface LayeredPopoverContentProps
  extends Omit<ComponentPropsWithoutRef<typeof Popover.Content>, "asChild"> {
  tone?: LayeredPopoverTone;
  popoverSize?: LayeredPopoverSize;
  showArrow?: boolean;
  container?: ComponentPropsWithoutRef<typeof Popover.Portal>["container"];
  forceMount?: true;
}

export const LayeredPopoverContent = forwardRef<
  ElementRef<typeof Popover.Content>,
  LayeredPopoverContentProps
>(function LayeredPopoverContent(
  {
    tone = "neutral",
    popoverSize = "small",
    showArrow = true,
    sideOffset = 6,
    collisionPadding = 8,
    container,
    forceMount,
    className = "",
    children,
    ...props
  },
  ref
) {
  const contentClasses = ["layered-popover-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Popover.Portal container={container} forceMount={forceMount}>
      <Popover.Content
        {...props}
        ref={ref}
        forceMount={forceMount}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-tone={tone}
        data-size={popoverSize}
        className={contentClasses}
      >
        <div className="layered-popover-content__body">{children}</div>
        {showArrow && (
          <Popover.Arrow
            className="layered-popover-content__arrow"
            width={14}
            height={7}
          />
        )}
      </Popover.Content>
    </Popover.Portal>
  );
});

/* Close: Toast-style three explicit modes (see LayeredToastClose). Content
   is free-form with no fixed chrome region to inject a corner close into
   automatically, so the opinionated glyph lives in the exported Close
   itself rather than being rendered internally by Content — and omitting
   Close entirely (dismiss only via Escape/outside-click) is fully valid.
   `data-close-mode` ("glyph" vs "custom") lets CSS scope the fixed
   square/corner glyph geometry to the no-children default only — explicit
   children and `asChild` compositions (which may wrap an arbitrarily wide
   consumer control such as a LayeredButton with a text label) must keep
   their natural size rather than inheriting glyph dimensions. */
type LayeredPopoverCloseAsChildProps = Omit<
  ComponentPropsWithoutRef<typeof Popover.Close>,
  "asChild" | "children"
> & {
  asChild: true;
  children: ReactElement;
};

type LayeredPopoverCloseDefaultProps = Omit<
  ComponentPropsWithoutRef<typeof Popover.Close>,
  "asChild"
> & {
  asChild?: false;
  closeLabel?: string;
};

export type LayeredPopoverCloseProps =
  | LayeredPopoverCloseAsChildProps
  | LayeredPopoverCloseDefaultProps;

export const LayeredPopoverClose = forwardRef<
  ElementRef<typeof Popover.Close>,
  LayeredPopoverCloseProps
>(function LayeredPopoverClose(props, ref) {
  const { className = "", children, ...rest } = props;
  const closeClasses = ["layered-popover-close", className]
    .filter(Boolean)
    .join(" ");

  if (rest.asChild) {
    return (
      <Popover.Close
        {...rest}
        ref={ref}
        className={closeClasses}
        data-close-mode="custom"
      >
        {children}
      </Popover.Close>
    );
  }

  const {
    closeLabel = "Close popover",
    "aria-label": ariaLabel,
    ...restProps
  } = rest as LayeredPopoverCloseDefaultProps;
  const hasChildren = children != null;

  return (
    <Popover.Close
      {...restProps}
      ref={ref}
      className={closeClasses}
      data-close-mode={hasChildren ? "custom" : "glyph"}
      aria-label={ariaLabel ?? (hasChildren ? undefined : closeLabel)}
    >
      {hasChildren ? (
        children
      ) : (
        <span className="layered-popover-close__glyph" aria-hidden="true" />
      )}
    </Popover.Close>
  );
});
