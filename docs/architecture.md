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

- **Native HTML First**: Simple and intermediate controls (`LayeredButton`, `LayeredInput`, `LayeredSelect`, `LayeredDisplayCard`, `LayeredPanel`, `LayeredTextarea`, `LayeredCheckbox`) use semantic HTML elements (`<button>`, `<input>`, `<select>`, `<section>`, `<textarea>`, `<input type="checkbox">`) to ensure native browser keyboard handling, form submission integration, and accessibility behavior.
- **Radix Primitives for Complex Behavioral Controls**: Radix primitives are approved *exclusively* for complex behavioral controls where native HTML lacks standard accessible lifecycle management (such as overlay focus traps, portal mounting, escape key handling, and ARIA state management for `LayeredDialog`).
- **Undecided Behavioral Primitives**: `LayeredCombobox` is a planned direction whose behavioral dependency remains undecided (evaluating native `<datalist>`, custom ARIA keyboard navigation, or third-party primitives). It is not grouped under the approved Radix strategy.

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

- **Component Name Prefix**: All React components are named with the `Layered` prefix (`LayeredButton`, `LayeredPanel`, `LayeredInput`, `LayeredSelect`, `LayeredDisplayCard`, `LayeredDialog`).
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
| **Component Inventory** | 8 published items (`foundation`, `button`, `panel`, `input`, `select`, `display-card`, `textarea`, `checkbox`) | Planned directions: `LayeredSwitch`, `LayeredDialog`, `LayeredToast`, `LayeredTooltip`, `LayeredCombobox` |
| **Styling System** | Plain CSS with semantic custom property token groups | Maintained plain CSS architecture (no utility frameworks) |
| **Motion System** | Plain CSS transitions for hover/press/focus | Optional `layered-motion` registry item with GSAP choreography |
| **Behavioral Primitives** | Native HTML elements (`<button>`, `<input>`, `<select>`) | Radix approved for complex overlays (`LayeredDialog`); `LayeredCombobox` primitive undecided |
| **Distribution** | `shadcn` registry JSON artifacts in `public/r/` | Maintained Policy A committed static artifact publishing |
