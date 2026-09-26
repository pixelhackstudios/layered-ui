import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import {
  LayeredTooltip,
  LayeredTooltipContent,
  LayeredTooltipProvider,
  LayeredTooltipTrigger,
} from "../../../../registry/components/layered-tooltip/LayeredTooltip";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipBasic() {
  return (
    <LayeredTooltipProvider>
      {sides.map((side) => (
        <LayeredTooltip key={side}>
          <LayeredTooltipTrigger asChild>
            <LayeredButton tone="neutral" size="small">
              {side}
            </LayeredButton>
          </LayeredTooltipTrigger>
          <LayeredTooltipContent side={side}>Annotation on the {side}</LayeredTooltipContent>
        </LayeredTooltip>
      ))}
    </LayeredTooltipProvider>
  );
}
