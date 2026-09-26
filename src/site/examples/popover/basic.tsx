import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import { LayeredInput } from "../../../../registry/components/layered-input/LayeredInput";
import {
  LayeredPopover,
  LayeredPopoverClose,
  LayeredPopoverContent,
  LayeredPopoverTrigger,
} from "../../../../registry/components/layered-popover/LayeredPopover";
import { LayeredSwitch } from "../../../../registry/components/layered-switch/LayeredSwitch";

export default function PopoverBasic() {
  return (
    <LayeredPopover>
      <LayeredPopoverTrigger asChild>
        <LayeredButton tone="copper" size="small">
          Alert thresholds
        </LayeredButton>
      </LayeredPopoverTrigger>
      <LayeredPopoverContent tone="copper" popoverSize="medium" style={{ width: 280 }}>
        <div style={{ display: "grid", gap: 14 }}>
          <LayeredInput label="Warn above" trailingContent="°C" defaultValue="72" inputSize="small" fullWidth />
          <LayeredSwitch label="Page on-call" switchSize="small" defaultChecked />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LayeredPopoverClose asChild>
              <LayeredButton tone="copper" size="small">
                Apply
              </LayeredButton>
            </LayeredPopoverClose>
          </div>
        </div>
      </LayeredPopoverContent>
    </LayeredPopover>
  );
}
