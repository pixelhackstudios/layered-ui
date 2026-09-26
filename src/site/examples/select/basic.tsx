import { LayeredSelect } from "../../../../registry/components/layered-select/LayeredSelect";

export default function SelectBasic() {
  return (
    <LayeredSelect label="Region" defaultValue="yyz" description="Where new workers are scheduled.">
      <optgroup label="North America">
        <option value="yyz">Toronto</option>
        <option value="sea">Seattle</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="fra">Frankfurt</option>
        <option value="dub">Dublin</option>
      </optgroup>
    </LayeredSelect>
  );
}
