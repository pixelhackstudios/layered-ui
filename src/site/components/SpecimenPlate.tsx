import type { ReactNode } from "react";

/* A static overlay stand-in for index tiles: a closed overlay has nothing to show. */
export function SpecimenPlate({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return (
    <span className="specimen-plate" data-tone={tone}>
      {children}
    </span>
  );
}
