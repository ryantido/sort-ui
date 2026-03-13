import type { OverviewMetricsProps } from "@/types";
import { BalanceCard } from "./balance-card";
import { MetricCard } from "./metric-card";
import { PromoCard } from "./promo-card";
import { getTotalAllocated, getTotalSpent } from "@/lib/utils";

export function OverviewMetrics({ data }: OverviewMetricsProps) {
  const totalAllocated = getTotalAllocated(data.transactions);
  const totalSpent = getTotalSpent(data.transactions);

  return (
    <div className="grid h-72 grid-cols-1 lg:grid-cols-[1.65fr_1.25fr_2.4fr] gap-3">
      <BalanceCard
        organizationName={data.organization.name}
        accounts={data.accounts}
        transactions={data.transactions}
      />

      <div className="grid grid-rows-2 gap-3 items-stretch">
        <MetricCard
          title="Total allocated"
          amount={totalAllocated}
          iconSrc="/assets/Group.png"
          iconAlt="Allocation icon"
          iconStyle="blue"
        />
        <MetricCard
          title="Total spent"
          amount={totalSpent}
          iconSrc="/assets/Group(1).png"
          iconAlt="Spending icon"
          iconStyle="yellow"
        />
      </div>

      <PromoCard />
    </div>
  );
}
