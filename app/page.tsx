"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Bell,
  Check,
  ChevronsUpDownIcon,
  Copy,
  Download,
  Eye,
  HelpCircle,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import rawData from "@/constants/data.json";
import { OverviewMetrics } from "@/components/overview-metrics";
import { OverviewTable } from "@/components/overview-table";
import { OrganizationBalance2 } from "@/components/organization-balance2";
import { OrganizationBalance3 } from "@/components/organization-balance3";
import type { Data } from "@/types";
import { OverviewSerchbar } from "@/components/overview-serchbar";
const data = rawData as Data;

export default function Main() {
  const [active, setActive] = useState("Overview");
  const [slice, setSlice] = useState(5);
  const [search, setSearch] = useState<string>("");
  return (
    <main className="flex flex-col justify-end h-screen bg-sidebar relative">
      <div className="h-[calc(100dvh-0.5rem)] border border-muted rounded-t-2xl p-4 bg-white overflow-y-auto">
        <header className="flex justify-between items-center">
          <h1 className="font-medium text-2xl">Organization Balance</h1>
          <section className="inline-flex items-center">
            <Item
              variant="outline"
              className="rounded-full py-1 px-4 shrink-0 w-fit"
            >
              <ItemMedia>
                <Wallet />
              </ItemMedia>
              <ItemContent className="flex items-center">
                <div className="flex justify-center items-center gap-1">
                  <p>$0,00</p>
                  <Button variant="ghost">
                    <Eye />
                  </Button>
                </div>
              </ItemContent>
              {active === "Overview" && (
                <ItemMedia>
                  <Button>Top-Up</Button>
                </ItemMedia>
              )}
            </Item>
            <div className="inline-flex gap-1 ml-2">
              <Badge
                variant="outline"
                className="border-dashed mt-1.5 p-2 hover:bg-sidebar-accent cursor-pointer"
              >
                <HelpCircle /> Help
              </Badge>

              <Button variant="ghost" className="cursor-pointer">
                <Bell />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="hover:bg-sidebar-accent cursor-pointer"
                asChild
              >
                <Item>
                  <ItemMedia>
                    <Avatar className="size-6.5 relative">
                      <BadgeCheck
                        className="absolute fill-blue-500 text-blue-100 -top-1 -right-1.25"
                        size={15}
                      />
                      <AvatarImage src="/Image.png" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Simon Alt</ItemTitle>
                  </ItemContent>
                  <ItemMedia>
                    <ChevronsUpDownIcon size={18} className="ml-auto" />
                  </ItemMedia>
                </Item>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <span className="text-muted-foreground inline-flex w-full justify-center">
                  no content
                </span>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </header>

        <section className="mt-7 flex flex-col gap-y-10 mb-2">
          <h3 className="text-muted-foreground flex justify-between items-center">
            <span>Manage your organization funds here.</span>
            {active !== "Overview" && <Button size="lg">Allocate funds</Button>}
          </h3>
          <div className="flex justify-between">
            <div
              className={cn(
                "relative flex flex-wrap gap-x-4 md:gap-x-8 md:border-b border-muted w-full",
                active === "Overview" && "w-fit"
              )}
              aria-label="section categories"
            >
              {["Overview", "Transactions", "Team wallets"].map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  onClick={() => setActive(cat)}
                  aria-selected={active === cat}
                  tabIndex={active === cat ? 0 : -1}
                  className="relative pb-3 text-sm font-medium text-muted-foreground transition cursor-pointer"
                >
                  <span className={cn(active === cat && "text-blue-500")}>
                    {cat}
                  </span>

                  {active === cat && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute left-0 right-0 md:-bottom-px h-0.5 bg-blue-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {active === "Overview" ? (
              <ToggleGroup
                type="single"
                size="sm"
                defaultValue="30D"
                variant="outline"
              >
                <ToggleGroupItem value="30D">30D</ToggleGroupItem>
                <ToggleGroupItem value="15D">15D</ToggleGroupItem>
                <ToggleGroupItem value="7D">7D</ToggleGroupItem>
              </ToggleGroup>
            ) : (
              active === "Team wallets" && (
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <OverviewSerchbar search={search} setSearch={setSearch} />
                  <Button variant="outline">
                    Hide all{" "}
                    <Badge className="size-5">
                      <Eye />
                    </Badge>
                  </Button>
                </div>
              )
            )}
          </div>
        </section>

        {active === "Overview" ? (
          <>
            <OverviewMetrics />
            <OverviewTable
              transactions={data.transactions}
              accounts={data.accounts}
              slice={slice}
              setSlice={setSlice}
              visible
            />
          </>
        ) : active === "Transactions" ? (
          <OrganizationBalance2 data={data} />
        ) : (
          <OrganizationBalance3 />
        )}
      </div>
    </main>
  );
}
