import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredDropdownMenu,
  LayeredDropdownMenuContent,
  LayeredDropdownMenuItem,
  LayeredDropdownMenuSub,
  LayeredDropdownMenuSubContent,
  LayeredDropdownMenuSubTrigger,
  LayeredDropdownMenuTrigger,
} from "../../../../registry/components/layered-dropdown-menu/LayeredDropdownMenu";

export default function DropdownMenuSubmenu() {
  return (
    <LayeredDropdownMenu>
      <LayeredDropdownMenuTrigger asChild>
        <LayeredButton tone="green" size="small">
          Report
        </LayeredButton>
      </LayeredDropdownMenuTrigger>
      <LayeredDropdownMenuContent tone="green">
        <LayeredDropdownMenuItem>Preview</LayeredDropdownMenuItem>
        <LayeredDropdownMenuSub>
          <LayeredDropdownMenuSubTrigger>Export as</LayeredDropdownMenuSubTrigger>
          <LayeredDropdownMenuSubContent tone="green">
            <LayeredDropdownMenuItem>CSV</LayeredDropdownMenuItem>
            <LayeredDropdownMenuItem>JSON</LayeredDropdownMenuItem>
            <LayeredDropdownMenuItem>PDF</LayeredDropdownMenuItem>
          </LayeredDropdownMenuSubContent>
        </LayeredDropdownMenuSub>
      </LayeredDropdownMenuContent>
    </LayeredDropdownMenu>
  );
}
