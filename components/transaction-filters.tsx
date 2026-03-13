import { ListFilter, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Item, ItemActions, ItemContent, ItemSeparator } from "./ui/item";
import { FILTER_BADGE_STYLES } from "@/constants/styles";
import { ActiveFilterBadgeProps, FilterButtonProps } from "@/types";

export function FilterButton({
  label,
  options,
  onSelect,
  "aria-label": ariaLabel,
}: FilterButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-dashed border-muted-foreground rounded-full px-4 h-6 text-muted-foreground mr-1"
          size="sm"
          aria-label={ariaLabel ?? `Filter by ${label}`}
        >
          <ListFilter />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-1 *:not-last:mb-1" align="center">
        {options.map((item) => (
          <DropdownMenuItem key={item} onClick={() => onSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ActiveFilterBadge({
  label,
  value,
  onRemove,
}: ActiveFilterBadgeProps) {
  return (
    <Item
      variant="outline"
      size="xs"
      className="py-px rounded-full shrink-0 w-fit mr-1"
      style={FILTER_BADGE_STYLES}
    >
      <ItemActions>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onRemove}
          aria-label={`Remove ${label} filter`}
        >
          <X />
        </Button>
        <span className="font-medium text-muted-foreground">{label}</span>
        <ItemSeparator orientation="vertical" />
        <ItemContent className="text-active font-medium">{value}</ItemContent>
      </ItemActions>
    </Item>
  );
}
