import {
  LayeredTable,
  LayeredTableBody,
  LayeredTableCell,
  LayeredTableHead,
  LayeredTableHeader,
  LayeredTableRow,
} from "../../../registry/components/layered-table/LayeredTable";
import type { PartDoc } from "../content/components";

export function PropsTable({ part }: { part: PartDoc }) {
  return (
    <section className="part-doc" aria-labelledby={`part-${part.name}`}>
      <header className="part-doc__header">
        <h3 id={`part-${part.name}`} className="part-doc__name">
          <code>{part.name}</code>
        </h3>
        {part.extends && (
          <p className="part-doc__extends">
            <span>Forwards</span> <code>{part.extends}</code>
          </p>
        )}
      </header>
      {part.description && <p className="part-doc__description">{part.description}</p>}
      {part.props.length > 0 && (
        <LayeredTable density="small" className="props-table">
          <LayeredTableHeader>
            <LayeredTableRow>
              <LayeredTableHead scope="col">Prop</LayeredTableHead>
              <LayeredTableHead scope="col">Type</LayeredTableHead>
              <LayeredTableHead scope="col">Default</LayeredTableHead>
              <LayeredTableHead scope="col">Description</LayeredTableHead>
            </LayeredTableRow>
          </LayeredTableHeader>
          <LayeredTableBody>
            {part.props.map((prop) => (
              <LayeredTableRow key={prop.name}>
                <LayeredTableHead scope="row">
                  <code className="props-table__name">
                    {prop.name}
                    {prop.required && <span className="props-table__required" title="Required">*</span>}
                  </code>
                </LayeredTableHead>
                <LayeredTableCell>
                  <code className="props-table__type">{prop.type}</code>
                </LayeredTableCell>
                <LayeredTableCell>
                  {prop.default ? <code>{prop.default}</code> : <span aria-label="None">—</span>}
                </LayeredTableCell>
                <LayeredTableCell>{prop.description}</LayeredTableCell>
              </LayeredTableRow>
            ))}
          </LayeredTableBody>
        </LayeredTable>
      )}
    </section>
  );
}
