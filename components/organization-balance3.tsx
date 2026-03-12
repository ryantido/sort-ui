import { CircleMinus, CirclePlus, Eye, MoreHorizontalIcon } from "lucide-react";
import { TransactionActions } from "./transaction-actions";
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

export const OrganizationBalance3 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      {Array.from({ length: 7 }, (_, i) => (
        <Item key={i} variant="outline">
          <ItemMedia className="h-full">
            <Avatar className="size-9">
              <AvatarImage src="/Profile picture.png" alt="Profile picture" />
              <AvatarFallback>Rk</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-0 h-full justify-center">
            <ItemTitle>Richard Karlson</ItemTitle>
            <ItemDescription>richard.karlson@adxens.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Item size="sm" variant="muted">
              <ItemContent>
                <ItemTitle>
                  $5,500.50{" "}
                  <Button
                    size="icon-sm"
                    className="rounded-full bg-muted-foreground"
                  >
                    <Eye />
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
      ))}
    </div>
  );
};
