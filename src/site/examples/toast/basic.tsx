import { useState } from "react";
import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredToast,
  LayeredToastAction,
  LayeredToastClose,
  LayeredToastDescription,
  LayeredToastProvider,
  LayeredToastTitle,
  LayeredToastViewport,
} from "../../../../registry/components/layered-toast/LayeredToast";

export default function ToastBasic() {
  const [open, setOpen] = useState(false);

  return (
    <LayeredToastProvider swipeDirection="right">
      <LayeredButton tone="neutral" onClick={() => setOpen(true)}>
        Archive report
      </LayeredButton>
      <LayeredToast open={open} onOpenChange={setOpen}>
        <LayeredToastTitle>Report archived</LayeredToastTitle>
        <LayeredToastDescription>shift-0214.csv moved to cold storage.</LayeredToastDescription>
        <LayeredToastAction altText="Undo archiving shift-0214.csv">Undo</LayeredToastAction>
        <LayeredToastClose />
      </LayeredToast>
      <LayeredToastViewport position="bottom-right" />
    </LayeredToastProvider>
  );
}
