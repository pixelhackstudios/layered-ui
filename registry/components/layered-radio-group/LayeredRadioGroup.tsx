import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import "./LayeredRadioGroup.css";

export type LayeredRadioGroupTone = "neutral" | "copper" | "green" | "gold";
export type LayeredRadioGroupSize = "small" | "medium" | "large";

/* Root: maps to Radix RadioGroup.Root (controlled/uncontrolled value,
   orientation, dir, loop, and required all remain purely Radix-owned).
   Layered adds tone, radioGroupSize, and fullWidth here rather than on
   Item — Items are direct DOM descendants of Root (no Portal, no sibling
   split like Tabs' List/Content), so cascading custom properties reach
   every Item without re-declaring them per item. */
export interface LayeredRadioGroupProps
  extends ComponentPropsWithoutRef<typeof RadioGroup.Root> {
  tone?: LayeredRadioGroupTone;
  radioGroupSize?: LayeredRadioGroupSize;
  fullWidth?: boolean;
  error?: ReactNode;
}

export const LayeredRadioGroup = forwardRef<
  ElementRef<typeof RadioGroup.Root>,
  LayeredRadioGroupProps
>(function LayeredRadioGroup(
  {
    tone = "neutral",
    radioGroupSize = "medium",
    fullWidth = false,
    error,
    className = "",
    "aria-describedby": consumerDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const errorId = error ? `layered-radio-group-error-${generatedId}` : undefined;

  const describedBy =
    [consumerDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={[
        "layered-radio-group-wrapper",
        fullWidth ? "layered-radio-group-wrapper--full-width" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-invalid={error ? "true" : undefined}
    >
      <RadioGroup.Root
        {...props}
        ref={ref}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        data-tone={tone}
        data-size={radioGroupSize}
        className={["layered-radio-group", className]
          .filter(Boolean)
          .join(" ")}
      />

      {error && (
        <div id={errorId} className="layered-radio-group__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

/* Item: the visible casing/trench/face itself is the focusable Radix
   Item (a real <button role="radio">), not a hidden native input behind
   a styled label — Radix Item already provides the interactive surface,
   so there is nothing to hide. Checked state reads Radix's own
   data-state="checked" on Item to light the face; no Radio.Indicator
   dot is rendered, so no separate element is needed to carry that
   state visually. A sibling <label htmlFor> supplies the accessible
   text, since a labelable <button> receives focus/click delegation
   from a native label the same way a checkbox's hidden input would. */
export interface LayeredRadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroup.Item> {
  label: ReactNode;
  description?: ReactNode;
}

export const LayeredRadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroup.Item>,
  LayeredRadioGroupItemProps
>(function LayeredRadioGroupItem(
  {
    label,
    description,
    className = "",
    id,
    disabled,
    "aria-describedby": consumerDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const itemId = id || `layered-radio-group-item-${generatedId}`;
  const descriptionId = description ? `${itemId}-description` : undefined;

  const describedBy =
    [consumerDescribedBy, descriptionId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div
      className="layered-radio-group__row"
      data-disabled={disabled ? "true" : undefined}
    >
      <RadioGroup.Item
        {...props}
        ref={ref}
        id={itemId}
        disabled={disabled}
        aria-describedby={describedBy}
        className={["layered-radio-group__control", className]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="layered-radio-group__casing" aria-hidden="true">
          <span className="layered-radio-group__trench">
            <span className="layered-radio-group__face" />
          </span>
        </span>
      </RadioGroup.Item>

      <div className="layered-radio-group__text">
        <label htmlFor={itemId} className="layered-radio-group__label">
          {label}
        </label>

        {description && (
          <div id={descriptionId} className="layered-radio-group__description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
});
