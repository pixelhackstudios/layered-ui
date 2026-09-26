import { LayeredButton } from "../../../../registry/components/layered-button/LayeredButton";
import { LayeredDisplayCard } from "../../../../registry/components/layered-display-card/LayeredDisplayCard";

export default function DisplayCardBasic() {
  return (
    <div style={{ width: "min(100%, 340px)" }}>
      <LayeredDisplayCard
        eyebrow="Hardware"
        title="RTX local runtime"
        description="GPU-backed inference pipeline with custom kernels."
        metadata="24 GB VRAM"
        status="Online"
        tone="gold"
        imageSrc={`${import.meta.env.BASE_URL}assets/hardware-rtx.svg`}
        imageAlt="Diagram of the GPU runtime"
        footer={
          <LayeredButton tone="gold" size="small">
            Initialize
          </LayeredButton>
        }
      />
    </div>
  );
}
