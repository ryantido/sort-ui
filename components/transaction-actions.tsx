import { Copy, Download, Maximize2, MoreHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const TransactionActions = () => (
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
        <Maximize2 className="mr-2" />
        View details
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Copy className="mr-2" />
        Repeat transaction
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Download className="mr-2" />
        Download receipt
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
