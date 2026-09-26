import { useEffect, useRef, useSyncExternalStore } from "react";

/* Hash routing keeps the site deployable to any static host (including a
   GitHub Pages project subpath) with no server rewrite rules. Routes are
   written as "/components/button" and rendered as "#/components/button". */

function readPath() {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw.startsWith("/")) return "/";
  const [path] = raw.split("?");
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export function usePath() {
  return useSyncExternalStore(subscribe, readPath, () => "/");
}

export function href(path: string) {
  return `#${path}`;
}

/* Route changes behave like page loads: the title updates, the window returns
   to the top, and focus moves to the new page's h1 so screen readers announce
   it. The first render keeps the browser's default focus. */
export function useRouteEffects(path: string, title: string) {
  const isFirstRoute = useRef(true);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const heading = document.querySelector<HTMLElement>("main h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }, [path]);
}
