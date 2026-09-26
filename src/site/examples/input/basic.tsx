import { LayeredInput } from "../../../../registry/components/layered-input/LayeredInput";

export default function InputBasic() {
  return (
    <LayeredInput
      label="Station call sign"
      description="Shown on every transmission log."
      placeholder="e.g. KESTREL-4"
    />
  );
}
