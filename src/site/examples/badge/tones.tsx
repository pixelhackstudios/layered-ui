import { LayeredBadge } from "../../../../registry/components/layered-badge/LayeredBadge";

export default function BadgeTones() {
  return (
    <>
      <LayeredBadge tone="green">Ready</LayeredBadge>
      <LayeredBadge tone="copper">Active</LayeredBadge>
      <LayeredBadge tone="gold">Standby</LayeredBadge>
      <LayeredBadge tone="signal-red">Fault</LayeredBadge>
      <LayeredBadge>Build 8F42</LayeredBadge>
    </>
  );
}
