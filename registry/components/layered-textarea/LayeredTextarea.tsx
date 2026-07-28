import {
  forwardRef,
  useId,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import "./LayeredTextarea.css";

export type LayeredTextareaTone =
  | "neutral"
  | "copper"
  | "green"
  | "gold";

export type LayeredTextareaSize =
  | "small"
  | "medium"
  | "large";

export type LayeredTextareaResize =
  | "none"
  | "vertical"
  | "horizontal"
  | "both";

export interface LayeredTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tone?: LayeredTextareaTone;
  textareaSize?: LayeredTextareaSize;
  fullWidth?: boolean;
  resize?: LayeredTextareaResize;
}

export const LayeredTextarea = forwardRef<
  HTMLTextAreaElement,
  LayeredTextareaProps
>(function LayeredTextarea(
  {
    label,
    description,
    error,
    tone = "neutral",
    textareaSize = "medium",
    fullWidth = false,
    resize = "vertical",
    className = "",
    id,
    disabled,
    readOnly,
    required,
    ...props
  },
  ref
) {
  const {
    "aria-describedby": consumerDescribedBy,
    "aria-invalid": consumerInvalid,
    ...textareaProps
  } = props;

  const generatedId = useId();
  const textareaId = id || `layered-textarea-${generatedId}`;
  const descriptionId = description ? `${textareaId}-description` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;

  const describedBy =
    [consumerDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  const isInvalid =
    Boolean(error) ||
    consumerInvalid === true ||
    consumerInvalid === "true";

  const wrapperClasses = [
    "layered-textarea-wrapper",
    fullWidth ? "layered-textarea-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      data-tone={tone}
      data-size={textareaSize}
      data-resize={resize}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-invalid={isInvalid ? "true" : undefined}
    >
      <div className="layered-textarea__label-row">
        <label htmlFor={textareaId} className="layered-textarea__label">
          {label}
          {required && (
            <span className="layered-textarea__required" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      </div>

      <div className="layered-textarea__casing">
        <div className="layered-textarea__surface">
          <textarea
            {...textareaProps}
            ref={ref}
            id={textareaId}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={isInvalid ? true : undefined}
            className="layered-textarea__control"
          />
        </div>
      </div>

      {description && (
        <div id={descriptionId} className="layered-textarea__description">
          {description}
        </div>
      )}

      {error && (
        <div id={errorId} className="layered-textarea__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
