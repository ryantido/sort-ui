import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { ICON_BADGE_STYLES, TEXT_COLORS } from "@/constants/styles";
import { formatCurrency } from "@/lib/utils";
import type { MetricCardProps } from "@/types";

export function MetricCard({
  title,
  amount,
  iconSrc,
  iconAlt,
  iconStyle,
  period = "Last 30 days",
}: MetricCardProps) {
  const badgeStyle =
    iconStyle === "blue" ? ICON_BADGE_STYLES.blue : ICON_BADGE_STYLES.yellow;

  return (
    <Card className="gap-2 pb-2 border-transparent bg-[hsla(0,0%,98%,1)]">
      <CardHeader className="relative">
        <CardTitle
          className="font-medium"
          style={{ color: TEXT_COLORS.titleGray }}
        >
          {title}
        </CardTitle>
        <CardAction className="absolute right-4 top-1">
          <Badge className="size-11" style={badgeStyle}>
            <Image src={iconSrc} alt={iconAlt} width={22} height={22} />
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Item>
          <ItemContent>
            <ItemTitle
              className="text-2xl font-medium"
              style={{ color: TEXT_COLORS.active }}
            >
              {formatCurrency(amount)}
            </ItemTitle>
            <Badge
              variant="outline"
              className="rounded border border-border-muted text-muted-foreground"
            >
              {period}
            </Badge>
          </ItemContent>
        </Item>
      </CardContent>
    </Card>
  );
}
