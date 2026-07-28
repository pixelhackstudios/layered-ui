import {
  Children,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./LayeredDialog.css";

export type LayeredDialogSize = "small" | "medium" | "large";

/* Root: maps directly to Radix Dialog.Root (controlled/uncontrolled, modal). */
export type LayeredDialogProps = ComponentPropsWithoutRef<typeof Dialog.Root>;

export function LayeredDialog(props: LayeredDialogProps) {
  return <Dialog.Root {...props} />;
}

/* Trigger: thin wrapper around Radix Trigger, no structural styling of its own. */
export const LayeredDialogTrigger = forwardRef<
  ElementRef<typeof Dialog.Trigger>,
  ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(function LayeredDialogTrigger(props, ref) {
  return <Dialog.Trigger {...props} ref={ref} />;
});

/* Content: owns Portal, Overlay, and Content. Supports a portal `container`.
   Also owns the single opinionated mechanical corner close control — the
   `LayeredDialogClose` export stays a generic, unstyled Radix Close wrapper
   so it can be composed around arbitrary footer actions (see below). */
export interface LayeredDialogContentProps
  extends ComponentPropsWithoutRef<typeof Dialog.Content> {
  size?: LayeredDialogSize;
  container?: ComponentPropsWithoutRef<typeof Dialog.Portal>["container"];
  overlayClassName?: string;
  showCloseButton?: boolean;
  closeLabel?: string;
}

export const LayeredDialogContent = forwardRef<
  ElementRef<typeof Dialog.Content>,
  LayeredDialogContentProps
>(function LayeredDialogContent(
  {
    size = "medium",
    container,
    className = "",
    overlayClassName = "",
    showCloseButton = true,
    closeLabel = "Close dialog",
    children,
    ...props
  },
  ref
) {
  const contentClasses = ["layered-dialog-content", className]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = ["layered-dialog-overlay", overlayClassName]
    .filter(Boolean)
    .join(" ");

  // Partition into an explicit header / scrollable body / footer grid so
  // only the body region ever scrolls, regardless of how many discrete
  // children the consumer passes between the header and footer.
  const headerChildren: ReactNode[] = [];
  const footerChildren: ReactNode[] = [];
  const bodyChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === LayeredDialogHeader) {
      headerChildren.push(child);
    } else if (isValidElement(child) && child.type === LayeredDialogFooter) {
      footerChildren.push(child);
    } else {
      bodyChildren.push(child);
    }
  });

  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay className={overlayClasses}>
        <Dialog.Content
          {...props}
          ref={ref}
          data-size={size}
          className={contentClasses}
        >
          <div className="layered-dialog-content__surface">
            {showCloseButton && (
              <Dialog.Close
                type="button"
                className="layered-dialog-content__close"
                aria-label={closeLabel}
              >
                <span
                  className="layered-dialog-content__close-glyph"
                  aria-hidden="true"
                />
              </Dialog.Close>
            )}
            {headerChildren}
            <div className="layered-dialog-content__body">
              {bodyChildren}
            </div>
            {footerChildren}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
});

/* Title / Description: preserve Radix semantics, add layered typography. */
export const LayeredDialogTitle = forwardRef<
  ElementRef<typeof Dialog.Title>,
  ComponentPropsWithoutRef<typeof Dialog.Title>
>(function LayeredDialogTitle({ className = "", ...props }, ref) {
  return (
    <Dialog.Title
      {...props}
      ref={ref}
      className={["layered-dialog-title", className].filter(Boolean).join(" ")}
    />
  );
});

export const LayeredDialogDescription = forwardRef<
  ElementRef<typeof Dialog.Description>,
  ComponentPropsWithoutRef<typeof Dialog.Description>
>(function LayeredDialogDescription({ className = "", ...props }, ref) {
  return (
    <Dialog.Description
      {...props}
      ref={ref}
      className={["layered-dialog-description", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Close: generic, unstyled Radix Close wrapper. Imposes no positioning,
   dimensions, or appearance of its own — it exists purely to forward Close
   behavior (and, via `asChild`, to compose around arbitrary consumer
   content such as a `LayeredButton` in a footer). The opinionated
   corner-mounted mechanical X control lives inside `LayeredDialogContent`
   instead (`.layered-dialog-content__close`), so it is never accidentally
   applied to a text action button. */
export type LayeredDialogCloseProps = ComponentPropsWithoutRef<
  typeof Dialog.Close
>;

export const LayeredDialogClose = forwardRef<
  ElementRef<typeof Dialog.Close>,
  LayeredDialogCloseProps
>(function LayeredDialogClose({ className = "", ...props }, ref) {
  return (
    <Dialog.Close
      {...props}
      ref={ref}
      className={["layered-dialog-close", className].filter(Boolean).join(" ")}
    />
  );
});

/* Header / Footer: visual layout wrappers only, no Radix behavior. */
export function LayeredDialogHeader({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={["layered-dialog-header", className].filter(Boolean).join(" ")}
    />
  );
}

export function LayeredDialogFooter({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={["layered-dialog-footer", className].filter(Boolean).join(" ")}
    />
  );
}
