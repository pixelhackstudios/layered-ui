# Layered UI

Layered UI is a tactile React component system built around constructed interface elements: casings, trenches, dimensional faces, controlled lighting, and physical interaction states.

It is implemented with **plain CSS** using semantic custom-property design tokens, and distributed as an **open-code** library using the `shadcn` registry format. Layered UI is visually completely distinct from standard shadcn/ui defaults and generic flat SaaS dashboard aesthetics.

## Visual Language

Layered UI constructs components using physical structural elements:

- **Casings**: Outer structural frames that define component boundaries, relief depth, and outer bevels.
- **Trenches**: Recessed shadow channels that isolate interactive faces and create structural separation.
- **Raised Controls**: Dimensional interactive elements elevated above casing planes that compress on interaction.
- **Recessed Surfaces**: Inset display screens and form input fields recessed into structural casings.
- **Controlled Lighting**: Directional highlights, bevel glare effects, and depth-defining shadows.
- **Physical Interaction States**: Distinct tactile feedback states for hover, press compression, engage, reveal, and focus.

## Design Themes

Layered UI provides two built-in visual themes:

- **Classic** (`classic`): Industrial dark aesthetic with slate casing, amber/copper accents, and subtle directional glare.
- **Field Hardware** (`field`): Tactical instrument aesthetic with high-contrast bronze, olive, and high-visibility status illumination.

Theme selection is controlled via the `data-theme="classic" | "field"` attribute on the HTML document root or container element.

## Published Registry Items

The repository currently publishes fifteen canonical registry items:

1. **`layered-foundation`** (`registry:style`): Base design tokens, structural depths, radii, motion definitions, and dual-theme variable maps.
2. **`layered-button`** (`registry:ui`): Tactile button control with structural casing, trench channel, and dimensional face.
3. **`layered-panel`** (`registry:ui`): Structural container panel with casing, trench, header, content, and footer surfaces.
4. **`layered-input`** (`registry:ui`): Form input control with structural casing and recessed input surface.
5. **`layered-select`** (`registry:ui`): Form select control with structural casing, recessed surface, and custom indicator.
6. **`layered-display-card`** (`registry:ui`): Display card with recessed screen surface, lighting vignette, glare effect, and metadata surface.
7. **`layered-textarea`** (`registry:ui`): Multiline text input control with structural casing and recessed writing surface.
8. **`layered-checkbox`** (`registry:ui`): Tactile native checkbox control with compact casing, recessed selector, and contained state indication.
9. **`layered-switch`** (`registry:ui`): Tactile native switch control with compact casing, recessed trench, and a mechanical paddle lever that travels between fixed engage/disengage detents.
10. **`layered-dialog`** (`registry:ui`): Tactile access-hatch dialog with structural outer casing, recessed inner content surface, and a compact corner-mounted mechanical close control, built on Radix Dialog for accessible overlay behavior. The first published component built on a Radix behavioral primitive rather than native HTML alone, and the first to expose a compound API (`LayeredDialog`, `LayeredDialogTrigger`, `LayeredDialogContent`, `LayeredDialogTitle`, `LayeredDialogDescription`, `LayeredDialogClose`, `LayeredDialogHeader`, `LayeredDialogFooter`).
11. **`layered-tooltip`** (`registry:ui`): Compact instrument-annotation tooltip with a recessed information surface, small directional pointer, and restrained tone accents, built on Radix Tooltip for accessible hover/focus overlay behavior. The second Radix-backed component; exposes a four-part compound API (`LayeredTooltipProvider`, `LayeredTooltip`, `LayeredTooltipTrigger`, `LayeredTooltipContent`) with the directional arrow rendered internally rather than as a separate export.
12. **`layered-tabs`** (`registry:ui`): Tactile mechanical selector rail with a recessed trench housing, individually seated tab faces, and a content surface visually docked to the active tab, built on Radix Tabs for accessible keyboard navigation, roving focus, and tab-panel ARIA relationships. The third Radix-backed component and the first non-overlay one (no portal, no z-index token); exposes a four-part compound API (`LayeredTabs`, `LayeredTabsList`, `LayeredTabsTrigger`, `LayeredTabsContent`) with `tone` and `tabsSize` owned by the Root so they cascade to both the rail and the content surface.
13. **`layered-accordion`** (`registry:ui`): Tactile vertical equipment access bank with one shared structural rack housing, individually seated hatch triggers, and content recessed beneath its own trigger, built on Radix Accordion for accessible single/multiple disclosure behavior, heading semantics, and keyboard navigation. The fourth Radix-backed component, the second non-overlay one, and deliberately vertical-only in v1; exposes a four-part compound API (`LayeredAccordion`, `LayeredAccordionItem`, `LayeredAccordionTrigger`, `LayeredAccordionContent`) with `tone` and `accordionSize` owned by the Root, and a heading level chosen per-Trigger via `headingLevel` rather than a separately exported Header part.
14. **`layered-toast`** (`registry:ui`): Tactile transient status cartridge with a shallow structural casing, restrained tone accent, and a compact mechanical close control, built on Radix Toast for accessible announcement, timer-pause, and swipe-to-dismiss behavior. The fifth Radix-backed component and the third overlay-based one; exposes a seven-part compound API (`LayeredToastProvider`, `LayeredToastViewport`, `LayeredToast`, `LayeredToastTitle`, `LayeredToastDescription`, `LayeredToastAction`, `LayeredToastClose`) with no Trigger part, since toasts are driven by consumer state rather than a click target. Compositional only in v1 — no hook, global store, or imperative `toast()` API. `LayeredToastViewport` exposes a `position` prop (physical `top-left`/`top-right`/`bottom-left`/`bottom-right`, default `bottom-right`) independent of Radix `Provider`'s own `swipeDirection`, which consumers pair explicitly. This is also the component that prompted introducing a shared overlay z-index scale (see Architecture) rather than each overlay component picking an independent number.
15. **`layered-popover`** (`registry:ui`): Tactile compact anchored access module with a recessed content surface, restrained tone accent, and an integrated directional Arrow, built on Radix Popover for accessible positioning, collision detection, and dismissal behavior. The sixth Radix-backed component and the first consumer of the previously-reserved `--layered-z-popover` token; exposes a five-part compound API (`LayeredPopover`, `LayeredPopoverTrigger`, `LayeredPopoverAnchor`, `LayeredPopoverContent`, `LayeredPopoverClose`) with no `Title`/`Description` parts, since `@radix-ui/react-popover` does not expose those Radix primitives (unlike Dialog) — Content remains free-form, and Layered does not fabricate `aria-labelledby`/`aria-describedby` wiring Radix itself does not provide. `LayeredPopoverContent` owns `tone` and `popoverSize`, following Tooltip's Content-owned-visual-props precedent rather than Tabs'/Accordion's Root-owned one, since Popover's Root has only one visual descendant across the Portal boundary. `Close` follows Toast's three-mode pattern (default glyph, explicit children, `asChild`) rather than Dialog's internal-only approach, since Popover Content has no fixed chrome region to inject a corner close into automatically.

## Component Availability & Status

Item status is categorized as follows:

- **Implemented**: The fifteen published registry items listed above (`layered-foundation`, `layered-button`, `layered-panel`, `layered-input`, `layered-select`, `layered-display-card`, `layered-textarea`, `layered-checkbox`, `layered-switch`, `layered-dialog`, `layered-tooltip`, `layered-tabs`, `layered-accordion`, `layered-toast`, `layered-popover`).
- **Planned Component Directions**: Future component explorations currently include `LayeredCombobox` and `LayeredDropdownMenu`, and a notification-service layer built atop `LayeredToast` (note: `LayeredCombobox`'s behavioral primitive choice remains an open, undecided decision, and no notification-service API is implied by `LayeredToast`'s v1 compositional design). `LayeredDialog` and `LayeredTooltip` establish that a compound API is permitted when component behavior genuinely requires composition; `LayeredTabs` and `LayeredAccordion` confirm the same for non-overlay components; `LayeredToast` confirms the same for a compound API with no Trigger part; `LayeredPopover` confirms Content can own visual props across a Portal boundary when Root has no second visual descendant to justify Root ownership. None of these are a predetermined template these future components must follow.
- **Intentionally Optional**: `layered-motion` (an approved, but not yet implemented, optional GSAP physical choreography layer).

## Installation

Install components into your project using the `shadcn` CLI with the full GitHub registry address:

```bash
npx shadcn@latest add pixelhackstudios/layered-ui/layered-button
```

```bash
npx shadcn@latest add pixelhackstudios/layered-ui/layered-panel
```

Installing any component automatically resolves its dependency on `pixelhackstudios/layered-ui/layered-foundation`. Components are copied directly into your project's component directory (e.g., `@ui/layered/` and `@styles/layered-ui/`). You own and control the installed source code.

## Documentation

- [Architecture](docs/architecture.md)
- [Registry and release process](docs/registry.md)
- [Motion architecture](docs/motion.md)

## Local Development

Commands for running the visual laboratory and validating registry artifacts:

```bash
# Install dependencies
npm install

# Run local Vite visual laboratory
npm run dev

# Run TypeScript type check and production build
npm run build

# Run ESLint check
npm run lint

# Build registry JSON artifacts to public/r/
npx shadcn build

# Validate registry manifest and generated artifacts
npx shadcn registry validate
```

## Project Status

Layered UI is in **early development**:
- Fifteen registry items are currently published and verified.
- The broader component inventory is planned but not yet implemented.
- Visual and interaction testing patterns are still evolving.

This repository does not claim production readiness, comprehensive accessibility certification, or browser support beyond current modern greenfield browser baselines.
