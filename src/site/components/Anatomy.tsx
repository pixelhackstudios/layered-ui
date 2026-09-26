import { useState } from "react";
import { LayeredButton } from "../../../registry/components/layered-button/LayeredButton";
import { LayeredSwitch } from "../../../registry/components/layered-switch/LayeredSwitch";

const layers = [
  { id: "light", name: "Lighting", body: "A directional highlight on the top edge and a shadow below. Every surface is lit from the same side." },
  { id: "face", name: "Face", body: "The part you touch. A radial gradient in the tone color, raised above the trench." },
  { id: "trench", name: "Trench", body: "A recessed channel that separates the face from its housing and gives it room to travel." },
  { id: "casing", name: "Casing", body: "The outer frame. It sets the edge, the bevel, and how far the control stands off the page." },
] as const;

/* The exploded view pulls a button apart along Z so each constructed layer
   can be seen and named. With reduced motion the layers still separate;
   they just don't travel there. */
export function Anatomy() {
  const [exploded, setExploded] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="anatomy">
      <div className="anatomy__stage" data-exploded={exploded ? "true" : undefined} data-active={active ?? undefined}>
        <div className="anatomy__stack" aria-hidden="true">
          <span className="anatomy__layer anatomy__layer--casing" data-layer="casing" />
          <span className="anatomy__layer anatomy__layer--trench" data-layer="trench" />
          <span className="anatomy__layer anatomy__layer--face" data-layer="face">
            <span>ENGAGE</span>
          </span>
          <span className="anatomy__layer anatomy__layer--light" data-layer="light" />
        </div>
      </div>

      <div className="anatomy__legend">
        <ol className="anatomy__list">
          {layers.map((layer, index) => (
            <li
              key={layer.id}
              className="anatomy__item"
              data-active={active === layer.id ? "true" : undefined}
              onPointerEnter={() => setActive(layer.id)}
              onPointerLeave={() => setActive(null)}
            >
              <span className="anatomy__index" aria-hidden="true">
                {String(layers.length - index).padStart(2, "0")}
              </span>
              <div>
                <h3 className="anatomy__name">{layer.name}</h3>
                <p>{layer.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="anatomy__controls">
          <LayeredSwitch
            label="Exploded view"
            tone="copper"
            switchSize="small"
            checked={exploded}
            onChange={(event) => setExploded(event.target.checked)}
          />
          <span className="anatomy__try">
            Assembled, it's this:
            <LayeredButton size="small">Engage</LayeredButton>
          </span>
        </div>
      </div>
    </div>
  );
}
