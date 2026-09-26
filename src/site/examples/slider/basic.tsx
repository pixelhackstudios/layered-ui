import { useState } from "react";
import {
  LayeredSlider,
  LayeredSliderRange,
  LayeredSliderThumb,
  LayeredSliderTrack,
} from "../../../../registry/components/layered-slider/LayeredSlider";

export default function SliderBasic() {
  const [gain, setGain] = useState([62]);

  return (
    <div style={{ display: "grid", gap: 10, width: "min(100%, 320px)" }}>
      <LayeredSlider tone="copper" value={gain} onValueChange={setGain} max={100} step={1}>
        <LayeredSliderTrack>
          <LayeredSliderRange />
        </LayeredSliderTrack>
        <LayeredSliderThumb aria-label="Input gain" />
      </LayeredSlider>
      <output style={{ fontVariantNumeric: "tabular-nums" }}>Gain {gain[0]} dB</output>
    </div>
  );
}
