import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from "react";
import "./LayeredTable.css";

export type LayeredTableTone = "neutral" | "copper" | "green" | "gold";
export type LayeredTableDensity = "small" | "medium";

export interface LayeredTableProps
  extends ComponentPropsWithoutRef<"table"> {
  tone?: LayeredTableTone;
  density?: LayeredTableDensity;
}

export const LayeredTable = forwardRef<HTMLTableElement, LayeredTableProps>(
  function LayeredTable(
    {
      tone = "neutral",
      density = "medium",
      className = "",
      ...props
    },
    ref
  ) {
    return (
      <div
        className="layered-table__housing"
        data-tone={tone}
        data-density={density}
      >
        <div className="layered-table__viewport">
          <table
            {...props}
            ref={ref}
            className={["layered-table", className].filter(Boolean).join(" ")}
          />
        </div>
      </div>
    );
  }
);

export type LayeredTableHeaderProps = ComponentPropsWithoutRef<"thead">;

export const LayeredTableHeader = forwardRef<
  HTMLTableSectionElement,
  LayeredTableHeaderProps
>(function LayeredTableHeader({ className = "", ...props }, ref) {
  return (
    <thead
      {...props}
      ref={ref}
      className={["layered-table__header", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableBodyProps = ComponentPropsWithoutRef<"tbody">;

export const LayeredTableBody = forwardRef<
  HTMLTableSectionElement,
  LayeredTableBodyProps
>(function LayeredTableBody({ className = "", ...props }, ref) {
  return (
    <tbody
      {...props}
      ref={ref}
      className={["layered-table__body", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableFooterProps = ComponentPropsWithoutRef<"tfoot">;

export const LayeredTableFooter = forwardRef<
  HTMLTableSectionElement,
  LayeredTableFooterProps
>(function LayeredTableFooter({ className = "", ...props }, ref) {
  return (
    <tfoot
      {...props}
      ref={ref}
      className={["layered-table__footer", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableRowProps = ComponentPropsWithoutRef<"tr">;

export const LayeredTableRow = forwardRef<
  HTMLTableRowElement,
  LayeredTableRowProps
>(function LayeredTableRow({ className = "", ...props }, ref) {
  return (
    <tr
      {...props}
      ref={ref}
      className={["layered-table__row", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableHeadProps = ComponentPropsWithoutRef<"th">;

export const LayeredTableHead = forwardRef<
  HTMLTableCellElement,
  LayeredTableHeadProps
>(function LayeredTableHead({ className = "", ...props }, ref) {
  return (
    <th
      {...props}
      ref={ref}
      className={["layered-table__head", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableCellProps = ComponentPropsWithoutRef<"td">;

export const LayeredTableCell = forwardRef<
  HTMLTableCellElement,
  LayeredTableCellProps
>(function LayeredTableCell({ className = "", ...props }, ref) {
  return (
    <td
      {...props}
      ref={ref}
      className={["layered-table__cell", className].filter(Boolean).join(" ")}
    />
  );
});

export type LayeredTableCaptionProps = ComponentPropsWithoutRef<"caption">;

export const LayeredTableCaption = forwardRef<
  HTMLTableCaptionElement,
  LayeredTableCaptionProps
>(function LayeredTableCaption({ className = "", ...props }, ref) {
  return (
    <caption
      {...props}
      ref={ref}
      className={["layered-table__caption", className].filter(Boolean).join(" ")}
    />
  );
});
