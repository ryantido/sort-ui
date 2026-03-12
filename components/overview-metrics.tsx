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
import { Eye, MonitorSpeaker, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";

export const OverviewMetrics = () => {
  return (
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
  );
};
