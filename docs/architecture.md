# Layered UI Architecture

This document describes the architectural structure, design token system, primitive strategy, and source-of-truth hierarchy governing Layered UI.

## Overview & Repository Structure

Layered UI separates component source code, visual testing environment, and generated distribution artifacts:

- **`registry/`**: Canonical source of installable code (`registry/foundations/` and `registry/components/`). All component TSX, CSS, and foundation styles reside exclusively here.
- **`src/`**: Visual laboratory and showcase application built with Vite, React, and TypeScript. Imports components directly from `registry/` for testing and demonstration.
- **`public/r/`**: Committed generated registry artifacts (`.json`) produced by `npx shadcn build` for remote CLI installation. `public/r/` contains committed generated artifacts suitable for direct static hosting.
- **`registry.json`**: Canonical registry manifest defining item names, types, source file mappings, target installation paths, and registry dependencies.

### Single Source of Truth

To prevent drift, there are **no duplicate canonical component copies**. The `src/` laboratory does not maintain separate component implementations; it imports directly from `registry/`.

## Dependency Model

Layered UI relies on a single internal foundation style package:

- **`layered-foundation`** (`registry:style`): Contains core design tokens, dual theme rules, and physical depth variables in `registry/foundations/layered-foundation/tokens.css`.
- **UI Components** (`registry:ui`): Each published UI component declares an explicit dependency in `registry.json` on `pixelhackstudios/layered-ui/layered-foundation`.

When a user installs any UI component via the `shadcn` CLI, `layered-foundation` is automatically resolved and installed alongside the component files.

## Primitive Strategy

Layered UI prioritizes native HTML elements before introducing third-party primitive dependencies:

- **Native HTML First**: Simple and intermediate controls (`LayeredButton`, `LayeredInput`, `LayeredSelect`, `LayeredDisplayCard`, `LayeredPanel`, `LayeredTextarea`, `LayeredCheckbox`, `LayeredSwitch`) use semantic HTML elements (`<button>`, `<input>`, `<select>`, `<section>`, `<textarea>`, `<input type="checkbox">`) to ensure native browser keyboard handling, form submission integration, and accessibility behavior.
- **Radix Primitives for Complex Behavioral Controls**: Radix primitives are approved *exclusively* for complex behavioral controls where native HTML lacks standard accessible lifecycle management (such as overlay focus traps, portal mounting, escape key handling, and ARIA state management). `LayeredDialog` was the first implemented example, built on `@radix-ui/react-dialog` (pinned at `1.1.23`). `LayeredTooltip` is the second, built on `@radix-ui/react-tooltip` (pinned at `1.2.16`), covering hover/focus delay timing, portal mounting, collision-aware positioning, and dismissal.
- **Undecided Behavioral Primitives**: `LayeredCombobox` is a planned direction whose behavioral dependency remains undecided (evaluating native `<datalist>`, custom ARIA keyboard navigation, or third-party primitives). It is not grouped under the approved Radix strategy.
- **Compound APIs**: `LayeredDialog` was the first component to expose a compound export API (`LayeredDialog`, `LayeredDialogTrigger`, `LayeredDialogContent`, `LayeredDialogTitle`, `LayeredDialogDescription`, `LayeredDialogClose`, `LayeredDialogHeader`, `LayeredDialogFooter`). This established that compound APIs are permitted when a component's behavior genuinely requires composition — it is not a predetermined template for future components. `LayeredTooltip` confirms this: it exposes its own, smaller four-part shape (`LayeredTooltipProvider`, `LayeredTooltip`, `LayeredTooltipTrigger`, `LayeredTooltipContent`), with no separate `LayeredTooltipArrow` or `LayeredTooltipPortal` export — the directional arrow is rendered internally by `LayeredTooltipContent` behind a `showArrow` prop, since it is a fixed visual detail of one surface rather than something consumers need to compose freely. None of these Tooltip-specific decisions (provider timing defaults, arrow-as-internal-prop, component-local z-index) predetermine the APIs of future components such as `LayeredPopover`, `LayeredDropdownMenu`, or `LayeredToast`, which remain undecided.

## Styling Architecture & Design Tokens

Layered UI uses **plain CSS** with custom property design tokens. It does not use Tailwind CSS, CSS-in-JS, or utility class libraries.

### Token Categories

Tokens are organized into semantic custom-property groups in `registry/foundations/layered-foundation/tokens.css`:

- **Color & Palette Tokens**: Defined using HSL color space (`--color-canvas`, `--color-surface`, `--color-border-subtle`).
- **Control Structure & Surface Tokens**: Structural depth, border radius, and surface shading gradients (`--control-shell-top`, `--input-surface-bg-top`, `--panel-casing-bg`).
- **Tones**: Accent and status tones including metallic copper (`--tone-copper-light`, `--tone-copper-base`) and tactical indicators.
- **Motion Tokens**: Transition durations and timing functions (`--duration-fast`, `--duration-normal`, `--ease-out-quad`).
- **Shadow & Lighting Tokens**: Directional ambient occlusion, bevel highlights, and trench shadow definitions.

### Dual Theme Architecture

Layered UI supports dual themes mapped via custom property overrides on the root or container element:

1. **Classic Theme** (`data-theme="classic"`): Dark industrial aesthetic with deep slate casing and copper highlights.
2. **Field Hardware Theme** (`data-theme="field"`): Tactical instrument aesthetic with bronze casing, olive surfaces, and high-visibility status indicators.

## Component Naming & API Conventions

- **Component Name Prefix**: All React components are named with the `Layered` prefix (`LayeredButton`, `LayeredPanel`, `LayeredInput`, `LayeredSelect`, `LayeredDisplayCard`, `LayeredDialog`, and `LayeredDialog`'s compound sub-parts).
- **Intentional Variants**: Components expose explicit, constrained variant props (e.g., `variant="default" | "raised" | "flat"`) rather than arbitrary inline styling escape hatches.
- **Controlled Interaction States**: Visual depth changes (hover highlights, press compression) are driven by CSS state pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:disabled`) or explicit data attributes.

## Source-of-Truth Hierarchy

When evaluating visual or architectural decisions, conflict resolution follows this priority order:

1. Current explicit user instructions.
2. User-approved screenshots, rendered prototypes, and visual decisions.
3. Root `AGENTS.md` rules.
4. Applicable files under `.agents/skills/`.
5. Existing project conventions.
6. General agent defaults.

*Visual references outrank prose descriptions when they conflict.*

## Generated Artifact Policy (Policy A)

The repository operates under **Policy A** for registry distribution:

- Generated registry JSON files located in `public/r/` are committed build outputs produced by running `npx shadcn build`.
- `public/r/` contains committed generated artifacts suitable for direct static hosting.
- Every commit to `main` must ensure `public/r/` artifacts match `registry.json` and canonical source files in `registry/`.

## Architecture Matrix: Current vs. Planned

| Architectural Area | Current Verified Architecture | Planned Architecture |
|---|---|---|
| **Component Inventory** | 11 published items (`foundation`, `button`, `panel`, `input`, `select`, `display-card`, `textarea`, `checkbox`, `switch`, `dialog`, `tooltip`) | Planned directions: `LayeredToast`, `LayeredCombobox` |
| **Styling System** | Plain CSS with semantic custom property token groups | Maintained plain CSS architecture (no utility frameworks) |
| **Motion System** | Plain CSS transitions for hover/press/focus; `LayeredDialog` adds CSS-only entrance/exit keyed on Radix `data-state`; `LayeredTooltip` adds CSS-only opacity + small directional-travel transitions keyed on Radix `data-state`/`data-side` | Optional `layered-motion` registry item with GSAP choreography |
| **Behavioral Primitives** | Native HTML elements (`<button>`, `<input>`, `<select>`); Radix (`@radix-ui/react-dialog@1.1.23`) for `LayeredDialog`; Radix (`@radix-ui/react-tooltip@1.2.16`) for `LayeredTooltip` | `LayeredCombobox` primitive undecided |
| **Distribution** | `shadcn` registry JSON artifacts in `public/r/` | Maintained Policy A committed static artifact publishing |

### `LayeredDialog` Z-Index Strategy

`LayeredDialog` uses component-local fallback custom properties, not shared foundation tokens: `--layered-dialog-overlay-z` (default `1000`) and `--layered-dialog-content-z` (default `1001`), applied via `var()` fallbacks in `LayeredDialog.css`. `layered-foundation/tokens.css` is intentionally unchanged; a shared overlay-stack token system was deferred until a second overlay-based component existed.

### `LayeredTooltip` Z-Index Strategy

`LayeredTooltip` is that second overlay-based component, and the decision was made explicitly rather than deferred again: it stays **component-local**, using a single fallback custom property `--layered-tooltip-z` (default `1100`) applied via `var()` fallback in `LayeredTooltip.css`. The default is set numerically above `--layered-dialog-content-z` (`1001`) so a tooltip triggered on a control inside an open `LayeredDialog` renders above the dialog casing rather than behind or clipped by it (verified by the "Tooltip Inside Dialog" laboratory example). Consumers running a custom overlay stack may override `--layered-tooltip-z` directly.

Shared foundation overlay-stack tokens were **not** introduced for this component: Dialog (modal, overlay+content pair, single instance) and Tooltip (non-modal, no scrim, no separate overlay layer) have structurally different stacking needs, and two data points are too thin a sample to generalize a shared schema from without risking an abstraction that fits neither well against a third overlay. This question is deferred again, to be revisited once a **third** overlay-based component (`LayeredToast`, a future `LayeredPopover`, or `LayeredDropdownMenu`) provides enough evidence to see whether a common pattern actually emerges.
