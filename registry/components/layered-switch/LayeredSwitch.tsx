import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import "./LayeredSwitch.css";

export type LayeredSwitchTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredSwitchSize =
  | "small"
  | "medium"
  | "large";

export interface LayeredSwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "readOnly" | "role"
  > {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredSwitchTone;
  switchSize?: LayeredSwitchSize;
  fullWidth?: boolean;
}

export const LayeredSwitch = forwardRef<
  HTMLInputElement,
  LayeredSwitchProps
>(function LayeredSwitch(
  {
    label,
    description,
    error,
    tone = "neutral",
    switchSize = "medium",
    fullWidth = false,
    className = "",
    id,
    disabled,
    required,
    ...props
  },
  forwardedRef
) {
  const {
    "aria-describedby": consumerDescribedBy,
    "aria-invalid": consumerInvalid,
    ...inputProps
  } = props;

  const generatedId = useId();
  const switchId = id || `layered-switch-${generatedId}`;
  const descriptionId = description ? `${switchId}-description` : undefined;
  const errorId = error ? `${switchId}-error` : undefined;

  const describedBy =
    [consumerDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  const isInvalid =
    Boolean(error) ||
    consumerInvalid === true ||
    consumerInvalid === "true";

  const wrapperClasses = [
    "layered-switch-wrapper",
    fullWidth ? "layered-switch-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      data-tone={tone}
      data-size={switchSize}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={isInvalid ? "true" : undefined}
    >
      <div className="layered-switch__row">
        <input
          {...inputProps}
          ref={forwardedRef}
          type="checkbox"
          role="switch"
          id={switchId}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={isInvalid ? true : undefined}
          className="layered-switch__native"
        />

        <label htmlFor={switchId} className="layered-switch__control">
          <span className="layered-switch__casing" aria-hidden="true">
            <span className="layered-switch__trench">
              <span className="layered-switch__detent layered-switch__detent--off" />
              <span className="layered-switch__detent layered-switch__detent--on" />
              <span className="layered-switch__lever" />
            </span>
          </span>

          <span className="layered-switch__label">
            {label}
            {required && (
              <span
                className="layered-switch__required"
                aria-hidden="true"
              >
                {" *"}
              </span>
            )}
          </span>
        </label>
      </div>

      {description && (
        <div id={descriptionId} className="layered-switch__description">
          {description}
        </div>
      )}

      {error && (
        <div id={errorId} className="layered-switch__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
