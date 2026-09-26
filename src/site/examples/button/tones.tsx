import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";

export default function ButtonTones() {
  return (
    <>
      <LayeredButton tone="copper">Deploy</LayeredButton>
      <LayeredButton tone="green">Engage</LayeredButton>
      <LayeredButton tone="gold">Calibrate</LayeredButton>
      <LayeredButton tone="neutral">Cancel</LayeredButton>
    </>
  );
}
