import { useState } from "react";
import { LayeredNumberField } from "../../../../registry/components/layered-number-field/LayeredNumberField";

export default function NumberFieldControlled() {
  const [limit, setLimit] = useState<number | "">(40);

  return (
    <LayeredNumberField
      label="Request limit"
      tone="copper"
      value={limit}
      min={0}
      max={200}
      step={10}
      description={`${limit || 0} requests per minute`}
      onChange={(event) =>
        setLimit(event.target.value === "" ? "" : event.target.valueAsNumber)
      }
    />
  );
}
