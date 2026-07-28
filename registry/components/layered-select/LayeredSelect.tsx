import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import "./LayeredSelect.css";

export type LayeredSelectTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredSelectSize =
  | "small"
  | "medium"
  | "large";

export interface LayeredSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredSelectTone;
  selectSize?: LayeredSelectSize;
  fullWidth?: boolean;
}

export const LayeredSelect = forwardRef<HTMLSelectElement, LayeredSelectProps>(
  function LayeredSelect(
    {
      label,
      children,
      description,
      error,
      tone = "neutral",
      selectSize = "medium",
      fullWidth = false,
      className = "",
      id,
      disabled,
      required,
      multiple,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = id || `layered-select-${generatedId}`;
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

    const describedBy =
      [props["aria-describedby"], descriptionId, errorId]
        .filter(Boolean)
        .join(" ") || undefined;

    const isInvalid =
      Boolean(error) ||
      props["aria-invalid"] === true ||
      props["aria-invalid"] === "true";

    const wrapperClasses = [
      "layered-select-wrapper",
      fullWidth ? "layered-select-wrapper--full-width" : "",
      multiple ? "layered-select-wrapper--multiple" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        className={wrapperClasses}
        data-tone={tone}
        data-size={selectSize}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={isInvalid ? "true" : undefined}
        data-multiple={multiple ? "true" : undefined}
      >
        <div className="layered-select__label-row">
          <label htmlFor={selectId} className="layered-select__label">
            {label}
            {required && (
              <span className="layered-select__required" aria-hidden="true">
                {" *"}
              </span>
            )}
          </label>
        </div>

        <div className="layered-select__casing">
          <div className="layered-select__surface">
            <select
              ref={ref}
              id={selectId}
              disabled={disabled}
              required={required}
              multiple={multiple}
              aria-describedby={describedBy}
              aria-invalid={isInvalid ? true : undefined}
              className="layered-select__control"
              {...props}
            >
              {children}
            </select>

            {!multiple && (
              <span className="layered-select__arrow" aria-hidden="true">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        {description && (
          <div id={descriptionId} className="layered-select__description">
            {description}
          </div>
        )}

        {error && (
          <div id={errorId} className="layered-select__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);
