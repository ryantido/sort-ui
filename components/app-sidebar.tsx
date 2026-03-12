"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { AudioLinesIcon, TerminalIcon, SquareSlash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import Image from "next/image";

const data = {
  teams: [
    {
      name: "SortUI",
      logo: (
        <Image src="/Avatar.png" alt="sort ui logo" width={24} height={24} />
      ),
    },
    {
      name: "SortUI Pro",
      logo: <AudioLinesIcon />,
      plan: "Pro",
    },
    {
      name: "SortUI Free",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Ad account",
      url: "#",
      icon: (
        <Image
          src="/assets/iconsax-home-2(1).png"
          alt="account icon"
          width={20}
          height={20}
        />
      ),
      items: [
        {
          title: "Type ads 1",
          url: "#",
        },
        {
          title: "Type ads 2",
          url: "#",
        },
      ],
    },
    {
      title: "Wallets",
      url: "#",
      icon: (
        <Image
          src="/assets/iconsax-home-2(2).png"
          alt="wallet icon"
          width={20}
          height={20}
        />
      ),

      isActive: true,
      items: [
        {
          title: "Organization Balance",
          url: "#",
          embeded: [
            {
              title: "Private",
              url: "#",
            },
            {
              title: "Public",
              url: "#",
            },
          ],
        },
        {
          title: "Personal Balance",
          url: "#",
          embeded: [],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-border-muted ">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <InputGroup className="mt-3 relative">
            <InputGroupInput
              placeholder={open ? "Search" : ""}
              disabled={!open}
            />
            <InputGroupAddon
              align="inline-end"
              className={open ? "" : "absolute inset-0 translate-x-1"}
            >
              <SquareSlash />
            </InputGroupAddon>
          </InputGroup>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Home"
                className="text-sidebar-foreground/70"
              >
                <Image
                  src="/assets/iconsax-home-2.png"
                  alt="home svg"
                  width={20}
                  height={20}
                />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <NavMain items={data.navMain} />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Teams"
                className="text-sidebar-foreground/70"
              >
                <Image
                  src="/assets/Clip path group.png"
                  alt="team icon"
                  width={20}
                  height={20}
                />
                <span>Teams</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Affiliate program"
                className="text-sidebar-foreground/70"
              >
                <Image
                  src="/assets/Clip path group(1).png"
                  alt="affiliate icon"
                  width={20}
                  height={20}
                />
                <span>Affiliate program</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <React.Activity mode={open ? "visible" : "hidden"}>
          <Card className="py-3 border border-border-card!">
            <CardContent className="px-3">
              <CardDescription className="font-medium">
                <p>
                  {" "}
                  You're currently on the{" "}
                  <span className="font-semibold text-black/90">
                    Starter plan
                  </span>
                  . Upgrade to access lowe fees, advanced features.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full mt-2 rounded-sm bg-button-muted text-black/90 border border-border-muted"
                >
                  Upgrade
                </Button>
              </CardDescription>
            </CardContent>
          </Card>
        </React.Activity>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              className="text-sidebar-foreground/70 my-1"
            >
              <Image
                src="/assets/Clip path group(2).png"
                alt="settings icon"
                width={20}
                height={20}
              />
              <span className="text-sidebar-foreground/70">Settings</span>
              <Badge className="size-4.5 bg-badge text-badge-text ml-auto">
                1
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
