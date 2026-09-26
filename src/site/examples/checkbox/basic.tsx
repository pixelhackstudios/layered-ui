import { LayeredCheckbox } from "../../../../registry/components/layered-checkbox/LayeredCheckbox";

export default function CheckboxBasic() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <LayeredCheckbox
        label="Mirror logs to archive"
        description="Copies each rotated log to cold storage."
        defaultChecked
      />
      <LayeredCheckbox label="Page on-call for warnings" tone="gold" />
      <LayeredCheckbox label="Remote shutdown" description="Requires a hardware key." disabled />
    </div>
  );
}
