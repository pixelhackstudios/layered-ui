import { useState, type FormEvent } from "react";
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
import { LayeredInput } from "../../../../registry/components/layered-input/LayeredInput";
import { LayeredTextarea } from "../../../../registry/components/layered-textarea/LayeredTextarea";

export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(String(data.get("profile") || "Untitled profile"));
    setOpen(false);
  };

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <LayeredDialog open={open} onOpenChange={setOpen}>
        <LayeredDialogTrigger asChild>
          <LayeredButton tone="green">New deployment profile</LayeredButton>
        </LayeredDialogTrigger>
        <LayeredDialogContent>
          <LayeredDialogHeader>
            <LayeredDialogTitle>New deployment profile</LayeredDialogTitle>
            <LayeredDialogDescription>
              A named configuration for repeatable rollouts.
            </LayeredDialogDescription>
          </LayeredDialogHeader>
          <form id="profile-form" onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <LayeredInput name="profile" label="Profile name" tone="green" placeholder="Production rollout" fullWidth />
            <LayeredTextarea name="notes" label="Notes" tone="green" rows={3} fullWidth />
          </form>
          <LayeredDialogFooter>
            <LayeredDialogClose asChild>
              <LayeredButton tone="neutral" size="small">
                Cancel
              </LayeredButton>
            </LayeredDialogClose>
            <LayeredButton type="submit" form="profile-form" tone="green" size="small">
              Save profile
            </LayeredButton>
          </LayeredDialogFooter>
        </LayeredDialogContent>
      </LayeredDialog>
      {saved && <output>Saved “{saved}”</output>}
    </div>
  );
}
