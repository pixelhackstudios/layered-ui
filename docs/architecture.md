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
- **Radix Primitives for Complex Behavioral Controls**: Radix primitives are approved *exclusively* for complex behavioral controls where native HTML lacks standard accessible lifecycle management (such as overlay focus traps, portal mounting, escape key handling, roving focus, and ARIA state management). `LayeredDialog` was the first implemented example, built on `@radix-ui/react-dialog` (pinned at `1.1.23`). `LayeredTooltip` is the second, built on `@radix-ui/react-tooltip` (pinned at `1.2.16`), covering hover/focus delay timing, portal mounting, collision-aware positioning, and dismissal. `LayeredTabs` is the third, built on `@radix-ui/react-tabs` (pinned at `1.1.21`) — the first non-overlay Radix component. Its justification is different from Dialog/Tooltip's: Tabs has no portal or overlay lifecycle to manage; the native-HTML gap it fills is roving tabindex, arrow-key/Home/End keyboard navigation, activation-mode semantics, and the ARIA tab/tabpanel relationship, none of which native HTML provides out of the box for a custom-styled tab rail. `LayeredAccordion` is the fourth, built on `@radix-ui/react-accordion` (pinned at `1.2.20`) — the second non-overlay component, for the same class of reason as Tabs: the native-HTML gap it fills is single/multiple disclosure state management, roving-focus keyboard navigation (Up/Down/Home/End), collapsible semantics, and the heading/button/region ARIA relationships a hand-rolled disclosure widget would otherwise have to reimplement. `LayeredToast` is the fifth, built on `@radix-ui/react-toast` (pinned at `1.2.23`) — the third overlay-based component, after Dialog and Tooltip. The native-HTML gap it fills is transient-notification lifecycle management: auto-dismiss timing, pause-on-hover/focus/window-blur, foreground/background ARIA live-region announcement priority, and swipe-gesture dismissal state — none of which native HTML provides for a custom-styled toast. `LayeredPopover` is the sixth, built on `@radix-ui/react-popover` (pinned at `1.1.23`) — the fourth overlay-based component, after Dialog, Tooltip, and Toast. The native-HTML gap it fills is anchored-overlay lifecycle management: Trigger/Anchor-relative positioning, collision detection and side/align flipping, portal mounting, focus containment, and outside-interaction/Escape dismissal — the same class of gap Tooltip fills, but for interactive rather than read-only content, which is why Popover also needs `modal`/non-modal focus behavior that Tooltip never required.
- **Undecided Behavioral Primitives**: `LayeredCombobox` is a planned direction whose behavioral dependency remains undecided (evaluating native `<datalist>`, custom ARIA keyboard navigation, or third-party primitives). It is not grouped under the approved Radix strategy. `LayeredTabs`'s, `LayeredAccordion`'s, `LayeredToast`'s, and `LayeredPopover`'s adoption of Radix does not predetermine the primitive choice for a future `LayeredCollapsible` or `LayeredDropdownMenu` — each is evaluated independently against what native HTML can and cannot provide.
- **Compound APIs**: `LayeredDialog` was the first component to expose a compound export API (`LayeredDialog`, `LayeredDialogTrigger`, `LayeredDialogContent`, `LayeredDialogTitle`, `LayeredDialogDescription`, `LayeredDialogClose`, `LayeredDialogHeader`, `LayeredDialogFooter`). This established that compound APIs are permitted when a component's behavior genuinely requires composition — it is not a predetermined template for future components. `LayeredTooltip` confirms this: it exposes its own, smaller four-part shape (`LayeredTooltipProvider`, `LayeredTooltip`, `LayeredTooltipTrigger`, `LayeredTooltipContent`), with no separate `LayeredTooltipArrow` or `LayeredTooltipPortal` export — the directional arrow is rendered internally by `LayeredTooltipContent` behind a `showArrow` prop, since it is a fixed visual detail of one surface rather than something consumers need to compose freely. `LayeredTabs` exposes its own four-part shape (`LayeredTabs`, `LayeredTabsList`, `LayeredTabsTrigger`, `LayeredTabsContent`), with no separate indicator export — the active-tab/content relationship is expressed through per-element styling, not a free-floating element consumers would need to compose. `LayeredAccordion` exposes a parallel four-part shape (`LayeredAccordion`, `LayeredAccordionItem`, `LayeredAccordionTrigger`, `LayeredAccordionContent`) with no separate `LayeredAccordionHeader` export — `Accordion.Header` is always rendered internally by `LayeredAccordionTrigger` around a heading element chosen via a `headingLevel` prop (`2`–`6`, default `3`), since it's a fixed semantic wrapper with no meaningful independent composition, not a togglable visual detail like Tooltip's arrow. `LayeredToast` exposes a seven-part shape (`LayeredToastProvider`, `LayeredToastViewport`, `LayeredToast`, `LayeredToastTitle`, `LayeredToastDescription`, `LayeredToastAction`, `LayeredToastClose`) — one part more than Tooltip's four but, notably, **no Trigger part**: unlike Dialog/Tooltip (opened by a consumer clicking/hovering a rendered trigger element), a toast is opened by consumer application state (a mutation succeeding, a background job finishing), so there is no click target for Layered UI to wrap. See "`LayeredToast` Compositional Boundary" below for the full API rationale. `LayeredPopover` exposes a five-part shape (`LayeredPopover`, `LayeredPopoverTrigger`, `LayeredPopoverAnchor`, `LayeredPopoverContent`, `LayeredPopoverClose`), between Tooltip's four and Dialog's eight — it needs `Anchor` (Tooltip doesn't: a Popover consumer may position Content against an element other than its click Trigger, or control Root and compose Anchor with no Trigger at all), but has no Title/Description/Header/Footer, because `@radix-ui/react-popover` does not expose Radix `Title`/`Description` primitives the way `@radix-ui/react-dialog` does, and Popover content is free-form rather than a fixed title-plus-body-plus-actions structure. See "`LayeredPopover` API Boundary" below for the full rationale, including why an earlier planning draft's assumption of Radix-backed `Title`/`Description` exports was verified against the actual installed package and found incorrect before implementation. None of these component-specific decisions (provider timing defaults, arrow-as-internal-prop, component-local z-index, Tabs'/Accordion's Root-owned tone/size, Accordion's internal-Header-plus-`headingLevel` pattern, Toast's no-Trigger seven-part shape, Popover's Content-owned tone/size and Anchor-inclusive five-part shape) predetermine the APIs of future components such as `LayeredDropdownMenu` or `LayeredCollapsible`, which remain undecided.

### `LayeredTabs` Tone/Size Ownership

`tone` and `tabsSize` are props on `LayeredTabs` (Root), not `LayeredTabsList`. `LayeredTabsList` and `LayeredTabsContent` are siblings under Root, not ancestor and descendant, so a custom property scoped to List cannot cascade into Content. Root renders `data-tone` and `data-size`, and owns the CSS custom properties (`--tabs-tone-accent`, `--tabs-trigger-height`, etc.) that both List/Trigger and Content read from — this is what lets the active trigger and the `surface="integrated"` content panel share a coordinated tone accent and consistent scale without prop-drilling or a second tone prop on Content.

### `LayeredAccordion` Root Ownership, Housing, and Vertical-Only v1

`tone` and `accordionSize` are props on `LayeredAccordion` (Root), applying the same Root-owns-the-cascade pattern `LayeredTabs` established — Item, Trigger, and Content all read from Root-scoped CSS custom properties rather than any sibling-scoped ones. Unlike Tabs, `LayeredAccordion` uses **one shared structural rack housing** rather than per-item casings: Root itself carries the visible border, radius, and recessed background, with `overflow: hidden` clipping every internal (square-cornered) Item/Trigger/Content edge to Root's rounded corners. Items are separated only by a single trench-line divider (`border-block-end`, omitted on the last item) — this is what keeps the accordion reading as one rack of hatches rather than a stack of independently-cased cards or repeated `LayeredPanel`s.

`LayeredAccordion`'s public Root type preserves Radix's discriminated `single`/`multiple` `Accordion.Root` union via a `DistributiveOmit` helper, removing only `orientation` — v1 is **deliberately vertical-only**: the component always renders `Accordion.Root` with a fixed `orientation="vertical"` internally, and does not expose `orientation` as a public prop, because the CSS has no horizontal layout to back it. A future horizontal variant would need its own deliberate visual design, not just re-exposing the existing Radix prop.

`LayeredAccordionTrigger` and `LayeredAccordionContent` both omit `asChild` from their public prop types (rather than silently breaking it): Trigger always renders a fixed label wrapper plus a decorative indicator as two children, and Content always renders a fixed inner padding wrapper — both violate Radix Slot's single-child contract for `asChild`, so the prop is typed out entirely instead of exposed and unreliable.

### `LayeredPopover` Root/Content Ownership

`tone` and `popoverSize` are props on `LayeredPopoverContent`, not `LayeredPopover` (Root) — this is the opposite of Tabs'/Accordion's Root-owns-the-cascade pattern, and deliberately so. Tabs/Accordion put `tone`/`size` on Root because Root has *two* visual descendants (List/Trigger and Content) that are ordinary DOM siblings needing a shared cascade point a sibling-scoped custom property cannot reach. Popover's Root, by contrast, has exactly one visual descendant across the Portal boundary — `LayeredPopoverContent` — and `LayeredPopoverTrigger`/`LayeredPopoverAnchor` are behavioral-only wrappers with no visual props of their own, the same shape as `LayeredTooltipTrigger`. There is nothing on the Root side of the Portal that needs `tone`/`size` to reach it, so `LayeredPopoverContent` owns them directly, matching `LayeredTooltipContent`'s precedent rather than Tabs'/Accordion's. Introducing a React-context relay from Root to Content here would solve a cascade problem that doesn't exist in this topology.

### `LayeredPopover` API Boundary

`LayeredPopover` exposes a five-part compound API: `LayeredPopover`, `LayeredPopoverTrigger`, `LayeredPopoverAnchor`, `LayeredPopoverContent`, `LayeredPopoverClose`. No `LayeredPopoverPortal` or `LayeredPopoverArrow` export — `LayeredPopoverContent` owns `Popover.Portal` and an internal `Popover.Arrow` directly, gated by a `showArrow` prop, the same internal-Arrow pattern as `LayeredTooltipContent`.

`LayeredPopoverContent` omits `asChild` from its public prop type (rather than silently breaking it), the same reasoning `LayeredAccordionContent`/`LayeredAccordionTrigger` used: Content always renders a fixed internal body wrapper plus an optional `Popover.Arrow` as siblings, which violates Radix Slot's single-child contract for `asChild`.

`LayeredPopoverContent` forwards its single public `forceMount` prop to *both* `Popover.Portal` and `Popover.Content`, not just Content. Radix Popover gates Presence separately at the Portal level and the Content level; forwarding `forceMount` to only one leaves the other's mount state uncontrolled, which would silently break consumers driving their own exit-animation libraries.

`LayeredPopoverClose` follows `LayeredToastClose`'s three-mode discriminated union (default internal glyph / explicit children / `asChild`, see "`LayeredToast` Close: Three Explicit Modes" above) rather than `LayeredDialogClose`'s internal-only-plus-generic-export split. This is a deliberate divergence from the more recently added Dialog precedent: Dialog's opinionated corner X lives inside `LayeredDialogContent` because Dialog always has one fixed chrome region to put it in, and `LayeredDialogClose` stays a fully generic, styleless export for footer actions. Popover Content is free-form with no such fixed chrome region — like Toast, there is no single "Content owns the chrome" answer — so the opinionated glyph lives in the exported `LayeredPopoverClose` itself, and omitting it entirely (dismissing only via Escape/outside-click) is a fully valid, unstyled-by-default usage.

**No `Title`/`Description` parts.** An earlier planning draft for this component assumed `@radix-ui/react-popover` exposes `Popover.Title`/`Popover.Description` primitives analogous to `@radix-ui/react-dialog`'s, wired to `aria-labelledby`/`aria-describedby` on Content. Before implementing that shape, the exact pinned package (`@radix-ui/react-popover@1.1.23`) was installed and its runtime exports and `.d.ts` inspected directly: it exports only `Popover`/`Root`, `Anchor`, `Trigger`, `Portal`, `Content`, `Close`, `Arrow` — no `Title` or `Description`, and never has across any published version. That pairing is specific to Radix Dialog's modal accessible-name requirement; Popover's accessibility model doesn't use it. `LayeredPopover` therefore does not export `LayeredPopoverTitle`/`LayeredPopoverDescription`, and does not fabricate plain non-Radix-backed wrappers with the same names — doing so would add API surface with neither genuine Radix semantics nor a demonstrated layout need. `LayeredPopoverContent` is fully free-form: consumers compose ordinary headings, paragraphs, labels, form controls, and other Layered components inside it directly. Consumers are responsible for ensuring `LayeredPopoverTrigger` (or its `asChild` target) has an accessible name, and that Content contains meaningful semantic structure appropriate to its purpose — `LayeredPopover` does not automatically wire a title or description to Content, and should not be described as having Dialog-style `Title`/`Description` semantics.

### `LayeredPopover` Content Casing and Body-Scroll Structure

`LayeredPopoverContent` (the outer, positioned Radix `Popover.Content` element) owns position, z-index, casing (border/radius/surface/shadow), motion, and the Arrow, and stays `overflow: visible` — the internal `.layered-popover-content__body` wrapper (an ordinary `div`, not a Radix part) owns padding, text wrapping, and vertical scrolling via `max-block-size` keyed off `var(--radix-popover-content-available-height)`. This split exists because the Arrow is a *sibling* of the body inside Content, not a body child; if scrolling/`overflow: hidden` were applied to the outer Content element instead, an Arrow poking slightly outside the body's content box (the same allowance `LayeredTooltipContent`'s Arrow relies on) would be clipped. Width is similarly constrained on the outer Content via `max-width: min(90vw, <size-ceiling>px, var(--radix-popover-content-available-width))`, not on the body.

### `LayeredToast` Compositional Boundary

`LayeredToast` v1 is **compositional only** — no `useToast` hook, no global toaster/store component, no imperative `toast()` function. This is a deliberate boundary, not an oversight: every prior Radix-backed component in this repository (Dialog, Tooltip, Tabs, Accordion) is driven entirely by props and consumer-owned state, and no component anywhere in `registry/` maintains global state. Introducing one for Toast alone would be a new architectural pattern grafted on without repository precedent.

A consumer must own:
- Mounting one `LayeredToastProvider` and one `LayeredToastViewport` (see mounting guidance below).
- Their own state representing which toasts are currently visible (a boolean per toast, or an array/queue of toast records) and rendering one `<LayeredToast open={...} onOpenChange={...}>` per visible entry.
- Any queueing, deduplication, or maximum-visible-count policy — Layered UI enforces none of these in v1.

Layered UI owns: casing, tone, the compound API surface, internal grid layout (see below), motion, swipe styling, and shared z-index. This division does not predetermine a future notification-service API built atop `LayeredToast` — that would be a distinct, separately-evaluated addition, the same way `LayeredCombobox`'s primitive choice remains undecided rather than implied by prior components.

### `LayeredToast` Provider Defaults

Unlike `LayeredTooltipProvider` (which overrides `delayDuration`/`skipDelayDuration` with a stated hover-scan rationale), `LayeredToastProvider` changes **none** of Radix's defaults: `duration` (`5000`), `swipeDirection` (`"right"`), `swipeThreshold` (`50`), and `label` (`"Notification"`) all pass through untouched. No UX case comparable to Tooltip's justified the deviation, and AGENTS.md requires any changed default to be justified — so the honest choice here was to leave Radix's own values in place rather than override them without a reason.

`LayeredToastProvider` is structurally required (Root/Action/Close all read its context) and must wrap the portion of the tree that can produce toasts — in practice, once, near the application root.

### `LayeredToast` Viewport: Mounting, Positioning, and Swipe Independence

`LayeredToastViewport` is **not** an automatically body-portaled element the way `LayeredDialogContent`'s `Dialog.Portal` is. Radix's `Toast.Root` portals itself into whatever DOM node the rendered `Toast.Viewport` occupies — but the Viewport element itself renders exactly where its JSX is written, as an ordinary `position: fixed` element. Consumers must mount `LayeredToastViewport` themselves, near the application root, outside any transformed, overflow-clipped, or locally-stacked ancestor — a `position: fixed` descendant of a `transform`-bearing ancestor is repositioned relative to that ancestor instead of the viewport, which would silently defeat both the fixed placement and the shared z-index below.

`LayeredToastViewport` exposes one Layered-specific prop:

```ts
position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // default "bottom-right"
```

These names are **physical**, not logical — `left` always means physical left and does not flip under `dir="rtl"`. This is intentional: the prop name says "left"/"right", so silently swapping it under RTL would contradict the name. A future logical `top-start`/`top-end` variant would be a separate, additive prop, not a redefinition of this one. Internal Toast spacing and text flow still use logical CSS properties.

`position` and Radix `Provider`'s `swipeDirection` are **independent props on independent components** — `LayeredToastViewport` cannot reach into `LayeredToastProvider`'s context to change it, and does not attempt to. `position="bottom-right"` (the default) and Radix's own default `swipeDirection="right"` form a coherent pairing out of the box, but a consumer switching to a left-anchored position is responsible for also setting `swipeDirection="left"` on the Provider — the laboratory's position selector demonstrates updating both together. Layered UI does not infer one from the other.

Toast stacking uses **normal DOM flow only** — `flex-direction: column`, never `column-reverse`, `row-reverse`, or CSS `order`. Visual order always matches DOM order and keyboard tab order; the Viewport's `position` only controls where the (always normal-flow) stack is anchored on screen, not its internal ordering. Insertion order (append vs. prepend) is entirely the consumer's responsibility, expressed by how they update their own state array.

### `LayeredToast` Root Layout: Grid Areas, Not Child Inspection

Unlike `LayeredDialogContent`, which partitions its children into header/body/footer regions via `Children.forEach`, `LayeredToast`'s Root renders its children completely untouched — no `Children.forEach`, no `Children.map` for layout, no cloning, no component-identity comparisons. `LayeredToastTitle`, `LayeredToastDescription`, `LayeredToastAction`, and `LayeredToastClose` each carry a fixed CSS class, and Root's own `display: grid` with named `grid-template-areas` places them by class, not by inspecting the React element tree. This was a deliberate divergence from the Dialog precedent: child-tree partitioning is brittle under fragments, conditional wrappers, `asChild`, and other composition patterns that Toast's simpler structure doesn't need to accommodate. Root width remains Viewport-controlled (`inline-size: 100%` of the Viewport's fixed/responsive width), not content-driven, and long Title/Description text wraps within the grid's content column without pushing Action or Close outside the casing.

### `LayeredToast` Close: Three Explicit Modes

`LayeredToastClose` resolves the same "does the opinionated glyph live inside the exported Close, or is Close a generic wrapper" question `LayeredDialogClose` answered differently (Dialog keeps the corner X internal to `LayeredDialogContent` and ships `LayeredDialogClose` as a fully generic, styleless wrapper). Toast instead makes the exported `LayeredToastClose` itself carry the default, because Toast has no equivalent "Content" component that could render an opinionated close button internally — placement is manual by design (see grid-areas above).

Three modes, discriminated by a TypeScript union so `asChild: true` without a single element child does not type-check:
1. **No children, no `asChild`**: renders the internal mechanical X glyph (CSS geometry, no icon package, no font glyph) with a default `aria-label` of `"Dismiss notification"`, overridable via `closeLabel`.
2. **Explicit children, no `asChild`**: renders the supplied children in place of the glyph; the consumer's own text/content supplies the accessible name, and no `aria-label` is forced.
3. **`asChild: true`**: requires exactly one element child (Radix `Slot`'s own contract), renders no internal glyph, and injects no second child — `className` still merges onto the consumer's element.

### `LayeredToast` Shared Z-Index and the Modal-Focus Distinction

`LayeredToastViewport` — not individual `LayeredToast` Root elements — owns the z-index, since the Viewport is the one stacking-context anchor for the whole toast stack (Toast Roots are siblings inside it and need no independent value). It consumes the shared scale via the same three-level fallback established in `bd164ab`: `var(--layered-toast-z, var(--layered-z-toast, 3000))`.

This is the component whose implementation was the direct trigger for introducing that shared scale in the first place (see "Shared Overlay-Stack Z-Index Scale" below) — Toast needed to visually clear Dialog (a toast confirming an in-progress dialog action must render above it) while a tooltip anchored to a toast's Action or Close still needed to clear the toast, and per-component independent numbers made that ordering accidental rather than deliberate.

**Z-index is a visual-order guarantee only — it is not a focus or modality guarantee.** A `LayeredDialog`'s Radix focus trap makes everything outside the dialog content inert to keyboard/screen-reader navigation while it's open; the shared z-index scale making a Toast render *visually* above an open Dialog does **not** make that Toast's Action or Close button keyboard-reachable through the trap. Consequently: a Toast shown while a Dialog is open must remain safe to ignore, must not carry a response the user is required to make before proceeding, and any interaction that genuinely requires a response belongs in `LayeredDialog`/a future `LayeredAlertDialog`, not `LayeredToast`. The "Toast visible while LayeredDialog is open" laboratory example validates visual stacking and announcement only, not interactive focus reachability through the trap — that distinction is deliberate and should not be re-litigated by future components without new evidence.

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
| **Component Inventory** | 15 published items (`foundation`, `button`, `panel`, `input`, `select`, `display-card`, `textarea`, `checkbox`, `switch`, `dialog`, `tooltip`, `tabs`, `accordion`, `toast`, `popover`) | Planned directions: `LayeredCombobox`, `LayeredDropdownMenu` |
| **Styling System** | Plain CSS with semantic custom property token groups | Maintained plain CSS architecture (no utility frameworks) |
| **Motion System** | Plain CSS transitions for hover/press/focus; `LayeredDialog` adds CSS-only entrance/exit keyed on Radix `data-state`; `LayeredTooltip` adds CSS-only opacity + small directional-travel transitions keyed on Radix `data-state`/`data-side`; `LayeredTabs` adds a short CSS-only engagement transition on the active Trigger only, with instant (unanimated) content switching; `LayeredAccordion` adds a CSS-only block-size open/close transition driven by Radix's `--radix-accordion-content-height`, resolving to a static `auto`/`0` at rest; `LayeredToast` adds CSS-only position-aware entrance/exit keyed on Radix `data-state`, plus direct pointer-following swipe transforms keyed on `data-swipe`/`data-swipe-direction` and the `--radix-toast-swipe-*` custom properties (Reveal/Disengage vocabulary, no new terms); `LayeredPopover` adds a single CSS-only open animation and a single close animation, with travel direction expressed through `data-side`-keyed CSS custom properties rather than a separate `animation-name` per side, so a collision-triggered `data-side` change on an already-open Popover updates only the (at-rest) travel variables instead of replaying the entrance | Optional `layered-motion` registry item with GSAP choreography |
| **Behavioral Primitives** | Native HTML elements (`<button>`, `<input>`, `<select>`); Radix (`@radix-ui/react-dialog@1.1.23`) for `LayeredDialog`; Radix (`@radix-ui/react-tooltip@1.2.16`) for `LayeredTooltip`; Radix (`@radix-ui/react-tabs@1.1.21`) for `LayeredTabs`; Radix (`@radix-ui/react-accordion@1.2.20`) for `LayeredAccordion`; Radix (`@radix-ui/react-toast@1.2.23`) for `LayeredToast`; Radix (`@radix-ui/react-popover@1.1.23`) for `LayeredPopover` | `LayeredCombobox` primitive undecided |
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

This was introduced when `LayeredToast` became the third overlay-based component, resolving the question `LayeredTooltip`'s docs left deferred (below, kept for history). The ordering is deliberate, not numeric happenstance: `LayeredTooltip` sits topmost because a tooltip may annotate a control inside an open dialog, an open popover/menu, or a toast's action button, and must clear all of them. `--layered-z-popover` was reserved ahead of `LayeredPopover`/`LayeredDropdownMenu` existing; `LayeredPopover` is now its first consumer, and the token remains shared with a future `LayeredDropdownMenu` rather than each menu-like component picking its own number.

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

### `LayeredToast` Z-Index Strategy

`LayeredToastViewport` consumes `--layered-z-toast` (`3000`) from the shared scale, via its component-local fallback property `--layered-toast-z`. See "`LayeredToast` Shared Z-Index and the Modal-Focus Distinction" above for the full ownership rationale (Viewport, not individual Toast Roots) and the important caveat that this z-index is a visual-order guarantee only, not a modal-focus guarantee.

### `LayeredPopover` Z-Index Strategy

`LayeredPopoverContent` (the outer, positioned `Popover.Content` element — not a Portal wrapper, which Radix does not render as a stylable element) consumes `--layered-z-popover` (`2000`) from the shared scale, via its component-local fallback property `--layered-popover-z`: `var(--layered-popover-z, var(--layered-z-popover, 2000))`. This is the token's first consumer, giving `LayeredPopover` a coherent default position above Dialog content (`1010`) and below Toast (`3000`)/Tooltip (`4000`) out of the box.

As with `LayeredToast`, this is a visual-order guarantee only, not a focus or modality guarantee: a Popover opened from inside an open `LayeredDialog` renders visually above the Dialog casing via the shared scale, but the Dialog's Radix focus trap remains scoped to the Dialog's own content — Popover's own focus containment (modal or non-modal, per its `Root` `modal` prop) is independent of z-order. A custom `container` passed to `LayeredPopoverContent` may create its own stacking context; the shared z-index cannot escape a stacking context established by that container, the same caveat documented for Dialog/Tooltip's `container` prop.
