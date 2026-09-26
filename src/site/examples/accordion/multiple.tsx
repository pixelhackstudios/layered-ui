import {
  LayeredAccordion,
  LayeredAccordionContent,
  LayeredAccordionItem,
  LayeredAccordionTrigger,
} from "../../../../registry/components/layered-accordion/LayeredAccordion";

export default function AccordionMultiple() {
  return (
    <LayeredAccordion
      type="multiple"
      tone="gold"
      defaultValue={["checklist"]}
      style={{ width: "min(100%, 460px)" }}
    >
      <LayeredAccordionItem value="checklist">
        <LayeredAccordionTrigger>Pre-flight checklist</LayeredAccordionTrigger>
        <LayeredAccordionContent>Verify seals, prime the pump, confirm telemetry.</LayeredAccordionContent>
      </LayeredAccordionItem>
      <LayeredAccordionItem value="rollback">
        <LayeredAccordionTrigger>Rollback plan</LayeredAccordionTrigger>
        <LayeredAccordionContent>Restore the last snapshot and re-run the migration dry.</LayeredAccordionContent>
      </LayeredAccordionItem>
    </LayeredAccordion>
  );
}
