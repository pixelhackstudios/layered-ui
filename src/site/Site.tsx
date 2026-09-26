import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { findComponent } from "./content/components";
import { ComponentPage } from "./pages/ComponentPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrinciplesPage } from "./pages/PrinciplesPage";
import { ShowcasePage } from "./pages/ShowcasePage";
import { ThemingPage } from "./pages/ThemingPage";
import { usePath, useRouteEffects } from "./router";
import { readStoredTheme, storeTheme, ThemeContext, type ThemeName } from "./theme";
import "./site.css";

/* The original component laboratory stays available for development and
   visual QA; it is loaded only when visited. */
const Lab = lazy(() => import("../App"));

function resolve(path: string): { title: string; page: ReactNode; bare?: boolean } {
  if (path === "/") return { title: "Layered UI — tactile React components", page: <HomePage /> };
  if (path === "/docs" || path === "/docs/getting-started")
    return { title: "Getting started · Layered UI", page: <GettingStartedPage /> };
  if (path === "/docs/theming") return { title: "Theming and tokens · Layered UI", page: <ThemingPage /> };
  if (path === "/docs/principles") return { title: "Principles · Layered UI", page: <PrinciplesPage /> };
  if (path === "/components") return { title: "Components · Layered UI", page: <ComponentsPage /> };
  if (path === "/showcase") return { title: "Control Room · Layered UI", page: <ShowcasePage /> };
  if (path === "/lab") return { title: "Component lab · Layered UI", page: <Lab />, bare: true };

  const match = path.match(/^\/components\/([a-z-]+)$/);
  const doc = match && findComponent(match[1]);
  if (doc) return { title: `${doc.name} · Layered UI`, page: <ComponentPage key={doc.slug} doc={doc} /> };

  return { title: "Not found · Layered UI", page: <NotFoundPage /> };
}

export function Site() {
  const path = usePath();
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);
  const { title, page, bare } = resolve(path);

  useRouteEffects(path, title);

  /* Re-applied on navigation too: the lab manages the root theme itself. */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme, path]);

  const setTheme = (next: ThemeName) => {
    setThemeState(next);
    storeTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main");
        main?.focus();
        main?.scrollIntoView();
      }}>
        Skip to content
      </a>
      <SiteHeader />
      {bare ? (
        /* The lab renders its own <main>. */
        <div id="main" tabIndex={-1} className="site-main site-main--bare">
          <Suspense fallback={<p className="loading">Loading the lab…</p>}>{page}</Suspense>
        </div>
      ) : (
        <main id="main" tabIndex={-1} className="site-main">
          {page}
        </main>
      )}
      <SiteFooter />
    </ThemeContext.Provider>
  );
}
