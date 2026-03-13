import { Check, RefreshCcw, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { STATUS_BADGE_STYLES } from "@/constants/styles";
import type { TransactionStatusBadgeProps } from "@/types";

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  const config = {
    completed: {
      style: STATUS_BADGE_STYLES.completed,
      icon: Check,
      label: "Paid",
    },
    pending: {
      style: STATUS_BADGE_STYLES.pending,
      icon: RefreshCcw,
      label: "Pending",
    },
    failed: {
      style: STATUS_BADGE_STYLES.failed,
      icon: X,
      label: "Failed",
    },
  };

  const { style, icon: Icon, label } = config[status];

  return (
    <Badge style={style} className="rounded-md">
      <Icon className="size-4 mr-1" aria-hidden="true" />
      {label}
    </Badge>
  );
}
