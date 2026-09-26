import { ComponentGrid } from "../components/ComponentGrid";
import { DocsLayout } from "../components/DocsLayout";
import { categories, componentDocs } from "../content/components";

export function ComponentsPage() {
  return (
    <DocsLayout>
      <header className="page-head">
        <p className="eyebrow">Catalog</p>
        <h1>Components</h1>
        <p className="page-head__lede">
          {componentDocs.length} components, each installable on its own. Every one depends on the
          shared foundation tokens; overlays and complex selectors also bring one pinned behavioral
          primitive from Radix or Base UI.
        </p>
      </header>
      {categories.map((category) => (
        <section key={category.id} className="catalog-group" aria-labelledby={`cat-${category.id}`}>
          <header className="catalog-group__head">
            <h2 id={`cat-${category.id}`}>{category.id}</h2>
            <p>{category.summary}</p>
          </header>
          <ComponentGrid docs={componentDocs.filter((doc) => doc.category === category.id)} />
        </section>
      ))}
    </DocsLayout>
  );
}
