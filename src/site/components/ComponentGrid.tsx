import type { ComponentDoc } from "../content/components";
import { specimens } from "../content/specimens";
import { Link } from "../Link";

export function ComponentGrid({ docs }: { docs: ComponentDoc[] }) {
  return (
    <ul className="component-grid">
      {docs.map((doc) => {
        const Specimen = specimens[doc.slug];
        return (
          <li key={doc.slug} className="component-tile">
            <div className="component-tile__bay" inert aria-hidden="true">
              {Specimen && <Specimen />}
            </div>
            <div className="component-tile__label">
              <Link to={`/components/${doc.slug}`} className="component-tile__link">
                {doc.name}
              </Link>
              <p>{doc.summary}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
