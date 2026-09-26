import type { ReactNode } from "react";
import { SpecimenPlate } from "../components/SpecimenPlate";
import { LayeredAccordion, LayeredAccordionItem, LayeredAccordionTrigger } from "../../../registry/components/layered-accordion/LayeredAccordion";
import { LayeredBadge } from "../../../registry/components/layered-badge/LayeredBadge";
import { LayeredButton } from "../../../registry/components/layered-button/LayeredButton";
import { LayeredCheckbox } from "../../../registry/components/layered-checkbox/LayeredCheckbox";
import { LayeredInput } from "../../../registry/components/layered-input/LayeredInput";
import { LayeredNumberField } from "../../../registry/components/layered-number-field/LayeredNumberField";
import {
  LayeredPagination,
  LayeredPaginationItem,
  LayeredPaginationLink,
  LayeredPaginationList,
} from "../../../registry/components/layered-pagination/LayeredPagination";
import { LayeredProgress } from "../../../registry/components/layered-progress/LayeredProgress";
import { LayeredRadioGroup, LayeredRadioGroupItem } from "../../../registry/components/layered-radio-group/LayeredRadioGroup";
import { LayeredSelect } from "../../../registry/components/layered-select/LayeredSelect";
import { LayeredSlider, LayeredSliderRange, LayeredSliderThumb, LayeredSliderTrack } from "../../../registry/components/layered-slider/LayeredSlider";
import { LayeredSwitch } from "../../../registry/components/layered-switch/LayeredSwitch";
import { LayeredTabs, LayeredTabsList, LayeredTabsTrigger } from "../../../registry/components/layered-tabs/LayeredTabs";
import { LayeredTextarea } from "../../../registry/components/layered-textarea/LayeredTextarea";

/* Miniature, non-interactive renders for index tiles. Tiles mark these inert,
   so they are decoration only: the tile link carries the name. */

export const specimens: Record<string, () => ReactNode> = {
  button: () => <LayeredButton size="small">Engage</LayeredButton>,
  "dropdown-menu": () => (
    <span className="specimen-menu">
      <span>Open console</span>
      <span data-highlighted="true">Run diagnostics</span>
      <span data-intent="destructive">Decommission</span>
    </span>
  ),
  input: () => <LayeredInput label="Call sign" inputSize="small" defaultValue="KESTREL-4" />,
  textarea: () => <LayeredTextarea label="Notes" textareaSize="small" rows={2} defaultValue="Relay stable." resize="none" />,
  select: () => (
    <LayeredSelect label="Region" selectSize="small">
      <option>Toronto</option>
    </LayeredSelect>
  ),
  combobox: () => <LayeredInput label="Model" inputSize="small" defaultValue="Kest" trailingContent="▾" />,
  "number-field": () => <LayeredNumberField label="Workers" numberFieldSize="small" defaultValue={6} />,
  checkbox: () => <LayeredCheckbox label="Mirror logs" defaultChecked checkboxSize="small" />,
  switch: () => <LayeredSwitch label="Armed" tone="green" defaultChecked />,
  "radio-group": () => (
    <LayeredRadioGroup defaultValue="b" radioGroupSize="small" tone="copper" aria-label="Profile">
      <LayeredRadioGroupItem value="a" label="Quiet" />
      <LayeredRadioGroupItem value="b" label="Balanced" />
    </LayeredRadioGroup>
  ),
  slider: () => (
    <span style={{ width: 150 }}>
      <LayeredSlider defaultValue={[64]} tone="copper" sliderSize="small">
        <LayeredSliderTrack>
          <LayeredSliderRange />
        </LayeredSliderTrack>
        <LayeredSliderThumb aria-label="Gain" />
      </LayeredSlider>
    </span>
  ),
  panel: () => (
    <span className="specimen-panel">
      <span>Cooling loop</span>
      <span>Inlet 21.4 °C</span>
    </span>
  ),
  "display-card": () => (
    <span className="specimen-screen">
      <img src={`${import.meta.env.BASE_URL}assets/model-ornith.svg`} alt="" />
    </span>
  ),
  badge: () => (
    <span className="specimen-row">
      <LayeredBadge tone="green">Ready</LayeredBadge>
      <LayeredBadge tone="signal-red">Fault</LayeredBadge>
    </span>
  ),
  progress: () => (
    <span style={{ width: 160 }}>
      <LayeredProgress value={64} tone="green" aria-label="Sample" />
    </span>
  ),
  table: () => (
    <span className="specimen-table">
      <span>EDGE-01</span><span>38%</span>
      <span>EDGE-02</span><span>71%</span>
      <span>RELAY-03</span><span>—</span>
    </span>
  ),
  tabs: () => (
    <LayeredTabs defaultValue="a" tabsSize="small">
      <LayeredTabsList aria-label="Sample">
        <LayeredTabsTrigger value="a">Live</LayeredTabsTrigger>
        <LayeredTabsTrigger value="b">Logs</LayeredTabsTrigger>
      </LayeredTabsList>
    </LayeredTabs>
  ),
  accordion: () => (
    <span style={{ width: 170 }}>
      <LayeredAccordion type="single" accordionSize="small">
        <LayeredAccordionItem value="a">
          <LayeredAccordionTrigger>Power</LayeredAccordionTrigger>
        </LayeredAccordionItem>
        <LayeredAccordionItem value="b">
          <LayeredAccordionTrigger>Cooling</LayeredAccordionTrigger>
        </LayeredAccordionItem>
      </LayeredAccordion>
    </span>
  ),
  pagination: () => (
    <LayeredPagination paginationSize="small" aria-label="Sample">
      <LayeredPaginationList>
        {[1, 2, 3].map((page) => (
          <LayeredPaginationItem key={page}>
            <LayeredPaginationLink isCurrent={page === 2}>{page}</LayeredPaginationLink>
          </LayeredPaginationItem>
        ))}
      </LayeredPaginationList>
    </LayeredPagination>
  ),
  dialog: () => (
    <SpecimenPlate>
      <strong>Restart relay?</strong>
      <span className="specimen-plate__actions">
        <LayeredButton size="small" tone="neutral">Cancel</LayeredButton>
      </span>
    </SpecimenPlate>
  ),
  popover: () => (
    <SpecimenPlate tone="copper">
      <strong>Warn above</strong>
      <span>72 °C</span>
    </SpecimenPlate>
  ),
  tooltip: () => (
    <span className="specimen-tooltip">Health check passed 12 s ago</span>
  ),
  toast: () => (
    <SpecimenPlate tone="green">
      <strong>Deploy complete</strong>
      <span>All nodes healthy.</span>
    </SpecimenPlate>
  ),
};
