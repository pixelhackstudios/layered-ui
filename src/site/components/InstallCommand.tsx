import {
  LayeredTabs,
  LayeredTabsContent,
  LayeredTabsList,
  LayeredTabsTrigger,
} from "../../../registry/components/layered-tabs/LayeredTabs";
import { CodeBlock } from "./CodeBlock";

const runners = [
  { id: "npm", command: "npx shadcn@latest add" },
  { id: "pnpm", command: "pnpm dlx shadcn@latest add" },
  { id: "yarn", command: "yarn dlx shadcn@latest add" },
  { id: "bun", command: "bunx --bun shadcn@latest add" },
] as const;

export const registryPrefix = "pixelhackstudios/layered-ui/";

export function InstallCommand({ items }: { items: string[] }) {
  const targets = items.map((item) => registryPrefix + item).join(" ");

  return (
    <LayeredTabs defaultValue="npm" tone="copper" tabsSize="small" className="install-command">
      <LayeredTabsList aria-label="Package runner">
        {runners.map((runner) => (
          <LayeredTabsTrigger key={runner.id} value={runner.id}>
            {runner.id}
          </LayeredTabsTrigger>
        ))}
      </LayeredTabsList>
      {runners.map((runner) => (
        <LayeredTabsContent key={runner.id} value={runner.id} surface="plain">
          <CodeBlock code={`${runner.command} ${targets}`} language="bash" label="terminal" compact />
        </LayeredTabsContent>
      ))}
    </LayeredTabs>
  );
}
