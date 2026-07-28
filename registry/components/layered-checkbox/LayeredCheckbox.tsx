import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import "./LayeredCheckbox.css";

export type LayeredCheckboxTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredCheckboxSize =
  | "small"
  | "medium"
  | "large";

export interface LayeredCheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "readOnly"
  > {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredCheckboxTone;
  checkboxSize?: LayeredCheckboxSize;
  fullWidth?: boolean;
  indeterminate?: boolean;
}

export const LayeredCheckbox = forwardRef<
  HTMLInputElement,
  LayeredCheckboxProps
>(function LayeredCheckbox(
  {
    label,
    description,
    error,
    tone = "neutral",
    checkboxSize = "medium",
    fullWidth = false,
    indeterminate = false,
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

  const internalRef = useRef<HTMLInputElement | null>(null);

  const assignRef = (node: HTMLInputElement | null) => {
    internalRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const generatedId = useId();
  const checkboxId = id || `layered-checkbox-${generatedId}`;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;

  const describedBy =
    [consumerDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  const isInvalid =
    Boolean(error) ||
    consumerInvalid === true ||
    consumerInvalid === "true";

  const wrapperClasses = [
    "layered-checkbox-wrapper",
    fullWidth ? "layered-checkbox-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      data-tone={tone}
      data-size={checkboxSize}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={isInvalid ? "true" : undefined}
    >
      <div className="layered-checkbox__row">
        <input
          {...inputProps}
          ref={assignRef}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={isInvalid ? true : undefined}
          className="layered-checkbox__native"
        />

        <label htmlFor={checkboxId} className="layered-checkbox__control">
          <span className="layered-checkbox__casing" aria-hidden="true">
            <span className="layered-checkbox__trench">
              <span className="layered-checkbox__face">
                <span className="layered-checkbox__mark" />
              </span>
            </span>
          </span>

          <span className="layered-checkbox__label">
            {label}
            {required && (
              <span
                className="layered-checkbox__required"
                aria-hidden="true"
              >
                {" *"}
              </span>
            )}
          </span>
        </label>
      </div>

      {description && (
        <div id={descriptionId} className="layered-checkbox__description">
          {description}
        </div>
      )}

      {error && (
        <div id={errorId} className="layered-checkbox__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
