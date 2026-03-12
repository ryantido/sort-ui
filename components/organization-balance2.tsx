import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Item, ItemActions, ItemContent, ItemSeparator } from "./ui/item";
import { ListFilter, X } from "lucide-react";
import { OverviewTable } from "./overview-table";
import type { Data } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { OverviewSerchbar } from "./overview-serchbar";
import { daysMap } from "@/constants";

export const OrganizationBalance2 = ({ data }: { data: Data }) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setPage(1);
  }, [search, date, type, source]);

  const accountsMap = useMemo(
  () => Object.fromEntries(data.accounts.map(a => [a.id, a.name])),
  [data.accounts]
)
  const filteredTransactions = 
  useMemo(() => {
    return data.transactions.filter((transaction) => {
      const now = new Date();
  
      if (search) {
        const query = search.toLowerCase();
  
        const sourceName =
          accountsMap[transaction.accountId]?.toLowerCase() ?? "";
  
        if (
          !transaction.id.toLowerCase().includes(query) &&
          !sourceName.includes(query) &&
          !transaction.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
  
      if (date) {
  
        const days = daysMap[date];
  
        if (days) {
          const limit = new Date(now.getTime());
          limit.setDate(now.getDate() - days);
  
          const transactionDate = new Date(transaction.date);
  
          if (transactionDate < limit || transactionDate > now) return false;
        }
      }
  
      if (type) {
        const transactionType =
          transaction.category === "ad_spending" ? "Debit" : "Credit";
  
        if (transactionType !== type) return false;
      }
  
      if (source) {
        if (accountsMap[transaction.accountId] !== source) return false;
      }
  
      return true;
    });
}, [data.transactions, search, date, type, source])

  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  // const pages = getPagination(totalPages, page);

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-dashed border-muted-foreground rounded-full px-4 h-6 text-muted-foreground mr-1"
                    size="sm"
                  >
                    <ListFilter />
                    Date
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {["Last 7 days", "Last 15 days", "Last 30 days"]
                    .reverse()
                    .map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={() => setDate(item)}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Item
                variant="outline"
                size="xs"
                className="py-px rounded-full shrink-0 w-fit mr-1"
                style={{
                  background: "hsla(227, 68%, 52%, 0.1)",
                  borderTop: "1px solid hsla(227, 68%, 52%, 0.1)",
                  boxShadow:
                    "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05) 0px -1px 0px 0px hsla(0, 0%, 0%, 0.08) inset",
                }}
              >
                <ItemActions>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDate(undefined)}
                  >
                    <X />
                  </Button>
                  <span className="font-medium" style={{ color: "hsla(240, 3%, 45%, 1)" }}>Date</span>
                  <ItemSeparator orientation="vertical" />
                  <ItemContent className="text-active font-medium">
                    {date}
                  </ItemContent>
                </ItemActions>
              </Item>
            )}

            {type === undefined ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-dashed border-muted-foreground rounded-full px-4 h-6 text-muted-foreground mr-1"
                    size="sm"
                  >
                    <ListFilter />
                    Type
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {["Debit", "Credit"].map((item) => (
                    <DropdownMenuItem key={item} onClick={() => setType(item)}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Item
                variant="outline"
                size="xs"
                className="py-px rounded-full shrink-0 w-fit mr-1"
                style={{
                  background: "hsla(227, 68%, 52%, 0.1)",
                  borderTop: "1px solid hsla(227, 68%, 52%, 0.1)",
                  boxShadow:
                    "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05) 0px -1px 0px 0px hsla(0, 0%, 0%, 0.08) inset",
                }}
              >
                <ItemActions>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setType(undefined)}
                  >
                    <X />
                  </Button>
                  <span className="font-medium" style={{ color: "hsla(240, 3%, 45%, 1)" }}>Type</span>
                  <ItemSeparator orientation="vertical" />
                  <ItemContent className="text-active font-medium">
                    {type}
                  </ItemContent>
                </ItemActions>
              </Item>
            )}

            {source === undefined ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-dashed border-muted-foreground rounded-full px-4 h-6 text-muted-foreground"
                    size="sm"
                  >
                    <ListFilter />
                    Source
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-fit p-2 *:not-last:mb-2"
                  align="center"
                >
                  {data.accounts
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        onClick={() => setSource(item.name)}
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Item
                variant="outline"
                size="xs"
                className="py-px rounded-full shrink-0 w-fit"
              >
                <ItemActions>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setSource(undefined)}
                  >
                    <X />
                  </Button>
                  <span className="font-medium" style={{ color: "hsla(240, 3%, 45%, 1)" }}>Source</span>
                  <ItemSeparator orientation="vertical" />
                  <ItemContent className="text-active font-medium">{source}</ItemContent>
                </ItemActions>
              </Item>
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
            Page {page} of {totalPages}
          </div>
        </div>

        {/* <ToggleGroup
          type="single"
          value={String(page)}
          onValueChange={(val) => {
            if (val) setPage(Number(val));
          }}
        >
          {pages.map((item, index) =>
            item === "..." ? (
              <span key={index} className="px-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <ToggleGroupItem key={item} value={String(item)}>
                {item}
              </ToggleGroupItem>
            )
          )}
        </ToggleGroup> */}

        <ToggleGroup
          type="single"
          value={String(pageSize)}
          onValueChange={(val) => {
            if (!val) return;
            setPageSize(Number(val));
            setPage(1);
          }}
        >
          {[10, 20, 30, 50].map((size) => (
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
