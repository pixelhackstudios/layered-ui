# Layered UI Registry Architecture & Release Process

This document details the item taxonomy, dependency resolution syntax, distribution structure, and release checklist for Layered UI registry items.

## Registry Item Taxonomy

Layered UI uses the standard `shadcn` registry schema:

- **`registry:style`**: Foundation packages containing design tokens, CSS variables, and base theme rules. Target directory: `@styles/layered-ui/`.
- **`registry:ui`**: Reusable React UI components and associated CSS files. Target directory: `@ui/layered/`.

## Current Published Registry Items

The canonical manifest (`registry.json`) defines seventeen published items:

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
| `layered-dialog` | `registry:ui` | `registry/components/layered-dialog/LayeredDialog.tsx`<br>`registry/components/layered-dialog/LayeredDialog.css` | `public/r/layered-dialog.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-dialog@1.1.23` (npm) |
| `layered-tooltip` | `registry:ui` | `registry/components/layered-tooltip/LayeredTooltip.tsx`<br>`registry/components/layered-tooltip/LayeredTooltip.css` | `public/r/layered-tooltip.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-tooltip@1.2.16` (npm) |
| `layered-tabs` | `registry:ui` | `registry/components/layered-tabs/LayeredTabs.tsx`<br>`registry/components/layered-tabs/LayeredTabs.css` | `public/r/layered-tabs.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-tabs@1.1.21` (npm) |
| `layered-accordion` | `registry:ui` | `registry/components/layered-accordion/LayeredAccordion.tsx`<br>`registry/components/layered-accordion/LayeredAccordion.css` | `public/r/layered-accordion.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-accordion@1.2.20` (npm) |
| `layered-toast` | `registry:ui` | `registry/components/layered-toast/LayeredToast.tsx`<br>`registry/components/layered-toast/LayeredToast.css` | `public/r/layered-toast.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-toast@1.2.23` (npm) |
| `layered-popover` | `registry:ui` | `registry/components/layered-popover/LayeredPopover.tsx`<br>`registry/components/layered-popover/LayeredPopover.css` | `public/r/layered-popover.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-popover@1.1.23` (npm) |
| `layered-dropdown-menu` | `registry:ui` | `registry/components/layered-dropdown-menu/LayeredDropdownMenu.tsx`<br>`registry/components/layered-dropdown-menu/LayeredDropdownMenu.css` | `public/r/layered-dropdown-menu.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@radix-ui/react-dropdown-menu@2.1.24` (npm) |
| `layered-combobox` | `registry:ui` | `registry/components/layered-combobox/LayeredCombobox.tsx`<br>`registry/components/layered-combobox/LayeredCombobox.css` | `public/r/layered-combobox.json` | `pixelhackstudios/layered-ui/layered-foundation` (registry); `@base-ui/react@1.6.0` (npm) |

`layered-dialog` was the first published item to declare an npm `dependencies` entry alongside its `registryDependencies` entry. `layered-tooltip` is the second, following the same convention: `@radix-ui/react-tooltip` pinned exactly at `1.2.16`, no caret, verified via `npm view @radix-ui/react-tooltip@1.2.16 peerDependencies` (confirms `react`/`react-dom` `^19.0` support) before pinning. `layered-tabs` is the third, pinned exactly at `1.1.21`, verified the same way via `npm view @radix-ui/react-tabs@1.1.21 peerDependencies` (confirms `react`/`react-dom` `^19.0` support). `layered-accordion` is the fourth, pinned exactly at `1.2.20`, verified via `npm view @radix-ui/react-accordion@1.2.20 peerDependencies` (confirms `react`/`react-dom` `^19.0` support). `layered-toast` is the fifth, pinned exactly at `1.2.23`, verified via `npm view @radix-ui/react-toast@1.2.23 peerDependencies` (confirms `react`/`react-dom` `^19.0` support). `layered-popover` is the sixth, pinned exactly at `1.1.23`, verified via `npm view @radix-ui/react-popover@1.1.23 peerDependencies` (confirms `react`/`react-dom` `^19.0` support) — the exact package was also installed and its runtime exports/`.d.ts` inspected directly before finalizing the public API, which is what caught that it does not export `Title`/`Description` primitives (see `docs/architecture.md`, "`LayeredPopover` API Boundary"). `layered-dropdown-menu` is the seventh, pinned exactly at `2.1.24`, verified via `npm view @radix-ui/react-dropdown-menu@2.1.24 peerDependencies` (confirms `react`/`react-dom` `^19.0` support). It reuses the `--layered-z-popover` layer rather than introducing a new z-index token, since `tokens.css`'s "Overlay Stack" comment already reserved that layer for "Popover/Menu" — both are anchored, non-modal-by-default overlays with no ordering requirement between them.

`layered-combobox` is the eighth, and the first published item built on **Base UI** rather than Radix — Radix has no dedicated Combobox primitive (Radix's own docs describe accessible combobox behavior as unusually difficult to hand-roll correctly), so `@base-ui/react` (the current name of the package formerly published as `@base-ui-components/react`, confirmed via `npm view @base-ui-components/react deprecated`) was adopted specifically for its `@base-ui/react/combobox` export. Pinned exactly at `1.6.0`, verified via `npm view @base-ui/react@1.6.0 peerDependencies` (confirms `react`/`react-dom` `^17 || ^18 || ^19` support); its `date-fns`/`@date-fns/tz` peer dependencies are `peerDependenciesMeta`-optional (only required by Base UI's date-picker components) and are not installed by this item. Base UI's state-to-attribute convention differs from Radix's: individual boolean `data-*` attributes (`data-open`, `data-selected`, `data-highlighted`, `data-starting-style`/`data-ending-style` for enter/exit transitions) rather than Radix's single `data-state="open"|"closed"`, and `Combobox.Arrow` renders a bare `<div>` with no built-in SVG shape (unlike Radix's `Popover.Arrow`), so the directional triangle is drawn with CSS borders instead of `fill`. Single-select only for this first pass — Base UI's `multiple`/chips model is a materially different token-input UI, deliberately left out rather than half-wired (see `LayeredCombobox.tsx`'s `LayeredCombobox` doc comment).

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

### SHA-Pinned Verification Before Publishing to `main`

New or changed registry items are first pushed to a `verify/<item-name>` branch and re-verified against that exact commit on GitHub before being fast-forwarded to `main` (see release checklist below). Two install address forms exist for pinning to a commit; only one is confirmed to resolve on the current `shadcn` CLI version:

```bash
# Preferred — confirmed working (owner/repo/item#<FULL_SHA>):
npx shadcn@latest add "pixelhackstudios/layered-ui/layered-tooltip#43fa325d6dacc92754544ee5e8a1a6481d32cbc1"

# Fallback — direct URL to the committed build artifact at that commit,
# for use if the shorthand above ever regresses again:
npx shadcn@latest add "https://raw.githubusercontent.com/pixelhackstudios/layered-ui/43fa325d6dacc92754544ee5e8a1a6481d32cbc1/public/r/layered-tooltip.json"
```

The `owner/repo@<SHA>/item` ordering (SHA attached to the repo segment rather than the item segment) 404s against `ui.shadcn.com`'s resolution endpoint on this CLI version — use `owner/repo/item#<SHA>` instead. Both forms were confirmed during `layered-tooltip`'s (Phase 8) release verification.

### Registry Dependencies Are Not Covered by SHA-Pinning

SHA-pinned verification applies to the requested registry item only.

Registry dependencies referenced by that item are resolved separately from the repository's currently published registry. Before verifying a dependent item:

1. Confirm every registry dependency commit is already present on `origin/main`.
2. Fetch `origin/main` and verify the required dependency content remotely.
3. After installation, inspect the installed dependency content — not only its path — to confirm the expected version was resolved.

This was discovered during `layered-toast`'s (Phase 11) release verification: `bd164ab` (the shared overlay z-index scale added to `layered-foundation`) had only been committed locally, not pushed to `origin/main`, when `layered-toast#a429f12` was first SHA-pinned and fixture-installed. The fixture still installed successfully — `layered-toast`'s own file was correctly resolved at the pinned SHA — but the nested `layered-foundation` dependency it declares (unpinned, per the standard `registryDependencies` syntax) resolved against `origin/main`'s HEAD at install time, which did not yet include the z-index scale. The installed `tokens.css` was silently missing the new tokens, even though the top-level item installed "successfully." Re-verification only caught this because the installed dependency's *content* was diffed against canonical source, not just its presence at the expected path.

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
