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

The repository currently publishes six canonical registry items:

1. **`layered-foundation`** (`registry:style`): Base design tokens, structural depths, radii, motion definitions, and dual-theme variable maps.
2. **`layered-button`** (`registry:ui`): Tactile button control with structural casing, trench channel, and dimensional face.
3. **`layered-panel`** (`registry:ui`): Structural container panel with casing, trench, header, content, and footer surfaces.
4. **`layered-input`** (`registry:ui`): Form input control with structural casing and recessed input surface.
5. **`layered-select`** (`registry:ui`): Form select control with structural casing, recessed surface, and custom indicator.
6. **`layered-display-card`** (`registry:ui`): Display card with recessed screen surface, lighting vignette, glare effect, and metadata surface.

## Component Availability & Status

Item status is categorized as follows:

- **Implemented**: The six published registry items listed above (`layered-foundation`, `layered-button`, `layered-panel`, `layered-input`, `layered-select`, `layered-display-card`).
- **Planned Component Directions**: Future component explorations currently include `LayeredTextarea`, `LayeredCheckbox`, `LayeredSwitch`, `LayeredDialog`, `LayeredToast`, `LayeredTooltip`, and `LayeredCombobox` (note: `LayeredCombobox` behavioral primitive choice remains an open, undecided decision).
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
- Six registry items are currently published and verified.
- The broader component inventory is planned but not yet implemented.
- Visual and interaction testing patterns are still evolving.

This repository does not claim production readiness, comprehensive accessibility certification, or browser support beyond current modern greenfield browser baselines.
