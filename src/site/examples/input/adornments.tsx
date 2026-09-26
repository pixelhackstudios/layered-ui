import { LayeredInput } from "../../../../registry/components/layered-input/LayeredInput";

export default function InputAdornments() {
  return (
    <>
      <LayeredInput label="Endpoint" leadingContent="https://" placeholder="relay.local:8080" />
      <LayeredInput
        label="Context window"
        tone="copper"
        trailingContent="tokens"
        defaultValue="128000"
        inputMode="numeric"
      />
    </>
  );
}
