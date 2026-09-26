import { LayeredTextarea } from "../../../../registry/components/layered-textarea/LayeredTextarea";

export default function TextareaValidation() {
  return (
    <LayeredTextarea
      label="Incident summary"
      tone="gold"
      resize="none"
      rows={3}
      required
      defaultValue=""
      error="A summary is required before closing the incident."
    />
  );
}
