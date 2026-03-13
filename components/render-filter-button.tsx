import { ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import type { Account, FilterButtonLabel } from "@/types";

export const RenderFilterButton = ({
  label,
  constant,
  callback,
}: {
  label: FilterButtonLabel;
  constant: string[] | Account[];
  callback: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const RenderData = (label: FilterButtonLabel) => {
    switch (label) {
      case "Date":
        return (constant as string[]).reverse().map((item) => (
          <DropdownMenuItem key={item} onClick={() => callback(item)}>
            {item}
          </DropdownMenuItem>
        ));
      case "Type":
        return (constant as string[]).map((item) => (
          <DropdownMenuItem key={item} onClick={() => callback(item)}>
            {item}
          </DropdownMenuItem>
        ));
      case "Source":
        return (constant as Account[])
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => callback(item.name)}
            >
              {item.name}
            </DropdownMenuItem>
          ));
      default:
        return [];
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-dashed border-muted-foreground rounded-full px-4 h-6 text-muted-foreground mr-1"
          size="sm"
        >
          <ListFilter />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-2 *:not-last:mb-2" align="center">
        {RenderData(label)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
