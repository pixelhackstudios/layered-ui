import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { LayeredBadge } from "../../../registry/components/layered-badge/LayeredBadge";
import { LayeredButton } from "../../../registry/components/layered-button/LayeredButton";
import { LayeredCheckbox } from "../../../registry/components/layered-checkbox/LayeredCheckbox";
import {
  LayeredDialog,
  LayeredDialogClose,
  LayeredDialogContent,
  LayeredDialogDescription,
  LayeredDialogFooter,
  LayeredDialogHeader,
  LayeredDialogTitle,
} from "../../../registry/components/layered-dialog/LayeredDialog";
import {
  LayeredDropdownMenu,
  LayeredDropdownMenuContent,
  LayeredDropdownMenuItem,
  LayeredDropdownMenuLabel,
  LayeredDropdownMenuSeparator,
  LayeredDropdownMenuTrigger,
} from "../../../registry/components/layered-dropdown-menu/LayeredDropdownMenu";
import { LayeredInput } from "../../../registry/components/layered-input/LayeredInput";
import { LayeredNumberField } from "../../../registry/components/layered-number-field/LayeredNumberField";
import {
  LayeredPagination,
  LayeredPaginationItem,
  LayeredPaginationLink,
  LayeredPaginationList,
  LayeredPaginationNext,
  LayeredPaginationPrevious,
} from "../../../registry/components/layered-pagination/LayeredPagination";
import { LayeredPanel } from "../../../registry/components/layered-panel/LayeredPanel";
import { LayeredProgress } from "../../../registry/components/layered-progress/LayeredProgress";
import { LayeredRadioGroup, LayeredRadioGroupItem } from "../../../registry/components/layered-radio-group/LayeredRadioGroup";
import { LayeredSlider, LayeredSliderRange, LayeredSliderThumb, LayeredSliderTrack } from "../../../registry/components/layered-slider/LayeredSlider";
import { LayeredSwitch } from "../../../registry/components/layered-switch/LayeredSwitch";
import {
  LayeredTable,
  LayeredTableBody,
  LayeredTableCell,
  LayeredTableHead,
  LayeredTableHeader,
  LayeredTableRow,
} from "../../../registry/components/layered-table/LayeredTable";
import { LayeredTabs, LayeredTabsList, LayeredTabsTrigger } from "../../../registry/components/layered-tabs/LayeredTabs";
import {
  LayeredToast,
  LayeredToastClose,
  LayeredToastDescription,
  LayeredToastProvider,
  LayeredToastTitle,
  LayeredToastViewport,
} from "../../../registry/components/layered-toast/LayeredToast";
import {
  LayeredTooltip,
  LayeredTooltipContent,
  LayeredTooltipProvider,
  LayeredTooltipTrigger,
} from "../../../registry/components/layered-tooltip/LayeredTooltip";

type Status = "Active" | "Ready" | "Standby" | "Restarting" | "Fault";
type Tone = "neutral" | "copper" | "green" | "gold";

interface FleetNode {
  id: string;
  region: string;
  status: Status;
  load: number;
  latency: number;
  fault?: string;
}

const statusTone: Record<Status, "copper" | "green" | "gold" | "signal-red" | "neutral"> = {
  Active: "copper",
  Ready: "green",
  Standby: "gold",
  Restarting: "neutral",
  Fault: "signal-red",
};

const loadTone = (load: number): Tone => (load >= 80 ? "gold" : load >= 50 ? "copper" : "green");

const initialFleet: FleetNode[] = [
  { id: "EDGE-01", region: "Toronto", status: "Ready", load: 38, latency: 12 },
  { id: "EDGE-02", region: "Toronto", status: "Active", load: 71, latency: 18 },
  { id: "EDGE-03", region: "Seattle", status: "Active", load: 64, latency: 21 },
  { id: "WORKER-04", region: "Seattle", status: "Ready", load: 46, latency: 24 },
  { id: "WORKER-05", region: "Frankfurt", status: "Active", load: 83, latency: 29 },
  { id: "WORKER-06", region: "Frankfurt", status: "Ready", load: 22, latency: 27 },
  { id: "WORKER-07", region: "Dublin", status: "Standby", load: 8, latency: 31 },
  { id: "CACHE-01", region: "Toronto", status: "Active", load: 58, latency: 6 },
  { id: "CACHE-02", region: "Frankfurt", status: "Active", load: 63, latency: 7 },
  { id: "RELAY-01", region: "Seattle", status: "Ready", load: 31, latency: 15 },
  { id: "RELAY-03", region: "Dublin", status: "Fault", load: 0, latency: 0, fault: "Heartbeat lost 4 min ago. Last error: TLS handshake timeout." },
  { id: "ARCHIVE-01", region: "Dublin", status: "Standby", load: 3, latency: 42 },
  { id: "INGEST-02", region: "Toronto", status: "Active", load: 77, latency: 19 },
  { id: "INGEST-03", region: "Seattle", status: "Fault", load: 0, latency: 0, fault: "Disk 2 reporting SMART failure. Workloads drained." },
];

const filters = ["All", "Active", "Ready", "Standby", "Fault"] as const;
type Filter = (typeof filters)[number];
const pageSize = 6;

interface Notice {
  id: number;
  tone: Tone;
  title: string;
  body: string;
}

export function ShowcasePage() {
  const [fleet, setFleet] = useState(initialFleet);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [live, setLive] = useState(true);
  /* The request outlives `confirmOpen` so the dialog keeps its text while it animates closed. */
  const [confirm, setConfirmRequest] = useState<{ action: "restart" | "decommission"; ids: string[] } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const fleetHeading = useRef<HTMLHeadingElement>(null);
  const setConfirm = (next: { action: "restart" | "decommission"; ids: string[] } | null) => {
    if (next) {
      setConfirmRequest(next);
      returnFocus.current = document.activeElement as HTMLElement | null;
    }
    setConfirmOpen(next !== null);
  };
  const [notice, setNotice] = useState<Notice | null>(null);

  const [throttle, setThrottle] = useState([70]);
  const [policy, setPolicy] = useState("nearest");
  const [replicas, setReplicas] = useState<number | "">(3);

  /* Let the menu finish closing (and restore focus) before the dialog opens. */
  const confirmAfterMenu = (next: { action: "restart" | "decommission"; ids: string[] }) =>
    window.setTimeout(() => setConfirm(next), 0);

  const notify = (tone: Tone, title: string, body: string) =>
    setNotice({ id: Date.now(), tone, title, body });

  /* Live telemetry: loads drift while the feed is on. */
  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setFleet((current) =>
        current.map((node) => {
          if (node.status !== "Active" && node.status !== "Ready") return node;
          const drift = Math.round((Math.random() - 0.5) * 8);
          const load = Math.min(96, Math.max(4, node.load + drift));
          return { ...node, load, latency: Math.max(4, node.latency + Math.round((Math.random() - 0.5) * 3)) };
        })
      );
    }, 2200);
    return () => window.clearInterval(timer);
  }, [live]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fleet.filter(
      (node) =>
        (filter === "All" || node.status === filter) &&
        (!q || node.id.toLowerCase().includes(q) || node.region.toLowerCase().includes(q))
    );
  }, [fleet, filter, query]);

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const serving = fleet.filter((node) => node.status === "Active" || node.status === "Ready");
  const faults = fleet.filter((node) => node.status === "Fault").length;
  const avgLoad = serving.length ? Math.round(serving.reduce((sum, node) => sum + node.load, 0) / serving.length) : 0;
  const avgLatency = serving.length ? Math.round(serving.reduce((sum, node) => sum + node.latency, 0) / serving.length) : 0;

  const countFor = (value: Filter) =>
    value === "All" ? fleet.length : fleet.filter((node) => node.status === value).length;

  const pageIds = rows.map((node) => node.id);
  const pageSelected = pageIds.filter((id) => selected.includes(id));

  const toggle = (id: string, on: boolean) =>
    setSelected((current) => (on ? [...current, id] : current.filter((item) => item !== id)));

  const runConfirmed = () => {
    if (!confirm || !confirmOpen) return;
    const { action, ids } = confirm;
    if (action === "decommission") {
      setFleet((current) => current.filter((node) => !ids.includes(node.id)));
      notify("gold", "Decommissioned", `${ids.join(", ")} removed from the fleet.`);
    } else {
      setFleet((current) =>
        current.map((node) => (ids.includes(node.id) ? { ...node, status: "Restarting", load: 0, fault: undefined } : node))
      );
      notify("copper", "Restart issued", `${ids.length} node${ids.length === 1 ? "" : "s"} cycling. They'll report back shortly.`);
      window.setTimeout(() => {
        setFleet((current) =>
          current.map((node) =>
            ids.includes(node.id) && node.status === "Restarting"
              ? { ...node, status: "Ready", load: 12, latency: 14 }
              : node
          )
        );
        notify("green", "Nodes healthy", `${ids.join(", ")} passed health checks.`);
      }, 2600);
    }
    setSelected((current) => current.filter((id) => !ids.includes(id)));
    setConfirm(null);
  };

  const goTo = (target: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setPage(target);
  };

  return (
    <LayeredToastProvider swipeDirection="right">
      <LayeredTooltipProvider>
        <div className="showcase">
          <header className="page-head showcase__head">
            <p className="eyebrow">Showcase · built only from Layered UI</p>
            <h1>Control Room</h1>
            <p className="page-head__lede">
              An operations console for a fictional edge fleet. Filter, select, restart, and
              decommission nodes; tune routing; watch the telemetry drift. Nothing here is custom
              UI: it's the published components and a little layout CSS.
            </p>
          </header>

          <section className="showcase__readouts" aria-label="Fleet summary">
            <div className="readout">
              <span className="readout__label">Serving</span>
              <span className="readout__value">
                {serving.length}
                <small>/{fleet.length}</small>
              </span>
              <LayeredBadge tone={faults ? "signal-red" : "green"}>
                {faults ? `${faults} fault${faults === 1 ? "" : "s"}` : "All clear"}
              </LayeredBadge>
            </div>
            <div className="readout">
              <span className="readout__label" id="avg-load-label">
                Avg load
              </span>
              <span className="readout__value">
                {avgLoad}
                <small>%</small>
              </span>
              <LayeredProgress value={avgLoad} tone={loadTone(avgLoad)} progressSize="small" aria-labelledby="avg-load-label" />
            </div>
            <div className="readout">
              <span className="readout__label">Latency</span>
              <span className="readout__value">
                {avgLatency}
                <small>ms</small>
              </span>
              <span className="readout__note">p50 across serving nodes</span>
            </div>
            <div className="readout">
              <span className="readout__label">Telemetry</span>
              <LayeredSwitch
                label={live ? "Live feed" : "Paused"}
                tone="green"
                switchSize="small"
                checked={live}
                onChange={(event) => setLive(event.target.checked)}
              />
            </div>
          </section>

          <div className="showcase__layout">
            <section className="showcase__fleet" aria-labelledby="fleet-title">
              <div className="showcase__toolbar">
                <h2 id="fleet-title" className="sr-only" ref={fleetHeading} tabIndex={-1}>
                  Fleet
                </h2>
                <LayeredTabs
                  value={filter}
                  onValueChange={(value) => {
                    setFilter(value as Filter);
                    setPage(1);
                  }}
                  tabsSize="small"
                  tone="copper"
                >
                  <LayeredTabsList aria-label="Filter by status" overflow="scroll">
                    {filters.map((value) => (
                      <LayeredTabsTrigger key={value} value={value}>
                        {value} <span className="tab-count">{countFor(value)}</span>
                      </LayeredTabsTrigger>
                    ))}
                  </LayeredTabsList>
                </LayeredTabs>
                <LayeredInput
                  label="Search"
                  inputSize="small"
                  placeholder="Node or region"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  className="showcase__search"
                />
              </div>

              <div className="showcase__bulk" data-active={selected.length ? "true" : undefined}>
                <span aria-live="polite">
                  {selected.length ? `${selected.length} selected` : "Select nodes for bulk actions"}
                </span>
                <LayeredButton
                  tone="copper"
                  size="small"
                  disabled={!selected.length}
                  onClick={() => setConfirm({ action: "restart", ids: selected })}
                >
                  Restart selected
                </LayeredButton>
                <LayeredButton tone="neutral" size="small" disabled={!selected.length} onClick={() => setSelected([])}>
                  Clear
                </LayeredButton>
              </div>

              <LayeredTable tone="copper" aria-label="Fleet nodes">
                <LayeredTableHeader>
                  <LayeredTableRow>
                    <LayeredTableHead scope="col" className="col-select">
                      <LayeredCheckbox
                        label={<span className="sr-only">Select all nodes on this page</span>}
                        checkboxSize="small"
                        checked={pageIds.length > 0 && pageSelected.length === pageIds.length}
                        indeterminate={pageSelected.length > 0 && pageSelected.length < pageIds.length}
                        disabled={!pageIds.length}
                        onChange={(event) =>
                          setSelected((current) =>
                            event.target.checked
                              ? [...new Set([...current, ...pageIds])]
                              : current.filter((id) => !pageIds.includes(id))
                          )
                        }
                      />
                    </LayeredTableHead>
                    <LayeredTableHead scope="col">Node</LayeredTableHead>
                    <LayeredTableHead scope="col">Status</LayeredTableHead>
                    <LayeredTableHead scope="col" className="col-load">Load</LayeredTableHead>
                    <LayeredTableHead scope="col" className="col-num">Latency</LayeredTableHead>
                    <LayeredTableHead scope="col" className="col-actions">
                      <span className="sr-only">Actions</span>
                    </LayeredTableHead>
                  </LayeredTableRow>
                </LayeredTableHeader>
                <LayeredTableBody>
                  {rows.length === 0 && (
                    <LayeredTableRow>
                      <LayeredTableCell colSpan={6} className="empty-row">
                        No nodes match this filter.
                      </LayeredTableCell>
                    </LayeredTableRow>
                  )}
                  {rows.map((node) => (
                    <LayeredTableRow key={node.id} data-selected={selected.includes(node.id) ? "true" : undefined}>
                      <LayeredTableCell className="col-select">
                        <LayeredCheckbox
                          label={<span className="sr-only">Select {node.id}</span>}
                          checkboxSize="small"
                          checked={selected.includes(node.id)}
                          disabled={node.status === "Restarting"}
                          onChange={(event) => toggle(node.id, event.target.checked)}
                        />
                      </LayeredTableCell>
                      <LayeredTableHead scope="row">
                        <span className="node-id">{node.id}</span>
                        <span className="node-region">{node.region}</span>
                      </LayeredTableHead>
                      <LayeredTableCell>
                        {node.fault ? (
                          <LayeredTooltip>
                            <LayeredTooltipTrigger asChild>
                              <button type="button" className="site-bare-trigger" aria-label={`${node.status}: ${node.fault}`}>
                                <LayeredBadge tone={statusTone[node.status]}>{node.status}</LayeredBadge>
                              </button>
                            </LayeredTooltipTrigger>
                            <LayeredTooltipContent size="medium" style={{ maxWidth: 260 }}>
                              {node.fault}
                            </LayeredTooltipContent>
                          </LayeredTooltip>
                        ) : (
                          <LayeredBadge tone={statusTone[node.status]}>{node.status}</LayeredBadge>
                        )}
                      </LayeredTableCell>
                      <LayeredTableCell className="col-load">
                        {node.status === "Fault" || node.status === "Restarting" ? (
                          node.status === "Restarting" ? (
                            <LayeredProgress progressSize="small" aria-label={`${node.id} restarting`} />
                          ) : (
                            <span className="muted">—</span>
                          )
                        ) : (
                          <span className="load-cell">
                            <LayeredProgress
                              value={node.load}
                              tone={loadTone(node.load)}
                              progressSize="small"
                              aria-label={`${node.id} load`}
                            />
                            <span>{node.load}%</span>
                          </span>
                        )}
                      </LayeredTableCell>
                      <LayeredTableCell className="col-num">{node.latency ? `${node.latency} ms` : "—"}</LayeredTableCell>
                      <LayeredTableCell className="col-actions">
                        <LayeredDropdownMenu>
                          <LayeredDropdownMenuTrigger asChild>
                            <button type="button" className="row-menu" aria-label={`Actions for ${node.id}`}>
                              <span aria-hidden="true">•••</span>
                            </button>
                          </LayeredDropdownMenuTrigger>
                          <LayeredDropdownMenuContent align="end" tone="copper">
                            <LayeredDropdownMenuLabel>{node.id}</LayeredDropdownMenuLabel>
                            <LayeredDropdownMenuItem
                              disabled={node.status === "Restarting"}
                              onSelect={() => confirmAfterMenu({ action: "restart", ids: [node.id] })}
                            >
                              Restart
                            </LayeredDropdownMenuItem>
                            <LayeredDropdownMenuItem
                              disabled={node.status !== "Active" && node.status !== "Ready"}
                              onSelect={() => {
                                setFleet((current) =>
                                  current.map((item) => (item.id === node.id ? { ...item, status: "Standby", load: 2 } : item))
                                );
                                notify("gold", "Drained", `${node.id} moved to standby.`);
                              }}
                            >
                              Drain to standby
                            </LayeredDropdownMenuItem>
                            <LayeredDropdownMenuSeparator />
                            <LayeredDropdownMenuItem
                              intent="destructive"
                              onSelect={() => confirmAfterMenu({ action: "decommission", ids: [node.id] })}
                            >
                              Decommission
                            </LayeredDropdownMenuItem>
                          </LayeredDropdownMenuContent>
                        </LayeredDropdownMenu>
                      </LayeredTableCell>
                    </LayeredTableRow>
                  ))}
                </LayeredTableBody>
              </LayeredTable>

              <div className="showcase__pager">
                <span>
                  {visible.length === 0
                    ? "0 nodes"
                    : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, visible.length)} of ${visible.length}`}
                </span>
                <LayeredPagination paginationSize="small" aria-label="Fleet pages">
                  <LayeredPaginationList>
                    <LayeredPaginationItem>
                      <LayeredPaginationPrevious href="?page=prev" disabled={currentPage === 1} onClick={goTo(currentPage - 1)} />
                    </LayeredPaginationItem>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                      <LayeredPaginationItem key={number}>
                        <LayeredPaginationLink
                          href={`?page=${number}`}
                          aria-label={`Page ${number}`}
                          isCurrent={number === currentPage}
                          onClick={goTo(number)}
                        >
                          {number}
                        </LayeredPaginationLink>
                      </LayeredPaginationItem>
                    ))}
                    <LayeredPaginationItem>
                      <LayeredPaginationNext href="?page=next" disabled={currentPage === pageCount} onClick={goTo(currentPage + 1)} />
                    </LayeredPaginationItem>
                  </LayeredPaginationList>
                </LayeredPagination>
              </div>
            </section>

            <LayeredPanel
              eyebrow="Routing"
              title="Traffic policy"
              tone="green"
              className="showcase__policy"
              footer={
                <LayeredButton
                  tone="green"
                  size="small"
                  fullWidth
                  onClick={() =>
                    notify("green", "Policy applied", `${policy === "nearest" ? "Nearest region" : policy === "least" ? "Least loaded" : "Pinned primary"}, ${throttle[0]}% ceiling, ${replicas || 0} replicas.`)
                  }
                >
                  Apply policy
                </LayeredButton>
              }
            >
              <div className="policy-stack">
                <div className="policy-field">
                  <span id="ceiling-label">Load ceiling · {throttle[0]}%</span>
                  <LayeredSlider tone="green" value={throttle} onValueChange={setThrottle} min={40} max={95} step={5}>
                    <LayeredSliderTrack>
                      <LayeredSliderRange />
                    </LayeredSliderTrack>
                    <LayeredSliderThumb aria-labelledby="ceiling-label" />
                  </LayeredSlider>
                </div>
                <LayeredRadioGroup
                  tone="green"
                  radioGroupSize="small"
                  value={policy}
                  onValueChange={setPolicy}
                  aria-label="Failover policy"
                >
                  <LayeredRadioGroupItem value="nearest" label="Nearest region" description="Lowest latency first." />
                  <LayeredRadioGroupItem value="least" label="Least loaded" description="Spread across the fleet." />
                  <LayeredRadioGroupItem value="pinned" label="Pinned primary" description="Only fail over on fault." />
                </LayeredRadioGroup>
                <LayeredNumberField
                  label="Hot replicas"
                  tone="green"
                  numberFieldSize="small"
                  min={1}
                  max={8}
                  value={replicas}
                  onChange={(event) => setReplicas(event.target.value === "" ? "" : event.target.valueAsNumber)}
                  fullWidth
                />
              </div>
            </LayeredPanel>
          </div>

          <LayeredDialog open={confirmOpen} onOpenChange={(open) => !open && setConfirm(null)}>
            <LayeredDialogContent
              size="small"
              onCloseAutoFocus={(event) => {
                /* The trigger may be gone (decommissioned row) or disabled
                   (selection cleared); land on the fleet instead of <body>. */
                const target = returnFocus.current;
                if (!target || !target.isConnected || (target as HTMLButtonElement).disabled) {
                  event.preventDefault();
                  fleetHeading.current?.focus();
                }
              }}
            >
              <LayeredDialogHeader>
                <LayeredDialogTitle>
                  {confirm?.action === "decommission"
                    ? `Decommission ${confirm.ids[0]}?`
                    : `Restart ${confirm?.ids.length === 1 ? confirm.ids[0] : `${confirm?.ids.length} nodes`}?`}
                </LayeredDialogTitle>
                <LayeredDialogDescription>
                  {confirm?.action === "decommission"
                    ? "The node is removed from the fleet and its workloads are rescheduled. This can't be undone here."
                    : "Open sessions reconnect through the nearest healthy node while these cycle."}
                </LayeredDialogDescription>
              </LayeredDialogHeader>
              <p className="confirm-targets">
                {confirm?.ids.map((id) => (
                  <LayeredBadge key={id} tone={confirm.action === "decommission" ? "signal-red" : "copper"}>
                    {id}
                  </LayeredBadge>
                ))}
              </p>
              <LayeredDialogFooter>
                <LayeredDialogClose asChild>
                  <LayeredButton tone="neutral" size="small">
                    Cancel
                  </LayeredButton>
                </LayeredDialogClose>
                <LayeredButton tone={confirm?.action === "decommission" ? "gold" : "copper"} size="small" onClick={runConfirmed}>
                  {confirm?.action === "decommission" ? "Decommission" : "Restart"}
                </LayeredButton>
              </LayeredDialogFooter>
            </LayeredDialogContent>
          </LayeredDialog>

          {notice && (
            <LayeredToast
              key={notice.id}
              tone={notice.tone}
              defaultOpen
              onOpenChange={(open) => !open && setNotice((current) => (current?.id === notice.id ? null : current))}
            >
              <LayeredToastTitle>{notice.title}</LayeredToastTitle>
              <LayeredToastDescription>{notice.body}</LayeredToastDescription>
              <LayeredToastClose />
            </LayeredToast>
          )}
          <LayeredToastViewport position="bottom-right" />
        </div>
      </LayeredTooltipProvider>
    </LayeredToastProvider>
  );
}
