import { LayeredNumberField } from "../../../../registry/components/layered-number-field/LayeredNumberField";

export default function NumberFieldBasic() {
  return (
    <>
      <LayeredNumberField
        label="Worker count"
        defaultValue={6}
        min={1}
        max={24}
        description="Between 1 and 24."
      />
      <LayeredNumberField
        label="Gain offset"
        tone="green"
        defaultValue={0.5}
        min={-2}
        max={2}
        step={0.1}
        description="Steps by 0.1."
      />
    </>
  );
}
