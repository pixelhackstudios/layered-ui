# Layered UI Registry Architecture & Release Process

This document details the item taxonomy, dependency resolution syntax, distribution structure, and release checklist for Layered UI registry items.

## Registry Item Taxonomy

Layered UI uses the standard `shadcn` registry schema:

- **`registry:style`**: Foundation packages containing design tokens, CSS variables, and base theme rules. Target directory: `@styles/layered-ui/`.
- **`registry:ui`**: Reusable React UI components and associated CSS files. Target directory: `@ui/layered/`.

## Current Published Registry Items

The canonical manifest (`registry.json`) defines nine published items:

| Item Name | Item Type | Canonical Source Paths | Generated Output Artifact | Registry Dependencies |
|---|---|---|---|---|
| `layered-foundation` | `registry:style` | `registry/foundations/layered-foundation/tokens.css` | `public/r/layered-foundation.json` | None |
| `layered-button` | `registry:ui` | `registry/components/layered-button/LayeredButton.tsx`<br>`registry/components/layered-button/LayeredButton.css` | `public/r/layered-button.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-panel` | `registry:ui` | `registry/components/layered-panel/LayeredPanel.tsx`<br>`registry/components/layered-panel/LayeredPanel.css` | `public/r/layered-panel.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-input` | `registry:ui` | `registry/components/layered-input/LayeredInput.tsx`<br>`registry/components/layered-input/LayeredInput.css` | `public/r/layered-input.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-select` | `registry:ui` | `registry/components/layered-select/LayeredSelect.tsx`<br>`registry/components/layered-select/LayeredSelect.css` | `public/r/layered-select.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-display-card` | `registry:ui` | `registry/components/layered-display-card/LayeredDisplayCard.tsx`<br>`registry/components/layered-display-card/LayeredDisplayCard.css` | `public/r/layered-display-card.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-textarea` | `registry:ui` | `registry/components/layered-textarea/LayeredTextarea.tsx`<br>`registry/components/layered-textarea/LayeredTextarea.css` | `public/r/layered-textarea.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-checkbox` | `registry:ui` | `registry/components/layered-checkbox/LayeredCheckbox.tsx`<br>`registry/components/layered-checkbox/LayeredCheckbox.css` | `public/r/layered-checkbox.json` | `pixelhackstudios/layered-ui/layered-foundation` |
| `layered-switch` | `registry:ui` | `registry/components/layered-switch/LayeredSwitch.tsx`<br>`registry/components/layered-switch/LayeredSwitch.css` | `public/r/layered-switch.json` | `pixelhackstudios/layered-ui/layered-foundation` |

## Registry Address & Dependency Syntax

### Public GitHub Installation Syntax

To install a published registry item from an external project, users run the `shadcn` CLI with the full GitHub owner, repository, and item path:

```bash
npx shadcn@latest add pixelhackstudios/layered-ui/layered-button
```

### Same-Repository Registry Dependency Syntax

Within `registry.json`, all UI components must declare their internal registry dependencies using the full GitHub registry address format:

```json
"registryDependencies": [
  "pixelhackstudios/layered-ui/layered-foundation"
]
```

### Rationale for Full Registry Addresses

The `shadcn` CLI requires fully qualified addresses (`<owner>/<repo>/<item>`) when fetching registry items from GitHub repositories. Using shorthand item names (such as `"layered-foundation"`) causes cross-repository dependency resolution failures during consumer installation. Full qualification ensures the CLI correctly resolves and installs nested registry dependencies.

## Public Artifact Policy (Policy A)

- `public/r/` contains committed generated artifacts suitable for direct static hosting.
- Whenever `registry.json` or source files under `registry/` are updated, the generated artifacts in `public/r/` must be rebuilt using `npx shadcn build` and committed.
- Remote installations fetch component definitions directly from these committed JSON files.

## Registry Build & Validation Commands

To build and validate registry artifacts:

```bash
# Build registry JSON artifacts into public/r/
npx shadcn build

# Validate registry manifest and JSON schema integrity
npx shadcn registry validate
```

## Clean Fixture Installation Testing

Before publishing registry changes, installation must be verified against a clean external React + Vite TypeScript project:

1. Run `npx shadcn@latest add pixelhackstudios/layered-ui/<item-name>` in a clean test project.
2. Confirm that both the component files (`@ui/layered/`) and `layered-foundation` (`@styles/layered-ui/tokens.css`) are installed without errors.
3. Verify that the installed component compiles and renders cleanly.

## Rules Governing Usage vs. Registry Dependencies

- **Demonstration Imports**: Usage of components or foundations inside `src/App.tsx` or laboratory files is for local visual testing only. Laboratory imports do **not** create registry dependencies.
- **Canonical Imports**: Registry dependencies declared in `registry.json` MUST reflect actual canonical source imports within `registry/components/`. If a component imports or references foundation tokens, `pixelhackstudios/layered-ui/layered-foundation` must be listed as a `registryDependency`.

## Release Checklist for Adding a New Registry Item

Follow this checklist when adding a new component to the registry:

- [ ] **1. Create Source Files**: Place canonical TSX and CSS files under `registry/components/<item-name>/`.
- [ ] **2. Register in `registry.json`**: Add the item definition to `registry.json`, ensuring `registryDependencies` includes `"pixelhackstudios/layered-ui/layered-foundation"`.
- [ ] **3. Import in Laboratory**: Add demonstration usage in `src/App.tsx` to test visual behavior and interactive states.
- [ ] **4. Build Registry Artifacts**: Run `npx shadcn build` to generate `public/r/<item-name>.json` and update `public/r/registry.json`.
- [ ] **5. Validate Registry**: Run `npx shadcn registry validate` to confirm schema compliance.
- [ ] **6. Run Build & Type Checks**: Run `npm run build` and `npm run lint`.
- [ ] **7. Verify External Installation**: Test installing the component from a clean project using `npx shadcn@latest add pixelhackstudios/layered-ui/<item-name>`.
