import { useState, useEffect } from "react";
import { LayeredButton } from "./components/LayeredButton/LayeredButton";
import { LayeredDisplayCard } from "./components/LayeredDisplayCard/LayeredDisplayCard";
import { LayeredInput } from "./components/LayeredInput/LayeredInput";
import { LayeredPanel } from "./components/LayeredPanel/LayeredPanel";
import { LayeredSelect } from "./components/LayeredSelect/LayeredSelect";

type ThemeMode = "classic" | "field";

function App() {
  const [theme, setTheme] = useState<ThemeMode>("classic");

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
      </div>
    </main>
  );
}

export default App;