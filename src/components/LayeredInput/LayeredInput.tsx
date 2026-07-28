import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import "./LayeredInput.css";

export type LayeredInputTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredInputSize =
  | "small"
  | "medium"
  | "large";

export interface LayeredInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredInputTone;
  inputSize?: LayeredInputSize;
  fullWidth?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
}

export const LayeredInput = forwardRef<HTMLInputElement, LayeredInputProps>(
  function LayeredInput(
    {
      label,
      description,
      error,
      tone = "neutral",
      inputSize = "medium",
      fullWidth = false,
      leadingContent,
      trailingContent,
      className = "",
      id,
      disabled,
      readOnly,
      required,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id || `layered-input-${generatedId}`;
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
      "layered-input-wrapper",
      fullWidth ? "layered-input-wrapper--full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        className={wrapperClasses}
        data-tone={tone}
        data-size={inputSize}
        data-disabled={disabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
        data-invalid={isInvalid ? "true" : undefined}
      >
        <div className="layered-input__label-row">
          <label htmlFor={inputId} className="layered-input__label">
            {label}
            {required && (
              <span className="layered-input__required" aria-hidden="true">
                {" *"}
              </span>
            )}
          </label>
        </div>

        <div className="layered-input__casing">
          <div className="layered-input__surface">
            {leadingContent && (
              <span
                className="layered-input__leading"
                aria-hidden={
                  typeof leadingContent === "string" ||
                  typeof leadingContent === "number"
                    ? true
                    : undefined
                }
              >
                {leadingContent}
              </span>
            )}
            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-describedby={describedBy}
              aria-invalid={isInvalid ? true : undefined}
              className="layered-input__control"
              {...props}
            />
            {trailingContent && (
              <span
                className="layered-input__trailing"
                aria-hidden={
                  typeof trailingContent === "string" ||
                  typeof trailingContent === "number"
                    ? true
                    : undefined
                }
              >
                {trailingContent}
              </span>
            )}
          </div>
        </div>

        {description && (
          <div id={descriptionId} className="layered-input__description">
            {description}
          </div>
        )}

        {error && (
          <div id={errorId} className="layered-input__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);
