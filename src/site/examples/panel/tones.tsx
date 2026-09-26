import { LayeredPanel } from "../../../../registry/components/layered-panel/LayeredPanel";

export default function PanelTones() {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", width: "100%" }}>
      <LayeredPanel title="Copper" tone="copper" padding="small">Active circuit</LayeredPanel>
      <LayeredPanel title="Green" tone="green" padding="small">Nominal</LayeredPanel>
      <LayeredPanel title="Gold" tone="gold" padding="small">Standby</LayeredPanel>
    </div>
  );
}
