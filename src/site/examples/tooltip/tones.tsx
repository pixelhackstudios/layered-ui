import { LayeredBadge } from "../../../../registry/components/layered-badge/LayeredBadge";
import {
  LayeredTooltip,
  LayeredTooltipContent,
  LayeredTooltipProvider,
  LayeredTooltipTrigger,
} from "../../../../registry/components/layered-tooltip/LayeredTooltip";

const states = [
  { label: "Active", tone: "copper", note: "Serving 1,204 sessions" },
  { label: "Ready", tone: "green", note: "Health check passed 12 s ago" },
  { label: "Standby", tone: "gold", note: "Warm spare for EDGE-02" },
] as const;

export default function TooltipTones() {
  return (
    <LayeredTooltipProvider>
      {states.map((state) => (
        <LayeredTooltip key={state.label}>
          <LayeredTooltipTrigger asChild>
            <button type="button" className="site-bare-trigger">
              <LayeredBadge tone={state.tone} badgeSize="medium">
                {state.label}
              </LayeredBadge>
            </button>
          </LayeredTooltipTrigger>
          <LayeredTooltipContent tone={state.tone} size="medium">
            {state.note}
          </LayeredTooltipContent>
        </LayeredTooltip>
      ))}
    </LayeredTooltipProvider>
  );
}
