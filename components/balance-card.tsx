import { Card, CardContent } from "./ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useVisibilityToggle } from "@/hooks";
import { BUTTON_STYLES, CARD_STYLES, TEXT_COLORS } from "@/constants/styles";
import {
  formatCurrency,
  getPendingDeposit,
  getPendingWithdrawal,
  maskSensitiveData,
} from "@/lib/utils";
import type { BalanceCardProps, BalanceStatProps } from "@/types";

function BalanceStat({ label, amount }: BalanceStatProps) {
  return (
    <Item style={CARD_STYLES.glassItem} className="h-18 border-0">
      <ItemContent className="*:font-medium">
        <ItemDescription
          className="text-xs opacity-60"
          style={{ color: TEXT_COLORS.white }}
        >
          {label}
        </ItemDescription>
        <ItemTitle className="text-2xl" style={{ color: TEXT_COLORS.white }}>
          {formatCurrency(amount)}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}

export function BalanceCard({
  organizationName,
  accounts,
  transactions,
  walletId = "wallet_001",
}: BalanceCardProps) {
  const { visible, toggle } = useVisibilityToggle({ initialVisible: false });

  const wallet = accounts.find((acc) => acc.id === walletId);
  const balance = wallet?.balance ?? 0;
  const pendingDeposit = getPendingDeposit(transactions);
  const pendingWithdrawal = getPendingWithdrawal(transactions);

  return (
    <Card className="flex flex-col justify-center bg-[url('/Background.png')] bg-center bg-cover bg-no-repeat">
      <CardContent className="flex flex-col gap-4">
        <Item
          variant="outline"
          className="text-white py-4 h-25 border-0 backdrop-blur-lg"
          style={CARD_STYLES.gradientBackground}
        >
          <ItemMedia className="h-full">
            <Image
              src="/assets/iconsax-wallet-1.png"
              alt="wallet icon"
              width={32}
              height={32}
            />
          </ItemMedia>
          <ItemContent>
            <ItemDescription className="font-medium text-[12px] text-text-white/60">
              {organizationName} Balance
            </ItemDescription>
            <ItemTitle className="font-bold text-[32px] text-white">
              {maskSensitiveData(formatCurrency(balance), visible)}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button
              className="rounded-full hover:bg-ring/20 hover:text-text-white bg-text-white/10 size-fit py-2"
              onClick={toggle}
              aria-label={visible ? "Hide balance" : "Show balance"}
            >
              {visible ? (
                <EyeOff className="size-5.5 2xl:size-6.5" aria-hidden="true" />
              ) : (
                <Eye className="size-5.5 2xl:size-6.5" aria-hidden="true" />
              )}
            </Button>
          </ItemActions>
        </Item>

        <div className="flex gap-2 *:text-black/90 *:flex-1 *:rounded *:font-medium">
          <Button style={BUTTON_STYLES.yellow} className="h-9 w-36.5">
            Deposit Funds
          </Button>
          <Button style={BUTTON_STYLES.white} className="h-9 w-36.5">
            Withdraw
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <BalanceStat label="Pending deposit" amount={pendingDeposit} />
          <BalanceStat label="Pending withdrawal" amount={pendingWithdrawal} />
        </div>
      </CardContent>
    </Card>
  );
}
