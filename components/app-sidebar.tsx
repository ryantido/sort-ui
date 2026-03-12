"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
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
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Settings,
  TerminalSquare,
  SquareSlash,
} from "lucide-react";
import { Item, ItemContent, ItemDescription, ItemMedia } from "./ui/item";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SortUI",
      logo: <img src="/Avatar.png" alt="sort ui logo" />,
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
      icon: <TerminalSquareIcon />,
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
      icon: <BotIcon />,

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
          <InputGroup className="mt-3">
            <InputGroupInput placeholder="Search" />
            <InputGroupAddon align="inline-end">
              <SquareSlash />
            </InputGroupAddon>
          </InputGroup>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <TerminalSquare />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <NavMain items={data.navMain} />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <TerminalSquare />
                <span>Teams</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <TerminalSquare />
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <Settings size={20} color="rgba(78, 78, 85, 1)" />
                <span>Settings</span>
                <Badge className="size-4.5 bg-badge text-badge-text ml-auto">
                  1
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </React.Activity>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
