import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as Slider from "@radix-ui/react-slider";
import "./LayeredSlider.css";

export type LayeredSliderTone = "neutral" | "copper" | "green" | "gold";
export type LayeredSliderSize = "small" | "medium" | "large";

/* Root: maps to Radix Slider.Root (min/max/step/value/defaultValue,
   onValueChange/onValueCommit, disabled, minStepsBetweenThumbs, dir, name,
   form all remain purely Radix-owned). `orientation` is intentionally
   omitted and forced to "horizontal" — v1 ships the recessed calibration
   rail as a horizontal-only surface, matching Accordion's precedent of
   trimming an orientation the CSS doesn't yet back. Root owns `tone` and
   `sliderSize`, following Tabs'/Accordion's Root-owned precedent: Track and
   Thumb are siblings under Root, so a Track-scoped custom property couldn't
   cascade into Thumb. */
export interface LayeredSliderProps
  extends Omit<ComponentPropsWithoutRef<typeof Slider.Root>, "orientation"> {
  tone?: LayeredSliderTone;
  sliderSize?: LayeredSliderSize;
}

export const LayeredSlider = forwardRef<
  ElementRef<typeof Slider.Root>,
  LayeredSliderProps
>(function LayeredSlider(
  { tone = "neutral", sliderSize = "medium", className = "", ...props },
  ref
) {
  return (
    <Slider.Root
      {...props}
      ref={ref}
      orientation="horizontal"
      data-tone={tone}
      data-size={sliderSize}
      className={["layered-slider", className].filter(Boolean).join(" ")}
    />
  );
});

/* Track: the recessed rail. Calibration ticks are a decorative CSS
   background (repeating-linear-gradient), not scanned or measured child
   markup — matching Toast's "no child scanning" and Tabs'/Accordion's
   "no JS measurement" precedents. */
export type LayeredSliderTrackProps = ComponentPropsWithoutRef<
  typeof Slider.Track
>;

export const LayeredSliderTrack = forwardRef<
  ElementRef<typeof Slider.Track>,
  LayeredSliderTrackProps
>(function LayeredSliderTrack({ className = "", ...props }, ref) {
  return (
    <Slider.Track
      {...props}
      ref={ref}
      className={["layered-slider-track", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Range: thin wrapper, no Layered-specific props. */
export type LayeredSliderRangeProps = ComponentPropsWithoutRef<
  typeof Slider.Range
>;

export const LayeredSliderRange = forwardRef<
  ElementRef<typeof Slider.Range>,
  LayeredSliderRangeProps
>(function LayeredSliderRange({ className = "", ...props }, ref) {
  return (
    <Slider.Range
      {...props}
      ref={ref}
      className={["layered-slider-range", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

/* Thumb: the mechanical carriage. One is rendered per value in
   `value`/`defaultValue` — consumers compose multiple for a range slider,
   same as raw Radix. No Layered-specific props: an `aria-label` (or
   `aria-labelledby`) is required per Radix's own contract and is passed
   straight through. */
export type LayeredSliderThumbProps = ComponentPropsWithoutRef<
  typeof Slider.Thumb
>;

export const LayeredSliderThumb = forwardRef<
  ElementRef<typeof Slider.Thumb>,
  LayeredSliderThumbProps
>(function LayeredSliderThumb({ className = "", ...props }, ref) {
  return (
    <Slider.Thumb
      {...props}
      ref={ref}
      className={["layered-slider-thumb", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
});
