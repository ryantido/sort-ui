import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { ListFilter, X } from "lucide-react";
import { OverviewTable } from "./overview-table";
import type { Data } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { OverviewSerchbar } from "./overview-serchbar";
import {
  DATE_FILTER_OPTIONS,
  daysMap,
  PAGE_SIZE_OPTIONS,
  TYPE_FILTER_OPTIONS,
} from "@/constants";
import { filterTransactions } from "@/lib/utils";
import { RenderItem } from "./render-item";
import { RenderFilterButton } from "./render-filter-button";

export const OrganizationBalance2 = ({ data }: { data: Data }) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setPage(1);
  }, [search, date, type, source]);

  const accountsMap = useMemo(
    () => Object.fromEntries(data.accounts.map((a) => [a.id, a.name])),
    [data.accounts],
  );

  const filteredTransactions = useMemo(() => {
    return filterTransactions(data.transactions, {
      search,
      date,
      type,
      source,
      accountsMap,
      daysMap,
    });
  }, [data.transactions, search, date, type, source, accountsMap]);

  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const visibleTransactions = filteredTransactions.slice(start, end);

  return (
    <div className="flex flex-col justify-between h-full pb-6">
      <section>
        <header className="flex justify-between items-center mb-6">
          <section className="flex items-center w-fit">
            <span className="text-muted-foreground">Filters</span>
            <Separator orientation="vertical" className="mx-1" />
            {date === undefined ? (
              <RenderFilterButton
                label="Date"
                constant={DATE_FILTER_OPTIONS}
                callback={setDate}
              />
            ) : (
              <RenderItem label="Date" state={date} callback={setDate} />
            )}

            {type === undefined ? (
              <RenderFilterButton
                label="Type"
                constant={TYPE_FILTER_OPTIONS}
                callback={setType}
              />
            ) : (
              <RenderItem label="Type" state={type} callback={setType} />
            )}

            {source === undefined ? (
              <RenderFilterButton
                label="Source"
                constant={data.accounts}
                callback={setSource}
              />
            ) : (
              <RenderItem label="Source" state={source} callback={setSource} />
            )}
          </section>
          <section className="flex items-center gap-4">
            <OverviewSerchbar search={search} setSearch={setSearch} />

            <span className="text-muted-foreground text-nowrap">
              {filteredTransactions.length < 10
                ? "0" + filteredTransactions.length
                : filteredTransactions.length}{" "}
              transaction{filteredTransactions.length > 1 ? "s" : ""}
            </span>
          </section>
        </header>

        <OverviewTable
          transactions={visibleTransactions}
          accounts={data.accounts}
          slice={filteredTransactions.length}
          setSlice={() => {}}
        />
      </section>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="w-13.5 h-8"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{ color: "hsla(240, 5%, 32%, 1)" }}
          >
            Prev
          </Button>

          <Button
            variant="outline"
            className="w-13.5 h-8"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{ color: "hsla(240, 5%, 32%, 1)" }}
          >
            Next
          </Button>

          <div className="ml-4 text-sm text-muted-foreground">
            Page {page} of {totalPages || 1}
          </div>
        </div>

        <ToggleGroup
          type="single"
          value={String(pageSize)}
          onValueChange={(val) => {
            if (!val) return;
            setPageSize(Number(val));
            setPage(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <ToggleGroupItem
              key={size}
              value={String(size)}
              className="focus:text-active focus:border focus:border-active focus:rounded"
            >
              {size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
