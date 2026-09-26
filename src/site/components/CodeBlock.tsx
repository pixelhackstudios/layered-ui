import { useEffect, useMemo, useRef, useState } from "react";
import { tokenize, type Language } from "./highlight";

export interface CodeBlockProps {
  code: string;
  language?: Language;
  label?: string;
  /* Prompt-style single commands render without a line gutter. */
  compact?: boolean;
}

export function CodeBlock({ code, language = "tsx", label, compact = false }: CodeBlockProps) {
  const tokens = useMemo(() => tokenize(code, language), [code, language]);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="code-block" data-compact={compact ? "true" : undefined}>
      <figcaption className="code-block__bar">
        <span className="code-block__label">{label ?? language}</span>
        <button type="button" className="site-key" onClick={copy}>
          <span aria-hidden="true" className="site-key__lamp" data-lit={copied ? "true" : undefined} />
          {copied ? "Copied" : "Copy"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </figcaption>
      <pre className="code-block__screen" tabIndex={0}>
        <code>
          {tokens.map((token, index) =>
            token.kind === "plain" ? (
              token.text
            ) : (
              <span key={index} className={`tok tok--${token.kind}`}>
                {token.text}
              </span>
            )
          )}
        </code>
      </pre>
    </figure>
  );
}
