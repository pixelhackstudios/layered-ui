/* A deliberately small tokenizer: enough to separate comments, strings,
   keywords, JSX tags, attributes, and numbers in the snippets this site
   shows. It is not a parser and never needs to be. */

export type TokenKind =
  | "comment"
  | "string"
  | "keyword"
  | "tag"
  | "attr"
  | "number"
  | "property"
  | "command"
  | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

export type Language = "tsx" | "bash" | "json" | "css";

const tsxKeywords =
  "import|from|export|default|function|return|const|let|type|interface|if|else|true|false|null|undefined|new|as|extends|typeof";

const patterns: Record<Language, [TokenKind, string][]> = {
  tsx: [
    ["comment", String.raw`\/\*[\s\S]*?\*\/|\/\/[^\n]*`],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\x60(?:[^\x60\\]|\\.)*\x60`],
    ["tag", String.raw`(?<=<\/?)[A-Za-z][\w.]*`],
    ["attr", String.raw`\b[a-zA-Z-]+(?==[{"])`],
    ["keyword", String.raw`\b(?:${tsxKeywords})\b`],
    ["number", String.raw`\b\d+(?:\.\d+)?\b`],
  ],
  bash: [
    ["comment", String.raw`#[^\n]*`],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"|'[^'\n]*'`],
    ["command", String.raw`^(?:npx|npm|pnpm|yarn|bunx|bun)\b`],
  ],
  json: [
    ["property", String.raw`"(?:[^"\\\n]|\\.)*"(?=\s*:)`],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"`],
    ["keyword", String.raw`\b(?:true|false|null)\b`],
    ["number", String.raw`-?\b\d+(?:\.\d+)?\b`],
  ],
  css: [
    ["comment", String.raw`\/\*[\s\S]*?\*\/`],
    ["property", String.raw`--[\w-]+|[\w-]+(?=\s*:)`],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"`],
    ["number", String.raw`#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|ms|%)?`],
  ],
};

const compiled = Object.fromEntries(
  Object.entries(patterns).map(([language, rules]) => [
    language,
    {
      kinds: rules.map(([kind]) => kind),
      regex: new RegExp(rules.map(([, source]) => `(${source})`).join("|"), "gm"),
    },
  ])
) as Record<Language, { kinds: TokenKind[]; regex: RegExp }>;

export function tokenize(code: string, language: Language): Token[] {
  const { kinds, regex } = compiled[language];
  const tokens: Token[] = [];
  let cursor = 0;

  for (const match of code.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ kind: "plain", text: code.slice(cursor, index) });
    const group = match.slice(1).findIndex((value) => value !== undefined);
    tokens.push({ kind: kinds[group] ?? "plain", text: match[0] });
    cursor = index + match[0].length;
  }

  if (cursor < code.length) tokens.push({ kind: "plain", text: code.slice(cursor) });
  return tokens;
}
