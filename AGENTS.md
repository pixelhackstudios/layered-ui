# Layered UI — Workspace Rules

## Project Purpose

Layered UI is a React component system built around tactile, constructed
interface elements: casings, trenches, dimensional faces, controlled
lighting, and physical interaction states.

It must not drift toward generic Tailwind, shadcn, SaaS-dashboard, or
flat rounded-card aesthetics.

## Sources of Truth

Use this priority order:

1. Current explicit user instructions.
2. User-approved screenshots, rendered prototypes, and visual decisions.
3. This AGENTS.md file.
4. Applicable files under `.agents/skills/`.
5. Existing project conventions.
6. General agent defaults.

Visual references outrank prose descriptions when they conflict.

## Technical Baseline

- Vite
- React
- TypeScript
- Plain CSS
- CSS custom properties for design tokens
- No Tailwind
- No shadcn/ui
- No component dependency without explicit approval

## Component Rules

- Use native semantic controls before custom substitutes.
- Preserve keyboard access, focus visibility, reduced-motion support,
  disabled states, and appropriate ARIA behaviour.
- Separate structural tokens from component-specific appearance tokens.
- Components must expose intentional variants rather than arbitrary
  styling escape hatches.
- Do not make every surface visually heavy. Layered construction should
  create hierarchy, not visual noise.

## Validation

Before reporting a frontend change complete:

- Run the relevant build and type checks.
- Inspect the rendered component.
- Exercise interaction, keyboard, focus, disabled, and responsive states.
- Compare against approved visual references when they exist.
- State exactly what was and was not tested.