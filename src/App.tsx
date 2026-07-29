import { useState, useEffect, useRef } from "react";
import {
  LayeredAccordion,
  LayeredAccordionContent,
  LayeredAccordionItem,
  LayeredAccordionTrigger,
} from "../registry/components/layered-accordion/LayeredAccordion";
import { LayeredButton } from "../registry/components/layered-button/LayeredButton";
import { LayeredCheckbox } from "../registry/components/layered-checkbox/LayeredCheckbox";
import {
  LayeredDialog,
  LayeredDialogClose,
  LayeredDialogContent,
  LayeredDialogDescription,
  LayeredDialogFooter,
  LayeredDialogHeader,
  LayeredDialogTitle,
  LayeredDialogTrigger,
} from "../registry/components/layered-dialog/LayeredDialog";
import { LayeredDisplayCard } from "../registry/components/layered-display-card/LayeredDisplayCard";
import { LayeredInput } from "../registry/components/layered-input/LayeredInput";
import { LayeredPanel } from "../registry/components/layered-panel/LayeredPanel";
import {
  LayeredRadioGroup,
  LayeredRadioGroupItem,
} from "../registry/components/layered-radio-group/LayeredRadioGroup";
import {
  LayeredPopover,
  LayeredPopoverAnchor,
  LayeredPopoverClose,
  LayeredPopoverContent,
  LayeredPopoverTrigger,
} from "../registry/components/layered-popover/LayeredPopover";
import {
  LayeredDropdownMenu,
  LayeredDropdownMenuCheckboxItem,
  LayeredDropdownMenuContent,
  LayeredDropdownMenuGroup,
  LayeredDropdownMenuItem,
  LayeredDropdownMenuLabel,
  LayeredDropdownMenuRadioGroup,
  LayeredDropdownMenuRadioItem,
  LayeredDropdownMenuSeparator,
  LayeredDropdownMenuSub,
  LayeredDropdownMenuSubContent,
  LayeredDropdownMenuSubTrigger,
  LayeredDropdownMenuTrigger,
} from "../registry/components/layered-dropdown-menu/LayeredDropdownMenu";
import {
  LayeredCombobox,
  LayeredComboboxClear,
  LayeredComboboxContent,
  LayeredComboboxEmpty,
  LayeredComboboxGroup,
  LayeredComboboxGroupLabel,
  LayeredComboboxIcon,
  LayeredComboboxInput,
  LayeredComboboxInputGroup,
  LayeredComboboxItem,
  LayeredComboboxLabel,
  LayeredComboboxList,
} from "../registry/components/layered-combobox/LayeredCombobox";
import { LayeredSelect } from "../registry/components/layered-select/LayeredSelect";
import { LayeredSwitch } from "../registry/components/layered-switch/LayeredSwitch";
import {
  LayeredTabs,
  LayeredTabsContent,
  LayeredTabsList,
  LayeredTabsTrigger,
} from "../registry/components/layered-tabs/LayeredTabs";
import { LayeredTextarea } from "../registry/components/layered-textarea/LayeredTextarea";
import {
  LayeredToast,
  LayeredToastAction,
  LayeredToastClose,
  LayeredToastDescription,
  LayeredToastProvider,
  LayeredToastTitle,
  LayeredToastViewport,
  type LayeredToastPosition,
} from "../registry/components/layered-toast/LayeredToast";
import {
  LayeredTooltip,
  LayeredTooltipContent,
  LayeredTooltipProvider,
  LayeredTooltipTrigger,
} from "../registry/components/layered-tooltip/LayeredTooltip";

type ThemeMode = "classic" | "field";

const frameworkOptions = [
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Solid",
  "Qwik",
  "Astro",
  "Ember",
];

function App() {
  const [theme, setTheme] = useState<ThemeMode>("classic");
  const [controlledDialogOpen, setControlledDialogOpen] = useState(false);
  const [controlledTooltipOpen, setControlledTooltipOpen] = useState(false);
  const [controlledTabsValue, setControlledTabsValue] = useState("overview");
  const [controlledAccordionValue, setControlledAccordionValue] = useState("one");
  const [controlledRadioValue, setControlledRadioValue] = useState("balanced");

  const [controlledPopoverOpen, setControlledPopoverOpen] = useState(false);
  const [popoverSide, setPopoverSide] = useState<
    "top" | "right" | "bottom" | "left"
  >("bottom");
  const [popoverAlign, setPopoverAlign] = useState<
    "start" | "center" | "end"
  >("center");
  const [positionDemoOpen, setPositionDemoOpen] = useState(true);
  const positionSelectorsRef = useRef<HTMLDivElement>(null);
  const [anchorPopoverOpen, setAnchorPopoverOpen] = useState(false);

  const [menuShowStatusBar, setMenuShowStatusBar] = useState(true);
  const [menuShowMinimap, setMenuShowMinimap] = useState(false);
  const [menuTheme, setMenuTheme] = useState("dark");

  const [comboboxFramework, setComboboxFramework] = useState<string | null>(
    null
  );
  const [comboboxCountry, setComboboxCountry] = useState<string | null>(
    "Canada"
  );

  const [toastPosition, setToastPosition] =
    useState<LayeredToastPosition>("bottom-right");
  const toastSwipeDirection = toastPosition.endsWith("left") ? "left" : "right";

  const [toastOpen, setToastOpen] = useState<Record<string, boolean>>({});
  const openToast = (id: string) =>
    setToastOpen((current) => ({ ...current, [id]: true }));
  const toastOpenProps = (id: string) => ({
    open: !!toastOpen[id],
    onOpenChange: (open: boolean) =>
      setToastOpen((current) => ({ ...current, [id]: open })),
  });

  const [controlledToastOpen, setControlledToastOpen] = useState(false);

  const [toastStack, setToastStack] = useState<number[]>([]);
  const [nextStackToastId, setNextStackToastId] = useState(1);
  const addStackToast = () => {
    setToastStack((current) => [...current, nextStackToastId]);
    setNextStackToastId((current) => current + 1);
  };
  const removeStackToast = (id: number) =>
    setToastStack((current) => current.filter((toastId) => toastId !== id));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <LayeredToastProvider swipeDirection={toastSwipeDirection}>
    <LayeredTooltipProvider>
    <main className="component-lab" data-theme={theme}>
      <header className="component-lab__header">
        <p className="component-lab__eyebrow">Component Laboratory</p>

        <h1 className="component-lab__title">
          Layered UI
        </h1>

        <p className="component-lab__description">
          A tactile component system built from casings, trenches,
          dimensional faces, controlled lighting, and physical interaction.
        </p>

        <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Theme Experiment:
          </span>
          <LayeredButton
            size="small"
            tone={theme === "classic" ? "copper" : "neutral"}
            onClick={() => setTheme("classic")}
          >
            Classic Theme {theme === "classic" ? "(Active)" : ""}
          </LayeredButton>
          <LayeredButton
            size="small"
            tone={theme === "field" ? "green" : "neutral"}
            onClick={() => setTheme("field")}
          >
            Field Hardware {theme === "field" ? "(Active)" : ""}
          </LayeredButton>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <section className="component-section">
          <h2 className="component-section__title">
            Layered Button
          </h2>

          <div className="component-row">
            <LayeredButton tone="copper">
              Copper
            </LayeredButton>

            <LayeredButton tone="green">
              Green
            </LayeredButton>

            <LayeredButton tone="gold">
              Gold
            </LayeredButton>

            <LayeredButton tone="neutral">
              Neutral
            </LayeredButton>

            <LayeredButton disabled>
              Disabled
            </LayeredButton>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Panel
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <LayeredPanel
              tone="neutral"
              padding="small"
              title="System Information"
            >
              <p style={{ margin: 0 }}>
                Neutral panel variant with small padding. Outer casings remain structural and neutral while inner content surfaces remain dark and high-contrast.
              </p>
            </LayeredPanel>

            <LayeredPanel
              tone="copper"
              padding="large"
              eyebrow="Configuration"
              title="Telemetry & Signals"
              footer={
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <LayeredButton tone="copper" size="small">
                    Save Parameters
                  </LayeredButton>
                </div>
              }
            >
              <p style={{ margin: 0 }}>
                Copper panel variant with large padding. Demonstrates restrained tone accenting on the header and eyebrow, a dark readable surface, and a structural footer separator.
              </p>
            </LayeredPanel>

            <LayeredPanel
              tone="green"
              padding="medium"
              title="Interactive Controls"
            >
              <p style={{ margin: "0 0 16px" }}>
                Green panel variant with medium padding containing nested interactive controls.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <LayeredButton tone="green">
                  Confirm Action
                </LayeredButton>

                <LayeredButton tone="neutral">
                  Cancel
                </LayeredButton>
              </div>
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Display Card
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "24px" }}>
            <LayeredDisplayCard
              eyebrow="Local Model"
              title="Ornith 9B"
              description="Fast local model intended for lightweight coding and general tasks."
              metadata="5.6 GB"
              status="Ready"
              tone="green"
              aspect="landscape"
              imageSrc="/assets/model-ornith.svg"
              imageAlt="Ornith 9B neural core diagram"
            />

            <LayeredDisplayCard
              eyebrow="Interface"
              title="Local Chat Workspace"
              description="Self-contained local AI chat environment with real-time response streaming and session history."
              metadata="v2.4.0"
              status="Active"
              tone="neutral"
              aspect="landscape"
              imageSrc="/assets/preview-chat.svg"
              imageAlt="Local Chat Workspace interface preview"
            />

            <LayeredDisplayCard
              eyebrow="Hardware"
              title="RTX Local Runtime"
              description="Dedicated GPU-backed inference pipeline with custom CUDA kernel acceleration."
              metadata="24 GB VRAM"
              status="Online"
              tone="gold"
              aspect="landscape"
              imageSrc="/assets/hardware-rtx.svg"
              imageAlt="RTX GPU hardware runtime diagram"
              footer={
                <LayeredButton tone="gold" size="small">
                  Initialize Device
                </LayeredButton>
              }
            />
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Input
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <LayeredInput
                label="Model Name"
                tone="neutral"
                inputSize="medium"
                placeholder="e.g. Claude 3.5 Sonnet"
                description="Specify the target foundational model identifier."
              />

              <LayeredInput
                label="API Endpoint"
                tone="green"
                inputSize="small"
                defaultValue="https://api.anthropic.com/v1"
              />

              <LayeredInput
                label="Connection Host"
                tone="copper"
                inputSize="medium"
                leadingContent="https://"
                placeholder="localhost:8080"
              />

              <LayeredInput
                label="Context Window"
                tone="gold"
                inputSize="large"
                trailingContent="tokens"
                defaultValue="128000"
              />

              <LayeredInput
                label="Rate Limit Threshold"
                tone="copper"
                defaultValue="-50"
                error="Value must be a positive integer greater than zero."
              />

              <LayeredInput
                label="System Identifier"
                disabled
                defaultValue="SYS-9942-ALPHA"
              />

              <LayeredInput
                label="Connection Status"
                readOnly
                defaultValue="CONNECTED (127.0.0.1:5173)"
              />
            </div>

            <LayeredPanel
              tone="copper"
              padding="medium"
              eyebrow="Credentials"
              title="Environment Configuration"
              footer={
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <LayeredButton tone="copper" size="small">
                    Update Secret
                  </LayeredButton>
                </div>
              }
            >
              <LayeredInput
                label="API Secret Key"
                tone="copper"
                type="password"
                defaultValue="sk-ant-api03-sample-key-token"
                description="Nested inside LayeredPanel with structural casing and quiet recessed surface."
                fullWidth
              />
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Select
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <LayeredSelect
                label="Model Provider"
                tone="neutral"
                selectSize="medium"
                description="Choose primary model endpoint provider."
                defaultValue=""
              >
                <option value="" disabled>Select a provider...</option>
                <option value="ollama">Ollama</option>
                <option value="openai">OpenAI-compatible</option>
              </LayeredSelect>

              <LayeredSelect
                label="Runtime Mode"
                tone="green"
                selectSize="small"
                defaultValue="local"
              >
                <option value="local">Local Runtime</option>
                <option value="remote">Remote Runtime</option>
              </LayeredSelect>

              <LayeredSelect
                label="Hardware Backend"
                tone="copper"
                selectSize="medium"
                defaultValue="cuda"
              >
                <optgroup label="GPU Acceleration">
                  <option value="cuda">CUDA</option>
                  <option value="metal">Metal</option>
                </optgroup>
                <optgroup label="Fallback Execution">
                  <option value="cpu">CPU</option>
                  <option value="auto">Automatic</option>
                </optgroup>
              </LayeredSelect>

              <LayeredSelect
                label="Context Strategy"
                tone="gold"
                selectSize="large"
                defaultValue="sliding"
              >
                <option value="sliding">Sliding Window</option>
                <option value="truncate">Hard Truncate</option>
                <option value="summarize">Hierarchical Summary</option>
              </LayeredSelect>

              <LayeredSelect
                label="Response Format"
                tone="copper"
                defaultValue=""
                error="Please select a valid response output format."
              >
                <option value="" disabled>Choose format...</option>
                <option value="json">JSON</option>
                <option value="text">Plain Text</option>
              </LayeredSelect>

              <LayeredSelect
                label="Telemetry Channel"
                disabled
                defaultValue="disabled"
              >
                <option value="disabled">Disabled by Admin Policy</option>
              </LayeredSelect>

              <LayeredSelect
                label="Active Features"
                multiple
                tone="neutral"
                selectSize="small"
                defaultValue={["json", "cpu"]}
              >
                <option value="json">JSON Formatting</option>
                <option value="cpu">CPU Monitoring</option>
                <option value="stream">Stream Buffering</option>
              </LayeredSelect>
            </div>

            <LayeredPanel
              tone="neutral"
              padding="medium"
              eyebrow="Execution Parameters"
              title="Provider Pipeline"
            >
              <LayeredSelect
                label="Primary Engine"
                tone="copper"
                fullWidth
                defaultValue="ollama"
                description="Nested inside LayeredPanel with structural casing and quiet recessed dropdown surface."
              >
                <option value="ollama">Ollama (Local LLM Instance)</option>
                <option value="openai">OpenAI-compatible (Remote API Proxy)</option>
              </LayeredSelect>
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Textarea
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
              <LayeredTextarea
                label="System Prompt"
                tone="neutral"
                textareaSize="medium"
                rows={3}
                placeholder="Enter system instructions for agent context..."
                description="Default neutral multiline input with vertical resize."
              />

              <LayeredTextarea
                label="Execution Logs"
                tone="copper"
                textareaSize="small"
                rows={3}
                defaultValue="[02:14:09] Initializing local environment...&#10;[02:14:10] CUDA device 0 active (24 GB VRAM allocated).&#10;[02:14:11] Socket listening on port 5173."
                description="Small copper variant for system telemetry and log streams."
              />

              <LayeredTextarea
                label="Initial Prompt Payload"
                tone="green"
                textareaSize="large"
                rows={4}
                required
                defaultValue="Construct a tactile, industrial React component library with plain CSS custom properties and physical interaction states."
                description="Required large green field with description."
              />

              <LayeredTextarea
                label="Security Policy Rules"
                tone="gold"
                rows={3}
                defaultValue="allow-origin: localhost:5173; deny-eval: true;"
                resize="none"
                description="Gold tone variant with resize disabled."
              />

              <LayeredTextarea
                label="Deployment Manifest"
                tone="copper"
                rows={3}
                defaultValue="{ 'version': '1.0.0' }"
                error="Invalid JSON structure: missing required root properties."
              />

              <LayeredTextarea
                label="Hardware Diagnostic Log"
                readOnly
                rows={3}
                defaultValue="ROM Checksum: 0x8F942A&#10;Thermal Sensor: 34.2°C&#10;Voltage Rail 12V: Nominal (12.04V)"
              />

              <LayeredTextarea
                label="Archive Log Dump"
                disabled
                rows={3}
                defaultValue="[ARCHIVED] Offline buffer cleared by administrator."
              />
            </div>

            <LayeredPanel
              tone="copper"
              padding="medium"
              eyebrow="Configuration"
              title="System Directive"
            >
              <LayeredTextarea
                label="Global Agent Directive"
                tone="copper"
                fullWidth
                rows={4}
                defaultValue="You are Antigravity, a tactile UI system assistant. Maintain strict design token discipline and native accessibility attributes."
                description="Full-width textarea nested inside LayeredPanel."
              />
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Checkbox
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <LayeredCheckbox
                label="Include diagnostics"
                tone="neutral"
                checkboxSize="medium"
                description="Attach diagnostic telemetry to the next exported bundle."
              />

              <LayeredCheckbox
                label="Preserve event history"
                tone="copper"
                defaultChecked
                description="Keep prior session events instead of clearing them on restart."
              />

              <LayeredCheckbox
                label="Allow background synchronization"
                tone="green"
                defaultChecked
              />

              <LayeredCheckbox
                label="Mark record for review"
                tone="gold"
                required
                description="Required before this record can be submitted."
              />

              <LayeredCheckbox
                label="Confirm irreversible action"
                tone="copper"
                error="You must confirm this action before continuing."
              />

              <LayeredCheckbox
                label="Include archived entries"
                disabled
              />

              <LayeredCheckbox
                label="Preserve event history"
                tone="green"
                disabled
                defaultChecked
              />

              <LayeredCheckbox
                label="Include archived entries"
                tone="neutral"
                indeterminate
                description="Some archived entries are currently excluded."
              />

              <LayeredCheckbox
                label="Small diagnostics toggle"
                tone="copper"
                checkboxSize="small"
                defaultChecked
              />

              <LayeredCheckbox
                label="Large diagnostics toggle"
                tone="gold"
                checkboxSize="large"
                defaultChecked
              />
            </div>

            <LayeredCheckbox
              label="Allow background synchronization across all connected agents, including remote inference workers running on unmetered network connections"
              tone="copper"
              fullWidth
              description="Full-width checkbox with a long label demonstrating text wrapping."
            />
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Switch
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <LayeredSwitch
                label="Enable telemetry uplink"
                tone="neutral"
                switchSize="medium"
                description="Stream diagnostic events to the monitoring bus."
              />

              <LayeredSwitch
                label="Auto-restart on failure"
                tone="copper"
                defaultChecked
                description="Restart the worker automatically after a crash."
              />

              <LayeredSwitch
                label="Allow background synchronization"
                tone="green"
                defaultChecked
              />

              <LayeredSwitch
                label="Require manual approval"
                tone="gold"
                required
                description="Required before this pipeline can run unattended."
              />

              <LayeredSwitch
                label="Confirm irreversible action"
                tone="copper"
                error="You must confirm this action before continuing."
              />

              <LayeredSwitch
                label="Legacy protocol support"
                disabled
              />

              <LayeredSwitch
                label="Auto-restart on failure"
                tone="green"
                disabled
                defaultChecked
              />

              <LayeredSwitch
                label="Small diagnostics switch"
                tone="copper"
                switchSize="small"
                defaultChecked
              />

              <LayeredSwitch
                label="Large diagnostics switch"
                tone="gold"
                switchSize="large"
                defaultChecked
              />
            </div>

            <LayeredSwitch
              label="Allow background synchronization across all connected agents, including remote inference workers running on unmetered network connections"
              tone="copper"
              fullWidth
              description="Full-width switch with a long label demonstrating text wrapping."
            />
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Dialog
          </h2>

          <div className="component-row">
            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="copper">Open Informational Dialog</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="medium">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Runtime Status</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Current diagnostic summary for the active inference session.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <p>
                  All connected workers report nominal thermal and memory
                  conditions. No corrective action is required at this time.
                </p>
                <LayeredDialogFooter>
                  <LayeredDialogClose asChild>
                    <LayeredButton tone="copper" size="small">
                      Acknowledge
                    </LayeredButton>
                  </LayeredDialogClose>
                </LayeredDialogFooter>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="green">Open Form Dialog</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="medium">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>New Deployment Profile</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Define a named configuration for a repeatable deployment.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <form
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <LayeredInput
                    label="Profile Name"
                    tone="green"
                    placeholder="e.g. Production Rollout"
                    fullWidth
                  />
                  <LayeredTextarea
                    label="Notes"
                    tone="green"
                    rows={4}
                    placeholder="Optional context for this deployment profile..."
                    fullWidth
                  />
                </form>
                <LayeredDialogFooter>
                  <LayeredDialogClose asChild>
                    <LayeredButton tone="neutral" size="small">
                      Cancel
                    </LayeredButton>
                  </LayeredDialogClose>
                  <LayeredDialogClose asChild>
                    <LayeredButton tone="green" size="small">
                      Save Profile
                    </LayeredButton>
                  </LayeredDialogClose>
                </LayeredDialogFooter>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredButton
              tone="gold"
              onClick={() => setControlledDialogOpen(true)}
            >
              Open Controlled Dialog
            </LayeredButton>
            <LayeredDialog
              open={controlledDialogOpen}
              onOpenChange={setControlledDialogOpen}
            >
              <LayeredDialogContent size="small">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>External State</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Open state is owned by the parent laboratory component,
                    not by LayeredDialog itself.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <p>
                  This dialog opened because <code>controlledDialogOpen</code>{" "}
                  became <code>true</code>. Closing it (Escape, outside click,
                  or the button below) calls <code>onOpenChange(false)</code>.
                </p>
                <LayeredDialogFooter>
                  <LayeredButton
                    tone="gold"
                    size="small"
                    onClick={() => setControlledDialogOpen(false)}
                  >
                    Close Programmatically
                  </LayeredButton>
                </LayeredDialogFooter>
              </LayeredDialogContent>
            </LayeredDialog>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="neutral" size="small">Small</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="small">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Small Dialog</LayeredDialogTitle>
                </LayeredDialogHeader>
                <p>Bounded to a compact width for short confirmations and notices.</p>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="neutral" size="small">Medium</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="medium">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Medium Dialog</LayeredDialogTitle>
                </LayeredDialogHeader>
                <p>The default size, suited to most informational and form content.</p>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="neutral" size="small">Large</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="large">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Large Dialog</LayeredDialogTitle>
                </LayeredDialogHeader>
                <p>A wider casing for denser layouts, tables, or multi-column content.</p>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="neutral" size="small">Long Scrollable Content</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="medium">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Release Notes</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    The header and footer remain fixed while this body scrolls.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {Array.from({ length: 14 }, (_, index) => (
                    <p key={index} style={{ margin: 0 }}>
                      Entry {index + 1}: Structural casing and recessed surface
                      geometry verified across both themes. Trench borders and
                      directional lighting remain consistent under scroll.
                    </p>
                  ))}
                </div>
                <LayeredDialogFooter>
                  <LayeredDialogClose asChild>
                    <LayeredButton tone="neutral" size="small">
                      Close
                    </LayeredButton>
                  </LayeredDialogClose>
                </LayeredDialogFooter>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="copper" size="small">Custom Footer Actions</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="medium">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Export Session Bundle</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Choose how the current session bundle should be exported.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <p>
                  The footer below demonstrates arbitrary, non-destructive
                  custom actions rather than a fixed confirm/cancel pair.
                </p>
                <LayeredDialogFooter>
                  <LayeredButton tone="neutral" size="small">
                    Copy Link
                  </LayeredButton>
                  <LayeredButton tone="gold" size="small">
                    Duplicate
                  </LayeredButton>
                  <LayeredDialogClose asChild>
                    <LayeredButton tone="copper" size="small">
                      Export
                    </LayeredButton>
                  </LayeredDialogClose>
                </LayeredDialogFooter>
              </LayeredDialogContent>
            </LayeredDialog>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Tooltip
          </h2>

          <div className="component-row">
            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Basic Tooltip</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent>
                Neutral instrument annotation
              </LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Side: Top</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent side="top">Renders above the trigger</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Side: Right</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent side="right">Renders right of the trigger</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Side: Bottom</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent side="bottom">Renders below the trigger</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Side: Left</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent side="left">Renders left of the trigger</LayeredTooltipContent>
            </LayeredTooltip>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="copper" size="small">Copper</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent tone="copper">Copper tone accent</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="green" size="small">Green</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent tone="green">Green tone accent</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="gold" size="small">Gold</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent tone="gold">Gold tone accent</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Small Size</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent size="small">Compact instrument label</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Medium Size</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent size="medium">
                Medium size, suited to a fuller explanatory sentence
              </LayeredTooltipContent>
            </LayeredTooltip>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small">Multiline</LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent size="medium">
                This tooltip contains a longer explanatory sentence that wraps
                across multiple lines within the configured maximum width.
              </LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredButton
              tone="gold"
              size="small"
              onClick={() => setControlledTooltipOpen((open) => !open)}
            >
              Toggle Controlled Tooltip
            </LayeredButton>
            <LayeredTooltip
              open={controlledTooltipOpen}
              onOpenChange={setControlledTooltipOpen}
            >
              <LayeredTooltipTrigger asChild>
                <span tabIndex={0} style={{ display: "inline-flex" }}>
                  <LayeredButton tone="gold" size="small" tabIndex={-1}>
                    Controlled Target
                  </LayeredButton>
                </span>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent tone="gold">
                Open state is owned by the parent laboratory component.
              </LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small" aria-label="Refresh diagnostics">
                  ⟳
                </LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent>Refresh diagnostics</LayeredTooltipContent>
            </LayeredTooltip>

            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <span
                  tabIndex={0}
                  aria-label="Submit unavailable"
                  aria-disabled="true"
                  style={{ display: "inline-flex" }}
                >
                  <LayeredButton tone="neutral" size="small" disabled aria-disabled="true" tabIndex={-1}>
                    Submit
                  </LayeredButton>
                </span>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent>Fill out required fields first</LayeredTooltipContent>
            </LayeredTooltip>
          </div>

          <div
            style={{
              marginTop: "20px",
              maxWidth: "220px",
              overflow: "hidden",
              padding: "12px",
              border: "1px dashed var(--control-trench)",
            }}
          >
            <LayeredTooltip>
              <LayeredTooltipTrigger asChild>
                <LayeredButton tone="neutral" size="small" fullWidth>
                  Edge Trigger
                </LayeredButton>
              </LayeredTooltipTrigger>
              <LayeredTooltipContent>
                Collision detection flips this tooltip away from the constrained edge.
              </LayeredTooltipContent>
            </LayeredTooltip>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="copper" size="small">Open Dialog With Tooltip</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="small">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Tooltip Inside Dialog</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Verifies stacking: the tooltip must render above the dialog casing.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <LayeredTooltip>
                  <LayeredTooltipTrigger asChild>
                    <LayeredButton tone="copper" size="small">Hover Me</LayeredButton>
                  </LayeredTooltipTrigger>
                  <LayeredTooltipContent tone="copper">
                    Portals above the open dialog casing
                  </LayeredTooltipContent>
                </LayeredTooltip>
              </LayeredDialogContent>
            </LayeredDialog>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Tabs
          </h2>

          <div className="component-row" style={{ alignItems: "flex-start" }}>
            <LayeredTabs defaultValue="overview" style={{ maxWidth: "420px" }}>
              <LayeredTabsList aria-label="Basic tabs">
                <LayeredTabsTrigger value="overview">Overview</LayeredTabsTrigger>
                <LayeredTabsTrigger value="diagnostics">Diagnostics</LayeredTabsTrigger>
                <LayeredTabsTrigger value="logs">Logs</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="overview">
                System status nominal. All subsystems reporting green.
              </LayeredTabsContent>
              <LayeredTabsContent value="diagnostics">
                Diagnostics sweep last ran 4 minutes ago, no faults detected.
              </LayeredTabsContent>
              <LayeredTabsContent value="logs">
                Log stream idle — no events in the last polling interval.
              </LayeredTabsContent>
            </LayeredTabs>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "420px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledTabsValue("overview")}>
                  Overview
                </LayeredButton>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledTabsValue("diagnostics")}>
                  Diagnostics
                </LayeredButton>
              </div>
              <LayeredTabs value={controlledTabsValue} onValueChange={setControlledTabsValue} tone="gold">
                <LayeredTabsList aria-label="Controlled tabs">
                  <LayeredTabsTrigger value="overview">Overview</LayeredTabsTrigger>
                  <LayeredTabsTrigger value="diagnostics">Diagnostics</LayeredTabsTrigger>
                </LayeredTabsList>
                <LayeredTabsContent value="overview">
                  Value is owned by the parent laboratory component, not LayeredTabs itself.
                </LayeredTabsContent>
                <LayeredTabsContent value="diagnostics">
                  The buttons above drive this panel's selection externally.
                </LayeredTabsContent>
              </LayeredTabs>
            </div>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <LayeredTabs defaultValue="a" activationMode="manual" tone="copper" style={{ maxWidth: "360px" }}>
              <LayeredTabsList aria-label="Manual activation tabs">
                <LayeredTabsTrigger value="a">Alpha</LayeredTabsTrigger>
                <LayeredTabsTrigger value="b">Bravo</LayeredTabsTrigger>
                <LayeredTabsTrigger value="c" disabled>Charlie (disabled)</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="a">
                Manual activation: arrow keys move focus without switching panels; Enter or Space activates.
              </LayeredTabsContent>
              <LayeredTabsContent value="b">
                Bravo panel content.
              </LayeredTabsContent>
              <LayeredTabsContent value="c">
                Charlie is disabled and unreachable via keyboard or mouse.
              </LayeredTabsContent>
            </LayeredTabs>

            <LayeredTabs defaultValue="x" tone="green" tabsSize="small" style={{ maxWidth: "280px" }}>
              <LayeredTabsList aria-label="Small green tabs">
                <LayeredTabsTrigger value="x">Sensors</LayeredTabsTrigger>
                <LayeredTabsTrigger value="y">Actuators</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="x">Small size, green tone.</LayeredTabsContent>
              <LayeredTabsContent value="y">Actuator bank nominal.</LayeredTabsContent>
            </LayeredTabs>

            <LayeredTabs defaultValue="x" tabsSize="large" style={{ maxWidth: "320px" }}>
              <LayeredTabsList aria-label="Large tabs">
                <LayeredTabsTrigger value="x">Primary</LayeredTabsTrigger>
                <LayeredTabsTrigger value="y">Secondary</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="x">Large size for touch-friendly targets.</LayeredTabsContent>
              <LayeredTabsContent value="y">Secondary panel.</LayeredTabsContent>
            </LayeredTabs>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            {/* Lab wrapper fixes the demo width — LayeredTabs itself fills
                whatever width its parent gives it. */}
            <div style={{ width: "420px", maxWidth: "100%" }}>
              <LayeredTabs defaultValue="power" orientation="vertical" tone="copper">
                <LayeredTabsList aria-label="Vertical tabs">
                  <LayeredTabsTrigger value="power">Power</LayeredTabsTrigger>
                  <LayeredTabsTrigger value="network">Network</LayeredTabsTrigger>
                  <LayeredTabsTrigger value="storage">Storage</LayeredTabsTrigger>
                </LayeredTabsList>
                <LayeredTabsContent value="power">
                  Power subsystem: 92% capacity, nominal draw.
                </LayeredTabsContent>
                <LayeredTabsContent value="network">
                  Network subsystem: uplink stable, 4ms latency.
                </LayeredTabsContent>
                <LayeredTabsContent value="storage">
                  Storage subsystem: 3 volumes mounted, no errors.
                </LayeredTabsContent>
              </LayeredTabs>
            </div>
          </div>

          <div style={{ marginTop: "20px", maxWidth: "460px" }}>
            <LayeredTabs defaultValue="a" tone="gold">
              <LayeredTabsList aria-label="Many tabs, horizontal scroll overflow">
                <LayeredTabsTrigger value="a">Alpha Station</LayeredTabsTrigger>
                <LayeredTabsTrigger value="b">Bravo Station</LayeredTabsTrigger>
                <LayeredTabsTrigger value="c">Charlie Station</LayeredTabsTrigger>
                <LayeredTabsTrigger value="d">Delta Station</LayeredTabsTrigger>
                <LayeredTabsTrigger value="e">Echo Station</LayeredTabsTrigger>
                <LayeredTabsTrigger value="f">A Very Long Foxtrot Station Label</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="a">Alpha station telemetry.</LayeredTabsContent>
              <LayeredTabsContent value="b">Bravo station telemetry.</LayeredTabsContent>
              <LayeredTabsContent value="c">Charlie station telemetry.</LayeredTabsContent>
              <LayeredTabsContent value="d">Delta station telemetry.</LayeredTabsContent>
              <LayeredTabsContent value="e">Echo station telemetry.</LayeredTabsContent>
              <LayeredTabsContent value="f">
                Long labels stay fully readable — the rail scrolls horizontally instead of truncating text.
              </LayeredTabsContent>
            </LayeredTabs>
          </div>

          <div style={{ marginTop: "20px", maxWidth: "420px" }}>
            <LayeredTabs defaultValue="a" tone="green">
              <LayeredTabsList aria-label="Wrap mode tabs" overflow="wrap">
                <LayeredTabsTrigger value="a">Alpha</LayeredTabsTrigger>
                <LayeredTabsTrigger value="b">Bravo</LayeredTabsTrigger>
                <LayeredTabsTrigger value="c">Charlie</LayeredTabsTrigger>
                <LayeredTabsTrigger value="d">Delta</LayeredTabsTrigger>
                <LayeredTabsTrigger value="e">Echo Recon</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="a">
                Wrap mode: the rail grows to a second row instead of scrolling.
              </LayeredTabsContent>
              <LayeredTabsContent value="b">Bravo panel.</LayeredTabsContent>
              <LayeredTabsContent value="c">Charlie panel.</LayeredTabsContent>
              <LayeredTabsContent value="d">Delta panel.</LayeredTabsContent>
              <LayeredTabsContent value="e">Echo panel.</LayeredTabsContent>
            </LayeredTabs>
          </div>

          {/* Width stability check: the wrapper below is a fixed 360px box.
              Panels hold deliberately different intrinsic content widths
              (a short phrase, a long sentence, and a form control), and
              switching between them must not change the Tabs width — only
              the wrapper controls that, not the active panel's content. */}
          <div style={{ marginTop: "20px", width: "360px", maxWidth: "100%" }}>
            <LayeredTabs defaultValue="short" tone="neutral">
              <LayeredTabsList aria-label="Width stability check tabs">
                <LayeredTabsTrigger value="short">Short</LayeredTabsTrigger>
                <LayeredTabsTrigger value="long">Long</LayeredTabsTrigger>
                <LayeredTabsTrigger value="form">Form</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="short">Idle.</LayeredTabsContent>
              <LayeredTabsContent value="long">
                This panel intentionally holds a much longer run of unbroken
                explanatory text to try to force the tab set wider than the
                short panel — the outer width must stay fixed regardless.
              </LayeredTabsContent>
              <LayeredTabsContent value="form">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
                  <LayeredInput label="Deployment identifier" inputSize="small" />
                  <LayeredCheckbox label="Restart on failure" />
                </div>
              </LayeredTabsContent>
            </LayeredTabs>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <LayeredTabs defaultValue="settings" tone="copper" style={{ maxWidth: "360px" }}>
              <LayeredTabsList aria-label="Form tabs">
                <LayeredTabsTrigger value="settings">Settings</LayeredTabsTrigger>
                <LayeredTabsTrigger value="access">Access</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="settings">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
                  <LayeredInput label="Deployment name" inputSize="small" />
                  <LayeredCheckbox label="Enable auto-restart" />
                </div>
              </LayeredTabsContent>
              <LayeredTabsContent value="access">
                <LayeredCheckbox label="Require operator confirmation" />
              </LayeredTabsContent>
            </LayeredTabs>

            <LayeredTabs defaultValue="raw" tabsSize="small" style={{ maxWidth: "360px" }}>
              <LayeredTabsList aria-label="Plain surface tabs">
                <LayeredTabsTrigger value="raw">Raw Panel</LayeredTabsTrigger>
              </LayeredTabsList>
              <LayeredTabsContent value="raw" surface="plain">
                <LayeredPanel title="Composed Panel">
                  Plain surface Content composes its own LayeredPanel instead of the built-in integrated surface.
                </LayeredPanel>
              </LayeredTabsContent>
            </LayeredTabs>
          </div>

          <div style={{ marginTop: "20px", maxWidth: "420px" }}>
            <LayeredPanel title="Deployment Profile">
              <LayeredTabs defaultValue="basic" tabsSize="small" tone="gold">
                <LayeredTabsList aria-label="Nested tabs inside a panel">
                  <LayeredTabsTrigger value="basic">Basic</LayeredTabsTrigger>
                  <LayeredTabsTrigger value="advanced">Advanced</LayeredTabsTrigger>
                </LayeredTabsList>
                <LayeredTabsContent value="basic">
                  Small nested tabs keep visual weight restrained inside an existing panel casing.
                </LayeredTabsContent>
                <LayeredTabsContent value="advanced">
                  Advanced configuration fields would render here.
                </LayeredTabsContent>
              </LayeredTabs>
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Accordion
          </h2>

          <div className="component-row" style={{ alignItems: "flex-start" }}>
            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" defaultValue="one">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>System Overview</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    All subsystems reporting nominal status.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="two">
                  <LayeredAccordionTrigger>Diagnostics</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Last diagnostic sweep completed 4 minutes ago, no faults found.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="three">
                  <LayeredAccordionTrigger>Logs</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Log stream idle — no events in the last polling interval.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>

            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" collapsible defaultValue="one" tone="copper">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>Collapsible Single Mode</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    This item can be closed entirely, leaving no item open.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="two">
                  <LayeredAccordionTrigger>Power</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Power subsystem: 92% capacity, nominal draw.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredAccordion type="multiple" defaultValue={["one", "two"]} tone="green">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>Sensors</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Sensor array nominal, two items open simultaneously in multiple mode.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="two">
                  <LayeredAccordionTrigger>Actuators</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Actuator bank nominal.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="three" disabled>
                  <LayeredAccordionTrigger>Restricted Bay (disabled)</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    This item is disabled and unreachable via keyboard or mouse.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>

            <div style={{ width: "360px", maxWidth: "100%" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledAccordionValue("one")}>
                  Open One
                </LayeredButton>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledAccordionValue("two")}>
                  Open Two
                </LayeredButton>
              </div>
              <LayeredAccordion
                type="single"
                value={controlledAccordionValue}
                onValueChange={setControlledAccordionValue}
                tone="gold"
              >
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>One</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Value is owned by the parent laboratory component, not the Accordion itself.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
                <LayeredAccordionItem value="two">
                  <LayeredAccordionTrigger>Two</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    The buttons above drive this panel's open item externally.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <div style={{ width: "220px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" collapsible defaultValue="one" accordionSize="small" tone="copper">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>Small</LayeredAccordionTrigger>
                  <LayeredAccordionContent>Compact size.</LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>

            <div style={{ width: "220px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" collapsible defaultValue="one" accordionSize="large" tone="green">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>Large</LayeredAccordionTrigger>
                  <LayeredAccordionContent>Touch-friendly size.</LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>

            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" collapsible defaultValue="one">
                <LayeredAccordionItem value="one">
                  <LayeredAccordionTrigger>
                    A deliberately long trigger label that wraps across multiple lines without pushing the indicator out of the housing
                  </LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    Long labels stay fully readable — the trigger row grows in height instead of truncating text.
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredAccordion type="single" collapsible defaultValue="settings" tone="copper">
                <LayeredAccordionItem value="settings">
                  <LayeredAccordionTrigger>Settings</LayeredAccordionTrigger>
                  <LayeredAccordionContent>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
                      <LayeredInput label="Deployment name" inputSize="small" />
                      <LayeredCheckbox label="Enable auto-restart" />
                    </div>
                  </LayeredAccordionContent>
                </LayeredAccordionItem>
              </LayeredAccordion>
            </div>

            <div style={{ width: "360px", maxWidth: "100%" }}>
              <LayeredPanel title="Diagnostics Panel">
                <LayeredAccordion type="single" collapsible defaultValue="a" accordionSize="small" tone="gold">
                  <LayeredAccordionItem value="a">
                    <LayeredAccordionTrigger>Nested inside a panel</LayeredAccordionTrigger>
                    <LayeredAccordionContent>
                      Small accordion size keeps visual weight restrained inside an existing panel casing.
                    </LayeredAccordionContent>
                  </LayeredAccordionItem>
                </LayeredAccordion>
              </LayeredPanel>
            </div>
          </div>

          <div style={{ marginTop: "20px", width: "420px", maxWidth: "100%" }}>
            <LayeredAccordion type="single" collapsible defaultValue="tabs" tone="green">
              <LayeredAccordionItem value="tabs">
                <LayeredAccordionTrigger>Tabs Inside Accordion Content</LayeredAccordionTrigger>
                <LayeredAccordionContent>
                  <LayeredTabs defaultValue="a" tabsSize="small">
                    <LayeredTabsList aria-label="Tabs nested inside accordion content">
                      <LayeredTabsTrigger value="a">A</LayeredTabsTrigger>
                      <LayeredTabsTrigger value="b">B</LayeredTabsTrigger>
                    </LayeredTabsList>
                    <LayeredTabsContent value="a">Panel A composed inside accordion content.</LayeredTabsContent>
                    <LayeredTabsContent value="b">Panel B composed inside accordion content.</LayeredTabsContent>
                  </LayeredTabs>
                </LayeredAccordionContent>
              </LayeredAccordionItem>
            </LayeredAccordion>
          </div>

          <div style={{ marginTop: "20px", width: "360px", maxWidth: "100%" }}>
            <LayeredAccordion type="single" collapsible defaultValue="outer">
              <LayeredAccordionItem value="outer">
                <LayeredAccordionTrigger>Nested Accordion</LayeredAccordionTrigger>
                <LayeredAccordionContent>
                  <LayeredAccordion type="single" collapsible defaultValue="inner" accordionSize="small" tone="copper">
                    <LayeredAccordionItem value="inner">
                      <LayeredAccordionTrigger headingLevel={4}>Inner Section</LayeredAccordionTrigger>
                      <LayeredAccordionContent>
                        Nested accordion at small size reads as visually lighter than the outer one.
                      </LayeredAccordionContent>
                    </LayeredAccordionItem>
                  </LayeredAccordion>
                </LayeredAccordionContent>
              </LayeredAccordionItem>
            </LayeredAccordion>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Radio Group
          </h2>

          <div className="component-row" style={{ alignItems: "flex-start" }}>
            <LayeredRadioGroup defaultValue="balanced" aria-label="Runtime profile">
              <LayeredRadioGroupItem
                value="performance"
                label="Performance"
                description="Prioritize throughput over power efficiency."
              />
              <LayeredRadioGroupItem
                value="balanced"
                label="Balanced"
                description="Default profile balancing throughput and thermals."
              />
              <LayeredRadioGroupItem
                value="efficiency"
                label="Efficiency"
                description="Minimize power draw at reduced throughput."
              />
            </LayeredRadioGroup>

            <LayeredRadioGroup defaultValue="copper" tone="copper" aria-label="Copper tone">
              <LayeredRadioGroupItem value="copper" label="Copper" />
              <LayeredRadioGroupItem value="alt" label="Alternate" />
            </LayeredRadioGroup>

            <LayeredRadioGroup defaultValue="green" tone="green" aria-label="Green tone">
              <LayeredRadioGroupItem value="green" label="Green" />
              <LayeredRadioGroupItem value="alt" label="Alternate" />
            </LayeredRadioGroup>

            <LayeredRadioGroup defaultValue="gold" tone="gold" aria-label="Gold tone">
              <LayeredRadioGroupItem value="gold" label="Gold" />
              <LayeredRadioGroupItem value="alt" label="Alternate" />
            </LayeredRadioGroup>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <LayeredRadioGroup defaultValue="a" radioGroupSize="small" aria-label="Small size">
              <LayeredRadioGroupItem value="a" label="Small A" />
              <LayeredRadioGroupItem value="b" label="Small B" />
            </LayeredRadioGroup>

            <LayeredRadioGroup defaultValue="a" radioGroupSize="large" aria-label="Large size">
              <LayeredRadioGroupItem value="a" label="Large A" />
              <LayeredRadioGroupItem value="b" label="Large B" />
            </LayeredRadioGroup>

            <LayeredRadioGroup
              defaultValue="a"
              orientation="horizontal"
              aria-label="Horizontal orientation"
            >
              <LayeredRadioGroupItem value="a" label="A" />
              <LayeredRadioGroupItem value="b" label="B" />
              <LayeredRadioGroupItem value="c" label="C" />
            </LayeredRadioGroup>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <LayeredRadioGroup defaultValue="a" disabled aria-label="Disabled group">
              <LayeredRadioGroupItem value="a" label="Disabled A" />
              <LayeredRadioGroupItem value="b" label="Disabled B" />
            </LayeredRadioGroup>

            <LayeredRadioGroup defaultValue="b" aria-label="Single disabled item">
              <LayeredRadioGroupItem value="a" label="Available" />
              <LayeredRadioGroupItem value="b" label="Selected but disabled" disabled />
              <LayeredRadioGroupItem value="c" label="Available" />
            </LayeredRadioGroup>

            <LayeredRadioGroup
              defaultValue=""
              error="Select a delivery method before continuing."
              aria-label="Invalid group"
            >
              <LayeredRadioGroupItem value="standard" label="Standard Shipping" />
              <LayeredRadioGroupItem value="express" label="Express Shipping" />
            </LayeredRadioGroup>
          </div>

          <div className="component-row" style={{ marginTop: "20px", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledRadioValue("performance")}>
                  Performance
                </LayeredButton>
                <LayeredButton size="small" tone="gold" onClick={() => setControlledRadioValue("balanced")}>
                  Balanced
                </LayeredButton>
              </div>
              <LayeredRadioGroup
                value={controlledRadioValue}
                onValueChange={setControlledRadioValue}
                tone="gold"
                aria-label="Controlled runtime profile"
              >
                <LayeredRadioGroupItem
                  value="performance"
                  label="Performance"
                  description="Value is owned by the parent laboratory component, not LayeredRadioGroup itself."
                />
                <LayeredRadioGroupItem
                  value="balanced"
                  label="Balanced"
                  description="The buttons above drive this selection externally."
                />
              </LayeredRadioGroup>
            </div>

            <LayeredPanel title="Deployment Profile">
              <LayeredRadioGroup defaultValue="rolling" radioGroupSize="small" tone="copper">
                <LayeredRadioGroupItem value="rolling" label="Rolling Deploy" />
                <LayeredRadioGroupItem value="blue-green" label="Blue/Green Deploy" />
              </LayeredRadioGroup>
            </LayeredPanel>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Toast
          </h2>

          <div className="component-row" style={{ marginBottom: "16px" }}>
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              Viewport position:
            </span>
            {(
              ["top-left", "top-right", "bottom-left", "bottom-right"] as LayeredToastPosition[]
            ).map((position) => (
              <LayeredButton
                key={position}
                tone={toastPosition === position ? "copper" : "neutral"}
                size="small"
                onClick={() => {
                  setToastPosition(position);
                  openToast("position-confirm");
                }}
              >
                {position}
              </LayeredButton>
            ))}
          </div>

          <div className="component-row" style={{ marginBottom: "16px" }}>
            <LayeredToast {...toastOpenProps("position-confirm")}>
              <LayeredToastTitle>Viewport Repositioned</LayeredToastTitle>
              <LayeredToastDescription>
                Now anchored {toastPosition}, swipe direction {toastSwipeDirection}.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row">
            <LayeredButton tone="neutral" onClick={() => openToast("basic")}>
              Basic Toast
            </LayeredButton>
            <LayeredToast {...toastOpenProps("basic")}>
              <LayeredToastTitle>Deployment Complete</LayeredToastTitle>
              <LayeredToastDescription>
                The build finished without errors.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="copper" onClick={() => openToast("copper")}>
              Copper Tone
            </LayeredButton>
            <LayeredToast tone="copper" {...toastOpenProps("copper")}>
              <LayeredToastTitle>Copper Toast</LayeredToastTitle>
              <LayeredToastDescription>Restrained copper edge accent.</LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="green" onClick={() => openToast("green")}>
              Green Tone
            </LayeredButton>
            <LayeredToast tone="green" {...toastOpenProps("green")}>
              <LayeredToastTitle>Green Toast</LayeredToastTitle>
              <LayeredToastDescription>Restrained green edge accent.</LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="gold" onClick={() => openToast("gold")}>
              Gold Tone
            </LayeredButton>
            <LayeredToast tone="gold" {...toastOpenProps("gold")}>
              <LayeredToastTitle>Gold Toast</LayeredToastTitle>
              <LayeredToastDescription>Restrained gold edge accent.</LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton tone="neutral" size="small" onClick={() => openToast("title-only")}>
              Title Only
            </LayeredButton>
            <LayeredToast {...toastOpenProps("title-only")}>
              <LayeredToastTitle>Session Saved</LayeredToastTitle>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("description-only")}>
              Description Only
            </LayeredButton>
            <LayeredToast {...toastOpenProps("description-only")}>
              <LayeredToastDescription>
                Background sync finished three minutes ago.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("title-description")}>
              Title + Description
            </LayeredButton>
            <LayeredToast {...toastOpenProps("title-description")}>
              <LayeredToastTitle>Profile Updated</LayeredToastTitle>
              <LayeredToastDescription>
                Your deployment profile changes were saved.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton tone="green" size="small" onClick={() => openToast("action")}>
              With Action
            </LayeredButton>
            <LayeredToast {...toastOpenProps("action")}>
              <LayeredToastTitle>File Deleted</LayeredToastTitle>
              <LayeredToastDescription>report.csv was moved to trash.</LayeredToastDescription>
              <LayeredToastAction altText="Undo deleting report.csv">Undo</LayeredToastAction>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("custom-close")}>
              Custom Close Child
            </LayeredButton>
            <LayeredToast {...toastOpenProps("custom-close")}>
              <LayeredToastTitle>Custom Dismiss Label</LayeredToastTitle>
              <LayeredToastDescription>
                This Toast's Close renders explicit text instead of the default glyph.
              </LayeredToastDescription>
              <LayeredToastClose>Dismiss</LayeredToastClose>
            </LayeredToast>

            <LayeredButton
              tone="gold"
              size="small"
              onClick={() => setControlledToastOpen(true)}
            >
              Controlled Toast
            </LayeredButton>
            <LayeredToast
              open={controlledToastOpen}
              onOpenChange={setControlledToastOpen}
            >
              <LayeredToastTitle>External State</LayeredToastTitle>
              <LayeredToastDescription>
                Open state is owned by the parent laboratory component, not by
                LayeredToast itself.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton tone="neutral" size="small" onClick={() => openToast("foreground")}>
              Foreground Type
            </LayeredButton>
            <LayeredToast type="foreground" {...toastOpenProps("foreground")}>
              <LayeredToastTitle>Foreground Announcement</LayeredToastTitle>
              <LayeredToastDescription>
                Interrupts current screen-reader output immediately.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("background")}>
              Background Type
            </LayeredButton>
            <LayeredToast type="background" {...toastOpenProps("background")}>
              <LayeredToastTitle>Background Announcement</LayeredToastTitle>
              <LayeredToastDescription>
                Announced without interrupting current screen-reader output.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("duration")}>
              Custom Duration (10s)
            </LayeredButton>
            <LayeredToast duration={10000} {...toastOpenProps("duration")}>
              <LayeredToastTitle>Extended Duration</LayeredToastTitle>
              <LayeredToastDescription>
                This Toast overrides Provider's 5s default with a 10s duration prop.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton tone="neutral" size="small" onClick={() => openToast("long-content")}>
              Long Content
            </LayeredButton>
            <LayeredToast {...toastOpenProps("long-content")}>
              <LayeredToastTitle>
                A deliberately long title that wraps across multiple lines without widening the Viewport
              </LayeredToastTitle>
              <LayeredToastDescription>
                A deliberately long description demonstrating that body text wraps within the fixed
                casing width instead of pushing the Action or Close controls outside it, regardless of
                how much content is supplied.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("long-action")}>
              Long Action Label
            </LayeredButton>
            <LayeredToast {...toastOpenProps("long-action")}>
              <LayeredToastTitle>Export Ready</LayeredToastTitle>
              <LayeredToastDescription>Your report is ready to download.</LayeredToastDescription>
              <LayeredToastAction altText="Download the generated export file now">
                Download Export File
              </LayeredToastAction>
              <LayeredToastClose />
            </LayeredToast>

            <LayeredButton tone="neutral" size="small" onClick={() => openToast("swipe")}>
              Swipe To Dismiss
            </LayeredButton>
            <LayeredToast {...toastOpenProps("swipe")}>
              <LayeredToastTitle>Drag To Dismiss</LayeredToastTitle>
              <LayeredToastDescription>
                Drag this Toast toward the Viewport's current swipe direction ({toastSwipeDirection}) —
                it tracks the pointer directly and exits on release past the threshold.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton tone="copper" size="small" onClick={addStackToast}>
              Add Toast To Stack
            </LayeredButton>
            {toastStack.map((id) => (
              <LayeredToast
                key={id}
                open
                onOpenChange={(open) => {
                  if (!open) removeStackToast(id);
                }}
              >
                <LayeredToastTitle>Stack Toast #{id}</LayeredToastTitle>
                <LayeredToastDescription>
                  Appended to consumer state — DOM order (not CSS) determines stack order.
                </LayeredToastDescription>
                <LayeredToastClose />
              </LayeredToast>
            ))}
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="neutral" size="small">
                  Open Dialog, Then Fire Toast
                </LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="small">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Settings</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Saving fires a Toast that renders above this Dialog via the shared z-index scale.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <LayeredButton
                  tone="green"
                  size="small"
                  onClick={() => openToast("above-dialog")}
                >
                  Save Settings
                </LayeredButton>
              </LayeredDialogContent>
            </LayeredDialog>
            <LayeredToast {...toastOpenProps("above-dialog")}>
              <LayeredToastTitle>Settings Saved</LayeredToastTitle>
              <LayeredToastDescription>
                Visible above the open Dialog. This is a visual/announcement check only — Toast
                controls are not guaranteed reachable through the Dialog's focus trap. Critical
                confirmations belong in Dialog/AlertDialog, not Toast.
              </LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredButton
              tone="neutral"
              size="small"
              onClick={() => openToast("tooltip-action")}
            >
              Toast With Tooltip On Action
            </LayeredButton>
            <LayeredToast {...toastOpenProps("tooltip-action")}>
              <LayeredToastTitle>Sync Failed</LayeredToastTitle>
              <LayeredToastDescription>Retry the last sync attempt.</LayeredToastDescription>
              <LayeredTooltip>
                <LayeredTooltipTrigger asChild>
                  <LayeredToastAction altText="Retry the last sync attempt">
                    Retry
                  </LayeredToastAction>
                </LayeredTooltipTrigger>
                <LayeredTooltipContent>
                  Retries the most recent failed sync job
                </LayeredTooltipContent>
              </LayeredTooltip>
              <LayeredToastClose />
            </LayeredToast>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Popover
          </h2>

          <div className="component-row">
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Basic Popover</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <p style={{ margin: 0 }}>Uncontrolled — Radix owns open state.</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredButton
              tone="gold"
              size="small"
              onClick={() => setControlledPopoverOpen((open) => !open)}
            >
              Toggle Controlled Popover
            </LayeredButton>
            <LayeredPopover
              open={controlledPopoverOpen}
              onOpenChange={setControlledPopoverOpen}
            >
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="gold" size="small" tabIndex={-1}>
                  Controlled Target
                </LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="gold">
                <p style={{ margin: 0 }}>
                  Open state is owned by the parent laboratory component.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover open={anchorPopoverOpen} onOpenChange={setAnchorPopoverOpen}>
              <LayeredPopoverAnchor asChild>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    border: "1px dashed var(--control-trench)",
                    borderRadius: "var(--control-radius-inner)",
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Anchor element (not the Trigger)
                </span>
              </LayeredPopoverAnchor>
              <LayeredButton
                tone="neutral"
                size="small"
                onClick={() => setAnchorPopoverOpen((open) => !open)}
              >
                Toggle Anchored Content
              </LayeredButton>
              <LayeredPopoverContent>
                <p style={{ margin: 0 }}>
                  Positioned against the Anchor element above, not this trigger button.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="copper" size="small">Copper</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="copper">
                <p style={{ margin: 0 }}>Copper tone accent</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="green" size="small">Green</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="green">
                <p style={{ margin: 0 }}>Green tone accent</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="gold" size="small">Gold</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="gold">
                <p style={{ margin: 0 }}>Gold tone accent</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Small Size</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent popoverSize="small">
                <p style={{ margin: 0 }}>Compact contextual surface.</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Medium Size</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent popoverSize="medium">
                <p style={{ margin: 0 }}>
                  Medium size, suited to a short form or a fuller explanation.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <p style={{ marginTop: "20px", marginBottom: "8px", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            Open by default — the Side/Align buttons below reposition it live without closing it.
            (Lab-only wiring: <code>onInteractOutside</code> ignores clicks on the selector buttons
            themselves; a click anywhere else still dismisses it normally, since Popover is non-modal.)
          </p>
          <div className="component-row" style={{ alignItems: "center" }}>
            <div ref={positionSelectorsRef} style={{ display: "contents" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Side:</span>
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <LayeredButton
                  key={side}
                  tone={popoverSide === side ? "copper" : "neutral"}
                  size="small"
                  onClick={() => setPopoverSide(side)}
                >
                  {side}
                </LayeredButton>
              ))}

              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginLeft: "12px" }}>
                Align:
              </span>
              {(["start", "center", "end"] as const).map((align) => (
                <LayeredButton
                  key={align}
                  tone={popoverAlign === align ? "copper" : "neutral"}
                  size="small"
                  onClick={() => setPopoverAlign(align)}
                >
                  {align}
                </LayeredButton>
              ))}
            </div>

            <LayeredPopover open={positionDemoOpen} onOpenChange={setPositionDemoOpen}>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">
                  {positionDemoOpen ? "Hide" : "Show"} Positioned Popover
                </LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent
                side={popoverSide}
                align={popoverAlign}
                onInteractOutside={(event) => {
                  if (
                    positionSelectorsRef.current?.contains(
                      event.target as Node
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <p style={{ margin: 0 }}>
                  side="{popoverSide}" align="{popoverAlign}"
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Default Arrow</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <p style={{ margin: 0 }}>Arrow renders by default.</p>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">No Arrow</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent showArrow={false}>
                <p style={{ margin: 0 }}>showArrow={"{false}"} suppresses it.</p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Default Close</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <p style={{ margin: 0 }}>Renders the internal mechanical X.</p>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <LayeredPopoverClose />
                  </div>
                </div>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Explicit-Child Close</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <p style={{ margin: 0 }}>Close renders supplied children instead of the glyph.</p>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <LayeredPopoverClose className="layered-popover-lab__text-close">
                      Dismiss
                    </LayeredPopoverClose>
                  </div>
                </div>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">asChild Close</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <p style={{ margin: 0 }}>Close composes around a consumer's own element.</p>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <LayeredPopoverClose asChild>
                      <LayeredButton tone="copper" size="small">Got it</LayeredButton>
                    </LayeredPopoverClose>
                  </div>
                </div>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">No Close</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <p style={{ margin: 0 }}>
                  Dismissed only via Escape or outside click — Close is fully optional.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="copper" size="small">Quick Settings</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="copper" popoverSize="medium" style={{ width: "260px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <LayeredInput label="Display name" placeholder="Enter a name" />
                  <LayeredCheckbox label="Enable notifications" defaultChecked />
                  <LayeredSwitch label="Auto-sync" />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <LayeredPopoverClose asChild>
                      <LayeredButton tone="copper" size="small">Save</LayeredButton>
                    </LayeredPopoverClose>
                  </div>
                </div>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Long Content</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent popoverSize="medium">
                <p>
                  This popover contains a long block of explanatory text used to verify
                  that the internal body scrolls independently of the outer casing once
                  content exceeds the available viewport height, while the Arrow and
                  border remain unclipped throughout.
                </p>
                <p>
                  Repeated content to force overflow. Repeated content to force overflow.
                  Repeated content to force overflow. Repeated content to force overflow.
                </p>
                <p>
                  Repeated content to force overflow. Repeated content to force overflow.
                  Repeated content to force overflow. Repeated content to force overflow.
                </p>
                <p style={{ marginBottom: 0 }}>
                  Repeated content to force overflow. Repeated content to force overflow.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div
            style={{
              marginTop: "20px",
              maxWidth: "220px",
              overflow: "hidden",
              padding: "12px",
              border: "1px dashed var(--control-trench)",
            }}
          >
            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small" fullWidth>
                  Edge Trigger
                </LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <p style={{ margin: 0 }}>
                  Collision detection flips and shifts this popover away from the constrained edge.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>

          <div className="component-row" style={{ marginTop: "20px" }}>
            <LayeredDialog>
              <LayeredDialogTrigger asChild>
                <LayeredButton tone="copper" size="small">Open Dialog With Popover</LayeredButton>
              </LayeredDialogTrigger>
              <LayeredDialogContent size="small">
                <LayeredDialogHeader>
                  <LayeredDialogTitle>Popover Inside Dialog</LayeredDialogTitle>
                  <LayeredDialogDescription>
                    Verifies stacking: the popover must render above the dialog casing.
                  </LayeredDialogDescription>
                </LayeredDialogHeader>
                <LayeredPopover>
                  <LayeredPopoverTrigger asChild>
                    <LayeredButton tone="copper" size="small">Open Popover</LayeredButton>
                  </LayeredPopoverTrigger>
                  <LayeredPopoverContent tone="copper">
                    <p style={{ margin: 0 }}>Portals above the open dialog casing.</p>
                  </LayeredPopoverContent>
                </LayeredPopover>
              </LayeredDialogContent>
            </LayeredDialog>

            <LayeredPopover>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="neutral" size="small">Popover With Tooltip</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <p style={{ margin: 0 }}>A control inside this popover has its own tooltip.</p>
                  <LayeredTooltip>
                    <LayeredTooltipTrigger asChild>
                      <LayeredButton tone="neutral" size="small" aria-label="Refresh">
                        ⟳
                      </LayeredButton>
                    </LayeredTooltipTrigger>
                    <LayeredTooltipContent>
                      Renders above the popover it is nested within
                    </LayeredTooltipContent>
                  </LayeredTooltip>
                </div>
              </LayeredPopoverContent>
            </LayeredPopover>

            <LayeredPopover modal>
              <LayeredPopoverTrigger asChild>
                <LayeredButton tone="gold" size="small">Modal Popover</LayeredButton>
              </LayeredPopoverTrigger>
              <LayeredPopoverContent tone="gold">
                <p style={{ margin: 0 }}>
                  modal={"{true}"} traps focus and blocks outside pointer interaction.
                </p>
              </LayeredPopoverContent>
            </LayeredPopover>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Dropdown Menu
          </h2>

          <div className="component-row">
            <LayeredDropdownMenu>
              <LayeredDropdownMenuTrigger asChild>
                <LayeredButton tone="neutral" size="small">Basic Menu</LayeredButton>
              </LayeredDropdownMenuTrigger>
              <LayeredDropdownMenuContent>
                <LayeredDropdownMenuItem onSelect={() => console.log("New File")}>
                  New File
                </LayeredDropdownMenuItem>
                <LayeredDropdownMenuItem onSelect={() => console.log("Open")}>
                  Open…
                </LayeredDropdownMenuItem>
                <LayeredDropdownMenuItem disabled>
                  Open Recent
                </LayeredDropdownMenuItem>
                <LayeredDropdownMenuSeparator />
                <LayeredDropdownMenuItem
                  intent="destructive"
                  onSelect={() => console.log("Delete")}
                >
                  Delete
                </LayeredDropdownMenuItem>
              </LayeredDropdownMenuContent>
            </LayeredDropdownMenu>

            <LayeredDropdownMenu>
              <LayeredDropdownMenuTrigger asChild>
                <LayeredButton tone="copper" size="small">Groups &amp; Checkboxes</LayeredButton>
              </LayeredDropdownMenuTrigger>
              <LayeredDropdownMenuContent tone="copper">
                <LayeredDropdownMenuLabel>View</LayeredDropdownMenuLabel>
                <LayeredDropdownMenuGroup>
                  <LayeredDropdownMenuCheckboxItem
                    checked={menuShowStatusBar}
                    onCheckedChange={setMenuShowStatusBar}
                  >
                    Status Bar
                  </LayeredDropdownMenuCheckboxItem>
                  <LayeredDropdownMenuCheckboxItem
                    checked={menuShowMinimap}
                    onCheckedChange={setMenuShowMinimap}
                  >
                    Minimap
                  </LayeredDropdownMenuCheckboxItem>
                </LayeredDropdownMenuGroup>
                <LayeredDropdownMenuSeparator />
                <LayeredDropdownMenuLabel>Theme</LayeredDropdownMenuLabel>
                <LayeredDropdownMenuRadioGroup
                  value={menuTheme}
                  onValueChange={setMenuTheme}
                >
                  <LayeredDropdownMenuRadioItem value="dark">
                    Dark
                  </LayeredDropdownMenuRadioItem>
                  <LayeredDropdownMenuRadioItem value="light">
                    Light
                  </LayeredDropdownMenuRadioItem>
                  <LayeredDropdownMenuRadioItem value="system">
                    System
                  </LayeredDropdownMenuRadioItem>
                </LayeredDropdownMenuRadioGroup>
              </LayeredDropdownMenuContent>
            </LayeredDropdownMenu>

            <LayeredDropdownMenu>
              <LayeredDropdownMenuTrigger asChild>
                <LayeredButton tone="green" size="small">With Submenu</LayeredButton>
              </LayeredDropdownMenuTrigger>
              <LayeredDropdownMenuContent tone="green">
                <LayeredDropdownMenuItem onSelect={() => console.log("Share")}>
                  Share
                </LayeredDropdownMenuItem>
                <LayeredDropdownMenuSub>
                  <LayeredDropdownMenuSubTrigger>
                    Export As
                  </LayeredDropdownMenuSubTrigger>
                  <LayeredDropdownMenuSubContent tone="green">
                    <LayeredDropdownMenuItem onSelect={() => console.log("PNG")}>
                      PNG
                    </LayeredDropdownMenuItem>
                    <LayeredDropdownMenuItem onSelect={() => console.log("SVG")}>
                      SVG
                    </LayeredDropdownMenuItem>
                    <LayeredDropdownMenuItem onSelect={() => console.log("PDF")}>
                      PDF
                    </LayeredDropdownMenuItem>
                  </LayeredDropdownMenuSubContent>
                </LayeredDropdownMenuSub>
              </LayeredDropdownMenuContent>
            </LayeredDropdownMenu>

            <LayeredDropdownMenu>
              <LayeredDropdownMenuTrigger asChild>
                <LayeredButton tone="gold" size="small">Medium Size</LayeredButton>
              </LayeredDropdownMenuTrigger>
              <LayeredDropdownMenuContent tone="gold" menuSize="medium">
                <LayeredDropdownMenuItem onSelect={() => console.log("Profile")}>
                  Profile
                </LayeredDropdownMenuItem>
                <LayeredDropdownMenuItem onSelect={() => console.log("Settings")}>
                  Settings
                </LayeredDropdownMenuItem>
              </LayeredDropdownMenuContent>
            </LayeredDropdownMenu>
          </div>
        </section>

        <section className="component-section">
          <h2 className="component-section__title">
            Layered Combobox
          </h2>

          <div className="component-row">
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <LayeredCombobox
                items={frameworkOptions}
                value={comboboxFramework}
                onValueChange={setComboboxFramework}
              >
                <LayeredComboboxLabel>Framework</LayeredComboboxLabel>
                <LayeredComboboxInputGroup>
                  <LayeredComboboxInput placeholder="Search frameworks…" />
                  <LayeredComboboxClear />
                  <LayeredComboboxIcon />
                </LayeredComboboxInputGroup>
                <LayeredComboboxContent>
                  <LayeredComboboxEmpty>No frameworks found.</LayeredComboboxEmpty>
                  <LayeredComboboxList>
                    {(item: string) => (
                      <LayeredComboboxItem key={item} value={item}>
                        {item}
                      </LayeredComboboxItem>
                    )}
                  </LayeredComboboxList>
                </LayeredComboboxContent>
              </LayeredCombobox>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <LayeredCombobox
                value={comboboxCountry}
                onValueChange={setComboboxCountry}
              >
                <LayeredComboboxLabel>Country</LayeredComboboxLabel>
                <LayeredComboboxInputGroup tone="copper">
                  <LayeredComboboxInput placeholder="Search countries…" />
                  <LayeredComboboxClear />
                  <LayeredComboboxIcon />
                </LayeredComboboxInputGroup>
                <LayeredComboboxContent tone="copper">
                  <LayeredComboboxEmpty>No countries found.</LayeredComboboxEmpty>
                  <LayeredComboboxList>
                    <LayeredComboboxGroup>
                      <LayeredComboboxGroupLabel>North America</LayeredComboboxGroupLabel>
                      <LayeredComboboxItem value="Canada">Canada</LayeredComboboxItem>
                      <LayeredComboboxItem value="Mexico">Mexico</LayeredComboboxItem>
                      <LayeredComboboxItem value="United States">
                        United States
                      </LayeredComboboxItem>
                    </LayeredComboboxGroup>
                    <LayeredComboboxGroup>
                      <LayeredComboboxGroupLabel>Europe</LayeredComboboxGroupLabel>
                      <LayeredComboboxItem value="France">France</LayeredComboboxItem>
                      <LayeredComboboxItem value="Germany">Germany</LayeredComboboxItem>
                      <LayeredComboboxItem value="Spain">Spain</LayeredComboboxItem>
                    </LayeredComboboxGroup>
                  </LayeredComboboxList>
                </LayeredComboboxContent>
              </LayeredCombobox>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <LayeredCombobox items={frameworkOptions} disabled>
                <LayeredComboboxLabel>Disabled</LayeredComboboxLabel>
                <LayeredComboboxInputGroup tone="gold">
                  <LayeredComboboxInput placeholder="Unavailable" />
                  <LayeredComboboxIcon />
                </LayeredComboboxInputGroup>
                <LayeredComboboxContent tone="gold">
                  <LayeredComboboxList>
                    {(item: string) => (
                      <LayeredComboboxItem key={item} value={item}>
                        {item}
                      </LayeredComboboxItem>
                    )}
                  </LayeredComboboxList>
                </LayeredComboboxContent>
              </LayeredCombobox>
            </div>
          </div>
        </section>
      </div>
    </main>
    <LayeredToastViewport position={toastPosition} />
    </LayeredTooltipProvider>
    </LayeredToastProvider>
  );
}

export default App;