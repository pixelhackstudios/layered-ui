import { DocsLayout } from "../components/DocsLayout";
import { ExamplePreview } from "../components/ExamplePreview";
import { InstallCommand } from "../components/InstallCommand";
import { PropsTable } from "../components/PropsTable";
import { repoUrl } from "../components/SiteHeader";
import { componentDocs, type ComponentDoc } from "../content/components";
import { Link } from "../Link";

/* These stylesheets have no transforms or animations to reduce. */
const motionless = new Set(["badge", "table", "pagination"]);

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const index = componentDocs.indexOf(doc);
  const previous = componentDocs[index - 1];
  const next = componentDocs[index + 1];
  const registryName = `layered-${doc.slug}`;

  return (
    <DocsLayout>
      <article className="component-doc">
        <header className="page-head">
          <p className="eyebrow">
            <Link to="/components">Components</Link> <span aria-hidden="true">/</span> {doc.category}
          </p>
          <h1>{doc.name}</h1>
          <p className="page-head__lede">{doc.description}</p>
          <dl className="meta-plate">
            <div>
              <dt>Built on</dt>
              <dd>{doc.primitive}</dd>
            </div>
            <div>
              <dt>Registry item</dt>
              <dd>
                <code>{registryName}</code>
              </dd>
            </div>
            <div>
              <dt>npm dependency</dt>
              <dd>{doc.npm ? <code>{doc.npm}</code> : "None"}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                <a href={`${repoUrl}/tree/main/registry/components/${registryName}`} target="_blank" rel="noreferrer">
                  registry/components/{registryName}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <section className="doc-section" aria-labelledby="install">
          <h2 id="install">Install</h2>
          <p>
            Adds the component source and its stylesheet to your project, along with the foundation
            tokens{doc.npm ? ` and ${doc.npm.replace(/@[^@]+$/, "")}` : ""}. First time? Follow{" "}
            <Link to="/docs/getting-started">Getting started</Link>.
          </p>
          <InstallCommand items={[registryName]} />
        </section>

        <section className="doc-section" aria-labelledby="examples">
          <h2 id="examples">Examples</h2>
          {doc.examples.map((example) => (
            <ExamplePreview key={example.id} slug={doc.slug} example={example} />
          ))}
        </section>

        <section className="doc-section" aria-labelledby="api">
          <h2 id="api">API</h2>
          <p>
            Props Layered adds or constrains. Everything else is forwarded to the element or
            primitive each part is built on.
          </p>
          {doc.parts.map((part) => (
            <PropsTable key={part.name} part={part} />
          ))}
        </section>

        <section className="doc-section" aria-labelledby="a11y">
          <h2 id="a11y">Accessibility</h2>
          <ul className="check-list">
            {doc.accessibility.map((note) => (
              <li key={note}>{note}</li>
            ))}
            <li>
              {motionless.has(doc.slug)
                ? "No travel or animation; state changes are color only."
                : "Respects prefers-reduced-motion: travel is removed, state changes remain."}
            </li>
          </ul>
        </section>

        <nav className="pager" aria-label="Component pages">
          {previous ? (
            <Link to={`/components/${previous.slug}`} className="pager__link">
              <span>Previous</span>
              {previous.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/components/${next.slug}`} className="pager__link pager__link--next">
              <span>Next</span>
              {next.name}
            </Link>
          )}
        </nav>
      </article>
    </DocsLayout>
  );
}
