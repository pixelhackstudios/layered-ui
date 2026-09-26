import { useState } from "react";
import {
  LayeredCombobox,
  LayeredComboboxClear,
  LayeredComboboxContent,
  LayeredComboboxEmpty,
  LayeredComboboxIcon,
  LayeredComboboxInput,
  LayeredComboboxInputGroup,
  LayeredComboboxItem,
  LayeredComboboxLabel,
  LayeredComboboxList,
} from "../../../../registry/components/layered-combobox/LayeredCombobox";

const models = ["Ornith 9B", "Kestrel 14B", "Harrier 32B", "Merlin 70B", "Osprey 405B"];

export default function ComboboxBasic() {
  const [model, setModel] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <LayeredCombobox items={models} value={model} onValueChange={setModel}>
        <LayeredComboboxLabel>Model</LayeredComboboxLabel>
        <LayeredComboboxInputGroup>
          <LayeredComboboxInput placeholder="Search models…" />
          <LayeredComboboxClear />
          <LayeredComboboxIcon />
        </LayeredComboboxInputGroup>
        <LayeredComboboxContent>
          <LayeredComboboxEmpty>No models match.</LayeredComboboxEmpty>
          <LayeredComboboxList>
            {(item: string) => (
              <LayeredComboboxItem key={item} value={item}>
                {item}
              </LayeredComboboxItem>
            )}
          </LayeredComboboxList>
        </LayeredComboboxContent>
      </LayeredCombobox>
    </div>
  );
}
