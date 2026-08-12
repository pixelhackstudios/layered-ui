import {
  forwardRef,
  type CSSProperties,
  type ProgressHTMLAttributes,
} from "react";
import "./LayeredProgress.css";

export type LayeredProgressTone = "neutral" | "copper" | "green" | "gold";
export type LayeredProgressSize = "small" | "medium" | "large";

export interface LayeredProgressProps
  extends Omit<
    ProgressHTMLAttributes<HTMLProgressElement>,
    "children" | "className" | "style" | "value" | "max"
  > {
  value?: number;
  max?: number;
  tone?: LayeredProgressTone;
  progressSize?: LayeredProgressSize;
  className?: string;
  style?: CSSProperties;
}

export const LayeredProgress = forwardRef<
  HTMLProgressElement,
  LayeredProgressProps
>(function LayeredProgress(
  {
    value,
    max = 100,
    tone = "neutral",
    progressSize = "medium",
    className = "",
    style,
    ...props
  },
  ref
) {
  const resolvedMax = Number.isFinite(max) && max > 0 ? max : 100;
  const isIndeterminate = value === undefined || !Number.isFinite(value);
  const resolvedValue = isIndeterminate
    ? undefined
    : Math.min(Math.max(value, 0), resolvedMax);
  const position =
    resolvedValue === undefined ? "0%" : `${(resolvedValue / resolvedMax) * 100}%`;

  return (
    <span
      className={["layered-progress", className].filter(Boolean).join(" ")}
      data-state={isIndeterminate ? "indeterminate" : "determinate"}
      data-tone={tone}
      data-size={progressSize}
      style={
        {
          ...style,
          "--layered-progress-position": position,
        } as CSSProperties
      }
    >
      <progress
        {...props}
        ref={ref}
        className="layered-progress__native"
        value={resolvedValue}
        max={resolvedMax}
      />
      <span className="layered-progress__channel" aria-hidden="true">
        <span className="layered-progress__fill" />
      </span>
    </span>
  );
});
