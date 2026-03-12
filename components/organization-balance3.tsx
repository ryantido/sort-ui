import {
  CircleMinus,
  CirclePlus,
  EyeOff,
  MoreHorizontalIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { TeamType } from "@/types";

export const OrganizationBalance3 = ({ team: data }: { team: TeamType }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      {data.length === 0 ? (
        <div className="text-muted-foreground grid place-content-center h-full">
          no content
        </div>
      ) : (
        data.map((team, index) => (
          <Item key={team.name + index} variant="outline">
            <ItemMedia className="h-full">
              <Avatar className="size-9">
                <AvatarImage src={team.avatar} alt="Profile picture" />
                <AvatarFallback>Rk</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-0 h-full justify-center">
              <ItemTitle>{team.name}</ItemTitle>
              <ItemDescription>{team.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Item
                size="sm"
                style={{ backgroundColor: "hsla(227, 68%, 52%, 0.1)" }}
              >
                <ItemContent>
                  <ItemTitle>
                    $5,500.50{" "}
                    <Button
                      size="icon-sm"
                      className="rounded-full"
                      style={{
                        background: "hsla(0, 0%, 55%, 0.17)",
                        color: "hsla(240, 4%, 32%, 1)",
                      }}
                    >
                      <EyeOff />
                    </Button>
                  </ItemTitle>
                </ItemContent>
              </Item>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] p-2 *:not-last:mb-2"
                  align="end"
                >
                  <DropdownMenuItem>
                    <CirclePlus className="mr-1" />
                    Allocate funds
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <CircleMinus className="mr-1" />
                    Disallocate funds
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        ))
      )}
    </div>
  );
};
