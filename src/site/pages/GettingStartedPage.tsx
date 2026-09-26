import { CodeBlock } from "../components/CodeBlock";
import { DocsLayout } from "../components/DocsLayout";
import { InstallCommand } from "../components/InstallCommand";
import { Link } from "../Link";

const tsconfigRoot = `{
  "files": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`;

const viteConfig = `import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});`;

const componentsJson = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`;

const mainTsx = `import "@/styles/layered-ui/tokens.css";

document.documentElement.dataset.theme = "classic"; // or "field"`;

const usage = `import { LayeredButton } from "@/components/ui/layered/LayeredButton";
import { LayeredPanel } from "@/components/ui/layered/LayeredPanel";

export function Launch() {
  return (
    <LayeredPanel eyebrow="Stage 1" title="Launch control">
      <LayeredButton tone="green">Engage</LayeredButton>
    </LayeredPanel>
  );
}`;

export function GettingStartedPage() {
  return (
    <DocsLayout>
      <article className="prose-page">
        <header className="page-head">
          <p className="eyebrow">Guide</p>
          <h1>Getting started</h1>
          <p className="page-head__lede">
            Layered UI isn't an npm package. The shadcn CLI copies each component's source and
            stylesheet into your project, so you can read and change everything you install.
          </p>
        </header>

        <section className="doc-section" aria-labelledby="requirements">
          <h2 id="requirements">Requirements</h2>
          <ul className="check-list">
            <li>React 19 and TypeScript.</li>
            <li>A bundler that handles CSS imports from components. The examples use Vite.</li>
            <li>No Tailwind. The CLI's config schema asks for Tailwind keys, but nothing is installed.</li>
          </ul>
        </section>

        <section className="doc-section" aria-labelledby="step-alias">
          <h2 id="step-alias">
            <span className="step-num">1</span> Add the @ path alias
          </h2>
          <p>
            Components are written to your <code>ui</code> alias. The shadcn CLI reads{" "}
            <code>paths</code> from the <strong>root</strong> <code>tsconfig.json</code> only; it
            doesn't follow project references. In a Vite project, put the alias in the root file as
            well as in <code>tsconfig.app.json</code>.
          </p>
          <CodeBlock code={tsconfigRoot} language="json" label="tsconfig.json" />
          <p>Mirror it for the bundler:</p>
          <CodeBlock code={viteConfig} label="vite.config.ts" />
        </section>

        <section className="doc-section" aria-labelledby="step-config">
          <h2 id="step-config">
            <span className="step-num">2</span> Create components.json
          </h2>
          <p>
            Write this file by hand. <code>shadcn init</code> fails without a real Tailwind setup,
            and <code>shadcn add</code> needs the full schema. The Tailwind values below only satisfy
            validation.
          </p>
          <CodeBlock code={componentsJson} language="json" label="components.json" />
        </section>

        <section className="doc-section" aria-labelledby="step-add">
          <h2 id="step-add">
            <span className="step-num">3</span> Add components
          </h2>
          <p>
            Name items with their full GitHub registry address. The first install also brings in{" "}
            <code>layered-foundation</code>, the shared token sheet.
          </p>
          <InstallCommand items={["layered-button", "layered-panel"]} />
          <div className="file-map">
            <p className="file-map__title">Where files land</p>
            <ul>
              <li>
                <code>src/components/ui/layered/LayeredButton.tsx</code>
              </li>
              <li>
                <code>src/components/ui/layered/LayeredButton.css</code>
              </li>
              <li>
                <code>src/styles/layered-ui/tokens.css</code>
              </li>
            </ul>
          </div>
        </section>

        <section className="doc-section" aria-labelledby="step-tokens">
          <h2 id="step-tokens">
            <span className="step-num">4</span> Load the tokens and pick a theme
          </h2>
          <p>
            Each component imports its own stylesheet. The tokens load once at your entry point.
            Themes are chosen with <code>data-theme</code> on the root element or on any container.
          </p>
          <CodeBlock code={mainTsx} label="src/main.tsx" />
        </section>

        <section className="doc-section" aria-labelledby="step-use">
          <h2 id="step-use">
            <span className="step-num">5</span> Use them
          </h2>
          <CodeBlock code={usage} label="Launch.tsx" />
          <p>
            Next, read about <Link to="/docs/theming">theming and tokens</Link> or browse the{" "}
            <Link to="/components">components</Link>.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="status">
          <h2 id="status">Project status</h2>
          <p>
            Layered UI is in early development. Every component listed here is implemented and
            published to the registry, but APIs may still change between versions. It targets
            current evergreen browsers and makes no claim of formal accessibility certification.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
}
