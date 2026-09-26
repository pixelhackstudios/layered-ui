import { useId } from "react";
import { themes, useTheme } from "../theme";

/* Two native radios seated in one trench: arrow keys switch, Tab leaves. */
export function ThemeSelector({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const name = useId();

  return (
    <fieldset className="theme-selector" data-compact={compact ? "true" : undefined}>
      <legend className="theme-selector__legend">Theme</legend>
      <div className="theme-selector__trench">
        {themes.map((option) => (
          <label key={option.id} className="theme-selector__key" data-theme-swatch={option.id}>
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={theme === option.id}
              onChange={() => setTheme(option.id)}
            />
            <span className="theme-selector__lamp" aria-hidden="true" />
            <span className="theme-selector__text">{compact && option.id === "field" ? "Field" : option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
