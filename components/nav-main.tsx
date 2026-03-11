"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronDown, ChevronRightIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      embeded?: {
        title: string;
        url: string;
      }[];
    }[];
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem className="text-sidebar-foreground/70">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>

                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <Collapsible key={subItem.title} className="group/sub">
                    <SidebarMenuSubItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                          <span className="text-nowrap">{subItem.title}</span>

                          {subItem.embeded?.length !== 0 &&
                            subItem.embeded !== undefined && (
                              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/sub:rotate-90" />
                            )}
                        </SidebarMenuSubButton>
                      </CollapsibleTrigger>

                      {subItem.embeded?.length !== 0 &&
                        subItem.embeded !== undefined && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {subItem?.embeded?.map((embeddedItem) => (
                                <SidebarMenuSubItem key={embeddedItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={embeddedItem.url}>
                                      {embeddedItem.title}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                    </SidebarMenuSubItem>
                  </Collapsible>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
