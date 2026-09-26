import type { ReactNode } from "react";
import { categories, componentDocs } from "../content/components";
import { Link } from "../Link";

const guides = [
  { to: "/docs/getting-started", label: "Getting started" },
  { to: "/docs/theming", label: "Theming and tokens" },
  { to: "/docs/principles", label: "Principles" },
];

function SidebarLinks() {
  return (
    <>
      <p className="docs-nav__heading">Guides</p>
      <ul className="docs-nav__list">
        {guides.map((guide) => (
          <li key={guide.to}>
            <Link to={guide.to}>{guide.label}</Link>
          </li>
        ))}
      </ul>
      <p className="docs-nav__heading">
        <Link to="/components">Components</Link>
      </p>
      {categories.map((category) => (
        <div key={category.id} className="docs-nav__group">
          <p className="docs-nav__subheading">{category.id}</p>
          <ul className="docs-nav__list">
            {componentDocs
              .filter((doc) => doc.category === category.id)
              .map((doc) => (
                <li key={doc.slug}>
                  <Link to={`/components/${doc.slug}`}>{doc.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-layout">
      <nav className="docs-nav" aria-label="Documentation">
        <details className="docs-nav__drawer">
          <summary className="docs-nav__toggle">Browse documentation</summary>
          <div className="docs-nav__drawer-body">
            <SidebarLinks />
          </div>
        </details>
        <div className="docs-nav__rail">
          <SidebarLinks />
        </div>
      </nav>
      <div className="docs-layout__content">{children}</div>
    </div>
  );
}
