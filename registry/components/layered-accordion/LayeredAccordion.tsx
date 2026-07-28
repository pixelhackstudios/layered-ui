import {
  createElement,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "./LayeredAccordion.css";

export type LayeredAccordionTone = "neutral" | "copper" | "green" | "gold";
export type LayeredAccordionSize = "small" | "medium" | "large";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/* Root: preserves Radix's discriminated single/multiple Accordion.Root
   union via a distributive omit — only `orientation` is removed, since v1
   is deliberately vertical-only (the CSS has no horizontal layout to back
   a public `orientation` prop). `tone`/`accordionSize` live here, not on
   Item or Trigger — matching LayeredTabs, Root owns the cascading custom
   properties siblings (Trigger, Content) read from. */
export type LayeredAccordionProps = DistributiveOmit<
  ComponentPropsWithoutRef<typeof Accordion.Root>,
  "orientation"
> & {
  tone?: LayeredAccordionTone;
  accordionSize?: LayeredAccordionSize;
};

export function LayeredAccordion({
  tone = "neutral",
  accordionSize = "medium",
  className = "",
  ...props
}: LayeredAccordionProps) {
  return (
    <Accordion.Root
      {...props}
      orientation="vertical"
      data-tone={tone}
      data-size={accordionSize}
      className={["layered-accordion", className].filter(Boolean).join(" ")}
    />
  );
}

/* Item: thin wrapper, no Layered-specific props — Items are internal
   divisions inside Root's one shared casing, not independently cased. */
export type LayeredAccordionItemProps = ComponentPropsWithoutRef<
  typeof Accordion.Item
>;

export const LayeredAccordionItem = forwardRef<
  ElementRef<typeof Accordion.Item>,
  LayeredAccordionItemProps
>(function LayeredAccordionItem({ className = "", ...props }, ref) {
  return (
    <Accordion.Item
      {...props}
      ref={ref}
      className={["layered-accordion-item", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

const headingTags = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

/* Trigger: always renders Accordion.Header wrapping a real heading element
   (level chosen via `headingLevel`, default `h3`) around Accordion.Trigger
   — Header is not separately exported since it has no meaningful
   configuration beyond heading level. `asChild` is intentionally omitted:
   Trigger always renders its own label wrapper plus a fixed decorative
   indicator as two children, which is incompatible with Radix Slot's
   single-child contract for `asChild`. */
export interface LayeredAccordionTriggerProps
  extends Omit<ComponentPropsWithoutRef<typeof Accordion.Trigger>, "asChild"> {
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export const LayeredAccordionTrigger = forwardRef<
  ElementRef<typeof Accordion.Trigger>,
  LayeredAccordionTriggerProps
>(function LayeredAccordionTrigger(
  { headingLevel = 3, className = "", children, ...props },
  ref
) {
  return (
    <Accordion.Header asChild>
      {createElement(
        headingTags[headingLevel],
        { className: "layered-accordion-heading" },
        <Accordion.Trigger
          {...props}
          ref={ref}
          className={["layered-accordion-trigger", className]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="layered-accordion-trigger__label">
            {children}
          </span>
          <span
            className="layered-accordion-trigger__indicator"
            aria-hidden="true"
          />
        </Accordion.Trigger>
      )}
    </Accordion.Header>
  );
});

/* Content: always owns an internal, non-animated padding wrapper. `asChild`
   is intentionally omitted for the same reason as Trigger — the wrapper is
   not optional, so `asChild` would misleadingly suggest a consumer's own
   element replaces the Radix Content element when it wouldn't. */
export type LayeredAccordionContentProps = Omit<
  ComponentPropsWithoutRef<typeof Accordion.Content>,
  "asChild"
>;

export const LayeredAccordionContent = forwardRef<
  ElementRef<typeof Accordion.Content>,
  LayeredAccordionContentProps
>(function LayeredAccordionContent(
  { className = "", children, ...props },
  ref
) {
  return (
    <Accordion.Content
      {...props}
      ref={ref}
      className={["layered-accordion-content", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="layered-accordion-content__inner">
        {children as ReactNode}
      </div>
    </Accordion.Content>
  );
});
