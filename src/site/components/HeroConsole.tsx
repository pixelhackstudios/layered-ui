import { useEffect, useState } from "react";
import { LayeredBadge } from "../../../registry/components/layered-badge/LayeredBadge";
import { LayeredButton } from "../../../registry/components/layered-button/LayeredButton";
import { LayeredProgress } from "../../../registry/components/layered-progress/LayeredProgress";
import { LayeredRadioGroup, LayeredRadioGroupItem } from "../../../registry/components/layered-radio-group/LayeredRadioGroup";
import { LayeredSlider, LayeredSliderRange, LayeredSliderThumb, LayeredSliderTrack } from "../../../registry/components/layered-slider/LayeredSlider";
import { LayeredSwitch } from "../../../registry/components/layered-switch/LayeredSwitch";

type Mode = "hold" | "track" | "scan";

const modeTone = { hold: "gold", track: "green", scan: "copper" } as const;

/* A working instrument module assembled only from published components.
   Power gates everything; gain sets the reading; mode recolors the output. */
export function HeroConsole() {
  const [power, setPower] = useState(true);
  const [gain, setGain] = useState([64]);
  const [mode, setMode] = useState<Mode>("track");
  const [pulses, setPulses] = useState(0);
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    if (!pinging) return;
    const timer = window.setTimeout(() => setPinging(false), 1400);
    return () => window.clearTimeout(timer);
  }, [pinging]);

  const reading = power ? gain[0] : 0;
  const tone = modeTone[mode];

  return (
    <section className="hero-console" aria-labelledby="hero-console-title">
      <header className="hero-console__header">
        <span className="hero-console__serial" aria-hidden="true">MOD LX-01</span>
        <h2 id="hero-console-title" className="hero-console__title">
          Signal module
        </h2>
        <LayeredBadge tone={power ? (pinging ? "copper" : "green") : "neutral"} badgeSize="medium">
          {power ? (pinging ? "Transmitting" : "Online") : "Offline"}
        </LayeredBadge>
      </header>

      <div className="hero-console__readout">
        <div className="hero-console__meter">
          <span id="hero-output-label">Output</span>
          <output aria-live="off" className="hero-console__value">
            {String(reading).padStart(3, "0")}
            <small>dB</small>
          </output>
        </div>
        <LayeredProgress
          value={power && mode !== "scan" ? reading : power ? undefined : 0}
          tone={tone}
          progressSize="large"
          aria-labelledby="hero-output-label"
        />
      </div>

      <div className="hero-console__controls">
        <LayeredSwitch
          label="Main power"
          tone="green"
          checked={power}
          onChange={(event) => setPower(event.target.checked)}
        />
        <div className="hero-console__slider">
          <span id="hero-gain-label">Gain</span>
          <LayeredSlider
            tone={tone}
            value={gain}
            onValueChange={setGain}
            max={100}
            disabled={!power}
            aria-labelledby="hero-gain-label"
          >
            <LayeredSliderTrack>
              <LayeredSliderRange />
            </LayeredSliderTrack>
            <LayeredSliderThumb aria-labelledby="hero-gain-label" />
          </LayeredSlider>
        </div>
        <div className="hero-console__modes">
        <LayeredRadioGroup
          value={mode}
          onValueChange={(value) => setMode(value as Mode)}
          tone={tone}
          radioGroupSize="small"
          aria-label="Mode"
          orientation="horizontal"
          disabled={!power}
        >
          <LayeredRadioGroupItem value="hold" label="Hold" />
          <LayeredRadioGroupItem value="track" label="Track" />
          <LayeredRadioGroupItem value="scan" label="Scan" />
        </LayeredRadioGroup>
        </div>
      </div>

      <footer className="hero-console__footer">
        <span className="hero-console__count" aria-live="polite">
          {pulses === 0 ? "No pulses sent" : `${pulses} pulse${pulses === 1 ? "" : "s"} sent`}
        </span>
        <LayeredButton
          tone={tone}
          size="small"
          disabled={!power}
          onClick={() => {
            setPulses((count) => count + 1);
            setPinging(true);
          }}
        >
          Send pulse
        </LayeredButton>
      </footer>
    </section>
  );
}
