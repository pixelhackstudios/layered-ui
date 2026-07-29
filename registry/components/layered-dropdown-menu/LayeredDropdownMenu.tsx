import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./LayeredDropdownMenu.css";

export type LayeredDropdownMenuTone = "neutral" | "copper" | "green" | "gold";
export type LayeredDropdownMenuSize = "small" | "medium";

/* Root: thin Radix DropdownMenu.Root wrapper (controlled/uncontrolled,
   modal). */
export type LayeredDropdownMenuProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Root
>;

export function LayeredDropdownMenu(props: LayeredDropdownMenuProps) {
  return <DropdownMenu.Root {...props} />;
}

/* Trigger: thin wrapper, no structural styling of its own — composes via
   `asChild` around arbitrary consumer content, same as
   LayeredPopoverTrigger. */
export type LayeredDropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Trigger
>;

export const LayeredDropdownMenuTrigger = forwardRef<
  ElementRef<typeof DropdownMenu.Trigger>,
  LayeredDropdownMenuTriggerProps
>(function LayeredDropdownMenuTrigger(props, ref) {
  return <DropdownMenu.Trigger {...props} ref={ref} />;
});

/* Content: owns Portal, casing, z-index, motion, and the internal Arrow —
   same shape as LayeredPopoverContent. Shares the `--layered-z-popover`
   layer (see tokens.css "Overlay Stack" comment, which already reserved
   that layer for "Popover/Menu"): both are anchored, non-modal-by-default
   overlays that never need to out-rank each other. `asChild` is omitted
   for the same single-child-Slot-contract reason as
   LayeredPopoverContent/LayeredAccordionContent. `forceMount` is forwarded
   to both `DropdownMenu.Portal` and `DropdownMenu.Content`, matching
   LayeredPopoverContent's reasoning: Radix gates Presence separately at
   each level. */
export interface LayeredDropdownMenuContentProps
  extends Omit<ComponentPropsWithoutRef<typeof DropdownMenu.Content>, "asChild"> {
  tone?: LayeredDropdownMenuTone;
  menuSize?: LayeredDropdownMenuSize;
  showArrow?: boolean;
  container?: ComponentPropsWithoutRef<typeof DropdownMenu.Portal>["container"];
  forceMount?: true;
}

export const LayeredDropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  LayeredDropdownMenuContentProps
>(function LayeredDropdownMenuContent(
  {
    tone = "neutral",
    menuSize = "small",
    showArrow = false,
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
  const contentClasses = ["layered-dropdown-menu-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.Portal container={container} forceMount={forceMount}>
      <DropdownMenu.Content
        {...props}
        ref={ref}
        forceMount={forceMount}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-tone={tone}
        data-size={menuSize}
        className={contentClasses}
      >
        <div className="layered-dropdown-menu-content__body">{children}</div>
        {showArrow && (
          <DropdownMenu.Arrow
            className="layered-dropdown-menu-content__arrow"
            width={14}
            height={7}
          />
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
});

/* Item: the plain, non-checkable row. `intent="destructive"` is the only
   variant — everything else (icons, trailing shortcut text) is free-form
   children, matching the free-form-content stance of LayeredPopoverContent.
   `inset` reserves the same leading space CheckboxItem/RadioItem occupy
   for their indicator, so plain Items can align into an icon-free column
   alongside checkable ones in the same menu. */
export interface LayeredDropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenu.Item> {
  intent?: "default" | "destructive";
  inset?: boolean;
}

export const LayeredDropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  LayeredDropdownMenuItemProps
>(function LayeredDropdownMenuItem(
  { intent = "default", inset = false, className = "", ...props },
  ref
) {
  const itemClasses = ["layered-dropdown-menu-item", className]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.Item
      {...props}
      ref={ref}
      data-intent={intent}
      data-inset={inset ? "true" : undefined}
      className={itemClasses}
    />
  );
});

/* CheckboxItem: leading indicator column holds a mechanical checkmark
   glyph, shown only when `checked` — same ItemIndicator pattern Radix uses
   for Select, kept visually consistent with LayeredCheckbox's own glyph
   rather than reusing its full control markup (CheckboxItem is a menu row,
   not a form control). */
export type LayeredDropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.CheckboxItem
>;

export const LayeredDropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenu.CheckboxItem>,
  LayeredDropdownMenuCheckboxItemProps
>(function LayeredDropdownMenuCheckboxItem(
  { className = "", children, ...props },
  ref
) {
  const itemClasses = [
    "layered-dropdown-menu-item",
    "layered-dropdown-menu-item--checkable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.CheckboxItem
      {...props}
      ref={ref}
      data-intent="default"
      className={itemClasses}
    >
      <span className="layered-dropdown-menu-item__indicator">
        <DropdownMenu.ItemIndicator>
          <span
            className="layered-dropdown-menu-item__check"
            aria-hidden="true"
          />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.CheckboxItem>
  );
});

/* RadioGroup / RadioItem: same leading-indicator-column shape as
   CheckboxItem, with a filled dot glyph instead of a checkmark. */
export type LayeredDropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.RadioGroup
>;

export function LayeredDropdownMenuRadioGroup(
  props: LayeredDropdownMenuRadioGroupProps
) {
  return <DropdownMenu.RadioGroup {...props} />;
}

export type LayeredDropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.RadioItem
>;

export const LayeredDropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenu.RadioItem>,
  LayeredDropdownMenuRadioItemProps
>(function LayeredDropdownMenuRadioItem(
  { className = "", children, ...props },
  ref
) {
  const itemClasses = [
    "layered-dropdown-menu-item",
    "layered-dropdown-menu-item--checkable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.RadioItem
      {...props}
      ref={ref}
      data-intent="default"
      className={itemClasses}
    >
      <span className="layered-dropdown-menu-item__indicator">
        <DropdownMenu.ItemIndicator>
          <span
            className="layered-dropdown-menu-item__dot"
            aria-hidden="true"
          />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.RadioItem>
  );
});

/* Label: non-interactive group heading, styled quieter than Item rows. */
export type LayeredDropdownMenuLabelProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Label
>;

export const LayeredDropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenu.Label>,
  LayeredDropdownMenuLabelProps
>(function LayeredDropdownMenuLabel({ className = "", ...props }, ref) {
  const labelClasses = ["layered-dropdown-menu-label", className]
    .filter(Boolean)
    .join(" ");

  return <DropdownMenu.Label {...props} ref={ref} className={labelClasses} />;
});

/* Separator: single trench line between groups, matching the inset-line
   accent pattern used elsewhere (LayeredAccordion's dividers). */
export type LayeredDropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Separator
>;

export const LayeredDropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenu.Separator>,
  LayeredDropdownMenuSeparatorProps
>(function LayeredDropdownMenuSeparator({ className = "", ...props }, ref) {
  const separatorClasses = ["layered-dropdown-menu-separator", className]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.Separator
      {...props}
      ref={ref}
      className={separatorClasses}
    />
  );
});

/* Group: thin semantic wrapper, no styling of its own — grouping is
   communicated through an adjacent Label and Separator, not through group
   chrome. */
export type LayeredDropdownMenuGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Group
>;

export function LayeredDropdownMenuGroup(
  props: LayeredDropdownMenuGroupProps
) {
  return <DropdownMenu.Group {...props} />;
}

/* Sub: thin Radix DropdownMenu.Sub wrapper (controlled/uncontrolled
   submenu open state). */
export type LayeredDropdownMenuSubProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Sub
>;

export function LayeredDropdownMenuSub(props: LayeredDropdownMenuSubProps) {
  return <DropdownMenu.Sub {...props} />;
}

/* SubTrigger: an Item row that also opens a submenu — same base styling as
   Item plus a trailing directional chevron so it reads as a disclosure
   row rather than a terminal action. */
export type LayeredDropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.SubTrigger
> & {
  inset?: boolean;
};

export const LayeredDropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenu.SubTrigger>,
  LayeredDropdownMenuSubTriggerProps
>(function LayeredDropdownMenuSubTrigger(
  { inset = false, className = "", children, ...props },
  ref
) {
  const itemClasses = [
    "layered-dropdown-menu-item",
    "layered-dropdown-menu-item--sub-trigger",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.SubTrigger
      {...props}
      ref={ref}
      data-intent="default"
      data-inset={inset ? "true" : undefined}
      className={itemClasses}
    >
      {children}
      <span
        className="layered-dropdown-menu-item__sub-chevron"
        aria-hidden="true"
      />
    </DropdownMenu.SubTrigger>
  );
});

/* SubContent: same casing/motion/z-index treatment as Content, minus the
   Arrow — a submenu is always anchored to its SubTrigger row, so a
   directional pointer back to the parent menu adds noise rather than
   orientation. */
export interface LayeredDropdownMenuSubContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>,
    "asChild"
  > {
  tone?: LayeredDropdownMenuTone;
  menuSize?: LayeredDropdownMenuSize;
  forceMount?: true;
}

export const LayeredDropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenu.SubContent>,
  LayeredDropdownMenuSubContentProps
>(function LayeredDropdownMenuSubContent(
  {
    tone = "neutral",
    menuSize = "small",
    sideOffset = 4,
    collisionPadding = 8,
    className = "",
    children,
    ...props
  },
  ref
) {
  const contentClasses = ["layered-dropdown-menu-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu.SubContent
      {...props}
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      data-tone={tone}
      data-size={menuSize}
      className={contentClasses}
    >
      <div className="layered-dropdown-menu-content__body">{children}</div>
    </DropdownMenu.SubContent>
  );
});
