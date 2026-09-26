import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";

export default function ButtonStates() {
  return (
    <div style={{ display: "grid", gap: 16, width: "min(100%, 320px)" }}>
      <LayeredButton tone="neutral" disabled>
        Awaiting signal
      </LayeredButton>
      <LayeredButton tone="green" fullWidth>
        Start sequence
      </LayeredButton>
    </div>
  );
}
