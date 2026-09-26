import { useState } from "react";
import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredDropdownMenu,
  LayeredDropdownMenuCheckboxItem,
  LayeredDropdownMenuContent,
  LayeredDropdownMenuLabel,
  LayeredDropdownMenuRadioGroup,
  LayeredDropdownMenuRadioItem,
  LayeredDropdownMenuSeparator,
  LayeredDropdownMenuTrigger,
} from "../../../../registry/components/layered-dropdown-menu/LayeredDropdownMenu";

export default function DropdownMenuCheckable() {
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [rate, setRate] = useState("1s");

  return (
    <LayeredDropdownMenu>
      <LayeredDropdownMenuTrigger asChild>
        <LayeredButton tone="copper" size="small">
          Display options
        </LayeredButton>
      </LayeredDropdownMenuTrigger>
      <LayeredDropdownMenuContent tone="copper">
        <LayeredDropdownMenuLabel>Overlay</LayeredDropdownMenuLabel>
        <LayeredDropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Grid
        </LayeredDropdownMenuCheckboxItem>
        <LayeredDropdownMenuCheckboxItem checked={showLabels} onCheckedChange={setShowLabels}>
          Axis labels
        </LayeredDropdownMenuCheckboxItem>
        <LayeredDropdownMenuSeparator />
        <LayeredDropdownMenuLabel>Refresh rate</LayeredDropdownMenuLabel>
        <LayeredDropdownMenuRadioGroup value={rate} onValueChange={setRate}>
          <LayeredDropdownMenuRadioItem value="250ms">250 ms</LayeredDropdownMenuRadioItem>
          <LayeredDropdownMenuRadioItem value="1s">1 s</LayeredDropdownMenuRadioItem>
          <LayeredDropdownMenuRadioItem value="5s">5 s</LayeredDropdownMenuRadioItem>
        </LayeredDropdownMenuRadioGroup>
      </LayeredDropdownMenuContent>
    </LayeredDropdownMenu>
  );
}
