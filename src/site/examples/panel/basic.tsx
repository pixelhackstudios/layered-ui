import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import { LayeredPanel } from "../../../../registry/components/layered-panel/LayeredPanel";

export default function PanelBasic() {
  return (
    <LayeredPanel
      eyebrow="Rack 2 · Bay 4"
      title="Cooling loop"
      footer={
        <LayeredButton tone="neutral" size="small">
          View history
        </LayeredButton>
      }
    >
      <p style={{ margin: 0 }}>
        Inlet 21.4 °C, outlet 29.8 °C. Pump running at 64% duty.
      </p>
    </LayeredPanel>
  );
}
