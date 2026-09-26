import { LayeredSelect } from "../../../../registry/components/layered-select/LayeredSelect";

export default function SelectSizes() {
  return (
    <>
      <LayeredSelect label="Small" selectSize="small" tone="green">
        <option>Nominal</option>
        <option>Elevated</option>
      </LayeredSelect>
      <LayeredSelect label="Large" selectSize="large" tone="gold">
        <option>Priority 1</option>
        <option>Priority 2</option>
      </LayeredSelect>
      <LayeredSelect label="Disabled" disabled>
        <option>Locked</option>
      </LayeredSelect>
    </>
  );
}
