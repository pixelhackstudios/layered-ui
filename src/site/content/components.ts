/* Documentation content for every published registry item. Prop tables list
   the props Layered adds or constrains; each part also forwards the native
   element or primitive props named in `extends`. Example ids map to files in
   src/site/examples/<slug>/<id>.tsx, which are rendered live and shown as
   source from the same file. */

export type Category = "Actions" | "Forms" | "Display" | "Navigation" | "Overlays";

export const categories: { id: Category; summary: string }[] = [
  { id: "Actions", summary: "Controls that commit an action or open a set of them." },
  { id: "Forms", summary: "Native-first inputs housed in casings with recessed surfaces." },
  { id: "Display", summary: "Readouts, housings, and status markers." },
  { id: "Navigation", summary: "Selectors and disclosure banks for moving through content." },
  { id: "Overlays", summary: "Hatches, annotations, and cartridges that surface above the page." },
];

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PartDoc {
  name: string;
  extends?: string;
  description?: string;
  props: PropDoc[];
}

export interface ExampleDoc {
  id: string;
  title: string;
  description?: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  description: string;
  primitive: string;
  npm?: string;
  examples: ExampleDoc[];
  parts: PartDoc[];
  accessibility: string[];
}

const tone4 = `"neutral" | "copper" | "green" | "gold"`;
const size3 = `"small" | "medium" | "large"`;
const size2 = `"small" | "medium"`;

const toneProp = (fallback = "neutral"): PropDoc => ({
  name: "tone",
  type: tone4,
  default: `"${fallback}"`,
  description: "Accent family used for the face, fill, or state lighting.",
});

const fieldProps = (sizeName: string): PropDoc[] => [
  { name: "label", type: "ReactNode", required: true, description: "Visible label, wired to the control with htmlFor." },
  { name: "description", type: "ReactNode", description: "Helper text linked through aria-describedby." },
  { name: "error", type: "ReactNode", description: "Error message. Sets aria-invalid and lights the inner trench." },
  toneProp(),
  { name: sizeName, type: size3, default: `"medium"`, description: "Control height and type scale." },
  { name: "fullWidth", type: "boolean", default: "false", description: "Stretch the casing to its container." },
];

export const componentDocs: ComponentDoc[] = [
  /* ------------------------------------------------------------ Actions */
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    summary: "A raised face seated in a trench that compresses when pressed.",
    description:
      "The reference construction for the whole system: an outer casing, a trench channel, and a dimensional face lit from below. Hover lifts the casing; press drives it into the housing.",
    primitive: "Native <button>",
    examples: [
      { id: "tones", title: "Tones", description: "Four accent families. Copper is the default." },
      { id: "sizes", title: "Sizes" },
      { id: "states", title: "Disabled and full width" },
    ],
    parts: [
      {
        name: "LayeredButton",
        extends: "ButtonHTMLAttributes<HTMLButtonElement>",
        props: [
          { name: "tone", type: `"copper" | "green" | "gold" | "neutral"`, default: `"copper"`, description: "Face color family." },
          { name: "size", type: size3, default: `"medium"`, description: "Face height and padding." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch to the container width." },
          { name: "type", type: `"button" | "submit" | "reset"`, default: `"button"`, description: "Defaults to button so it never submits a form by accident." },
        ],
      },
    ],
    accessibility: [
      "Renders a real <button>, so Enter, Space, and form semantics are native.",
      "Disabled uses the native attribute; the control leaves the tab order.",
    ],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Actions",
    summary: "An anchored row list with checkable items and nested submenus.",
    description:
      "A recessed row list that opens from any trigger. Highlighted rows light with the tone accent; destructive rows use the signal color. Supports groups, labels, checkbox and radio items, and submenus.",
    primitive: "Radix Dropdown Menu",
    npm: "@radix-ui/react-dropdown-menu@2.1.24",
    examples: [
      { id: "basic", title: "Actions", description: "Plain items, a disabled row, and a destructive intent." },
      { id: "checkable", title: "Checkbox and radio items" },
      { id: "submenu", title: "Submenu" },
    ],
    parts: [
      { name: "LayeredDropdownMenu", extends: "DropdownMenu.Root", props: [] },
      { name: "LayeredDropdownMenuTrigger", extends: "DropdownMenu.Trigger", description: "Use asChild to attach to a LayeredButton.", props: [] },
      {
        name: "LayeredDropdownMenuContent",
        extends: "DropdownMenu.Content",
        props: [
          toneProp(),
          { name: "menuSize", type: size2, default: `"small"`, description: "Row height and type scale." },
          { name: "showArrow", type: "boolean", default: "false", description: "Render a directional pointer toward the trigger." },
          { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger in pixels." },
        ],
      },
      {
        name: "LayeredDropdownMenuItem",
        extends: "DropdownMenu.Item",
        props: [
          { name: "intent", type: `"default" | "destructive"`, default: `"default"`, description: "Destructive rows highlight in signal red." },
          { name: "inset", type: "boolean", default: "false", description: "Reserve indicator space so plain rows align with checkable rows." },
        ],
      },
      { name: "LayeredDropdownMenuCheckboxItem", extends: "DropdownMenu.CheckboxItem", props: [] },
      { name: "LayeredDropdownMenuRadioGroup / RadioItem", extends: "DropdownMenu.RadioGroup / RadioItem", props: [] },
      { name: "LayeredDropdownMenuLabel / Separator / Group", extends: "Radix equivalents", props: [] },
      { name: "LayeredDropdownMenuSub / SubTrigger / SubContent", extends: "Radix equivalents", description: "SubContent accepts tone and menuSize.", props: [] },
    ],
    accessibility: [
      "Arrow keys move through rows, typeahead jumps to matching labels, Escape closes and returns focus to the trigger.",
      "Checkbox and radio items expose menuitemcheckbox and menuitemradio roles.",
    ],
  },

  /* ------------------------------------------------------------ Forms */
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    summary: "A native text field recessed into a structural casing.",
    description:
      "The writing surface sits below the casing plane. Focus and invalid states are drawn inside the casing on the inner trench, never as an outer ring.",
    primitive: "Native <input>",
    examples: [
      { id: "basic", title: "Label and description" },
      { id: "adornments", title: "Leading and trailing content", description: "Fixed prefixes and units sit inside the surface." },
      { id: "validation", title: "Error state" },
    ],
    parts: [
      {
        name: "LayeredInput",
        extends: "InputHTMLAttributes<HTMLInputElement>",
        props: [
          ...fieldProps("inputSize"),
          { name: "leadingContent", type: "ReactNode", description: "Prefix inside the surface, such as a protocol." },
          { name: "trailingContent", type: "ReactNode", description: "Suffix inside the surface, such as a unit." },
        ],
      },
    ],
    accessibility: [
      "The label is a real <label> bound to the input.",
      "Description and error are joined into aria-describedby; error also sets aria-invalid.",
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    summary: "A multiline writing surface with controllable resize.",
    description:
      "Shares the input's casing and recessed surface, with a resize policy so layouts can decide whether the field may grow.",
    primitive: "Native <textarea>",
    examples: [
      { id: "basic", title: "Basic" },
      { id: "validation", title: "Error state, fixed size" },
    ],
    parts: [
      {
        name: "LayeredTextarea",
        extends: "TextareaHTMLAttributes<HTMLTextAreaElement>",
        props: [
          ...fieldProps("textareaSize"),
          { name: "resize", type: `"none" | "vertical" | "horizontal" | "both"`, default: `"vertical"`, description: "Which axes the reader can drag." },
        ],
      },
    ],
    accessibility: ["Same label, description, and error wiring as Input."],
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    summary: "A native select with a custom indicator and recessed surface.",
    description:
      "Keeps the platform <select>, including its native picker on touch devices, and replaces only the chrome around it.",
    primitive: "Native <select>",
    examples: [
      { id: "basic", title: "Basic" },
      { id: "sizes", title: "Sizes and tones" },
    ],
    parts: [
      {
        name: "LayeredSelect",
        extends: "SelectHTMLAttributes<HTMLSelectElement>",
        props: [
          ...fieldProps("selectSize"),
          { name: "children", type: "ReactNode", required: true, description: "Native <option> and <optgroup> elements." },
        ],
      },
    ],
    accessibility: ["The native picker, keyboard behavior, and form participation are untouched."],
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    summary: "A filterable text field with an anchored listbox.",
    description:
      "A casing-housed input that filters an anchored row list as you type. Single selection only in this version; supports groups, an empty state, and a clear control.",
    primitive: "Base UI Combobox",
    npm: "@base-ui/react@1.6.0",
    examples: [
      { id: "basic", title: "Filter a list", description: "Pass items and render each row from the list callback." },
      { id: "grouped", title: "Grouped rows" },
    ],
    parts: [
      { name: "LayeredCombobox", extends: "Combobox.Root", description: "Owns value, items, and filtering.", props: [] },
      { name: "LayeredComboboxLabel", extends: "Combobox.Label", props: [] },
      {
        name: "LayeredComboboxInputGroup",
        extends: "Combobox.InputGroup",
        description: "The casing. Place Input, Clear, and Icon inside it.",
        props: [toneProp(), { name: "comboboxSize", type: size2, default: `"medium"`, description: "Field height." }],
      },
      { name: "LayeredComboboxInput / Clear / Icon / Trigger", extends: "Base UI equivalents", props: [] },
      {
        name: "LayeredComboboxContent",
        extends: "Combobox.Popup + Positioner",
        props: [
          toneProp(),
          { name: "comboboxSize", type: size2, default: `"small"`, description: "Row height." },
          { name: "showArrow", type: "boolean", default: "false", description: "Directional pointer toward the field." },
        ],
      },
      { name: "LayeredComboboxList / Item / Empty / Group / GroupLabel", extends: "Base UI equivalents", props: [] },
    ],
    accessibility: [
      "Input and listbox are wired with the combobox role, aria-expanded, and aria-activedescendant.",
      "Arrow keys move the highlight; Enter selects; Escape closes.",
    ],
  },
  {
    slug: "number-field",
    name: "Number Field",
    category: "Forms",
    summary: "A numeric input with attached increment and decrement actuators.",
    description:
      "A native number input with two compact actuators docked to the casing. The actuators call stepUp and stepDown, so min, max, and step behave exactly as the platform defines them.",
    primitive: "Native <input type=\"number\">",
    examples: [
      { id: "basic", title: "Range and step" },
      { id: "controlled", title: "Controlled value" },
    ],
    parts: [
      {
        name: "LayeredNumberField",
        extends: "InputHTMLAttributes<HTMLInputElement>",
        props: [
          ...fieldProps("numberFieldSize"),
          { name: "min / max / step", type: "number", description: "Native constraints, honored by the actuators." },
          { name: "incrementLabel", type: "string", default: `"Increase value"`, description: "Accessible name of the up actuator." },
          { name: "decrementLabel", type: "string", default: `"Decrease value"`, description: "Accessible name of the down actuator." },
        ],
      },
    ],
    accessibility: [
      "Arrow keys step natively in the input.",
      "Actuators are labelled buttons that return focus to the input after stepping.",
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    summary: "A compact casing with a recessed selector and contained check.",
    description:
      "A native checkbox behind a tactile selector. Supports an indeterminate state for parent rows that summarize a group.",
    primitive: "Native <input type=\"checkbox\">",
    examples: [
      { id: "basic", title: "With description" },
      { id: "indeterminate", title: "Select all", description: "The parent reflects a partially selected group." },
    ],
    parts: [
      {
        name: "LayeredCheckbox",
        extends: "InputHTMLAttributes<HTMLInputElement>",
        props: [
          ...fieldProps("checkboxSize"),
          { name: "indeterminate", type: "boolean", default: "false", description: "Sets the DOM indeterminate property and mixed styling." },
        ],
      },
    ],
    accessibility: ["The native input keeps Space toggling, form submission, and the mixed state for assistive tech."],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    summary: "A mechanical paddle that travels between two detents.",
    description:
      "A native checkbox with role=\"switch\" behind a paddle lever. The lever snaps between fixed engage and disengage positions.",
    primitive: "Native <input type=\"checkbox\" role=\"switch\">",
    examples: [
      { id: "basic", title: "Basic" },
      { id: "tones", title: "Tones and sizes" },
    ],
    parts: [{ name: "LayeredSwitch", extends: "InputHTMLAttributes<HTMLInputElement>", props: fieldProps("switchSize") }],
    accessibility: ["Announced as a switch with on and off state; Space toggles."],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    category: "Forms",
    summary: "A bank of circular selectors where the chosen face lights up.",
    description:
      "Mutually exclusive options in compact circular casings. The checked face glows with the tone color; there is no separate dot.",
    primitive: "Radix Radio Group",
    npm: "@radix-ui/react-radio-group@1.4.7",
    examples: [{ id: "basic", title: "With descriptions" }],
    parts: [
      {
        name: "LayeredRadioGroup",
        extends: "RadioGroup.Root",
        props: [
          toneProp(),
          { name: "radioGroupSize", type: size3, default: `"medium"`, description: "Selector diameter and type scale." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch rows to the container." },
          { name: "error", type: "ReactNode", description: "Group-level error message." },
        ],
      },
      {
        name: "LayeredRadioGroupItem",
        extends: "RadioGroup.Item",
        props: [
          { name: "label", type: "ReactNode", required: true, description: "Visible option label." },
          { name: "description", type: "ReactNode", description: "Secondary line under the label." },
        ],
      },
    ],
    accessibility: ["Roving focus: Tab enters the group, arrow keys move and select."],
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    summary: "A graduated calibration rail with a blocky carriage thumb.",
    description:
      "A recessed channel with decorative calibration ticks and a mechanical carriage. Render one thumb per value for ranges. Horizontal only in this version.",
    primitive: "Radix Slider",
    npm: "@radix-ui/react-slider@1.4.7",
    examples: [
      { id: "basic", title: "Readout", description: "A controlled value paired with a visible reading." },
      { id: "range", title: "Range" },
    ],
    parts: [
      {
        name: "LayeredSlider",
        extends: "Slider.Root (orientation omitted)",
        props: [toneProp(), { name: "sliderSize", type: size3, default: `"medium"`, description: "Rail and carriage size." }],
      },
      { name: "LayeredSliderTrack / Range", extends: "Slider.Track / Slider.Range", props: [] },
      { name: "LayeredSliderThumb", extends: "Slider.Thumb", description: "Give each thumb an aria-label.", props: [] },
    ],
    accessibility: ["Arrow keys step, Page Up/Down jump, Home/End go to limits."],
  },

  /* ------------------------------------------------------------ Display */
  {
    slug: "panel",
    name: "Panel",
    category: "Display",
    summary: "A structural housing with header, content, and footer surfaces.",
    description:
      "The container for grouping controls. A casing wraps a single surface; the optional title becomes the section's accessible name.",
    primitive: "Native <section>",
    examples: [
      { id: "basic", title: "Eyebrow, title, and footer" },
      { id: "tones", title: "Tones" },
    ],
    parts: [
      {
        name: "LayeredPanel",
        props: [
          { name: "title", type: "ReactNode", description: "Rendered as an h2 and used as aria-labelledby." },
          { name: "eyebrow", type: "ReactNode", description: "Small label above the title." },
          { name: "footer", type: "ReactNode", description: "Footer surface content." },
          toneProp(),
          { name: "padding", type: size3, default: `"medium"`, description: "Surface padding." },
          { name: "className", type: "string", description: "Layout hook for the outer casing." },
        ],
      },
    ],
    accessibility: ["A titled panel is a labelled region landmark."],
  },
  {
    slug: "display-card",
    name: "Display Card",
    category: "Display",
    summary: "A recessed screen with vignette and glare over a metadata surface.",
    description:
      "For media and previews. The image sits in a recessed screen with lighting vignette and a glare sweep, above a surface carrying title, metadata, and status.",
    primitive: "Native <article>",
    examples: [{ id: "basic", title: "With status and footer action" }],
    parts: [
      {
        name: "LayeredDisplayCard",
        extends: "HTMLAttributes<HTMLElement>",
        props: [
          { name: "imageSrc", type: "string", required: true, description: "Screen image." },
          { name: "imageAlt", type: "string", required: true, description: "Alternative text for the image." },
          { name: "title", type: "ReactNode", required: true, description: "Card heading (h3)." },
          { name: "eyebrow / description", type: "ReactNode", description: "Header text above and below the title." },
          { name: "metadata / status", type: "ReactNode", description: "Meta bar entries." },
          { name: "footer", type: "ReactNode", description: "Actions below the meta bar." },
          toneProp(),
          { name: "aspect", type: `"landscape" | "square" | "portrait"`, default: `"landscape"`, description: "Screen proportions." },
        ],
      },
    ],
    accessibility: ["Images load lazily; vignette and glare layers are aria-hidden."],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Display",
    summary: "A compact status marker with restrained tone illumination.",
    description: "Non-interactive metadata and state labels with shallow inset depth. Adds a signal-red tone for faults.",
    primitive: "Native <span>",
    examples: [
      { id: "tones", title: "Tones" },
      { id: "sizes", title: "Sizes" },
    ],
    parts: [
      {
        name: "LayeredBadge",
        extends: "HTMLAttributes<HTMLSpanElement>",
        props: [
          { name: "tone", type: `"neutral" | "copper" | "green" | "gold" | "signal-red"`, default: `"neutral"`, description: "Status color." },
          { name: "badgeSize", type: size2, default: `"small"`, description: "Height and type scale." },
        ],
      },
    ],
    accessibility: ["Color is never the only signal: the badge text carries the state."],
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Display",
    summary: "A recessed instrument channel with an illuminated fill.",
    description:
      "Wraps a native <progress> for semantics and draws a consistent channel on top. Omit value for an indeterminate scan.",
    primitive: "Native <progress>",
    examples: [
      { id: "tones", title: "Determinate" },
      { id: "indeterminate", title: "Indeterminate" },
    ],
    parts: [
      {
        name: "LayeredProgress",
        extends: "ProgressHTMLAttributes<HTMLProgressElement>",
        props: [
          { name: "value", type: "number", description: "Current value. Omit for indeterminate." },
          { name: "max", type: "number", default: "100", description: "Upper bound." },
          toneProp(),
          { name: "progressSize", type: size3, default: `"medium"`, description: "Channel height." },
        ],
      },
    ],
    accessibility: ["Give each bar an aria-label or aria-labelledby; the native element reports its value."],
  },
  {
    slug: "table",
    name: "Table",
    category: "Display",
    summary: "Semantic table parts inside one recessed equipment housing.",
    description:
      "Native table elements with row and column headers, a caption, and a footer, housed in a single casing that scrolls horizontally on narrow screens.",
    primitive: "Native <table>",
    examples: [{ id: "basic", title: "Diagnostics" }],
    parts: [
      {
        name: "LayeredTable",
        extends: "TableHTMLAttributes<HTMLTableElement>",
        props: [toneProp(), { name: "density", type: size2, default: `"medium"`, description: "Row height." }],
      },
      {
        name: "LayeredTableHeader / Body / Footer / Row / Head / Cell / Caption",
        extends: "Native table elements",
        description: "Use scope on LayeredTableHead for row and column headers.",
        props: [],
      },
    ],
    accessibility: ["Everything is a native table element, so screen reader table navigation works."],
  },

  /* ------------------------------------------------------------ Navigation */
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    summary: "A selector rail of seated tab faces docked to a content surface.",
    description:
      "Tab faces sit in a recessed trench; the active face docks into the content surface below it. Tone and size are set on the root so they reach both the rail and the panels.",
    primitive: "Radix Tabs",
    npm: "@radix-ui/react-tabs@1.1.21",
    examples: [
      { id: "basic", title: "Basic" },
      { id: "manual", title: "Manual activation", description: "Arrow keys move focus; Enter or Space selects." },
    ],
    parts: [
      {
        name: "LayeredTabs",
        extends: "Tabs.Root",
        props: [toneProp(), { name: "tabsSize", type: size3, default: `"medium"`, description: "Face height and type scale." }],
      },
      {
        name: "LayeredTabsList",
        extends: "Tabs.List",
        props: [{ name: "overflow", type: `"scroll" | "wrap"`, default: `"scroll"`, description: "How the rail handles too many tabs." }],
      },
      { name: "LayeredTabsTrigger", extends: "Tabs.Trigger", props: [] },
      {
        name: "LayeredTabsContent",
        extends: "Tabs.Content",
        props: [{ name: "surface", type: `"integrated" | "plain"`, default: `"integrated"`, description: "Docked surface or unstyled panel." }],
      },
    ],
    accessibility: ["Roving focus across the rail; panels are tabpanels labelled by their tab."],
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Navigation",
    summary: "A vertical bank of hatches that open onto recessed content.",
    description:
      "One rack housing with individually seated hatch triggers. Content recesses beneath its own trigger. Single or multiple open items.",
    primitive: "Radix Accordion",
    npm: "@radix-ui/react-accordion@1.2.20",
    examples: [
      { id: "single", title: "Single, collapsible" },
      { id: "multiple", title: "Multiple" },
    ],
    parts: [
      {
        name: "LayeredAccordion",
        extends: "Accordion.Root (orientation omitted)",
        props: [toneProp(), { name: "accordionSize", type: size3, default: `"medium"`, description: "Hatch height and type scale." }],
      },
      { name: "LayeredAccordionItem", extends: "Accordion.Item", props: [] },
      {
        name: "LayeredAccordionTrigger",
        extends: "Accordion.Trigger",
        props: [{ name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element wrapping the trigger." }],
      },
      { name: "LayeredAccordionContent", extends: "Accordion.Content", props: [] },
    ],
    accessibility: ["Triggers sit inside real headings; aria-expanded and aria-controls are wired by Radix."],
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    summary: "Composable page links with current, disabled, and ellipsis states.",
    description:
      "A nav landmark with list, link, and ellipsis parts. Links are real anchors; the current page is marked with aria-current.",
    primitive: "Native <nav> and <a>",
    examples: [{ id: "controlled", title: "Controlled paging", description: "Links drive local state instead of navigating." }],
    parts: [
      {
        name: "LayeredPagination",
        extends: "HTMLAttributes<HTMLElement> (<nav>)",
        props: [toneProp(), { name: "paginationSize", type: size2, default: `"medium"`, description: "Key size." }],
      },
      { name: "LayeredPaginationList / Item", extends: "<ul> / <li>", props: [] },
      {
        name: "LayeredPaginationLink",
        extends: "AnchorHTMLAttributes<HTMLAnchorElement>",
        props: [
          { name: "isCurrent", type: "boolean", default: "false", description: "Marks the current page with aria-current." },
          { name: "disabled", type: "boolean", default: "false", description: "Removes the href and marks aria-disabled." },
        ],
      },
      { name: "LayeredPaginationPrevious / Next", extends: "LayeredPaginationLink", description: "Default labels are Previous and Next.", props: [] },
      { name: "LayeredPaginationEllipsis", extends: "<span>", props: [] },
    ],
    accessibility: [
      "The nav is labelled \"Pagination\" by default; pass aria-label when a page has more than one.",
      "Disabled links drop their href and leave the tab order.",
    ],
  },

  /* ------------------------------------------------------------ Overlays */
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    summary: "An access hatch with a recessed content surface and corner close.",
    description:
      "A modal casing with a recessed inner surface and a compact mechanical close control mounted in the corner. Focus is trapped while open.",
    primitive: "Radix Dialog",
    npm: "@radix-ui/react-dialog@1.1.23",
    examples: [
      { id: "basic", title: "Confirmation" },
      { id: "form", title: "Form" },
    ],
    parts: [
      { name: "LayeredDialog", extends: "Dialog.Root", props: [] },
      { name: "LayeredDialogTrigger", extends: "Dialog.Trigger", props: [] },
      {
        name: "LayeredDialogContent",
        extends: "Dialog.Content",
        props: [
          { name: "size", type: size3, default: `"medium"`, description: "Maximum casing width." },
          { name: "showCloseButton", type: "boolean", default: "true", description: "Render the corner close control." },
          { name: "closeLabel", type: "string", default: `"Close dialog"`, description: "Accessible name of the corner close." },
          { name: "overlayClassName", type: "string", description: "Class for the backdrop." },
        ],
      },
      { name: "LayeredDialogHeader / Footer", extends: "<div>", props: [] },
      { name: "LayeredDialogTitle / Description / Close", extends: "Radix equivalents", props: [] },
    ],
    accessibility: [
      "Title and description are wired to the dialog with aria-labelledby and aria-describedby.",
      "Escape closes; focus returns to the trigger.",
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    summary: "A compact anchored module for small forms and details.",
    description:
      "A non-modal anchored surface with a directional pointer. Free-form content; closes on outside click or Escape.",
    primitive: "Radix Popover",
    npm: "@radix-ui/react-popover@1.1.23",
    examples: [{ id: "basic", title: "Inline settings" }],
    parts: [
      { name: "LayeredPopover", extends: "Popover.Root", props: [] },
      { name: "LayeredPopoverTrigger / Anchor", extends: "Radix equivalents", props: [] },
      {
        name: "LayeredPopoverContent",
        extends: "Popover.Content",
        props: [
          toneProp(),
          { name: "popoverSize", type: size2, default: `"small"`, description: "Padding and width." },
          { name: "showArrow", type: "boolean", default: "true", description: "Directional pointer." },
          { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger." },
        ],
      },
      {
        name: "LayeredPopoverClose",
        extends: "Popover.Close",
        description: "With no children renders the mechanical close glyph.",
        props: [{ name: "closeLabel", type: "string", default: `"Close popover"`, description: "Accessible name for the glyph mode." }],
      },
    ],
    accessibility: ["Focus moves into the content when opened and returns to the trigger on close."],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    summary: "A small annotation plate on hover and keyboard focus.",
    description:
      "An instrument annotation with a recessed information surface and a pointer. Appears on hover and focus; never holds interactive content.",
    primitive: "Radix Tooltip",
    npm: "@radix-ui/react-tooltip@1.2.16",
    examples: [
      { id: "basic", title: "Sides" },
      { id: "tones", title: "Tones" },
    ],
    parts: [
      {
        name: "LayeredTooltipProvider",
        extends: "Tooltip.Provider",
        description: "Render once near the root.",
        props: [
          { name: "delayDuration", type: "number", default: "300", description: "Hover delay in ms." },
          { name: "skipDelayDuration", type: "number", default: "150", description: "Window for instant re-open between triggers." },
        ],
      },
      { name: "LayeredTooltip / Trigger", extends: "Tooltip.Root / Trigger", props: [] },
      {
        name: "LayeredTooltipContent",
        extends: "Tooltip.Content",
        props: [
          toneProp(),
          { name: "size", type: size2, default: `"small"`, description: "Padding and type scale." },
          { name: "showArrow", type: "boolean", default: "true", description: "Directional pointer." },
          { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger." },
        ],
      },
    ],
    accessibility: ["Opens on keyboard focus as well as hover; Escape dismisses."],
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Overlays",
    summary: "A transient status cartridge with an optional action.",
    description:
      "Compositional by design: you own the open state. Toasts pause on hover and focus, and can be swiped away in the provider's swipe direction.",
    primitive: "Radix Toast",
    npm: "@radix-ui/react-toast@1.2.23",
    examples: [
      { id: "basic", title: "With action" },
      { id: "tones", title: "Tones" },
    ],
    parts: [
      { name: "LayeredToastProvider", extends: "Toast.Provider", description: "Pair swipeDirection with the viewport position.", props: [] },
      {
        name: "LayeredToastViewport",
        extends: "Toast.Viewport",
        props: [
          { name: "position", type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`, default: `"bottom-right"`, description: "Screen corner." },
        ],
      },
      { name: "LayeredToast", extends: "Toast.Root", props: [toneProp()] },
      { name: "LayeredToastTitle / Description", extends: "Radix equivalents", props: [] },
      { name: "LayeredToastAction", extends: "Toast.Action", description: "altText is required: it describes the action for screen readers.", props: [] },
      {
        name: "LayeredToastClose",
        extends: "Toast.Close",
        props: [{ name: "closeLabel", type: "string", default: `"Dismiss notification"`, description: "Accessible name for the glyph mode." }],
      },
    ],
    accessibility: ["Announced through a live region; F8 moves focus to the viewport."],
  },
];

export function findComponent(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug);
}
