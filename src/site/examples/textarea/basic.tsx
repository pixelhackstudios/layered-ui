import { LayeredTextarea } from "../../../../registry/components/layered-textarea/LayeredTextarea";

export default function TextareaBasic() {
  return (
    <LayeredTextarea
      label="Shift notes"
      description="Handed to the next operator at changeover."
      rows={4}
      placeholder="Relay 03 dropped twice after 02:00…"
    />
  );
}
