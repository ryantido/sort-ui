import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Data } from "@/types";

export const OverviewMetrics = ({ data }: { data: Data }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="grid h-72 grid-cols-1 lg:grid-cols-[1.65fr_1.25fr_2.4fr] gap-3">
      <Card
        className="h-71.75 flex flex-col justify-center"
        style={{
          background: "url('/gradient.jpg') center center/cover no-repeat",
        }}
      >
        <CardContent className="flex flex-col gap-4">
          <Item
            variant="outline"
            className="text-white py-4 h-25 border border-muted-foreground/20 backdrop-blur-lg"
            style={{
              backgroundImage:
                "linear-gradient(254.17deg, rgba(47, 84, 216, 0.58) 15.96%, rgba(0, 0, 0, 0.3306) 55.87%)",
            }}
          >
            <ItemMedia className="h-full">
              <Image
                src="/assets/iconsax-wallet-1.png"
                alt="wallet icon"
                width={32}
                height={32}
              />
            </ItemMedia>
            <ItemContent>
              <ItemDescription className="font-medium text-[12px] text-text-white/60">
                {data.organization.name} Balance
              </ItemDescription>
              <ItemTitle
                className="font-bold text-[32px]"
                style={{ color: "hsla(0, 0%, 100%, 1)" }}
              >
                {visible
                  ? "$" +
                    data.accounts[
                      data.accounts.findIndex((acc) => acc.id === "wallet_001")
                    ].balance
                  : "********"}
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button
                className="rounded-full hover:bg-ring/20 hover:text-text-white bg-text-white/10 size-fit py-2"
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <EyeOff className="size-6.5" />
                ) : (
                  <Eye className="size-6.5" />
                )}
              </Button>
            </ItemActions>
          </Item>

          <div className="flex gap-2 *:text-black/90 *:flex-1 *:rounded *:font-medium">
            <Button
              style={{
                background: "hsla(39, 94%, 57%, 1)",
                border: "1px solid hsla(0, 0%, 13%, 0.35)",
                boxShadow: "0px 0px 7.2px 0px hsla(0, 0%, 100%, 0.69) inset",
                color: "hsla(0, 0%, 23%, 1)",
                textShadow: "0px 0.5px 1px 0px hsla(0, 0%, 0%, 0.15)",
              }}
              className="h-9 w-36.5"
            >
              Deposit Funds
            </Button>
            <Button
              style={{
                background: "hsla(0, 0%, 100%, 1)",
                boxShadow: "0px 0px 7.2px 0px hsla(0, 0%, 100%, 0.69) inset",
                color: "hsla(240, 11%, 7%, 1)",
              }}
              className="h-9 w-36.5"
            >
              Withdraw
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Item
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.044) 100%)",
              }}
              className="h-18"
            >
              <ItemContent className="*:font-medium">
                <ItemDescription
                  className="text-xs opacity-60"
                  style={{ color: "hsla(0, 0%, 100%, 1)" }}
                >
                  Pending deposit
                </ItemDescription>
                <ItemTitle
                  className="text-2xl"
                  style={{ color: "hsla(0, 0%, 100%, 1)" }}
                >
                  $
                  {data.transactions
                    .filter(
                      (transaction) =>
                        transaction.category === "deposit" &&
                        transaction.status === "pending",
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0)}
                </ItemTitle>
              </ItemContent>
            </Item>
            <Item
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.044) 100%)",
              }}
              className="h-18"
            >
              <ItemContent>
                <ItemDescription
                  className="text-xs opacity-60"
                  style={{ color: "hsla(0, 0%, 100%, 1)" }}
                >
                  Pending withdrawel
                </ItemDescription>
                <ItemTitle
                  className="text-2xl font-medium"
                  style={{ color: "hsla(0, 0%, 100%, 1)" }}
                >
                  $
                  {data.transactions
                    .filter(
                      (transaction) =>
                        transaction.category === "withdraw" &&
                        transaction.status === "pending",
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0)}
                </ItemTitle>
              </ItemContent>
            </Item>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-rows-2 gap-3 items-stretch">
        <Card
          className="gap-2 pb-2 border-transparent"
          style={{
            background: "hsla(0, 0%, 98%, 1)",
          }}
        >
          <CardHeader className="relative">
            <CardTitle
              className="font-medium"
              style={{ color: "hsla(0, 0%, 19%, 1)" }}
            >
              Total allocated
            </CardTitle>
            <CardAction className="absolute right-4 top-1">
              <Badge
                className="size-11"
                style={{ background: "hsla(227, 68%, 52%, 0.18)" }}
              >
                <Image
                  src="/assets/Group.png"
                  alt="monitor speaker"
                  width={22}
                  height={22}
                />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Item>
              <ItemContent>
                <ItemTitle
                  className="text-2xl font-medium"
                  style={{ color: "hsla(240, 11%, 7%, 1)" }}
                >
                  $
                  {data.transactions
                    .filter(
                      (transaction) =>
                        transaction.category === "allocation" &&
                        transaction.status === "completed",
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0)}
                </ItemTitle>
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

        <Card
          className="gap-2 pb-2 border-transparent"
          style={{
            background: "hsla(0, 0%, 98%, 1)",
          }}
        >
          <CardHeader className="relative">
            <CardTitle
              className="font-medium"
              style={{ color: "hsla(0, 0%, 19%, 1)" }}
            >
              Total spent
            </CardTitle>
            <CardAction className="absolute right-4 top-1">
              <Badge
                className="size-11"
                style={{ background: "hsla(39, 94%, 57%, 0.28)" }}
              >
                <Image
                  src="/assets/Group(1).png"
                  alt="monitor speaker"
                  width={22}
                  height={22}
                />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Item>
              <ItemContent>
                <ItemTitle
                  className="text-2xl font-medium"
                  style={{ color: "hsla(240, 11%, 7%, 1)" }}
                >
                  $
                  {data.transactions
                    .filter(
                      (transaction) =>
                        transaction.category === "ad_spending" &&
                        transaction.status === "completed",
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0)}
                </ItemTitle>
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
              <Button
                size="lg"
                className="mt-4 h-9 w-33 hover:bg-blue-500/20"
                style={{
                  background:
                    "linear-gradient(0deg, #1745E8 0%, #597EFF 100%)",
                  border: "1px solid rgba(32, 32, 32, 0.15)",
                }}
              >
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
  );
};
