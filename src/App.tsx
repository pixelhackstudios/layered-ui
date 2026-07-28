import { useState, useEffect } from "react";
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
import { LayeredSelect } from "../registry/components/layered-select/LayeredSelect";
import { LayeredSwitch } from "../registry/components/layered-switch/LayeredSwitch";
import { LayeredTextarea } from "../registry/components/layered-textarea/LayeredTextarea";

type ThemeMode = "classic" | "field";

function App() {
  const [theme, setTheme] = useState<ThemeMode>("classic");
  const [controlledDialogOpen, setControlledDialogOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
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
      </div>
    </main>
  );
}

export default App;