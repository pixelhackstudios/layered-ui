import {
  LayeredTabs,
  LayeredTabsContent,
  LayeredTabsList,
  LayeredTabsTrigger,
} from "../../../../registry/components/layered-tabs/LayeredTabs";

export default function TabsManual() {
  return (
    <LayeredTabs
      defaultValue="a"
      activationMode="manual"
      tone="copper"
      tabsSize="small"
      style={{ width: "min(100%, 460px)" }}
    >
      <LayeredTabsList aria-label="Channels">
        <LayeredTabsTrigger value="a">Channel A</LayeredTabsTrigger>
        <LayeredTabsTrigger value="b">Channel B</LayeredTabsTrigger>
        <LayeredTabsTrigger value="c" disabled>
          Channel C
        </LayeredTabsTrigger>
      </LayeredTabsList>
      <LayeredTabsContent value="a">Channel A carrier locked at 144.39 MHz.</LayeredTabsContent>
      <LayeredTabsContent value="b">Channel B idle. Squelch open.</LayeredTabsContent>
      <LayeredTabsContent value="c">Channel C offline.</LayeredTabsContent>
    </LayeredTabs>
  );
}
