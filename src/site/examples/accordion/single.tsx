import {
  LayeredAccordion,
  LayeredAccordionContent,
  LayeredAccordionItem,
  LayeredAccordionTrigger,
} from "../../../../registry/components/layered-accordion/LayeredAccordion";

export default function AccordionSingle() {
  return (
    <LayeredAccordion type="single" collapsible defaultValue="power" style={{ width: "min(100%, 460px)" }}>
      <LayeredAccordionItem value="power">
        <LayeredAccordionTrigger>Power</LayeredAccordionTrigger>
        <LayeredAccordionContent>92% capacity, nominal draw on both feeds.</LayeredAccordionContent>
      </LayeredAccordionItem>
      <LayeredAccordionItem value="cooling">
        <LayeredAccordionTrigger>Cooling</LayeredAccordionTrigger>
        <LayeredAccordionContent>Loop pressure stable. Filter change due in 11 days.</LayeredAccordionContent>
      </LayeredAccordionItem>
      <LayeredAccordionItem value="network">
        <LayeredAccordionTrigger>Network</LayeredAccordionTrigger>
        <LayeredAccordionContent>Both uplinks active. 0.02% packet loss.</LayeredAccordionContent>
      </LayeredAccordionItem>
    </LayeredAccordion>
  );
}
