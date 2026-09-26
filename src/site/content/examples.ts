import type { ComponentType } from "react";

/* Every example is loaded twice from the same file: once as a module to render
   live, once as raw text to show as source. What you see is what runs. */

const modules = import.meta.glob<{ default: ComponentType }>("../examples/*/*.tsx", {
  eager: true,
});

const sources = import.meta.glob<string>("../examples/*/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const key = (slug: string, id: string) => `../examples/${slug}/${id}.tsx`;

/* Examples import straight from registry/ in this repo; installed components
   live under the consumer's ui alias, so show that path instead. */
function toConsumerSource(source: string) {
  return source
    .replace(
      /from "(?:\.\.\/)+registry\/components\/layered-[a-z-]+\/(Layered[A-Za-z]+)"/g,
      'from "@/components/ui/layered/$1"'
    )
    .replace(/\{`\$\{import\.meta\.env\.BASE_URL\}(assets\/[^`]+)`\}/g, '"/$1"')
    .trimEnd();
}

export function getExample(slug: string, id: string) {
  const module = modules[key(slug, id)];
  const source = sources[key(slug, id)];
  if (!module || source === undefined) return null;
  return { Component: module.default, source: toConsumerSource(source) };
}
