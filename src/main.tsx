import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Base styles first so the site stylesheet (imported by Site) layers on top. */
import "./styles/tokens.css";
import "./styles/global.css";
import { Site } from "./site/Site";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
