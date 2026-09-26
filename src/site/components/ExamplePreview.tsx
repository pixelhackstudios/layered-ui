import {
  LayeredTabs,
  LayeredTabsContent,
  LayeredTabsList,
  LayeredTabsTrigger,
} from "../../../registry/components/layered-tabs/LayeredTabs";
import type { ExampleDoc } from "../content/components";
import { getExample } from "../content/examples";
import { CodeBlock } from "./CodeBlock";

export function ExamplePreview({ slug, example }: { slug: string; example: ExampleDoc }) {
  const loaded = getExample(slug, example.id);
  if (!loaded) return null;
  const { Component, source } = loaded;
  const headingId = `example-${slug}-${example.id}`;

  return (
    <section className="example" aria-labelledby={headingId}>
      <header className="example__header">
        <h3 id={headingId} className="example__title">
          {example.title}
        </h3>
        {example.description && <p className="example__description">{example.description}</p>}
      </header>
      <LayeredTabs defaultValue="preview" tone="copper" tabsSize="small" className="example__tabs">
        <LayeredTabsList aria-label={`${example.title}: view`}>
          <LayeredTabsTrigger value="preview">Preview</LayeredTabsTrigger>
          <LayeredTabsTrigger value="code">Code</LayeredTabsTrigger>
        </LayeredTabsList>
        <LayeredTabsContent value="preview">
          <div className="example__stage">
            <Component />
          </div>
        </LayeredTabsContent>
        <LayeredTabsContent value="code" surface="plain">
          <CodeBlock code={source} label={`${example.id}.tsx`} />
        </LayeredTabsContent>
      </LayeredTabs>
    </section>
  );
}
