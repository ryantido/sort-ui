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
  Maximize2,
  MessageSquare,
  MonitorSpeaker,
  MoreHorizontalIcon,
  RefreshCcw,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import data from "@/constants/data.json";

export default function Main() {
  const [active, setActive] = useState("Overview");
  const [slice, setSlice] = useState(5);
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
              <ItemMedia>
                <Button>Top-Up</Button>
              </ItemMedia>
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
          <h3 className="text-muted-foreground">
            Manage your organization funds here.
          </h3>
          <div className="flex justify-between">
            <div
              className="relative flex flex-wrap gap-x-4 md:gap-x-8 md:border-b border-muted w-fit"
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
          </div>
        </section>

        <div className="grid h-72 grid-cols-1 lg:grid-cols-[1.80fr_1.60fr_2.85fr] gap-3">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Item variant="outline" className="py-4">
                <ItemMedia className="h-full">
                  <Wallet />
                </ItemMedia>
                <ItemContent>
                  <ItemDescription>Organization Balance</ItemDescription>
                  <ItemTitle>$2,405.50</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost">
                    <Eye />
                  </Button>
                </ItemActions>
              </Item>

              <div className="flex gap-2 *:text-black/90 *:font-normal *:flex-1 *:rounded">
                <Button className="bg-yellow-600">Deposit Funds</Button>
                <Button className="bg-gray-400">Withdraw</Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Item variant="muted">
                  <ItemContent>
                    <ItemDescription className="text-xs">
                      Pending deposit
                    </ItemDescription>
                    <ItemTitle className="text-2xl">$1,250</ItemTitle>
                  </ItemContent>
                </Item>
                <Item variant="muted">
                  <ItemContent>
                    <ItemDescription className="text-xs">
                      Pending withdrawel
                    </ItemDescription>
                    <ItemTitle className="text-2xl">$0</ItemTitle>
                  </ItemContent>
                </Item>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-rows-2 gap-3 items-stretch">
            <Card className="gap-3 pb-2">
              <CardHeader className="relative">
                <CardTitle>Total allocated</CardTitle>
                <CardAction className="absolute right-4 top-1">
                  <Badge className="size-12 [&>svg]:size-4.5!">
                    <MonitorSpeaker />
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Item>
                  <ItemContent>
                    <ItemTitle className="text-2xl">$2,405.50</ItemTitle>
                    <Badge
                      variant="outline"
                      className="rounded border border-border-muted text-muted-foreground"
                    >
                      Last 30 days
                    </Badge>
                  </ItemContent>
                </Item>
              </CardContent>
            </Card>

            <Card className="gap-3 pb-2">
              <CardHeader className="relative">
                <CardTitle>Total allocated</CardTitle>
                <CardAction className="absolute right-4 top-1">
                  <Badge className="size-12 [&>svg]:size-4.5!">
                    <MonitorSpeaker />
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Item>
                  <ItemContent>
                    <ItemTitle className="text-2xl">$2,405.50</ItemTitle>
                    <Badge
                      variant="outline"
                      className="rounded border border-border-muted text-muted-foreground"
                    >
                      Last 30 days
                    </Badge>
                  </ItemContent>
                </Item>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="grid grid-cols-2 gap-2">
              <Item>
                <ItemContent>
                  <ItemTitle className="text-2xl">
                    Allocate funds to your team members wallet.
                  </ItemTitle>
                  <ItemDescription>
                    You can manage funds within you teammate personal wallet.
                  </ItemDescription>
                  <Button className="mt-4" size="lg">
                    Allocate funds
                  </Button>
                </ItemContent>
              </Item>
              <figure className="relative aspect-square overflow-hidden">
                <Image
                  src="/illustration.png"
                  alt="illustration"
                  className="object-cover"
                  fill
                />
              </figure>
            </CardContent>
          </Card>
        </div>

        <section>
          <h4 className="flex items-center justify-between mt-6 mb-4">
            {" "}
            <span className="font-semibold ">Recent transactions</span>
            <Button
              variant="link"
              className="text-blue-500"
              onClick={() => {
                setSlice((prev) =>
                  prev < data.transactions.length ? prev + 5 : prev
                );
              }}
            >
              View more
            </Button>
          </h4>
          <Table id="transactions">
            <TableHeader>
              <TableRow>
                {[
                  "Transaction ID",
                  "Description",
                  "Type",
                  "Amount",
                  "Status",
                  "Source",
                  "Date",
                  "",
                ].map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transactions.slice(0, slice).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {
                      transaction.category === "ad_spending"
                      ? <span className="inline-flex items-center gap-2">

                        <ArrowUp className="text-green-500" size={18}/>
                        Debit
                      </span> 
                       : <span className="inline-flex items-center gap-2">

                        <ArrowDown className="text-red-500" size={18}/>
                        Credit
                      </span>
                    }
                  </TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.status === "completed" ? (
                      <Badge
                        variant="outline"
                        className="border border-green-500/50 rounded bg-green-50 text-green-500"
                      >
                        <Check /> Paid
                      </Badge>
                    ) : transaction.status === "Pending" ? (
                      <Badge
                        variant="outline"
                        className="border border-yellow-500/50 rounded bg-yellow-50 text-yellow-500"
                      >
                        <RefreshCcw /> Pending
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border border-red-500/50 rounded bg-red-50 text-red-500"
                      >
                        <X /> Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {
                      data.accounts.find(
                        (account) => account.id === transaction.accountId
                      )?.name
                    }
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date)
                      .toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace("6,", "6")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-fit p-1.5 *:not-last:mb-2" align="end">
                        <DropdownMenuItem>
                          <Maximize2 className="mr-2" /> View details{" "}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2" /> Repeat transaction
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2" /> Download receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  );
}
