"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Items } from "@/types";

import { ChevronDown, ChevronRightIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export function NavMain({ items }: { items: Items[] }) {
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
                <span className={item.isActive ? "text-active" : ""}>
                  {item.title}
                </span>

                <div className="ml-auto inline-flex gap-2 5">
                  {item.title.match("Ad account") && (
                    <Badge className="bg-active text-badge-text size-5 flex items-center justify-center">
                      2
                    </Badge>
                  )}
                  <ChevronDown
                    className={cn(
                      "transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-180",
                      { "text-active": item.isActive },
                    )}
                  />
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <Collapsible key={subItem.title} className="group/sub">
                    <SidebarMenuSubItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton
                          className={cn("text-sidebar-foreground/70 ", {
                            "not-last:text-active not-last:bg-active/15":
                              item.isActive,
                          })}
                        >
                          <span className="text-nowrap">{subItem.title}</span>

                          {subItem.embeded?.length !== 0 &&
                            subItem.embeded !== undefined && (
                              <ChevronRightIcon
                                className={cn(
                                  "ml-auto mr-2 transition-transform duration-200 group-data-[state=open]/sub:rotate-90",
                                  { "text-active": item.isActive },
                                )}
                              />
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
