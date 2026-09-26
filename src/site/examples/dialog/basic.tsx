import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredDialog,
  LayeredDialogClose,
  LayeredDialogContent,
  LayeredDialogDescription,
  LayeredDialogFooter,
  LayeredDialogHeader,
  LayeredDialogTitle,
  LayeredDialogTrigger,
} from "../../../../registry/components/layered-dialog/LayeredDialog";

export default function DialogBasic() {
  return (
    <LayeredDialog>
      <LayeredDialogTrigger asChild>
        <LayeredButton tone="copper">Restart relay</LayeredButton>
      </LayeredDialogTrigger>
      <LayeredDialogContent size="small">
        <LayeredDialogHeader>
          <LayeredDialogTitle>Restart RELAY-03?</LayeredDialogTitle>
          <LayeredDialogDescription>
            Open sessions on this relay will reconnect through EDGE-01.
          </LayeredDialogDescription>
        </LayeredDialogHeader>
        <LayeredDialogFooter>
          <LayeredDialogClose asChild>
            <LayeredButton tone="neutral" size="small">
              Cancel
            </LayeredButton>
          </LayeredDialogClose>
          <LayeredDialogClose asChild>
            <LayeredButton tone="copper" size="small">
              Restart
            </LayeredButton>
          </LayeredDialogClose>
        </LayeredDialogFooter>
      </LayeredDialogContent>
    </LayeredDialog>
  );
}
