import { LayeredBadge } from "../../../../registry/components/layered-badge/LayeredBadge";
import {
  LayeredTable,
  LayeredTableBody,
  LayeredTableCaption,
  LayeredTableCell,
  LayeredTableHead,
  LayeredTableHeader,
  LayeredTableRow,
} from "../../../../registry/components/layered-table/LayeredTable";

const nodes = [
  { node: "EDGE-01", status: "Ready", tone: "green", load: "38%", latency: "12 ms" },
  { node: "EDGE-02", status: "Active", tone: "copper", load: "71%", latency: "18 ms" },
  { node: "WORKER-07", status: "Standby", tone: "gold", load: "8%", latency: "31 ms" },
  { node: "RELAY-03", status: "Fault", tone: "signal-red", load: "—", latency: "Timeout" },
] as const;

export default function TableBasic() {
  return (
    <div style={{ width: "100%" }}>
      <LayeredTable tone="green">
        <LayeredTableCaption>Readings captured at cycle 08F4</LayeredTableCaption>
        <LayeredTableHeader>
          <LayeredTableRow>
            <LayeredTableHead scope="col">Node</LayeredTableHead>
            <LayeredTableHead scope="col">Status</LayeredTableHead>
            <LayeredTableHead scope="col" style={{ textAlign: "right" }}>Load</LayeredTableHead>
            <LayeredTableHead scope="col" style={{ textAlign: "right" }}>Latency</LayeredTableHead>
          </LayeredTableRow>
        </LayeredTableHeader>
        <LayeredTableBody>
          {nodes.map((row) => (
            <LayeredTableRow key={row.node}>
              <LayeredTableHead scope="row">{row.node}</LayeredTableHead>
              <LayeredTableCell>
                <LayeredBadge tone={row.tone}>{row.status}</LayeredBadge>
              </LayeredTableCell>
              <LayeredTableCell style={{ textAlign: "right" }}>{row.load}</LayeredTableCell>
              <LayeredTableCell style={{ textAlign: "right" }}>{row.latency}</LayeredTableCell>
            </LayeredTableRow>
          ))}
        </LayeredTableBody>
      </LayeredTable>
    </div>
  );
}
