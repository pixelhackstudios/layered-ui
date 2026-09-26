import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredDropdownMenu,
  LayeredDropdownMenuContent,
  LayeredDropdownMenuItem,
  LayeredDropdownMenuSeparator,
  LayeredDropdownMenuTrigger,
} from "../../../../registry/components/layered-dropdown-menu/LayeredDropdownMenu";

export default function DropdownMenuBasic() {
  return (
    <LayeredDropdownMenu>
      <LayeredDropdownMenuTrigger asChild>
        <LayeredButton tone="neutral" size="small">
          Node actions
        </LayeredButton>
      </LayeredDropdownMenuTrigger>
      <LayeredDropdownMenuContent>
        <LayeredDropdownMenuItem>Open console</LayeredDropdownMenuItem>
        <LayeredDropdownMenuItem>Run diagnostics</LayeredDropdownMenuItem>
        <LayeredDropdownMenuItem disabled>Migrate workloads</LayeredDropdownMenuItem>
        <LayeredDropdownMenuSeparator />
        <LayeredDropdownMenuItem intent="destructive">
          Decommission
        </LayeredDropdownMenuItem>
      </LayeredDropdownMenuContent>
    </LayeredDropdownMenu>
  );
}
