import { useState } from "react";
import { LayeredSwitch } from "../../../../registry/components/layered-switch/LayeredSwitch";

export default function SwitchBasic() {
  const [armed, setArmed] = useState(false);

  return (
    <LayeredSwitch
      label="Arm auto-failover"
      description={armed ? "Traffic reroutes on first fault." : "Manual failover only."}
      checked={armed}
      onChange={(event) => setArmed(event.target.checked)}
    />
  );
}
