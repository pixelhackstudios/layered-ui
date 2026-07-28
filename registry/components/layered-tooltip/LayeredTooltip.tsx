import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import "./LayeredTooltip.css";

export type LayeredTooltipTone = "neutral" | "copper" | "green" | "gold";
export type LayeredTooltipSize = "small" | "medium";

/* Provider: thin wrapper around Radix Provider. Layered tunes the two
   timing defaults (delayDuration/skipDelayDuration) away from Radix's own
   700ms/300ms — a compact instrument annotation should read as near-
   immediate on hover-scan, not a marketing hover-card delay. Both remain
   fully overridable by the consumer via props. */
export type LayeredTooltipProviderProps = ComponentPropsWithoutRef<
  typeof Tooltip.Provider
>;

export function LayeredTooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 150,
  ...props
}: LayeredTooltipProviderProps) {
  return (
    <Tooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

/* Root: maps directly to Radix Tooltip.Root (controlled/uncontrolled). */
export type LayeredTooltipProps = ComponentPropsWithoutRef<typeof Tooltip.Root>;

export function LayeredTooltip(props: LayeredTooltipProps) {
  return <Tooltip.Root {...props} />;
}

/* Trigger: thin wrapper around Radix Trigger, no structural styling of its
   own — composes via `asChild` around arbitrary consumer content (icon
   buttons, wrapper spans for disabled-looking controls, etc). */
export const LayeredTooltipTrigger = forwardRef<
  ElementRef<typeof Tooltip.Trigger>,
  ComponentPropsWithoutRef<typeof Tooltip.Trigger>
>(function LayeredTooltipTrigger(props, ref) {
  return <Tooltip.Trigger {...props} ref={ref} />;
});

/* Content: owns Portal and the directional Arrow internally. Supports a
   portal `container` prop, matching LayeredDialogContent's convention.
   The arrow is not a separately exported compound part — it is a fixed
   visual detail of the one surface, gated by `showArrow` rather than
   composed freely (see architecture notes). */
export interface LayeredTooltipContentProps
  extends ComponentPropsWithoutRef<typeof Tooltip.Content> {
  tone?: LayeredTooltipTone;
  size?: LayeredTooltipSize;
  showArrow?: boolean;
  container?: ComponentPropsWithoutRef<typeof Tooltip.Portal>["container"];
}

export const LayeredTooltipContent = forwardRef<
  ElementRef<typeof Tooltip.Content>,
  LayeredTooltipContentProps
>(function LayeredTooltipContent(
  {
    tone = "neutral",
    size = "small",
    showArrow = true,
    sideOffset = 6,
    container,
    className = "",
    children,
    ...props
  },
  ref
) {
  const contentClasses = ["layered-tooltip-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tooltip.Portal container={container}>
      <Tooltip.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        data-tone={tone}
        data-size={size}
        className={contentClasses}
      >
        {children}
        {showArrow && (
          <Tooltip.Arrow className="layered-tooltip-content__arrow" />
        )}
      </Tooltip.Content>
    </Tooltip.Portal>
  );
});
