import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { Combobox } from "@base-ui/react/combobox";
import "./LayeredCombobox.css";

export type LayeredComboboxTone = "neutral" | "copper" | "green" | "gold";
export type LayeredComboboxSize = "small" | "medium";

/* Root: thin Base UI Combobox.Root wrapper. Single-select only — Base UI's
   `multiple`/chips model is a materially different UI (a token-input field
   instead of a plain text field) that this first pass deliberately leaves
   out rather than half-wiring; see AGENTS.md on not designing for
   hypothetical requirements. A future LayeredComboboxChip/-Chips pair can
   be added without touching this API if multi-select is needed later.
   Kept generic (matching `Combobox.Root`'s own signature) so `items`,
   `value`/`defaultValue`, and `itemToStringLabel`/`itemToStringValue` stay
   fully typed for arbitrary item shapes, not just strings. */
export function LayeredCombobox<Value>(
  props: Combobox.Root.Props<Value, false>
) {
  return <Combobox.Root {...props} />;
}

/* Label: quiet field heading, styled like LayeredSelect's label rather
   than a menu-style LayeredDropdownMenuLabel — this is a form field, not
   a menu group. */
export type LayeredComboboxLabelProps = ComponentPropsWithoutRef<
  typeof Combobox.Label
>;

export const LayeredComboboxLabel = forwardRef<
  ElementRef<typeof Combobox.Label>,
  LayeredComboboxLabelProps
>(function LayeredComboboxLabel({ className = "", ...props }, ref) {
  const labelClasses = ["layered-combobox-label", className]
    .filter(Boolean)
    .join(" ");

  return <Combobox.Label {...props} ref={ref} className={labelClasses} />;
});

/* InputGroup: the outer casing/trench, matching LayeredInput/LayeredSelect's
   structural shell so a Combobox reads as the same physical class of
   control. Icon/Clear/Trigger are free-form children placed inside this
   group by the consumer (see laboratory usage) rather than fixed slots,
   since not every Combobox needs all three. */
export interface LayeredComboboxInputGroupProps
  extends ComponentPropsWithoutRef<typeof Combobox.InputGroup> {
  tone?: LayeredComboboxTone;
  comboboxSize?: LayeredComboboxSize;
}

export const LayeredComboboxInputGroup = forwardRef<
  ElementRef<typeof Combobox.InputGroup>,
  LayeredComboboxInputGroupProps
>(function LayeredComboboxInputGroup(
  { tone = "neutral", comboboxSize = "medium", className = "", ...props },
  ref
) {
  const groupClasses = ["layered-combobox-input-group", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.InputGroup
      {...props}
      ref={ref}
      data-tone={tone}
      data-size={comboboxSize}
      className={groupClasses}
    />
  );
});

/* Input: the native text field. Unstyled beyond font/color/reset — the
   InputGroup supplies the casing, matching how LayeredSelect's native
   <select> defers chrome to its own surface wrapper. */
export type LayeredComboboxInputProps = ComponentPropsWithoutRef<
  typeof Combobox.Input
>;

export const LayeredComboboxInput = forwardRef<
  ElementRef<typeof Combobox.Input>,
  LayeredComboboxInputProps
>(function LayeredComboboxInput({ className = "", ...props }, ref) {
  const inputClasses = ["layered-combobox-input", className]
    .filter(Boolean)
    .join(" ");

  return <Combobox.Input {...props} ref={ref} className={inputClasses} />;
});

/* Icon: decorative trailing chevron (aria-hidden by Base UI itself). */
export type LayeredComboboxIconProps = ComponentPropsWithoutRef<
  typeof Combobox.Icon
>;

export const LayeredComboboxIcon = forwardRef<
  ElementRef<typeof Combobox.Icon>,
  LayeredComboboxIconProps
>(function LayeredComboboxIcon({ className = "", children, ...props }, ref) {
  const iconClasses = ["layered-combobox-icon", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.Icon {...props} ref={ref} className={iconClasses}>
      {children ?? (
        <span className="layered-combobox-icon__chevron" aria-hidden="true" />
      )}
    </Combobox.Icon>
  );
});

/* Trigger: interactive button variant of the chevron — opens the popup on
   click without requiring the user to type first, for "editable select"
   usage. Distinct from Icon (decorative-only); a consumer typically uses
   one or the other, not both, inside the same InputGroup. */
export type LayeredComboboxTriggerProps = ComponentPropsWithoutRef<
  typeof Combobox.Trigger
>;

export const LayeredComboboxTrigger = forwardRef<
  ElementRef<typeof Combobox.Trigger>,
  LayeredComboboxTriggerProps
>(function LayeredComboboxTrigger(
  { className = "", children, "aria-label": ariaLabel, ...props },
  ref
) {
  const triggerClasses = ["layered-combobox-trigger", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.Trigger
      {...props}
      ref={ref}
      aria-label={ariaLabel ?? "Toggle options"}
      className={triggerClasses}
    >
      {children ?? (
        <span className="layered-combobox-icon__chevron" aria-hidden="true" />
      )}
    </Combobox.Trigger>
  );
});

/* Clear: X glyph button, same compact-mechanical-square treatment as
   LayeredPopoverClose's "glyph" mode — Combobox.Clear is always a
   fixed-purpose icon button (never wraps arbitrary consumer content the
   way Popover.Close can), so it only needs the one geometry. */
export type LayeredComboboxClearProps = ComponentPropsWithoutRef<
  typeof Combobox.Clear
> & {
  clearLabel?: string;
};

export const LayeredComboboxClear = forwardRef<
  ElementRef<typeof Combobox.Clear>,
  LayeredComboboxClearProps
>(function LayeredComboboxClear(
  { className = "", clearLabel = "Clear value", "aria-label": ariaLabel, ...props },
  ref
) {
  const clearClasses = ["layered-combobox-clear", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.Clear
      {...props}
      ref={ref}
      aria-label={ariaLabel ?? clearLabel}
      className={clearClasses}
    >
      <span className="layered-combobox-clear__glyph" aria-hidden="true" />
    </Combobox.Clear>
  );
});

/* Content: owns Portal, Positioner, Popup, and the internal Arrow — same
   shape as LayeredPopoverContent/LayeredDropdownMenuContent, sharing the
   `--layered-z-popover` layer for the same reason LayeredDropdownMenu
   does (an anchored, non-modal-by-default overlay with no ordering
   requirement against Popover or Dropdown Menu). Positioner and Popup are
   two separate Base UI parts (unlike Radix's single Content), so both are
   folded into this one export to keep the public API shaped like the
   other overlay Contents rather than leaking Base UI's internal split. */
export interface LayeredComboboxContentProps
  extends Omit<ComponentPropsWithoutRef<typeof Combobox.Popup>, "children">,
    Pick<
      ComponentPropsWithoutRef<typeof Combobox.Positioner>,
      | "side"
      | "align"
      | "sideOffset"
      | "alignOffset"
      | "collisionPadding"
      | "collisionBoundary"
      | "sticky"
    > {
  tone?: LayeredComboboxTone;
  comboboxSize?: LayeredComboboxSize;
  showArrow?: boolean;
  container?: ComponentPropsWithoutRef<typeof Combobox.Portal>["container"];
  children?: ComponentPropsWithoutRef<typeof Combobox.Popup>["children"];
}

export const LayeredComboboxContent = forwardRef<
  ElementRef<typeof Combobox.Popup>,
  LayeredComboboxContentProps
>(function LayeredComboboxContent(
  {
    tone = "neutral",
    comboboxSize = "small",
    showArrow = false,
    side,
    align,
    sideOffset = 6,
    alignOffset,
    collisionPadding = 8,
    collisionBoundary,
    sticky,
    container,
    className = "",
    children,
    ...props
  },
  ref
) {
  const contentClasses = ["layered-combobox-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.Portal container={container}>
      <Combobox.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        collisionBoundary={collisionBoundary}
        sticky={sticky}
        className="layered-combobox-positioner"
      >
        <Combobox.Popup
          {...props}
          ref={ref}
          data-tone={tone}
          data-size={comboboxSize}
          className={contentClasses}
        >
          {children}
          {showArrow && (
            <Combobox.Arrow className="layered-combobox-content__arrow" />
          )}
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  );
});

/* List: scrollable row container. Accepts either static children or Base
   UI's render-function form (`(item, index) => ReactNode`) for the
   `items`-driven built-in filtering model — both are valid, matching
   `Combobox.List`'s own children type exactly. */
export type LayeredComboboxListProps = ComponentPropsWithoutRef<
  typeof Combobox.List
>;

export const LayeredComboboxList = forwardRef<
  ElementRef<typeof Combobox.List>,
  LayeredComboboxListProps
>(function LayeredComboboxList({ className = "", ...props }, ref) {
  const listClasses = ["layered-combobox-list", className]
    .filter(Boolean)
    .join(" ");

  return <Combobox.List {...props} ref={ref} className={listClasses} />;
});

/* Empty: rendered only when the list is empty (requires `items` on Root).
   Kept permanently mounted per Base UI's own accessibility requirement —
   see Combobox.Empty's own doc comment — so it is styled to collapse
   visually rather than being conditionally rendered by this wrapper. */
export type LayeredComboboxEmptyProps = ComponentPropsWithoutRef<
  typeof Combobox.Empty
>;

export const LayeredComboboxEmpty = forwardRef<
  ElementRef<typeof Combobox.Empty>,
  LayeredComboboxEmptyProps
>(function LayeredComboboxEmpty({ className = "", ...props }, ref) {
  const emptyClasses = ["layered-combobox-empty", className]
    .filter(Boolean)
    .join(" ");

  return <Combobox.Empty {...props} ref={ref} className={emptyClasses} />;
});

/* Group / GroupLabel: same thin-wrapper-plus-quiet-heading shape as
   LayeredDropdownMenuGroup/Label. */
export type LayeredComboboxGroupProps = ComponentPropsWithoutRef<
  typeof Combobox.Group
>;

export const LayeredComboboxGroup = forwardRef<
  ElementRef<typeof Combobox.Group>,
  LayeredComboboxGroupProps
>(function LayeredComboboxGroup({ className = "", ...props }, ref) {
  const groupClasses = ["layered-combobox-group", className]
    .filter(Boolean)
    .join(" ");

  return <Combobox.Group {...props} ref={ref} className={groupClasses} />;
});

export type LayeredComboboxGroupLabelProps = ComponentPropsWithoutRef<
  typeof Combobox.GroupLabel
>;

export const LayeredComboboxGroupLabel = forwardRef<
  ElementRef<typeof Combobox.GroupLabel>,
  LayeredComboboxGroupLabelProps
>(function LayeredComboboxGroupLabel({ className = "", ...props }, ref) {
  const labelClasses = ["layered-combobox-group-label", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.GroupLabel {...props} ref={ref} className={labelClasses} />
  );
});

/* Item: row with a reserved leading indicator column, matching
   LayeredDropdownMenuCheckboxItem's shape — Base UI drives `data-selected`
   and `data-highlighted` itself, so the checkmark is rendered through
   ItemIndicator's own Presence-gated mount rather than a manual
   conditional. */
export type LayeredComboboxItemProps = ComponentPropsWithoutRef<
  typeof Combobox.Item
>;

export const LayeredComboboxItem = forwardRef<
  ElementRef<typeof Combobox.Item>,
  LayeredComboboxItemProps
>(function LayeredComboboxItem({ className = "", children, ...props }, ref) {
  const itemClasses = ["layered-combobox-item", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Combobox.Item {...props} ref={ref} className={itemClasses}>
      <span className="layered-combobox-item__indicator">
        <Combobox.ItemIndicator>
          <span
            className="layered-combobox-item__check"
            aria-hidden="true"
          />
        </Combobox.ItemIndicator>
      </span>
      {children}
    </Combobox.Item>
  );
});

/* Item, non-checkable variant is intentionally not offered — every row in
   a Combobox list is a selectable option by definition (unlike
   LayeredDropdownMenuItem, which can be a plain action). A row that must
   never show the indicator column can pass `render` on Combobox.Item
   directly rather than going through this wrapper. */
