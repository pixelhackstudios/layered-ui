import { useState } from "react";
import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredToast,
  LayeredToastClose,
  LayeredToastDescription,
  LayeredToastProvider,
  LayeredToastTitle,
  LayeredToastViewport,
} from "../../../../registry/components/layered-toast/LayeredToast";

const messages = {
  copper: { title: "Deploy started", body: "Rolling out build 8F42 to 6 nodes." },
  green: { title: "Deploy complete", body: "All nodes healthy." },
  gold: { title: "Capacity warning", body: "EDGE-02 above 70% load." },
} as const;

type Tone = keyof typeof messages;

export default function ToastTones() {
  const [open, setOpen] = useState<Tone | null>(null);

  return (
    <LayeredToastProvider swipeDirection="right">
      {(Object.keys(messages) as Tone[]).map((tone) => (
        <LayeredButton key={tone} tone={tone} size="small" onClick={() => setOpen(tone)}>
          {messages[tone].title}
        </LayeredButton>
      ))}
      {(Object.keys(messages) as Tone[]).map((tone) => (
        <LayeredToast
          key={tone}
          tone={tone}
          open={open === tone}
          onOpenChange={(next) => setOpen(next ? tone : null)}
        >
          <LayeredToastTitle>{messages[tone].title}</LayeredToastTitle>
          <LayeredToastDescription>{messages[tone].body}</LayeredToastDescription>
          <LayeredToastClose />
        </LayeredToast>
      ))}
      <LayeredToastViewport position="bottom-right" />
    </LayeredToastProvider>
  );
}
