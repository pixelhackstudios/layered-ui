import { CodeBlock } from "../components/CodeBlock";
import { DocsLayout } from "../components/DocsLayout";
import { ThemeSelector } from "../components/ThemeSelector";

const tokenGroups = [
  {
    title: "Page surfaces",
    tokens: [
      ["--color-canvas", "Page background."],
      ["--color-canvas-deep", "Recessed page areas."],
      ["--color-text", "Body text."],
      ["--color-text-title", "Headings."],
      ["--color-text-muted", "Secondary text and labels."],
    ],
  },
  {
    title: "Casing and recess",
    tokens: [
      ["--control-shell-top", "Casing gradient, top edge."],
      ["--control-shell-bottom", "Casing gradient, bottom edge."],
      ["--control-shell-border", "Outer casing line."],
      ["--control-trench", "Trench channel around faces."],
      ["--input-surface-bg-top", "Recessed writing surfaces."],
      ["--panel-surface-bg-top", "Panel and overlay surfaces."],
    ],
  },
  {
    title: "Tones",
    tokens: [
      ["--tone-copper-light", "Copper face highlight."],
      ["--tone-green-light", "Green face highlight."],
      ["--tone-gold-light", "Gold face highlight."],
      ["--tone-neutral-light", "Neutral face highlight."],
      ["--control-focus", "Contained focus accent."],
      ["--control-error", "Invalid state accent."],
    ],
  },
] as const;

const shapeTokens = [
  ["--control-radius-outer", "12px", "Casing corner radius."],
  ["--control-radius-inner", "8px", "Face and surface radius."],
  ["--control-shell-depth", "4px", "Space between casing and face."],
  ["--duration-fast", "100ms", "Press and release."],
  ["--duration-normal", "160ms", "Hover and fades."],
  ["--layered-z-dialog-overlay", "1000", "Modal backdrop."],
  ["--layered-z-popover", "2000", "Popover, menu, combobox."],
  ["--layered-z-toast", "3000", "Toast viewport."],
  ["--layered-z-tooltip", "4000", "Tooltips, always on top."],
] as const;

const families = ["neutral", "copper", "green", "gold", "red"] as const;
const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

const customTheme = `/* Your own finish: override only what differs. */
[data-theme="night-shift"] {
  --color-canvas: #1d2226;
  --color-canvas-deep: #151a1d;
  --control-shell-top: #3b4650;
  --control-shell-bottom: #2c353d;

  --tone-copper-light: var(--palette-red-400);
  --tone-copper-mid: var(--palette-red-700);
  --tone-copper-dark: var(--palette-red-900);

  --control-focus: var(--palette-red-300);
}`;

const scoped = `<section data-theme="field">
  {/* Everything in here renders in Field Hardware,
      whatever the page theme is. */}
</section>`;

export function ThemingPage() {
  return (
    <DocsLayout>
      <article className="prose-page">
        <header className="page-head">
          <p className="eyebrow">Guide</p>
          <h1>Theming and tokens</h1>
          <p className="page-head__lede">
            Components read semantic custom properties, never raw colors. A theme is a set of values
            for those properties, applied with a <code>data-theme</code> attribute.
          </p>
        </header>

        <section className="doc-section" aria-labelledby="themes">
          <h2 id="themes">Built-in themes</h2>
          <p>
            <strong>Classic</strong> is an industrial dark finish: slate casings, copper faces,
            amber focus. <strong>Field Hardware</strong> reads like mid-century instruments: olive
            housings, brass, and canvas-toned text. Switch here and every swatch on this page
            updates.
          </p>
          <ThemeSelector />
        </section>

        <section className="doc-section" aria-labelledby="semantic">
          <h2 id="semantic">Semantic tokens</h2>
          <p>These change per theme. Swatches show the current theme's value.</p>
          <div className="token-groups">
            {tokenGroups.map((group) => (
              <div key={group.title} className="token-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.tokens.map(([name, note]) => (
                    <li key={name}>
                      <span className="token-swatch" style={{ background: `var(${name})` }} aria-hidden="true" />
                      <code>{name}</code>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="doc-section" aria-labelledby="structure">
          <h2 id="structure">Structure, motion, and layering</h2>
          <p>These stay the same across themes, so a control has the same shape and depth in every finish.</p>
          <dl className="token-table">
            {shapeTokens.map(([name, value, note]) => (
              <div key={name}>
                <dt>
                  <code>{name}</code>
                </dt>
                <dd className="token-table__value">{value}</dd>
                <dd>{note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="doc-section" aria-labelledby="palette">
          <h2 id="palette">Color ramps</h2>
          <p>
            Five primitive ramps from 50 to 950. Semantic tokens point into these; components never
            reference a ramp step directly, so the ramps can be retuned without touching components.
          </p>
          <div className="palette-board__ramps">
            {families.map((family) => (
              <figure className="palette-ramp" key={family}>
                <figcaption className="palette-ramp__name">{family === "red" ? "Signal red" : family}</figcaption>
                <div className="palette-ramp__trench">
                  <ol className="palette-ramp__strip" aria-label={`${family} ramp`}>
                    {steps.map((step) => (
                      <li className="palette-ramp__step" key={step}>
                        <span className="palette-ramp__swatch" style={{ backgroundColor: `var(--palette-${family}-${step})` }} />
                        <span className="palette-ramp__value">{step}</span>
                        <code className="palette-ramp__token">--palette-{family}-{step}</code>
                      </li>
                    ))}
                  </ol>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section className="doc-section" aria-labelledby="custom">
          <h2 id="custom">Making your own</h2>
          <p>
            Add a selector to your copy of <code>tokens.css</code>, or to any stylesheet loaded after
            it, and override only the tokens that differ. Unset tokens fall back to Classic.
          </p>
          <CodeBlock code={customTheme} language="css" label="tokens.css" />
          <p>Themes can also be scoped to part of a page:</p>
          <CodeBlock code={scoped} label="Scoped.tsx" />
        </section>
      </article>
    </DocsLayout>
  );
}
