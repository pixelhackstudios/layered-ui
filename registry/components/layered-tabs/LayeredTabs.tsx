import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "./LayeredTabs.css";

export type LayeredTabsTone = "neutral" | "copper" | "green" | "gold";
export type LayeredTabsSize = "small" | "medium" | "large";
export type LayeredTabsOverflow = "scroll" | "wrap";
export type LayeredTabsSurface = "integrated" | "plain";

/* Root: maps to Radix Tabs.Root (controlled/uncontrolled value, orientation,
   activationMode, and dir all remain purely Radix-owned). Layered adds only
   tone and tabsSize here, not on LayeredTabsList — List and Content are
   siblings, so a List-scoped custom property cannot cascade into Content.
   Root owns the cascading custom properties instead. */
export interface LayeredTabsProps
  extends ComponentPropsWithoutRef<typeof Tabs.Root> {
  tone?: LayeredTabsTone;
  tabsSize?: LayeredTabsSize;
}

export function LayeredTabs({
  tone = "neutral",
  tabsSize = "medium",
  className = "",
  ...props
}: LayeredTabsProps) {
  return (
    <Tabs.Root
      {...props}
      data-tone={tone}
      data-size={tabsSize}
      className={["layered-tabs", className].filter(Boolean).join(" ")}
    />
  );
}

/* List: the structural rail/housing. Radix owns roving focus, keyboard
   navigation, and orientation semantics; Layered adds only the overflow
   presentation (`scroll` default, `wrap` opt-in). */
export interface LayeredTabsListProps
  extends ComponentPropsWithoutRef<typeof Tabs.List> {
  overflow?: LayeredTabsOverflow;
}

export const LayeredTabsList = forwardRef<
  ElementRef<typeof Tabs.List>,
  LayeredTabsListProps
>(function LayeredTabsList(
  { overflow = "scroll", className = "", ...props },
  ref
) {
  return (
    <Tabs.List
      {...props}
      ref={ref}
      data-overflow={overflow}
      className={["layered-tabs-list", className].filter(Boolean).join(" ")}
    />
  );
});

/* Trigger: thin wrapper around Radix Trigger. No custom active, tone, or
   size props — Radix's own `data-state`/`data-disabled` plus the tone/size
   custom properties inherited from Root drive all styling. */
export type LayeredTabsTriggerProps = ComponentPropsWithoutRef<
  typeof Tabs.Trigger
>;

export const LayeredTabsTrigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  LayeredTabsTriggerProps
>(function LayeredTabsTrigger({ className = "", ...props }, ref) {
  return (
    <Tabs.Trigger
      {...props}
      ref={ref}
      className={["layered-tabs-trigger", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Content: owns only the surface variant. Docks visually against the active
   Trigger through matching tone-accent border/radius treatment on the
   near edge, not a shared literal border, JS measurement, or moving
   indicator — so the relationship stays correct under scrolling, vertical
   orientation, RTL, and wrap mode. */
export interface LayeredTabsContentProps
  extends ComponentPropsWithoutRef<typeof Tabs.Content> {
  surface?: LayeredTabsSurface;
}

export const LayeredTabsContent = forwardRef<
  ElementRef<typeof Tabs.Content>,
  LayeredTabsContentProps
>(function LayeredTabsContent(
  { surface = "integrated", className = "", ...props },
  ref
) {
  return (
    <Tabs.Content
      {...props}
      ref={ref}
      data-surface={surface}
      className={["layered-tabs-content", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});
