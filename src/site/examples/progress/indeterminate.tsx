import { LayeredProgress } from "../../../../registry/components/layered-progress/LayeredProgress";

export default function ProgressIndeterminate() {
  return (
    <div style={{ display: "grid", gap: 14, width: "min(100%, 420px)" }}>
      <LayeredProgress tone="copper" aria-label="Scanning sectors" />
      <LayeredProgress tone="green" progressSize="small" aria-label="Syncing" />
    </div>
  );
}
