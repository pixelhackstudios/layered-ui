import { Anatomy } from "../components/Anatomy";
import { ButtonLink } from "../components/ButtonLink";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentGrid } from "../components/ComponentGrid";
import { HeroConsole } from "../components/HeroConsole";
import { ThemeSelector } from "../components/ThemeSelector";
import { componentDocs } from "../content/components";
import { Link } from "../Link";

const principles = [
  {
    code: "N-01",
    title: "Native first",
    body: "Buttons are buttons, selects are selects, tables are tables. Radix and Base UI come in only where the platform has no primitive: dialogs, menus, comboboxes.",
  },
  {
    code: "C-02",
    title: "Contained focus",
    body: "Form-control focus and error states light the inner trench instead of glowing outside the casing. Keyboard focus is always visible.",
  },
  {
    code: "T-03",
    title: "Plain CSS, real tokens",
    body: "No Tailwind, no CSS-in-JS. Every color, depth, and duration is a custom property, so a theme is a token map rather than a fork.",
  },
  {
    code: "O-04",
    title: "Open code",
    body: "Components install through the shadcn CLI as source files in your project. There is no package to upgrade around; you own what you ship.",
  },
  {
    code: "V-05",
    title: "Intentional variants",
    body: "Tone and size are the levers. Components don't take arbitrary style props, which is what keeps a screen full of them consistent.",
  },
  {
    code: "M-06",
    title: "Motion with a reason",
    body: "Controls compress, rebound, and engage the way hardware does. Reduced-motion settings remove the travel and keep every state change.",
  },
];

const featured = ["button", "switch", "slider", "tabs", "badge", "progress", "dialog", "table"];

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">React component system · Open code</p>
          <h1 id="hero-title" className="hero__title">
            Interfaces with casings, trenches, and <em>travel</em>.
          </h1>
          <p className="hero__lede">
            Layered UI builds components the way hardware is built: raised faces seated in recessed
            housings, lit from one side, that press in when you press them. Plain CSS, native controls
            first, and source you own.
          </p>
          <div className="hero__actions">
            <ButtonLink to="/docs/getting-started">Get started</ButtonLink>
            <ButtonLink to="/components" tone="neutral">
              Browse components
            </ButtonLink>
          </div>
          <div className="hero__install">
            <CodeBlock
              code="npx shadcn@latest add pixelhackstudios/layered-ui/layered-button"
              language="bash"
              label="install a component"
              compact
            />
          </div>
        </div>
        <div className="hero__module">
          <HeroConsole />
          <p className="hero__caption">Live: every control here is a published component.</p>
        </div>
      </section>

      <section className="spec-strip" aria-label="At a glance">
        <dl>
          <div>
            <dt>Components</dt>
            <dd>{componentDocs.length}</dd>
          </div>
          <div>
            <dt>Themes</dt>
            <dd>2</dd>
          </div>
          <div>
            <dt>Tailwind</dt>
            <dd>0</dd>
          </div>
          <div>
            <dt>Install commands</dt>
            <dd>1</dd>
          </div>
        </dl>
      </section>

      <section className="home-section" aria-labelledby="anatomy-title">
        <header className="section-head">
          <p className="eyebrow">Construction</p>
          <h2 id="anatomy-title">Four layers, one control.</h2>
          <p>
            Every component is assembled from the same parts. Flat design removes them; Layered UI
            names them and gives each one a job.
          </p>
        </header>
        <Anatomy />
      </section>

      <section className="home-section" aria-labelledby="principles-title">
        <header className="section-head">
          <p className="eyebrow">Specification</p>
          <h2 id="principles-title">Built to a spec sheet, not a mood board.</h2>
        </header>
        <ol className="spec-sheet">
          {principles.map((item) => (
            <li key={item.code} className="spec-sheet__item">
              <span className="spec-sheet__code">{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="section-more">
          <Link to="/docs/principles">Read the design principles →</Link>
        </p>
      </section>

      <section className="home-section home-themes" aria-labelledby="themes-title">
        <header className="section-head">
          <p className="eyebrow">Theming</p>
          <h2 id="themes-title">Two finishes, one token API.</h2>
          <p>
            Classic is slate and copper. Field Hardware is olive casing, brass, and canvas. Switching
            rewrites custom properties only; no component changes. Try it: the whole site follows.
          </p>
        </header>
        <div className="home-themes__plates">
          <div className="theme-plate" data-theme="classic">
            <span className="theme-plate__name">Classic</span>
            <div className="theme-plate__row" aria-hidden="true">
              <span className="layered-button" data-tone="copper" data-size="small">
                <span className="layered-button__face">
                  <span className="layered-button__content">Deploy</span>
                </span>
              </span>
              <span className="layered-button" data-tone="neutral" data-size="small">
                <span className="layered-button__face">
                  <span className="layered-button__content">Hold</span>
                </span>
              </span>
            </div>
            <span className="theme-plate__swatches" aria-hidden="true">
              <i style={{ background: "var(--tone-copper-light)" }} />
              <i style={{ background: "var(--tone-green-light)" }} />
              <i style={{ background: "var(--tone-gold-light)" }} />
              <i style={{ background: "var(--control-shell-top)" }} />
            </span>
          </div>
          <div className="theme-plate" data-theme="field">
            <span className="theme-plate__name">Field Hardware</span>
            <div className="theme-plate__row" aria-hidden="true">
              <span className="layered-button" data-tone="copper" data-size="small">
                <span className="layered-button__face">
                  <span className="layered-button__content">Deploy</span>
                </span>
              </span>
              <span className="layered-button" data-tone="neutral" data-size="small">
                <span className="layered-button__face">
                  <span className="layered-button__content">Hold</span>
                </span>
              </span>
            </div>
            <span className="theme-plate__swatches" aria-hidden="true">
              <i style={{ background: "var(--tone-copper-light)" }} />
              <i style={{ background: "var(--tone-green-light)" }} />
              <i style={{ background: "var(--tone-gold-light)" }} />
              <i style={{ background: "var(--control-shell-top)" }} />
            </span>
          </div>
        </div>
        <ThemeSelector />
      </section>

      <section className="home-section" aria-labelledby="catalog-title">
        <header className="section-head section-head--row">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2 id="catalog-title">{componentDocs.length} components and counting.</h2>
          </div>
          <Link to="/components" className="section-head__link">
            See all components →
          </Link>
        </header>
        <ComponentGrid docs={componentDocs.filter((doc) => featured.includes(doc.slug))} />
      </section>

      <section className="home-section showcase-callout" aria-labelledby="showcase-title">
        <div>
          <p className="eyebrow">Showcase</p>
          <h2 id="showcase-title">See it run a whole screen.</h2>
          <p>
            The Control Room is a working operations console assembled from Layered UI only: filters,
            a fleet table, bulk actions, confirmations, and notifications.
          </p>
        </div>
        <ButtonLink to="/showcase" tone="green">
          Open the Control Room
        </ButtonLink>
      </section>
    </>
  );
}
