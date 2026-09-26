import { Link } from "../Link";
import { usePath } from "../router";
import { BrandMark } from "./Brand";
import { ThemeSelector } from "./ThemeSelector";

const nav = [
  { to: "/docs/getting-started", label: "Docs", match: "/docs" },
  { to: "/components", label: "Components", match: "/components" },
  { to: "/showcase", label: "Showcase", match: "/showcase" },
];

export const repoUrl = "https://github.com/pixelhackstudios/layered-ui";

export function SiteHeader() {
  const path = usePath();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-brand" aria-label="Layered UI home">
          <BrandMark />
          <span className="site-brand__name">Layered UI</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="site-nav__link"
              data-active={path.startsWith(item.match) ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a className="site-nav__link" href={repoUrl} target="_blank" rel="noreferrer">
            GitHub<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <ThemeSelector compact />
      </div>
    </header>
  );
}
