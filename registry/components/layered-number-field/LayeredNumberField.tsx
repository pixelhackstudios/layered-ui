import {
  forwardRef,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import "./LayeredNumberField.css";

export type LayeredNumberFieldTone = "neutral" | "copper" | "green" | "gold";
export type LayeredNumberFieldSize = "small" | "medium" | "large";

export interface LayeredNumberFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "max" | "min" | "size" | "step" | "type"
  > {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredNumberFieldTone;
  numberFieldSize?: LayeredNumberFieldSize;
  fullWidth?: boolean;
  decrementLabel?: string;
  incrementLabel?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const LayeredNumberField = forwardRef<
  HTMLInputElement,
  LayeredNumberFieldProps
>(function LayeredNumberField(
  {
    label,
    description,
    error,
    tone = "neutral",
    numberFieldSize = "medium",
    fullWidth = false,
    decrementLabel = "Decrease value",
    incrementLabel = "Increase value",
    className = "",
    id,
    disabled,
    readOnly,
    required,
    ...props
  },
  forwardedRef
) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = id || `layered-number-field-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy =
    [props["aria-describedby"], descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  const isInvalid =
    Boolean(error) ||
    props["aria-invalid"] === true ||
    props["aria-invalid"] === "true";

  const wrapperClasses = [
    "layered-number-field",
    fullWidth ? "layered-number-field--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  const stepValue = (direction: "up" | "down") => {
    const input = inputRef.current;

    if (!input || disabled || readOnly) {
      return;
    }

    if (direction === "up") {
      input.stepUp();
    } else {
      input.stepDown();
    }

    input.focus();
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div
      className={wrapperClasses}
      data-tone={tone}
      data-size={numberFieldSize}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-invalid={isInvalid ? "true" : undefined}
    >
      <label htmlFor={inputId} className="layered-number-field__label">
        {label}
        {required && (
          <span className="layered-number-field__required" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>

      <div className="layered-number-field__casing">
        <div className="layered-number-field__surface">
          <input
            {...props}
            ref={setInputRef}
            id={inputId}
            type="number"
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={isInvalid ? true : undefined}
            className="layered-number-field__control"
          />
        </div>

        <div className="layered-number-field__actuators">
          <button
            type="button"
            className="layered-number-field__actuator"
            aria-label={incrementLabel}
            disabled={disabled || readOnly}
            onClick={() => stepValue("up")}
          >
            <span aria-hidden="true">+</span>
          </button>
          <button
            type="button"
            className="layered-number-field__actuator"
            aria-label={decrementLabel}
            disabled={disabled || readOnly}
            onClick={() => stepValue("down")}
          >
            <span aria-hidden="true">−</span>
          </button>
        </div>
      </div>

      {description && (
        <div
          id={descriptionId}
          className="layered-number-field__description"
        >
          {description}
        </div>
      )}

      {error && (
        <div
          id={errorId}
          className="layered-number-field__error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
});
