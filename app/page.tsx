"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn, formatCurrency, maskSensitiveData } from "@/lib/utils";
import { BadgeCheck, Eye, EyeOff, HelpCircle } from "lucide-react";
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
import { team } from "@/constants/team";
import { overviewTabs } from "@/constants/overview-tabs";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTeamFilter, useVisibilityToggle } from "@/hooks";
import { BUTTON_STYLES } from "@/constants/styles";

const data = rawData as Data;

export default function Main() {
  const [active, setActive] = useState("Overview");
  const [slice, setSlice] = useState(5);

  const { visible, toggle } = useVisibilityToggle({ initialVisible: true });
  const { search, setSearch, filteredTeam } = useTeamFilter({ team });

  const wallet = data.accounts.find((acc) => acc.id === "wallet_001");
  const walletBalance = wallet?.balance ?? 0;
  return (
    <main className="flex flex-col justify-end h-screen bg-sidebar relative">
      <div className="h-[calc(100dvh-0.5rem)] border border-muted rounded-t-2xl p-4 bg-text-white overflow-y-auto">
        <div className="size-full max-w-[1520px] mx-auto">
          <header className="flex justify-between items-center">
            <h1 className="font-medium text-2xl">Organization Balance</h1>
            <section className="inline-flex items-center">
              <Item
                variant="outline"
                className="rounded-full py-1 px-4 shrink-0 w-fit"
              >
                <ItemMedia>
                  <Image
                    src="/assets/iconsax-home-2(2).png"
                    alt="wallet picture"
                    width={20}
                    height={20}
                  />
                </ItemMedia>
                <ItemContent className="flex items-center">
                  <div className="flex justify-center items-center gap-1">
                    <p aria-live="polite">
                      {maskSensitiveData(formatCurrency(walletBalance), visible)}
                    </p>
                    <Button
                      variant="ghost"
                      className="size-fit p-1 rounded-full ml-1"
                      style={BUTTON_STYLES.visibilityToggle}
                      onClick={toggle}
                      aria-label={visible ? "Hide balance" : "Show balance"}
                    >
                      {visible ? (
                        <EyeOff aria-hidden="true" />
                      ) : (
                        <Eye aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </ItemContent>
                {active === "Overview" && (
                  <ItemMedia>
                    <Button
                      className="hover:bg-blue-500/20 h-7 w-17.5 text-badge-text rounded-[6px]"
                      style={BUTTON_STYLES.primaryGradientWithGlow}
                    >
                      Top-Up
                    </Button>
                  </ItemMedia>
                )}
              </Item>
              <div className="inline-flex gap-1 ml-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="border-dashed mt-1.5 p-2 hover:bg-sidebar-accent cursor-pointer"
                    >
                      <HelpCircle aria-hidden="true" /> Help
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent updatePositionStrategy="optimized">Placeholder</TooltipContent>
                </Tooltip>

                <Button variant="ghost" className="cursor-pointer mr-4">
                  <Image
                    src="/assets/lead-icon.png"
                    alt="bell"
                    width={20}
                    height={20}
                  />
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
                          aria-hidden="true"
                        />
                        <AvatarImage src="/Image.png" alt="Simon Alt" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Simon Alt</ItemTitle>
                    </ItemContent>
                    <ItemMedia>
                      <Image
                        src="/assets/tail-icon.png"
                        alt=""
                        className="ml-auto"
                        width={20}
                        height={20}
                        aria-hidden="true"
                      />
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

          <section className="flex flex-col gap-y-10 mb-4">
            <h3 className="text-muted-foreground flex justify-between items-center">
              <span>Manage your organization funds here.</span>
              {active !== "Overview" && (
                <Button
                  size="lg"
                  className="mt-4 h-9 w-33 hover:bg-blue-500/20"
                  style={BUTTON_STYLES.primaryGradient}
                >
                  Allocate funds
                </Button>
              )}
            </h3>
            <div className="flex justify-between">
              <div
                className={cn(
                  "relative flex flex-wrap gap-x-4 md:gap-x-8 md:border-b border-muted w-full",
                  active === "Overview" && "w-fit",
                )}
              >
                {overviewTabs.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-selected={active === cat}
                    tabIndex={active === cat ? 0 : -1}
                    className="relative pb-3 text-sm font-medium text-muted-foreground transition cursor-pointer"
                  >
                    <span className={cn(active === cat && "text-active")}>
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
                  defaultValue="30D"
                  variant="outline"
                  className="*:h-8 *:w-12 *:focus:text-active"
                >
                  <ToggleGroupItem value="30D">30D</ToggleGroupItem>
                  <ToggleGroupItem value="15D">15D</ToggleGroupItem>
                  <ToggleGroupItem value="7D">7D</ToggleGroupItem>
                </ToggleGroup>
              ) : active === "Team wallets" ? (
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <OverviewSerchbar
                    placeholder="Search by name or email"
                    search={search}
                    setSearch={setSearch}
                  />
                  <Button variant="outline">
                    Hide all{" "}
                    <Badge
                      className="size-5"
                      style={BUTTON_STYLES.visibilityToggle}
                    >
                      <EyeOff aria-hidden="true" />
                    </Badge>
                  </Button>
                </div>
              ) : null}
            </div>
          </section>

          {active === "Overview" ? (
            <>
              <OverviewMetrics data={data} />
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
            <OrganizationBalance3 team={filteredTeam} />
          )}
        </div>
      </div>
    </main>
  );
}
