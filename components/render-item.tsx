import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Item, ItemActions, ItemContent, ItemSeparator } from "./ui/item";

export const RenderItem = ({
  label,
  state,
  callback,
}: {
  label: string;
  state: string | undefined;
  callback: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <Item
      variant="outline"
      size="xs"
      className="py-px rounded-full shrink-0 w-fit mr-1"
      style={{
        background: "hsla(227, 68%, 52%, 0.1)",
        borderTop: "1px solid hsla(227, 68%, 52%, 0.1)",
        boxShadow:
          "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05) 0px -1px 0px 0px hsla(0, 0%, 0%, 0.08) inset",
      }}
    >
      <ItemActions>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => callback(undefined)}
        >
          <X />
        </Button>
        <span
          className="font-medium"
          style={{ color: "hsla(240, 3%, 45%, 1)" }}
        >
          {label}
        </span>
        <ItemSeparator orientation="vertical" />
        <ItemContent className="text-active font-medium">{state}</ItemContent>
      </ItemActions>
    </Item>
  );
};
