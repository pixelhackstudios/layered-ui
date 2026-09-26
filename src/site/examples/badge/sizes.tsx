import { LayeredBadge } from "../../../../registry/components/layered-badge/LayeredBadge";

export default function BadgeSizes() {
  return (
    <>
      <LayeredBadge tone="copper">Small</LayeredBadge>
      <LayeredBadge tone="copper" badgeSize="medium">
        Medium
      </LayeredBadge>
    </>
  );
}
