import {
  LayeredTabs,
  LayeredTabsContent,
  LayeredTabsList,
  LayeredTabsTrigger,
} from "../../../../registry/components/layered-tabs/LayeredTabs";

export default function TabsBasic() {
  return (
    <LayeredTabs defaultValue="overview" style={{ width: "min(100%, 460px)" }}>
      <LayeredTabsList aria-label="Station views">
        <LayeredTabsTrigger value="overview">Overview</LayeredTabsTrigger>
        <LayeredTabsTrigger value="diagnostics">Diagnostics</LayeredTabsTrigger>
        <LayeredTabsTrigger value="logs">Logs</LayeredTabsTrigger>
      </LayeredTabsList>
      <LayeredTabsContent value="overview">
        All subsystems reporting nominal.
      </LayeredTabsContent>
      <LayeredTabsContent value="diagnostics">
        Last sweep ran 4 minutes ago. No faults.
      </LayeredTabsContent>
      <LayeredTabsContent value="logs">
        No events in the last polling interval.
      </LayeredTabsContent>
    </LayeredTabs>
  );
}
