import { useState } from "react";
import {
  LayeredSlider,
  LayeredSliderRange,
  LayeredSliderThumb,
  LayeredSliderTrack,
} from "../../../../registry/components/layered-slider/LayeredSlider";

export default function SliderRange() {
  const [band, setBand] = useState([18, 72]);

  return (
    <div style={{ display: "grid", gap: 10, width: "min(100%, 320px)" }}>
      <LayeredSlider
        tone="green"
        value={band}
        onValueChange={setBand}
        max={100}
        minStepsBetweenThumbs={5}
      >
        <LayeredSliderTrack>
          <LayeredSliderRange />
        </LayeredSliderTrack>
        <LayeredSliderThumb aria-label="Lower threshold" />
        <LayeredSliderThumb aria-label="Upper threshold" />
      </LayeredSlider>
      <output style={{ fontVariantNumeric: "tabular-nums" }}>
        Alert between {band[0]}% and {band[1]}%
      </output>
    </div>
  );
}
