import { LayeredProgress } from "../../../../registry/components/layered-progress/LayeredProgress";

const readings = [
  { label: "Disk", value: 24, tone: "neutral" },
  { label: "Memory", value: 48, tone: "copper" },
  { label: "Battery", value: 72, tone: "green" },
  { label: "Thermal", value: 91, tone: "gold" },
] as const;

export default function ProgressTones() {
  return (
    <div style={{ display: "grid", gap: 14, width: "min(100%, 420px)" }}>
      {readings.map((reading) => (
        <div key={reading.label} style={{ display: "grid", gap: 6 }}>
          <span id={`reading-${reading.label}`}>
            {reading.label} · {reading.value}%
          </span>
          <LayeredProgress
            value={reading.value}
            tone={reading.tone}
            aria-labelledby={`reading-${reading.label}`}
          />
        </div>
      ))}
    </div>
  );
}
