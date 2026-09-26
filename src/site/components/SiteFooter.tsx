import { Link } from "../Link";
import { BrandMark } from "./Brand";
import { repoUrl } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__id">
          <BrandMark size={24} />
          <p>
            <strong>Layered UI</strong> is designed and built by{" "}
            <a href="https://pixelhackstudios.com/" target="_blank" rel="noreferrer">
              Scott O'Nanski at Pixel Hack Studios
            </a>
            . Open code: installed components are yours to change.
          </p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/docs/getting-started">Getting started</Link>
          <Link to="/docs/theming">Theming</Link>
          <Link to="/docs/principles">Principles</Link>
          <Link to="/components">Components</Link>
          <Link to="/showcase">Showcase</Link>
          <Link to="/lab">Component lab</Link>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
