import { useState } from "react";
import { LayeredCheckbox } from "../../../../registry/components/layered-checkbox/LayeredCheckbox";

const channels = ["Telemetry", "Audit trail", "Crash reports"];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = useState(["Telemetry"]);
  const all = selected.length === channels.length;
  const some = selected.length > 0 && !all;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <LayeredCheckbox
        label="All channels"
        tone="green"
        checked={all}
        indeterminate={some}
        onChange={() => setSelected(all ? [] : channels)}
      />
      <div style={{ display: "grid", gap: 10, paddingInlineStart: 28 }}>
        {channels.map((channel) => (
          <LayeredCheckbox
            key={channel}
            label={channel}
            tone="green"
            checkboxSize="small"
            checked={selected.includes(channel)}
            onChange={(event) =>
              setSelected((current) =>
                event.target.checked
                  ? [...current, channel]
                  : current.filter((item) => item !== channel)
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
