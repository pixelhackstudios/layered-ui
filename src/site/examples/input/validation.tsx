import { useState } from "react";
import { LayeredInput } from "../../../../registry/components/layered-input/LayeredInput";

export default function InputValidation() {
  const [value, setValue] = useState("relay 03");
  const invalid = /\s/.test(value);

  return (
    <LayeredInput
      label="Node identifier"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      description="Letters, numbers, and dashes."
      error={invalid ? "Identifiers can't contain spaces." : undefined}
    />
  );
}
