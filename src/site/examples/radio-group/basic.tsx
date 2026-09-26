import { useState } from "react";
import {
  LayeredRadioGroup,
  LayeredRadioGroupItem,
} from "../../../../registry/components/layered-radio-group/LayeredRadioGroup";

export default function RadioGroupBasic() {
  const [profile, setProfile] = useState("balanced");

  return (
    <LayeredRadioGroup
      tone="copper"
      value={profile}
      onValueChange={setProfile}
      aria-label="Power profile"
    >
      <LayeredRadioGroupItem value="quiet" label="Quiet" description="Fans capped at 40%." />
      <LayeredRadioGroupItem value="balanced" label="Balanced" description="Default thermal curve." />
      <LayeredRadioGroupItem value="burst" label="Burst" description="Full clocks for short jobs." />
    </LayeredRadioGroup>
  );
}
