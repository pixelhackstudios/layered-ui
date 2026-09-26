import { LayeredSwitch } from "../../../../registry/components/layered-switch/LayeredSwitch";

export default function SwitchTones() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <LayeredSwitch label="Copper, small" tone="copper" switchSize="small" defaultChecked />
      <LayeredSwitch label="Green, medium" tone="green" defaultChecked />
      <LayeredSwitch label="Gold, large" tone="gold" switchSize="large" defaultChecked />
      <LayeredSwitch label="Disabled" disabled />
    </div>
  );
}
