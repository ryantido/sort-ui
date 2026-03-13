import { Card, CardContent } from "./ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import Image from "next/image";
import { BUTTON_STYLES } from "@/constants/styles";

export function PromoCard() {
  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-2">
        <Item>
          <ItemContent>
            <ItemTitle className="text-2xl">
              Allocate funds to your team members wallet.
            </ItemTitle>
            <ItemDescription>
              You can manage funds within you teammate personal wallet.
            </ItemDescription>
            <Button
              size="lg"
              className="mt-4 h-9 w-33 hover:bg-blue-500/20"
              style={BUTTON_STYLES.primaryGradient}
            >
              Allocate funds
            </Button>
          </ItemContent>
        </Item>
        <figure className="relative aspect-square overflow-hidden pointer-events-none select-none">
          <Image
            src="/illustration.png"
            alt="illustration"
            className="object-cover"
            fill
          />
        </figure>
      </CardContent>
    </Card>
  );
}
