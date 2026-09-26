import { Fragment, useState, type MouseEvent } from "react";
import {
  LayeredPagination,
  LayeredPaginationEllipsis,
  LayeredPaginationItem,
  LayeredPaginationLink,
  LayeredPaginationList,
  LayeredPaginationNext,
  LayeredPaginationPrevious,
} from "../../../../registry/components/layered-pagination/LayeredPagination";

const total = 12;

function visiblePages(current: number) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  return [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

export default function PaginationControlled() {
  const [page, setPage] = useState(5);
  const pages = visiblePages(page);

  /* Real hrefs keep open-in-new-tab working; a normal click pages locally. */
  const goTo = (target: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setPage(target);
  };

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <LayeredPagination tone="copper" aria-label="Log pages">
        <LayeredPaginationList>
          <LayeredPaginationItem>
            <LayeredPaginationPrevious
              href={`?page=${page - 1}`}
              disabled={page === 1}
              onClick={goTo(page - 1)}
            />
          </LayeredPaginationItem>
          {pages.map((number, index) => (
            <Fragment key={number}>
              {index > 0 && number - pages[index - 1] > 1 && (
                <LayeredPaginationItem>
                  <LayeredPaginationEllipsis />
                </LayeredPaginationItem>
              )}
              <LayeredPaginationItem>
                <LayeredPaginationLink
                  href={`?page=${number}`}
                  aria-label={`Page ${number}`}
                  isCurrent={number === page}
                  onClick={goTo(number)}
                >
                  {number}
                </LayeredPaginationLink>
              </LayeredPaginationItem>
            </Fragment>
          ))}
          <LayeredPaginationItem>
            <LayeredPaginationNext
              href={`?page=${page + 1}`}
              disabled={page === total}
              onClick={goTo(page + 1)}
            />
          </LayeredPaginationItem>
        </LayeredPaginationList>
      </LayeredPagination>
      <output aria-live="polite">
        Page {page} of {total}
      </output>
    </div>
  );
}
