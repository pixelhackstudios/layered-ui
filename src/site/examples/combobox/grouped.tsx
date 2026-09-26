import {
  LayeredCombobox,
  LayeredComboboxContent,
  LayeredComboboxEmpty,
  LayeredComboboxGroup,
  LayeredComboboxGroupLabel,
  LayeredComboboxIcon,
  LayeredComboboxInput,
  LayeredComboboxInputGroup,
  LayeredComboboxItem,
  LayeredComboboxLabel,
  LayeredComboboxList,
} from "../../../../registry/components/layered-combobox/LayeredCombobox";

export default function ComboboxGrouped() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <LayeredCombobox defaultValue="Toronto">
        <LayeredComboboxLabel>Relay site</LayeredComboboxLabel>
        <LayeredComboboxInputGroup tone="copper">
          <LayeredComboboxInput placeholder="Search sites…" />
          <LayeredComboboxIcon />
        </LayeredComboboxInputGroup>
        <LayeredComboboxContent tone="copper">
          <LayeredComboboxEmpty>No sites match.</LayeredComboboxEmpty>
          <LayeredComboboxList>
            <LayeredComboboxGroup>
              <LayeredComboboxGroupLabel>North America</LayeredComboboxGroupLabel>
              <LayeredComboboxItem value="Toronto">Toronto</LayeredComboboxItem>
              <LayeredComboboxItem value="Seattle">Seattle</LayeredComboboxItem>
            </LayeredComboboxGroup>
            <LayeredComboboxGroup>
              <LayeredComboboxGroupLabel>Europe</LayeredComboboxGroupLabel>
              <LayeredComboboxItem value="Frankfurt">Frankfurt</LayeredComboboxItem>
              <LayeredComboboxItem value="Dublin">Dublin</LayeredComboboxItem>
            </LayeredComboboxGroup>
          </LayeredComboboxList>
        </LayeredComboboxContent>
      </LayeredCombobox>
    </div>
  );
}
