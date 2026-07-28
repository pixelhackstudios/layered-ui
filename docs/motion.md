# Layered UI Motion Architecture

This document describes the motion policy, physical motion vocabulary, reduced motion requirements, and optional GSAP integration rules for Layered UI.

## Motion Policy & Architecture Split

Layered UI separates motion into two distinct tiers:

1. **CSS Transitions (Foundation Layer)**: Built-in, CSS-only transitions for standard interaction states.
2. **GSAP Physical Choreography (Optional Extension Layer)**: Advanced mechanical motion isolated behind an optional future `layered-motion` registry package.

### 1. CSS Transitions (Foundation Layer)

Standard controls and basic component states rely exclusively on plain CSS transitions. CSS handles:

- Hover brightness and glare opacity shifts.
- Button press depth compression.
- Focus ring appearance and fade transitions.
- Disabled state transitions.

Simple controls (`LayeredButton`, `LayeredInput`, `LayeredSelect`, `LayeredPanel`, `LayeredDisplayCard`) **must not** depend on GSAP or JavaScript animation libraries.

### 2. GSAP Physical Choreography (Optional Extension Layer)

Complex mechanical motion (such as staged modal assembly, physical switch snapping, and spring overshoot rebound) is reserved for GSAP choreography.

- GSAP is strictly isolated behind an optional `layered-motion` registry item.
- Base style (`layered-foundation`) and foundational UI components never import or depend on GSAP.
- Consumers who do not require physical choreography can use Layered UI without installing GSAP.

## Physical Motion Vocabulary

Layered UI uses physical interaction terms to define motion behavior:

- **Compress**: Controls move inward along the Z-axis when pressed, reducing elevation and deepening trench shadows.
- **Rebound**: Controlled mechanical release when press pressure is removed, featuring a subtle overshoot.
- **Engage**: Switches and toggles snap decisively into their active position.
- **Assemble**: Complex structural containers (such as `LayeredDialog`) arrive in sequence: casing frame first, surface backing second, header and content third.
- **Disengage**: Fast, controlled reverse exit sequence when dismissing a container or modal.
- **Signal**: Restrained status pulse or highlight flash indicating a state update.
- **Reveal**: Displays illuminate, un-vignette, or uncover recessed content.

## Reduced Motion Requirements

Accessibility and motion sensitivity are mandatory design constraints:

Every motion implementation must provide a `prefers-reduced-motion` path that removes unnecessary travel, bounce, and delay while preserving the state change.

Under `prefers-reduced-motion: reduce`, spatial travel distance, spring overshoot, and staggered entry delays are disabled, while target state updates, opacity shifts, and focus indicators remain instantaneous and visible.

## Radix Primitives and GSAP Integration

For future complex overlay components (such as `LayeredDialog`):

- **Radix Primitives**: Manage DOM accessibility lifecycle, focus trapping, portal mounting, screen reader ARIA attributes, and keyboard dismissal (Escape key).
- **GSAP Choreography**: Handles physical entrance assembly and exit disengage animations via callback hooks or lifecycle events.

This separation ensures accessible behavior is independent of visual animation.

## Purpose-Driven Motion Rule

Motion in Layered UI must always serve a physical or mechanical purpose:

- Motion **must** communicate structural mechanics, depth relationships, or explicit state changes.
- Motion **must not** serve as constant, ambient, or decorative distraction.

## Current Implementation Status

`layered-motion` and GSAP physical choreography are approved architectural specifications, but are **not yet implemented**. All currently published components rely exclusively on plain CSS transitions.
