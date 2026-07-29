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
- **Radix Primitives for Complex Behavioral Controls**: Radix primitives are approved *exclusively* for complex behavioral controls where native HTML lacks standard accessible lifecycle management (such as overlay focus traps, portal mounting, escape key handling, roving focus, and ARIA state management). `LayeredDialog` was the first implemented example, built on `@radix-ui/react-dialog` (pinned at `1.1.23`). `LayeredTooltip` is the second, built on `@radix-ui/react-tooltip` (pinned at `1.2.16`), covering hover/focus delay timing, portal mounting, collision-aware positioning, and dismissal. `LayeredTabs` is the third, built on `@radix-ui/react-tabs` (pinned at `1.1.21`) — the first non-overlay Radix component. Its justification is different from Dialog/Tooltip's: Tabs has no portal or overlay lifecycle to manage; the native-HTML gap it fills is roving tabindex, arrow-key/Home/End keyboard navigation, activation-mode semantics, and the ARIA tab/tabpanel relationship, none of which native HTML provides out of the box for a custom-styled tab rail. `LayeredAccordion` is the fourth, built on `@radix-ui/react-accordion` (pinned at `1.2.20`) — the second non-overlay component, for the same class of reason as Tabs: the native-HTML gap it fills is single/multiple disclosure state management, roving-focus keyboard navigation (Up/Down/Home/End), collapsible semantics, and the heading/button/region ARIA relationships a hand-rolled disclosure widget would otherwise have to reimplement.
- **Undecided Behavioral Primitives**: `LayeredCombobox` is a planned direction whose behavioral dependency remains undecided (evaluating native `<datalist>`, custom ARIA keyboard navigation, or third-party primitives). It is not grouped under the approved Radix strategy. `LayeredTabs`'s and `LayeredAccordion`'s adoption of Radix does not predetermine the primitive choice for a future `LayeredCollapsible` or navigation menu — each is evaluated independently against what native HTML can and cannot provide.
- **Compound APIs**: `LayeredDialog` was the first component to expose a compound export API (`LayeredDialog`, `LayeredDialogTrigger`, `LayeredDialogContent`, `LayeredDialogTitle`, `LayeredDialogDescription`, `LayeredDialogClose`, `LayeredDialogHeader`, `LayeredDialogFooter`). This established that compound APIs are permitted when a component's behavior genuinely requires composition — it is not a predetermined template for future components. `LayeredTooltip` confirms this: it exposes its own, smaller four-part shape (`LayeredTooltipProvider`, `LayeredTooltip`, `LayeredTooltipTrigger`, `LayeredTooltipContent`), with no separate `LayeredTooltipArrow` or `LayeredTooltipPortal` export — the directional arrow is rendered internally by `LayeredTooltipContent` behind a `showArrow` prop, since it is a fixed visual detail of one surface rather than something consumers need to compose freely. `LayeredTabs` exposes its own four-part shape (`LayeredTabs`, `LayeredTabsList`, `LayeredTabsTrigger`, `LayeredTabsContent`), with no separate indicator export — the active-tab/content relationship is expressed through per-element styling, not a free-floating element consumers would need to compose. `LayeredAccordion` exposes a parallel four-part shape (`LayeredAccordion`, `LayeredAccordionItem`, `LayeredAccordionTrigger`, `LayeredAccordionContent`) with no separate `LayeredAccordionHeader` export — `Accordion.Header` is always rendered internally by `LayeredAccordionTrigger` around a heading element chosen via a `headingLevel` prop (`2`–`6`, default `3`), since it's a fixed semantic wrapper with no meaningful independent composition, not a togglable visual detail like Tooltip's arrow. None of these component-specific decisions (provider timing defaults, arrow-as-internal-prop, component-local z-index, Tabs'/Accordion's Root-owned tone/size, Accordion's internal-Header-plus-`headingLevel` pattern) predetermine the APIs of future components such as `LayeredPopover`, `LayeredDropdownMenu`, `LayeredToast`, or `LayeredCollapsible`, which remain undecided.

### `LayeredTabs` Tone/Size Ownership

`tone` and `tabsSize` are props on `LayeredTabs` (Root), not `LayeredTabsList`. `LayeredTabsList` and `LayeredTabsContent` are siblings under Root, not ancestor and descendant, so a custom property scoped to List cannot cascade into Content. Root renders `data-tone` and `data-size`, and owns the CSS custom properties (`--tabs-tone-accent`, `--tabs-trigger-height`, etc.) that both List/Trigger and Content read from — this is what lets the active trigger and the `surface="integrated"` content panel share a coordinated tone accent and consistent scale without prop-drilling or a second tone prop on Content.

### `LayeredAccordion` Root Ownership, Housing, and Vertical-Only v1

`tone` and `accordionSize` are props on `LayeredAccordion` (Root), applying the same Root-owns-the-cascade pattern `LayeredTabs` established — Item, Trigger, and Content all read from Root-scoped CSS custom properties rather than any sibling-scoped ones. Unlike Tabs, `LayeredAccordion` uses **one shared structural rack housing** rather than per-item casings: Root itself carries the visible border, radius, and recessed background, with `overflow: hidden` clipping every internal (square-cornered) Item/Trigger/Content edge to Root's rounded corners. Items are separated only by a single trench-line divider (`border-block-end`, omitted on the last item) — this is what keeps the accordion reading as one rack of hatches rather than a stack of independently-cased cards or repeated `LayeredPanel`s.

`LayeredAccordion`'s public Root type preserves Radix's discriminated `single`/`multiple` `Accordion.Root` union via a `DistributiveOmit` helper, removing only `orientation` — v1 is **deliberately vertical-only**: the component always renders `Accordion.Root` with a fixed `orientation="vertical"` internally, and does not expose `orientation` as a public prop, because the CSS has no horizontal layout to back it. A future horizontal variant would need its own deliberate visual design, not just re-exposing the existing Radix prop.

`LayeredAccordionTrigger` and `LayeredAccordionContent` both omit `asChild` from their public prop types (rather than silently breaking it): Trigger always renders a fixed label wrapper plus a decorative indicator as two children, and Content always renders a fixed inner padding wrapper — both violate Radix Slot's single-child contract for `asChild`, so the prop is typed out entirely instead of exposed and unreliable.

### `LayeredTabs` Overflow and Docking Strategy

`LayeredTabsList` defaults to `overflow="scroll"` (native `overflow-x: auto`, roving focus already keeps the DOM's default scroll-into-view behavior working on arrow-key navigation) with `overflow="wrap"` as an explicit opt-in; wrapping is not the default because a wrapping rail turns the "single mechanical selector rail" metaphor into a multi-row grid, which reads as generic dashboard tab bars rather than hardware. The active Trigger and its Content panel are visually docked — a reduced corner radius plus a short tone-accent line on the shared edge — using only per-element CSS keyed off `data-state`/`data-orientation`, not a literal shared border, a moving indicator element, or JavaScript measurement, so the relationship stays correct through horizontal scrolling, vertical orientation, RTL, and wrap mode. Vertical orientation does not get its own scroll story in v1; a vertical `LayeredTabsList` simply grows to content height.

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
| **Component Inventory** | 13 published items (`foundation`, `button`, `panel`, `input`, `select`, `display-card`, `textarea`, `checkbox`, `switch`, `dialog`, `tooltip`, `tabs`, `accordion`) | Planned directions: `LayeredToast`, `LayeredCombobox` |
| **Styling System** | Plain CSS with semantic custom property token groups | Maintained plain CSS architecture (no utility frameworks) |
| **Motion System** | Plain CSS transitions for hover/press/focus; `LayeredDialog` adds CSS-only entrance/exit keyed on Radix `data-state`; `LayeredTooltip` adds CSS-only opacity + small directional-travel transitions keyed on Radix `data-state`/`data-side`; `LayeredTabs` adds a short CSS-only engagement transition on the active Trigger only, with instant (unanimated) content switching; `LayeredAccordion` adds a CSS-only block-size open/close transition driven by Radix's `--radix-accordion-content-height`, resolving to a static `auto`/`0` at rest (Reveal/Disengage vocabulary, no new terms) | Optional `layered-motion` registry item with GSAP choreography |
| **Behavioral Primitives** | Native HTML elements (`<button>`, `<input>`, `<select>`); Radix (`@radix-ui/react-dialog@1.1.23`) for `LayeredDialog`; Radix (`@radix-ui/react-tooltip@1.2.16`) for `LayeredTooltip`; Radix (`@radix-ui/react-tabs@1.1.21`) for `LayeredTabs`; Radix (`@radix-ui/react-accordion@1.2.20`) for `LayeredAccordion` | `LayeredCombobox` primitive undecided |
| **Distribution** | `shadcn` registry JSON artifacts in `public/r/` | Maintained Policy A committed static artifact publishing |

### Shared Overlay-Stack Z-Index Scale

`layered-foundation/tokens.css` defines a semantic z-index scale, shared across every overlay-based component:

```css
--layered-z-dialog-overlay: 1000;
--layered-z-dialog-content: 1010;
--layered-z-popover: 2000;
--layered-z-toast: 3000;
--layered-z-tooltip: 4000;
```

This was introduced when `LayeredToast` became the third overlay-based component, resolving the question `LayeredTooltip`'s docs left deferred (below, kept for history). The ordering is deliberate, not numeric happenstance: `LayeredTooltip` sits topmost because a tooltip may annotate a control inside an open dialog, an open popover/menu, or a toast's action button, and must clear all of them. `--layered-z-popover` is reserved ahead of `LayeredPopover`/`LayeredDropdownMenu` existing, so those components have a slot to adopt without a future renumbering.

Each component still exposes its own component-local override custom property as the first fallback (e.g. `--layered-dialog-overlay-z`, `--layered-tooltip-z`), falling back to the shared foundation token, falling back to a literal number — `var(--layered-dialog-overlay-z, var(--layered-z-dialog-overlay, 1000))`. This preserves per-instance override (a consumer can still raise one dialog's z-index without touching the shared scale) while giving every component a coherent default relative to the others out of the box. This three-level fallback is why a registry item copied in isolation (without `layered-foundation`) still renders with a sane literal default instead of an invalid `var()`.

### `LayeredDialog` Z-Index Strategy

`LayeredDialog` consumes `--layered-z-dialog-overlay` (`1000`) and `--layered-z-dialog-content` (`1010`) from the shared scale, via its component-local fallback properties `--layered-dialog-overlay-z` / `--layered-dialog-content-z`.

### `LayeredTooltip` Z-Index Strategy

`LayeredTooltip` consumes `--layered-z-tooltip` (`4000`) from the shared scale, via its component-local fallback property `--layered-tooltip-z`. Originally (see history below) its component-local default of `1100` was set only high enough to numerically clear Dialog; the shared scale now expresses *why* it must stay topmost — verified by the "Tooltip Inside Dialog" laboratory example — rather than relying on an adjacent magic number.

**History**: `LayeredDialog` originally used component-local-only fallback custom properties (`--layered-dialog-overlay-z` default `1000`, `--layered-dialog-content-z` default `1001`), with `layered-foundation/tokens.css` intentionally left unchanged — a shared token system was deferred until a second overlay-based component existed. `LayeredTooltip` then arrived as that second component and the decision was made explicitly rather than deferred again: it stayed component-local (`--layered-tooltip-z` default `1100`, numerically above Dialog's `1001`), reasoning that Dialog (modal, overlay+content pair) and Tooltip (non-modal, no scrim) were too structurally different, and two data points too thin a sample, to generalize a shared schema without it fitting neither well against a future third overlay. That third overlay-based component turned out to be `LayeredToast`, which is what prompted the shared scale above.

### `LayeredTabs` Z-Index Strategy

Not applicable. `LayeredTabs` is non-overlay — it renders no portal, no scrim, and has no stacking-context concern of its own — so it declares no z-index custom property, and `layered-foundation`'s token set remains unchanged for this reason. The deferred overlay-stack-token question above is unaffected by Tabs' addition, since Tabs isn't a data point for it.

### `LayeredAccordion` Z-Index Strategy

Not applicable, for the same reason as Tabs. `LayeredAccordion` is the second non-overlay Radix component — no portal, no scrim, no stacking-context concern — so it declares no z-index custom property and `layered-foundation`'s token set remains unchanged.
