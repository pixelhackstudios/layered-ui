import { Anatomy } from "../components/Anatomy";
import { DocsLayout } from "../components/DocsLayout";

const vocabulary = [
  ["Casing", "The outer structural frame. It defines a component's boundary, bevel, and relief."],
  ["Trench", "A recessed channel that isolates an interactive face from its housing."],
  ["Raised control", "A face that stands above the casing plane and compresses when used."],
  ["Recessed surface", "Screens and writing areas set down into the casing: inputs, tables, overlays."],
  ["Controlled lighting", "One light direction for everything: highlights on top edges, shadow beneath."],
  ["Physical state", "Hover lifts, press compresses, switches engage, displays reveal."],
];

const motion = [
  ["Compress", "Controls move inward when pressed."],
  ["Rebound", "A controlled mechanical release with light overshoot."],
  ["Engage", "Switches and toggles snap into position."],
  ["Assemble", "Casing, surface, header, and content arrive in sequence."],
  ["Disengage", "A fast, controlled reverse exit."],
  ["Signal", "A restrained pulse for status updates."],
  ["Reveal", "Displays illuminate or uncover content."],
];

export function PrinciplesPage() {
  return (
    <DocsLayout>
      <article className="prose-page">
        <header className="page-head">
          <p className="eyebrow">Guide</p>
          <h1>Principles</h1>
          <p className="page-head__lede">
            Layered UI starts from one idea: an interface control is an object. It has parts, it sits
            in something, light falls on it, and it moves when you use it. The rules below keep that
            idea consistent across every component.
          </p>
        </header>

        <section className="doc-section" aria-labelledby="language">
          <h2 id="language">Visual language</h2>
          <dl className="vocab">
            {vocabulary.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
          <Anatomy />
        </section>

        <section className="doc-section" aria-labelledby="hierarchy">
          <h2 id="hierarchy">Depth is hierarchy, not decoration</h2>
          <p>
            If every surface is heavy, nothing stands out. Page backgrounds stay flat. Casings are
            for things you can operate or that hold a reading. The deepest treatment goes to the
            primary action on a screen.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="focus">
          <h2 id="focus">Contained focus</h2>
          <p>
            Form controls never draw focus, invalid, or selected rings outside their casing.
            Instead, the state lights the inner trench, the recessed surface's border, or the label,
            so it stays visible and the edge of the object stays clean. Keyboard focus is never
            removed, and under <code>forced-colors: active</code> controls fall back to system
            outlines.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="native">
          <h2 id="native">Native first</h2>
          <p>
            If the platform has a control, Layered UI styles that control: <code>&lt;button&gt;</code>,{" "}
            <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;progress&gt;</code>,{" "}
            <code>&lt;table&gt;</code>. Where it doesn't, the component wraps an accessible primitive:
            Radix for dialogs, menus, tabs, and sliders, and Base UI for the combobox. Each primitive
            is pinned to an exact version in the registry.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="motion">
          <h2 id="motion">Motion vocabulary</h2>
          <p>
            Simple state changes, such as hover brightness, press depth, and fades, are CSS
            transitions. Physical choreography like rebound and staged assembly is reserved for an
            optional GSAP layer, so the core components never depend on an animation library.
          </p>
          <dl className="vocab vocab--compact">
            {motion.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
          <p>
            With <code>prefers-reduced-motion: reduce</code>, travel, bounce, and delays are removed.
            State still changes instantly and visibly.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="not">
          <h2 id="not">What it deliberately isn't</h2>
          <ul className="check-list check-list--cross">
            <li>A flat, rounded-card SaaS kit with a new accent color.</li>
            <li>A Tailwind preset or a shadcn/ui re-skin. It uses the shadcn CLI only to distribute source.</li>
            <li>A styling escape hatch. Variants are chosen on purpose, not passed as arbitrary classes.</li>
          </ul>
        </section>
      </article>
    </DocsLayout>
  );
}
